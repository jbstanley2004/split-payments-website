"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useInViewport } from "@/hooks/useInViewport";

// All brand logos
const ALL_LOGOS = [
    "/brand_animations/pax.svg",
    "/brand_animations/clover_1.svg",
    "/brand_animations/clover_2.svg",
    "/brand_animations/verifone_1.svg",
    "/brand_animations/verifone_2.svg",
    "/brand_animations/dejavoo.webp",
    "/brand_animations/ingenico.svg",
    "/brand_animations/quickbooks.svg",
    "/brand_animations/authorize.svg",
    "/brand_animations/nmi.svg",
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

// Grid configuration
const GRID_ROWS = 3;
const GRID_COLS = 4;
const CELL_COUNT = GRID_ROWS * GRID_COLS;

export default function LivingGridAnimation() {
    // Initialize grid with first N logos
    const [activeLogos, setActiveLogos] = useState(ALL_LOGOS.slice(0, CELL_COUNT));
    const containerRef = useRef<HTMLDivElement>(null);
    const isInViewport = useInViewport(containerRef);

    useEffect(() => {
        if (!isInViewport) return;
        // Randomly swap a logo every 1.5s
        const interval = setInterval(() => {
            setActiveLogos(current => {
                const newLogos = [...current];
                const randomGridIndex = Math.floor(Math.random() * CELL_COUNT);

                // Find logos that are NOT currently visible
                const availableLogos = ALL_LOGOS.filter(
                    logo => !current.includes(logo)
                );

                // If we have available logos, pick one randomly
                if (availableLogos.length > 0) {
                    const randomLogo = availableLogos[Math.floor(Math.random() * availableLogos.length)];
                    newLogos[randomGridIndex] = randomLogo;
                }

                return newLogos;
            });
        }, 1500);

        return () => clearInterval(interval);
    }, [isInViewport]);

    return (
        <div ref={containerRef} className="w-full h-full flex items-center justify-center p-8">
            <div className="grid grid-cols-4 gap-4 w-full max-w-2xl">
                {activeLogos.map((logo, index) => (
                    <GridCell key={`${index}`} logo={logo} index={index} />
                ))}
            </div>
        </div>
    );
}

function GridCell({ logo, index }: { logo: string; index: number }) {
    return (
        <div className="aspect-square relative flex items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={logo}
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(4px)" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0 flex items-center justify-center p-2"
                >
                    <Image
                        src={logo}
                        alt="Brand Logo"
                        fill
                        className="object-contain"
                        sizes="100px"
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
