"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export interface BusinessProfileData {
    ownerName: string;
    legalName: string;
    phone: string;
    monthlyVolume: string;
    // Optional fields that might be passed in initialData but not collected here
    email?: string;
}

interface BusinessProfileWizardProps {
    onSubmit: (data: BusinessProfileData) => void;
    initialData?: Partial<BusinessProfileData>;
}

export const BusinessProfileWizard: React.FC<BusinessProfileWizardProps> = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState<BusinessProfileData>({
        ownerName: '',
        legalName: '',
        phone: '',
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
        <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="px-8 py-6 border-b border-gray-100 bg-white z-10">
                <h2 className="text-2xl font-bold text-gray-900">Welcome to Split</h2>
                <p className="text-sm text-gray-500 mt-1">Let's get your profile set up.</p>
            </div>

            {/* Form Content */}
            <div className="p-8 bg-[#FAFAFA]">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Full Name</label>
                        <input
                            type="text"
                            value={formData.ownerName}
                            onChange={(e) => handleChange('ownerName', e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all placeholder-gray-300"
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Company Name</label>
                        <input
                            type="text"
                            value={formData.legalName}
                            onChange={(e) => handleChange('legalName', e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all placeholder-gray-300"
                            placeholder="Acme Inc."
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Phone Number</label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all placeholder-gray-300"
                            placeholder="(555) 555-5555"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Average Monthly Processing Volume</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                            <input
                                type="text"
                                value={formData.monthlyVolume}
                                onChange={(e) => handleChange('monthlyVolume', e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-xl pl-8 pr-4 py-3 text-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all placeholder-gray-300"
                                placeholder="0.00"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-black text-white rounded-full font-medium text-lg hover:bg-gray-800 shadow-none hover:shadow-none transition-all mt-8"
                    >
                        <span>Complete Profile</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};
