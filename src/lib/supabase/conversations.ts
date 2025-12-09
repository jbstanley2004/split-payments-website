
import { createAdminClient } from "./admin"; // Use admin client for server-side operations
import { PostgrestError } from "@supabase/supabase-js";

// Types
export interface Message {
    id?: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    createdAt: Date;
    embeddedComponent?: any;
}

export interface Conversation {
    id: string;
    userId: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    preview: string;
}

/**
 * Creates a new conversation
 */
export async function createConversation(userId: string, initialTitle: string = "New Chat"): Promise<string> {
    const supabase = createAdminClient();

    if (!supabase) {
        console.warn('[conversations] Supabase not configured; skipping conversation creation.')
        return ''
    }

    // Check if we already have a conversation today? No, allow multiple.

    const { data, error } = await supabase
        .from('conversations')
        .insert({
            user_id: userId,
            title: initialTitle,
            preview: '',
            // created_at and updated_at handled by default/trigger or we can set explicitly
        })
        .select('id')
        .single();

    if (error) {
        console.error("Error creating conversation:", error);
        throw new Error("Failed to create conversation");
    }

    return data.id;
}

/**
 * Adds a message to a conversation
 */
export async function addMessage(conversationId: string, role: string, content: string, embeddedComponent?: any) {
    const supabase = createAdminClient();

    if (!supabase) {
        console.warn('[conversations] Supabase not configured; skipping message insert.')
        return ''
    }

    // Insert message
    const { data, error } = await supabase
        .from('messages')
        .insert({
            conversation_id: conversationId,
            role,
            content,
            embedded_component: embeddedComponent || null,
        })
        .select('id')
        .single();

    if (error) {
        console.error("Error adding message:", error);
        // Don't throw, just log? Or throw to stop flow.
        throw error;
    }

    // Update conversation preview and timestamp
    const preview = content.slice(0, 60) + (content.length > 60 ? '...' : '');

    const { error: updateError } = await supabase
        .from('conversations')
        .update({
            updated_at: new Date().toISOString(),
            preview,
        })
        .eq('id', conversationId);

    if (updateError) {
        console.warn("Error updating conversation preview:", updateError);
    }

    return data.id;
}

/**
 * Gets all conversations for a user (ordered by recent)
 */
export async function getUserConversations(userId: string): Promise<Conversation[]> {
    const supabase = createAdminClient();

    if (!supabase) {
        console.warn('[conversations] Supabase not configured; returning empty conversation list.')
        return []
    }

    // Note: userId is text in our schema to support demo-user-123.
    // Ensure we query correctly.

    const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

    if (error) {
        console.error("Error fetching conversations:", error);
        return [];
    }

    return data.map((d: any) => ({
        id: d.id,
        userId: d.user_id,
        title: d.title,
        createdAt: new Date(d.created_at),
        updatedAt: new Date(d.updated_at),
        preview: d.preview
    }));
}

/**
 * Gets full message history for a conversation
 */
export async function getConversationMessages(conversationId: string): Promise<Message[]> {
    const supabase = createAdminClient();

    if (!supabase) {
        console.warn('[conversations] Supabase not configured; returning empty message list.')
        return []
    }

    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

    if (error) {
        console.error("Error fetching messages:", error);
        return [];
    }

    return data.map((d: any) => ({
        id: d.id,
        role: d.role as any,
        content: d.content,
        createdAt: new Date(d.created_at),
        embeddedComponent: d.embedded_component,
    }));
}

/**
 * Updates conversation title (e.g. after AI generates one)
 */
export async function updateConversationTitle(conversationId: string, title: string) {
    const supabase = createAdminClient();

    if (!supabase) {
        console.warn('[conversations] Supabase not configured; skipping title update.')
        return
    }

    await supabase
        .from('conversations')
        .update({ title })
        .eq('id', conversationId);
}
