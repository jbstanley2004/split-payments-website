"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Check, Lock, Unlock } from "lucide-react";
import { useInViewport } from "@/hooks/useInViewport";

export default function RefillAnimation() {
    const [progress, setProgress] = useState(0);
    const [unlocked, setUnlocked] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInViewport = useInViewport(containerRef);

    useEffect(() => {
        if (!isInViewport) return;
        const interval = setInterval(() => {
            setUnlocked(false);
            setProgress(0);

            // Animate progress
            let p = 0;
            const filler = setInterval(() => {
                p += 2;
                if (p >= 50) {
                    setUnlocked(true);
                }
                if (p >= 100) {
                    clearInterval(filler);
                }
                setProgress(Math.min(p, 100));
            }, 30);

        }, 4000);
        return () => clearInterval(interval);
    }, [isInViewport]);

    return (
        <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center bg-gray-50 p-8">

            {/* Status Indicator */}
            <div className="mb-8 flex items-center gap-2">
                <motion.div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-500 ${unlocked ? "bg-green-500 text-white" : "bg-gray-200 text-gray-400"}`}
                    animate={{ scale: unlocked ? [1, 1.2, 1] : 1 }}
                >
                    {unlocked ? <Unlock size={14} /> : <Lock size={14} />}
                </motion.div>
                <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Status</span>
                    <span className={`text-sm font-bold transition-colors duration-500 ${unlocked ? "text-green-600" : "text-gray-600"}`}>
                        {unlocked ? "Funding Unlocked" : "Repaying..."}
                    </span>
                </div>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full max-w-[200px] h-4 bg-gray-200 rounded-full overflow-hidden relative">
                {/* Threshold Marker */}
                <div className="absolute top-0 bottom-0 left-[50%] w-0.5 bg-white z-10 opacity-50"></div>

                {/* Fill */}
                <motion.div
                    className="h-full bg-black"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="w-full max-w-[200px] flex justify-between mt-2 text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                <span>0%</span>
                <span className={unlocked ? "text-green-600 font-bold" : ""}>50% (Unlock)</span>
                <span>100%</span>
            </div>

        </div>
    );
}
