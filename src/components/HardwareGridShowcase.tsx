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
    title?: string;
    subtitle?: string;
    description?: string;
    features?: string[];
}

export default function HardwareGridShowcase({
    isExpanded = false,
    onExpand,
    title = "Brand Agnostic",
    subtitle = "Hardware and Software",
    description = "We work with the hardware you already own, or help you find the perfect fit for your business needs.",
    features = []
}: HardwareGridShowcaseProps = {}) {
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
            className={`group relative flex flex-col rounded-3xl border overflow-hidden shadow-sm transition-all duration-500 hover:shadow-md ${isExpanded ? 'bg-brand-black border-black scale-[1.02]' : 'bg-white border-gray-200 hover:scale-[1.02]'}`}
            onMouseEnter={onExpand}
        >
            {/* Header Section - Always visible, inverts color on expand */}
            <div className="p-6 flex items-start justify-between relative z-20">
                <div className="space-y-1 flex-1 min-w-0">
                    <h3 className={`text-[32px] font-bold font-poppins leading-tight transition-colors duration-500 ${isExpanded ? 'text-white' : 'text-brand-black'}`}>
                        {title}
                    </h3>
                    <span className={`text-xs font-bold uppercase tracking-wider block transition-colors duration-500 ${isExpanded ? 'text-brand-orange' : 'text-brand-black/60'}`}>
                        {subtitle}
                    </span>
                    <p className={`text-base leading-relaxed pt-2 transition-all duration-500 ${isExpanded ? 'text-gray-300 opacity-100 max-h-24' : 'text-gray-500 opacity-0 max-h-0 overflow-hidden'}`}>
                        {description}
                    </p>
                </div>
                <Link href="/get-started" className="flex-shrink-0 ml-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isExpanded ? 'bg-white text-black' : 'bg-black text-white'}`}>
                        <ArrowRight className="w-5 h-5" />
                    </div>
                </Link>
            </div>

            {/* Grid Section - Expands in the middle */}
            <div className={`relative w-full transition-all duration-700 ease-in-out overflow-hidden ${isExpanded ? 'h-[240px] opacity-100' : 'h-0 opacity-0'}`}>
                <div className="w-full h-full bg-gray-50/5 p-3 relative">
                    {/* 4 rows x 4 columns grid */}
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
                                            className="object-contain brightness-0 invert" // Invert logos for dark mode
                                        />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Footer Section - Expands at bottom */}
            <div className={`px-8 transition-all duration-700 ease-in-out overflow-hidden ${isExpanded && features.length > 0 ? 'max-h-[300px] opacity-100 pb-8 pt-4' : 'max-h-0 opacity-0'}`}>
                <div className="pt-4 border-t border-white/10">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {features.map((feature, i) => (
                            <li key={i} className="flex items-center text-sm font-medium text-white/90">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-orange mr-2 flex-shrink-0" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
