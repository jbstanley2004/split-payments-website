"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Check, TrendingUp, ArrowRight, Activity, Lock } from "lucide-react";
import Image from "next/image";

export default function FundingSimulation() {
    const [stage, setStage] = useState<"sales" | "offer" | "funded">("sales");

    useEffect(() => {
        let mounted = true;
        const runSequence = async () => {
            while (mounted) {
                // 1. Sales Phase
                setStage("sales");
                await new Promise(r => setTimeout(r, 4500));
                if (!mounted) break;

                // 2. Offer Phase
                setStage("offer");
                await new Promise(r => setTimeout(r, 4000));
                if (!mounted) break;

                // 3. Funded Phase
                setStage("funded");
                await new Promise(r => setTimeout(r, 3500));
                if (!mounted) break;
            }
        };
        runSequence();
        return () => { mounted = false; };
    }, []);

    return (
        <div className="w-full h-full bg-white flex flex-col font-sans text-black relative select-none">
            {/* Header - Minimal */}
            <div className="h-12 border-b border-gray-100 flex items-center justify-between px-5 shrink-0 bg-white z-10">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 relative flex items-center justify-center">
                        <Image src="/new_logo.svg" alt="Split Logo" width={36} height={36} className="object-contain" />
                    </div>
                    <span className="font-poppins font-bold text-sm text-black tracking-tight mt-0.5">Merchant Portal</span>
                </div>                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-full border border-gray-200">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-black uppercase tracking-wide">Live</span>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 relative overflow-hidden">
                <AnimatePresence mode="wait">
                    {stage === "sales" && <SalesView key="sales" />}
                    {(stage === "offer" || stage === "funded") && <OfferView key="offer" funded={stage === "funded"} />}
                </AnimatePresence>

                {/* Cursor Overlay */}
                <Cursor stage={stage} />
            </div>
        </div>
    );
}

function SalesView() {
    // Generate varied bar heights for 90-day trend (approx 45 bars for visual density)
    const bars = [
        15, 18, 12, 20, 25, 22, 30, 28, 35, 32, 40, 38, 45, 42, 50,
        48, 55, 52, 60, 58, 65, 62, 70, 68, 75, 72, 80, 78, 85, 82,
        90, 88, 95, 92, 98, 95, 100, 98, 92, 95, 88, 92, 85, 90, 82
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col p-5"
        >
            {/* Metrics Row */}
            <div className="flex justify-between items-end mb-4">
                <div>
                    <div className="text-[10px] font-bold text-black uppercase tracking-wider mb-1">30-Day Volume</div>
                    <motion.div
                        initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-black tracking-tight font-poppins"
                    >
                        $32,450<span className="text-black">.00</span>
                    </motion.div>
                </div>
                <div className="text-right">
                    <div className="text-[10px] font-bold text-black uppercase tracking-wider mb-1">90-Day Trend</div>
                    <div className="text-sm font-bold text-black font-poppins">+12.5%</div>
                </div>
            </div>

            {/* Chart Area */}
            <div className="flex-1 relative flex items-end gap-[1px] pb-2">
                {bars.map((h, i) => (
                    <motion.div
                        key={i}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: `${h}%`, opacity: 1 }}
                        transition={{ duration: 0.4, delay: i * 0.02, ease: "backOut" }}
                        className="flex-1 rounded-t-[1px]"
                        style={{
                            backgroundColor: '#14B8A6', // Vibrant Teal
                            opacity: 0.8 + (h / 300)
                        }}
                    />
                ))}

                {/* Qualification Line */}
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="absolute top-[30%] left-0 right-0 border-t border-dashed border-black/20 flex items-center"
                >
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2 }}
                        className="bg-white text-black text-[9px] font-bold px-1.5 py-0.5 rounded border border-gray-200 ml-2 -mt-2.5 shadow-sm"
                    >
                        ELIGIBLE
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
}

function OfferView({ funded }: { funded: boolean }) {
    return (
        <motion.div
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-0 bg-gray-50 p-4 flex items-center justify-center"
        >
            <div className="w-full max-w-[280px] bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden relative">

                {/* Success Overlay */}
                <AnimatePresence>
                    {funded && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-[#FF5F00] z-20 flex flex-col items-center justify-center text-white"
                        >
                            <motion.div
                                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }}
                                className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-lg"
                            >
                                <Check className="w-6 h-6 text-[#FF5F00]" />
                            </motion.div>
                            <h2 className="text-xl font-bold text-white font-poppins">Funded!</h2>
                            <p className="text-white/90 text-xs mt-1">Transfer initiated.</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Offer Header */}
                <div className="bg-[#4F46E5] p-5 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="text-[10px] font-bold text-white/80 uppercase tracking-widest mb-1">Available Now</div>
                        <div className="text-4xl font-bold text-white tracking-tight font-poppins">$20,000</div>
                    </div>
                </div>

                {/* Offer Details */}
                <div className="p-4 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-black font-bold">Repayment</span>
                        <span className="font-bold text-black">12% / day</span>
                    </div>

                    <button className="w-full mt-2 bg-black text-white text-xs font-bold py-3 rounded-lg shadow-md hover:bg-gray-900 flex items-center justify-center gap-1.5 transition-colors font-poppins">
                        Accept Offer <ArrowRight className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

function Cursor({ stage }: { stage: string }) {
    return (
        <motion.div
            className="absolute w-4 h-4 z-50 pointer-events-none drop-shadow-md"
            initial={{ x: "120%", y: "120%" }}
            animate={
                stage === "sales" ? { x: "85%", y: "85%", opacity: 0 } : // Hide during sales
                    stage === "offer" ? { x: "50%", y: "85%", opacity: 1 } : // Move to button
                        { x: "50%", y: "85%", scale: [1, 0.9, 1], opacity: 1 } // Click
            }
            transition={
                stage === "offer" ? { duration: 1, ease: "circOut" } :
                    { duration: 0.2 }
            }
        >
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="black" stroke="white" strokeWidth="2" />
            </svg>
        </motion.div>
    );
}
