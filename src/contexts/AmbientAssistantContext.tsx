'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { loadConversation } from '../actions/history-actions';

export interface PageContext {
    pathname: string;
    pageName: string;
    pageDescription: string;
}

export interface AmbientMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    embeddedComponent?: {
        type: string;
        props: Record<string, unknown>;
    };
}

interface AmbientAssistantContextType {
    isOpen: boolean;
    messages: AmbientMessage[];
    conversationId: string | null;
    pageContext: PageContext;
    isLoading: boolean;
    openAssistant: () => void;
    closeAssistant: () => void;
    toggleAssistant: () => void;
    addMessage: (message: Omit<AmbientMessage, 'id' | 'timestamp'>) => void;
    clearMessages: () => void;
    setLoading: (loading: boolean) => void;
    setConversationId: (id: string | null) => void;
    loadChat: (id: string) => Promise<void>;
}

const AmbientAssistantContext = createContext<AmbientAssistantContextType | null>(null);

function getPageInfo(pathname: string): { name: string; description: string } {
    const routes: Record<string, { name: string; description: string }> = {
        '/': { name: 'Home', description: 'Main landing page' },
        '/portal/dashboard': { name: 'Dashboard', description: 'User dashboard with application status and next steps' },
        '/portal/onboarding': { name: 'Onboarding', description: 'User onboarding and setup wizard' },
        '/portal/signin': { name: 'Sign In', description: 'User sign-in page' },
        '/portal/signup': { name: 'Sign Up', description: 'User registration page' },
        '/funding-concierge': { name: 'AI Help Desk', description: 'AI-powered funding concierge chat' },
        '/funding': { name: 'Funding', description: 'Funding options and information' },
        '/payments': { name: 'Payments', description: 'Payment processing solutions' },
        '/hardware': { name: 'Hardware', description: 'POS hardware and terminals' },
        '/get-started': { name: 'Get Started', description: 'Application and signup flow' },
        '/contact': { name: 'Contact', description: 'Contact information and support' },
    };

    // Check for exact match first
    if (routes[pathname]) {
        return routes[pathname];
    }

    // Check for partial matches
    for (const [route, info] of Object.entries(routes)) {
        if (pathname.startsWith(route) && route !== '/') {
            return info;
        }
    }

    return { name: 'Page', description: 'Current page' };
}

export function AmbientAssistantProvider({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<AmbientMessage[]>([]);
    const [conversationId, setConversationId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const pageInfo = getPageInfo(pathname);
    const pageContext: PageContext = {
        pathname,
        pageName: pageInfo.name,
        pageDescription: pageInfo.description,
    };

    const openAssistant = useCallback(() => setIsOpen(true), []);
    const closeAssistant = useCallback(() => setIsOpen(false), []);
    const toggleAssistant = useCallback(() => setIsOpen(prev => !prev), []);

    const addMessage = useCallback((message: Omit<AmbientMessage, 'id' | 'timestamp'>) => {
        const newMessage: AmbientMessage = {
            ...message,
            id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, newMessage]);
    }, []);

    const clearMessages = useCallback(() => {
        setMessages([]);
        setConversationId(null);
    }, []);

    const setLoading = useCallback((loading: boolean) => setIsLoading(loading), []);

    const loadChat = useCallback(async (id: string) => {
        setIsLoading(true);
        setConversationId(id);
        try {
            const history = await loadConversation(id);
            // Map remote history to local AmbientMessage
            const mappedMessages: AmbientMessage[] = history.map(msg => ({
                id: msg.id || Math.random().toString(),
                role: msg.role as 'user' | 'assistant',
                content: msg.content,
                timestamp: new Date(msg.createdAt),
                embeddedComponent: msg.embeddedComponent
            }));
            setMessages(mappedMessages);
        } catch (error) {
            console.error("Failed to load chat", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <AmbientAssistantContext.Provider
            value={{
                isOpen,
                messages,
                conversationId,
                pageContext,
                isLoading,
                openAssistant,
                closeAssistant,
                toggleAssistant,
                addMessage,
                clearMessages,
                setLoading,
                setConversationId,
                loadChat
            }}
        >
            {children}
        </AmbientAssistantContext.Provider>
    );
}

export function useAmbientAssistant() {
    const context = useContext(AmbientAssistantContext);
    if (!context) {
        throw new Error('useAmbientAssistant must be used within an AmbientAssistantProvider');
    }
    return context;
}
