"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// List of available logos from the new directory
const LOGOS = [
    "/brand_animations/pax.svg",
    "/brand_animations/clover_1.svg",
    "/brand_animations/clover_2.svg",
    "/brand_animations/verifone_1.svg",
    "/brand_animations/verifone_2.svg",
    "/brand_animations/dejavoo.webp",
    "/brand_animations/ingenico.svg",
];

export default function BrandHeroAnimation() {
    const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentLogoIndex((prev) => (prev + 1) % LOGOS.length);
        }, 2500); // Slightly slower for better visibility
        return () => clearInterval(interval);
    }, []);

    const currentSrc = LOGOS[currentLogoIndex];

    return (
        <section className="relative w-full py-24 bg-white overflow-hidden flex flex-col items-center justify-center">

            {/* Background Elements for "Visual Effects" */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-700" />
            </div>

            <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-poppins font-bold tracking-tight text-black mb-6"
                >
                    Hardware Agnostic
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl md:text-3xl font-lora italic text-gray-600 mb-16"
                >
                    Our Favorite Is Your Favorite.
                </motion.p>

                {/* Morphing Logo Container */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto flex items-center justify-center">
                    {/* "Portal" Ring */}
                    <div className="absolute inset-0 border border-gray-100 rounded-full animate-[spin_10s_linear_infinite]" />
                    <div className="absolute inset-4 border border-gray-50 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

                    {/* Logo Morphing */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentLogoIndex}
                            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center"
                        >
                            {currentSrc && (
                                <Image
                                    src={currentSrc}
                                    alt="Hardware Brand Logo"
                                    fill
                                    className="object-contain p-4 drop-shadow-xl"
                                    priority
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Floating Particles */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-brand-orange/20 rounded-full"
                            animate={{
                                x: [0, Math.random() * 100 - 50],
                                y: [0, Math.random() * 100 - 50],
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
        </section>
    );
}
