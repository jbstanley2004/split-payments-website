"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import HardwareCategoryCard from './HardwareCategoryCard';
import { POS_IMAGES, COUNTERTOP_IMAGES, UNATTENDED_IMAGES, WIRELESS_IMAGES } from '@/data/hardware-categories';
import { motion, AnimatePresence } from 'framer-motion';

export default function BrandAgnosticSection() {
    const [expandedCard, setExpandedCard] = useState<string | null>(null);
    const [viewedCards, setViewedCards] = useState<Set<string>>(new Set());

    const handleExpand = (cardId: string) => {
        if (expandedCard !== cardId) {
            setExpandedCard(cardId);
            setViewedCards((prev) => {
                if (prev.has(cardId)) return prev;
                const next = new Set(prev);
                next.add(cardId);
                return next;
            });
        }
    };

    const CopyBubble = ({
        eyebrow,
        title,
        body,
        slideDirection = "left"
    }: {
        eyebrow: string;
        title: string;
        body: string;
        slideDirection?: "left" | "right";
    }) => (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            <motion.div
                initial={{ opacity: 0, x: slideDirection === "left" ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: slideDirection === "left" ? -20 : 20, transition: { duration: 0.3 } }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                className="max-w-md w-full rounded-2xl border border-black/70 bg-[#F6F5F4] text-brand-black shadow-[0_20px_45px_-25px_rgba(0,0,0,0.2)] px-6 py-5"
            >
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-black/70">{eyebrow}</p>
                    <h3 className="text-2xl md:text-3xl font-bold font-poppins leading-tight">{title}</h3>
                    <p className="text-sm md:text-base leading-relaxed text-brand-black/80">{body}</p>
                    <p className="text-[11px] md:text-xs font-semibold text-brand-black/70">Hover another card to keep exploring.</p>
                </div>
            </motion.div>
        </div>
    );

    return (
        <section className="w-full bg-white px-6 md:px-10 lg:px-16 py-10 md:py-14">
            <div className="mx-auto max-w-6xl">
                <div className="text-center mb-10">
                    <h2 className="text-4xl md:text-5xl font-poppins font-bold tracking-tight text-black mb-4">
                        Brand Agnostic.
                    </h2>
                    <p className="text-xl md:text-2xl font-lora text-brand-black/70 mb-8">
                        Our favorite is yours.
                    </p>

                </div>

                {/* Brand Logos - Sticky throughout the section */}
                <div className="sticky top-24 z-20 py-4 mb-10 md:static md:py-0 md:mb-12 transition-all duration-300 pointer-events-none">
                    <div className="flex items-center justify-center max-w-4xl mx-auto">
                        <div className="flex items-center justify-center gap-6 md:gap-12 flex-wrap bg-white/80 backdrop-blur-xl border border-gray-200/60 shadow-sm rounded-full px-6 py-3 md:bg-transparent md:backdrop-blur-none md:border-none md:shadow-none md:px-0 md:py-0 pointer-events-auto">
                            <Image
                                src="/brand_animations/ingenico.svg"
                                alt="Ingenico"
                                width={120}
                                height={40}
                                className="h-6 md:h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                            />
                            <Image
                                src="/brand_animations/verifone_1.svg"
                                alt="Verifone"
                                width={120}
                                height={40}
                                className="h-6 md:h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                            />
                            <Image
                                src="/brand_animations/clover_1.svg"
                                alt="Clover"
                                width={100}
                                height={40}
                                className="h-6 md:h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                            />
                            <Image
                                src="/brand_animations/pax.svg"
                                alt="PAX"
                                width={100}
                                height={40}
                                className="h-6 md:h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                            />
                            <Image
                                src="/brand_animations/dejavoo.webp"
                                alt="Dejavoo"
                                width={120}
                                height={40}
                                className="h-6 md:h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                            />
                        </div>
                    </div>
                </div>


                {/* Row 1: Countertop + POS Hardware */}
                <div className="grid gap-6 md:grid-cols-2 mb-6 relative">
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0, duration: 0.5 }}
                    >
                        <div
                            className={`w-full transition-opacity duration-300 ${expandedCard === 'pos-hardware' ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'}`}
                        >
                            <HardwareCategoryCard
                                title="Countertop"
                                images={COUNTERTOP_IMAGES}
                                isExpanded={expandedCard === 'countertop-hardware'}
                                onExpand={() => handleExpand('countertop-hardware')}
                                expandDirection="down"
                                hasBeenViewed={viewedCards.has('countertop-hardware')}
                            />
                        </div>
                        <AnimatePresence>
                            {expandedCard === 'pos-hardware' && (
                                <CopyBubble
                                    eyebrow="Point of Sale Systems"
                                    title="Full-featured POS terminals"
                                    body="Powerful POS systems from Ingenico, Verifone, Clover, and Dejavoo. These all-in-one solutions combine payment processing with business management tools for streamlined operations."
                                    slideDirection="right"
                                />
                            )}
                        </AnimatePresence>
                    </motion.div>
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                    >
                        <div
                            className={`w-full transition-opacity duration-300 ${expandedCard === 'countertop-hardware' ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'}`}
                        >
                            <HardwareCategoryCard
                                title="POS"
                                images={POS_IMAGES}
                                isExpanded={expandedCard === 'pos-hardware'}
                                onExpand={() => handleExpand('pos-hardware')}
                                expandDirection="down"
                                hasBeenViewed={viewedCards.has('pos-hardware')}
                            />
                        </div>
                        <AnimatePresence>
                            {expandedCard === 'countertop-hardware' && (
                                <CopyBubble
                                    eyebrow="Countertop Terminals"
                                    title="Reliable countertop payment solutions"
                                    body="Countertop terminals from Ingenico, Verifone, Clover, and Dejavoo. Perfect for fixed checkout locations with robust EMV, NFC, and signature capture capabilities."
                                    slideDirection="left"
                                />
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Row 2: Unattended + Wireless Hardware */}
                <div className="grid gap-6 md:grid-cols-2 relative">
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <div
                            className={`w-full transition-opacity duration-300 ${expandedCard === 'wireless-hardware' ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'}`}
                        >
                            <HardwareCategoryCard
                                title="Unattended"
                                images={UNATTENDED_IMAGES}
                                isExpanded={expandedCard === 'unattended-hardware'}
                                onExpand={() => handleExpand('unattended-hardware')}
                                expandDirection="up"
                                hasBeenViewed={viewedCards.has('unattended-hardware')}
                            />
                        </div>
                        <AnimatePresence>
                            {expandedCard === 'wireless-hardware' && (
                                <CopyBubble
                                    eyebrow="Wireless Terminals"
                                    title="Mobile payment freedom"
                                    body="Wireless terminals from Ingenico, Verifone, Clover, and Dejavoo. Accept payments tableside, curbside, or on-the-go with 4G/WiFi connectivity and long battery life."
                                    slideDirection="right"
                                />
                            )}
                        </AnimatePresence>
                    </motion.div>
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <div
                            className={`w-full transition-opacity duration-300 ${expandedCard === 'unattended-hardware' ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'}`}
                        >
                            <HardwareCategoryCard
                                title="Wireless"
                                images={WIRELESS_IMAGES}
                                isExpanded={expandedCard === 'wireless-hardware'}
                                onExpand={() => handleExpand('wireless-hardware')}
                                expandDirection="up"
                                hasBeenViewed={viewedCards.has('wireless-hardware')}
                            />
                        </div>
                        <AnimatePresence>
                            {expandedCard === 'unattended-hardware' && (
                                <CopyBubble
                                    eyebrow="Unattended Kiosks"
                                    title="Self-service payment kiosks"
                                    body="Unattended kiosk terminals from Ingenico, Verifone, Clover, and Dejavoo. Ideal for retail, parking, vending, and 24/7 automated payment acceptance."
                                    slideDirection="left"
                                />
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section >
    );
}
