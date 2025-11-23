"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function RepaymentAnimation() {
    const [cycle, setCycle] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCycle((prev) => prev + 1);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full flex items-center justify-center bg-gray-50 relative overflow-hidden">
            {/* Background Track */}
            <div className="absolute w-3/4 h-2 bg-gray-200 rounded-full overflow-hidden">
                {/* Moving Gradient to simulate flow */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
            </div>

            {/* Main Transaction Ball */}
            <motion.div
                key={cycle}
                className="absolute w-12 h-12 bg-black rounded-full shadow-lg z-10 flex items-center justify-center text-white font-bold text-xs"
                initial={{ x: -150, opacity: 0 }}
                animate={{ x: 150, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
            >
                $100
            </motion.div>

            {/* Split Particle (Repayment) */}
            <motion.div
                key={`split-${cycle}`}
                className="absolute w-4 h-4 bg-[#FF4306] rounded-full shadow-md z-0"
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{
                    x: 0,
                    y: 60,
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0.8]
                }}
                transition={{ delay: 1, duration: 1, ease: "easeOut" }}
            />

            {/* Label for Split */}
            <motion.div
                key={`label-${cycle}`}
                className="absolute text-[10px] font-bold text-[#FF4306] uppercase tracking-wider"
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{ x: 0, y: 80, opacity: [0, 1, 0] }}
                transition={{ delay: 1, duration: 1 }}
            >
                Split
            </motion.div>
        </div>
    );
}
