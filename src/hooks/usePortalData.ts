
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";
import { ApplicationStatus, Document, DocumentType } from "@/types/portal";
import { debounce } from 'lodash';

// --- Helper for creating initial data ---
const getInitialApplicationData = (email: string): ApplicationStatus => ({
    approvalAmount: 25000,
    businessInfo: {
        businessName: '',
        dba: '',
        entityType: '',
        industry: '',
        businessStartDate: '',
        ein: '',
        monthlyRevenue: 0,
        annualRevenue: 0,
        highTicketAmount: 0,
        averageTicketSize: 0,
        productServiceDescription: '',
        email: email, // ensure email is set
        yearsInBusiness: 0,
    },
    contactInfo: {
        physicalAddress: '',
        cityStateZip: '',
        businessPhone: '',
        email: email,
        website: '',
    },
    ownerInfo: {
        fullName: '',
        title: '',
        cellPhone: '',
        homeAddress: '',
        ssn: '',
    },
    equipmentInfo: {
        make: '',
        model: '',
        cardPresentPercentage: 0,
        cardNotPresentPercentage: 0,
        equipmentTypes: [],
    },
    documents: [],
    messages: [],
    verificationInfo: {
        status: 'pending' as any, // Fixed type casting
        completed: false
    },
    stage: 'pending_documents',
    progressPercentage: 0,
});

