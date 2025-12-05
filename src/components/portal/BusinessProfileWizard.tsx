"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export interface BusinessProfileData {
    ownerName: string;
    legalName: string;
    phone: string;
    ownerPhone: string;
    monthlyVolume: string;
    // Optional fields that might be passed in initialData but not collected here
    email?: string;
}

interface BusinessProfileWizardProps {
    onSubmit: (data: BusinessProfileData) => void;
    initialData?: Partial<BusinessProfileData>;
    isSubmitting?: boolean;
}

export const BusinessProfileWizard: React.FC<BusinessProfileWizardProps> = ({ onSubmit, initialData, isSubmitting = false }) => {
    const [formData, setFormData] = useState<BusinessProfileData>({
        ownerName: '',
        legalName: '',
        phone: '',
        ownerPhone: '',
        monthlyVolume: '',
        ...initialData
    });

    const handleChange = (field: keyof BusinessProfileData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="w-full bg-white rounded-[40px] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.08)] border border-white/50 overflow-hidden flex flex-col">
            {/* Form Content */}
            <div className="p-6 md:p-8 bg-white">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-1">Full Name</label>
                        <input
                            type="text"
                            value={formData.ownerName}
                            onChange={(e) => handleChange('ownerName', e.target.value)}
                            className="w-full bg-[#F6F5F4] border-transparent rounded-2xl px-6 py-4 text-xl focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all placeholder-gray-300 font-medium"
                            placeholder="John Doe"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-1">Company Name</label>
                        <input
                            type="text"
                            value={formData.legalName}
                            onChange={(e) => handleChange('legalName', e.target.value)}
                            className="w-full bg-[#F6F5F4] border-transparent rounded-2xl px-6 py-4 text-xl focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all placeholder-gray-300 font-medium"
                            placeholder="Acme Inc."
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-1">Business Phone</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}
                                className="w-full bg-[#F6F5F4] border-transparent rounded-2xl px-6 py-4 text-xl focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all placeholder-gray-300 font-medium"
                                placeholder="(555) 555-5555"
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-1">Owner Cell Phone</label>
                            <input
                                type="tel"
                                value={formData.ownerPhone}
                                onChange={(e) => handleChange('ownerPhone', e.target.value)}
                                className="w-full bg-[#F6F5F4] border-transparent rounded-2xl px-6 py-4 text-xl focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all placeholder-gray-300 font-medium"
                                placeholder="(555) 555-5555"
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-1">Average Monthly Processing Volume</label>
                        <div className="relative">
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-xl">$</span>
                            <input
                                type="text"
                                value={formData.monthlyVolume}
                                onChange={(e) => handleChange('monthlyVolume', e.target.value)}
                                className="w-full bg-[#F6F5F4] border-transparent rounded-2xl pl-10 pr-6 py-4 text-xl focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all placeholder-gray-300 font-medium"
                                placeholder="0.00"
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 px-8 py-5 bg-black text-white rounded-2xl font-bold text-lg hover:bg-gray-900 shadow-lg hover:shadow-xl transition-all mt-8 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                    >
                        {isSubmitting ? (
                            <span>Processing...</span>
                        ) : (
                            <>
                                <span>Complete Profile</span>
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};
