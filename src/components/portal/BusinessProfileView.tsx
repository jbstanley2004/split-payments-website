"use client";

import { ApplicationStatus, DocumentType } from "@/types/portal";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Check, Shield, Lock, LogOut, Camera, Upload, X, ChevronDown, CheckCircle2, ArrowUp, ArrowDown, AlertCircle } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { auth } from "@/lib/firebase";
import { useDebounce } from "@/hooks/useDebounce";
import { AddressAutocomplete } from "../onboarding/AddressAutocomplete";
import { formatNormalizedPhone, verifyPhoneNumber, verifyPhoneNumberWithApi } from "@/lib/phoneVerification";
import { formatEin, formatSsn, verifyEin, verifySsn } from "@/lib/identityValidation";

interface BusinessProfileViewProps {
    applicationStatus: ApplicationStatus;
    onDocumentUpload: (type: DocumentType, file: File) => void;
    onDocumentRemove: (id: string) => void;
    onVerificationSubmit: (ein: string, ssn: string) => void;
    onUpdateProfile: (updates: Partial<ApplicationStatus>, immediate?: boolean) => void;
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

const sanitizePhoneInput = (value: string) => value.replace(/[^0-9()+\-\s]/g, '');

const sanitizeCurrencyInput = (value: string) => {
    const cleaned = value.replace(/[^0-9.]/g, '');
    if (!cleaned) return '';

    const [whole, decimal] = cleaned.split('.');
    const normalizedWhole = whole.replace(/^0+(?=\d)/, '');
    if (decimal === undefined) {
        return normalizedWhole;
    }

    const trimmedDecimal = decimal.replace(/\D/g, '').slice(0, 2);
    if (!trimmedDecimal) {
        return normalizedWhole || '0';
    }

    return `${normalizedWhole || '0'}.${trimmedDecimal}`;
};

const sanitizePercentageInput = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 3);
    if (!digits) return '';
    return Math.min(100, parseInt(digits, 10)).toString();
};

