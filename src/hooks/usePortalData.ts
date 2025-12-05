
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { doc, onSnapshot, setDoc, updateDoc, getDoc, Timestamp, arrayUnion, arrayRemove } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { useAuth } from "@/lib/auth-context";
import { db, storage } from "@/lib/firebase";
import { ApplicationStatus, Document, DocumentType } from "@/types/portal";
import { debounce } from 'lodash';

// --- Helper for creating initial data ---
const getInitialApplicationData = (email: string): ApplicationStatus => ({
    approvalAmount: 25000, // Default value
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
        status: 'pending',
        lastCheck: null,
    },
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
});

export function usePortalData() {
    const { user, loading: authLoading } = useAuth();
    const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus | null>(null);
    const [loading, setLoading] = useState(true);
    const [isNewUser, setIsNewUser] = useState(false);
    const router = useRouter();

    const debouncedSave = useCallback(
        debounce((dataToSave: Partial<ApplicationStatus>) => {
            if (user) {
                const appRef = doc(db, "applications", user.uid);
                updateDoc(appRef, dataToSave).catch((error) => console.error("[usePortalData] Autosave error:", error));
            }
        }, 1500),
        [user]
    );

    const immediateSave = async (dataToSave: Partial<ApplicationStatus>) => {
        if (user) {
            const appRef = doc(db, "applications", user.uid);
            try {
                await updateDoc(appRef, dataToSave);
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

        const appRef = doc(db, "applications", user.uid);
        const unsubscribe = onSnapshot(appRef, (docSnap) => {
            if (docSnap.exists()) {
                setApplicationStatus(docSnap.data() as ApplicationStatus);
                setIsNewUser(false);
            } else {
                const initialData = getInitialApplicationData(user.email!);
                setApplicationStatus(initialData);
                setIsNewUser(true);
                setDoc(appRef, initialData).catch(error => console.error("[usePortalData] Error creating document:", error));
            }
            setLoading(false);
        }, (error) => {
            console.error("[usePortalData] Snapshot error:", error);
            setLoading(false);
        });

        return () => unsubscribe();
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
        const storageRef = ref(storage, `applications/${user.uid}/documents/${docId}`);

        try {
            // 1. Upload the file
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            // 2. Create document metadata
            const newDocument: Document = {
                id: docId,
                type: type,
                filename: file.name,
                url: downloadURL,
                uploadedAt: Timestamp.now(),
            };

            // 3. Update Firestore
            const appRef = doc(db, "applications", user.uid);
            await updateDoc(appRef, {
                documents: arrayUnion(newDocument),
                updatedAt: Timestamp.now()
            });
            console.log("[usePortalData] Document added successfully.");

        } catch (error) {
            console.error("[usePortalData] Error uploading document:", error);
        }
    };

    const removeDocument = async (docId: string) => {
        if (!user || !applicationStatus) return;

        const docToRemove = applicationStatus.documents.find(d => d.id === docId);
        if (!docToRemove) {
            console.error("Document not found in state.");
            return;
        }

        const storageRef = ref(storage, `applications/${user.uid}/documents/${docId}`);

        try {
            // 1. Delete from Firestore
            const appRef = doc(db, "applications", user.uid);
            await updateDoc(appRef, {
                documents: arrayRemove(docToRemove),
                updatedAt: Timestamp.now()
            });

            // 2. Delete from Storage
            await deleteObject(storageRef);
            console.log("[usePortalData] Document removed successfully.");

        } catch (error) {
            console.error("[usePortalData] Error removing document:", error);
        }
    };

    // --- Update actions ---
    const updateVerification = (ein: string, ssn: string) => updateApplication({ verificationInfo: { ...applicationStatus?.verificationInfo, status: 'submitted' } }, true);
    
    const sendMessage = async (subject: string, body: string) => {
        if (!user || !applicationStatus) return;

        const newMessage = {
            id: `msg-${Date.now()}`,
            subject,
            body,
            timestamp: Timestamp.now(),
            read: true,
            sender: 'merchant' as const,
            category: 'general' as const,
        };

        const updatedMessages = [...applicationStatus.messages, newMessage];
        updateApplication({ messages: updatedMessages, updatedAt: Timestamp.now() }, true);
    };

    const markMessageAsRead = async (messageId: string) => {
        if (!user || !applicationStatus) return;

        const updatedMessages = applicationStatus.messages.map(msg =>
            msg.id === messageId ? { ...msg, read: true } : msg
        );

        updateApplication({ messages: updatedMessages, updatedAt: Timestamp.now() }, true);
    };

    const deleteMessage = async (messageId: string) => {
        if (!user || !applicationStatus) return;

        const updatedMessages = applicationStatus.messages.map(msg =>
            msg.id === messageId ? { ...msg, isDeleted: true } : msg
        );

        updateApplication({ messages: updatedMessages, updatedAt: Timestamp.now() }, true);
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
