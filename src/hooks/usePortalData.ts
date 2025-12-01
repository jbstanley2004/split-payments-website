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

        const appRef = doc(db, 'applications', user.uid);

        const unsubscribe = onSnapshot(appRef, async (docSnap) => {
            try {
                if (docSnap.exists()) {
                    // Data exists, use it
                    const data = docSnap.data() as ApplicationStatus;
                    setApplicationStatus(data);
                } else {
                    // No data yet, create initial record
                    // Check session storage for wizard data
                    let initialData = generateInitialApplication(user.email || '');

                    if (typeof window !== 'undefined') {
                        const savedData = sessionStorage.getItem('portal_business_data');
                        if (savedData) {
                            try {
                                const parsed = JSON.parse(savedData);
                                initialData = generateInitialApplication(user.email || '', {
                                    businessName: parsed.legalName || parsed.businessName || 'Your Business',
                                    industry: parsed.industry || 'Retail',
                                    monthlyRevenue: parseInt(parsed.monthlyVolume?.replace(/[^0-9]/g, '') || parsed.monthlyRevenue) || 50000,
                                    yearsInBusiness: parseInt(parsed.yearsInBusiness) || 2,
                                    email: parsed.email || user.email,
                                    phone: parsed.phone || ''
                                });
                            } catch (e) {
                                console.error("Failed to parse wizard data", e);
                            }
                        }
                    }

                    try {
                        await setDoc(appRef, initialData);
                        setApplicationStatus(initialData);
                    } catch (error: any) {
                        console.error("Error creating application document:", error);
                        // If we get a permission error, still show the initial data
                        // This allows the user to see the UI even if Firestore writes fail
                        if (error.code === 'permission-denied') {
                            console.warn("Permission denied creating document. Security rules may need updating.");
                        }
                        setApplicationStatus(initialData);
                    }
                }
                setLoading(false);
            } catch (error) {
                console.error("Error in onSnapshot:", error);
                setLoading(false);
            }
        }, (error) => {
            console.error("Firestore snapshot error:", error);
            setLoading(false);
        });

        return () => unsubscribe();
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
