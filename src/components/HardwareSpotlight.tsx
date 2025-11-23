"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import productsData from '../data/products-data.json';

const HardwareSpotlight = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        if (productsData.length === 0) return;
        const timer = setTimeout(() => {
            nextSlide();
        }, 6000);
        return () => clearTimeout(timer);
    }, [currentIndex]);

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
        <div className="w-full relative">
            <div className="group flex flex-col bg-gray-50 rounded-3xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md min-h-[600px]">
                {/* Top Section: Content */}
                <div className="p-10 pb-0 flex flex-col relative z-10 bg-gray-50">
                    <div className="flex items-start justify-between mb-6">
                        <div className="space-y-4 max-w-[70%]">
                            <div className="flex items-center gap-3">
                                {brandLogo ? (
                                    <div className="relative w-24 h-8">
                                        <Image
                                            src={brandLogo}
                                            alt={`${currentHardware.make} Logo`}
                                            fill
                                            className="object-contain object-left"
                                        />
                                    </div>
                                ) : (
                                    <span className="text-sm font-semibold text-brand-black/60 uppercase tracking-wider">
                                        {currentHardware.make}
                                    </span>
                                )}
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <h3 className="text-[32px] font-bold text-brand-black font-poppins leading-tight mb-4">
                                        {currentHardware.model}
                                    </h3>
                                    <p className="text-brand-black/70 leading-relaxed font-lora">
                                        {currentHardware.description}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    if (navigator.vibrate) navigator.vibrate(10);
                                    prevSlide();
                                }}
                                className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-brand-black hover:bg-gray-200 transition-colors shadow-sm"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => {
                                    if (navigator.vibrate) navigator.vibrate(10);
                                    nextSlide();
                                }}
                                className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white hover:bg-brand-charcoal transition-colors shadow-sm"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Image */}
                <motion.div
                    layout
                    className="mt-auto w-full bg-white relative border-t border-gray-200 overflow-hidden flex items-center justify-center h-[400px]"
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
                            <div className="relative w-full h-full">
                                <Image
                                    src={currentHardware.image}
                                    alt={`${currentHardware.make} ${currentHardware.model}`}
                                    fill
                                    className="object-contain p-8"
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