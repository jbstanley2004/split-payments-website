'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";
import { PageContext, AmbientMessage } from "../contexts/AmbientAssistantContext";
import { SPLIT_KNOWLEDGE_BASE } from "../lib/funding-constants";
import { createConversation, addMessage, getConversationMessages, updateConversationTitle } from "../lib/firebase/conversations";

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

// Temporary User ID for prototype (In real app, get from auth session)
const DEMO_USER_ID = "demo-user-123";

export async function sendAmbientMessage(
    message: string,
    pageContext: PageContext,
    existingConversationId: string | null,
    attachment?: { data: string; type: string }
): Promise<AmbientActionResponse> {
    try {
        const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

        if (!apiKey) {
            console.warn("[Ambient Action] No API key found.");
            return {
                text: "I apologize, but I'm having trouble connecting to my brain (API Key missing).",
                conversationId: existingConversationId || 'error'
            };
        }

        // 1. Handle Conversation Persistence
        let conversationId = existingConversationId;
        let isNewConversation = false;

        if (!conversationId) {
            // Create new conversation
            conversationId = await createConversation(DEMO_USER_ID);
            isNewConversation = true;
        }

        // Save User Message
        await addMessage(conversationId, 'user', message);

        // 2. Fetch History for Context
        // We fetch the *persisted* history to ensure single source of truth
        const persistedMessages = await getConversationMessages(conversationId);

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

CAPABILITIES:
1. Navigation: If the user asks to go somewhere, acknowledge it.
2. UI Generation: You can show UI components. If asked about status/application, use 'StatusCard'. If asked about profile completion, use 'ProfileProgress'.
3. Memory: You remember previous messages in this conversation.

RESPONSE FORMAT:
Be concise, professional, and friendly.
If the user's request requires an action (like navigation), explicitely mention you are doing it.
`
        });

        // 4. Prepare History for Gemini (map Firestore messages to Gemini format)
        // Filter out the very last message we just added (the user message) because 
        // `sendMessage` takes the new message as argument.
        // Actually, `startChat` history should NOT include the *current* new message.
        // The `persistedMessages` INCLUDES the current message we just added.
        // So we strip the last one.
        const historyForGemini = persistedMessages.slice(0, -1).map(msg => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        }));

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

        // 6. Save Assistant Response
        // Determine embedded components based on raw text analysis or structured output if we switched to it.
        // For now, simple keyword matching is robust enough for the prototype.
        const lowerResponse = responseText.toLowerCase();
        const lowerMessage = message.toLowerCase();

        // Navigation Logic
        let action: AmbientActionResponse['action'];
        const navigationRoutes: Record<string, string> = {
            'dashboard': '/portal/dashboard',
            'profile': '/portal/dashboard',
            'inbox': '/portal/dashboard', // Simplify inbox to dashboard for now
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
            // Generative UI example
            embeddedComponent = { type: 'PaymentTerminalCard', props: {} };
        }

        await addMessage(conversationId, 'assistant', responseText, embeddedComponent);

        // 7. Auto-Title (Background determination)
        if (isNewConversation) {
            // Use a lightweight call to generate title
            // In production, use a queue. Here, we await it or let it float?
            // We'll just do it quickly.
            const titleModel = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
            const titleResult = await titleModel.generateContent(`Generate a short, concise 3-4 word title for a chat starting with: "${message}"`);
            const title = titleResult.response.text().trim().replace(/"/g, '');
            await updateConversationTitle(conversationId, title);
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


