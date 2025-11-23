"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface OnboardingData {
    // Business Basics
    legalName: string;
    dba: string;
    businessStreet: string;
    businessCity: string;
    businessState: string;
    businessZip: string;
    businessPhone: string;
    businessEmail: string;
    ein: string;
    startDate: string;

    // Business Details
    entityType: string;
    stateOfIncorporation: string;
    numberOfLocations: string;
    businessType: string;
    productsOrServices: string;
    website: string;

    // Owner Info
    ownerName: string;
    ownerTitle: string;
    ownershipPercentage: string;
    ownerStreet: string;
    ownerCity: string;
    ownerState: string;
    ownerZip: string;
    ownerDob: string;
    ownerCellPhone: string;
    ownerBusinessPhone: string;

    // Partners (array of partner objects)
    partners: Array<{
        name: string;
        title: string;
        ownership: string;
        street: string;
        city: string;
        state: string;
        zip: string;
        dob: string;
        cellPhone: string;
        businessPhone: string;
    }>;

    // Business References
    references: Array<{
        businessName: string;
        contactPerson: string;
        phone: string;
    }>;

    // Additional Info
    currentProcessor: string;
    monthlyRevenue: string;
    outstandingMcaBalance: string;

    // Citizenship
    ownerUsCitizen: string;

    // Authorization
    acceptTerms: boolean;
    ownerSignature: string;
    ownerSignatureDate: string;
    partnerSignature: string;
    partnerSignatureDate: string;
    agentName: string;
    agentPhone: string;
    agentEmail: string;

    // File uploads
    merchantStatements: File[];
}

interface OnboardingContextType {
    currentStep: number;
    data: OnboardingData;
    updateData: (updates: Partial<OnboardingData>) => void;
    nextStep: () => void;
    prevStep: () => void;
    goToStep: (step: number) => void;
    progress: number;
    totalSteps: number;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const initialData: OnboardingData = {
    legalName: '',
    dba: '',
    businessStreet: '',
    businessCity: '',
    businessState: '',
    businessZip: '',
    businessPhone: '',
    businessEmail: '',
    ein: '',
    startDate: '',
    entityType: '',
    stateOfIncorporation: '',
    numberOfLocations: '',
    businessType: '',
    productsOrServices: '',
    website: '',
    ownerName: '',
    ownerTitle: '',
    ownershipPercentage: '',
    ownerStreet: '',
    ownerCity: '',
    ownerState: '',
    ownerZip: '',
    ownerDob: '',
    ownerCellPhone: '',
    ownerBusinessPhone: '',
    partners: [],
    references: [
        { businessName: '', contactPerson: '', phone: '' },
        { businessName: '', contactPerson: '', phone: '' },
        { businessName: '', contactPerson: '', phone: '' },
    ],
    currentProcessor: '',
    monthlyRevenue: '',
    outstandingMcaBalance: '',
    ownerUsCitizen: '',
    acceptTerms: false,
    ownerSignature: '',
    ownerSignatureDate: '',
    partnerSignature: '',
    partnerSignatureDate: '',
    agentName: '',
    agentPhone: '',
    agentEmail: '',
    merchantStatements: [],
};

export function OnboardingProvider({ children }: { children: ReactNode }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [data, setData] = useState<OnboardingData>(initialData);
    const totalSteps = 8;

    const updateData = (updates: Partial<OnboardingData>) => {
        setData(prev => ({ ...prev, ...updates }));
    };

    const nextStep = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const goToStep = (step: number) => {
        if (step >= 0 && step < totalSteps) {
            setCurrentStep(step);
        }
    };

    const progress = ((currentStep + 1) / totalSteps) * 100;

    return (
        <OnboardingContext.Provider
            value={{
                currentStep,
                data,
                updateData,
                nextStep,
                prevStep,
                goToStep,
                progress,
                totalSteps,
            }}
        >
            {children}
        </OnboardingContext.Provider>
    );
}

export function useOnboarding() {
    const context = useContext(OnboardingContext);
    if (!context) {
        throw new Error('useOnboarding must be used within OnboardingProvider');
    }
    return context;
}
