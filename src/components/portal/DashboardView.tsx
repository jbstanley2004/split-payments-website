"use client";

import { ApplicationStatus } from "@/types/portal";
import { motion } from "framer-motion";
import { ArrowRight, Upload, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";

interface DashboardViewProps {
    applicationStatus: ApplicationStatus;
    onNavigate: (sectionId: string) => void;
}

export default function DashboardView({ applicationStatus, onNavigate }: DashboardViewProps) {
    const { approvalAmount, documents, businessInfo, contactInfo, ownerInfo, equipmentInfo } = applicationStatus;

    // Section completion checks - ALL fields must be filled and ALL documents uploaded
    const getSectionStatus = () => {
        const sections = [];

        // Business Identity - All required fields + voided check
        const hasVoidedCheck = documents.some(d => d.type === 'voided_check');
        const hasDba = !!businessInfo.dba;
        const hasEntityType = !!businessInfo.entityType;
        const hasIndustry = !!businessInfo.industry;
        const hasStartDate = !!businessInfo.businessStartDate;
        const hasEin = !!businessInfo.ein;
        const businessIdentityComplete = hasVoidedCheck && hasDba && hasEntityType && hasIndustry && hasStartDate && hasEin;
        if (!businessIdentityComplete) {
            sections.push({
                id: 'business-identity',
                title: 'Complete Business Identity',
                description: 'Upload voided check and complete all business details.',
                icon: Upload
            });
        }

        // Contact & Location - All contact fields (excluding optional fields)
        const hasPhysicalAddress = !!contactInfo?.physicalAddress;
        // cityStateZip can be on same line as physicalAddress, so it's somewhat optional
        const hasBusinessPhone = !!contactInfo?.businessPhone;
        const hasEmail = !!contactInfo?.email;
        // website is optional
        const contactLocationComplete = hasPhysicalAddress && hasBusinessPhone && hasEmail;
        if (!contactLocationComplete) {
            sections.push({
                id: 'contact-location',
                title: 'Complete Contact & Location',
                description: 'Fill in all contact information and business address.',
                icon: Upload
            });
        }

        // Financial Information - All financial fields + merchant statements
        const hasMerchantStatements = documents.some(d => d.type === 'merchant_statements');
        const hasMonthlyRevenue = !!businessInfo.monthlyRevenue;
        const hasAnnualRevenue = !!businessInfo.annualRevenue;
        const hasHighTicket = !!businessInfo.highTicketAmount;
        const hasAvgTicket = !!businessInfo.averageTicketSize;
        const hasDescription = !!businessInfo.productServiceDescription;
        const financialComplete = hasMerchantStatements && hasMonthlyRevenue && hasAnnualRevenue && hasHighTicket && hasAvgTicket && hasDescription;
        if (!financialComplete) {
            sections.push({
                id: 'financial-information',
                title: 'Complete Financial Information',
                description: 'Upload merchant statements and fill in all financial details.',
                icon: Upload
            });
        }

        // Equipment Information - All equipment fields + photo
        const hasEquipmentPhotos = documents.some(d => d.type === 'equipment_photo');
        const hasMake = !!equipmentInfo?.make;
        const hasModel = !!equipmentInfo?.model;
        const hasCardRatios = equipmentInfo?.cardPresentPercentage !== undefined &&
            equipmentInfo?.cardNotPresentPercentage !== undefined;
        const hasEquipmentTypes = equipmentInfo?.equipmentTypes && equipmentInfo.equipmentTypes.length > 0;
        const equipmentComplete = hasEquipmentPhotos && hasMake && hasModel && hasCardRatios && hasEquipmentTypes;
        if (!equipmentComplete) {
            sections.push({
                id: 'equipment-information',
                title: 'Complete Equipment Information',
                description: 'Upload equipment photos and fill in all equipment details.',
                icon: Upload
            });
        }

        // Owner Information - All owner fields + photo ID (excluding optional address line 2)
        const hasPhotoId = documents.some(d => d.type === 'photo_id');
        const hasFullName = !!ownerInfo?.fullName;
        const hasTitle = !!ownerInfo?.title;
        const hasCellPhone = !!ownerInfo?.cellPhone;
        const hasHomeAddress = !!ownerInfo?.homeAddress;
        // homeCityStateZip is optional (second address line)
        const hasSsn = !!ownerInfo?.ssn;
        const ownerComplete = hasPhotoId && hasFullName && hasTitle && hasCellPhone && hasHomeAddress && hasSsn;
        if (!ownerComplete) {
            sections.push({
                id: 'owner-information',
                title: 'Complete Owner Information',
                description: 'Upload photo ID and fill in all owner details.',
                icon: Upload
            });
        }

        return sections;
    };

    const incompleteSections = getSectionStatus();

    // Check for admin notifications that need attention
    const adminNotifications = applicationStatus.messages
        .filter(m => !m.read && m.sender === 'admin' && m.category !== 'updates')
        .map(m => ({
            id: m.id,
            title: m.subject,
            description: m.body,
            icon: AlertCircle,
            actionUrl: m.actionUrl
        }));

    const handleNavigateToSection = (sectionId: string) => {
        onNavigate(sectionId);
    };

    const handleNotificationClick = (notification: any) => {
        if (notification.actionUrl) {
            // Extract section ID if it's a profile link
            if (notification.actionUrl.includes('section=')) {
                const section = notification.actionUrl.split('section=')[1];
                onNavigate(section); // This will switch tab but section ID mapping might be needed if it's generic 'profile'
                // Actually onNavigate in parent handles 'profile' tab switch + scrolling if ID matches a section
                // If ID is just 'profile', it switches tab without scrolling
                // Currently onNavigate(sectionId) switches to 'profile' tab and sets targetSection=sectionId
            }
        } else {
            // Just switch to inbox if no specific action
            const inboxTab = document.querySelector('button[data-tab-id="inbox"]') as HTMLButtonElement;
            if (inboxTab) inboxTab.click();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-4xl mx-auto">
            {/* Hero Section - The Vault */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-center mb-16"
            >
                <div className="flex items-center justify-center gap-2 mb-6">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-medium text-black/40 uppercase tracking-widest font-poppins">
                        Capital Available
                    </span>
                </div>

                <h1 className="text-7xl md:text-9xl font-bold text-black font-poppins tracking-tighter mb-6">
                    ${(approvalAmount / 1000).toFixed(0)}k
                </h1>

                <p className="text-xl md:text-2xl text-black/60 font-lora max-w-2xl mx-auto leading-relaxed">
                    Pre-qualified based on your monthly revenue of <span className="text-black font-medium">${applicationStatus.businessInfo.monthlyRevenue.toLocaleString()}</span>.
                </p>
            </motion.div>

            {/* Multiple Notification Cards */}
            <div className="w-full max-w-3xl space-y-3 px-4">
                {/* Admin Notifications */}
                {adminNotifications.map((note, index) => (
                    <motion.div
                        key={note.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-center gap-3"
                    >
                        <div
                            onClick={() => handleNotificationClick(note)}
                            className="flex-1 bg-white rounded-[40px] p-2 pl-6 shadow-2xl border border-gray-100 flex items-center justify-between transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] cursor-pointer group border-l-4 border-l-[#FF4306]"
                        >
                            <div className="text-left py-2 pr-4">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF4306]">
                                        New Message
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-black font-poppins leading-none mb-1">
                                    {note.title}
                                </h3>
                                <p className="text-sm text-black/50 font-lora line-clamp-1">
                                    {note.description}
                                </p>
                            </div>

                            <button className="flex-shrink-0 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:bg-gray-900 shadow-md">
                                <ArrowRight className="w-6 h-6" />
                            </button>
                        </div>
                    </motion.div>
                ))}

                {/* Incomplete Sections */}
                {incompleteSections.map((section, index) => {
                    const SectionIcon = section.icon;
                    return (
                        <motion.div
                            key={section.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + (index * 0.1), duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="flex items-center gap-3"
                        >
                            {/* Right Content Pill */}
                            <div
                                onClick={() => handleNavigateToSection(section.id)}
                                className="flex-1 bg-white rounded-[40px] p-2 pl-6 shadow-2xl border border-gray-100 flex items-center justify-between transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] cursor-pointer group"
                            >
                                <div className="text-left py-2">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF4306]">
                                            Action Required
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-black font-poppins leading-none mb-1">
                                        {section.title}
                                    </h3>
                                    <p className="text-sm text-black/50 font-lora">
                                        {section.description}
                                    </p>
                                </div>

                                <button className="flex-shrink-0 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:bg-gray-900 shadow-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                                    </svg>
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
