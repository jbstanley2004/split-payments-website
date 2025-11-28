'use server';

import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { SPLIT_KNOWLEDGE_BASE } from "../lib/funding-constants";
import { UserProfile, Quote, ApplicationData, Message } from "../types/funding-types";

// Remove top-level instantiation
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

// ... (imports remain the same)

export async function sendGeminiMessage(
    message: string,
    history: Message[],
    attachment?: { data: string; type: string }
): Promise<ChatActionResponse> {
    try {
        const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        
        if (!apiKey) {
            console.error("Gemini API Key is missing in server action environment.");
            return { text: "", error: "Configuration Error: API Key missing." };
        }

        // Initialize at runtime to ensure env vars are loaded
        const genAI = new GoogleGenerativeAI(apiKey);

        console.log(`[Gemini Action] API Key found (length: ${apiKey.length})`);

        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash',
            systemInstruction: SPLIT_KNOWLEDGE_BASE,
            tools: tools
        });

        // Convert history to Gemini format
        const chatHistory = history
            .filter(msg => msg.role === 'user' || msg.role === 'model')
            .map(msg => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }]
            }));
        
        console.log("[Gemini Action] Chat History:", JSON.stringify(chatHistory, null, 2));

        const chatSession = model.startChat({
            history: chatHistory, 
        });

        let result;

        if (attachment) {
            const cleanData = attachment.data.split(',')[1];
            result = await chatSession.sendMessage([
                message,
                {
                    inlineData: {
                        mimeType: attachment.type,
                        data: cleanData
                    }
                }
            ]);
        } else {
            result = await chatSession.sendMessage(message);
        }

        const response = await result.response;
        const functionCalls = response.functionCalls();
        const toolResultsForClient: any[] = [];
        let finalResponseText = response.text();

        if (functionCalls && functionCalls.length > 0) {
             const functionResponses = [];

            for (const call of functionCalls) {
                const { name, args } = call;
                let toolResult: any = { status: 'success' };
                let clientData: any = null;

                if (name === 'save_contact_info') {
                    clientData = {
                        name: args.name as string,
                        email: args.email as string,
                        phone: args.phone as string
                    };
                    toolResult = { message: "Contact info saved securely." };
                }
                else if (name === 'generate_quote') {
                    const rev = args.monthlyRevenue as number;
                    let offer = Math.floor(rev * 1.2);
                    if (offer > 350000) offer = 350000;
                    if (offer < 100) offer = 100;

                    const totalOwed = Math.floor(offer * 1.15);
                    const fee = totalOwed - offer;
                    const retentionRate = "12%";

                    const quoteData: Quote = {
                        amount: offer,
                        term: "Flexible / No Fixed Term",
                        rate: "Fixed Fee: $" + fee.toLocaleString(),
                        repaymentSchedule: `${retentionRate} of Daily Sales`
                    };
                    
                    clientData = quoteData;
                    toolResult = {
                        quote_generated: true,
                        details: quoteData,
                        message: "Quote generated successfully. Quote card shown."
                    };
                }
                else if (name === 'start_application') {
                    const appData: Partial<ApplicationData> = {
                        legalName: args.legalName as string || '',
                        address: args.address as string || '',
                        cityStateZip: args.cityStateZip as string || '',
                        monthlyVolume: args.monthlyVolume as string || '',
                        processingCompany: args.processingCompany as string || ''
                    };
                    
                    clientData = appData;
                    toolResult = {
                        application_started: true,
                        message: "Application Wizard launched on UI with pre-filled data."
                    };
                }
                
                toolResultsForClient.push({
                    name,
                    args,
                    result: clientData
                });

                functionResponses.push({
                    functionResponse: {
                        name: name,
                        response: toolResult,
                    },
                });
            }

            // Send function response back to model
            const finalResult = await chatSession.sendMessage(functionResponses);
            finalResponseText = finalResult.response.text();
        }

        return {
            text: finalResponseText,
            toolCalls: toolResultsForClient.length > 0 ? toolResultsForClient : undefined
        };

    } catch (error: any) {
        console.error("Gemini Interaction Error:", error);
        if (error.response) {
            console.error("Gemini Error Response:", JSON.stringify(error.response, null, 2));
        }
        return { 
            text: "", 
            error: `Connection Error: ${error.message || "Unknown error"}. Please check server logs.` 
        };
    }
}
