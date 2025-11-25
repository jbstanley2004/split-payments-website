"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useInViewport } from '@/hooks/useInViewport';

const WIRELESS_TERMINALS = [
    {
        id: 'a920pro',
        model: 'A920 Pro',
        description: 'Feature-rich Android terminal with large touchscreen and built-in printer for comprehensive payment processing.',
        image: '/assets/hardware_categories/wireless_final/A920Pro11.png',
    },
    {
        id: 'axium-dx8000',
        model: 'Axium DX8000',
        description: 'Premium wireless terminal with advanced features and exceptional performance for modern businesses.',
        image: '/assets/hardware_categories/wireless_final/AXIUMDX8000_3-4_Face_300dpi.png',
    },
    {
        id: 'dejavoo-z9',
        model: 'Dejavoo Z9',
        description: 'Sleek Android-based terminal with a modern interface and wireless connectivity.',
        image: '/assets/hardware_categories/wireless_final/Dejavoo_Z9_R.SideProfile_WP.png',
    },
    {
        id: 'pax-a77',
        model: 'PAX A77',
        description: 'Powerful Android smart terminal with 5.5" touchscreen and versatile payment acceptance.',
        image: '/assets/hardware_categories/wireless_final/A77-face.png',
    },
    {
        id: 'verifone-vl110',
        model: 'Verifone VL110',
        description: 'Compact wireless terminal designed for mobility and ease of use in any environment.',
        image: '/assets/hardware_categories/wireless_final/VL110-View-01.png',
    },
    {
        id: 'sunmi-p2',
        model: 'Sunmi P2',
        description: 'All-in-one Android payment device with built-in printer, perfect for mobile businesses.',
        image: '/assets/hardware_categories/wireless_final/SUNMI-P2-b_2514648e-7efc-4637-aecf-2010af691e3c.png',
    },
    {
        id: 'pax-a6650',
        model: 'PAX A6650',
        description: 'Large-format wireless terminal with expansive screen for enhanced customer interaction.',
        image: '/assets/hardware_categories/wireless_final/A6650.png',
    },
    {
        id: 'verifone-v2s',
        model: 'Verifone V2s Plus',
        description: 'Next-generation smart terminal with superior processing power and connectivity options.',
        image: '/assets/hardware_categories/wireless_final/V2splus-ts01-0604_0008.png',
    },
    {
        id: 'pax-a60',
        model: 'PAX A60',
        description: 'Versatile Android terminal with 5.5" display and comprehensive payment capabilities.',
        image: '/assets/hardware_categories/wireless_final/a60.png',
    },
    {
        id: 'landi-m20',
        model: 'Landi M20',
        description: 'Reliable wireless terminal with modern design and robust payment processing features.',
        image: '/assets/hardware_categories/wireless_final/landi_m20.png',
    },
];

const WirelessSpotlight = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInViewport = useInViewport(containerRef);

    useEffect(() => {
        if (!isInViewport) return;
        const timer = setTimeout(() => {
            nextSlide();
        }, 6000);
        return () => clearTimeout(timer);
    }, [currentIndex, isInViewport]);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % WIRELESS_TERMINALS.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + WIRELESS_TERMINALS.length) % WIRELESS_TERMINALS.length);
    };

    const currentTerminal = WIRELESS_TERMINALS[currentIndex];

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 50 : -50,
            opacity: 0,
        }),
    };

    return (
        <div ref={containerRef} className="w-full relative">
            <div className="group flex flex-col md:flex-row bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
                {/* Left Column: Content */}
                <div className="p-6 md:w-1/3 flex flex-col relative z-10 bg-white justify-between md:min-h-[400px]">
                    <div className="flex items-start justify-between w-full">
                        <div className="max-w-[80%]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <h3 className="text-[32px] font-bold text-brand-black font-poppins leading-tight mb-4">
                                        {currentTerminal.model}
                                    </h3>
                                    <p className="text-brand-black/70 leading-relaxed font-lora">
                                        {currentTerminal.description}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <Link href="/payments" className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white transition-transform group-hover:scale-110">
                                <ArrowRight className="w-5 h-5" />
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Right Column: Image */}
                <motion.div
                    layout
                    className="md:w-2/3 relative border-t md:border-t-0 md:border-l border-gray-100 overflow-hidden flex items-center justify-center"
                >
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.5, ease: "circOut" }}
                            className="relative w-full h-full flex items-center justify-center"
                        >
                            <div className="relative w-full h-[350px] md:h-[400px]">
                                <Image
                                    src={currentTerminal.image}
                                    alt={currentTerminal.model}
                                    fill
                                    className="object-contain"
                                    priority
                                    unoptimized
                                />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default WirelessSpotlight;
