import { createClient } from "@/lib/supabase/server";

// ... other imports ...

/**
 * server action to get list of conversations
 */
export async function getHistory() {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return [];
        }

        const conversations = await getUserConversations(user.id);
        // Serialize dates for client
        return conversations.map(c => ({
            ...c,
            createdAt: c.createdAt.toISOString(),
            updatedAt: c.updatedAt.toISOString(),
        }));
    } catch (error) {
        console.error("Failed to get history:", error);
        return [];
    }
}

/**
 * server action to load a specific conversation
 */
export async function loadConversation(id: string) {
    try {
        const messages = await getConversationMessages(id);
        // Serialize dates
        return messages.map(m => ({
            ...m,
            createdAt: m.createdAt.toISOString(),
        }));
    } catch (error) {
        console.error("Failed to load conversation:", error);
        return [];
    }
}
