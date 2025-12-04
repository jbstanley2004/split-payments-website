"use client";

import { ApplicationStatus, DocumentType } from "@/types/portal";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Check, Shield, Lock, LogOut, Camera, Upload, X, ChevronDown, CheckCircle2 } from "lucide-react";
import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { auth } from "@/lib/firebase";

interface BusinessProfileViewProps {
    applicationStatus: ApplicationStatus;
    onDocumentUpload: (type: DocumentType, file: File) => void;
    onDocumentRemove: (id: string) => void;
    onVerificationSubmit: (ein: string, ssn: string) => void;
    onUpdateProfile: (updates: Partial<ApplicationStatus>) => void;
    targetSection: string | null;
}

// Helper to safely format date from Firestore Timestamp or Date
const formatDate = (date: any) => {
    if (!date) return '';
    // Handle Firestore Timestamp
    if (date.seconds) {
        return new Date(date.seconds * 1000).toLocaleDateString();
    }
    // Handle JS Date or string
    return new Date(date).toLocaleDateString();
};

export default function BusinessProfileView({
    applicationStatus,
    onDocumentUpload,
    onDocumentRemove,
    onVerificationSubmit,
    onUpdateProfile,
    targetSection
}: BusinessProfileViewProps) {
    const { documents, businessInfo, contactInfo, ownerInfo, equipmentInfo } = applicationStatus;

    // Local state for form fields
    const [localBusinessInfo, setLocalBusinessInfo] = useState(businessInfo);
    const [localContactInfo, setLocalContactInfo] = useState(contactInfo || {});
    const [localOwnerInfo, setLocalOwnerInfo] = useState(ownerInfo || {});
    const [localEquipmentInfo, setLocalEquipmentInfo] = useState(equipmentInfo || {});

    // Sync local state when props change
    useEffect(() => {
        setLocalBusinessInfo(businessInfo);
        setLocalContactInfo(contactInfo || {});
        setLocalOwnerInfo(ownerInfo || {});
        setLocalEquipmentInfo(equipmentInfo || {});
    }, [businessInfo, contactInfo, ownerInfo, equipmentInfo]);

    // Handle deep linking / scrolling and initial collapse state
    useEffect(() => {
        // Calculate initial collapsed state for ALL sections based on completion
        // Default: Completed = Collapsed (true), Incomplete = Expanded (false)
        const newCollapsedState: Record<string, boolean> = {
            'business-identity': isSectionComplete('business-identity'),
            'contact-location': isSectionComplete('contact-location'),
            'financial-information': isSectionComplete('financial-information'),
            'equipment-information': isSectionComplete('equipment-information'),
            'owner-information': isSectionComplete('owner-information')
        };

        if (targetSection) {
            // Ensure target section is OPEN (false)
            newCollapsedState[targetSection] = false;

            // Scroll to it
            setTimeout(() => {
                const element = document.getElementById(targetSection);
                if (element) {
                    const yOffset = -100;
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 300);
        }

        setCollapsedSections(newCollapsedState);
    }, [targetSection, documents, businessInfo, contactInfo, ownerInfo, equipmentInfo]); // Re-run when data changes to keep state in sync

    // Collapse state for each section
    const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

    const handleSaveSection = (sectionId: string) => {
        // Construct the update object based on the section
        let updates: Partial<ApplicationStatus> = {};

        switch (sectionId) {
            case 'business-identity':
                updates = { businessInfo: localBusinessInfo };
                break;
            case 'contact-location':
                updates = { contactInfo: localContactInfo as any };
                break;
            case 'financial-information':
                // Financial info is part of businessInfo in the current structure
                updates = { businessInfo: localBusinessInfo };
                break;
            case 'equipment-information':
                updates = { equipmentInfo: localEquipmentInfo as any };
                break;
            case 'owner-information':
                updates = { ownerInfo: localOwnerInfo as any };
                break;
        }

        onUpdateProfile(updates);
        setCollapsedSections(prev => ({ ...prev, [sectionId]: true }));
    };

    // Helper for input changes
    const updateBusinessField = (field: string, value: any) => {
        setLocalBusinessInfo(prev => ({ ...prev, [field]: value }));
    };

    const updateContactField = (field: string, value: any) => {
        setLocalContactInfo(prev => ({ ...prev, [field]: value }));
    };

    const updateOwnerField = (field: string, value: any) => {
        setLocalOwnerInfo(prev => ({ ...prev, [field]: value }));
    };

    const updateEquipmentField = (field: string, value: any) => {
        setLocalEquipmentInfo(prev => ({ ...prev, [field]: value }));
    };

    // Helper for document rows
    const DocumentCard = ({
        title,
        description,
        type,
        isUploaded,
        documents = []
    }: {
        title: string;
        description: string;
        type: DocumentType;
        isUploaded: boolean;
        documents?: any[];
    }) => {
        const onDrop = useCallback((acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
                // Handle multiple files for all types
                acceptedFiles.forEach(file => onDocumentUpload(type, file));
            }
        }, [type]);

        const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop,
            accept: { 'image/*': [], 'application/pdf': [] },
            maxFiles: 0, // Allow multiple files for all types
            disabled: false // Never disable, always allow adding more
        });

        const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
                onDocumentUpload(type, e.target.files[0]);
            }
        };

        return (
            <div className="space-y-4">
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
                                </h4 >
                                <p className="text-black/50 font-lora max-w-sm leading-relaxed">
                                    {description}
                                </p>
                                <div className="mt-4 flex gap-3">
                                    <label
                                        htmlFor={`camera-${type}`}
                                        className="cursor-pointer px-4 py-2 bg-black text-white rounded-full text-xs font-bold font-poppins hover:bg-gray-800 transition-colors flex items-center gap-2"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Camera className="w-3 h-3" />
                                        Use Camera
                                    </label>
                                    <input
                                        id={`camera-${type}`}
                                        type="file"
                                        accept="image/*"
                                        capture="environment"
                                        className="hidden"
                                        onChange={handleCameraCapture}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                    <div className="px-4 py-2 bg-gray-100 text-black rounded-full text-xs font-bold font-poppins flex items-center gap-2">
                                        <Upload className="w-3 h-3" />
                                        Upload File
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center">
                            {!isUploaded ? (
                                <span className="text-sm font-bold text-black border-b-2 border-black/10 group-hover:border-[#FF4306] transition-colors pb-0.5 font-poppins">
                                    Upload Files
                                </span>
                            ) : (
                                <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full font-poppins">
                                    Add More
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Hover Gradient */}
                    {!isUploaded && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/[0.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    )}

                </div>

                {/* File List for All Types */}
                {documents.length > 0 && (
                    <div className="grid grid-cols-1 gap-3 pl-20">
                        {documents.map((doc, index) => (
                            <motion.div
                                key={doc.id || index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center justify-between bg-white p-4 rounded-xl border border-black/5 shadow-sm"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
                                        <FileText className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-black font-poppins">{doc.filename || `Document ${index + 1}`}</p>
                                        <p className="text-xs text-black/40">{formatDate(doc.uploadedAt)}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => onDocumentRemove(doc.id)}
                                    className="p-2 hover:bg-red-50 text-black/20 hover:text-red-500 rounded-full transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    // Section completion checks (matching DashboardView logic but using LOCAL state for instant feedback)
    const isSectionComplete = (sectionId: string): boolean => {
        switch (sectionId) {
            case 'business-identity':
                const hasVoidedCheck = documents.some(d => d.type === 'voided_check');
                return !!localBusinessInfo.dba && !!localBusinessInfo.entityType && !!localBusinessInfo.industry && !!localBusinessInfo.businessStartDate && !!localBusinessInfo.ein && hasVoidedCheck;

            case 'contact-location':
                return !!localContactInfo?.physicalAddress && !!localContactInfo?.businessPhone && !!localContactInfo?.email;

            case 'financial-information':
                const hasMerchantStatements = documents.some(d => d.type === 'merchant_statements');
                return hasMerchantStatements && !!localBusinessInfo.monthlyRevenue && !!localBusinessInfo.annualRevenue && !!localBusinessInfo.highTicketAmount && !!localBusinessInfo.averageTicketSize && !!localBusinessInfo.productServiceDescription;

            case 'equipment-information':
                const hasEquipmentPhotos = documents.some(d => d.type === 'equipment_photo');
                return hasEquipmentPhotos && !!localEquipmentInfo?.make && !!localEquipmentInfo?.model &&
                    localEquipmentInfo?.cardPresentPercentage !== undefined && localEquipmentInfo?.cardNotPresentPercentage !== undefined &&
                    !!localEquipmentInfo?.equipmentTypes && localEquipmentInfo.equipmentTypes.length > 0;

            case 'owner-information':
                const hasPhotoId = documents.some(d => d.type === 'photo_id');
                return hasPhotoId && !!localOwnerInfo?.fullName && !!localOwnerInfo?.title && !!localOwnerInfo?.cellPhone && !!localOwnerInfo?.homeAddress && !!localOwnerInfo?.ssn;

            default:
                return false;
        }
    };

    const toggleSection = (sectionId: string) => {
        setCollapsedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    const renderSectionWrapper = (id: string, title: string, content: React.ReactNode) => (
        <div className="space-y-0">
            <div
                onClick={() => toggleSection(id)}
                className={`bg-white rounded-[40px] p-2 pl-8 shadow-2xl border border-gray-100 flex items-center justify-between transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] cursor-pointer group ${!collapsedSections[id] ? 'rounded-b-none border-b-0 shadow-none' : ''}`}
            >
                <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${isSectionComplete(id) ? 'bg-green-500' : 'bg-black/10'}`} />
                    <div>
                        <h3 className="text-xl font-bold text-black font-poppins leading-none mb-1">
                            {title}
                        </h3>
                        {isSectionComplete(id) && (
                            <p className="text-xs font-bold text-green-600 font-poppins uppercase tracking-wider">
                                Completed
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex-shrink-0 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:bg-gray-900 shadow-md">
                    <motion.div
                        animate={{ rotate: collapsedSections[id] ? 0 : 180 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ChevronDown className="w-6 h-6" />
                    </motion.div>
                </div>
            </div>

            <AnimatePresence>
                {!collapsedSections[id] && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                        className="bg-white rounded-b-[40px] border-x border-b border-gray-100 shadow-2xl p-8 pt-0"
                    >
                        <div className="pt-4">
                            {content}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

    const renderBusinessIdentity = () => (
        <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                    <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Legal / Corporate Name</label>
                    <input
                        type="text"
                        value={localBusinessInfo.businessName || ''}
                        onChange={(e) => updateBusinessField('businessName', e.target.value)}
                        className="w-full bg-[#F6F5F4] border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                        placeholder="e.g. Acme Holdings LLC"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">DBA (Doing Business As)</label>
                    <input
                        type="text"
                        value={localBusinessInfo.dba || ''}
                        onChange={(e) => updateBusinessField('dba', e.target.value)}
                        className="w-full bg-[#F6F5F4] border-transparent placeholder-[#FF4306] rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                        placeholder="e.g. Acme Shop"
                    />
                    <p className="text-xs text-orange-600 mt-1 font-medium">Required for funding</p>
                </div>
                <div>
                    <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Entity Type</label>
                    <select
                        value={localBusinessInfo.entityType || ''}
                        onChange={(e) => updateBusinessField('entityType', e.target.value)}
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
                        value={localBusinessInfo.industry || ''}
                        onChange={(e) => updateBusinessField('industry', e.target.value)}
                        className={`w-full border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all ${!localBusinessInfo.industry ? "bg-orange-50 border-orange-200 text-orange-900 placeholder-orange-300" : "bg-[#F6F5F4]"
                            }`}
                        placeholder="e.g. Retail"
                    />
                    {!localBusinessInfo.industry && (
                        <p className="text-xs text-orange-600 mt-1 font-medium">Required for funding</p>
                    )}
                </div>
                <div>
                    <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Business Start Date</label>
                    <input
                        type="date"
                        value={localBusinessInfo.businessStartDate || ''}
                        onChange={(e) => updateBusinessField('businessStartDate', e.target.value)}
                        className="w-full bg-[#F6F5F4] border-transparent placeholder-[#FF4306] rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                        placeholder="mm/dd/yyyy"
                    />
                    <p className="text-xs text-orange-600 mt-1 font-medium">Required for funding</p>
                </div>
                <div>
                    <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">EIN (Employer ID Number)</label>
                    <input
                        type="text"
                        value={localBusinessInfo.ein || ''}
                        onChange={(e) => updateBusinessField('ein', e.target.value)}
                        className="w-full bg-[#F6F5F4] border-transparent placeholder-[#FF4306] rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                        placeholder="XX-XXXXXXX"
                    />
                    <p className="text-xs text-orange-600 mt-1 font-medium">Required for funding</p>
                </div>
                <div className="col-span-2 mt-4">
                    <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-4">Verification Document</label>
                    <DocumentCard
                        title="Voided Check"
                        description="To verify your business bank account details."
                        type="voided_check"
                        isUploaded={applicationStatus.documents.some(d => d.type === 'voided_check')}
                        documents={applicationStatus.documents.filter(d => d.type === 'voided_check')}
                    />
                </div>
            </div>
            <div className="mt-6 flex justify-end">
                <button
                    onClick={() => handleSaveSection('business-identity')}
                    className="px-6 py-2 bg-black text-white rounded-full font-bold text-sm hover:bg-gray-800 transition-colors"
                >
                    Save Section
                </button>
            </div>
        </div>
    );

    const renderContactLocation = () => (
        <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                    <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Physical Business Address</label>
                    <input
                        type="text"
                        value={localContactInfo.physicalAddress || ''}
                        onChange={(e) => updateContactField('physicalAddress', e.target.value)}
                        className="w-full bg-[#F6F5F4] border-transparent placeholder-[#FF4306] rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all mb-4"
                        placeholder="Street Address"
                    />
                    <input
                        type="text"
                        value={localContactInfo.cityStateZip || ''}
                        onChange={(e) => updateContactField('cityStateZip', e.target.value)}
                        className="w-full bg-[#F6F5F4] border-transparent placeholder-[#FF4306] rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                        placeholder="City, State, Zip"
                    />
                    <p className="text-xs text-orange-600 mt-1 font-medium">Required for funding</p>
                </div>
                <div>
                    <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Business Phone</label>
                    <input
                        type="tel"
                        value={localContactInfo.businessPhone || ''}
                        onChange={(e) => updateContactField('businessPhone', e.target.value)}
                        className="w-full bg-[#F6F5F4] border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                        placeholder="(555) 555-5555"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Email</label>
                    <input
                        type="email"
                        value={localContactInfo.email || ''}
                        onChange={(e) => updateContactField('email', e.target.value)}
                        className="w-full bg-[#F6F5F4] border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                        placeholder="name@company.com"
                    />
                </div>
                <div className="col-span-2">
                    <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Website (Optional)</label>
                    <input
                        type="url"
                        value={localContactInfo.website || ''}
                        onChange={(e) => updateContactField('website', e.target.value)}
                        className="w-full bg-[#F6F5F4] border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:bg focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                        placeholder="www.yourbusiness.com"
                    />
                </div>
            </div>
            <div className="mt-6 flex justify-end">
                <button
                    onClick={() => handleSaveSection('contact-location')}
                    className="px-6 py-2 bg-black text-white rounded-full font-bold text-sm hover:bg-gray-800 transition-colors"
                >
                    Save Section
                </button>
            </div>
        </div>
    );

    const renderFinancialInformation = () => (
        <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Monthly Processing Volume</label>
                    <div className="relative">
                        <span className="absolute left-4 top-3 text-black/40">$</span>
                        <input
                            type="text"
                            value={localBusinessInfo.monthlyRevenue || ''}
                            onChange={(e) => updateBusinessField('monthlyRevenue', e.target.value)}
                            className={`w-full border-transparent rounded-xl pl-8 pr-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all ${!localBusinessInfo.monthlyRevenue ? "bg-orange-50 border-orange-200 text-orange-900 placeholder-orange-300" : "bg-[#F6F5F4]"
                                }`}
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Annual Revenue</label>
                    <div className="relative">
                        <span className="absolute left-4 top-3 text-black/40">$</span>
                        <input
                            type="text"
                            value={localBusinessInfo.annualRevenue || ''}
                            onChange={(e) => updateBusinessField('annualRevenue', e.target.value)}
                            className="w-full bg-[#F6F5F4] border-transparent rounded-xl pl-8 pr-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                            placeholder="0.00"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">High Ticket Amount</label>
                    <div className="relative">
                        <span className="absolute left-4 top-3 text-black/40">$</span>
                        <input
                            type="text"
                            value={localBusinessInfo.highTicketAmount || ''}
                            onChange={(e) => updateBusinessField('highTicketAmount', e.target.value)}
                            className="w-full bg-[#F6F5F4] border-transparent rounded-xl pl-8 pr-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                            placeholder="0.00"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Average Ticket Size</label>
                    <div className="relative">
                        <span className="absolute left-4 top-3 text-black/40">$</span>
                        <input
                            type="text"
                            value={localBusinessInfo.averageTicketSize || ''}
                            onChange={(e) => updateBusinessField('averageTicketSize', e.target.value)}
                            className={`w-full border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all ${!localBusinessInfo.averageTicketSize ? "bg-orange-50 border-orange-200 text-orange-900 placeholder-orange-300" : "bg-[#F6F5F4]"
                                }`}
                            placeholder="0"
                        />
                    </div>
                </div>
                <div className="col-span-2">
                    <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Description of Product/Service</label>
                    <textarea
                        value={localBusinessInfo.productServiceDescription || ''}
                        onChange={(e) => updateBusinessField('productServiceDescription', e.target.value)}
                        className="w-full bg-[#F6F5F4] border-transparent placeholder-[#FF4306] rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all resize-none h-32"
                        placeholder="What do you sell or offer?"
                    />
                    <p className="text-xs text-orange-600 mt-1 font-medium">Required for funding</p>
                </div>
                <div className="col-span-2 mt-4">
                    <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-4">Verification Document</label>
                    <DocumentCard
                        title="Merchant Statements"
                        description="Upload your last 3 months of processing statements."
                        type="merchant_statements"
                        isUploaded={applicationStatus.documents.some(d => d.type === 'merchant_statements')}
                        documents={applicationStatus.documents.filter(d => d.type === 'merchant_statements')}
                    />
                </div>
            </div>
            <div className="mt-6 flex justify-end">
                <button
                    onClick={() => handleSaveSection('financial-information')}
                    className="px-6 py-2 bg-black text-white rounded-full font-bold text-sm hover:bg-gray-800 transition-colors"
                >
                    Save Section
                </button>
            </div>
        </div>
    );

    const renderEquipmentInformation = () => (
        <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Equipment Make</label>
                    <input
                        type="text"
                        value={localEquipmentInfo.make || ''}
                        onChange={(e) => updateEquipmentField('make', e.target.value)}
                        className="w-full bg-[#F6F5F4] border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                        placeholder="e.g. Clover"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Equipment Model</label>
                    <input
                        type="text"
                        value={localEquipmentInfo.model || ''}
                        onChange={(e) => updateEquipmentField('model', e.target.value)}
                        className="w-full bg-[#F6F5F4] border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                        placeholder="e.g. Station Duo"
                    />
                </div>
                <div className="col-span-2">
                    <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-4">Card Swipe Ratio (Must equal 100%)</label>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-medium text-black/60 mb-2">Card Present %</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={localEquipmentInfo.cardPresentPercentage || ''}
                                    onChange={(e) => updateEquipmentField('cardPresentPercentage', e.target.value)}
                                    className="w-full bg-[#F6F5F4] border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                                    placeholder="0"
                                />
                                <span className="absolute right-4 top-3 text-black/40">%</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-black/60 mb-2">Card Not Present %</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={localEquipmentInfo.cardNotPresentPercentage || ''}
                                    onChange={(e) => updateEquipmentField('cardNotPresentPercentage', e.target.value)}
                                    className="w-full bg-[#F6F5F4] border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                                    placeholder="0"
                                />
                                <span className="absolute right-4 top-3 text-black/40">%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-2">
                    <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-4">Equipment Types</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                            "Phone swiper/mobile reader",
                            "Virtual Terminal",
                            "Wireless Terminal",
                            "Countertop Terminal",
                            "Integrated POS",
                            "Standalone/Self-serve"
                        ].map((type) => (
                            <label key={type} className="flex items-center gap-3 p-3 rounded-xl border border-black/5 hover:bg-gray-50 cursor-pointer transition-colors">
                                <input
                                    type="checkbox"
                                    checked={localEquipmentInfo.equipmentTypes?.includes(type) || false}
                                    onChange={() => {
                                        const current = localEquipmentInfo.equipmentTypes || [];
                                        const updated = current.includes(type)
                                            ? current.filter(t => t !== type)
                                            : [...current, type];
                                        updateEquipmentField('equipmentTypes', updated);
                                    }}
                                    className="w-5 h-5 rounded-md border-gray-300 text-black focus:ring-black/5"
                                />
                                <span className="text-sm font-medium text-black">{type}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="col-span-2">
                    <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Equipment Photo</label>

                    <div className="border-2 border-dashed border-black/10 rounded-xl p-8 text-center hover:border-black/20 transition-colors bg-[#F6F5F4]/50 mb-4">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-black/40">
                                <Camera className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-black mb-1">Upload a photo of your equipment</p>
                                <p className="text-xs text-black/40">Supports JPG, PNG</p>
                            </div>
                            <div className="flex gap-3">
                                <label
                                    htmlFor="equipment-camera"
                                    className="cursor-pointer px-4 py-2 bg-black text-white rounded-full text-xs font-bold font-poppins hover:bg-gray-800 transition-colors flex items-center gap-2"
                                >
                                    <Camera className="w-3 h-3" />
                                    Use Camera
                                </label>
                                <input
                                    id="equipment-camera"
                                    type="file"
                                    accept="image/*"
                                    capture="environment"
                                    className="hidden"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                            onDocumentUpload('equipment_photo', e.target.files[0]);
                                        }
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                />

                                <label
                                    htmlFor="equipment-file"
                                    className="cursor-pointer px-4 py-2 bg-white border border-black/10 text-black rounded-full text-xs font-bold font-poppins hover:bg-gray-50 transition-colors flex items-center gap-2"
                                >
                                    <Upload className="w-3 h-3" />
                                    Attach File
                                </label>
                                <input
                                    id="equipment-file"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                            onDocumentUpload('equipment_photo', e.target.files[0]);
                                        }
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        </div>
                    </div>

                    {/* List of uploaded equipment photos */}
                    {applicationStatus.documents.filter(d => d.type === 'equipment_photo').length > 0 && (
                        <div className="grid grid-cols-1 gap-3">
                            {applicationStatus.documents.filter(d => d.type === 'equipment_photo').map((doc, index) => (
                                <motion.div
                                    key={doc.id || index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center justify-between bg-white p-4 rounded-xl border border-black/5 shadow-sm"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                            <Check className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-green-900">{doc.filename || `Photo ${index + 1}`}</p>
                                            <p className="text-xs text-green-700">
                                                {formatDate(doc.uploadedAt)}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => onDocumentRemove(doc.id)}
                                        className="p-2 hover:bg-green-100 text-green-600 rounded-full transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-6 flex justify-end">
                <button
                    onClick={() => handleSaveSection('equipment-information')}
                    className="px-6 py-2 bg-black text-white rounded-full font-bold text-sm hover:bg-gray-800 transition-colors"
                >
                    Save Section
                </button>
            </div>
        </div>
    );

    const renderOwnerInformation = () => (
        <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                    <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Owner Full Name</label>
                    <input
                        type="text"
                        value={localOwnerInfo.fullName || ''}
                        onChange={(e) => updateOwnerField('fullName', e.target.value)}
                        className="w-full bg-[#F6F5F4] border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                        placeholder="John Doe"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Title / Role</label>
                    <input
                        type="text"
                        value={localOwnerInfo.title || ''}
                        onChange={(e) => updateOwnerField('title', e.target.value)}
                        className="w-full bg-[#F6F5F4] border-transparent placeholder-[#FF4306] rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                        placeholder="CEO, Owner, etc."
                    />
                    <p className="text-xs text-orange-600 mt-1 font-medium">Required for funding</p>
                </div>
                <div>
                    <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Cell Phone</label>
                    <input
                        type="tel"
                        value={localOwnerInfo.cellPhone || ''}
                        onChange={(e) => updateOwnerField('cellPhone', e.target.value)}
                        className="w-full bg-[#F6F5F4] border-transparent placeholder-[#FF4306] rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                        placeholder="(555) 555-5555"
                    />
                    <p className="text-xs text-orange-600 mt-1 font-medium">Required for funding</p>
                </div>
                <div className="col-span-2">
                    <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Owner's Home Address</label>
                    <input
                        type="text"
                        value={localOwnerInfo.homeAddress || ''}
                        onChange={(e) => updateOwnerField('homeAddress', e.target.value)}
                        className="w-full bg-[#F6F5F4] border-transparent placeholder-[#FF4306] rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                        placeholder="Street Address, City, State, Zip"
                    />
                    <p className="text-xs text-orange-600 mt-1 font-medium">Required for funding</p>
                </div>
                <div>
                    <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Social Security Number</label>
                    <input
                        type="text"
                        value={localOwnerInfo.ssn || ''}
                        onChange={(e) => updateOwnerField('ssn', e.target.value)}
                        className="w-full bg-[#F6F5F4] border-transparent placeholder-[#FF4306] rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                        placeholder="XXX-XX-XXXX"
                    />
                    <p className="text-xs text-orange-600 mt-1 font-medium">Required for funding</p>
                </div>
                <div className="col-span-2 mt-4">
                    <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-4">Verification Document</label>
                    <DocumentCard
                        title="Photo ID"
                        description="A clear photo of your driver's license or passport."
                        type="photo_id"
                        isUploaded={applicationStatus.documents.some(d => d.type === 'photo_id')}
                        documents={applicationStatus.documents.filter(d => d.type === 'photo_id')}
                    />
                </div>
            </div>
            <div className="mt-8 flex justify-end">
                <button
                    onClick={() => {
                        // Save all sections
                        onUpdateProfile({
                            businessInfo: localBusinessInfo,
                            contactInfo: localContactInfo as any,
                            ownerInfo: localOwnerInfo as any,
                            equipmentInfo: localEquipmentInfo as any
                        });

                        onVerificationSubmit(
                            localBusinessInfo.ein || '',
                            localOwnerInfo.ssn || ''
                        );
                        setCollapsedSections(prev => ({ ...prev, 'owner-information': true }));
                    }}
                    className="px-8 py-3 bg-black text-white rounded-full font-bold text-base hover:bg-gray-800 transition-colors"
                >
                    Save All Changes
                </button>
            </div>
        </div>
    );

    // Render Helpers
    const renderSections = () => {
        const sections = [
            { id: 'business-identity', title: 'Business Identity', content: renderBusinessIdentity() },
            { id: 'contact-location', title: 'Contact & Location', content: renderContactLocation() },
            { id: 'financial-information', title: 'Financial Information', content: renderFinancialInformation() },
            { id: 'equipment-information', title: 'Equipment Information', content: renderEquipmentInformation() },
            { id: 'owner-information', title: 'Owner Information', content: renderOwnerInformation() }
        ];

        // Sort: Incomplete sections first, then completed
        return sections.sort((a, b) => {
            const aComplete = isSectionComplete(a.id);
            const bComplete = isSectionComplete(b.id);
            if (aComplete === bComplete) return 0; // Keep original order if same status
            return aComplete ? 1 : -1; // Complete (true) > Incomplete (false) -> Complete moves to bottom
        }).map(section => (
            <div key={section.id}>
                {renderSectionWrapper(section.id, section.title, section.content)}
            </div>
        ));
    };

    return (
        <div className="max-w-3xl mx-auto pb-20">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6"
            >
                <div className="text-center md:text-left">
                    <h2 className="text-4xl font-bold font-poppins mb-2 text-black">Business Profile</h2>
                    <p className="text-xl text-black/50 font-lora">Securely manage your business credentials.</p>
                </div>
            </motion.div>

            <div className="space-y-6">
                {renderSections()}
            </div>

            {/* Sign Out Button at Bottom */}
            <div className="mt-12 flex justify-center">
                <button
                    onClick={() => auth.signOut()}
                    className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full font-medium text-gray-600 hover:bg-gray-50 hover:text-black transition-all shadow-sm"
                >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    );
}
