"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { BusinessProfileWizard, BusinessProfileData } from "@/components/portal/BusinessProfileWizard";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2 } from "lucide-react";

export default function OnboardingPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/portal/signin');
        }
    }, [user, loading, router]);

    const handleWizardSubmit = async (data: BusinessProfileData) => {
        if (!user) return;
        setIsSaving(true);

        try {
            // Parse revenue robustly
            let revenue = 50000;
            if (data.monthlyVolume) {
                const clean = String(data.monthlyVolume).replace(/[^0-9]/g, '');
                const val = parseInt(clean);
                if (!isNaN(val) && val > 0) revenue = val;
            }

            const approvalAmount = revenue * 1;

            // Create initial application data
            const initialData = {
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
                businessInfo: {
                    businessName: data.legalName || 'Your Business',
                    industry: 'Retail',
                    monthlyRevenue: revenue,
                    yearsInBusiness: 2,
                    email: user.email || '',
                    phone: data.phone || '',
                    ownerName: data.ownerName || ''
                },
                progressPercentage: 20
            };

            // Save directly to Firestore
            await setDoc(doc(db, 'applications', user.uid), initialData);
            console.log("Wizard data saved to Firestore successfully");

            // Redirect to dashboard
            router.push('/portal/dashboard');
        } catch (error) {
            console.error("Error saving wizard data:", error);
            // Handle error (maybe show toast)
        } finally {
            setIsSaving(false);
        }
    };

    if (loading || !user) {
        return (
            <div className="min-h-screen bg-[#F6F5F4] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-black/20" />
            </div>
        );
    }

    if (isSaving) {
        return (
            <div className="min-h-screen bg-[#F6F5F4] flex items-center justify-center flex-col gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-black/20" />
                <p className="text-gray-500 font-medium">Setting up your profile...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F6F5F4] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="w-full max-w-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Setup Your Business Profile</h1>
                    <p className="text-gray-500">Tell us a bit about your business to get started.</p>
                </div>
                <BusinessProfileWizard onSubmit={handleWizardSubmit} initialData={{ email: user.email || '' }} />
            </div>
        </div>
    );
}
