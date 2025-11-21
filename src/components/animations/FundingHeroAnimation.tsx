"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Activity, CheckCircle2, TrendingUp, ArrowRight } from "lucide-react";

export default function FundingHeroAnimation() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => (prev + 1) % 3);
        }, 5000); // 5 seconds per slide
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto aspect-[16/9] bg-gray-50 rounded-3xl border border-gray-200 shadow-2xl overflow-hidden relative flex flex-col">
            {/* Browser/App Header */}
            <div className="h-12 bg-white border-b border-gray-100 flex items-center px-6 justify-between shrink-0">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400/20 border border-red-400/50" />
                    <div className="w-3 h-3 rounded-full bg-amber-400/20 border border-amber-400/50" />
                    <div className="w-3 h-3 rounded-full bg-green-400/20 border border-green-400/50" />
                </div>
                <div className="px-4 py-1 bg-gray-50 rounded-full text-xs font-medium text-gray-400 font-mono">
                    split.app/funding
                </div>
                <div className="w-16" /> {/* Spacer */}
            </div>

            {/* Main Content Area */}
            <div className="flex-1 relative bg-gray-50/50 p-8 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                    {step === 0 && <AnalysisStep key="step0" />}
                    {step === 1 && <OfferStep key="step1" />}
                    {step === 2 && <GrowthStep key="step2" />}
                </AnimatePresence>
            </div>

            {/* Progress Bar */}
            <div className="h-1 bg-gray-100 w-full shrink-0">
                <motion.div
                    key={step}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="h-full bg-black"
                />
            </div>

            {/* Step Indicators */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-8 pointer-events-none">
                <StepLabel active={step === 0} label="1. Monitor" icon={Activity} />
                <StepLabel active={step === 1} label="2. Qualify" icon={CheckCircle2} />
                <StepLabel active={step === 2} label="3. Scale" icon={TrendingUp} />
            </div>
        </div>
    );
}

function StepLabel({ active, label, icon: Icon }: { active: boolean; label: string; icon: any }) {
    return (
        <motion.div
            animate={{ opacity: active ? 1 : 0.4, scale: active ? 1.05 : 1 }}
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-gray-100"
        >
            <Icon className={`w-4 h-4 ${active ? "text-black" : "text-gray-400"}`} />
            <span className={`text-sm font-medium ${active ? "text-black" : "text-gray-500"}`}>{label}</span>
        </motion.div>
    );
}

function AnalysisStep() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full flex items-center justify-center"
        >
            <div className="relative w-[80%] h-[80%]">
                <Image
                    src="/funding-animation/funding-chart-2.svg"
                    alt="Analytics"
                    fill
                    className="object-contain drop-shadow-xl"
                />

                {/* Floating Badge */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-0 left-0 bg-black text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
                >
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs font-bold font-mono">LIVE DATA SYNC</span>
                </motion.div>
            </div>
        </motion.div>
    );
}

function OfferStep() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full flex items-center justify-center"
        >
            <div className="relative w-[85%] h-[85%]">
                <Image
                    src="/funding-animation/funding-ui-1.svg"
                    alt="Dashboard"
                    fill
                    className="object-contain drop-shadow-xl"
                />

                {/* Notification Overlay */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 text-center min-w-[280px]"
                >
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-1">You're Qualified!</h3>
                    <p className="text-gray-500 text-sm mb-4">Based on your recent volume.</p>
                    <div className="bg-black text-white py-2 rounded-lg text-sm font-medium cursor-pointer">
                        View Offer
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

function GrowthStep() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full flex items-center justify-center"
        >
            <div className="relative w-[80%] h-[80%]">
                <Image
                    src="/funding-animation/funding-chart-1.svg"
                    alt="Growth"
                    fill
                    className="object-contain drop-shadow-xl"
                />

                {/* Growth Metric */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="absolute bottom-10 right-10 bg-white/90 backdrop-blur p-4 rounded-xl shadow-xl border border-gray-200"
                >
                    <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Revenue Growth</div>
                    <div className="text-3xl font-bold text-green-600 flex items-center gap-1">
                        +124%
                        <TrendingUp className="w-5 h-5" />
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
