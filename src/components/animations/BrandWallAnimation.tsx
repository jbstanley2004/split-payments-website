"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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

// Shuffle/Split logos into 3 columns
const COLUMNS = [
    ALL_LOGOS.slice(0, 9),
    ALL_LOGOS.slice(9, 17),
    ALL_LOGOS.slice(17, 26),
];

// Duplicate for seamless loop
const Column = ({ logos, direction = "up", speed = 20, className = "" }: { logos: string[], direction?: "up" | "down", speed?: number, className?: string }) => {
    const duplicatedLogos = [...logos, ...logos, ...logos]; // Triple for safety

    return (
        <div className={`relative flex flex-col gap-4 ${className}`}>
            <motion.div
                className="flex flex-col gap-4"
                animate={{
                    y: direction === "up" ? ["0%", "-33.33%"] : ["-33.33%", "0%"],
                }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                {duplicatedLogos.map((logo, idx) => (
                    <div
                        key={`${logo}-${idx}`}
                        className="relative w-24 h-16 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 flex items-center justify-center p-3 transform transition-transform hover:scale-105 hover:shadow-md hover:bg-white hover:z-10"
                    >
                        <Image
                            src={logo}
                            alt="Brand Logo"
                            fill
                            className="object-contain p-2"
                            sizes="96px"
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default function BrandWallAnimation() {
    return (
        <div className="relative w-full h-full bg-gray-50 overflow-hidden flex items-center justify-center">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100" />

            {/* 3D Container */}
            <div
                className="relative w-[150%] h-[150%] flex gap-4 items-center justify-center"
                style={{
                    perspective: "1000px",
                    transform: "rotateX(10deg) rotateY(-10deg) rotateZ(-5deg) scale(1.1)",
                }}
            >
                {/* Column 1 - Up */}
                <Column
                    logos={COLUMNS[0]}
                    direction="up"
                    speed={25}
                    className="opacity-60 blur-[1px] scale-90"
                />

                {/* Column 2 - Down (Hero) */}
                <Column
                    logos={COLUMNS[1]}
                    direction="down"
                    speed={35}
                    className="z-10 opacity-100 scale-110"
                />

                {/* Column 3 - Up */}
                <Column
                    logos={COLUMNS[2]}
                    direction="up"
                    speed={28}
                    className="opacity-60 blur-[1px] scale-90"
                />
            </div>

            {/* Vignette / Fade Masks */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-black opacity-20" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/10 via-transparent to-black/10" />

            {/* Bottom fade for smooth integration with card */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent opacity-80" />
        </div>
    );
}
