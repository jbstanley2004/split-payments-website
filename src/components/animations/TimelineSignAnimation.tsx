"use client";

import { motion } from "framer-motion";
import { FileText, PenTool } from "lucide-react";

export default function TimelineSignAnimation() {
    return (
        <div className="w-full h-48 bg-gray-50 rounded-2xl flex items-center justify-center relative overflow-hidden border border-gray-100">
            <motion.div
                className="relative"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <FileText className="w-16 h-16 text-gray-300" />
                <motion.div
                    className="absolute bottom-2 right-0 text-black"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    <PenTool className="w-8 h-8 fill-black text-white" />
                </motion.div>
                {/* Signature effect */}
                <svg className="absolute bottom-4 left-4 w-8 h-4" viewBox="0 0 50 20">
                    <motion.path
                        d="M5,15 Q15,5 25,15 T45,15"
                        fill="none"
                        stroke="black"
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                    />
                </svg>
            </motion.div>
        </div>
    );
}
