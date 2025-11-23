"use client";

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useOnboarding } from '@/contexts/onboarding-context';
import { ChevronLeft } from 'lucide-react';

interface OnboardingLayoutProps {
    children: ReactNode;
    title: string;
    subtitle?: string;
    showBack?: boolean;
}

export function OnboardingLayout({ children, title, subtitle, showBack = true }: OnboardingLayoutProps) {
    const { currentStep, prevStep, progress } = useOnboarding();

    return (
        <div className="space-y-8">
            {/* Progress Bar */}
            <div className="relative h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                    className="absolute inset-y-0 left-0 bg-[#FF4306] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                />
            </div>

            {/* Back Button */}
            {showBack && currentStep > 0 && (
                <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={prevStep}
                    className="inline-flex items-center gap-2 text-sm font-medium text-black/60 hover:text-black transition-colors"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                </motion.button>
            )}

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <h2 className="text-3xl md:text-4xl font-poppins font-semibold tracking-tight text-black mb-3">
                    {title}
                </h2>
                {subtitle && (
                    <p className="text-base md:text-lg text-black/70 font-lora">
                        {subtitle}
                    </p>
                )}
            </motion.div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                {children}
            </motion.div>
        </div>
    );
}
