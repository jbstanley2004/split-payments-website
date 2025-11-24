"use client";

import React from 'react';
import { OnboardingLayout } from '../OnboardingLayout';
import { useOnboarding } from '@/contexts/onboarding-context';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { motion } from 'framer-motion';

export function CitizenshipStep() {
    const { data, updateData, nextStep } = useOnboarding();

    const handleContinue = () => {
        nextStep();
    };

    const hasPartners = data.partners.length > 0;

    return (
        <OnboardingLayout
            title="Citizenship verification."
            subtitle="Required for compliance purposes."
        >
            <div className="space-y-8">
                <div className="rounded-3xl bg-[white] border border-[gray-200] px-6 py-7 md:px-8 md:py-8">
                    <div className="space-y-8">
                        {/* Owner Citizenship */}
                        <div>
                            <p className="text-sm font-semibold text-[brand-black] mb-4">
                                Are you (the owner/corporate officer) a U.S. Citizen or Permanent Resident Alien?
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => updateData({ ownerUsCitizen: 'Yes' })}
                                    className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all font-medium ${data.ownerUsCitizen === 'Yes'
                                            ? 'bg-white border-[brand-black] text-[brand-black] shadow-sm'
                                            : 'bg-white border-[gray-200] text-[brand-black/70] hover:border-[#FF4306]'
                                        }`}
                                >
                                    Yes
                                </button>
                                <button
                                    onClick={() => updateData({ ownerUsCitizen: 'No' })}
                                    className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all font-medium ${data.ownerUsCitizen === 'No'
                                            ? 'bg-white border-[brand-black] text-[brand-black] shadow-sm'
                                            : 'bg-white border-[gray-200] text-[brand-black/70] hover:border-[#FF4306]'
                                        }`}
                                >
                                    No
                                </button>
                            </div>
                        </div>

                        {/* Partner Citizenship (if applicable) */}
                        {hasPartners && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="pt-6 border-t border-[gray-200]"
                            >
                                <p className="text-sm font-semibold text-[brand-black] mb-2">
                                    Partner Citizenship Status
                                </p>
                                <p className="text-xs text-[brand-black/50] mb-4">
                                    Please confirm that all partners listed are U.S. Citizens or Permanent Resident Aliens,
                                    or indicate if they are not.
                                </p>
                                <div className="flex gap-4">
                                    <label className="flex-1">
                                        <input
                                            type="radio"
                                            name="partnerCitizenship"
                                            value="all-yes"
                                            className="sr-only peer"
                                            onChange={() => updateData({ /* could add partnerCitizenship field */ })}
                                        />
                                        <div className="py-3 px-4 rounded-xl border-2 border-[gray-200] peer-checked:border-[brand-black] peer-checked:bg-white peer-checked:shadow-sm bg-white hover:border-[#FF4306] transition-all text-center cursor-pointer font-medium text-[brand-black/70] peer-checked:text-[brand-black]">
                                            All partners: Yes
                                        </div>
                                    </label>
                                    <label className="flex-1">
                                        <input
                                            type="radio"
                                            name="partnerCitizenship"
                                            value="some-no"
                                            className="sr-only peer"
                                            onChange={() => updateData({ /* could add partnerCitizenship field */ })}
                                        />
                                        <div className="py-3 px-4 rounded-xl border-2 border-[gray-200] peer-checked:border-[brand-black] peer-checked:bg-white peer-checked:shadow-sm bg-white hover:border-[#FF4306] transition-all text-center cursor-pointer font-medium text-[brand-black/70] peer-checked:text-[brand-black]">
                                            Some/All partners: No
                                        </div>
                                    </label>
                                </div>
                            </motion.div>
                        )}
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
                        disabled={!data.ownerUsCitizen}
                    >
                        Continue
                    </PrimaryButton>
                </motion.div>
            </div>
        </OnboardingLayout>
    );
}
