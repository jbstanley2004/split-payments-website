
export interface UserProfile {
    name?: string;
    email?: string;
    phone?: string;
    businessName?: string;
    monthlyRevenue?: number;
    timeInBusiness?: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    verified: boolean;
}

export interface Quote {
    amount: number;
    term: string;
    rate: string;
    repaymentSchedule: string;
}

export interface ApplicationData {
    // Business Info
    legalName: string;
    dba: string;
    address: string;
    cityStateZip: string;
    phone: string;
    email: string;
    ein: string;
    startDate: string;
    website: string;
    entityType: string;
    businessType: string;
    productSold: string;

    // Financials
    processingCompany: string;
    monthlyVolume: string;
    outstandingBalance: string;
    requestedAmount: string;

    // Owner
    ownerName: string;
    ownershipPercentage: string;
    homeAddress: string;
    ownerCityStateZip: string;
    ssn: string;
    dob: string;
    cellPhone: string;

    // Auth
    authorized: boolean;
}

export interface Message {
    id: string;
    role: 'user' | 'model';
    text: string;
    isThinking?: boolean;
    quoteData?: Quote;
    isApplicationWizard?: boolean; // Triggers the UI wizard
    isAuthFlow?: boolean; // Triggers the Auth UI
    attachment?: {
        name: string;
        type: string;
        data: string; // base64
    };
}

export enum AppState {
    IDLE,
    COLLECTING_LEAD,
    CONSULTING,
    QUOTING,
    APPLYING
}
