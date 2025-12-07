import { randomUUID } from "node:crypto";
import admin from "firebase-admin";
import { getAdminDb } from "./firebase-setup.mjs";

const APPLICATION_COLLECTION = "applications";

const baseSections = [
    {
        key: "business_identity",
        title: "Business Identity",
        description: "Matches the Business Identity card in the Portal.",
        fields: [
            { key: "businessName", label: "Legal / Corporate Name", required: true, value: "", helper: "As registered with the state." },
            { key: "dba", label: "DBA", required: false, value: "", helper: "If different from your legal name." },
            { key: "entityType", label: "Entity Type", required: true, value: "", helper: "LLC, S-Corp, C-Corp, Sole Prop, etc." },
            { key: "industry", label: "Industry", required: true, value: "", helper: "Retail, restaurant, professional services, etc." },
            { key: "businessStartDate", label: "Business Start Date", required: true, value: "", helper: "YYYY-MM-DD" },
            { key: "ein", label: "EIN", required: true, value: "", helper: "Nine digits, numbers only." },
        ],
    },
    {
        key: "contact_location",
        title: "Contact & Location",
        description: "Contact info and address used in the Portal profile.",
        fields: [
            { key: "physicalAddress", label: "Physical Business Address", required: true, value: "", helper: "Street address" },
            { key: "cityStateZip", label: "City, State, ZIP", required: true, value: "", helper: "City, state, and ZIP code" },
            { key: "businessPhone", label: "Business Phone", required: true, value: "", helper: "Formatted phone number" },
            { key: "email", label: "Business Email", required: true, value: "", helper: "Where Split can reach you" },
            { key: "website", label: "Website", required: false, value: "", helper: "Optional marketing or ordering site" },
        ],
    },
    {
        key: "financial_information",
        title: "Financial Information",
        description: "Processing volumes and product/service details.",
        fields: [
            { key: "monthlyRevenue", label: "Monthly Processing Volume", required: true, value: "", helper: "Average monthly sales" },
            { key: "annualRevenue", label: "Annual Revenue", required: true, value: "", helper: "Most recent full-year revenue" },
            { key: "averageTicketSize", label: "Average Ticket Size", required: true, value: "", helper: "Typical order amount" },
            { key: "highTicketAmount", label: "High Ticket Amount", required: true, value: "", helper: "Largest transaction size" },
            { key: "productServiceDescription", label: "Product / Service Description", required: true, value: "", helper: "What you sell or offer" },
        ],
    },
    {
        key: "equipment_information",
        title: "Equipment Information",
        description: "Matches the Equipment section in the Portal.",
        fields: [
            { key: "make", label: "Equipment Make", required: true, value: "", helper: "e.g. Clover, Verifone, Ingenico" },
            { key: "model", label: "Equipment Model", required: true, value: "", helper: "Device or POS model" },
            { key: "cardPresentPercentage", label: "Card-Present %", required: true, value: "", helper: "0-100" },
            { key: "cardNotPresentPercentage", label: "Card-Not-Present %", required: true, value: "", helper: "0-100" },
            { key: "equipmentTypes", label: "Equipment Types", required: false, value: "", helper: "Comma-separated (POS, countertop, mobile, etc.)" },
        ],
    },
    {
        key: "owner_information",
        title: "Owner Information",
        description: "Control person details from the Portal Owner card.",
        fields: [
            { key: "fullName", label: "Owner Full Name", required: true, value: "", helper: "As shown on legal ID" },
            { key: "title", label: "Title / Role", required: true, value: "", helper: "CEO, Owner, Managing Member, etc." },
            { key: "cellPhone", label: "Mobile Phone", required: true, value: "", helper: "SMS-capable number" },
            { key: "homeAddress", label: "Home Address", required: true, value: "", helper: "Street, city, state, ZIP" },
            { key: "ssn", label: "SSN", required: true, value: "", helper: "Numbers only" },
        ],
    },
];

