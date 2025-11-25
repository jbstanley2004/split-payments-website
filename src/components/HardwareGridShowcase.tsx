"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useInViewport } from '@/hooks/useInViewport';
import Link from 'next/link';
import productsData from '../data/products-data.json';

const LOGOS = [
    "/brand_animations/pax.svg",
    "/brand_animations/clover_1.svg",
    "/brand_animations/verifone_1.svg",
    "/brand_animations/ingenico.svg",
    "/brand_animations/dejavoo.webp",
    "/brand_animations/quickbooks.svg",
    "/brand_animations/authorize.svg",
    "/brand_animations/nmi.svg",
];

// Select a subset of hardware products for display
const HARDWARE_SAMPLE = productsData.slice(0, 24); // Get first 24 products

// Combine brands and hardware
const ALL_ITEMS = [
    ...LOGOS.map(logo => ({ type: 'brand' as const, image: logo })),
    ...HARDWARE_SAMPLE.map(product => ({ type: 'hardware' as const, image: product.image, make: product.make, model: product.model }))
];

interface HardwareGridShowcaseProps {
    isExpanded?: boolean;
    onExpand?: () => void;
}

export default function HardwareGridShowcase({ isExpanded = false, onExpand }: HardwareGridShowcaseProps = {}) {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const isInViewport = useInViewport(containerRef);

    // Track indices for all cells and which cell is currently flipping
    const [itemIndices, setItemIndices] = React.useState<number[]>(
        Array.from({ length: 16 }, (_, i) => i)
    );
    const [currentFlipCell, setCurrentFlipCell] = React.useState<number>(0);

    useEffect(() => {
        if (!isInViewport) return;

        // Sequential cycling like Wheel of Fortune - one card flips at a time
        const interval = setInterval(() => {
            setItemIndices(prev => {
                const newIndices = [...prev];
                newIndices[currentFlipCell] = (newIndices[currentFlipCell] + 1) % ALL_ITEMS.length;
                return newIndices;
            });
            setCurrentFlipCell(prev => (prev + 1) % 16); // Move to next cell
        }, 1200); // Flip a new card every 1.2 seconds

        return () => clearInterval(interval);
    }, [isInViewport, currentFlipCell]);

    return (
        <div
            ref={containerRef}
            className={`group bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-700 hover:shadow-md relative hover:z-10 ${isExpanded ? 'scale-110' : 'hover:scale-110'} origin-center`}
            onMouseEnter={onExpand}
        >
            {/* Wrapper expands to grid size when isExpanded */}
            <div className={`relative transition-all duration-700 ease-out ${isExpanded ? 'h-[350px]' : ''}`}>
                {/* Grid - positioned above, rolls down when expanded */}
                <div className={`absolute inset-x-0 w-full h-full transition-transform duration-700 ease-out ${isExpanded ? 'translate-y-0' : '-translate-y-full'}`}>
                    <div className="relative w-full h-full bg-gray-50 p-3">
                        {/* 4 rows x 4 columns grid - items directly on background */}
                        <div className="grid grid-cols-4 grid-rows-4 gap-2 h-full">
                            {itemIndices.map((itemIndex, idx) => {
                                const item = ALL_ITEMS[itemIndex];
                                return (
                                    <motion.div
                                        key={`${idx}-${itemIndex}`}
                                        initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, scale: 1.1, filter: "blur(4px)" }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                        className="relative flex items-center justify-center p-2"
                                    >
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={item.image}
                                                alt={item.type === 'brand' ? 'Brand Logo' : `${item.make} ${item.model}`}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Title Card - visible by default, stays in place */}
                <div className="bg-white transition-transform duration-700 ease-out">
                    <div className="p-4">
                        <div className="flex items-start justify-between">
                            <div className="space-y-1 flex-1 min-w-0">
                                <span className="text-xs font-semibold text-brand-black/60 block">Hardware and Software</span>
                                <h3 className="text-2xl font-bold text-brand-black font-poppins leading-tight">
                                    Brand agnostic.
                                </h3>
                                <p className="text-sm text-brand-black/70 leading-snug">
                                    Mix-and-match terminals, gateways, and apps without vendor lock-in.
                                </p>
                            </div>
                            <Link href="/get-started" className="flex-shrink-0 ml-3">
                                <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white transition-transform group-hover:scale-110">
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
