
import React, { useState } from 'react';
import { authService } from '../../lib/authService';
import { User } from '../../types/funding-types';

interface AuthFlowProps {
    onComplete: (user: User) => void;
}

export const AuthFlow: React.FC<AuthFlowProps> = ({ onComplete }) => {
    const [step, setStep] = useState<'details' | 'verify'>('details');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleRequestCode = async () => {
        if (!name || !email) {
            setError("Please fill in all fields.");
            return;
        }
        setError('');
        setIsLoading(true);
        try {
            // In a real app, we wouldn't get the code back here.
            // For this prototype, we get it to auto-fill for a smoother demo experience.
            const demoCode = await authService.requestVerificationCode(email, name);
            setCode(demoCode);
            setStep('verify');
        } catch (e) {
            setError("Failed to send code. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerify = async () => {
        if (code.length < 6) return;
        setError('');
        setIsLoading(true);
        try {
            const user = await authService.verifyCode(email, code);
            if (user) {
                // Inject the provided name into the user object since backend might default it
                onComplete({ ...user, name });
            } else {
                setError("Invalid verification code.");
            }
        } catch (e) {
            setError("Verification failed.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md bg-white rounded-[24px] border border-gray-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 mb-6">
            <div className="bg-black px-8 py-6">
                <h3 className="text-white text-lg font-bold tracking-wide">
                    {step === 'details' ? 'Secure Account Setup' : 'Verify Your Email'}
                </h3>
                <p className="text-white/60 text-sm mt-1">
                    {step === 'details'
                        ? 'Create a secure ID to save your application progress.'
                        : `We sent a 6-digit code to ${email}`}
                </p>
            </div>

            <div className="p-8 bg-white">
                {step === 'details' ? (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                placeholder="Jane Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Business Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                placeholder="jane@business.com"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button
                            onClick={handleRequestCode}
                            disabled={isLoading}
                            className="w-full bg-black text-white py-3 rounded-full font-bold text-sm mt-2 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                        >
                            {isLoading ? 'Sending...' : 'Continue'}
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Verification Code</label>
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-center text-2xl tracking-[0.5em] font-mono focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                placeholder="000000"
                            />
                            <p className="text-center text-xs text-green-600 mt-2 animate-in fade-in slide-in-from-top-1">
                                Code auto-filled for demo
                            </p>
                        </div>
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setStep('details')}
                                className="flex-1 bg-gray-100 text-black py-3 rounded-full font-bold text-sm hover:bg-gray-200 transition-all"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleVerify}
                                disabled={isLoading || code.length !== 6}
                                className="flex-[2] bg-black text-white py-3 rounded-full font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                            >
                                {isLoading ? 'Verifying...' : 'Verify & Start'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
