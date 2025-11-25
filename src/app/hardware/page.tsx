"use client";

import React from 'react';
import { motion } from 'framer-motion';
import WirelessSpotlight from '@/components/WirelessSpotlight';
import POSIntegrationSpotlight from '@/components/POSIntegrationSpotlight';
import UnattendedSpotlight from '@/components/UnattendedSpotlight';
import CountertopSpotlight from '@/components/CountertopSpotlight';
import { DynamicIslandNav } from '@/components/dynamic-island-nav';

export default function HardwarePage() {
    return (
        <main className="relative min-h-screen text-brand-black selection:bg-black/10 selection:text-black font-poppins">
            <div className="relative z-10">
                <DynamicIslandNav />

                {/* Hero Section */}
                <div className="w-full bg-white pt-32 pb-12 md:pt-40 md:pb-16">
                    <section className="px-6 md:px-10 lg:px-16">
                        <div className="max-w-6xl mx-auto text-center mb-16">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl md:text-6xl font-bold text-brand-black mb-6 font-poppins"
                            >
                                Payment Hardware Categories
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-xl text-brand-black/60 font-lora max-w-3xl mx-auto"
                            >
                                Explore our complete range of payment solutions across four key categories.
                            </motion.p>
                        </div>
                    </section>
                </div>

                {/* Wireless Terminals */}
                <div className="w-full bg-[#F6F5F4]">
                    <section className="px-6 md:px-10 lg:px-16 py-16 md:py-20">
                        <div className="max-w-6xl mx-auto">
                            <div className="mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4 font-poppins">
                                    Wireless Terminals
                                </h2>
                                <p className="text-lg text-brand-black/60 font-lora">
                                    Mobile payment solutions for businesses on the go.
                                </p>
                            </div>
                            <WirelessSpotlight />
                        </div>
                    </section>
                </div>

                {/* POS Integration */}
                <div className="w-full bg-white">
                    <section className="px-6 md:px-10 lg:px-16 py-16 md:py-20">
                        <div className="max-w-6xl mx-auto">
                            <div className="mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4 font-poppins">
                                    POS Integration Systems
                                </h2>
                                <p className="text-lg text-brand-black/60 font-lora">
                                    Complete point-of-sale solutions for retail and hospitality.
                                </p>
                            </div>
                            <POSIntegrationSpotlight />
                        </div>
                    </section>
                </div>

                {/* Unattended Self Service */}
                <div className="w-full bg-[#F6F5F4]">
                    <section className="px-6 md:px-10 lg:px-16 py-16 md:py-20">
                        <div className="max-w-6xl mx-auto">
                            <div className="mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4 font-poppins">
                                    Unattended Self Service
                                </h2>
                                <p className="text-lg text-brand-black/60 font-lora">
                                    Kiosks and automated payment terminals for 24/7 operations.
                                </p>
                            </div>
                            <UnattendedSpotlight />
                        </div>
                    </section>
                </div>

                {/* Countertop Terminals */}
                <div className="w-full bg-white">
                    <section className="px-6 md:px-10 lg:px-16 py-16 md:py-20">
                        <div className="max-w-6xl mx-auto">
                            <div className="mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4 font-poppins">
                                    Countertop Terminals
                                </h2>
                                <p className="text-lg text-brand-black/60 font-lora">
                                    Reliable stationary terminals for checkout counters and service desks.
                                </p>
                            </div>
                            <CountertopSpotlight />
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
