"use client";

import { ApplicationStatus } from "@/types/portal";
import { motion } from "framer-motion";
import { ArrowRight, Upload, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";

interface DashboardViewProps {
    applicationStatus: ApplicationStatus;
}

export default function DashboardView({ applicationStatus }: DashboardViewProps) {
    const { approvalAmount, documents, verificationInfo } = applicationStatus;

    // Determine the primary next step
    const getNextStep = () => {
        if (documents.length < 3) {
            return {
                label: "Action Required",
                title: "Upload Documents",
                description: "Securely upload your business documents to proceed.",
                action: "Upload Now",
                icon: Upload,
                color: "orange"
            };
        } else if (!verificationInfo.completed) {
            return {
                label: "Action Required",
                title: "Verify Identity",
                description: "Confirm your identity to finalize your application.",
                action: "Verify Now",
                icon: ShieldCheck,
                color: "blue"
            };
        } else {
            return {
                label: "Status",
                title: "In Review",
                description: "Our team is reviewing your application.",
                action: "View Details",
                icon: CheckCircle2,
                color: "green"
            };
        }
    };

    const nextStep = getNextStep();
    const StepIcon = nextStep.icon;

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-4xl mx-auto">
            {/* Hero Section - The Vault */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-center mb-16"
            >
                <div className="flex items-center justify-center gap-2 mb-6">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-medium text-black/40 uppercase tracking-widest font-poppins">
                        Capital Available
                    </span>
                </div>

                <h1 className="text-7xl md:text-9xl font-bold text-black font-poppins tracking-tighter mb-6">
                    ${(approvalAmount / 1000).toFixed(0)}k
                </h1>

                <p className="text-xl md:text-2xl text-black/60 font-lora max-w-2xl mx-auto leading-relaxed">
                    Pre-qualified based on your monthly revenue of <span className="text-black font-medium">${applicationStatus.businessInfo.monthlyRevenue.toLocaleString()}</span>.
                </p>
            </motion.div>

            {/* Command Bar - The Single Action */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-3xl flex items-end gap-3 px-4"
            >
                {/* Left Icon Button (Like the Paperclip) */}
                <button
                    onClick={() => {
                        const profileTab = document.querySelector('button[data-tab-id="profile"]') as HTMLButtonElement;
                        if (profileTab) profileTab.click();
                    }}
                    className="flex-shrink-0 w-12 h-12 mb-1 rounded-full bg-black text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all active:scale-95"
                >
                    {nextStep.label === "Action Required" && nextStep.title.includes("Upload") ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                        </svg>
                    ) : (
                        <StepIcon className="w-5 h-5" />
                    )}
                </button>

                {/* Right Content Pill (Like the Input Field) */}
                <div
                    onClick={() => {
                        const profileTab = document.querySelector('button[data-tab-id="profile"]') as HTMLButtonElement;
                        if (profileTab) profileTab.click();
                    }}
                    className="flex-1 bg-white rounded-[40px] p-2 pl-6 shadow-2xl border border-gray-100 flex items-center justify-between transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] cursor-pointer group"
                >
                    <div className="text-left py-2">
                        <div className="flex items-center gap-2 mb-0.5">
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${nextStep.color === 'orange' ? 'text-[#FF4306]' : 'text-black/40'
                                }`}>
                                {nextStep.label}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-black font-poppins leading-none mb-1">
                            {nextStep.title}
                        </h3>
                        <p className="text-sm text-black/50 font-lora">
                            {nextStep.description}
                        </p>
                    </div>

                    <button className="flex-shrink-0 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:bg-gray-900 shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                        </svg>
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
