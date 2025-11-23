"use client";

import { motion } from "framer-motion";
import { Building2, ArrowDown } from "lucide-react";

export default function TimelineFundingAnimation() {
    return (
        <div className="w-full h-48 bg-gray-50 rounded-2xl flex items-center justify-center relative overflow-hidden border border-gray-100">
            <div className="flex flex-col items-center">
                {/* Bank Icon */}
                <Building2 className="w-16 h-16 text-gray-300 mb-2" />

                {/* Money Flow */}
                <motion.div
                    className="flex flex-col items-center gap-1 absolute top-10"
                    initial={{ y: -50, opacity: 0 }}
                    whileInView={{ y: 20, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg z-10">
                        $
                    </div>
                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                        <ArrowDown className="w-4 h-4 text-black" />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
