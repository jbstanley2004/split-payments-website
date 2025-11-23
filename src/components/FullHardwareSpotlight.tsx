"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import productsData from '../data/products-data.json';

const FullHardwareSpotlight = () => {
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

    const getBrandUrl = (make: string) => {
        const normalizedMake = make.toLowerCase();
        if (normalizedMake.includes('pax')) return 'https://www.pax.us/products/';
        if (normalizedMake.includes('clover')) return 'https://www.clover.com/pos-systems';
        if (normalizedMake.includes('ingenico')) return 'https://ingenico.com/en/products-services/payment-terminals';
        if (normalizedMake.includes('verifone')) return 'https://www.verifone.com/en/us/hardware-overview/verifone-payment-devices';
        if (normalizedMake.includes('dejavoo')) return 'https://dejavoo.io/';
        return currentHardware.productUrl;
    };

    const brandUrl = getBrandUrl(currentHardware.make);

    return (
        <div className="relative w-full max-w-6xl mx-auto pb-12 md:pb-24">
            <div className="grid md:grid-cols-2 gap-8 md:gap-24 items-center min-h-[400px] md:min-h-[500px]">

                {/* Left Column: Image */}
                <div className="relative h-[300px] md:h-[450px] w-full flex items-center justify-center group">
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
                            {/* Modified container: No white bg, rounded-3xl, overflow-hidden - Matching CloverSpotlight */}
                            <div className="relative w-full h-full rounded-3xl overflow-hidden transition-all duration-500 group-hover:scale-[1.02]">
                                <div className="w-full h-full flex items-center justify-center">
                                    <Image
                                        src={currentHardware.image}
                                        alt={`${currentHardware.make} ${currentHardware.model}`}
                                        fill
                                        className="object-contain"
                                        priority
                                        unoptimized
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right Column: Content */}
                <div className="flex flex-col justify-center space-y-6 md:space-y-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="flex items-center gap-3 mb-4 md:mb-6">
                                {brandLogo ? (
                                    <div className="relative w-24 h-10 md:w-32 md:h-12">
                                        <Image
                                            src={brandLogo}
                                            alt={`${currentHardware.make} Logo`}
                                            fill
                                            className="object-contain object-left"
                                        />
                                    </div>
                                ) : (
                                    <span className="px-3 py-1 rounded-full bg-brand-black/5 text-sm font-semibold uppercase tracking-wider text-brand-black/60">
                                        {currentHardware.make}
                                    </span>
                                )}
                            </div>

                            <h3 className="text-3xl md:text-5xl font-lora font-medium text-brand-black mb-4 md:mb-6 leading-tight">
                                {currentHardware.model}
                            </h3>

                            <div className="space-y-4 md:space-y-6">
                                <div className="h-px w-full bg-brand-black/10" />

                                <div className="text-brand-black/70 leading-relaxed font-lora text-base md:text-lg">
                                    {currentHardware.description}
                                </div>

                                <div className="h-px w-full bg-brand-black/10" />
                            </div>

                            {brandUrl && (
                                <div className="mt-6 md:mt-8 pt-4">
                                    <a
                                        href={brandUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-brand-black hover:bg-brand-charcoal text-white font-medium py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                                    >
                                        View Details
                                    </a>
                                </div>
                            )}

                        </motion.div>
                    </AnimatePresence>

                    {/* Progress Indicator */}
                    <div className="flex gap-2 mt-4">
                        {productsData.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setDirection(idx > currentIndex ? 1 : -1);
                                    setCurrentIndex(idx);
                                }}
                                className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-brand-black' : 'w-2 bg-brand-black/20 hover:bg-brand-black/40'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Navigation Buttons (Bottom Center) */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                <button
                    onClick={() => {
                        if (navigator.vibrate) navigator.vibrate(10);
                        prevSlide();
                    }}
                    aria-label="Previous hardware"
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-black shadow-lg flex items-center justify-center text-white hover:bg-brand-charcoal transition-all hover:scale-110 active:scale-95"
                >
                    <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <button
                    onClick={() => {
                        if (navigator.vibrate) navigator.vibrate(10);
                        nextSlide();
                    }}
                    aria-label="Next hardware"
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-black shadow-lg flex items-center justify-center text-white hover:bg-brand-charcoal transition-all hover:scale-110 active:scale-95"
                >
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>
            </div>
        </div>
    );
};

export default FullHardwareSpotlight;
