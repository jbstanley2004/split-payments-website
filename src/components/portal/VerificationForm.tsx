"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Eye, EyeOff } from "lucide-react";

interface VerificationFormProps {
    onSubmit: (ein: string, ssn: string) => void;
    isComplete: boolean;
}

export default function VerificationForm({ onSubmit, isComplete }: VerificationFormProps) {
    const [ein, setEin] = useState("");
    const [ssn, setSsn] = useState("");
    const [showSSN, setShowSSN] = useState(false);

    const formatEIN = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length <= 2) return numbers;
        return `${numbers.slice(0, 2)}-${numbers.slice(2, 9)}`;
    };

    const formatSSN = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length <= 3) return numbers;
        if (numbers.length <= 5) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
        return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(5, 9)}`;
    };

    const handleEINChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatEIN(e.target.value);
        setEin(formatted);
    };

    const handleSSNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatSSN(e.target.value);
        setSsn(formatted);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (ein.length === 10 && ssn.length === 11) {
            onSubmit(ein, ssn);
        }
    };

    if (isComplete) {
        return (
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <Shield className="w-6 h-6 text-black" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-black font-poppins">Verification Complete</h4>
                        <p className="text-sm text-gray-600 mt-1 font-poppins">
                            Your verification information has been securely submitted.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                    <h4 className="font-semibold text-black font-poppins">Verification Information</h4>
                    <p className="text-sm text-gray-500 mt-1 font-poppins">
                        Provide your business EIN and owner SSN to complete verification
                    </p>
                </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700 font-poppins">
                    <strong>🔒 Your data is secure:</strong> All sensitive information is encrypted and transmitted securely. We use bank-level security to protect your data.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                        Business EIN
                    </label>
                    <input
                        type="text"
                        value={ein}
                        onChange={handleEINChange}
                        placeholder="XX-XXXXXXX"
                        maxLength={10}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-all font-poppins"
                        required
                    />
                    <p className="text-xs text-gray-500 mt-1 font-poppins">
                        Enter your 9-digit Employer Identification Number
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                        Owner Social Security Number
                    </label>
                    <div className="relative">
                        <input
                            type={showSSN ? "text" : "password"}
                            value={ssn}
                            onChange={handleSSNChange}
                            placeholder="XXX-XX-XXXX"
                            maxLength={11}
                            className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-all font-poppins"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowSSN(!showSSN)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
                        >
                            {showSSN ? (
                                <EyeOff className="w-5 h-5 text-gray-400" />
                            ) : (
                                <Eye className="w-5 h-5 text-gray-400" />
                            )}
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 font-poppins">
                        Enter your 9-digit Social Security Number
                    </p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={ein.length !== 10 || ssn.length !== 11}
                    className="w-full px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-poppins"
                >
                    Submit Verification
                </motion.button>
            </form>
        </div>
    );
}
