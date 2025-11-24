"use client";

import React from 'react';
import { OnboardingLayout } from '../OnboardingLayout';
import { FormInput } from '../FormInput';
import { FormSelect } from '../FormSelect';
import { useOnboarding } from '@/contexts/onboarding-context';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { motion } from 'framer-motion';

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

    const handleContinue = () => {
        nextStep();
    };

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
                        Continue
                    </PrimaryButton>
                </motion.div>
            </div>
        </OnboardingLayout>
    );
}
