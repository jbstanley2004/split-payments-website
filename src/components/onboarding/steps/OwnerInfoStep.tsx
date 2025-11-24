"use client";

import React from 'react';
import { OnboardingLayout } from '../OnboardingLayout';
import { FormInput } from '../FormInput';
import { useOnboarding } from '@/contexts/onboarding-context';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { motion } from 'framer-motion';

export function OwnerInfoStep() {
    const { data, updateData, nextStep } = useOnboarding();

    const handleContinue = () => {
        nextStep();
    };

    return (
        <OnboardingLayout
            title="Owner information."
            subtitle="Tell us about the primary owner or corporate officer."
        >
            <div className="space-y-8">
                <div className="rounded-3xl bg-[white] border border-[gray-200] px-6 py-7 md:px-8 md:py-8">
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <FormInput
                                label="Full Name"
                                value={data.ownerName}
                                onChange={(e) => updateData({ ownerName: e.target.value })}
                                placeholder="John Smith"
                            />

                            <FormInput
                                label="Title"
                                value={data.ownerTitle}
                                onChange={(e) => updateData({ ownerTitle: e.target.value })}
                                placeholder="CEO, Owner, President, etc."
                            />

                            <FormInput
                                label="Ownership Percentage"
                                type="number"
                                value={data.ownershipPercentage}
                                onChange={(e) => updateData({ ownershipPercentage: e.target.value })}
                                placeholder="100"
                                min="0"
                                max="100"
                            />

                            <FormInput
                                label="Date of Birth"
                                type="date"
                                value={data.ownerDob}
                                onChange={(e) => updateData({ ownerDob: e.target.value })}
                            />
                        </div>

                        <div className="pt-4 border-t border-[gray-200]">
                            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[brand-black/60]">
                                Home Address
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="md:col-span-2">
                                    <FormInput
                                        label="Street Address"
                                        value={data.ownerStreet}
                                        onChange={(e) => updateData({ ownerStreet: e.target.value })}
                                        placeholder="456 Residential Ave"
                                    />
                                </div>

                                <FormInput
                                    label="City"
                                    value={data.ownerCity}
                                    onChange={(e) => updateData({ ownerCity: e.target.value })}
                                    placeholder="San Francisco"
                                />

                                <div className="grid grid-cols-2 gap-5">
                                    <FormInput
                                        label="State"
                                        value={data.ownerState}
                                        onChange={(e) => updateData({ ownerState: e.target.value })}
                                        placeholder="CA"
                                        maxLength={2}
                                    />

                                    <FormInput
                                        label="Zip Code"
                                        value={data.ownerZip}
                                        onChange={(e) => updateData({ ownerZip: e.target.value })}
                                        placeholder="94102"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-[gray-200]">
                            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[brand-black/60]">
                                Contact Information
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <FormInput
                                    label="Cell Phone"
                                    type="tel"
                                    value={data.ownerCellPhone}
                                    onChange={(e) => updateData({ ownerCellPhone: e.target.value })}
                                    placeholder="(555) 555-1234"
                                />

                                <FormInput
                                    label="Business Phone (with extension)"
                                    type="tel"
                                    value={data.ownerBusinessPhone}
                                    onChange={(e) => updateData({ ownerBusinessPhone: e.target.value })}
                                    placeholder="(555) 555-5555 ext. 101"
                                />
                            </div>
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
