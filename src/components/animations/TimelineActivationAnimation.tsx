"use client";

import { motion } from "framer-motion";
import { CreditCard, CheckCircle2 } from "lucide-react";

export default function TimelineActivationAnimation() {
    return (
        <div className="w-full h-48 bg-gray-50 rounded-2xl flex items-center justify-center relative overflow-hidden border border-gray-100">
            <div className="relative">
                {/* Terminal / Device */}
                <div className="w-20 h-28 bg-white rounded-xl border-2 border-gray-200 shadow-sm flex flex-col items-center justify-center relative">
                    <div className="w-12 h-8 border border-gray-100 rounded mb-2 bg-gray-50"></div>
                    <div className="w-12 h-1 bg-gray-100 rounded mb-1"></div>
                    <div className="w-8 h-1 bg-gray-100 rounded"></div>

                    {/* Success Indicator */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-white/90 rounded-xl"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: 0.6, type: "spring" }}
                        >
                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Connection Waves */}
                <motion.div
                    className="absolute -top-4 -right-4"
                    animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </motion.div>
            </div>
        </div>
    );
}