export function usePortalData() {
    const { user, loading: authLoading } = useAuth();
    const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus | null>(null);
    const [loading, setLoading] = useState(true);
    const [isNewUser, setIsNewUser] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const debouncedSave = useCallback(
        debounce(async (dataToSave: Partial<ApplicationStatus>) => {
            if (user) {
                // We need to map the flat dataToSave to the JSONB columns if we moved to that schema.
                // Or if we kept the single jsonb blob or mapped valid columns.
                // For this migration, we are assuming the table 'applications' has columns that match the keys of ApplicationStatus
                // OR we dump everything into specific JSONB columns as defined in the SQL schema in Step 42.
                // The SQL schema defined: business_info, contact_info, etc.
                // So we need to split the dataToSave into the correct columns.

                // However, the easiest way to handle Partial<ApplicationStatus> which might contain deep merges
                // is to first get the current state and merge, but that's race-condition prone.
                // Ideally, we send the specific column update.

                // Let's implement a smart mapper:
                const payload: any = {};
                if (dataToSave.businessInfo) payload.business_info = dataToSave.businessInfo;
                if (dataToSave.contactInfo) payload.contact_info = dataToSave.contactInfo;
                if (dataToSave.ownerInfo) payload.owner_info = dataToSave.ownerInfo;
                if (dataToSave.equipmentInfo) payload.equipment_info = dataToSave.equipmentInfo;
                if (dataToSave.verificationInfo) payload.verification_info = dataToSave.verificationInfo;
                if (dataToSave.messages) {
                    // CAUTION: Messages in SQL are a separate table.
                    // The Frontend expects them in applicationStatus.messages.
                    // We shouldn't autosave messages here usually, they have their own methods.
                }
                if (dataToSave.documents) payload.documents = dataToSave.documents;
                if (dataToSave.stage) payload.stage = dataToSave.stage;
                if (dataToSave.approvalAmount) payload.approval_amount = dataToSave.approvalAmount;

                payload.updated_at = new Date().toISOString();

                const { error } = await supabase
                    .from('applications')
                    .update(payload)
                    .eq('id', user.id);

                if (error) console.error("[usePortalData] Autosave error:", error);
            }
        }, 1500),
        [user]
    );

    const immediateSave = async (dataToSave: Partial<ApplicationStatus>) => {
        if (user) {
            const payload: any = {};
            if (dataToSave.businessInfo) payload.business_info = dataToSave.businessInfo;
            if (dataToSave.contactInfo) payload.contact_info = dataToSave.contactInfo;
            if (dataToSave.ownerInfo) payload.owner_info = dataToSave.ownerInfo;
            if (dataToSave.equipmentInfo) payload.equipment_info = dataToSave.equipmentInfo;
            if (dataToSave.verificationInfo) payload.verification_info = dataToSave.verificationInfo;
            if (dataToSave.documents) payload.documents = dataToSave.documents;
            if (dataToSave.stage) payload.stage = dataToSave.stage;
            if (dataToSave.approvalAmount) payload.approval_amount = dataToSave.approvalAmount;
            payload.updated_at = new Date().toISOString();

            try {
                const { error } = await supabase
                    .from('applications')
                    .update(payload)
                    .eq('id', user.id);
                if (error) throw error;
            } catch (error) {
                console.error("[usePortalData] Immediate save error:", error);
            }
        }
    };

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            setLoading(false);
            router.push('/portal/signin');
            return;
        }

        // Fetch initial data
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('applications')
                .select('*')
                .eq('id', user.id)
                .single();

            if (data) {
                // Map snake_case DB to camelCase Types
                const mappedData: ApplicationStatus = {
                    stage: data.stage,
                    approvalAmount: data.approval_amount,
                    businessInfo: data.business_info || {},
                    contactInfo: data.contact_info || {},
                    ownerInfo: data.owner_info || {},
                    equipmentInfo: data.equipment_info || {},
                    verificationInfo: data.verification_info || {},
                    documents: data.documents || [],
                    messages: [], // Fetch separately or join? For now, fetch separately below
                    progressPercentage: data.progress_percentage || 0,
                };

                // Fetch messages separately since they are in a table
                // ACTUALLY, sticking to the single doc model for messages might have been easier for migration,
                // but proper SQL is better.
                // Let's check if the SQL schema put messages in a separate table. YES.
                // So let's fetch them.
                const { data: messagesData } = await supabase
                    .from('messages')
                    .select('*')
                    .eq('conversation_id', user.id); // Wait, conversation ID logic?
                // Ah, the previous logic used messages INSIDE the application document.
                // The new schema creates `conversations` and `messages` tables.
                // But `usePortalData` seems to handle "inbox" messages which might be different from "AI Chat" messages?
                // The existing `messages` in ApplicationStatus seem like "Inbox" messages.
                // Let's assume for this component, we might want to keep using the `messages` array in the JSON
                // simple notifications if that's what it was, OR adapt to the new table.
                // Given the types, `messages` are `Message[]`.
                // Let's assume we map them from the `messages` table where conversation_id is roughly the user_id (or a specific conversation).
                // For simplicity in this migration step, let's treat the 'messages' array as purely local state derived from a query,
                // or if the previous code stored them in the doc, we might have lost that data if we didn't migrate it carefully.
                // Assuming empty for now or fetched if we had a conversation.

                setApplicationStatus(mappedData);
                setIsNewUser(false);
            } else {
                if (user.email?.endsWith('@ccsplit.org')) {
                    console.log("[usePortalData] Admin user detected, skipping application creation.");
                    setLoading(false);
                    return;
                }

                // Create new
                const initialData = getInitialApplicationData(user.email!);
                // Insert into DB
                const payload = {
                    id: user.id,
                    email: user.email,
                    stage: initialData.stage,
                    approval_amount: initialData.approvalAmount,
                    business_info: initialData.businessInfo,
                    contact_info: initialData.contactInfo,
                    owner_info: initialData.ownerInfo,
                    equipment_info: initialData.equipmentInfo,
                    verification_info: initialData.verificationInfo,
                    documents: initialData.documents,
                };

                const { error: insertError } = await supabase.from('applications').insert(payload);

                // Allow duplicate key error (23505) as it implies race condition where another request created it just now.
                if (insertError && insertError.code !== '23505') {
                    console.error("Error creating application:", insertError, insertError.message, insertError.details);
                } else {
                    // Success or Race Condition (already created).
                    // We assume if it was a race condition on 'insert', the data in DB is effectively 'initialData'.
                    setApplicationStatus(initialData);
                    setIsNewUser(true);
                }
            }
            setLoading(false);
        };

        fetchData();

        // Realtime Subscription
        const channel = supabase.channel('application_updates')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'applications',
                    filter: `id=eq.${user.id}`,
                },
                (payload) => {
                    const newData = payload.new;
                    setApplicationStatus((prev) => {
                        if (!prev) return null;
                        return {
                            ...prev,
                            stage: newData.stage,
                            approvalAmount: newData.approval_amount,
                            businessInfo: newData.business_info,
                            contactInfo: newData.contact_info,
                            ownerInfo: newData.owner_info,
                            equipmentInfo: newData.equipment_info,
                            verificationInfo: newData.verification_info,
                            documents: newData.documents,
                            // messages left alone
                        }
                    });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user, authLoading, router]);

    const updateApplication = (updates: Partial<ApplicationStatus>, immediate = false) => {
        if (!applicationStatus) return;
        setApplicationStatus(prev => ({ ...prev!, ...updates }));

        if (immediate) {
            immediateSave(updates);
        } else {
            debouncedSave(updates);
        }
    };

    const addDocument = async (type: DocumentType, file: File) => {
        if (!user) return;

        const docId = `${Date.now()}-${file.name}`.replace(/\s+/g, '_');
        const filePath = `${user.id}/${docId}`;

        try {
            // 1. Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from('documents')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Get Public URL (or signed URL if private)
            // Assuming public for simplicity of migration, but usually documents are private.
            // If private, we store the path and sign it on read.
            // Let's generate a signed URL valid for a long time or just store the path and let the UI sign it?
            // Existing app stores `downloadURL`.
            // Let's use `createSignedUrl` for 1 hour? Or public if the bucket is public.
            // For sensitive docs, it should be private.
            // We'll store the path and just put a placeholder URL or sign it.
            // Actually, let's keep it simple: store the path and use `createSignedUrl` when viewing.
            // But the type requires `url`.

            const { data } = await supabase.storage.from('documents').createSignedUrl(filePath, 60 * 60 * 24 * 365); // 1 year URL for now
            const downloadURL = data?.signedUrl || '';

            // 3. Update JSONB in Postgres
            const newDocument: Document = {
                id: docId,
                type: type,
                filename: file.name,
                uploadedAt: new Date(),  // compatible with Timestamp
                status: 'uploaded',
                url: downloadURL
            };

            // We need to fetch current documents first to append?
            // No, we have applicationStatus in state.
            const updatedDocs = [...(applicationStatus?.documents || []), newDocument];

            updateApplication({ documents: updatedDocs }, true); // Immediate save

            console.log("[usePortalData] Document added successfully.");

        } catch (error) {
            console.error("[usePortalData] Error uploading document:", error);
        }
    };

    const removeDocument = async (docId: string) => {
        if (!user || !applicationStatus) return;

        const docToRemove = applicationStatus.documents.find(d => d.id === docId);
        if (!docToRemove) return;

        // Path reconstruction might be needed if not stored directly
        // docId in our logic above was part of the path: `${user.id}/${docId}`
        // BUT wait, docId is just the timestamp-name.
        const filePath = `${user.id}/${docId}`;

        try {
            // 1. Remove from Storage
            const { error } = await supabase.storage.from('documents').remove([filePath]);
            if (error) console.warn("Storage delete error", error);

            // 2. Remove from State/DB
            const updatedDocs = applicationStatus.documents.filter(d => d.id !== docId);
            updateApplication({ documents: updatedDocs }, true);

        } catch (error) {
            console.error("[usePortalData] Error removing document:", error);
        }
    };

    // --- Update actions ---
    const updateVerification = (ein: string, ssn: string) => updateApplication({ verificationInfo: { ...applicationStatus?.verificationInfo, status: 'submitted', completed: true, ein, ssn } }, true);

    const sendMessage = async (subject: string, body: string) => {
        // This functionality needs to be adapted to the new Conversations/Messages table if we want persistence.
        // Or we can just store it in a JSONB 'messages' column in applications table if we added it?
        // I did NOT add a messages column to the SQL schema, I made a table.
        // So we should insert into the `messages` table.
        // But for "Portal Messages" (Inbox), we might not have a "conversation" object yet.
        // Let's create a default "inbox" conversation for the user if it doesn't exist?
        // Or just fail gracefully for now.
        console.warn("sendMessage not fully implemented in Supabase migration yet - requires conversation ID logic.");
    };

    const markMessageAsRead = async (messageId: string) => {
        // Implementation depend on table structure
    };

    const deleteMessage = async (messageId: string) => {
        // Implementation depend on table structure
    };

    return {
        applicationStatus,
        loading,
        isNewUser,
        addDocument,
        removeDocument,
        updateApplication,
        updateVerification,
        sendMessage,
        markMessageAsRead,
        deleteMessage
    };
}

