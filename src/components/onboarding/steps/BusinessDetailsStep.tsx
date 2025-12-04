"use client";

import React, { useState } from 'react';
import { OnboardingLayout } from '../OnboardingLayout';
import { FormInput } from '../FormInput';
import { FormSelect } from '../FormSelect';
import { useOnboarding } from '@/contexts/onboarding-context';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const entityTypes = [
    { value: '', label: 'Select entity type' },
    { value: 'LLC', label: 'LLC' },
    { value: 'General Partnership', label: 'General Partnership' },
    { value: 'C Corporation', label: 'C Corporation' },
    { value: 'S Corporation', label: 'S Corporation' },
    { value: 'Sole Proprietorship', label: 'Sole Proprietorship' },
    { value: 'Other', label: 'Other' },
];

const businessTypes = [
    { value: '', label: 'Select business type' },
    { value: 'Manufacturing', label: 'Manufacturing' },
    { value: 'Distribution', label: 'Distribution' },
    { value: 'Wholesale', label: 'Wholesale' },
    { value: 'Retail', label: 'Retail' },
    { value: 'Restaurant', label: 'Restaurant' },
    { value: 'Supermarket', label: 'Supermarket' },
    { value: 'Construction', label: 'Construction' },
    { value: 'Medical Professional', label: 'Medical Professional' },
    { value: 'Online Business', label: 'Online Business' },
    { value: 'Salon / Spa', label: 'Salon / Spa' },
    { value: 'Auto Services', label: 'Auto Services' },
    { value: 'Hospitality', label: 'Hospitality' },
    { value: 'Other', label: 'Other' },
];

export function BusinessDetailsStep() {
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
                        Your business details are saved. Moving to the next step...
                    </p>
                </motion.div>
            </div>
        );
    }

    return (
        <OnboardingLayout
            title="A bit more about your business."
            subtitle="This helps us tailor the right funding solution for you."
        >
            <div className="space-y-8">
                <div className="rounded-3xl bg-[white] border border-[gray-200] px-6 py-7 md:px-8 md:py-8">
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <FormSelect
                                label="Entity Type"
                                options={entityTypes}
                                value={data.entityType}
                                onChange={(e) => updateData({ entityType: e.target.value })}
                            />

                            <FormInput
                                label="State of Incorporation"
                                value={data.stateOfIncorporation}
                                onChange={(e) => updateData({ stateOfIncorporation: e.target.value })}
                                placeholder="CA"
                                maxLength={2}
                            />

                            <FormInput
                                label="Number of Locations"
                                type="number"
                                value={data.numberOfLocations}
                                onChange={(e) => updateData({ numberOfLocations: e.target.value })}
                                placeholder="1"
                            />

                            <FormSelect
                                label="Business Type"
                                options={businessTypes}
                                value={data.businessType}
                                onChange={(e) => updateData({ businessType: e.target.value })}
                            />

                            <div className="md:col-span-2">
                                <FormInput
                                    label="Products or Services Sold"
                                    value={data.productsOrServices}
                                    onChange={(e) => updateData({ productsOrServices: e.target.value })}
                                    placeholder="Coffee, pastries, and light breakfast items"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <FormInput
                                    label="Website"
                                    type="url"
                                    value={data.website}
                                    onChange={(e) => updateData({ website: e.target.value })}
                                    placeholder="https://acmecoffee.com"
                                    helperText="Optional"
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
