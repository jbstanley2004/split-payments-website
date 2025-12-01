"use client";

import { useState } from "react";
import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import PortalTabs from "@/components/portal/PortalTabs";
import { AnimatePresence, motion } from "framer-motion";
import AccountList from "@/components/admin/AccountList";
import AccountDetail from "@/components/admin/AccountDetail";
import { ApplicationStatus } from "@/types/portal";

export default function AdminDashboardPage() {
    const [activeView, setActiveView] = useState<'list' | 'detail'>('list');
    const [selectedAccount, setSelectedAccount] = useState<ApplicationStatus | null>(null);

    const handleAccountSelect = (account: ApplicationStatus) => {
        setSelectedAccount(account);
        setActiveView('detail');
    };

    const handleBack = () => {
        setSelectedAccount(null);
        setActiveView('list');
    };

    const handleUpdateAccount = (updatedAccount: ApplicationStatus) => {
        // Optimistic update for the detail view
        setSelectedAccount(updatedAccount);
    };

    return (
        <main className="min-h-screen bg-[#F6F5F4] text-brand-black font-poppins selection:bg-black/10 selection:text-black">
            <DynamicIslandNav />

            <div className="pt-32 px-6 md:px-10 lg:px-16 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 text-black/60 text-xs font-bold uppercase tracking-widest mb-4">
                        Admin Console
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-black font-poppins mb-4">
                        Control Center
                    </h1>
                    <p className="text-xl text-black/50 font-lora">
                        Manage accounts, approvals, and client communications.
                    </p>
                </div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeView}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {activeView === 'list' && (
                            <AccountList
                                onSelect={handleAccountSelect}
                            />
                        )}

                        {activeView === 'detail' && selectedAccount && (
                            <AccountDetail
                                account={selectedAccount}
                                onBack={handleBack}
                                onUpdate={handleUpdateAccount}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </main>
    );
}