const FIELD_PATHS = {
    business_identity: {
        businessName: ["businessInfo", "businessName"],
        dba: ["businessInfo", "dba"],
        entityType: ["businessInfo", "entityType"],
        industry: ["businessInfo", "industry"],
        businessStartDate: ["businessInfo", "businessStartDate"],
        ein: ["businessInfo", "ein"],
    },
    contact_location: {
        physicalAddress: ["contactInfo", "physicalAddress"],
        cityStateZip: ["contactInfo", "cityStateZip"],
        businessPhone: ["contactInfo", "businessPhone"],
        email: ["contactInfo", "email"],
        website: ["contactInfo", "website"],
    },
    financial_information: {
        monthlyRevenue: ["businessInfo", "monthlyRevenue"],
        annualRevenue: ["businessInfo", "annualRevenue"],
        averageTicketSize: ["businessInfo", "averageTicketSize"],
        highTicketAmount: ["businessInfo", "highTicketAmount"],
        productServiceDescription: ["businessInfo", "productServiceDescription"],
    },
    equipment_information: {
        make: ["equipmentInfo", "make"],
        model: ["equipmentInfo", "model"],
        cardPresentPercentage: ["equipmentInfo", "cardPresentPercentage"],
        cardNotPresentPercentage: ["equipmentInfo", "cardNotPresentPercentage"],
        equipmentTypes: ["equipmentInfo", "equipmentTypes"],
    },
    owner_information: {
        fullName: ["ownerInfo", "fullName"],
        title: ["ownerInfo", "title"],
        cellPhone: ["ownerInfo", "cellPhone"],
        homeAddress: ["ownerInfo", "homeAddress"],
        ssn: ["ownerInfo", "ssn"],
    },
};

const NUMBER_FIELDS = new Set([
    "monthlyRevenue",
    "annualRevenue",
    "averageTicketSize",
    "highTicketAmount",
]);

const PERCENT_FIELDS = new Set(["cardPresentPercentage", "cardNotPresentPercentage"]);
const ARRAY_FIELDS = new Set(["equipmentTypes"]);

function cloneSections() {
    return baseSections.map((section) => ({
        ...section,
        fields: section.fields.map((field) => ({ ...field })),
    }));
}

function getValueAtPath(data, path) {
    return path.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), data);
}

function setValueAtPath(data, path, value) {
    let ref = data;
    for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        if (typeof ref[key] !== "object" || ref[key] === null) {
            ref[key] = {};
        }
        ref = ref[key];
    }
    ref[path[path.length - 1]] = value;
}

function formatFieldValue(raw) {
    if (raw === undefined || raw === null) return "";
    if (Array.isArray(raw)) return raw.join(", ");
    return String(raw);
}

function normalizeFieldValue(sectionKey, fieldKey, raw) {
    const value = raw === undefined || raw === null ? "" : raw;

    if (ARRAY_FIELDS.has(fieldKey)) {
        if (Array.isArray(value)) return value;
        return String(value)
            .split(/[,;\n]/)
            .map((v) => v.trim())
            .filter(Boolean);
    }

    if (PERCENT_FIELDS.has(fieldKey)) {
        const num = Number(String(value).replace(/[^0-9.-]/g, ""));
        if (!Number.isFinite(num)) return "";
        return Math.min(100, Math.max(0, Math.round(num)));
    }

    if (NUMBER_FIELDS.has(fieldKey)) {
        const num = Number(String(value).replace(/[^0-9.-]/g, ""));
        return Number.isFinite(num) ? num : "";
    }

    return String(value).trim();
}

function hasValue(field) {
    const fieldValue = field?.value;
    if (fieldValue === null || fieldValue === undefined) return false;
    if (Array.isArray(fieldValue)) return fieldValue.length > 0;

    const asString = String(fieldValue).trim();
    if (asString.length === 0) return false;

    if (NUMBER_FIELDS.has(field.key)) {
        // Treat zero as incomplete for revenue/ticket fields to mirror the Portal UI.
        return asString !== "0";
    }

    // Percent fields can legitimately be 0/100, so count zero as provided.
    return true;
}

