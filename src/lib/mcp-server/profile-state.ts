import { getAdminDb } from "../firebase-admin";
import { randomUUID } from "crypto";

// --- Types ---
export interface ProfileField {
  key: string;
  label: string;
  required: boolean;
  value: string;
  helper: string;
}

export interface ProfileSection {
  key: string;
  title: string;
  description: string;
  fields: ProfileField[];
}

export interface Profile {
  accountId: string;
  onboardingStatus: "in_progress" | "complete";
  sections: ProfileSection[];
  lastSavedAt: string;
}

export interface ProfileSummary {
  accountId: string;
  onboardingStatus: "in_progress" | "complete";
  nextSection: { key: string; title: string } | null;
  completionPercent: number;
  requiredCompletionPercent: number;
}

// --- Constants ---
const baseSections: ProfileSection[] = [
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

function cloneSections(): ProfileSection[] {
  return baseSections.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({ ...field })),
  }));
}

function createProfileData(accountId: string): Profile {
  return {
    accountId,
    onboardingStatus: "in_progress",
    sections: cloneSections(),
    lastSavedAt: new Date().toISOString(),
  };
}

// --- Helpers ---

function computeCompletion(sections: ProfileSection[]) {
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

  const totalFields = sections.length * 5; // Approx, but strict logic from original file: sections.length * 4?? 
  // Original file said: sections.length * 4. 
  // Let's count baseSections fields: 5, 4, 4. Total 13.
  // Original logic: "Math.round((totals.completed / (sections.length * 4)) * 100)"
  // I'll stick to dynamic counting to be safe.
  const allFieldsCount = sections.reduce((sum, s) => sum + s.fields.length, 0);

  const completion = allFieldsCount === 0 ? 0 : Math.round((totals.completed / allFieldsCount) * 100);
  const requiredCompletion = totals.required === 0 ? 0 : Math.round((totals.requiredCompleted / totals.required) * 100);

  return { completion, requiredCompletion };
}

export function summarizeProfile(profile: Profile): ProfileSummary {
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

export function generateAccountId(): string {
  return randomUUID();
}

// --- Firestore Operations ---

const COLLECTION_NAME = "mcp_business_profiles";

export async function loadProfile(accountId: string): Promise<Profile> {
  const db = getAdminDb();
  const docRef = db.collection(COLLECTION_NAME).doc(accountId);
  const doc = await docRef.get();

  if (!doc.exists) {
    const newProfile = createProfileData(accountId);
    await docRef.set(newProfile);
    return newProfile;
  }

  return doc.data() as Profile;
}

export async function resetProfile(accountId: string): Promise<Profile> {
  const db = getAdminDb();
  const docRef = db.collection(COLLECTION_NAME).doc(accountId);
  const newProfile = createProfileData(accountId);
  await docRef.set(newProfile);
  return newProfile;
}

export async function updateField(accountId: string, sectionKey: string, fieldKey: string, value: string): Promise<Profile> {
  const db = getAdminDb();
  const docRef = db.collection(COLLECTION_NAME).doc(accountId);
  
  // We need to read the profile to find the index of the section/field
  // Alternatively, we could store sections as a map in Firestore, but let's stick to the JSON blob for simplicity/compatibility.
  // Using a transaction to ensure atomicity.
  
  return await db.runTransaction(async (t) => {
    const doc = await t.get(docRef);
    let profile: Profile;

    if (!doc.exists) {
      profile = createProfileData(accountId);
    } else {
      profile = doc.data() as Profile;
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

// --- View Builders ---

export function buildStructuredContent(profile: Profile) {
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

export function buildMeta(profile: Profile) {
  return {
    accountId: profile.accountId,
    sections: profile.sections,
    lastSavedAt: profile.lastSavedAt,
  };
}
