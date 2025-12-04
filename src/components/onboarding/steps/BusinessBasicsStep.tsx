"use client";

import React, { useState } from 'react';
import { OnboardingLayout } from '../OnboardingLayout';
import { FormInput } from '../FormInput';
import { useOnboarding } from '@/contexts/onboarding-context';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export function BusinessBasicsStep() {
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
                        Your business basics are saved. Moving to the next step...
                    </p>
                </motion.div>
            </div>
        );
    }

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
                        Confirm
                    </PrimaryButton>
                </motion.div>
            </div>
        </OnboardingLayout>
    );
}
