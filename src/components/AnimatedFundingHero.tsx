"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function AnimatedFundingHero() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        // Continuous floating animation
        const controls = animate(mouseY, [0, -20, 0], {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
        });

        return () => {
            controls.stop();
        };
    }, [mouseY]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        mouseX.set((e.clientX - centerX) / 20);
        mouseY.set((e.clientY - centerY) / 20);
    };

    const cardY = useTransform(mouseY, (value) => value * 0.5);
    const cardRotateX = useTransform(mouseY, [-100, 100], [5, -5]);
    const cardRotateY = useTransform(mouseX, [-100, 100], [-5, 5]);

    const bracketY = useTransform(mouseY, (value) => value * 0.8);
    const titleY = useTransform(mouseY, (value) => value * 0.3);

    return (
        <div
            className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-8 bg-[#E6E6E6]"
            onMouseMove={handleMouseMove}
        >
            {/* Left bracket */}
            <motion.div
                className="absolute left-[5%] sm:left-[15%] top-1/2 hidden sm:block pointer-events-none"
                style={{ y: bracketY }}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
            >
                <svg width="80" height="200" viewBox="0 0 80 200" fill="none">
                    <path
                        d="M 60 0 Q 20 0 20 40 L 20 160 Q 20 200 60 200"
                        stroke="rgba(153, 153, 153, 0.3)"
                        strokeWidth="2"
                        fill="none"
                    />
                </svg>
            </motion.div>

            {/* Right bracket */}
            <motion.div
                className="absolute right-[5%] sm:right-[15%] top-1/2 hidden sm:block pointer-events-none"
                style={{ y: bracketY }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
            >
                <svg width="80" height="200" viewBox="0 0 80 200" fill="none">
                    <path
                        d="M 20 0 Q 60 0 60 40 L 60 160 Q 60 200 20 200"
                        stroke="rgba(153, 153, 153, 0.3)"
                        strokeWidth="2"
                        fill="none"
                    />
                </svg>
            </motion.div>

            <div className="max-w-3xl w-full relative z-20">
                {/* Title */}
                <motion.div
                    className="text-center mb-8 sm:mb-12"
                    style={{ y: titleY }}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-[#1a1a1a] text-[36px] sm:text-[56px] leading-[1.1] tracking-[-0.02em] px-4 font-poppins font-normal">
                        Fast, flexible capital
                        <br />
                        powered by your sales.
                    </h1>
                </motion.div>

                {/* Tab label */}
                <motion.div
                    className="text-center mb-6 sm:mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <span className="font-poppins text-[#999999] text-[16px] sm:text-[18px] tracking-[-0.18px]">
                        Overview
                    </span>
                </motion.div>

                {/* Glass card */}
                <motion.div
                    className="relative z-30"
                    style={{
                        y: cardY,
                        rotateX: cardRotateX,
                        rotateY: cardRotateY,
                    }}
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="bg-white/40 backdrop-blur-xl rounded-[24px] sm:rounded-[32px] p-6 sm:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/50">
                        {/* Top icons */}
                        <div className="flex items-center justify-between mb-6 sm:mb-8">
                            <motion.div
                                className="w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center relative overflow-hidden"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                {/* Pulsing gradient background */}
                                <motion.div
                                    className="absolute inset-0 rounded-full opacity-30"
                                    style={{
                                        background:
                                            "radial-gradient(circle at center, #FF6B3D 0%, #FF4306 100%)",
                                    }}
                                    animate={{
                                        scale: [1, 1.4, 1],
                                        opacity: [0.3, 0.6, 0.3],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: [0.4, 0, 0.6, 1],
                                    }}
                                />
                                {/* Secondary pulse layer */}
                                <motion.div
                                    className="absolute inset-0 rounded-full opacity-20"
                                    style={{
                                        background:
                                            "radial-gradient(circle at center, #FF8A5C 0%, #FF6B3D 100%)",
                                    }}
                                    animate={{
                                        scale: [1.4, 1, 1.4],
                                        opacity: [0.2, 0.5, 0.2],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: [0.4, 0, 0.6, 1],
                                        delay: 1.5,
                                    }}
                                />
                                <div className="w-5 h-5 rounded-full bg-[#FF4306] relative z-10 shadow-lg shadow-[#FF4306]/30" />
                            </motion.div>
                        </div>

                        {/* Balance */}
                        <div className="mb-6 sm:mb-8">
                            <div className="font-poppins text-[#999999] text-[12px] sm:text-[14px] tracking-[-0.14px] mb-2 uppercase">
                                Available Capital
                            </div>
                            <div className="font-poppins text-[#1a1a1a] text-[40px] sm:text-[64px] leading-[1] tracking-[-2px]">
                                $127,840.32
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-2 sm:gap-4">
                            <Link href="/portal/signup" className="flex-1 min-w-0">
                                <motion.button
                                    className="w-full bg-[#1a1a1a] text-white rounded-full py-3 sm:py-4 px-4 sm:px-6 font-poppins text-[14px] sm:text-[18px] tracking-[-0.18px] flex items-center justify-center gap-1 sm:gap-2 whitespace-nowrap"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                >
                                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                                    <span className="truncate">Request Funds</span>
                                </motion.button>
                            </Link>

                            <Link href="/funding-concierge" className="flex-1 min-w-0">
                                <motion.button
                                    className="w-full bg-white text-[#1a1a1a] rounded-full py-3 sm:py-4 px-4 sm:px-6 font-poppins text-[14px] sm:text-[18px] tracking-[-0.18px] whitespace-nowrap"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                >
                                    <span className="truncate">Learn More</span>
                                </motion.button>
                            </Link>

                            <motion.button
                                className="w-12 h-12 sm:w-14 sm:h-14 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0"
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <span className="text-[#1a1a1a] text-[20px] sm:text-[24px]">•••</span>
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>


            {/* Footer Elements */}
            <div className="absolute bottom-8 left-8 sm:left-12 text-left pointer-events-none z-10">
                <p className="font-poppins text-[#999999] text-[12px] sm:text-[14px] leading-tight">
                    Split Funding
                    <br />
                    platform
                </p>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10">
                <p className="font-poppins text-[#999999] text-[12px] sm:text-[14px] leading-tight">
                    Built with
                    <br />
                    modern design
                </p>
            </div>

            <div className="absolute bottom-8 right-8 sm:right-12 text-right pointer-events-none z-10">
                <p className="font-poppins text-[#999999] text-[12px] sm:text-[14px] leading-tight">
                    Powered by
                    <br />
                    innovation
                </p>
            </div>
        </div >
    );
}
