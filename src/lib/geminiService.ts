
import { GoogleGenerativeAI, ChatSession, SchemaType } from "@google/generative-ai";
import { SPLIT_KNOWLEDGE_BASE } from "./funding-constants";
import { UserProfile, Quote, ApplicationData } from "../types/funding-types";

// Tool Definitions
const saveContactTool = {
    name: 'save_contact_info',
    description: 'Save the users contact information (Name, Email, Phone) to their profile.',
    parameters: {
        type: SchemaType.OBJECT,
        properties: {
            name: { type: SchemaType.STRING, description: "The user's full name" },
            email: { type: SchemaType.STRING, description: "The user's email address" },
            phone: { type: SchemaType.STRING, description: "The user's phone number (optional)" },
        },
        required: ['name', 'email'],
    },
};

const generateQuoteTool = {
    name: 'generate_quote',
    description: 'Generate a funding quote based on business metrics.',
    parameters: {
        type: SchemaType.OBJECT,
        properties: {
            monthlyRevenue: { type: SchemaType.NUMBER, description: "Average monthly revenue in USD" },
            monthsInBusiness: { type: SchemaType.NUMBER, description: "Number of months the business has been operating" },
        },
        required: ['monthlyRevenue', 'monthsInBusiness'],
    },
};

const startApplicationTool = {
    name: 'start_application',
    description: 'Initiate the official Split Funding Application wizard UI. Call this AFTER analyzing uploaded documents if available, or if the user insists on manual entry.',
    parameters: {
        type: SchemaType.OBJECT,
        properties: {
            legalName: { type: SchemaType.STRING, description: "Legal business name extracted from doc" },
            address: { type: SchemaType.STRING, description: "Street address extracted from doc" },
            cityStateZip: { type: SchemaType.STRING, description: "City, State, Zip extracted from doc" },
            monthlyVolume: { type: SchemaType.STRING, description: "Monthly revenue/volume extracted or estimated" },
            processingCompany: { type: SchemaType.STRING, description: "Current processor name" },
        },
    },
};

const tools = [
    {
        functionDeclarations: [saveContactTool, generateQuoteTool, startApplicationTool],
    },
];

let chatSession: ChatSession | null = null;
let genAI: GoogleGenerativeAI | null = null;

export const initGemini = () => {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        console.error("API Key missing");
        return;
    }
    genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
};

export const startNewChat = () => {
    if (!genAI) initGemini();
    if (!genAI) throw new Error("AI Client not initialized");

    const model = genAI.getGenerativeModel({ 
        model: 'gemini-1.5-flash',
        systemInstruction: SPLIT_KNOWLEDGE_BASE,
        tools: tools
    });

    chatSession = model.startChat({});
    return chatSession;
};

export const sendMessage = async (
    message: string,
    attachment?: { data: string; type: string },
    updateProfile?: (data: Partial<UserProfile>) => void,
    setQuote?: (quote: Quote) => void,
    onStartApplication?: (data?: Partial<ApplicationData>) => void
) => {
    if (!chatSession) startNewChat();
    if (!chatSession) throw new Error("Failed to start chat session");

    let responseText = "";

    try {
        let result;

        if (attachment) {
            // Multimodal request
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
            // Text only request
            result = await chatSession.sendMessage(message);
        }

        const response = await result.response;
        const functionCalls = response.functionCalls();

        if (functionCalls && functionCalls.length > 0) {
            // Handle ALL function calls
            const functionResponses = [];

            for (const call of functionCalls) {
                const { name, args } = call;
                let toolResult: any = { status: 'success' };

                if (name === 'save_contact_info') {
                    if (updateProfile) {
                        updateProfile({
                            name: args.name as string,
                            email: args.email as string,
                            phone: args.phone as string
                        });
                    }
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

                    if (setQuote) setQuote(quoteData);
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

                    if (onStartApplication) onStartApplication(appData);
                    toolResult = {
                        application_started: true,
                        message: "Application Wizard launched on UI with pre-filled data."
                    };
                }

                functionResponses.push({
                    functionResponse: {
                        name: name,
                        response: toolResult,
                    },
                });
            }

            // Send function response back to model
            const finalResult = await chatSession.sendMessage(functionResponses);
            responseText = finalResult.response.text();
        } else {
            responseText = response.text();
        }

        return responseText;

    } catch (error) {
        console.error("Gemini Interaction Error", error);
        return "I apologize, but I'm having trouble connecting to our funding systems right now. Please try again in a moment.";
    }
};
