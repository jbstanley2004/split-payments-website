import { randomUUID } from "node:crypto";
import { getAdminDb } from "./firebase-setup.mjs";

const COLLECTION_NAME = "mcp_business_profiles";

const baseSections = [
    {
        key: "business_profile",
        title: "Business profile",
        description: "Ownership, entity basics, and brand information used during onboarding.",
        fields: [
            { key: "legalName", label: "Legal business name", required: true, value: "", helper: "Matches your government registration." },
            { key: "entityType", label: "Entity type", required: true, value: "", helper: "LLC, corporation, nonprofit, or sole proprietorship." },
            { key: "ein", label: "Tax ID (EIN)", required: true, value: "", helper: "Nine digits with no dashes." },
            { key: "website", label: "Website", required: false, value: "", helper: "Use your primary marketing or ordering site." },
            { key: "brands", label: "Brands sold", required: false, value: "", helper: "Comma-separated list of consumer-facing names." }
        ],
    },
    {
        key: "contact",
        title: "Contact & operations",
        description: "Details that appear on invoices and in the Portal profile.",
        fields: [
            { key: "contactName", label: "Primary contact name", required: true, value: "", helper: "Person responsible for payment communications." },
            { key: "email", label: "Contact email", required: true, value: "", helper: "Used for statements and account alerts." },
            { key: "phone", label: "Phone number", required: false, value: "", helper: "Include country code if international." },
            { key: "supportHours", label: "Support hours", required: false, value: "", helper: "Displayed in the portal profile card." }
        ],
    },
    {
        key: "payments",
        title: "Settlement & payments",
        description: "Where we send payouts and who signs the merchant agreement.",
        fields: [
            { key: "bank", label: "Bank name", required: true, value: "", helper: "Financial institution for settlements." },
            { key: "routing", label: "Routing number", required: true, value: "", helper: "Nine digits for ACH transfers." },
            { key: "account", label: "Account number", required: true, value: "", helper: "Do not include spaces or dashes." },
            { key: "signer", label: "Authorized signer", required: true, value: "", helper: "Person with authority to sign for the entity." }
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