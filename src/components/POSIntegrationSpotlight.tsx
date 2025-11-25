"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useInViewport } from '@/hooks/useInViewport';

const POS_SYSTEMS = [
    {
        id: 'sunmi-d3pro',
        model: 'Sunmi D3 Pro',
        description: 'All-in-one POS system with dual screens for seamless customer-facing transactions.',
        image: '/assets/hardware_categories/POS_Final/d3pro_1029e9af-4c1b-440b-9fe0-64fa6f65e620.png',
    },
    {
        id: 'landi-cx20',
        model: 'Landi CX20',
        description: 'Professional POS terminal with integrated payment module and modern Android OS.',
        image: '/assets/hardware_categories/POS_Final/cx20se.png',
    },
    {
        id: 'sunmi-t3-promax',
        model: 'Sunmi T3 Pro Max',
        description: 'Premium dual-screen POS with powerful processing and versatile payment options.',
        image: '/assets/hardware_categories/POS_Final/t3promax_c2afd91b-48b2-42ae-bb99-9f356a732596.png',
    },
    {
        id: 'landi-cx20pro',
        model: 'Landi CX20 Pro',
        description: 'Advanced all-in-one POS system designed for high-volume retail environments.',
        image: '/assets/hardware_categories/POS_Final/landicx20.png',
    },
    {
        id: 'kiosk-system',
        model: '22" Kiosk Terminal',
        description: 'Large-format touchscreen kiosk perfect for self-service and queue management.',
        image: '/assets/hardware_categories/POS_Final/22inchkioskteamsable-j1900.jpg',
    },
    {
        id: 'audrey-a5',
        model: 'Audrey A5',
        description: 'Compact yet powerful POS terminal with integrated payment processing capabilities.',
        image: '/assets/hardware_categories/POS_Final/audreya5.png',
    },
    {
        id: 'hp-touchscreen',
        model: 'HP L7016t 15.6"',
        description: 'Professional touchscreen monitor ideal for POS integration and payment displays.',
        image: '/assets/hardware_categories/POS_Final/HPL7016t15.6inchLCDTouchscreenMonitor2.jpg',
    },
    {
        id: 'sunmi-t2s',
        model: 'Sunmi T2s',
        description: 'Dual-screen Android POS system with elegant design and robust performance.',
        image: '/assets/hardware_categories/POS_Final/Sunmi-T2s.jpg',
    },
    {
        id: 'peak-22',
        model: 'Peak 22',
        description: 'Enterprise-grade POS system with large display and comprehensive business tools.',
        image: '/assets/hardware_categories/POS_Final/Peak_22_Front_Angle.jpg',
    },
];

const POSIntegrationSpotlight = () => {
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
        setCurrentIndex((prev) => (prev + 1) % POS_SYSTEMS.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + POS_SYSTEMS.length) % POS_SYSTEMS.length);
    };

    const currentSystem = POS_SYSTEMS[currentIndex];

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
                                        {currentSystem.model}
                                    </h3>
                                    <p className="text-brand-black/70 leading-relaxed font-lora">
                                        {currentSystem.description}
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
                                    src={currentSystem.image}
                                    alt={currentSystem.model}
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

export default POSIntegrationSpotlight;
