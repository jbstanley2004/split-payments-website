import { randomUUID } from "node:crypto";
import { getAdminDb } from "./firebase-setup.mjs";

const COLLECTION_NAME = "mcp_business_profiles";

const baseSections = [
    {
        key: "business_identity",
        title: "Business Identity",
        description: "Business basics that mirror the Portal's Business Identity card.",
        fields: [
            { key: "legalName", label: "Legal business name", required: true, value: "", helper: "Matches your government registration." },
            { key: "dba", label: "Doing business as (DBA)", required: false, value: "", helper: "Leave blank if the same as legal name." },
            { key: "entityType", label: "Entity type", required: true, value: "", helper: "LLC, corporation, nonprofit, or sole proprietorship." },
            { key: "ein", label: "Tax ID (EIN)", required: true, value: "", helper: "Nine digits with no dashes." },
            { key: "businessStartDate", label: "Business start date", required: false, value: "", helper: "Month/day/year your operations began." }
        ],
    },
    {
        key: "contact_location",
        title: "Contact & Location",
        description: "Contact and address details from the Portal profile tab.",
        fields: [
            { key: "physicalAddress", label: "Physical business address", required: true, value: "", helper: "Street, suite, and city information." },
            { key: "cityStateZip", label: "City, state, ZIP", required: true, value: "", helper: "Matches your billing and mailing location." },
            { key: "businessPhone", label: "Business phone", required: true, value: "", helper: "Include country code if international." },
            { key: "supportEmail", label: "Support email", required: true, value: "", helper: "Where customers and Split can reach you." },
            { key: "website", label: "Website", required: false, value: "", helper: "Primary marketing or ordering site." },
        ],
    },
    {
        key: "financial_information",
        title: "Financial Information",
        description: "Banking and processing details used during underwriting.",
        fields: [
            { key: "monthlyRevenue", label: "Monthly revenue", required: true, value: "", helper: "Average monthly sales volume." },
            { key: "annualRevenue", label: "Annual revenue", required: true, value: "", helper: "Most recent full-year revenue." },
            { key: "averageTicketSize", label: "Average ticket size", required: true, value: "", helper: "Typical order amount." },
            { key: "highTicketAmount", label: "Highest ticket amount", required: true, value: "", helper: "Largest transaction you process." },
            { key: "statementUrl", label: "Merchant statements link", required: false, value: "", helper: "URL where recent statements live." },
        ],
    },
    {
        key: "equipment_information",
        title: "Equipment Information",
        description: "Hardware split between card-present and card-not-present sales.",
        fields: [
            { key: "terminalMake", label: "Terminal make", required: true, value: "", helper: "Example: Verifone, Clover, Ingenico." },
            { key: "terminalModel", label: "Terminal model", required: true, value: "", helper: "Model or SKU used in your stores." },
            { key: "cardPresentPercentage", label: "Card-present %", required: true, value: "", helper: "Percent of transactions that are swiped, dipped, or tapped." },
            { key: "cardNotPresentPercentage", label: "Card-not-present %", required: true, value: "", helper: "Percent of transactions keyed or online." },
            { key: "equipmentTypes", label: "Equipment types", required: false, value: "", helper: "POS, terminals, mobile readers, etc." },
        ],
    },
    {
        key: "owner_information",
        title: "Owner Information",
        description: "Control person identity that matches the Portal owner card.",
        fields: [
            { key: "ownerName", label: "Owner full name", required: true, value: "", helper: "As shown on legal ID." },
            { key: "title", label: "Title", required: true, value: "", helper: "Role at the business (e.g., CEO, Managing Member)." },
            { key: "cellPhone", label: "Mobile phone", required: true, value: "", helper: "Use a number we can text for verification." },
            { key: "homeAddress", label: "Home address", required: true, value: "", helper: "Street, city, state, and ZIP." },
            { key: "ssn", label: "SSN (last 4 ok)", required: true, value: "", helper: "Numbers only; no dashes." },
        ],
    },
];

