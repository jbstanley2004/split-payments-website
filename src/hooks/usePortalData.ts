"use client";

import { useState, useEffect } from 'react';
import { ApplicationStatus, Message, Document, BusinessInfo } from '@/types/portal';
import { useAuth } from '@/lib/auth-context';
import { db } from '@/lib/firebase';
import { doc, onSnapshot, setDoc, updateDoc, arrayUnion, arrayRemove, collection, query, where, getDocs } from 'firebase/firestore';

// Initial state generator
function generateInitialApplication(userEmail: string, businessInfo?: BusinessInfo): ApplicationStatus {
    const approvalAmount = (businessInfo?.monthlyRevenue || 50000) * 1;

    return {
        stage: 'pending_documents',
        documents: [],
        verificationInfo: { completed: false },
        approvalAmount,
        messages: [
            {
                id: 'welcome-msg',
                subject: 'Welcome to Split! 🎉',
                body: `Congratulations! You've been pre-approved for up to $${approvalAmount.toLocaleString()} in funding based on your estimated monthly sales. Complete the next steps to finalize your application.`,
                timestamp: new Date(),
                read: false,
                category: 'updates'
            }
        ],
        businessInfo: businessInfo || {
            businessName: 'Your Business',
            industry: 'Retail',
            monthlyRevenue: 50000,
            yearsInBusiness: 2,
            email: userEmail
        },
        progressPercentage: 20
    };
}

export function usePortalData() {
    const { user } = useAuth();
    const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus | null>(null);
    const [loading, setLoading] = useState(true);

    // 1. Subscribe to Firestore Data
    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        console.log('[usePortalData] Setting up listener for user:', user.uid);

        // Safety timeout - if loading takes more than 5 seconds, show default data
        const timeoutId = setTimeout(() => {
            console.warn('[usePortalData] Loading timeout - showing default data');
            if (loading) {
                setApplicationStatus(generateInitialApplication(user.email || ''));
                setLoading(false);
            }
        }, 5000);

        const appRef = doc(db, 'applications', user.uid);

        const unsubscribe = onSnapshot(appRef, async (docSnap) => {
            try {
                console.log('[usePortalData] Snapshot received. Exists:', docSnap.exists());

                if (docSnap.exists()) {
                    // Data exists, use it
                    const data = docSnap.data() as ApplicationStatus;
                    console.log('[usePortalData] Loaded existing data');
                    setApplicationStatus(data);
                } else {
                    console.log('[usePortalData] No document found, creating initial data...');

                    // No data yet, create initial record
                    let initialData = generateInitialApplication(user.email || '');

                    // Check session storage for wizard data
                    if (typeof window !== 'undefined') {
                        const savedData = sessionStorage.getItem('portal_business_data');
                        if (savedData) {
                            try {
                                const parsed = JSON.parse(savedData);
                                console.log('[usePortalData] Found wizard data:', parsed);
                                initialData = generateInitialApplication(user.email || '', {
                                    businessName: parsed.legalName || parsed.businessName || 'Your Business',
                                    industry: parsed.industry || 'Retail',
                                    monthlyRevenue: parseInt(parsed.monthlyVolume?.replace(/[^0-9]/g, '') || parsed.monthlyRevenue) || 50000,
                                    yearsInBusiness: parseInt(parsed.yearsInBusiness) || 2,
                                    email: parsed.email || user.email,
                                    phone: parsed.phone || ''
                                });
                            } catch (e) {
                                console.error("[usePortalData] Failed to parse wizard data", e);
                            }
                        }
                    }

                    // Set state immediately so UI shows something
                    setApplicationStatus(initialData);

                    // Try to save to Firestore (but don't wait for it)
                    setDoc(appRef, initialData)
                        .then(() => console.log('[usePortalData] Document created successfully'))
                        .catch((error: any) => {
                            console.error("[usePortalData] Error creating document:", error);
                            // Still keep the local state even if save fails
                        });
                }

                clearTimeout(timeoutId);
                setLoading(false);
            } catch (error) {
                console.error("[usePortalData] Error in onSnapshot:", error);
                clearTimeout(timeoutId);
                setLoading(false);
            }
        }, (error) => {
            console.error("[usePortalData] Firestore snapshot error:", error);
            // Show default data even on error
            setApplicationStatus(generateInitialApplication(user.email || ''));
            clearTimeout(timeoutId);
            setLoading(false);
        });

        return () => {
            clearTimeout(timeoutId);
            unsubscribe();
        };
    }, [user]);

    // 2. Actions (Write to Firestore)

    const addDocument = async (document: Document) => {
        if (!user || !applicationStatus) return;
        const appRef = doc(db, 'applications', user.uid);

        const newMessage: Message = {
            id: `msg-${Date.now()}`,
            subject: `Document received: ${document.filename}`,
            body: `We've received your ${document.type.replace('_', ' ')}. Our team will review it shortly.`,
            timestamp: new Date(),
            read: false,
            category: 'updates'
        };

        await updateDoc(appRef, {
            documents: arrayUnion(document),
            messages: [newMessage, ...applicationStatus.messages]
        });
    };

    const removeDocument = async (documentId: string) => {
        if (!user || !applicationStatus) return;
        const appRef = doc(db, 'applications', user.uid);
        const docToRemove = applicationStatus.documents.find(d => d.id === documentId);

        if (docToRemove) {
            await updateDoc(appRef, {
                documents: arrayRemove(docToRemove)
            });
        }
    };

    const updateVerification = async (ein: string, ssn: string) => {
        if (!user || !applicationStatus) return;
        const appRef = doc(db, 'applications', user.uid);

        const newMessage: Message = {
            id: `msg-${Date.now()}`,
            subject: 'Verification information received',
            body: 'Thank you for providing your verification details. Your application is now in final review.',
            timestamp: new Date(),
            read: false,
            category: 'updates'
        };

        await updateDoc(appRef, {
            verificationInfo: { ein, ssn, completed: true },
            messages: [newMessage, ...applicationStatus.messages],
            stage: 'final_review', // Auto-advance for prototype
            progressPercentage: 100
        });
    };

    const markMessageAsRead = async (messageId: string) => {
        if (!user || !applicationStatus) return;
        const appRef = doc(db, 'applications', user.uid);

        const updatedMessages = applicationStatus.messages.map(msg =>
            msg.id === messageId ? { ...msg, read: true } : msg
        );

        await updateDoc(appRef, { messages: updatedMessages });
    };

    return {
        applicationStatus,
        loading,
        addDocument,
        removeDocument,
        updateVerification,
        markMessageAsRead
    };
}
