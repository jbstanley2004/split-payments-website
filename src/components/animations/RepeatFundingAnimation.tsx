"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { RefreshCw, Check, ArrowUpRight, DollarSign } from "lucide-react";


export default function RepeatFundingAnimation() {
    const [stage, setStage] = useState<"repaying" | "eligible" | "renewed" | "morph" | "logo">("repaying");
    const [progress, setProgress] = useState(25);

    useEffect(() => {
        let mounted = true;
        const runCycle = async () => {
            while (mounted) {
                // 1. Repayment Phase
                setStage("repaying");
                for (let i = 25; i <= 100; i += 2) {
                    if (!mounted) break;
                    setProgress(i);
                    await new Promise(r => setTimeout(r, 50));
                }
                if (!mounted) break;

                // 2. Eligible Phase
                setStage("eligible");
                await new Promise(r => setTimeout(r, 3000));
                if (!mounted) break;

                // 3. Renewed Phase
                setStage("renewed");
                await new Promise(r => setTimeout(r, 2000));
                if (!mounted) break;

                // 4. Morph Phase (Circle -> Squircle)
                setStage("morph");
                await new Promise(r => setTimeout(r, 1000));
                if (!mounted) break;

                // 5. Logo Phase (Hold)
                setStage("logo");
                await new Promise(r => setTimeout(r, 3000));
                if (!mounted) break;

                // Reset
                setProgress(25);
            }
        };
        runCycle();
        return () => { mounted = false; };
    }, []);

    const startBalance = 20000;
    const currentBalance = startBalance - (startBalance * (progress / 100));

    return (
        <div className="w-full h-full bg-white flex flex-col font-sans text-black relative select-none overflow-hidden">
            <div className="flex-1 flex items-center justify-center relative p-6">

                {/* Container for the main graphic */}
                <div className="relative w-48 h-48 flex items-center justify-center">

                    {/* 1. The Progress Ring (Visible during Repaying/Eligible/Renewed) */}
                    {(stage === "repaying" || stage === "eligible" || stage === "renewed") && (
                        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                            <circle
                                cx="96" cy="96" r="84"
                                stroke="#f3f4f6" strokeWidth="12" fill="none"
                            />
                            <motion.circle
                                cx="96" cy="96" r="84"
                                stroke={stage === "renewed" ? "#111111" : "#4F46E5"}
                                strokeWidth="12" fill="none"
                                strokeLinecap="round"
                                strokeDasharray="528"
                                initial={false}
                                animate={{
                                    strokeDashoffset: 528 - (528 * (stage === "renewed" ? 100 : progress)) / 100,
                                    stroke: stage === "renewed" ? "#111111" : "#4F46E5"
                                }}
                                transition={{ duration: 0.5 }}
                            />
                        </svg>
                    )}

                    {/* 2. The Morphing Logo Shape (Visible during Morph/Logo) */}
                    {(stage === "morph" || stage === "logo") && (
                        <motion.div
                            layoutId="logo-container"
                            className="absolute flex items-center justify-center overflow-hidden"
                            initial={{
                                width: 180, // Matches ring diameter (approx)
                                height: 180,
                                borderRadius: "50%",
                                backgroundColor: "transparent",
                                border: "12px solid #111111"
                            }}
                            animate={{
                                width: 140, // Shrink slightly to logo size
                                height: 140,
                                borderRadius: "24%", // Squircle
                                backgroundColor: "#111111",
                                border: "0px solid #111111"
                            }}
                            transition={{ duration: 0.8, ease: "circInOut" }}
                        >
                            {/* Inner White Circle */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
                                className="w-[72%] h-[72%] bg-white rounded-full relative overflow-hidden"
                            >
                                {/* The Red Arc (3D Illusion) */}
                                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                                    <motion.path
                                        d="M 50,0 Q 85,50 50,100"
                                        fill="none"
                                        stroke="#FF3B30" // Red/Orange
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{ delay: 0.8, duration: 0.8, ease: "easeInOut" }}
                                    />
                                </svg>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* 3. The Wordmark Animation (Visible during Logo Phase) */}
                    {stage === "logo" && (
                        <motion.div
                            className="absolute top-full mt-6 flex items-center justify-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <img
                                src="/assets/split-wordmark.png"
                                alt="Split"
                                className="h-8 w-auto"
                            />
                        </motion.div>
                    )}

                    {/* Center Text Content (Fades out during Morph) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                        <AnimatePresence mode="wait">
                            {stage === "repaying" && (
                                <motion.div
                                    key="repaying"
                                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                                >
                                    <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Balance</div>
                                    <div className="text-3xl font-bold text-black font-poppins">
                                        ${currentBalance.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                    </div>
                                    <div className="text-[10px] font-medium text-indigo-600 mt-1 flex items-center justify-center gap-1">
                                        <ArrowUpRight className="w-3 h-3" /> Repaying
                                    </div>
                                </motion.div>
                            )}

                            {stage === "eligible" && (
                                <motion.div
                                    key="eligible"
                                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                                >
                                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-2 mx-auto">
                                        <Check className="w-7 h-7 text-emerald-600" />
                                    </div>
                                    <div className="text-lg font-bold text-black font-poppins">Paid in Full</div>
                                </motion.div>
                            )}

                            {stage === "renewed" && (
                                <motion.div
                                    key="renewed"
                                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
                                >
                                    <div className="text-[10px] font-bold text-teal-600 uppercase mb-1">New Funds</div>
                                    <div className="text-3xl font-bold text-teal-600 font-poppins">+$25,000</div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Renewal Notification Overlay */}
                <AnimatePresence>
                    {stage === "eligible" && (
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            className="absolute bottom-6 left-6 right-6 bg-black text-white p-4 rounded-xl shadow-lg flex items-center justify-between z-20"
                        >
                            <div>
                                <div className="text-[10px] font-medium text-gray-400 uppercase">Available Now</div>
                                <div className="text-base font-bold font-poppins">$25,000 Renewal</div>
                            </div>
                            <div className="h-9 w-9 bg-white/10 rounded-lg flex items-center justify-center">
                                <ArrowUpRight className="w-5 h-5 text-white" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}
