"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useInViewport } from '@/hooks/useInViewport';

const UNATTENDED_TERMINALS = [
    {
        id: 'idt-ap6800',
        model: 'IDT AP6800',
        description: 'Secure unattended payment terminal with advanced encryption for kiosks and self-service.',
        image: '/assets/hardware_categories/unattended_final/IDT_AP6800-Green.png',
    },
    {
        id: 'im30',
        model: 'IM30',
        description: 'Versatile unattended terminal designed for parking, vending, and ticketing applications.',
        image: '/assets/hardware_categories/unattended_final/IM30-1.png',
    },
    {
        id: 'feitian-f310',
        model: 'Feitian F310',
        description: 'Compact unattended payment module ideal for integration into kiosks and vending machines.',
        image: '/assets/hardware_categories/unattended_final/FEITIANF310Unattended.png',
    },
    {
        id: 'kiosk-counter',
        model: 'Kiosk Counter Stand',
        description: 'Professional counter-mounted kiosk solution for self-service payment processing.',
        image: '/assets/hardware_categories/unattended_final/Kiosk-Counter-Stand-Front-Compare.png',
    },
    {
        id: 'kiosk-floor',
        model: 'Kiosk Floor Stand',
        description: 'Free-standing kiosk terminal perfect for high-traffic self-service environments.',
        image: '/assets/hardware_categories/unattended_final/Kiosk-Floor-Stand-Front-Compare.png',
    },
    {
        id: 'k10-terminal',
        model: 'K10 Terminal',
        description: 'Robust unattended terminal with large display for enhanced user interaction.',
        image: '/assets/hardware_categories/unattended_final/K10-Front-3_conPantalla.png',
    },
    {
        id: 'verifone-vp6800',
        model: 'Verifone VP6800',
        description: 'Industry-leading unattended terminal for secure, reliable payment acceptance.',
        image: '/assets/hardware_categories/unattended_final/vp6800.png',
    },
    {
        id: 'upt1000f',
        model: 'UPT1000F',
        description: 'Feature-rich unattended payment terminal with contactless and chip card support.',
        image: '/assets/hardware_categories/unattended_final/upt1000f.png',
    },
    {
        id: 'sunmi-k2-wall',
        model: 'Sunmi K2 Wall Mount',
        description: 'Space-saving wall-mounted terminal for streamlined self-service payments.',
        image: '/assets/hardware_categories/unattended_final/sunmik2wallmount.png',
    },
];

const UnattendedSpotlight = () => {
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
        setCurrentIndex((prev) => (prev + 1) % UNATTENDED_TERMINALS.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + UNATTENDED_TERMINALS.length) % UNATTENDED_TERMINALS.length);
    };

    const currentTerminal = UNATTENDED_TERMINALS[currentIndex];

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

export default UnattendedSpotlight;
