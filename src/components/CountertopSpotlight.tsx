"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useInViewport } from '@/hooks/useInViewport';

const COUNTERTOP_TERMINALS = [
    {
        id: 'axium-dx8000',
        model: 'Axium DX8000',
        description: 'Premium countertop terminal with large touchscreen and modern payment capabilities.',
        image: '/assets/hardware_categories/countertop_final/AXIUMDX8000_3-4_right_300dpi.png',
    },
    {
        id: 'vp550c',
        model: 'Verifone VP550C',
        description: 'Reliable countertop PIN pad with secure payment processing and sleek design.',
        image: '/assets/hardware_categories/countertop_final/VP550CView1.png',
    },
    {
        id: 'vp100',
        model: 'Verifone VP100',
        description: 'Compact countertop terminal designed for efficient payment acceptance.',
        image: '/assets/hardware_categories/countertop_final/VP100-POS-Device-Mega-Menu.png',
    },
    {
        id: 't650c',
        model: 'T650C',
        description: 'Advanced countertop terminal with comprehensive payment options and EMV compliance.',
        image: '/assets/hardware_categories/countertop_final/T650C.png',
    },
    {
        id: 'pax-a80',
        model: 'PAX A80',
        description: 'All-in-one countertop Android terminal with built-in printer and large display.',
        image: '/assets/hardware_categories/countertop_final/a8003.png',
    },
    {
        id: 'ingenico-desk3500',
        model: 'Ingenico Desk 3500',
        description: 'Professional-grade countertop terminal with robust security features.',
        image: '/assets/hardware_categories/countertop_final/Ingenicodesk3500_810bba36-fa01-4f7f-b1ae-9c3a4337c77b.jpg',
    },
    {
        id: 'fd150',
        model: 'FD150',
        description: 'Versatile countertop payment device with contactless and chip card support.',
        image: '/assets/hardware_categories/countertop_final/fd150_1.png',
    },
    {
        id: 'e770',
        model: 'E770',
        description: 'Modern countertop terminal with intuitive interface and fast transaction processing.',
        image: '/assets/hardware_categories/countertop_final/e770.png',
    },
    {
        id: 'pax-aries8',
        model: 'PAX Aries 8',
        description: 'Advanced Android POS terminal with 8-inch display for enhanced customer experience.',
        image: '/assets/hardware_categories/countertop_final/pax_aries8_2.jpg',
    },
    {
        id: 'z111',
        model: 'Dejavoo Z111',
        description: 'Reliable countertop terminal with full payment acceptance capabilities.',
        image: '/assets/hardware_categories/countertop_final/Z111.png',
    },
];

const CountertopSpotlight = () => {
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
        setCurrentIndex((prev) => (prev + 1) % COUNTERTOP_TERMINALS.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + COUNTERTOP_TERMINALS.length) % COUNTERTOP_TERMINALS.length);
    };

    const currentTerminal = COUNTERTOP_TERMINALS[currentIndex];

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

export default CountertopSpotlight;
