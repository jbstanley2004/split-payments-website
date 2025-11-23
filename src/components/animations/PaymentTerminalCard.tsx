"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Check, CreditCard, Loader2, Receipt } from "lucide-react";

export default function PaymentTerminalCard() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => (prev + 1) % 3);
        }, 4000); // Change slide every 4 seconds
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full h-full bg-transparent relative overflow-hidden flex items-center justify-center p-6">
            <AnimatePresence mode="wait">
                {step === 0 && <PaymentInitCard key="step0" />}
                {step === 1 && <ProcessingCard key="step1" />}
                {step === 2 && <SuccessCard key="step2" />}
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

function PaymentInitCard() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-[320px] border border-gray-100"
        >
            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center mb-4">
                <CreditCard className="text-white w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-brand-black mb-2 font-poppins">
                Payment Ready
            </h3>
            <p className="text-brand-black/70 font-lora mb-4">
                Customer is ready to pay <span className="font-bold text-brand-black">$42.50</span>
            </p>

            {/* Terminal Type Selection */}
            <div className="space-y-2">
                <div className="text-xs text-brand-black/50 uppercase tracking-wider font-poppins mb-3">Terminal Type</div>
                {["Countertop POS", "Mobile Terminal", "Wireless Reader"].map((type, i) => (
                    <motion.div
                        key={type}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 + 0.2 }}
                        className={`p-3 rounded-lg border ${i === 0
                            ? "border-black bg-black text-white"
                            : "border-gray-200 bg-gray-50 text-brand-black/50"
                            } text-sm font-poppins transition-all`}
                    >
                        {type}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

function ProcessingCard() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-black rounded-2xl shadow-2xl p-6 w-full max-w-[320px] text-white"
        >
            <div className="flex justify-between items-center mb-8">
                <span className="text-sm text-white/60 font-poppins">Processing</span>
                <Loader2 className="w-4 h-4 text-white/60 animate-spin" />
            </div>

            <div className="text-4xl font-bold font-poppins mb-2">
                $42.50
            </div>
            <div className="text-xs text-white/40 mb-8 font-poppins uppercase tracking-wider">Transaction in Progress</div>

            {/* Processing Steps */}
            <div className="space-y-3">
                {[
                    { label: "Card detected", delay: 0 },
                    { label: "Authorizing payment", delay: 0.3 },
                    { label: "Verifying funds", delay: 0.6 }
                ].map((item, i) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: item.delay }}
                        className="flex items-center gap-3"
                    >
                        <motion.div
                            className="w-2 h-2 rounded-full bg-white"
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.2, 1] }}
                            transition={{ delay: item.delay, duration: 0.4 }}
                        />
                        <span className="text-sm text-white/80 font-lora">{item.label}</span>
                    </motion.div>
                ))}
            </div>

            {/* Progress Bar */}
            <div className="mt-6 h-1 w-full bg-white/20 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="h-full bg-white"
                />
            </div>
        </motion.div>
    );
}

function SuccessCard() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-[320px] border border-gray-100"
        >
            {/* Success Icon */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mb-4 mx-auto"
            >
                <Check className="text-white w-8 h-8" strokeWidth={3} />
            </motion.div>

            <h3 className="text-xl font-bold text-brand-black mb-2 font-poppins text-center">
                Payment Successful
            </h3>
            <p className="text-brand-black/70 font-lora mb-6 text-center text-sm">
                Transaction completed securely
            </p>

            {/* Transaction Details */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-xs text-brand-black/50 font-poppins uppercase tracking-wider">Amount</span>
                    <span className="font-bold text-brand-black font-poppins">$42.50</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xs text-brand-black/50 font-poppins uppercase tracking-wider">Card</span>
                    <span className="text-sm text-brand-black/70 font-lora">•••• 4242</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xs text-brand-black/50 font-poppins uppercase tracking-wider">Ref</span>
                    <span className="text-sm text-brand-black/70 font-mono">#TXN-2025-1122</span>
                </div>
            </div>

            {/* Receipt Icon */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 flex items-center justify-center gap-2 text-brand-black/50 text-xs font-poppins"
            >
                <Receipt className="w-4 h-4" />
                <span>Receipt sent</span>
            </motion.div>
        </motion.div>
    );
}
