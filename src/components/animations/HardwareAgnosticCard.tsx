"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// List of available logos
const LOGOS = [
    "/brand_animations/pax.svg",
    "/brand_animations/clover_1.svg",
    "/brand_animations/clover_2.svg",
    "/brand_animations/verifone_1.svg",
    "/brand_animations/verifone_2.svg",
    "/brand_animations/dejavoo.webp",
    "/brand_animations/ingenico.svg",
];

export default function HardwareAgnosticCard() {
    const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentLogoIndex((prev) => (prev + 1) % LOGOS.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const currentSrc = LOGOS[currentLogoIndex];

    return (
        <div className="group flex flex-col bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md h-full">
            <div className="p-10 pb-0 flex flex-col relative z-10 bg-white">
                <div className="flex items-start justify-between mb-4">
                    <div className="space-y-2">
                        <span className="text-sm font-semibold text-brand-black/60">Hardware</span>
                        <h3 className="text-[32px] font-bold text-brand-black font-poppins leading-tight max-w-[90%]">
                            Hardware Agnostic.
                        </h3>
                        <p className="text-brand-black/70 font-lora leading-relaxed mt-4">
                            Our favorite is your favorite. We integrate seamlessly with the hardware you already know and trust.
                        </p>
                    </div>
                    <Link href="/get-started" className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white transition-transform group-hover:scale-110">
                            <ArrowRight className="w-6 h-6" />
                        </div>
                    </Link>
                </div>
            </div>

            <div className="mt-auto w-full bg-black relative border-t border-gray-100 overflow-hidden h-96 flex items-center justify-center">
                {/* Background Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-orange/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700" />
                </div>

                {/* Animation Container */}
                <div className="relative w-64 h-64 flex items-center justify-center scale-90">
                    {/* "Portal" Ring */}
                    <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />
                    <div className="absolute inset-4 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

                    {/* Logo Morphing */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentLogoIndex}
                            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="relative w-40 h-40 flex items-center justify-center bg-white rounded-full shadow-2xl"
                        >
                            {currentSrc && (
                                <Image
                                    src={currentSrc}
                                    alt="Hardware Brand Logo"
                                    fill
                                    className="object-contain p-8"
                                    priority
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Floating Particles */}
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1.5 h-1.5 bg-brand-orange/30 rounded-full"
                            animate={{
                                x: [0, Math.random() * 80 - 40],
                                y: [0, Math.random() * 80 - 40],
                                opacity: [0, 1, 0],
                                scale: [0, 1.5, 0],
                            }}
                            transition={{
                                duration: 2 + Math.random() * 2,
                                repeat: Infinity,
                                delay: i * 0.5,
                            }}
                            style={{
                                top: "50%",
                                left: "50%",
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
