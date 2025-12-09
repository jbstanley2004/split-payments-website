'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";
import { PageContext, AmbientMessage } from "../contexts/AmbientAssistantContext";
import { SPLIT_KNOWLEDGE_BASE } from "../lib/funding-constants";
import { createConversation, addMessage, getConversationMessages, updateConversationTitle } from "../lib/supabase/conversations";
import { createClient } from "@/lib/supabase/server";

// Define the model to use - Gemini 1.5 Pro is the best current proxy for "Gemini 3 capabilities"
// as it has large context and high reasoning.
// Define the model to use - User explicitly requested "gemini-3-pro-preview"
const MODEL_NAME = process.env.GEMINI_MODEL || "gemini-3-pro-preview";

interface AmbientActionResponse {
    text: string;
    conversationId: string;
    embeddedComponent?: {
        type: string;
        props: Record<string, unknown>;
    };
    action?: {
        type: 'navigate' | 'update_field' | 'show_component';
        destination?: string;
        field?: string;
        value?: unknown;
    };
}

export async function sendAmbientMessage(
    message: string,
    pageContext: PageContext,
    existingConversationId: string | null,
    attachment?: { data: string; type: string },
    clientHistory: AmbientMessage[] = [] // New argument for anonymous context
): Promise<AmbientActionResponse> {
    try {
        const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        const supabase = await createClient();

        // Check Authentication
        const { data: { user } } = await supabase.auth.getUser();
        const isAuthenticated = !!user;

        // Enhanced Debug Logging
        console.log("[Ambient Action] Environment Check:");
        console.log(`- Authenticated: ${isAuthenticated}`);
        if (isAuthenticated) console.log(`- User ID: ${user.id}`);

        if (!apiKey) {
            console.warn("[Ambient Action] No API key found.");
            return {
                text: "I apologize, but I'm having trouble connecting to my brain (API Key missing).",
                conversationId: existingConversationId || 'error'
            };
        }

        let conversationId = existingConversationId;
        let isNewConversation = false;
        let historyForGemini: any[] = [];

        // --- AUTHENTICATED FLOW ---
        if (isAuthenticated && user) {
            // 1. Handle Conversation Persistence
            if (!conversationId || conversationId === 'temp') {
                conversationId = await createConversation(user.id);
                isNewConversation = true;
            }

            // Save User Message
            await addMessage(conversationId, 'user', message);

            // 2. Fetch History for Context from DB
            const persistedMessages = await getConversationMessages(conversationId);

            // Filter out the last message (current user message) for startChat history
            historyForGemini = persistedMessages.slice(0, -1).map(msg => ({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }]
            }));

        } else {
            // --- ANONYMOUS FLOW (Ephemeral) ---
            conversationId = 'temp'; // Placeholder ID

            // Use Client History for Context
            // Map the client-side AmbientMessage[] to Gemini format
            historyForGemini = clientHistory.map(msg => ({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }]
            }));

            // We do NOT save to DB
        }

        // 3. Initialize Gemini
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: MODEL_NAME,
            systemInstruction: `${SPLIT_KNOWLEDGE_BASE}

You are Split's ambient AI assistant. You help users navigate the platform, understand their application status, and answer questions.
You have access to the entire website context provided above and the user's current page context.

Current User Page Context:
- Page: ${pageContext.pageName}
- Path: ${pageContext.pathname}
- Description: ${pageContext.pageDescription}
- User Status: ${isAuthenticated ? 'Authenticated' : 'Guest (Anonymous)'}

CAPABILITIES:
1. Navigation: If the user asks to go somewhere, acknowledge it.
2. UI Generation: You can show UI components. If asked about status/application, use 'StatusCard'. If asked about profile completion, use 'ProfileProgress'.
3. Memory: You remember previous messages in this conversation.

RESPONSE FORMAT:
Be concise, professional, and friendly.
If the user's request requires an action (like navigation), explicitely mention you are doing it.
`
        });

        const chatSession = model.startChat({
            history: historyForGemini,
        });

        // 5. Send Message to Gemini
        let result;
        if (attachment) {
            const cleanData = attachment.data.split(',')[1];
            result = await chatSession.sendMessage([
                message,
                { inlineData: { mimeType: attachment.type, data: cleanData } }
            ]);
        } else {
            result = await chatSession.sendMessage(message);
        }

        const responseText = result.response.text();

        // 6. Save Assistant Response (Only if Authenticated)
        // Logic for actions/components remains the same
        const lowerResponse = responseText.toLowerCase();
        const lowerMessage = message.toLowerCase();

        // Navigation Logic
        let action: AmbientActionResponse['action'];
        const navigationRoutes: Record<string, string> = {
            'dashboard': '/portal/dashboard',
            'profile': '/portal/dashboard', // Simplify to dashboard/profile
            'inbox': '/portal/dashboard',
            'funding': '/funding',
            'payments': '/payments',
            'hardware': '/hardware',
            'start': '/get-started',
            'contact': '/contact',
            'concierge': '/funding-concierge',
            'home': '/',
        };

        for (const [keyword, route] of Object.entries(navigationRoutes)) {
            if ((lowerMessage.includes('go to') || lowerMessage.includes('take me')) && lowerMessage.includes(keyword)) {
                action = { type: 'navigate', destination: route };
                break;
            }
        }

        // Component Logic
        let embeddedComponent: AmbientActionResponse['embeddedComponent'];
        if (lowerMessage.includes('status') || lowerMessage.includes('application')) {
            embeddedComponent = { type: 'StatusCard', props: { showDetails: true } };
        } else if (lowerMessage.includes('profile')) {
            embeddedComponent = { type: 'ProfileProgress', props: { compact: true } };
        } else if (lowerMessage.includes('payment') && lowerMessage.includes('terminal')) {
            embeddedComponent = { type: 'PaymentTerminalCard', props: {} };
        }

        if (isAuthenticated && user && conversationId !== 'temp') {
            await addMessage(conversationId, 'assistant', responseText, embeddedComponent);

            // 7. Auto-Title (Background determination) - Only for saved chats
            if (isNewConversation) {
                const titleModel = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
                const titleResult = await titleModel.generateContent(`Generate a short, concise 3-4 word title for a chat starting with: "${message}"`);
                const title = titleResult.response.text().trim().replace(/"/g, '');
                await updateConversationTitle(conversationId, title);
            }
        }

        return {
            text: responseText,
            conversationId,
            embeddedComponent,
            action,
        };

    } catch (error: any) {
        console.error("[Ambient Action] Error:", error);
        return {
            text: "I apologize, but I'm having trouble connecting right now.",
            conversationId: existingConversationId || 'error'
        };
    }
}


