"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useInViewport } from '@/hooks/useInViewport';
import Link from 'next/link';
import productsData from '../data/products-data.json';

const HardwareSpotlight = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInViewport = useInViewport(containerRef);

    useEffect(() => {
        if (productsData.length === 0) return;
        if (!isInViewport) return;
        const timer = setTimeout(() => {
            nextSlide();
        }, 6000);
        return () => clearTimeout(timer);
    }, [currentIndex, isInViewport]);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % productsData.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + productsData.length) % productsData.length);
    };

    if (productsData.length === 0) {
        return null;
    }

    const currentHardware = productsData[currentIndex];

    const variants = {
        enter: {
            opacity: 0,
            scale: 0.8,
            filter: "blur(4px)",
        },
        center: {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
        },
        exit: {
            opacity: 0,
            scale: 1.1,
            filter: "blur(4px)",
        },
    };

    const getBrandLogo = (make: string) => {
        const normalizedMake = make.toLowerCase();
        if (normalizedMake.includes('pax')) return '/brand_animations/pax.svg';
        if (normalizedMake.includes('clover')) return '/brand_animations/clover_1.svg';
        if (normalizedMake.includes('ingenico')) return '/brand_animations/ingenico.svg';
        if (normalizedMake.includes('verifone')) return '/brand_animations/verifone_1.svg';
        if (normalizedMake.includes('dejavoo')) return '/brand_animations/dejavoo.webp';
        return null;
    };

    const brandLogo = getBrandLogo(currentHardware.make);

    return (
        <div ref={containerRef} className="w-full relative h-full">
            <div className="group relative bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md h-[500px] flex flex-col">
                {/* Full-card Background Animation */}
                <div className="absolute inset-0 bg-gray-50">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="absolute inset-0 flex items-center justify-center p-8"
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={currentHardware.image}
                                    alt={`${currentHardware.make} ${currentHardware.model}`}
                                    fill
                                    className="object-contain mix-blend-multiply"
                                    priority
                                    unoptimized
                                />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Subtle gradient overlay - just at top for minimal interference */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent pointer-events-none" />

                {/* Content Layer */}
                <div className="relative z-10 p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between w-full mb-4">
                        <div className="max-w-[75%]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.4 }}
                                    className="space-y-2"
                                >
                                    <h3
                                        className="text-[32px] font-bold text-brand-black font-poppins leading-tight"
                                        style={{
                                            textShadow: `
                                                0 0 20px rgba(255,255,255,0.9),
                                                0 0 10px rgba(255,255,255,0.9),
                                                0 1px 3px rgba(255,255,255,0.9),
                                                0 2px 6px rgba(255,255,255,0.7)
                                            `
                                        }}
                                    >
                                        {currentHardware.model}
                                    </h3>
                                    <p
                                        className="text-brand-black leading-relaxed font-lora text-sm"
                                        style={{
                                            textShadow: `
                                                0 0 15px rgba(255,255,255,1),
                                                0 0 8px rgba(255,255,255,1),
                                                0 1px 2px rgba(255,255,255,0.9),
                                                0 2px 4px rgba(255,255,255,0.8)
                                            `
                                        }}
                                    >
                                        {currentHardware.description}
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

                    {/* Brand Logo - pushed to bottom */}
                    <div className="mt-auto">
                        <div className="relative w-24 h-8">
                            {brandLogo ? (
                                <Image
                                    src={brandLogo}
                                    alt={`${currentHardware.make} Logo`}
                                    fill
                                    className="object-contain object-left drop-shadow-sm"
                                />
                            ) : (
                                <span className="text-base font-medium text-brand-black/60 uppercase tracking-wider drop-shadow-sm">
                                    {currentHardware.make}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HardwareSpotlight;