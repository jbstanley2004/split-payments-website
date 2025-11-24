"use client";

import React from 'react';
import { OnboardingLayout } from '../OnboardingLayout';
import { FormInput } from '../FormInput';
import { useOnboarding } from '@/contexts/onboarding-context';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { motion } from 'framer-motion';

export function AdditionalInfoStep() {
    const { data, updateData, nextStep } = useOnboarding();

    const handleContinue = () => {
        nextStep();
    };

    return (
        <OnboardingLayout
            title="A few more details."
            subtitle="This information helps us understand your current financial situation."
        >
            <div className="space-y-8">
                <div className="rounded-3xl bg-[white] border border-[gray-200] px-6 py-7 md:px-8 md:py-8">
                    <div className="space-y-6">
                        <FormInput
                            label="Current Credit Card Processing Company"
                            value={data.currentProcessor}
                            onChange={(e) => updateData({ currentProcessor: e.target.value })}
                            placeholder="Square, Stripe, PayPal, etc."
                        />

                        <FormInput
                            label="Monthly Revenue"
                            type="number"
                            value={data.monthlyRevenue}
                            onChange={(e) => updateData({ monthlyRevenue: e.target.value })}
                            placeholder="50000"
                            helperText="Average monthly revenue in USD"
                        />

                        <div>
                            <FormInput
                                label="Outstanding Merchant Cash Advance Balances (Combined)"
                                type="number"
                                value={data.outstandingMcaBalance}
                                onChange={(e) => updateData({ outstandingMcaBalance: e.target.value })}
                                placeholder="0"
                                helperText="If applicable - leave 0 if none"
                            />
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="mt-3 flex items-start gap-2 text-xs text-[brand-black/50] bg-blue-50 border border-blue-100 rounded-lg px-3 py-2.5"
                            >
                                <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="leading-relaxed">
                                    Having outstanding MCAs is not a disqualifier. We work with businesses in various financial situations.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-end"
                >
                    <PrimaryButton
                        variant="outline-orange"
                        className="px-6 py-3 text-base"
                        onClick={handleContinue}
                    >
                        Continue
                    </PrimaryButton>
                </motion.div>
            </div>
        </OnboardingLayout>
    );
}
