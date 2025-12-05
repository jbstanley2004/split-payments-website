"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInViewport } from '@/hooks/useInViewport';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface HardwareCategoryCardProps {
    title: string;
    images: string[];
    isExpanded?: boolean;
    onToggle?: () => void;
    expandDirection?: "down" | "up";
    hasBeenViewed?: boolean;
}

export default function HardwareCategoryCard({
    title,
    images,
    isExpanded = false,
    onToggle,
    expandDirection = "down",
    hasBeenViewed = false
}: HardwareCategoryCardProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const isInViewport = useInViewport(containerRef);
    const [isMobile, setIsMobile] = useState(false);

    // Track indices for all 6 cells (2x3 grid) - start with deterministic values to avoid hydration errors
    const [itemIndices, setItemIndices] = useState<number[]>([0, 1, 2, 3, 4, 5]);
    const [currentFlipCell, setCurrentFlipCell] = useState<number>(0);

    // Randomize initial indices after mount (client-side only)
    useEffect(() => {
        const getUniqueIndices = (count: number, arrayLength: number): number[] => {
            const indices: number[] = [];
            while (indices.length < Math.min(count, arrayLength)) {
                const randomIndex = Math.floor(Math.random() * arrayLength);
                if (!indices.includes(randomIndex)) {
                    indices.push(randomIndex);
                }
            }
            return indices;
        };
        setItemIndices(getUniqueIndices(6, images.length));
    }, [images.length]);

    useEffect(() => {
        const detectMobile = () => setIsMobile(typeof window !== "undefined" ? window.innerWidth < 768 : false);
        detectMobile();
        window.addEventListener("resize", detectMobile);
        return () => window.removeEventListener("resize", detectMobile);
    }, []);

    useEffect(() => {
        if (!isInViewport || !isExpanded) return;

        // Sequential cycling - one card flips at a time, ensuring no duplicates
        const interval = setInterval(() => {
            setItemIndices(prev => {
                const newIndices = [...prev];
                // Find a new index that's not already being displayed
                let newIndex;
                do {
                    newIndex = Math.floor(Math.random() * images.length);
                } while (newIndices.includes(newIndex));

                newIndices[currentFlipCell] = newIndex;
                return newIndices;
            });
            setCurrentFlipCell(prev => (prev + 1) % 6);
        }, 800);

        return () => clearInterval(interval);
    }, [isInViewport, currentFlipCell, isExpanded, images.length]);

    useEffect(() => {
        if (isExpanded && isMobile) {
            cardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [isExpanded, isMobile]);

    const effectiveExpandDirection = isMobile ? "up" : expandDirection;
    const closedTranslateClass = effectiveExpandDirection === "up" ? "translate-y-full" : "-translate-y-full";
    const scaleClass = isExpanded ? "md:scale-110" : "md:hover:scale-110";
    const collapsedHeight = isMobile ? "auto" : undefined;
    const expandedHeight = isMobile ? 320 : 350;

    return (
        <div
            ref={cardRef}
            className={`group bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-700 hover:shadow-md relative hover:z-10 ${scaleClass} origin-center`}
        >
            {/* Wrapper expands to grid size when isExpanded */}
            <div
                ref={containerRef}
                className="relative transition-all duration-700 ease-out"
                style={{
                    minHeight: collapsedHeight,
                    height: isExpanded ? expandedHeight : collapsedHeight,
                }}
            >
                {/* 2x3 Grid - positioned above, rolls down when expanded */}
                <div className={`absolute inset-x-0 w-full h-full transition-transform duration-700 ease-out ${isExpanded ? 'translate-y-0' : closedTranslateClass}`}>
                    <div className="relative w-full h-full bg-white p-3">
                        <div className="grid grid-cols-3 grid-rows-2 gap-2 h-full">
                            {itemIndices.map((imageIndex, idx) => {
                                const imageSrc = images[imageIndex];
                                return (
                                    <motion.div
                                        key={`${idx}-${imageIndex}`}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4 }}
                                        className="relative w-full h-full bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center"
                                    >
                                        <Image
                                            src={imageSrc}
                                            alt={`${title} hardware ${imageIndex}`}
                                            fill
                                            unoptimized
                                            className="object-contain p-1"
                                            sizes="(max-width: 768px) 33vw, 150px"
                                        />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Title Card - visible by default, stays in place */}
                <div 
                    onClick={() => onToggle?.()}
                    className="bg-white transition-transform duration-700 ease-out cursor-pointer"
                >
                    <div className="p-4">
                        <div className="flex items-start justify-between">
                            <div className="space-y-1.5 flex-1 min-w-0">
                                <span className="text-xs font-semibold text-brand-black/60 block">Hardware</span>
                                <h3 className="text-2xl font-bold text-brand-black font-poppins leading-tight">
                                    {title}
                                </h3>
                                <p className="text-sm text-brand-black/70 leading-snug">
                                    Industry-leading {title.toLowerCase()} terminals from top brands.
                                </p>
                            </div>
                            {/* Toggle button */}
                            <button
                                onClick={(e) => { e.stopPropagation(); onToggle?.(); }}
                                className="flex-shrink-0 ml-3 w-14 h-14 rounded-full bg-black flex items-center justify-center text-white transition-all hover:bg-gray-800 hover:scale-105 shadow-md cursor-pointer"
                                aria-label={isExpanded ? "Collapse card" : "Expand card"}
                            >
                                {isExpanded ? (
                                    <ArrowUp className="w-6 h-6" />
                                ) : (
                                    <ArrowDown className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
