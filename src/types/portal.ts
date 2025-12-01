export type ApplicationStage =
    | 'pending_documents'
    | 'in_review'
    | 'final_review'
    | 'approved'
    | 'action_required';

export type DocumentType = 'merchant_statements' | 'photo_id' | 'voided_check';

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
}

export interface BusinessInfo {
    businessName: string;
    industry: string;
    monthlyRevenue: number;
    yearsInBusiness: number;
    email: string;
    ownerName?: string;
    phone?: string;
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
    progressPercentage: number;
}

export const DOCUMENT_REQUIREMENTS: Record<DocumentType, {
    title: string;
    description: string;
    acceptedFormats: string[];
}> = {
    merchant_statements: {
        title: 'Three Months Merchant Statements',
        description: 'Upload your last 3 months of credit card processing statements',
        acceptedFormats: ['.pdf', '.jpg', '.png']
    },
    photo_id: {
        title: 'Valid Photo ID',
        description: 'Driver\'s license, passport, or state ID',
        acceptedFormats: ['.pdf', '.jpg', '.png']
    },
    voided_check: {
        title: 'Voided Check',
        description: 'A voided check for your business bank account',
        acceptedFormats: ['.pdf', '.jpg', '.png']
    }
};