function computeCompletion(sections) {
    const totals = sections.reduce(
        (acc, section) => {
            section.fields.forEach((field) => {
                if (field.required) acc.required += 1;
                if (hasValue(field)) {
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
        section.fields.some((field) => field.required && !hasValue(field))
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

function createInitialApplicationData(email = "") {
    const now = admin.firestore.Timestamp.now();
    return {
        approvalAmount: 25000,
        stage: "pending_documents",
        progressPercentage: 0,
        businessInfo: {
            businessName: "",
            dba: "",
            entityType: "",
            industry: "",
            businessStartDate: "",
            ein: "",
            monthlyRevenue: 0,
            annualRevenue: 0,
            highTicketAmount: 0,
            averageTicketSize: 0,
            productServiceDescription: "",
        },
        contactInfo: {
            physicalAddress: "",
            cityStateZip: "",
            businessPhone: "",
            email,
            website: "",
        },
        ownerInfo: {
            fullName: "",
            title: "",
            cellPhone: "",
            homeAddress: "",
            ssn: "",
        },
        equipmentInfo: {
            make: "",
            model: "",
            cardPresentPercentage: 0,
            cardNotPresentPercentage: 0,
            equipmentTypes: [],
        },
        documents: [],
        messages: [],
        verificationInfo: {
            status: "pending",
            lastCheck: null,
        },
        createdAt: now,
        updatedAt: now,
        completedSections: [],
    };
}

async function resolveUserEmail(accountId) {
    try {
        const user = await admin.auth().getUser(accountId);
        return user.email || "";
    } catch (error) {
        console.warn(`[profile-state] Unable to resolve user email for ${accountId}:`, error.message);
        return "";
    }
}

function buildProfileFromApplication(appData, accountId) {
    const sections = cloneSections().map((section) => ({
        ...section,
        fields: section.fields.map((field) => {
            const path = FIELD_PATHS[section.key]?.[field.key];
            const rawValue = path ? getValueAtPath(appData, path) : undefined;
            return { ...field, value: formatFieldValue(rawValue) };
        }),
    }));

    const profile = {
        accountId,
        sections,
        lastSavedAt: appData.updatedAt?.toDate ? appData.updatedAt.toDate().toISOString() : new Date().toISOString(),
    };

    const summary = summarizeProfile(profile);
    return { ...profile, onboardingStatus: summary.onboardingStatus };
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
            requiredFieldsCompleted: section.fields.filter((field) => field.required && hasValue(field)).length,
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

async function loadProfile(accountId) {
    const db = getAdminDb();
    const docRef = db.collection(APPLICATION_COLLECTION).doc(accountId);
    let doc = await docRef.get();

    if (!doc.exists) {
        const email = await resolveUserEmail(accountId);
        const initial = createInitialApplicationData(email);
        await docRef.set(initial);
        doc = await docRef.get();
    }

    return buildProfileFromApplication(doc.data(), accountId);
}

async function resetProfile(accountId) {
    const db = getAdminDb();
    const docRef = db.collection(APPLICATION_COLLECTION).doc(accountId);
    const doc = await docRef.get();
    const existing = doc.exists ? doc.data() : {};
    const email = existing?.contactInfo?.email || (await resolveUserEmail(accountId));
    const initial = createInitialApplicationData(email);

    const resetData = {
        ...existing,
        ...initial,
        documents: existing?.documents ?? [],
        messages: existing?.messages ?? [],
        approvalAmount: existing?.approvalAmount ?? initial.approvalAmount,
        createdAt: existing?.createdAt ?? initial.createdAt,
    };

    await docRef.set(resetData, { merge: false });
    return buildProfileFromApplication(resetData, accountId);
}

async function updateField(accountId, sectionKey, fieldKey, value) {
    const db = getAdminDb();
    const docRef = db.collection(APPLICATION_COLLECTION).doc(accountId);
    const userEmail = await resolveUserEmail(accountId);

    return await db.runTransaction(async (t) => {
        const doc = await t.get(docRef);
        const exists = doc.exists;
        const current = exists ? doc.data() : createInitialApplicationData(userEmail);

        const path = FIELD_PATHS[sectionKey]?.[fieldKey];
        if (!path) throw new Error(`Unknown field: ${sectionKey}.${fieldKey}`);

        const normalized = normalizeFieldValue(sectionKey, fieldKey, value);
        setValueAtPath(current, path, normalized);

        if (!current.contactInfo) current.contactInfo = {};
        if (!current.contactInfo.email && userEmail) current.contactInfo.email = userEmail;

        const timestamp = admin.firestore.Timestamp.now();
        current.updatedAt = timestamp;

        if (exists) {
            const payload = { updatedAt: timestamp, [path.join(".")]: normalized };
            t.set(docRef, payload, { merge: true });
        } else {
            t.set(docRef, current, { merge: false });
        }

        return buildProfileFromApplication(current, accountId);
    });
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
