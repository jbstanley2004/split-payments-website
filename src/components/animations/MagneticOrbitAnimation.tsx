"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// All brand logos including hardware brands and carousel brands
const ALL_LOGOS = [
    // Hardware payment brands
    "/brand_animations/pax.svg",
    "/brand_animations/clover_1.svg",
    "/brand_animations/clover_2.svg",
    "/brand_animations/verifone_1.svg",
    "/brand_animations/verifone_2.svg",
    "/brand_animations/dejavoo.webp",
    "/brand_animations/ingenico.svg",
    // New integrations
    "/brand_animations/quickbooks.svg",
    "/brand_animations/authorize.svg",
    "/brand_animations/nmi.svg",
    // Carousel brands
    "/brand_animations/svg0.svg",
    "/brand_animations/svg1.svg",
    "/brand_animations/svg2.svg",
    "/brand_animations/svg7.svg",
    "/brand_animations/svg15.svg",
    "/brand_animations/svg18.svg",
    "/brand_animations/svg19.svg",
    "/brand_animations/svg33.svg",
    "/brand_animations/svg34.svg",
    "/brand_animations/svg35.svg",
    "/brand_animations/svg36.svg",
    "/brand_animations/svg37.svg",
    "/brand_animations/svg92.svg",
];

// Select 10 logos to orbit for more density
const ORBIT_COUNT = 10;
const selectedLogos = ALL_LOGOS.slice(0, ORBIT_COUNT);

export default function MagneticOrbitAnimation() {
    const [currentSet, setCurrentSet] = useState(0);

    // Rotate through different sets of logos
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSet((prev) => (prev + ORBIT_COUNT) % ALL_LOGOS.length);
        }, 8000); // Change set every 8 seconds
        return () => clearInterval(interval);
    }, []);

    const logosToShow = ALL_LOGOS.slice(currentSet, currentSet + ORBIT_COUNT).concat(
        ALL_LOGOS.slice(0, Math.max(0, (currentSet + ORBIT_COUNT) - ALL_LOGOS.length))
    );

    return (
        <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden">
            {/* Background glow effect */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-orange/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700" />
            </div>

            {/* Central icon/logo */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative w-20 h-20 bg-gradient-to-br from-brand-orange to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl z-20"
                >
                    <svg
                        className="w-12 h-12 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                    </svg>
                </motion.div>
            </div>

            {/* Orbiting logos */}
            <div className="relative w-full h-full">
                {logosToShow.map((logo, index) => {
                    // Calculate orbit parameters
                    const angle = (index / ORBIT_COUNT) * Math.PI * 2;
                    // Elliptical orbit dimensions in pixels
                    const radiusX = 220;
                    const radiusY = 110;

                    const duration = 25 + (index * 2); // Varying speeds
                    const delay = index * 0.2;

                    return (
                        <motion.div
                            key={`${logo}-${currentSet}-${index}`}
                            className="absolute top-1/2 left-1/2"
                            style={{ marginLeft: -48, marginTop: -48 }} // Center the 96px (w-24) element
                            initial={{
                                x: 0,
                                y: 0,
                                opacity: 0,
                                scale: 0,
                            }}
                            animate={{
                                x: [
                                    Math.cos(angle) * radiusX,
                                    Math.cos(angle + Math.PI) * radiusX,
                                    Math.cos(angle) * radiusX,
                                ],
                                y: [
                                    Math.sin(angle) * radiusY,
                                    Math.sin(angle + Math.PI) * radiusY,
                                    Math.sin(angle) * radiusY,
                                ],
                                opacity: [0, 1, 1, 1, 0],
                                scale: [0.5, 1, 1, 1, 0.5],
                                zIndex: [1, 30, 1], // Bring to front when at bottom/front of orbit
                            }}
                            transition={{
                                duration: duration,
                                repeat: Infinity,
                                ease: "linear",
                                delay: delay,
                            }}
                        >
                            <div className="relative w-24 h-24 bg-white rounded-xl shadow-lg flex items-center justify-center p-4 backdrop-blur-sm border border-white/10">
                                <Image
                                    src={logo}
                                    alt="Brand Logo"
                                    fill
                                    className="object-contain p-3"
                                    sizes="96px"
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Orbit path rings (decorative) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="absolute w-[440px] h-[220px] border border-white/10 rounded-[100%] transform rotate-0" />
                <div className="absolute w-[500px] h-[250px] border border-white/5 rounded-[100%] transform rotate-0" />
            </div>
        </div>
    );
}
