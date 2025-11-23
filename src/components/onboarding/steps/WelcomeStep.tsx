"use client";

import React from 'react';
import { OnboardingLayout } from '../OnboardingLayout';
import { FileUploadZone } from '../FileUploadZone';
import { useOnboarding } from '@/contexts/onboarding-context';
import OrangePushButton from '@/components/OrangePushButton';
import { motion } from 'framer-motion';

export function WelcomeStep() {
    const { data, updateData, nextStep } = useOnboarding();

    const handleContinue = () => {
        nextStep();
    };

    return (
        <OnboardingLayout
            title="Let's get you funded."
            subtitle="We'll walk you through a few quick questions to understand your business and get you the best funding options."
            showBack={false}
        >
            <div className="space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-3xl bg-[white] border border-[gray-200] px-6 py-8 md:px-8 md:py-10"
                >
                    <div className="mb-6">
                        <h3 className="text-lg font-poppins font-semibold text-[brand-black] mb-2">
                            Upload your merchant statements
                        </h3>
                        <p className="text-sm text-[brand-black/70]">
                            Please upload your last 3 months of credit card processing statements.
                            This helps us provide accurate funding options based on your actual sales.
                        </p>
                    </div>

                    <FileUploadZone
                        files={data.merchantStatements}
                        onChange={(files) => updateData({ merchantStatements: files })}
                        maxFiles={3}
                    />

                    <div className="mt-6 pt-6 border-t border-[gray-200]">
                        <div className="flex items-start gap-2 text-xs text-[brand-black/50]">
                            <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-[brand-black/60]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="leading-relaxed">
                                Your statements are secure and will only be used to assess your funding eligibility.
                                We accept PDF, image, or document formats.
                            </p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex justify-end"
                >
                    <OrangePushButton onClick={handleContinue}>
                        Continue
                    </OrangePushButton>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                >
                    <p className="text-xs text-[brand-black/50]">
                        This should take about 5-7 minutes to complete
                    </p>
                </motion.div>
            </div>
        </OnboardingLayout>
    );
}
