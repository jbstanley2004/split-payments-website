"use client";

import { ApplicationStatus, DocumentType } from "@/types/portal";
import { motion } from "framer-motion";
import { FileText, Check, Shield, Lock } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface BusinessProfileViewProps {
    applicationStatus: ApplicationStatus;
    onDocumentUpload: (type: DocumentType, file: File) => void;
    onDocumentRemove: (id: string) => void;
    onVerificationSubmit: (ein: string, ssn: string) => void;
}

export default function BusinessProfileView({
    applicationStatus,
    onDocumentUpload,
    onVerificationSubmit
}: BusinessProfileViewProps) {

    // Helper for document rows
    const DocumentCard = ({
        title,
        description,
        type,
        isUploaded
    }: {
        title: string;
        description: string;
        type: DocumentType;
        isUploaded: boolean;
    }) => {
        const onDrop = useCallback((acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
                onDocumentUpload(type, acceptedFiles[0]);
            }
        }, [type]);

        const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop,
            accept: { 'image/*': [], 'application/pdf': [] },
            maxFiles: 1,
            disabled: isUploaded
        });

        return (
            <div
                {...getRootProps()}
                className={`group relative bg-white rounded-3xl p-8 border transition-all duration-300 cursor-pointer overflow-hidden ${isUploaded
                    ? "border-green-100 shadow-sm"
                    : isDragActive
                        ? "border-[#FF4306] shadow-lg scale-[1.02]"
                        : "border-black/5 hover:border-black/10 hover:shadow-md"
                    }`}
            >
                <input {...getInputProps()} />

                <div className="flex items-start justify-between relative z-10">
                    <div className="flex items-start gap-6">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${isUploaded ? "bg-green-50 text-green-600" : "bg-black/5 text-black/40 group-hover:bg-black/10 group-hover:text-black"
                            }`}>
                            {isUploaded ? <Check className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                        </div>
                        <div>
                            <h4 className={`text-lg font-bold font-poppins mb-1 ${isUploaded ? "text-black" : "text-black"}`}>
                                {title}
                            </h4>
                            <p className="text-black/50 font-lora max-w-sm leading-relaxed">
                                {description}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center">
                        {!isUploaded ? (
                            <span className="text-sm font-bold text-black border-b-2 border-black/10 group-hover:border-[#FF4306] transition-colors pb-0.5 font-poppins">
                                Upload
                            </span>
                        ) : (
                            <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full font-poppins">
                                Verified
                            </span>
                        )}
                    </div>
                </div>

                {/* Hover Gradient */}
                {!isUploaded && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/[0.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                )}
            </div>
        );
    };

    return (
        <div className="max-w-3xl mx-auto pb-20">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h2 className="text-4xl font-bold font-poppins mb-4 text-black">Business Dossier</h2>
                <p className="text-xl text-black/50 font-lora">Securely manage your business credentials.</p>
            </motion.div>

            <div className="space-y-12">
                {/* Business Identity Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="space-y-6"
                >
                    <div className="flex items-center gap-3 mb-6 px-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                        <h3 className="text-sm font-bold text-black/40 uppercase tracking-widest font-poppins">
                            Business Identity
                        </h3>
                    </div>

                    <div className="bg-white rounded-3xl border border-black/5 p-8 shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Legal / Corporate Name</label>
                                <input
                                    type="text"
                                    defaultValue={applicationStatus.businessInfo.businessName}
                                    className="w-full bg-[#F6F5F4] border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                                    placeholder="e.g. Acme Holdings LLC"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">DBA (Doing Business As)</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#F6F5F4] border-transparent placeholder-[#FF4306] rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                                    placeholder="e.g. Acme Shop"
                                />
                                <p className="text-xs text-orange-600 mt-1 font-medium">Required for funding</p>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Entity Type</label>
                                <select
                                    className="w-full bg-[#F6F5F4] border-transparent text-[#FF4306] rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all appearance-none"
                                >
                                    <option value="" className="text-[#FF4306]">Select Type...</option>
                                    <option value="LLC">LLC</option>
                                    <option value="C-Corp">C Corporation</option>
                                    <option value="S-Corp">S Corporation</option>
                                    <option value="Sole Prop">Sole Proprietorship</option>
                                    <option value="Partnership">General Partnership</option>
                                </select>
                                <p className="text-xs text-orange-600 mt-1 font-medium">Required for funding</p>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Industry</label>
                                <input
                                    type="text"
                                    defaultValue={applicationStatus.businessInfo.industry}
                                    className={`w-full border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all ${!applicationStatus.businessInfo.industry ? "bg-orange-50 border-orange-200 text-orange-900 placeholder-orange-300" : "bg-[#F6F5F4]"
                                        }`}
                                    placeholder="e.g. Retail"
                                />
                                {!applicationStatus.businessInfo.industry && (
                                    <p className="text-xs text-orange-600 mt-1 font-medium">Required for funding</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Business Start Date</label>
                                <input
                                    type="date"
                                    className="w-full bg-[#F6F5F4] border-transparent placeholder-[#FF4306] rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                                    placeholder="mm/dd/yyyy"
                                />
                                <p className="text-xs text-orange-600 mt-1 font-medium">Required for funding</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Contact & Location Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.075 }}
                    className="space-y-6"
                >
                    <div className="flex items-center gap-3 mb-6 px-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                        <h3 className="text-sm font-bold text-black/40 uppercase tracking-widest font-poppins">
                            Contact & Location
                        </h3>
                    </div>

                    <div className="bg-white rounded-3xl border border-black/5 p-8 shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Physical Business Address</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#F6F5F4] border-transparent placeholder-[#FF4306] rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all mb-4"
                                    placeholder="Street Address"
                                />
                                <input
                                    type="text"
                                    className="w-full bg-[#F6F5F4] border-transparent placeholder-[#FF4306] rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                                    placeholder="City, State, Zip"
                                />
                                <p className="text-xs text-orange-600 mt-1 font-medium">Required for funding</p>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Business Phone</label>
                                <input
                                    type="tel"
                                    defaultValue={applicationStatus.businessInfo.phone || ''}
                                    className="w-full bg-[#F6F5F4] border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                                    placeholder="(555) 555-5555"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Email</label>
                                <input
                                    type="email"
                                    defaultValue={applicationStatus.businessInfo.email}
                                    className="w-full bg-[#F6F5F4] border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                                    placeholder="name@company.com"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Website (Optional)</label>
                                <input
                                    type="url"
                                    className="w-full bg-[#F6F5F4] border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                                    placeholder="www.yourbusiness.com"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Financial Information Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-6"
                >
                    <div className="flex items-center gap-3 mb-6 px-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                        <h3 className="text-sm font-bold text-black/40 uppercase tracking-widest font-poppins">
                            Financial Information
                        </h3>
                    </div>

                    <div className="bg-white rounded-3xl border border-black/5 p-8 shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Monthly Processing Volume</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-3 text-black/40">$</span>
                                    <input
                                        type="text"
                                        defaultValue={applicationStatus.businessInfo.monthlyRevenue || ''}
                                        className={`w-full border-transparent rounded-xl pl-8 pr-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all ${!applicationStatus.businessInfo.monthlyRevenue ? "bg-orange-50 border-orange-200 text-orange-900 placeholder-orange-300" : "bg-[#F6F5F4]"
                                            }`}
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Years in Business</label>
                                <input
                                    type="number"
                                    defaultValue={applicationStatus.businessInfo.yearsInBusiness || ''}
                                    className={`w-full border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all ${!applicationStatus.businessInfo.yearsInBusiness ? "bg-orange-50 border-orange-200 text-orange-900 placeholder-orange-300" : "bg-[#F6F5F4]"
                                        }`}
                                    placeholder="0"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Description of Product/Service</label>
                                <textarea
                                    className="w-full bg-[#F6F5F4] border-transparent placeholder-[#FF4306] rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all resize-none h-32"
                                    placeholder="What do you sell or offer?"
                                />
                                <p className="text-xs text-orange-600 mt-1 font-medium">Required for funding</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Owner Information Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.125 }}
                    className="space-y-6"
                >
                    <div className="flex items-center gap-3 mb-6 px-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                        <h3 className="text-sm font-bold text-black/40 uppercase tracking-widest font-poppins">
                            Owner Information
                        </h3>
                    </div>

                    <div className="bg-white rounded-3xl border border-black/5 p-8 shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Owner Full Name</label>
                                <input
                                    type="text"
                                    defaultValue={applicationStatus.businessInfo.ownerName || ''}
                                    className="w-full bg-[#F6F5F4] border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Title / Role</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#F6F5F4] border-transparent placeholder-[#FF4306] rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                                    placeholder="CEO, Owner, etc."
                                />
                                <p className="text-xs text-orange-600 mt-1 font-medium">Required for funding</p>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Cell Phone</label>
                                <input
                                    type="tel"
                                    defaultValue={applicationStatus.businessInfo.phone || ''}
                                    className="w-full bg-[#F6F5F4] border-transparent placeholder-[#FF4306] rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                                    placeholder="(555) 555-5555"
                                />
                                <p className="text-xs text-orange-600 mt-1 font-medium">Required for funding</p>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Owner's Home Address</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#F6F5F4] border-transparent placeholder-[#FF4306] rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all mb-4"
                                    placeholder="Street Address"
                                />
                                <input
                                    type="text"
                                    className="w-full bg-[#F6F5F4] border-transparent placeholder-[#FF4306] rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                                    placeholder="City, State, Zip"
                                />
                                <p className="text-xs text-orange-600 mt-1 font-medium">Required for funding</p>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end">
                            <button className="px-8 py-3 bg-black text-white rounded-full font-bold text-base hover:bg-gray-800 transition-colors">
                                Save All Changes
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Documents Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-6"
                >
                    <div className="flex items-center gap-3 mb-6 px-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                        <h3 className="text-sm font-bold text-black/40 uppercase tracking-widest font-poppins">
                            Required Documents
                        </h3>
                    </div>

                    <div className="grid gap-4">
                        <DocumentCard
                            title="Merchant Statements"
                            description="Upload your last 3 months of processing statements."
                            type="merchant_statements"
                            isUploaded={applicationStatus.documents.some(d => d.type === 'merchant_statements')}
                        />
                        <DocumentCard
                            title="Photo ID"
                            description="A clear photo of your driver's license or passport."
                            type="photo_id"
                            isUploaded={applicationStatus.documents.some(d => d.type === 'photo_id')}
                        />
                        <DocumentCard
                            title="Voided Check"
                            description="To verify your business bank account details."
                            type="voided_check"
                            isUploaded={applicationStatus.documents.some(d => d.type === 'voided_check')}
                        />
                    </div>
                </motion.div>

                {/* Verification Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                >
                    <div className="flex items-center gap-3 mb-6 px-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                        <h3 className="text-sm font-bold text-black/40 uppercase tracking-widest font-poppins">
                            Identity Verification
                        </h3>
                    </div>

                    <div className="bg-white rounded-3xl border border-black/5 p-8 shadow-sm relative overflow-hidden">
                        <div className="flex items-start gap-6 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center flex-shrink-0">
                                <Shield className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold font-poppins mb-1">Secure Identity Check</h4>
                                <p className="text-black/50 font-lora max-w-md leading-relaxed">
                                    Your information is encrypted with bank-grade security (AES-256).
                                </p>
                            </div>
                        </div>

                        {!applicationStatus.verificationInfo.completed ? (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const formData = new FormData(e.currentTarget);
                                    onVerificationSubmit(
                                        formData.get('ein') as string,
                                        formData.get('ssn') as string
                                    );
                                }}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-black/60 uppercase tracking-wider font-poppins">Business EIN</label>
                                        <div className="relative">
                                            <input
                                                name="ein"
                                                type="text"
                                                placeholder="XX-XXXXXXX"
                                                className="w-full px-5 py-4 rounded-xl bg-[#F6F5F4] border-transparent focus:bg-white focus:border-black/10 focus:ring-0 transition-all font-poppins text-base"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-black/60 uppercase tracking-wider font-poppins">Owner SSN</label>
                                        <div className="relative">
                                            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
                                            <input
                                                name="ssn"
                                                type="password"
                                                placeholder="XXX-XX-XXXX"
                                                className="w-full px-5 py-4 rounded-xl bg-[#F6F5F4] border-transparent focus:bg-white focus:border-black/10 focus:ring-0 transition-all font-poppins text-base"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-black/90 transition-colors font-poppins text-base mt-2"
                                >
                                    Verify Identity
                                </button>
                            </form>
                        ) : (
                            <div className="flex items-center gap-3 text-green-600 bg-green-50 px-6 py-4 rounded-2xl">
                                <Check className="w-5 h-5" />
                                <span className="font-bold font-poppins">Verification Complete</span>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
