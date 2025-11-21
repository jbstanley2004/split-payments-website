"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Check, ChevronRight, DollarSign, SlidersHorizontal } from "lucide-react";

export default function WorkingCapitalAnimation() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => (prev + 1) % 3);
        }, 4000); // Change slide every 4 seconds
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full h-full bg-gray-50 relative overflow-hidden flex items-center justify-center p-6">
            <AnimatePresence mode="wait">
                {step === 0 && <PreApprovedCard key="step0" />}
                {step === 1 && <SliderCard key="step1" />}
                {step === 2 && <AdvancesListCard key="step2" />}
            </AnimatePresence>

            {/* Progress Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className={`h-1 rounded-full ${i === step ? "bg-black w-6" : "bg-black/20 w-1"}`}
                        layout
                        transition={{ duration: 0.3 }}
                    />
                ))}
            </div>
        </div>
    );
}

function PreApprovedCard() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-[320px] border border-gray-100"
        >
            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center mb-4">
                <Check className="text-white w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-brand-black mb-2 font-poppins">
                Pre-approved
            </h3>
            <p className="text-brand-black/70 font-lora mb-4">
                Your business is pre-approved for <span className="font-bold text-brand-black">$10,000</span> in working capital.
            </p>
            <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                    className="h-full bg-green-500"
                />
            </div>
        </motion.div>
    );
}

function SliderCard() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-black rounded-2xl shadow-2xl p-6 w-full max-w-[320px] text-white"
        >
            <div className="flex justify-between items-center mb-8">
                <span className="text-sm text-white/60 font-poppins">Advance amount</span>
                <SlidersHorizontal className="w-4 h-4 text-white/60" />
            </div>

            <div className="text-4xl font-bold font-poppins mb-2 flex items-center">
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >$</motion.span>
                <CountUp from={10000} to={20000} />
            </div>
            <div className="text-xs text-white/40 mb-8 font-poppins uppercase tracking-wider">Selected Amount</div>

            <div className="relative h-12 flex items-center">
                <div className="absolute left-0 right-0 h-2 bg-white/20 rounded-full"></div>
                <motion.div
                    className="absolute left-0 h-2 bg-white rounded-full"
                    initial={{ width: "50%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                />
                <motion.div
                    className="absolute w-8 h-8 bg-white rounded-full shadow-lg cursor-grab active:cursor-grabbing flex items-center justify-center"
                    initial={{ left: "50%" }}
                    animate={{ left: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                    style={{ x: "-50%" }}
                >
                    <div className="w-1 h-3 bg-black/20 rounded-full" />
                </motion.div>
            </div>

            <div className="flex justify-between mt-2 text-xs text-white/40 font-poppins">
                <span>$10k</span>
                <span>$20k</span>
            </div>
        </motion.div>
    );
}

function AdvancesListCard() {
    const items = [
        { amount: "5,000", date: "Jan 1, 2025", status: "paid" },
        { amount: "1,500", date: "Mar 15, 2025", status: "paid" },
        { amount: "20,000", date: "Aug 1, 2025", status: "active" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-[320px] border border-gray-100"
        >
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-brand-black font-poppins">Advances</h3>
                <div className="bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-brand-black/60">All</div>
            </div>

            <div className="space-y-4">
                {items.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 + 0.2 }}
                        className="flex items-center justify-between group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-brand-black/40 group-hover:bg-black group-hover:text-white transition-colors">
                                <DollarSign className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="font-bold text-brand-black font-poppins">${item.amount}</div>
                                <div className="text-xs text-brand-black/50 font-lora">{item.date}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {item.status === "paid" ? (
                                <span className="px-2 py-1 rounded-md bg-gray-100 text-xs text-gray-500 font-medium">paid</span>
                            ) : (
                                <span className="px-2 py-1 rounded-md bg-green-100 text-xs text-green-700 font-medium animate-pulse">active</span>
                            )}
                            <ChevronRight className="w-4 h-4 text-gray-300" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

function CountUp({ from, to }: { from: number; to: number }) {
    const [count, setCount] = useState(from);

    useEffect(() => {
        const controls = { value: from };
        const duration = 1500; // ms
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);

            setCount(Math.floor(from + (to - from) * ease));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        // Delay start to match slider
        const timeout = setTimeout(() => {
            requestAnimationFrame(animate);
        }, 500);

        return () => clearTimeout(timeout);
    }, [from, to]);

    return <>{count.toLocaleString()}</>;
}
