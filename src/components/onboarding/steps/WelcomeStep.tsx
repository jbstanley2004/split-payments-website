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
                {/* Privacy Message */}
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
                    <OrangePushButton onClick={handleContinue}>
                        Continue
                    </OrangePushButton>
                </motion.div>
            </div>
        </OnboardingLayout>
    );
}
