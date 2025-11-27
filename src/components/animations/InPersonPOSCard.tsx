"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInViewport } from "@/hooks/useInViewport";

const POS_DEVICES = [
    { src: "/assets/pos-hardware/pos-device-1.png", alt: "Clover POS System" },
    { src: "/assets/pos-hardware/pos-device-2.png", alt: "Smart POS Terminal" },
    { src: "/assets/pos-hardware/pos-device-3.png", alt: "Payment Wand" },
    { src: "/assets/pos-hardware/pos-device-4.png", alt: "Dual Screen POS" },
    { src: "/assets/pos-hardware/pos-device-5.png", alt: "Coffee House POS" },
];

export default function InPersonPOSCard() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInViewport = useInViewport(containerRef);

    useEffect(() => {
        if (!isInViewport) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % POS_DEVICES.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, [isInViewport]);

    return (
        <div ref={containerRef} className="group flex flex-col bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md h-full">
            <div className="p-6 pb-0 flex flex-col relative z-10 bg-white">
                <div className="flex items-start justify-between mb-6">
                    <div className="space-y-2">
                        <span className="text-sm font-semibold text-brand-black/60">Payments</span>
                        <h3 className="text-[32px] font-bold text-brand-black font-poppins leading-tight max-w-[90%]">
                            Integrated POS.
                        </h3>
                    </div>
                    <Link href="/contact" className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white transition-transform group-hover:scale-110">
                            <ArrowRight className="w-5 h-5" />
                        </div>
                    </Link>
                </div>
            </div>
            <div className="mt-auto w-full bg-gray-50 relative border-t border-gray-100 overflow-hidden">
                <div className="h-72 w-full relative overflow-hidden flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 flex items-center justify-center p-8"
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={POS_DEVICES[currentIndex].src}
                                    alt={POS_DEVICES[currentIndex].alt}
                                    fill
                                    className="object-contain pointer-events-none"
                                    sizes="(max-width: 768px) 100vw, 400px"
                                    priority={currentIndex === 0}
                                />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
