"use client";

import React, { useState } from 'react';
import { OnboardingLayout } from '../OnboardingLayout';
import { FileUploadZone } from '../FileUploadZone';
import { useOnboarding } from '@/contexts/onboarding-context';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export function WelcomeStep() {
    const { data, updateData, nextStep } = useOnboarding();
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleContinue = () => {
        setIsConfirmed(true);
        setTimeout(() => {
            nextStep();
        }, 2000);
    };

    if (isConfirmed) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.6 }}
                    className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center"
                >
                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2 className="text-3xl md:text-4xl font-poppins font-semibold text-[brand-black] mb-4">
                        Section Complete!
                    </h2>
                    <p className="text-lg text-[brand-black/70] font-lora max-w-2xl">
                        Your files have been uploaded. Moving to the next step...
                    </p>
                </motion.div>
            </div>
        );
    }

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
                    transition={{ delay: 0.2 }}
                    className="rounded-2xl bg-gray-50 border border-gray-100 px-6 py-5"
                >
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                            <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-black mb-1">Your privacy is protected</h4>
                            <p className="text-xs text-black/70 leading-relaxed">
                                We don't use your personal data for any purpose other than assessing your funding eligibility.
                                We will never sell your information to third parties, send it to credit bureaus, or pull any type of consumer credit report.
                            </p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-3xl bg-white border border-gray-200 px-6 py-8 md:px-8 md:py-10"
                >
                    <div className="mb-6">
                        <h3 className="text-lg font-poppins font-semibold text-black mb-2">
                            Upload your merchant statements
                        </h3>
                        <p className="text-sm text-black/70">
                            Please upload your last 3 months of credit card processing statements.
                            This helps us provide accurate funding options based on your actual sales.
                        </p>
                    </div>

                    <FileUploadZone
                        files={data.merchantStatements}
                        onChange={(files) => updateData({ merchantStatements: files })}
                    />

                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="flex items-start gap-2 text-xs text-black/50">
                            <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-black/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    <PrimaryButton
                        variant="outline-orange"
                        className="px-6 py-3 text-base"
                        onClick={handleContinue}
                    >
                        Confirm
                    </PrimaryButton>
                </motion.div>
            </div>
        </OnboardingLayout>
    );
}
