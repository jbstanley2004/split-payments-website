'use client';

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import PortalTabs from "@/components/portal/PortalTabs";
import DashboardView from "@/components/portal/DashboardView";
import BusinessProfileView from "@/components/portal/BusinessProfileView";
import InboxView from "@/components/portal/InboxView";
import { usePortalData } from "@/hooks/usePortalData";
import { AnimatePresence, motion } from "framer-motion";

export default function PortalDashboardPage() {
    const [activeSection, setActiveSection] = useState<'dashboard' | 'profile' | 'inbox'>('dashboard');
    const [targetSection, setTargetSection] = useState<string | null>(null);
    const {
        applicationStatus,
        loading,
        isNewUser,
        addDocument,
        removeDocument,
        updateVerification,
        updateApplication,
        markMessageAsRead,
        sendMessage,
        deleteMessage
    } = usePortalData();
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/portal/signin');
            return;
        }

        // Admin redirect safety check
        if (user?.email?.endsWith('@split-llc.com')) {
            router.push('/admin');
            return;
        }

        if (!authLoading && user && isNewUser) {
            router.push('/portal/onboarding');
        }
    }, [user, authLoading, isNewUser, router]);

    const handleNavigateToSection = (sectionId: string) => {
        setActiveSection('profile');
        setTargetSection(sectionId);
    };

    if (loading || !applicationStatus) {
        return (
            <div className="min-h-screen bg-[#F6F5F4] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-black/20" />
            </div>
        );
    }

    const unreadMessages = applicationStatus.messages.filter(m => !m.read).length;

    const tabs = [
        { id: 'dashboard', label: 'Overview' },
        { id: 'profile', label: 'Profile' },
        { id: 'inbox', label: 'Inbox', count: unreadMessages }
    ];

    return (
        <main className="min-h-screen bg-[#F6F5F4] text-brand-black font-poppins selection:bg-black/10 selection:text-black">
            <DynamicIslandNav />

            <div className="pt-32 px-6 md:px-10 lg:px-16 max-w-7xl mx-auto">
                {/* Navigation - Floating & Minimal */}
                <div className="mb-16 flex justify-center">
                    <PortalTabs
                        tabs={tabs}
                        activeTab={activeSection}
                        onChange={(id) => setActiveSection(id as any)}
                    />
                </div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {activeSection === 'dashboard' && (
                            <DashboardView
                                applicationStatus={applicationStatus}
                                onNavigate={handleNavigateToSection}
                            />
                        )}

                        {activeSection === 'profile' && (
                            <BusinessProfileView
                                applicationStatus={applicationStatus}
                                onDocumentUpload={addDocument} // Pass the addDocument function
                                onDocumentRemove={removeDocument} // Pass the removeDocument function
                                onVerificationSubmit={updateVerification}
                                onUpdateProfile={updateApplication}
                                targetSection={targetSection}
                            />
                        )}

                        {activeSection === 'inbox' && (
                            <InboxView
                                messages={applicationStatus.messages}
                                onMarkAsRead={markMessageAsRead}
                                onNavigate={handleNavigateToSection}
                                onSendMessage={sendMessage}
                                onDeleteMessage={deleteMessage}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </main>
    );
}
