"use client";

import React from 'react';
import { OnboardingLayout } from '../OnboardingLayout';
import { FormInput } from '../FormInput';
import { useOnboarding } from '@/contexts/onboarding-context';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { motion } from 'framer-motion';

export function BusinessBasicsStep() {
    const { data, updateData, nextStep } = useOnboarding();

    const handleContinue = () => {
        // Basic validation could be added here
        nextStep();
    };

    return (
        <OnboardingLayout
            title="Tell us about your business."
            subtitle="Let's start with the basics."
        >
            <div className="space-y-8">
                <div className="rounded-3xl bg-[white] border border-[gray-200] px-6 py-7 md:px-8 md:py-8">
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="md:col-span-2">
                                <FormInput
                                    label="Legal/Corporate Name"
                                    value={data.legalName}
                                    onChange={(e) => updateData({ legalName: e.target.value })}
                                    placeholder="Acme Coffee LLC"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <FormInput
                                    label="DBA (Doing Business As)"
                                    value={data.dba}
                                    onChange={(e) => updateData({ dba: e.target.value })}
                                    placeholder="Acme Coffee"
                                    helperText="Leave blank if same as legal name"
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-[gray-200]">
                            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[brand-black/60]">
                                Business Address
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="md:col-span-2">
                                    <FormInput
                                        label="Street Address"
                                        value={data.businessStreet}
                                        onChange={(e) => updateData({ businessStreet: e.target.value })}
                                        placeholder="123 Main Street"
                                    />
                                </div>

                                <FormInput
                                    label="City"
                                    value={data.businessCity}
                                    onChange={(e) => updateData({ businessCity: e.target.value })}
                                    placeholder="San Francisco"
                                />

                                <div className="grid grid-cols-2 gap-5">
                                    <FormInput
                                        label="State"
                                        value={data.businessState}
                                        onChange={(e) => updateData({ businessState: e.target.value })}
                                        placeholder="CA"
                                        maxLength={2}
                                    />

                                    <FormInput
                                        label="Zip Code"
                                        value={data.businessZip}
                                        onChange={(e) => updateData({ businessZip: e.target.value })}
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
                                    label="Main Business Phone"
                                    type="tel"
                                    value={data.businessPhone}
                                    onChange={(e) => updateData({ businessPhone: e.target.value })}
                                    placeholder="(555) 555-5555"
                                />

                                <FormInput
                                    label="Email"
                                    type="email"
                                    value={data.businessEmail}
                                    onChange={(e) => updateData({ businessEmail: e.target.value })}
                                    placeholder="hello@acmecoffee.com"
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-[gray-200]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <FormInput
                                    label="EIN (Employer Identification Number)"
                                    value={data.ein}
                                    onChange={(e) => updateData({ ein: e.target.value })}
                                    placeholder="12-3456789"
                                />

                                <FormInput
                                    label="Business Start Date"
                                    type="date"
                                    value={data.startDate}
                                    onChange={(e) => updateData({ startDate: e.target.value })}
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
