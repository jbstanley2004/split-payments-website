import { getAdminDb } from "../firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

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
    preview: string; // Last message snippet
}

// Converters
const conversationConverter = {
    toFirestore(data: Partial<Conversation>): FirebaseFirestore.DocumentData {
        return data;
    },
    fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): Conversation {
        const data = snapshot.data();
        return {
            id: snapshot.id,
            userId: data.userId,
            title: data.title,
            createdAt: data.createdAt?.toDate(),
            updatedAt: data.updatedAt?.toDate(),
            preview: data.preview,
        };
    }
};

/**
 * Creates a new conversation
 */
export async function createConversation(userId: string, initialTitle: string = "New Chat"): Promise<string> {
    const db = getAdminDb();
    const docRef = await db.collection('conversations').add({
        userId,
        title: initialTitle,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
        preview: '',
    });
    return docRef.id;
}

/**
 * Adds a message to a conversation
 */
export async function addMessage(conversationId: string, role: string, content: string, embeddedComponent?: any) {
    const db = getAdminDb();
    const batch = db.batch();

    const convRef = db.collection('conversations').doc(conversationId);
    const msgRef = convRef.collection('messages').doc();

    // Add message
    batch.set(msgRef, {
        role,
        content,
        embeddedComponent: embeddedComponent || null,
        createdAt: FieldValue.serverTimestamp(),
    });

    // Update conversation preview and timestamp
    // Only update preview if it's not a system message (optional logic, but good for UX)
    const preview = content.slice(0, 60) + (content.length > 60 ? '...' : '');

    batch.update(convRef, {
        updatedAt: FieldValue.serverTimestamp(),
        preview,
    });

    await batch.commit();
    return msgRef.id;
}

/**
 * Gets all conversations for a user (ordered by recent)
 */
export async function getUserConversations(userId: string): Promise<Conversation[]> {
    const db = getAdminDb();
    const snapshot = await db.collection('conversations')
        .where('userId', '==', userId)
        .orderBy('updatedAt', 'desc')
        .withConverter(conversationConverter)
        .get();

    return snapshot.docs.map(doc => doc.data());
}

/**
 * Gets full message history for a conversation
 */
export async function getConversationMessages(conversationId: string): Promise<Message[]> {
    const db = getAdminDb();
    const snapshot = await db.collection('conversations')
        .doc(conversationId)
        .collection('messages')
        .orderBy('createdAt', 'asc')
        .get();

    return snapshot.docs.map(doc => ({
        id: doc.id,
        role: doc.data().role,
        content: doc.data().content,
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        embeddedComponent: doc.data().embeddedComponent,
    }));
}

/**
 * Updates conversation title (e.g. after AI generates one)
 */
export async function updateConversationTitle(conversationId: string, title: string) {
    const db = getAdminDb();
    await db.collection('conversations').doc(conversationId).update({
        title,
    });
}