const isValidEmail = (value?: string) => {
    if (!value) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
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

    const primaryLabelClass = "block text-xs font-semibold text-brand-black uppercase tracking-wide";
    const secondaryLabelClass = "block text-xs font-medium text-brand-black/80";

    // Local state for form fields
    const [localBusinessInfo, setLocalBusinessInfo] = useState(businessInfo);
    const [localContactInfo, setLocalContactInfo] = useState(contactInfo || {});
    const [localOwnerInfo, setLocalOwnerInfo] = useState(ownerInfo || {});
    const [localEquipmentInfo, setLocalEquipmentInfo] = useState(equipmentInfo || {});

    const businessPhoneVerification = useMemo(
        () => verifyPhoneNumber(localContactInfo?.businessPhone || ""),
        [localContactInfo?.businessPhone]
    );
    const ownerPhoneVerification = useMemo(
        () => verifyPhoneNumber(localOwnerInfo?.cellPhone || ""),
        [localOwnerInfo?.cellPhone]
    );
    const einVerification = useMemo(
        () => verifyEin(localBusinessInfo?.ein || ""),
        [localBusinessInfo?.ein]
    );
    const ssnVerification = useMemo(
        () => verifySsn(localOwnerInfo?.ssn || ""),
        [localOwnerInfo?.ssn]
    );
    const cardSplitTotal = useMemo(() => {
        const present = Number(localEquipmentInfo.cardPresentPercentage || 0);
        const notPresent = Number(localEquipmentInfo.cardNotPresentPercentage || 0);
        return present + notPresent;
    }, [localEquipmentInfo.cardPresentPercentage, localEquipmentInfo.cardNotPresentPercentage]);
    const cardSplitProvided = useMemo(() => (
        localEquipmentInfo.cardPresentPercentage !== undefined && localEquipmentInfo.cardPresentPercentage !== '' &&
        localEquipmentInfo.cardNotPresentPercentage !== undefined && localEquipmentInfo.cardNotPresentPercentage !== ''
    ), [localEquipmentInfo.cardPresentPercentage, localEquipmentInfo.cardNotPresentPercentage]);
    const hasPhoneValidationApiKey = Boolean(process.env.NEXT_PUBLIC_ABSTRACT_PHONE_API_KEY);
    const [businessPhoneApiVerification, setBusinessPhoneApiVerification] = useState<Awaited<ReturnType<typeof verifyPhoneNumberWithApi>> | null>(null);
    const [ownerPhoneApiVerification, setOwnerPhoneApiVerification] = useState<Awaited<ReturnType<typeof verifyPhoneNumberWithApi>> | null>(null);
    const [isCheckingBusinessPhone, setIsCheckingBusinessPhone] = useState(false);
    const [isCheckingOwnerPhone, setIsCheckingOwnerPhone] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const rawPhone = localContactInfo?.businessPhone || '';
        if (!rawPhone || !businessPhoneVerification.isValid || !hasPhoneValidationApiKey) {
            setBusinessPhoneApiVerification(null);
            setIsCheckingBusinessPhone(false);
            return;
        }

        setIsCheckingBusinessPhone(true);
        verifyPhoneNumberWithApi(rawPhone, { signal: controller.signal })
            .then(result => setBusinessPhoneApiVerification(result))
            .catch(() => setBusinessPhoneApiVerification(null))
            .finally(() => setIsCheckingBusinessPhone(false));

        return () => controller.abort();
    }, [localContactInfo?.businessPhone, businessPhoneVerification.isValid, hasPhoneValidationApiKey]);

    useEffect(() => {
        const controller = new AbortController();
        const rawPhone = localOwnerInfo?.cellPhone || '';
        if (!rawPhone || !ownerPhoneVerification.isValid || !hasPhoneValidationApiKey) {
            setOwnerPhoneApiVerification(null);
            setIsCheckingOwnerPhone(false);
            return;
        }

        setIsCheckingOwnerPhone(true);
        verifyPhoneNumberWithApi(rawPhone, { signal: controller.signal })
            .then(result => setOwnerPhoneApiVerification(result))
            .catch(() => setOwnerPhoneApiVerification(null))
            .finally(() => setIsCheckingOwnerPhone(false));

        return () => controller.abort();
    }, [localOwnerInfo?.cellPhone, ownerPhoneVerification.isValid, hasPhoneValidationApiKey]);

    // Track if user has touched the form to prevent overwriting with stale props
    const [isDirty, setIsDirty] = useState(false);

    // Refs for unmount saving and accessing latest state in cleanups
    const localBusinessInfoRef = useRef(localBusinessInfo);
    const localContactInfoRef = useRef(localContactInfo);
    const localOwnerInfoRef = useRef(localOwnerInfo);
    const localEquipmentInfoRef = useRef(localEquipmentInfo);
    const isDirtyRef = useRef(isDirty);

    // Keep refs in sync
    useEffect(() => {
        localBusinessInfoRef.current = localBusinessInfo;
        localContactInfoRef.current = localContactInfo;
        localOwnerInfoRef.current = localOwnerInfo;
        localEquipmentInfoRef.current = localEquipmentInfo;
        isDirtyRef.current = isDirty;
    }, [localBusinessInfo, localContactInfo, localOwnerInfo, localEquipmentInfo, isDirty]);

    // Save on unmount if dirty
    useEffect(() => {
        return () => {
            if (isDirtyRef.current) {
                // Determine what changed to send minimal updates, or just send all local state to be safe.
                // Sending all local state ensures consistency.
                onUpdateProfile({
                    businessInfo: localBusinessInfoRef.current,
                    contactInfo: localContactInfoRef.current as any,
                    ownerInfo: localOwnerInfoRef.current as any,
                    equipmentInfo: localEquipmentInfoRef.current as any
                }, true);
            }
        };
    }, []);

    // Sync local state when props change
    // CRITICAL FIX: Only sync if the user hasn't modified the form (isDirty is false).
    // This prevents incoming prop updates (e.g. from file uploads) from wiping user's unsaved input.
    useEffect(() => {
        if (!isDirty) {
            setLocalBusinessInfo(businessInfo);
            setLocalContactInfo(contactInfo || {});
            setLocalOwnerInfo(ownerInfo || {});
            setLocalEquipmentInfo(equipmentInfo || {});
        }
    }, [businessInfo, contactInfo, ownerInfo, equipmentInfo, isDirty]);


    // Debounced values for auto-save
    const debouncedBusinessInfo = useDebounce(localBusinessInfo, 1000);
    const debouncedContactInfo = useDebounce(localContactInfo, 1000);
    const debouncedOwnerInfo = useDebounce(localOwnerInfo, 1000);
    const debouncedEquipmentInfo = useDebounce(localEquipmentInfo, 1000);

    // Auto-save effects
    useEffect(() => {
        if (isDirty && JSON.stringify(debouncedBusinessInfo) !== JSON.stringify(businessInfo)) {
            onUpdateProfile({ businessInfo: debouncedBusinessInfo });
        }
    }, [debouncedBusinessInfo]);

    useEffect(() => {
        if (isDirty && JSON.stringify(debouncedContactInfo) !== JSON.stringify(contactInfo)) {
            onUpdateProfile({ contactInfo: debouncedContactInfo as any });
        }
    }, [debouncedContactInfo]);

    useEffect(() => {
        if (isDirty && JSON.stringify(debouncedOwnerInfo) !== JSON.stringify(ownerInfo)) {
            onUpdateProfile({ ownerInfo: debouncedOwnerInfo as any });
        }
    }, [debouncedOwnerInfo]);

    useEffect(() => {
        if (isDirty && JSON.stringify(debouncedEquipmentInfo) !== JSON.stringify(equipmentInfo)) {
            onUpdateProfile({ equipmentInfo: debouncedEquipmentInfo as any });
        }
    }, [debouncedEquipmentInfo]);


    // Wrapper for document upload to force save current state first
    const handleDocumentUploadWrapper = (type: DocumentType, file: File) => {
        // Force immediate save of current local state to ensure no data loss
        if (isDirtyRef.current) {
            onUpdateProfile({
                businessInfo: localBusinessInfo,
                contactInfo: localContactInfo as any,
                ownerInfo: localOwnerInfo as any,
                equipmentInfo: localEquipmentInfo as any
            }, true);
        }
        onDocumentUpload(type, file);
    };

    // Optimistic completion state to show "Complete" immediately
    const [optimisticCompletedSections, setOptimisticCompletedSections] = useState<string[]>([]);

    // Handle initial collapse state
    useEffect(() => {
        const newCollapsedState: Record<string, boolean> = {
            'business-identity': isSectionComplete('business-identity'),
            'contact-location': isSectionComplete('contact-location'),
            'financial-information': isSectionComplete('financial-information'),
            'equipment-information': isSectionComplete('equipment-information'),
            'owner-information': isSectionComplete('owner-information')
        };
        setCollapsedSections(newCollapsedState);
    }, []); // Only run on mount

    // Handle deep linking / scrolling
    useEffect(() => {
        if (targetSection) {
            setCollapsedSections(prev => ({ ...prev, [targetSection]: false }));

            setTimeout(() => {
                const element = document.getElementById(targetSection);
                if (element) {
                    const yOffset = -100;
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 300);
        }
    }, [targetSection]);

    // Collapse state for each section
    const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

    // Section order state
    const [sectionOrder, setSectionOrder] = useState<string[]>(() => {
        const defaultOrder = [
            'business-identity',
            'contact-location',
            'financial-information',
            'equipment-information',
            'owner-information'
        ];

        // Initialize with completed sections at the bottom
        const completed = applicationStatus.completedSections || [];
        const incomplete = defaultOrder.filter(id => !completed.includes(id));
        const completeInOrder = defaultOrder.filter(id => completed.includes(id));

        return [...incomplete, ...completeInOrder];
    });

    const handleSaveSection = (sectionId: string) => {
        // Construct the update object based on the section
        let updates: Partial<ApplicationStatus> = {};
        let isValid = false;

        switch (sectionId) {
            case 'business-identity':
                updates = {
                    businessInfo: {
                        ...localBusinessInfo,
                        ein: einVerification.isValid ? einVerification.formatted : localBusinessInfo.ein
                    }
                };
                isValid = isSectionValid('business-identity');
                break;
            case 'contact-location':
                updates = {
                    contactInfo: {
                        ...localContactInfo,
                        businessPhone: businessPhoneVerification.isValid
                            ? businessPhoneVerification.formatted || formatNormalizedPhone(businessPhoneVerification.normalized)
                            : localContactInfo.businessPhone
                    } as any
                };
                isValid = isSectionValid('contact-location');
                break;
            case 'financial-information':
                // Financial info is part of businessInfo in the current structure
                updates = { businessInfo: localBusinessInfo };
                isValid = isSectionValid('financial-information');
                break;
            case 'equipment-information':
                updates = { equipmentInfo: localEquipmentInfo as any };
                isValid = isSectionValid('equipment-information');
                break;
            case 'owner-information':
                updates = {
                    ownerInfo: {
                        ...localOwnerInfo,
                        cellPhone: ownerPhoneVerification.isValid
                            ? ownerPhoneVerification.formatted || formatNormalizedPhone(ownerPhoneVerification.normalized)
                            : localOwnerInfo.cellPhone,
                        ssn: ssnVerification.isValid ? ssnVerification.formatted : localOwnerInfo.ssn
                    } as any
                };
                isValid = isSectionValid('owner-information');
                break;
        }

        // If valid, mark as complete
        if (isValid) {
            const currentCompleted = applicationStatus.completedSections || [];
            if (!currentCompleted.includes(sectionId)) {
                updates.completedSections = [...currentCompleted, sectionId];
            }
            // Optimistic update
            if (!optimisticCompletedSections.includes(sectionId)) {
                setOptimisticCompletedSections(prev => [...prev, sectionId]);
            }
        }

        onUpdateProfile(updates, true);
        setCollapsedSections(prev => ({ ...prev, [sectionId]: true }));
        // Reset dirty flag after explicit save? 
        // Ideally yes, but updates are async. 
        // Actually, if we reset isDirty, then the props sync will kick in.
        // If the props haven't updated yet, we might revert to old data. 
        // SAFE BET: Keep isDirty true until component unmounts or reloads, 
        // relying on auto-sync and manual saves to push data UP, but never pulling data DOWN while editing.
        // This is the most robust way to prevent data loss.

        // Sequence the reordering: Wait for collapse animation (300ms) + buffer
        if (isValid) {
            setTimeout(() => {
                setSectionOrder(prevOrder => {
                    // Only reorder if not already at the bottom (or just force it)
                    const newOrder = prevOrder.filter(id => id !== sectionId);
                    newOrder.push(sectionId);
                    return newOrder;
                });
            }, 400);
        }
    };

    // Helper for input changes
    const updateBusinessField = (field: string, value: any) => {
        setIsDirty(true);
        setLocalBusinessInfo(prev => ({ ...prev, [field]: value }));
    };

    const updateContactField = (field: string, value: any) => {
        setIsDirty(true);
        setLocalContactInfo(prev => ({ ...prev, [field]: value }));
    };

    const updateOwnerField = (field: string, value: any) => {
        setIsDirty(true);
        setLocalOwnerInfo(prev => ({ ...prev, [field]: value }));
    };

    const updateEquipmentField = (field: string, value: any) => {
        setIsDirty(true);
        setLocalEquipmentInfo(prev => ({ ...prev, [field]: value }));
    };

    const PhoneVerificationBadge = ({
        verification,
        apiVerification,
        label,
        isChecking
    }: {
        verification: ReturnType<typeof verifyPhoneNumber>;
        apiVerification?: Awaited<ReturnType<typeof verifyPhoneNumberWithApi>> | null;
        label: string;
        isChecking?: boolean;
    }) => {
        const effectiveVerification = apiVerification?.checkedWithApi ? apiVerification : verification;
        const Icon = isChecking ? Shield : effectiveVerification.isValid ? CheckCircle2 : AlertCircle;
        const textClass = effectiveVerification.isValid ? "text-green-600" : "text-orange-600";
        const message = isChecking
            ? `Confirming ${label.toLowerCase()}...`
            : effectiveVerification.isValid
                ? apiVerification?.checkedWithApi
                    ? `${label} confirmed as active`
                    : `${label} verified`
                : apiVerification?.checkedWithApi
                    ? effectiveVerification.reason || 'Unable to confirm number is active.'
                    : effectiveVerification.reason || 'Unable to verify phone number.';

        return (
            <div className={`flex items-center gap-2 mt-2 ${textClass}`}>
                <Icon className="w-4 h-4" />
                <span className="text-xs font-semibold">{message}</span>
            </div>
        );
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
                acceptedFiles.forEach(file => handleDocumentUploadWrapper(type, file));
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
                handleDocumentUploadWrapper(type, e.target.files[0]);
            }
        };

        return (
            <div className="space-y-4">
                <div
                    {...getRootProps()}
                    className={`group relative bg-white rounded-3xl p-5 sm:p-6 md:p-8 border transition-all duration-300 cursor-pointer overflow-hidden ${isUploaded
                        ? "border-green-100 shadow-sm"
                        : isDragActive
                            ? "border-[#FF4306] shadow-lg scale-[1.02]"
                            : "border-black/5 hover:border-black/10 hover:shadow-md"
                        }`}
                >
                    <input {...getInputProps()} />

                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between relative z-10">
                        <div className="flex items-start gap-3 sm:gap-4 md:gap-6 w-full">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${isUploaded ? "bg-green-50 text-green-600" : "bg-black/5 text-black/40 group-hover:bg-black/10 group-hover:text-black"
                                }`}>
                                {isUploaded ? <Check className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                            </div>
                            <div className="flex-1">
                                <h4 className={`text-lg font-bold font-poppins mb-1 ${isUploaded ? "text-black" : "text-black"}`}>
                                    {title}
                                </h4 >
                                <p className="text-black/60 font-lora leading-relaxed text-sm sm:text-base">
                                    {description}
                                </p>
                                <div className="mt-4 flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3 w-full">
                                    <label
                                        htmlFor={`camera-${type}`}
                                        className="cursor-pointer px-4 py-2 bg-black text-white rounded-full text-xs font-bold font-poppins hover:bg-gray-800 transition-colors flex items-center gap-2 justify-center w-full sm:w-auto"
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
                                    <div className="px-4 py-2 bg-gray-100 text-black rounded-full text-xs font-bold font-poppins flex items-center gap-2 justify-center w-full sm:w-auto">
                                        <Upload className="w-3 h-3" />
                                        Upload File
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* File List for All Types */}
                {documents.length > 0 && (
                    <div className="grid grid-cols-1 gap-3 pl-3 sm:pl-16">
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

    // Section validation checks (data only)
    const isSectionValid = (sectionId: string): boolean => {
        switch (sectionId) {
            case 'business-identity':
                const hasVoidedCheck = documents.some(d => d.type === 'voided_check');
                return !!localBusinessInfo.dba && !!localBusinessInfo.entityType && !!localBusinessInfo.industry && !!localBusinessInfo.businessStartDate && hasVoidedCheck && einVerification.isValid;

            case 'contact-location':
                return !!localContactInfo?.physicalAddress && !!localContactInfo?.businessPhone && !!localContactInfo?.email && businessPhoneVerification.isValid && isValidEmail(localContactInfo?.email);

            case 'financial-information':
                const hasMerchantStatements = documents.some(d => d.type === 'merchant_statements');
                return hasMerchantStatements && !!localBusinessInfo.monthlyRevenue && !!localBusinessInfo.annualRevenue && !!localBusinessInfo.highTicketAmount && !!localBusinessInfo.averageTicketSize && !!localBusinessInfo.productServiceDescription;

            case 'equipment-information':
                const hasEquipmentPhotos = documents.some(d => d.type === 'equipment_photo');
                return hasEquipmentPhotos && !!localEquipmentInfo?.make && !!localEquipmentInfo?.model &&
                    cardSplitProvided && cardSplitTotal === 100 &&
                    !!localEquipmentInfo?.equipmentTypes && localEquipmentInfo.equipmentTypes.length > 0;

            case 'owner-information':
                const hasPhotoId = documents.some(d => d.type === 'photo_id');
                return hasPhotoId && !!localOwnerInfo?.fullName && !!localOwnerInfo?.title && !!localOwnerInfo?.cellPhone && !!localOwnerInfo?.homeAddress && ssnVerification.isValid && ownerPhoneVerification.isValid;

            default:
                return false;
        }
    };

    // Check if section is explicitly marked as complete
    const isSectionComplete = (sectionId: string): boolean => {
        return (applicationStatus.completedSections?.includes(sectionId) || optimisticCompletedSections.includes(sectionId)) || false;
    };

    const toggleSection = (sectionId: string) => {
        setCollapsedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    const completedDescriptions: Record<string, string> = {
        'business-identity': "Your business identity has been fully verified and recorded.",
        'contact-location': "Contact and location details have been successfully captured.",
        'financial-information': "Financial data has been successfully uploaded and processed.",
        'equipment-information': "Equipment details and photos have been successfully cataloged.",
        'owner-information': "Owner identification and personal details are securely on file."
    };

    const renderSectionWrapper = (id: string, baseTitle: string, baseDescription: string, content: React.ReactNode) => {
        const isComplete = isSectionComplete(id);
        const isOpen = !collapsedSections[id];

        return (
            <div
                className={`bg-white rounded-[40px] shadow-2xl border border-gray-100 transition-all duration-500 overflow-hidden ${isOpen ? 'hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)]' : 'hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)]'} ${isOpen ? '-mx-4 sm:mx-0' : ''}`}
            >
                {/* Header - always visible */}
                <div
                    onClick={() => toggleSection(id)}
                    className="p-2 pl-6 flex items-center justify-between cursor-pointer group"
                >
                    <div className="text-left py-2 pr-4 flex-1 space-y-1">
                        <div className="flex items-center gap-2 mb-0.5">
                            {isComplete ? (
                                <span className="text-[10px] font-bold tracking-wider text-green-600">
                                    Complete
                                </span>
                            ) : (
                                <span className="text-[10px] font-bold tracking-wider text-[#FF4306]">
                                    Action Required
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                            <h3 className="text-xl font-bold text-black font-poppins leading-none mb-1">
                                {baseTitle}
                            </h3>
                        </div>
                        <p className="text-sm text-black/50 font-lora">
                            {isComplete ? completedDescriptions[id] : baseDescription}
                        </p>
                    </div>

                    <div className="flex-shrink-0 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:bg-gray-900 shadow-md">
                        {isOpen ? <ArrowUp className="w-6 h-6" /> : <ArrowDown className="w-6 h-6" />}
                    </div>
                </div>

                {/* Content - animated */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            style={{ overflow: 'hidden' }}
                        >
                            <div className="border-t border-gray-100 p-4 sm:p-6 md:p-8 space-y-6">
                                {content}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    const renderBusinessIdentity = () => (
        <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-5 lg:gap-6">
                <div className="col-span-1 md:col-span-2">
                    <label className={`${primaryLabelClass} mb-2`}>Legal / Corporate Name</label>
                    <input
                        type="text"
                        value={localBusinessInfo.businessName || ''}
                        onChange={(e) => updateBusinessField('businessName', e.target.value)}
                        className="w-full bg-[#F6F5F4] border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                        placeholder="e.g. Acme Holdings LLC"
                    />
                </div>
                <div>
                    <label className={`${primaryLabelClass} mb-2`}>DBA (Doing Business As)</label>
                    <input
                        type="text"
                        value={localBusinessInfo.dba || ''}
                        onChange={(e) => updateBusinessField('dba', e.target.value)}
                        className={`w-full border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all ${!localBusinessInfo.dba ? 'bg-[#F6F5F4] placeholder-[#FF4306]' : 'bg-[#F6F5F4] text-black'}`}
                        placeholder="e.g. Acme Shop"
                    />
                    {!localBusinessInfo.dba && (
                        <p className="text-xs text-orange-600 mt-1 font-medium">Required for funding</p>
                    )}
                </div>
                <div>
                    <label className={`${primaryLabelClass} mb-2`}>Entity Type</label>
                    <select
                        value={localBusinessInfo.entityType || ''}
                        onChange={(e) => updateBusinessField('entityType', e.target.value)}
                        className={`w-full bg-[#F6F5F4] border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all appearance-none ${!localBusinessInfo.entityType ? 'text-[#FF4306]' : 'text-black'}`}
                    >
                        <option value="" className="text-[#FF4306]">Select Type...</option>
                        <option value="LLC" className="text-black">LLC</option>
                        <option value="C-Corp" className="text-black">C Corporation</option>
                        <option value="S-Corp" className="text-black">S Corporation</option>
                        <option value="Sole Prop" className="text-black">Sole Proprietorship</option>
                        <option value="Partnership" className="text-black">General Partnership</option>
                    </select>
                    {!localBusinessInfo.entityType && (
                        <p className="text-xs text-orange-600 mt-1 font-medium">Required for funding</p>
                    )}
                </div>
                <div>
                    <label className={`${primaryLabelClass} mb-2`}>Industry</label>
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
                    <label className={`${primaryLabelClass} mb-2`}>Business Start Date</label>
                    <input
                        type="date"
                        value={localBusinessInfo.businessStartDate || ''}
                        onChange={(e) => updateBusinessField('businessStartDate', e.target.value)}
                        className="w-full bg-[#F6F5F4] border-transparent rounded-xl px-4 py-3 text-base text-black focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                    />
                    {!localBusinessInfo.businessStartDate && (
                        <p className="text-xs text-orange-600 mt-1 font-medium">Required for funding</p>
                    )}
                </div>
                <div>
                    <label className={`${primaryLabelClass} mb-2`}>EIN (Employer ID Number)</label>
                    <input
                        type="text"
                        value={localBusinessInfo.ein || ''}
                        onChange={(e) => updateBusinessField('ein', formatEin(e.target.value))}
                        onBlur={() => {
                            if (localBusinessInfo.ein) {
                                const result = verifyEin(localBusinessInfo.ein);
                                if (result.isValid) {
                                    updateBusinessField('ein', result.formatted);
                                }
                            }
                        }}
                        inputMode="numeric"
                        pattern="\\d{2}-\\d{7}"
                        className={`w-full border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all ${!localBusinessInfo.ein ? 'bg-[#F6F5F4] placeholder-[#FF4306]' : 'bg-[#F6F5F4] text-black'}`}
                        placeholder="XX-XXXXXXX"
                    />
                    {!localBusinessInfo.ein && (
                        <p className="text-xs text-orange-600 mt-1 font-medium">Required for funding</p>
                    )}
                    {localBusinessInfo.ein && !einVerification.isValid && (
                        <p className="text-xs text-orange-600 mt-1 font-medium">{einVerification.reason}</p>
                    )}
                </div>
                <div className="col-span-1 md:col-span-2 mt-4">
                    <label className={`${primaryLabelClass} mb-4`}>Verification Document</label>
                    <DocumentCard
                        title="Voided Check"
                        description="To verify your business bank account details."
                        type="voided_check"
                        isUploaded={applicationStatus.documents.some(d => d.type === 'voided_check')}
                        documents={applicationStatus.documents.filter(d => d.type === 'voided_check')}
                    />
                </div>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                    onClick={() => handleSaveSection('business-identity')}
                    className="w-full sm:w-auto px-6 py-3 bg-black text-white rounded-full font-bold text-sm hover:bg-gray-800 transition-colors"
                >
                    Save Section
                </button>
            </div>
        </div>
    );

    const renderContactLocation = () => (
        <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-5 lg:gap-6">
                <div className="col-span-1 md:col-span-2">
                    <AddressAutocomplete
                        label="Physical Business Address"
                        value={localContactInfo.physicalAddress || ''}
                        onChange={(address, city, state, zip) => {
                            setIsDirty(true);
                            setLocalContactInfo(prev => ({
                                ...prev,
                                physicalAddress: address,
                                cityStateZip: `${city}, ${state} ${zip}`
                            }));
                        }}
                        placeholder="Street Address"
                    />
                    <div className="mt-4">
                        <input
                            type="text"
                            value={localContactInfo.cityStateZip || ''}
                            onChange={(e) => updateContactField('cityStateZip', e.target.value)}
                            className="w-full bg-[#F6F5F4] border-transparent placeholder-[#FF4306] rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                            placeholder="City, State, Zip"
                        />
                    </div>
                    <p className="text-xs text-orange-600 mt-1 font-medium">Required for funding</p>
                </div>
                <div>
                    <label className={`${primaryLabelClass} mb-2`}>Business Phone</label>
                    <input
                        type="tel"
                        value={localContactInfo.businessPhone || ''}
                        onChange={(e) => updateContactField('businessPhone', sanitizePhoneInput(e.target.value))}
                        onBlur={() => {
                            const result = verifyPhoneNumber(localContactInfo.businessPhone || '');
                            if (result.isValid) {
                                updateContactField('businessPhone', result.formatted || formatNormalizedPhone(result.normalized));
                            }
                        }}
                        inputMode="tel"
                        className="w-full bg-[#F6F5F4] border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                        placeholder="(555) 555-5555"
                    />
                    <PhoneVerificationBadge
                        verification={businessPhoneVerification}
                        apiVerification={businessPhoneApiVerification}
                        isChecking={isCheckingBusinessPhone}
                        label="Business phone"
                    />
                </div>
                <div>
                    <label className={`${primaryLabelClass} mb-2`}>Email</label>
                    <input
                        type="email"
                        value={localContactInfo.email || ''}
                        onChange={(e) => updateContactField('email', e.target.value)}
                        onBlur={() => {
                            if (localContactInfo.email) {
                                updateContactField('email', localContactInfo.email.trim());
                            }
                        }}
                        inputMode="email"
                        className="w-full bg-[#F6F5F4] border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                        placeholder="name@company.com"
                    />
                    {localContactInfo.email && !isValidEmail(localContactInfo.email) && (
                        <p className="text-xs text-orange-600 mt-1 font-medium">Enter a valid business email.</p>
                    )}
                </div>
                <div className="col-span-1 md:col-span-2">
                    <label className={`${primaryLabelClass} mb-2`}>Website (Optional)</label>
                    <input
                        type="url"
                        value={localContactInfo.website || ''}
                        onChange={(e) => updateContactField('website', e.target.value)}
                        className="w-full bg-[#F6F5F4] border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:bg focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                        placeholder="www.yourbusiness.com"
                    />
                </div>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                    onClick={() => handleSaveSection('contact-location')}
                    className="w-full sm:w-auto px-6 py-3 bg-black text-white rounded-full font-bold text-sm hover:bg-gray-800 transition-colors"
                >
                    Save Section
                </button>
            </div>
        </div>
    );

    const renderFinancialInformation = () => (
        <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-5 lg:gap-6">
                <div>
                    <label className={`${primaryLabelClass} mb-2`}>Monthly Processing Volume</label>
                    <div className="relative">
                        <span className="absolute left-4 top-3 text-black/40">$</span>
                        <input
                            type="text"
                            value={localBusinessInfo.monthlyRevenue || ''}
                            onChange={(e) => updateBusinessField('monthlyRevenue', sanitizeCurrencyInput(e.target.value))}
                            inputMode="decimal"
                            className={`w-full border-transparent rounded-xl pl-8 pr-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all ${!localBusinessInfo.monthlyRevenue ? "bg-orange-50 border-orange-200 text-orange-900 placeholder-orange-300" : "bg-[#F6F5F4]"
                                }`}
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <div>
                    <label className={`${primaryLabelClass} mb-2`}>Annual Revenue</label>
                    <div className="relative">
                        <span className="absolute left-4 top-3 text-black/40">$</span>
                        <input
                            type="text"
                            value={localBusinessInfo.annualRevenue || ''}
                            onChange={(e) => updateBusinessField('annualRevenue', sanitizeCurrencyInput(e.target.value))}
                            inputMode="decimal"
                            className="w-full bg-[#F6F5F4] border-transparent rounded-xl pl-8 pr-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                            placeholder="0.00"
                        />
                    </div>
                </div>
                <div>
                    <label className={`${primaryLabelClass} mb-2`}>High Ticket Amount</label>
                    <div className="relative">
                        <span className="absolute left-4 top-3 text-black/40">$</span>
                        <input
                            type="text"
                            value={localBusinessInfo.highTicketAmount || ''}
                            onChange={(e) => updateBusinessField('highTicketAmount', sanitizeCurrencyInput(e.target.value))}
                            inputMode="decimal"
                            className="w-full bg-[#F6F5F4] border-transparent rounded-xl pl-8 pr-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                            placeholder="0.00"
                        />
                    </div>
                </div>
                <div>
                    <label className={`${primaryLabelClass} mb-2`}>Average Ticket Size</label>
                    <div className="relative">
                        <span className="absolute left-4 top-3 text-black/40 z-10">$</span>
                        <input
                            type="text"
                            value={localBusinessInfo.averageTicketSize || ''}
                            onChange={(e) => updateBusinessField('averageTicketSize', sanitizeCurrencyInput(e.target.value))}
                            inputMode="decimal"
                            className={`w-full border-transparent rounded-xl pl-8 pr-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all ${!localBusinessInfo.averageTicketSize ? 'bg-orange-50 text-black placeholder-orange-300' : 'bg-[#F6F5F4] text-black'}`}
                            placeholder="0"
                        />
                    </div>
                    {!localBusinessInfo.averageTicketSize && (
                        <p className="text-xs text-orange-600 mt-1 font-medium">Required for funding</p>
                    )}
                </div>
                <div className="col-span-1 md:col-span-2">
                    <label className={`${primaryLabelClass} mb-2`}>Description of Product/Service</label>
                    <textarea
                        value={localBusinessInfo.productServiceDescription || ''}
                        onChange={(e) => updateBusinessField('productServiceDescription', e.target.value)}
                        className={`w-full border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all resize-none h-32 ${!localBusinessInfo.productServiceDescription ? 'bg-[#F6F5F4] placeholder-[#FF4306]' : 'bg-[#F6F5F4] text-black'}`}
                        placeholder="What do you sell or offer?"
                    />
                    {!localBusinessInfo.productServiceDescription && (
                        <p className="text-xs text-orange-600 mt-1 font-medium">Required for funding</p>
                    )}
                </div>
                <div className="col-span-1 md:col-span-2 mt-4">
                    <label className={`${primaryLabelClass} mb-4`}>Verification Document</label>
                    <DocumentCard
                        title="Merchant Statements"
                        description="Upload your last 3 months of processing statements."
                        type="merchant_statements"
                        isUploaded={applicationStatus.documents.some(d => d.type === 'merchant_statements')}
                        documents={applicationStatus.documents.filter(d => d.type === 'merchant_statements')}
                    />
                </div>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                    onClick={() => handleSaveSection('financial-information')}
                    className="w-full sm:w-auto px-6 py-3 bg-black text-white rounded-full font-bold text-sm hover:bg-gray-800 transition-colors"
                >
                    Save Section
                </button>
            </div>
        </div>
    );

    const renderEquipmentInformation = () => (
        <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-5 lg:gap-6">
                <div>
                    <label className={`${primaryLabelClass} mb-2`}>Equipment Make</label>
                    <input
                        type="text"
                        value={localEquipmentInfo.make || ''}
                        onChange={(e) => updateEquipmentField('make', e.target.value)}
                        className="w-full bg-[#F6F5F4] border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                        placeholder="e.g. Clover"
                    />
                </div>
                <div>
                    <label className={`${primaryLabelClass} mb-2`}>Equipment Model</label>
                    <input
                        type="text"
                        value={localEquipmentInfo.model || ''}
                        onChange={(e) => updateEquipmentField('model', e.target.value)}
                        className="w-full bg-[#F6F5F4] border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                        placeholder="e.g. Station Duo"
                    />
                </div>
                    <div className="col-span-1 md:col-span-2">
                        <label className={`${primaryLabelClass} mb-4`}>Card Swipe Ratio (Must equal 100%)</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                                <label className={`${secondaryLabelClass} mb-2`}>Card Present %</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={localEquipmentInfo.cardPresentPercentage || ''}
                                    onChange={(e) => updateEquipmentField('cardPresentPercentage', sanitizePercentageInput(e.target.value))}
                                    className="w-full bg-[#F6F5F4] border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                                    placeholder="0"
                                />
                                <span className="absolute right-4 top-3 text-black/40">%</span>
                            </div>
                        </div>
                            <div>
                                <label className={`${secondaryLabelClass} mb-2`}>Card Not Present %</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                    value={localEquipmentInfo.cardNotPresentPercentage || ''}
                                    onChange={(e) => updateEquipmentField('cardNotPresentPercentage', sanitizePercentageInput(e.target.value))}
                                    className="w-full bg-[#F6F5F4] border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                                    placeholder="0"
                                />
                                <span className="absolute right-4 top-3 text-black/40">%</span>
                                </div>
                            </div>
                        </div>
                        {cardSplitProvided && cardSplitTotal !== 100 && (
                            <p className="text-xs text-orange-600 mt-2 font-medium">Card present and not present percentages must total 100%.</p>
                        )}
                    </div>

                <div className="col-span-1 md:col-span-2">
                    <label className={`${primaryLabelClass} mb-4`}>Equipment Types</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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

                <div className="col-span-1 md:col-span-2">
                    <label className={`${primaryLabelClass} mb-2`}>Equipment Photo</label>

                    <div className="border-2 border-dashed border-black/10 rounded-xl p-8 text-center hover:border-black/20 transition-colors bg-[#F6F5F4]/50 mb-4">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-black/40">
                                <Camera className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-black mb-1">Upload a photo of your equipment</p>
                                <p className="text-xs text-black/40">Supports JPG, PNG</p>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 w-full">
                                <label
                                    htmlFor="equipment-camera"
                                    className="cursor-pointer px-4 py-2 bg-black text-white rounded-full text-xs font-bold font-poppins hover:bg-gray-800 transition-colors flex items-center gap-2 justify-center w-full sm:w-auto"
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
                                            handleDocumentUploadWrapper('equipment_photo', e.target.files[0]);
                                        }
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                />

                                <label
                                    htmlFor="equipment-file"
                                    className="cursor-pointer px-4 py-2 bg-white border border-black/10 text-black rounded-full text-xs font-bold font-poppins hover:bg-gray-50 transition-colors flex items-center gap-2 justify-center w-full sm:w-auto"
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
                                            handleDocumentUploadWrapper('equipment_photo', e.target.files[0]);
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
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                    onClick={() => handleSaveSection('equipment-information')}
                    className="w-full sm:w-auto px-6 py-3 bg-black text-white rounded-full font-bold text-sm hover:bg-gray-800 transition-colors"
                >
                    Save Section
                </button>
            </div>
        </div>
    );

    const renderOwnerInformation = () => (
        <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-5 lg:gap-6">
                <div className="col-span-1 md:col-span-2">
                    <label className={`${primaryLabelClass} mb-2`}>Owner Full Name</label>
                    <input
                        type="text"
                        value={localOwnerInfo.fullName || ''}
                        onChange={(e) => updateOwnerField('fullName', e.target.value)}
                        className="w-full bg-[#F6F5F4] border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all"
                        placeholder="John Doe"
                    />
                </div>
                <div>
                    <label className={`${primaryLabelClass} mb-2`}>Title / Role</label>
                    <input
                        type="text"
                        value={localOwnerInfo.title || ''}
                        onChange={(e) => updateOwnerField('title', e.target.value)}
                        className={`w-full border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all ${!localOwnerInfo.title ? 'bg-[#F6F5F4] placeholder-[#FF4306]' : 'bg-[#F6F5F4] text-black'}`}
                        placeholder="CEO, Owner, etc."
                    />
                    {!localOwnerInfo.title && (
                        <p className="text-xs text-orange-600 mt-1 font-medium">Required for funding</p>
                    )}
                </div>
                <div>
                    <label className={`${primaryLabelClass} mb-2`}>Cell Phone</label>
                    <input
                        type="tel"
                        value={localOwnerInfo.cellPhone || ''}
                        onChange={(e) => updateOwnerField('cellPhone', sanitizePhoneInput(e.target.value))}
                        onBlur={() => {
                            const result = verifyPhoneNumber(localOwnerInfo.cellPhone || '');
                            if (result.isValid) {
                                updateOwnerField('cellPhone', result.formatted || formatNormalizedPhone(result.normalized));
                            }
                        }}
                        inputMode="tel"
                        className={`w-full border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all ${!localOwnerInfo.cellPhone ? 'bg-[#F6F5F4] placeholder-[#FF4306]' : 'bg-[#F6F5F4] text-black'}`}
                        placeholder="(555) 555-5555"
                    />
                    {!localOwnerInfo.cellPhone && (
                        <p className="text-xs text-orange-600 mt-1 font-medium">Required for funding</p>
                    )}
                    <PhoneVerificationBadge
                        verification={ownerPhoneVerification}
                        apiVerification={ownerPhoneApiVerification}
                        isChecking={isCheckingOwnerPhone}
                        label="Owner phone"
                    />
                </div>
                <div className="col-span-1 md:col-span-2">
                    <AddressAutocomplete
                        label="Owner's Home Address"
                        value={localOwnerInfo.homeAddress || ''}
                        onChange={(address, city, state, zip) => {
                            setIsDirty(true);
                            setLocalOwnerInfo(prev => ({
                                ...prev,
                                homeAddress: `${address}, ${city}, ${state} ${zip}`
                            }));
                        }}
                        placeholder="Street Address, City, State, Zip"
                    />
                    {!localOwnerInfo.homeAddress && (
                        <p className="text-xs text-orange-600 mt-1 font-medium">Required for funding</p>
                    )}
                </div>
                <div>
                    <label className={`${primaryLabelClass} mb-2`}>Social Security Number</label>
                    <input
                        type="text"
                        value={localOwnerInfo.ssn || ''}
                        onChange={(e) => updateOwnerField('ssn', formatSsn(e.target.value))}
                        onBlur={() => {
                            if (localOwnerInfo.ssn) {
                                const result = verifySsn(localOwnerInfo.ssn);
                                if (result.isValid) {
                                    updateOwnerField('ssn', result.formatted);
                                }
                            }
                        }}
                        inputMode="numeric"
                        pattern="\\d{3}-\\d{2}-\\d{4}"
                        className={`w-full border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all ${!localOwnerInfo.ssn ? 'bg-[#F6F5F4] placeholder-[#FF4306]' : 'bg-[#F6F5F4] text-black'}`}
                        placeholder="XXX-XX-XXXX"
                    />
                    {!localOwnerInfo.ssn && (
                        <p className="text-xs text-orange-600 mt-1 font-medium">Required for funding</p>
                    )}
                    {localOwnerInfo.ssn && !ssnVerification.isValid && (
                        <p className="text-xs text-orange-600 mt-1 font-medium">{ssnVerification.reason}</p>
                    )}
                </div>
                <div className="col-span-1 md:col-span-2 mt-4">
                    <label className={`${primaryLabelClass} mb-4`}>Verification Document</label>
                    <DocumentCard
                        title="Photo ID"
                        description="A clear photo of your driver's license or passport."
                        type="photo_id"
                        isUploaded={applicationStatus.documents.some(d => d.type === 'photo_id')}
                        documents={applicationStatus.documents.filter(d => d.type === 'photo_id')}
                    />
                </div>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                    onClick={() => handleSaveSection('owner-information')}
                    className="w-full sm:w-auto px-6 py-3 bg-black text-white rounded-full font-bold text-sm hover:bg-gray-800 transition-colors"
                >
                    Save Section
                </button>
            </div>
        </div>
    );

    // Render Helpers
    const sectionDetails: Record<string, { title: string, description: string, render: () => React.ReactNode }> = {
        'business-identity': {
            title: 'Business Identity',
            description: 'Upload voided check and complete business details.',
            render: renderBusinessIdentity
        },
        'contact-location': {
            title: 'Contact & Location',
            description: 'Fill in all contact information and business address.',
            render: renderContactLocation
        },
        'financial-information': {
            title: 'Financial Information',
            description: 'Upload merchant statements and fill in all financial details.',
            render: renderFinancialInformation
        },
        'equipment-information': {
            title: 'Equipment Information',
            description: 'Upload equipment photos and fill in all equipment details.',
            render: renderEquipmentInformation
        },
        'owner-information': {
            title: 'Owner Information',
            description: 'Upload photo ID and fill in all owner details.',
            render: renderOwnerInformation
        }
    };

    return (
        <div className="max-w-3xl mx-auto pb-20 px-4 sm:px-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center mb-12 gap-8 text-center"
            >
                <div>
                    <h2 className="text-5xl md:text-6xl font-bold font-poppins mb-4 text-black tracking-tight">Business Profile</h2>
                    <p className="text-xl md:text-2xl text-black/60 font-lora max-w-2xl mx-auto leading-relaxed">Securely manage your business credentials.</p>
                </div>
            </motion.div>

            <div className="space-y-6">
                {sectionOrder.map(sectionId => {
                    const details = sectionDetails[sectionId];
                    if (!details) return null;
                    return (
                        <motion.div
                            key={sectionId}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {renderSectionWrapper(sectionId, details.title, details.description, details.render())}
                        </motion.div>
                    );
                })}
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