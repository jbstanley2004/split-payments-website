"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const CLOVER_PRODUCTS = [
    {
        id: 'duo',
        model: 'Duo',
        make: 'Clover',
        description: 'The powerful point-of-sale system that lets you run your business your way.',
        image: '/assets/clover/duo.png',
    },
    {
        id: 'flex',
        model: 'Flex',
        make: 'Clover',
        description: 'Take orders and payments from the floor, tableside, or on the go.',
        image: '/assets/clover/flex.png',
    },
    {
        id: 'kds',
        model: 'Kitchen Display',
        make: 'Clover',
        description: 'The Clover Kitchen Display System has plenty of room to manage all your orders.',
        image: '/assets/clover/kds.png',
    },
    {
        id: 'kiosk',
        model: 'Kiosk',
        make: 'Clover',
        description: 'Our all-in-one self-ordering device features a 24" display, versatile payment terminal and a built-in printer.',
        image: '/assets/clover/kiosk.png',
    },
    {
        id: 'mini',
        model: 'Mini',
        make: 'Clover',
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
        <div className="w-full relative">
            <div className="group flex flex-col md:flex-row bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
                {/* Left Column: Content */}
                <div className="p-10 md:w-1/3 flex flex-col relative z-10 bg-white justify-between min-h-[400px]">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="relative w-24 h-8">
                                <Image
                                    src="/brand_animations/clover_1.svg"
                                    alt="Clover Logo"
                                    fill
                                    className="object-contain object-left"
                                />
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
                                <h3 className="text-[32px] font-bold text-brand-black font-poppins leading-tight mb-4">
                                    {currentHardware.model}
                                </h3>
                                <p className="text-brand-black/70 leading-relaxed font-lora">
                                    {currentHardware.description}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex items-center justify-between mt-8">
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    if (navigator.vibrate) navigator.vibrate(10);
                                    prevSlide();
                                }}
                                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-brand-black hover:bg-gray-200 transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => {
                                    if (navigator.vibrate) navigator.vibrate(10);
                                    nextSlide();
                                }}
                                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-brand-black hover:bg-gray-200 transition-colors"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>

                        <Link href="/payments" className="inline-block">
                            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white transition-transform group-hover:scale-110">
                                <ArrowRight className="w-6 h-6" />
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
                            <div className="relative w-full h-[300px] md:h-[400px]">
                                <Image
                                    src={currentHardware.image}
                                    alt={`${currentHardware.make} ${currentHardware.model}`}
                                    fill
                                    className="object-cover"
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

export default CloverSpotlight;
