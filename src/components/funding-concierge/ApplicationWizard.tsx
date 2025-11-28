
import React, { useState, useRef, useEffect } from 'react';
import { ApplicationData } from '../../types/funding-types';
import { authService } from '../../lib/authService';

interface ApplicationWizardProps {
    onSubmit: (data: ApplicationData) => void;
    initialData?: Partial<ApplicationData>;
    onToggleInput: (visible: boolean) => void;
}

const STEPS = [
    "Business Identity",
    "Contact & Location",
    "Financials",
    "Owner Info",
    "Authorization"
];

export const ApplicationWizard: React.FC<ApplicationWizardProps> = ({ onSubmit, initialData, onToggleInput }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState<ApplicationData>({
        legalName: '', dba: '', address: '', cityStateZip: '', phone: '', email: '',
        ein: '', startDate: '', website: '', entityType: '', businessType: '', productSold: '',
        processingCompany: '', monthlyVolume: '', outstandingBalance: '', requestedAmount: '',
        ownerName: '', ownershipPercentage: '', homeAddress: '', ownerCityStateZip: '',
        ssn: '', dob: '', cellPhone: '', authorized: false,
        ...initialData // Merge extracted data
    });

    // Hide input on mount to focus user, show on unmount
    useEffect(() => {
        onToggleInput(true); // Hide input (true = hidden)
        return () => onToggleInput(false); // Show input when wizard goes away
    }, []);

    // Update formData if initialData changes
    useEffect(() => {
        if (initialData) {
            setFormData(prev => ({ ...prev, ...initialData }));
        }
    }, [initialData]);

    const handleChange = (field: keyof ApplicationData, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handlePauseToggle = () => {
        const newPausedState = !isPaused;
        setIsPaused(newPausedState);
        // If paused, show input (false to hide). If active, hide input (true to hide).
        onToggleInput(!newPausedState);
    };

    const nextStep = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
            if (scrollRef.current) scrollRef.current.scrollTop = 0;
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleSubmit = () => {
        onToggleInput(false); // Ensure input returns after submit
        onSubmit(formData);
    };

    const handleSave = async () => {
        const userId = 'current_session_user';
        await authService.saveProgress(userId, formData);
        alert("Progress saved securely.");
    };

    const getAnimationClass = () => {
        return "animate-in fade-in slide-in-from-bottom-4 duration-500";
    };

    const actionButtonClass = "px-8 py-3 rounded-full font-medium text-[15px] tracking-wide transition-all duration-300 border border-black bg-transparent text-black hover:bg-black hover:text-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-black";
    const backButtonClass = "px-6 py-3 rounded-full font-medium text-[15px] tracking-wide transition-all duration-300 text-gray-500 hover:text-black";
    const saveButtonClass = "px-6 py-3 rounded-full font-medium text-[15px] tracking-wide transition-all duration-300 text-gray-400 hover:text-black flex items-center gap-2 mr-2";

    return (
        <div className={`w-full max-w-2xl bg-white rounded-[32px] shadow-2xl border border-gray-200 overflow-hidden flex flex-col my-6 relative transition-opacity duration-300 ${isPaused ? 'opacity-60 hover:opacity-100' : 'opacity-100'}`}>

            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-gray-100">
                <div
                    className="h-full bg-black transition-all duration-500 ease-out"
                    style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                />
            </div>

            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-gray-50 flex justify-between items-center bg-white z-10">
                <div className="flex items-center gap-4">
                    {/* Pause Button */}
                    <button
                        onClick={handlePauseToggle}
                        className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors shadow-md group"
                        title={isPaused ? "Resume Application" : "Pause to Chat"}
                    >
                        {isPaused ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-0.5">
                                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
                            </svg>
                        )}
                    </button>
                    <h2 className="text-xl font-bold text-gray-900">{STEPS[currentStep]}</h2>
                </div>
                <div className="text-sm font-medium text-gray-400">
                    Step {currentStep + 1} / {STEPS.length}
                </div>
            </div>

            {/* Form Content */}
            <div ref={scrollRef} className="p-8 overflow-y-auto max-h-[60vh] min-h-[300px] bg-[#FAFAFA]">

                {/* Step 1: Business Identity */}
                {currentStep === 0 && (
                    <div className={`space-y-6 ${getAnimationClass()}`}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Legal / Corporate Name</label>
                                <input
                                    type="text"
                                    value={formData.legalName}
                                    onChange={(e) => handleChange('legalName', e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all placeholder-gray-300"
                                    placeholder="e.g. Acme Holdings LLC"
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">DBA (Doing Business As)</label>
                                <input
                                    type="text"
                                    value={formData.dba}
                                    onChange={(e) => handleChange('dba', e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                    placeholder="e.g. Acme Shop"
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">EIN #</label>
                                <input
                                    type="text"
                                    value={formData.ein}
                                    onChange={(e) => handleChange('ein', e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                    placeholder="XX-XXXXXXX"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Entity Type</label>
                                <select
                                    value={formData.entityType}
                                    onChange={(e) => handleChange('entityType', e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-black focus:border-transparent outline-none appearance-none"
                                >
                                    <option value="">Select Type...</option>
                                    <option value="LLC">LLC</option>
                                    <option value="C-Corp">C Corporation</option>
                                    <option value="S-Corp">S Corporation</option>
                                    <option value="Sole Prop">Sole Proprietorship</option>
                                    <option value="Partnership">General Partnership</option>
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Description of Product/Service</label>
                                <textarea
                                    value={formData.productSold}
                                    onChange={(e) => handleChange('productSold', e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-black focus:border-transparent outline-none resize-none h-24"
                                    placeholder="What do you sell?"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Contact */}
                {currentStep === 1 && (
                    <div className={`space-y-6 ${getAnimationClass()}`}>
                        <div className="col-span-2">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Physical Business Address</label>
                            <input
                                type="text"
                                value={formData.address}
                                onChange={(e) => handleChange('address', e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none mb-4"
                                placeholder="Street Address"
                            />
                            <input
                                type="text"
                                value={formData.cityStateZip}
                                onChange={(e) => handleChange('cityStateZip', e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                placeholder="City, State, Zip"
                            />
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Business Phone</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                    placeholder="(555) 555-5555"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                    placeholder="name@company.com"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Website (Optional)</label>
                            <input
                                type="url"
                                value={formData.website}
                                onChange={(e) => handleChange('website', e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                placeholder="www.yourbusiness.com"
                            />
                        </div>
                    </div>
                )}

                {/* Step 3: Financials */}
                {currentStep === 2 && (
                    <div className={`space-y-6 ${getAnimationClass()}`}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Business Start Date</label>
                                <input
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) => handleChange('startDate', e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Monthly Processing Volume</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-3 text-gray-400">$</span>
                                    <input
                                        type="text"
                                        value={formData.monthlyVolume}
                                        onChange={(e) => handleChange('monthlyVolume', e.target.value)}
                                        className="w-full bg-white border border-gray-200 rounded-xl pl-8 pr-4 py-3 text-base focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Funding Requested</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-3 text-gray-400">$</span>
                                    <input
                                        type="text"
                                        value={formData.requestedAmount}
                                        onChange={(e) => handleChange('requestedAmount', e.target.value)}
                                        className="w-full bg-white border border-gray-200 rounded-xl pl-8 pr-4 py-3 text-base focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Current Processing Company</label>
                                <input
                                    type="text"
                                    value={formData.processingCompany}
                                    onChange={(e) => handleChange('processingCompany', e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                    placeholder="e.g. Stripe, Square, First Data"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Outstanding Balance (if any)</label>
                                <input
                                    type="text"
                                    value={formData.outstandingBalance}
                                    onChange={(e) => handleChange('outstandingBalance', e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                    placeholder="Leave blank if none"
                                />
                                <p className="text-xs text-gray-400 mt-1">*Does not disqualify you.</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4: Owner Info */}
                {currentStep === 3 && (
                    <div className={`space-y-6 ${getAnimationClass()}`}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Owner Full Name & Title</label>
                                <input
                                    type="text"
                                    value={formData.ownerName}
                                    onChange={(e) => handleChange('ownerName', e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                    placeholder="John Doe, CEO"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">% Ownership</label>
                                <input
                                    type="text"
                                    value={formData.ownershipPercentage}
                                    onChange={(e) => handleChange('ownershipPercentage', e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                    placeholder="50%"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Cell Phone</label>
                                <input
                                    type="tel"
                                    value={formData.cellPhone}
                                    onChange={(e) => handleChange('cellPhone', e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                    placeholder="(555) 555-5555"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Home Address</label>
                                <input
                                    type="text"
                                    value={formData.homeAddress}
                                    onChange={(e) => handleChange('homeAddress', e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-black focus:border-transparent outline-none mb-4"
                                    placeholder="Street Address"
                                />
                                <input
                                    type="text"
                                    value={formData.ownerCityStateZip}
                                    onChange={(e) => handleChange('ownerCityStateZip', e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                    placeholder="City, State, Zip"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">SSN #</label>
                                <input
                                    type="password"
                                    value={formData.ssn}
                                    onChange={(e) => handleChange('ssn', e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                    placeholder="***-**-****"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Date of Birth</label>
                                <input
                                    type="date"
                                    value={formData.dob}
                                    onChange={(e) => handleChange('dob', e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 5: Authorization */}
                {currentStep === 4 && (
                    <div className={`space-y-6 ${getAnimationClass()}`}>
                        <div className="bg-white border border-gray-200 rounded-xl p-6 h-64 overflow-y-auto text-sm text-gray-600 leading-relaxed">
                            <p className="font-bold text-black mb-2">Authorization Agreement</p>
                            <p>The Merchant and Owner(s)/Officer(s)/Partner(s) (individually, an "Applicant") identified on this application, each represents, acknowledges, and agrees that:</p>
                            <ol className="list-decimal pl-4 space-y-2 mt-2">
                                <li>All information and documents provided to <strong>Split LLC</strong>, including but not limited to credit card processor statements, bank statements, ID, IRS documentation, etc., are true, accurate, and complete.</li>
                                <li>Applicant will immediately notify <strong>Split LLC</strong> of any change in such information and any change in financial condition.</li>
                                <li>Applicant authorizes <strong>Split LLC</strong> to disclose all information and documents that <strong>Split LLC</strong> may obtain, including credit reports to other persons or entities (collectively, "Assignees") that may be involved with or acquire commercial funds, having daily repayment features or purchase of future receivables with a Merchant Cash Advance, including without limitation the application therefor (collectively, "Transactions") and each Assignee is authorized to use such information and documents, and share such information and documents with other Assignees, in connection with potential Transactions.</li>
                                <li>Each Assignee will rely upon the accuracy and completion of such information and documents.</li>
                                <li><strong>Split LLC</strong>, Assignees, and each of their representatives, successors, assigns, and designees (collectively, "Recipients") are authorized to request and receive investigative reports, credit reports, statements from creditors, and financial institutions, also, verification of information, or any other information that a recipient deems necessary.</li>
                                <li>Applicant waives and releases any claims against Recipients and any information providers arising from any act or omission relating to the requesting, receiving, or release of information.</li>
                                <li>Each Owner/Officer/Partner represents that he or she is authorized to sign this application on behalf of Merchant.</li>
                                <li>By providing your phone number, you consent to receive marketing calls and texts from <strong>Split LLC</strong> or Assignees or Recipients at the number you provided. These calls may be made using an automatic telephone dialing system or an artificial or prerecorded voice. Your consent is not a condition of any financing options. You have the right to revoke this consent at any time. To opt-out, please reply 'STOP' to any message or contact us at hello@ccsplit.org.</li>
                            </ol>
                        </div>

                        <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 cursor-pointer" onClick={() => handleChange('authorized', !formData.authorized)}>
                            <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors ${formData.authorized ? 'bg-black border-black' : 'bg-white border-gray-300'}`}>
                                {formData.authorized && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                )}
                            </div>
                            <span className="text-sm font-medium text-gray-900 select-none">I have read and agree to the Authorization terms above.</span>
                        </div>
                    </div>
                )}

            </div>

            {/* Footer Actions */}
            <div className="p-6 bg-white border-t border-gray-100 flex justify-between items-center z-10">
                <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className={`${backButtonClass} ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                >
                    Back
                </button>

                <div className="flex items-center gap-4">
                    <button onClick={handleSave} className={saveButtonClass}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                        Save
                    </button>

                    <button
                        onClick={currentStep === STEPS.length - 1 ? handleSubmit : nextStep}
                        disabled={currentStep === STEPS.length - 1 && !formData.authorized}
                        className={`${actionButtonClass} ${(currentStep === STEPS.length - 1 && !formData.authorized)
                                ? 'opacity-50 cursor-not-allowed hover:bg-transparent hover:text-black'
                                : ''
                            }`}
                    >
                        {currentStep === STEPS.length - 1 ? 'Sign & Submit' : 'Next Step'}
                    </button>
                </div>
            </div>
        </div>
    );
};
