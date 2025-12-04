
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

    const debouncedUpdateFirestore = useCallback(
        debounce((dataToSave: Partial<ApplicationStatus>) => {
            if (user) {
                const appRef = doc(db, "applications", user.uid);
                updateDoc(appRef, dataToSave).catch((error) => console.error("[usePortalData] Autosave error:", error));
            }
        }, 1500),
        [user]
    );

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

    const updateAndAutosave = (updates: Partial<ApplicationStatus>) => {
        if (!applicationStatus) return;
        setApplicationStatus(prev => ({ ...prev!, ...updates }));
        debouncedUpdateFirestore(updates);
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

    // --- Update actions using the generic updater ---
    const updateBusinessProfile = (updates: any) => updateAndAutosave({ businessInfo: { ...applicationStatus?.businessInfo, ...updates } });
    const updateContactInfo = (updates: any) => updateAndAutosave({ contactInfo: { ...applicationStatus?.contactInfo, ...updates } });
    const updateOwnerInfo = (updates: any) => updateAndAutosave({ ownerInfo: { ...applicationStatus?.ownerInfo, ...updates } });
    const updateEquipmentInfo = (updates: any) => updateAndAutosave({ equipmentInfo: { ...applicationStatus?.equipmentInfo, ...updates } });
    const updateVerification = (ein: string, ssn: string) => updateAndAutosave({ verificationInfo: { ...applicationStatus?.verificationInfo, status: 'submitted' } });
    const sendMessage = (body: string) => { /* ... implementation ... */ };
    const markMessageAsRead = (messageId: string) => { /* ... implementation ... */ };
    const deleteMessage = (messageId: string) => { /* ... implementation ... */ };

    return {
        applicationStatus,
        loading,
        isNewUser,
        addDocument,
        removeDocument,
        updateBusinessProfile,
        updateContactInfo,
        updateOwnerInfo,
        updateEquipmentInfo,
        updateVerification,
        sendMessage,
        markMessageAsRead,
        deleteMessage
    };
}
