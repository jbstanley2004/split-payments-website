"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useInViewport } from '@/hooks/useInViewport';

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
        <div ref={containerRef} className="w-full relative">
            <div className="group flex flex-col md:flex-row bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
                {/* Left Column: Content */}
                <div className="p-6 md:p-8 md:w-1/2 flex flex-col relative z-10 bg-white md:min-h-[300px]">
                    <div className="flex items-start justify-between w-full mb-4">
                        <div className="max-w-[85%]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <h3 className="text-[32px] font-bold text-brand-black font-poppins leading-tight mb-2">
                                        {currentHardware.model}
                                    </h3>
                                    <p className="text-brand-black/70 leading-relaxed font-lora text-sm md:text-base">
                                        {currentHardware.description}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <Link href="/payments" className="flex-shrink-0 ml-4">
                            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white transition-transform group-hover:scale-110">
                                <ArrowRight className="w-5 h-5" />
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Right Column: Image */}
                <motion.div
                    layout
                    className="md:w-1/2 relative border-t md:border-t-0 md:border-l border-gray-100 overflow-hidden flex items-center justify-center"
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
                            <div className="relative w-full h-[300px] md:h-full p-0">
                                <Image
                                    src={currentHardware.image}
                                    alt={`${currentHardware.make} ${currentHardware.model}`}
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

export default CloverSpotlight;
