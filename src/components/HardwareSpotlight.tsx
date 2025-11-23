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
        <div ref={containerRef} className="w-full relative">
            <div className="group flex flex-col bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md h-full">
                {/* Top Section: Content */}
                <div className="p-6 pb-6 flex flex-col relative z-10 bg-[#F6F5F4]">
                    <div className="flex items-start justify-between mb-6">
                        <div className="relative w-24 h-8">
                            {brandLogo ? (
                                <Image
                                    src={brandLogo}
                                    alt={`${currentHardware.make} Logo`}
                                    fill
                                    className="object-contain object-left"
                                />
                            ) : (
                                <span className="text-sm font-semibold text-brand-black/60 uppercase tracking-wider">
                                    {currentHardware.make}
                                </span>
                            )}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    if (navigator.vibrate) navigator.vibrate(10);
                                    prevSlide();
                                }}
                                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-brand-black hover:bg-gray-50 transition-colors shadow-sm"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => {
                                    if (navigator.vibrate) navigator.vibrate(10);
                                    nextSlide();
                                }}
                                className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white hover:bg-brand-charcoal transition-colors shadow-sm"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                        >
                            <h3 className="text-2xl font-bold text-brand-black font-poppins leading-tight mb-2">
                                {currentHardware.model}
                            </h3>
                            <p className="text-brand-black/70 leading-relaxed font-lora text-sm">
                                {currentHardware.description}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Bottom Section: Image placed directly on background */}
                <motion.div
                    layout
                    className="mt-auto w-full bg-white relative overflow-hidden flex items-center justify-center h-[250px] border-t border-gray-100"
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
                            className="relative w-full h-full flex items-center justify-center p-6 z-10"
                        >
                            <div className="relative w-full h-full max-w-[220px] max-h-[220px]">
                                <Image
                                    src={currentHardware.image}
                                    alt={`${currentHardware.make} ${currentHardware.model} `}
                                    fill
                                    className="object-contain mix-blend-multiply"
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

export default HardwareSpotlight;