"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CLOVER_PRODUCTS = [
    {
        id: 'duo',
        model: 'Duo',
        description: 'The powerful point-of-sale system that lets you run your business your way.',
        image: '/assets/clover/duo.png',
    },
    {
        id: 'flex',
        model: 'Flex',
        description: 'Take orders and payments from the floor, tableside, or on the go.',
        image: '/assets/clover/flex.png',
    },
    {
        id: 'kds',
        model: 'Kitchen Display',
        description: 'The Clover Kitchen Display System has plenty of room to manage all your orders.',
        image: '/assets/clover/kds.png',
    },
    {
        id: 'kiosk',
        model: 'Kiosk',
        description: 'Our all-in-one self-ordering device features a 24" display, versatile payment terminal and a built-in printer.',
        image: '/assets/clover/kiosk.png',
    },
    {
        id: 'mini',
        model: 'Mini',
        description: 'A complete POS in one compact package.',
        image: '/assets/clover/mini.png',
    },
];

const CloverSpotlight = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            nextSlide();
        }, 6000);
        return () => clearTimeout(timer);
    }, [currentIndex]);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % CLOVER_PRODUCTS.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + CLOVER_PRODUCTS.length) % CLOVER_PRODUCTS.length);
    };

    const currentHardware = CLOVER_PRODUCTS[currentIndex];

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
        <div className="relative w-full max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center min-h-[500px]">

                {/* Left Column: Image */}
                <div className="relative h-[450px] w-full flex items-center justify-center group">
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
                            {/* Elegant white container for all hardware images */}
                            <div className="relative w-full h-full bg-white rounded-[3rem] p-12 shadow-elevation-mid ring-1 ring-black/5 transition-all duration-500 group-hover:shadow-elevation-high group-hover:scale-[1.02]">
                                <div className="w-full h-full flex items-center justify-center">
                                    <Image
                                        src={currentHardware.image}
                                        alt={`Clover ${currentHardware.model}`}
                                        fill
                                        className="object-contain max-h-[360px]"
                                        priority
                                        unoptimized
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons (Floating) */}
                    <div className="absolute bottom-6 right-6 flex gap-3 z-10">
                        <button
                            onClick={prevSlide}
                            aria-label="Previous hardware"
                            className="w-12 h-12 rounded-full bg-brand-black shadow-lg flex items-center justify-center text-white hover:bg-brand-charcoal transition-all hover:scale-110 active:scale-95"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={nextSlide}
                            aria-label="Next hardware"
                            className="w-12 h-12 rounded-full bg-brand-black shadow-lg flex items-center justify-center text-white hover:bg-brand-charcoal transition-all hover:scale-110 active:scale-95"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Right Column: Content */}
                <div className="flex flex-col justify-center space-y-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="relative w-32 h-12">
                                    <Image
                                        src="/assets/clover/logo.svg"
                                        alt="Clover Logo"
                                        fill
                                        className="object-contain object-left"
                                    />
                                </div>
                            </div>

                            <h3 className="text-5xl font-lora font-medium text-brand-black mb-6 leading-tight">
                                {currentHardware.model}
                            </h3>

                            <div className="space-y-6">
                                <div className="h-px w-full bg-brand-black/10" />

                                <div className="text-brand-black/70 leading-relaxed font-lora text-lg">
                                    {currentHardware.description}
                                </div>

                                <div className="h-px w-full bg-brand-black/10" />
                            </div>

                        </motion.div>
                    </AnimatePresence>

                    {/* Progress Indicator */}
                    <div className="flex gap-2 mt-4">
                        {CLOVER_PRODUCTS.map((_, idx) => (
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
        </div>
    );
};

export default CloverSpotlight;
