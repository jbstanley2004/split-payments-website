"use client";

import React, { useState } from 'react';
import { OnboardingLayout } from '../OnboardingLayout';
import { FormInput } from '../FormInput';
import { useOnboarding } from '@/contexts/onboarding-context';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';

export function PartnersStep() {
    const { data, updateData, nextStep } = useOnboarding();
    const [hasPartners, setHasPartners] = useState<boolean | null>(
        data.partners.length > 0 ? true : null
    );

    const addPartner = () => {
        const newPartner = {
            name: '',
            title: '',
            ownership: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            dob: '',
            cellPhone: '',
            businessPhone: '',
        };
        updateData({ partners: [...data.partners, newPartner] });
    };

    const removePartner = (index: number) => {
        const newPartners = data.partners.filter((_, i) => i !== index);
        updateData({ partners: newPartners });
        if (newPartners.length === 0) {
            setHasPartners(null);
        }
    };

    const updatePartner = (index: number, field: string, value: string) => {
        const newPartners = [...data.partners];
        newPartners[index] = { ...newPartners[index], [field]: value };
        updateData({ partners: newPartners });
    };

    const handleContinue = () => {
        if (hasPartners === false) {
            updateData({ partners: [] });
        }
        nextStep();
    };

    const handleYes = () => {
        setHasPartners(true);
        if (data.partners.length === 0) {
            addPartner();
        }
    };

    const handleNo = () => {
        setHasPartners(false);
        updateData({ partners: [] });
    };

    return (
        <OnboardingLayout
            title="Partners or additional officers."
            subtitle="Do you have any partners or additional corporate officers with significant ownership?"
        >
            <div className="space-y-8">
                {hasPartners === null && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-4 justify-center"
                    >
                        <button
                            onClick={handleYes}
                            className="px-8 py-4 rounded-2xl bg-[white] border-2 border-[gray-200] hover:border-[#FF4306] hover:bg-white transition-all font-semibold text-[brand-black]"
                        >
                            Yes, I have partners
                        </button>
                        <button
                            onClick={handleNo}
                            className="px-8 py-4 rounded-2xl bg-white border-2 border-[gray-200] hover:border-[#FF4306] transition-all font-semibold text-[brand-black]"
                        >
                            No partners
                        </button>
                    </motion.div>
                )}

                <AnimatePresence mode="wait">
                    {hasPartners === true && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            {data.partners.map((partner, index) => (
                                <div
                                    key={index}
                                    className="rounded-3xl bg-[white] border border-[gray-200] px-6 py-7 md:px-8 md:py-8"
                                >
                                    <div className="flex items-start justify-between mb-6">
                                        <h3 className="text-lg font-poppins font-semibold text-[brand-black]">
                                            Partner {index + 1}
                                        </h3>
                                        {data.partners.length > 1 && (
                                            <button
                                                onClick={() => removePartner(index)}
                                                className="p-2 rounded-lg hover:bg-red-50 text-[brand-black/50] hover:text-red-600 transition-colors"
                                                aria-label="Remove partner"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>

                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <FormInput
                                                label="Full Name"
                                                value={partner.name}
                                                onChange={(e) => updatePartner(index, 'name', e.target.value)}
                                                placeholder="Jane Doe"
                                            />

                                            <FormInput
                                                label="Title"
                                                value={partner.title}
                                                onChange={(e) => updatePartner(index, 'title', e.target.value)}
                                                placeholder="CFO, Partner, etc."
                                            />

                                            <FormInput
                                                label="Ownership Percentage"
                                                type="number"
                                                value={partner.ownership}
                                                onChange={(e) => updatePartner(index, 'ownership', e.target.value)}
                                                placeholder="25"
                                                min="0"
                                                max="100"
                                            />

                                            <FormInput
                                                label="Date of Birth"
                                                type="date"
                                                value={partner.dob}
                                                onChange={(e) => updatePartner(index, 'dob', e.target.value)}
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
                                                        value={partner.street}
                                                        onChange={(e) => updatePartner(index, 'street', e.target.value)}
                                                        placeholder="789 Partner Lane"
                                                    />
                                                </div>

                                                <FormInput
                                                    label="City"
                                                    value={partner.city}
                                                    onChange={(e) => updatePartner(index, 'city', e.target.value)}
                                                    placeholder="San Francisco"
                                                />

                                                <div className="grid grid-cols-2 gap-5">
                                                    <FormInput
                                                        label="State"
                                                        value={partner.state}
                                                        onChange={(e) => updatePartner(index, 'state', e.target.value)}
                                                        placeholder="CA"
                                                        maxLength={2}
                                                    />

                                                    <FormInput
                                                        label="Zip Code"
                                                        value={partner.zip}
                                                        onChange={(e) => updatePartner(index, 'zip', e.target.value)}
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
                                                    value={partner.cellPhone}
                                                    onChange={(e) => updatePartner(index, 'cellPhone', e.target.value)}
                                                    placeholder="(555) 555-6789"
                                                />

                                                <FormInput
                                                    label="Business Phone (with extension)"
                                                    type="tel"
                                                    value={partner.businessPhone}
                                                    onChange={(e) => updatePartner(index, 'businessPhone', e.target.value)}
                                                    placeholder="(555) 555-5555 ext. 102"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button
                                onClick={addPartner}
                                className="w-full py-4 rounded-2xl border-2 border-dashed border-[gray-200] hover:border-[#FF4306] hover:bg-[white] transition-all flex items-center justify-center gap-2 text-[brand-black/70] hover:text-[brand-black] font-medium"
                            >
                                <Plus className="w-5 h-5" />
                                Add Another Partner
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {hasPartners !== null && (
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
                )}
            </div>
        </OnboardingLayout>
    );
}
