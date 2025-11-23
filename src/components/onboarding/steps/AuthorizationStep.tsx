"use client";

import React, { useState } from 'react';
import { OnboardingLayout } from '../OnboardingLayout';
import { FormInput } from '../FormInput';
import { useOnboarding } from '@/contexts/onboarding-context';
import OrangePushButton from '@/components/OrangePushButton';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export function AuthorizationStep() {
    const { data, updateData } = useOnboarding();
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        // Here you would typically send the data to your backend
        console.log('Form submission data:', data);

        // Auto-populate dates if not set
        const currentDate = new Date().toISOString().split('T')[0];
        if (!data.ownerSignatureDate) {
            updateData({ ownerSignatureDate: currentDate });
        }
        if (data.partners.length > 0 && !data.partnerSignatureDate) {
            updateData({ partnerSignatureDate: currentDate });
        }

        setSubmitted(true);
    };

    const hasPartners = data.partners.length > 0;
    const canSubmit = data.acceptTerms && data.ownerSignature && (!hasPartners || data.partnerSignature);

    if (submitted) {
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
                        Application submitted!
                    </h2>
                    <p className="text-lg text-[brand-black/70] font-lora max-w-2xl">
                        Thank you for completing your funding application. Our team will review your information
                        and get back to you within 24-48 hours with your funding options.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="pt-8"
                >
                    <p className="text-sm text-[brand-black/50]">
                        Questions? Email us at{' '}
                        <a href="mailto:hello@splitpayments.com" className="underline hover:text-[brand-black]">
                            hello@splitpayments.com
                        </a>
                    </p>
                </motion.div>
            </div>
        );
    }

    return (
        <OnboardingLayout
            title="Authorization and signature."
            subtitle="Please review and sign the authorization agreement."
        >
            <div className="space-y-8">
                {/* Authorization Text */}
                <div className="rounded-3xl bg-[white] border border-[gray-200] px-6 py-7 md:px-8 md:py-8">
                    <div className="max-h-96 overflow-y-auto px-2 scrollbar-thin scrollbar-thumb-[#FF4306] scrollbar-track-[white]">
                        <div className="prose prose-sm text-[brand-black/70] leading-relaxed">
                            <p className="font-semibold text-[brand-black] mb-3">AUTHORIZATION</p>
                            <p className="mb-4">
                                The Merchant and Owner(s)/Officer(s)/Partner(s) (individually, an "Applicant") identified on this application, each represents, acknowledges, and agrees that:
                            </p>
                            <ol className="space-y-3 list-decimal pl-5">
                                <li>All information and documents provided to Split LLC, including but not limited to credit card processor statements, bank statements, ID, IRS documentation, etc., are true, accurate, and complete;</li>
                                <li>Applicant will immediately notify Split LLC of any change in such information and any change in financial condition;</li>
                                <li>Applicant authorizes Split LLC to disclose all information and documents that Split LLC may obtain, including credit reports to other persons or entities (collectively, "Assignees") that may be involved with or acquire commercial funds, having daily repayment features or purchase of future receivables with a Merchant Cash Advance, including without limitation the application therefor (collectively, "Transactions") and each Assignee is authorized to use such information and documents, and share such information and documents with other Assignees, in connection with potential Transactions;</li>
                                <li>Each Assignee will rely upon the accuracy and completion of such information and documents;</li>
                                <li>Split LLC, Assignees, and each of their representatives, successors, assigns, and designees (collectively, "Recipients") are authorized to request and receive investigative reports, credit reports, statements from creditors, and financial institutions, also, verification of information, or any other information that a Recipient deems necessary;</li>
                                <li>Applicant waives and releases any claims against Recipients and any information-providers arising from any act or omission relating to the requesting, receiving, or release of information;</li>
                                <li>Each Owner/Officer/Partner represents that he or she is authorized to sign this application on behalf of Merchant;</li>
                                <li>By providing your phone number, you consent to receive marketing calls and texts from Split LLC or Assignees or Recipients at the number you provided. These calls may be made using an automatic telephone dialing system or an artificial or prerecorded voice. Your consent is not a condition of any financing options. You have the right to revoke this consent at any time. To opt-out, please reply "STOP" to any message or call us at 800-283-6247.</li>
                            </ol>
                        </div>
                    </div>
                </div>

                {/* Accept Terms Checkbox */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl bg-white border-2 border-[gray-200] px-6 py-5"
                >
                    <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={data.acceptTerms}
                            onChange={(e) => updateData({ acceptTerms: e.target.checked })}
                            className="mt-1 w-5 h-5 rounded border-2 border-[gray-200] text-[brand-black] focus:ring-[brand-black] focus:ring-offset-0 cursor-pointer"
                        />
                        <span className="text-sm text-[brand-black/70] leading-relaxed group-hover:text-[brand-black] transition-colors">
                            I have read and agree to the authorization terms above, and certify that all information provided
                            in this application is true and accurate to the best of my knowledge.
                        </span>
                    </label>
                </motion.div>

                {/* Signatures */}
                <div className="rounded-3xl bg-[white] border border-[gray-200] px-6 py-7 md:px-8 md:py-8">
                    <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-[brand-black/60]">
                        Signatures
                    </p>

                    <div className="space-y-6">
                        {/* Owner Signature */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-[brand-black]">Corporate Officer / Owner</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <FormInput
                                    label="Full Name (signature)"
                                    value={data.ownerSignature}
                                    onChange={(e) => updateData({ ownerSignature: e.target.value })}
                                    placeholder="Type your full name"
                                />
                                <FormInput
                                    label="Date"
                                    type="date"
                                    value={data.ownerSignatureDate}
                                    onChange={(e) => updateData({ ownerSignatureDate: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Partner Signature (if applicable) */}
                        {hasPartners && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="pt-6 border-t border-[gray-200] space-y-4"
                            >
                                <h4 className="text-sm font-semibold text-[brand-black]">Partner</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <FormInput
                                        label="Full Name (signature)"
                                        value={data.partnerSignature}
                                        onChange={(e) => updateData({ partnerSignature: e.target.value })}
                                        placeholder="Type your full name"
                                    />
                                    <FormInput
                                        label="Date"
                                        type="date"
                                        value={data.partnerSignatureDate}
                                        onChange={(e) => updateData({ partnerSignatureDate: e.target.value })}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* Agent Info (Optional) */}
                        <div className="pt-6 border-t border-[gray-200] space-y-4">
                            <h4 className="text-sm font-semibold text-[brand-black]">Agent Information (Optional)</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                <FormInput
                                    label="Agent Name"
                                    value={data.agentName}
                                    onChange={(e) => updateData({ agentName: e.target.value })}
                                    placeholder="Optional"
                                />
                                <FormInput
                                    label="Agent Phone"
                                    type="tel"
                                    value={data.agentPhone}
                                    onChange={(e) => updateData({ agentPhone: e.target.value })}
                                    placeholder="Optional"
                                />
                                <FormInput
                                    label="Agent Email"
                                    type="email"
                                    value={data.agentEmail}
                                    onChange={(e) => updateData({ agentEmail: e.target.value })}
                                    placeholder="Optional"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col items-end gap-3"
                >
                    <OrangePushButton
                        onClick={handleSubmit}
                        disabled={!canSubmit}
                    >
                        Submit Application
                    </OrangePushButton>
                    {!canSubmit && (
                        <p className="text-xs text-[brand-black/50]">
                            Please accept the terms and provide all required signatures
                        </p>
                    )}
                </motion.div>
            </div>
        </OnboardingLayout>
    );
}