function cloneSections() {
    return baseSections.map((section) => ({
        ...section,
        fields: section.fields.map((field) => ({ ...field })),
    }));
}

function createProfileData(accountId) {
    return {
        accountId,
        onboardingStatus: "in_progress",
        sections: cloneSections(),
        lastSavedAt: new Date().toISOString(),
    };
}

function computeCompletion(sections) {
    const totals = sections.reduce(
        (acc, section) => {
            section.fields.forEach((field) => {
                if (field.required) acc.required += 1;
                if (field.value && field.value.trim().length > 0) {
                    acc.completed += 1;
                    if (field.required) acc.requiredCompleted += 1;
                }
            });
            return acc;
        },
        { required: 0, completed: 0, requiredCompleted: 0 }
    );

    const allFieldsCount = sections.reduce((sum, s) => sum + s.fields.length, 0);
    const completion = allFieldsCount === 0 ? 0 : Math.round((totals.completed / allFieldsCount) * 100);
    const requiredCompletion = totals.required === 0 ? 0 : Math.round((totals.requiredCompleted / totals.required) * 100);

    return { completion, requiredCompletion };
}

function summarizeProfile(profile) {
    const { completion, requiredCompletion } = computeCompletion(profile.sections);
    const firstIncomplete = profile.sections.find((section) =>
        section.fields.some((field) => field.required && !field.value)
    );

    return {
        accountId: profile.accountId,
        onboardingStatus: firstIncomplete ? "in_progress" : "complete",
        nextSection: firstIncomplete ? { key: firstIncomplete.key, title: firstIncomplete.title } : null,
        completionPercent: completion,
        requiredCompletionPercent: requiredCompletion,
    };
}

function generateAccountId() {
    return randomUUID();
}

async function loadProfile(accountId) {
    const db = getAdminDb();
    const docRef = db.collection(COLLECTION_NAME).doc(accountId);
    const doc = await docRef.get();

    if (!doc.exists) {
        const newProfile = createProfileData(accountId);
        await docRef.set(newProfile);
        return newProfile;
    }

    return doc.data();
}

async function resetProfile(accountId) {
    const db = getAdminDb();
    const docRef = db.collection(COLLECTION_NAME).doc(accountId);
    const newProfile = createProfileData(accountId);
    await docRef.set(newProfile);
    return newProfile;
}

async function updateField(accountId, sectionKey, fieldKey, value) {
    const db = getAdminDb();
    const docRef = db.collection(COLLECTION_NAME).doc(accountId);

    return await db.runTransaction(async (t) => {
        const doc = await t.get(docRef);
        let profile;

        if (!doc.exists) {
            profile = createProfileData(accountId);
        } else {
            profile = doc.data();
        }

        const section = profile.sections.find((s) => s.key === sectionKey);
        if (!section) throw new Error(`Unknown section: ${sectionKey}`);

        const field = section.fields.find((f) => f.key === fieldKey);
        if (!field) throw new Error(`Unknown field: ${fieldKey}`);

        field.value = value;
        profile.lastSavedAt = new Date().toISOString();

        t.set(docRef, profile);
        return profile;
    });
}

function buildStructuredContent(profile) {
    const summary = summarizeProfile(profile);
    return {
        accountId: profile.accountId,
        onboardingStatus: summary.onboardingStatus,
        completionPercent: summary.completionPercent,
        requiredCompletionPercent: summary.requiredCompletionPercent,
        nextSection: summary.nextSection,
        updatedAt: profile.lastSavedAt,
        sections: profile.sections.map((section) => ({
            key: section.key,
            title: section.title,
            requiredFieldsCompleted: section.fields.filter((field) => field.required && field.value).length,
            totalRequiredFields: section.fields.filter((field) => field.required).length,
        })),
    };
}

function buildMeta(profile) {
    return {
        accountId: profile.accountId,
        sections: profile.sections,
        lastSavedAt: profile.lastSavedAt,
    };
}

export {
    buildMeta,
    buildStructuredContent,
    generateAccountId,
    loadProfile,
    resetProfile,
    summarizeProfile,
    updateField,
};