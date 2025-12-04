export type ApplicationStage =
    | 'pending_documents'
    | 'in_review'
    | 'final_review'
    | 'approved'
    | 'action_required';

export type DocumentType = 'merchant_statements' | 'photo_id' | 'voided_check' | 'equipment_photo';

export type DocumentStatus = 'uploaded' | 'verified' | 'rejected';

export interface Document {
    id: string;
    type: DocumentType;
    filename: string;
    uploadedAt: Date;
    status: DocumentStatus;
    fileSize?: number;
    fileUrl?: string;
}

export interface Message {
    id: string;
    subject: string;
    body: string;
    timestamp: Date;
    read: boolean;
    category: 'updates' | 'action_required' | 'general';
    actionUrl?: string;
    sender: 'admin' | 'merchant';
    isDeleted?: boolean;
}

export interface BusinessInfo {
    businessName: string;
    dba?: string;
    entityType?: string;
    industry: string;
    businessStartDate?: string;
    ein?: string;
    monthlyRevenue: number;
    yearsInBusiness: number;
    email: string;
    ownerName?: string;
    phone?: string;
    averageTicketSize?: number;
    highTicketAmount?: number;
    annualRevenue?: number;
    productServiceDescription?: string;
}

export interface ContactInfo {
    physicalAddress?: string;
    cityStateZip?: string;
    businessPhone?: string;
    email: string;
    website?: string;
}

export interface OwnerInfo {
    fullName?: string;
    title?: string;
    cellPhone?: string;
    homeAddress?: string;
    homeCityStateZip?: string;
    ssn?: string;
}

export interface EquipmentInfo {
    make: string;
    model: string;
    photoUrl?: string;
    cardPresentPercentage?: number;
    cardNotPresentPercentage?: number;
    equipmentTypes?: string[];
}

export interface VerificationInfo {
    ein?: string;
    ssn?: string;
    completed: boolean;
}

export interface ApplicationStatus {
    stage: ApplicationStage;
    documents: Document[];
    verificationInfo: VerificationInfo;
    approvalAmount: number;
    messages: Message[];
    businessInfo: BusinessInfo;
    contactInfo?: ContactInfo;
    ownerInfo?: OwnerInfo;
    equipmentInfo?: EquipmentInfo;
    progressPercentage: number;
    adminViewed?: boolean;
}

export const DOCUMENT_REQUIREMENTS: Record<DocumentType, {
    title: string;
    description: string;
    acceptedFormats: string[];
}> = {
    merchant_statements: {
        title: 'Three Months Merchant Statements',
        description: 'Upload your last 3 months of credit card processing statements',
        acceptedFormats: ['.pdf', '.jpg', '.png', '.jpeg']
    },
    photo_id: {
        title: 'Valid Photo ID',
        description: 'Driver\'s license, passport, or state ID',
        acceptedFormats: ['.pdf', '.jpg', '.png', '.jpeg']
    },
    voided_check: {
        title: 'Voided Check',
        description: 'A voided check for your business bank account',
        acceptedFormats: ['.pdf', '.jpg', '.png', '.jpeg']
    },
    equipment_photo: {
        title: 'Equipment Photo',
        description: 'Photo of your current equipment',
        acceptedFormats: ['.jpg', '.png', '.jpeg']
    }
};
