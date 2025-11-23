"use client";

import React from 'react';
import { OnboardingLayout } from '../OnboardingLayout';
import { FormInput } from '../FormInput';
import { useOnboarding } from '@/contexts/onboarding-context';
import OrangePushButton from '@/components/OrangePushButton';
import { motion } from 'framer-motion';

export function BusinessReferencesStep() {
    const { data, updateData, nextStep } = useOnboarding();

    const updateReference = (index: number, field: string, value: string) => {
        const newReferences = [...data.references];
        newReferences[index] = { ...newReferences[index], [field]: value };
        updateData({ references: newReferences });
    };

    const handleContinue = () => {
        nextStep();
    };

    return (
        <OnboardingLayout
            title="Business references."
            subtitle="Please provide three business references we can contact."
        >
            <div className="space-y-8">
                {data.references.map((reference, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="rounded-3xl bg-[white] border border-[gray-200] px-6 py-7 md:px-8 md:py-8"
                    >
                        <h3 className="text-lg font-poppins font-semibold text-[brand-black] mb-6">
                            Reference {index + 1}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="md:col-span-2">
                                <FormInput
                                    label="Business Name"
                                    value={reference.businessName}
                                    onChange={(e) => updateReference(index, 'businessName', e.target.value)}
                                    placeholder="ABC Supplier Co."
                                />
                            </div>

                            <FormInput
                                label="Contact Person & Title"
                                value={reference.contactPerson}
                                onChange={(e) => updateReference(index, 'contactPerson', e.target.value)}
                                placeholder="John Smith, Sales Manager"
                            />

                            <FormInput
                                label="Phone Number"
                                type="tel"
                                value={reference.phone}
                                onChange={(e) => updateReference(index, 'phone', e.target.value)}
                                placeholder="(555) 555-5555"
                            />
                        </div>
                    </motion.div>
                ))}

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
