import { NextResponse } from "next/server";
import { OnboardingData } from "@/contexts/onboarding-context";

interface ChatRequestBody {
  message?: string | null;
  data: Partial<OnboardingData> & { merchantStatements?: Array<{ name: string; size: number }> };
  uploads?: Array<{
    id?: string;
    name: string;
    size: number;
    status?: string;
    extracted?: string;
  }>;
  adminConfig?: {
    model?: string;
    projectId?: string;
  };
}

function sanitize(text?: string | null) {
  return (text || "").trim();
}

function pullValue(text: string, patterns: RegExp[]): string | undefined {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match?.[1]) {
      return match[1].trim();
    }
  }
  return undefined;
}

function extractUpdates(message: string): Partial<OnboardingData> {
  const lower = message.toLowerCase();
  const updates: Partial<OnboardingData> = {};

  const legalName = pullValue(message, [
    /legal name is ([^.,\n]+)/i,
    /company is ([^.,\n]+)/i,
    /business is ([^.,\n]+)/i,
  ]);
  if (legalName) updates.legalName = legalName;

  const ownerMatch = message.match(/owner(?: is|:)?\s*([A-Za-z\s']+)(?:.*?(\d{1,3})%)/i);
  if (ownerMatch) {
    updates.ownerName = ownerMatch[1].trim();
    updates.ownershipPercentage = ownerMatch[2];
  }

  const revenueMatch = message.match(/\$?([\d,.]{4,})\s*(?:per month|a month|monthly|\/mo|month)/i);
  if (revenueMatch) {
    updates.monthlyRevenue = revenueMatch[1].replace(/,/g, "");
  }

  const processorBank = [
    "stripe",
    "square",
    "adyen",
    "worldpay",
    "checkout",
    "braintree",
    "chase",
    "first data",
    "fiserv",
  ];
  const processor = processorBank.find(name => lower.includes(name));
  if (processor) updates.currentProcessor = processor
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const cityStateMatch = message.match(/in ([A-Za-z\s]+),?\s*([A-Za-z]{2})/i);
  if (cityStateMatch) {
    updates.businessCity = cityStateMatch[1].trim();
    updates.businessState = cityStateMatch[2];
  }

  return updates;
}

function describeMissing(
  data: Partial<OnboardingData> & { merchantStatements?: Array<{ name: string; size: number }> },
  uploads: ChatRequestBody["uploads"],
  updates: Partial<OnboardingData>
) {
  const hasBusiness = Boolean(data.legalName || updates.legalName);
  const hasOwner = Boolean((data.ownerName || updates.ownerName) && (data.ownershipPercentage || updates.ownershipPercentage));
  const hasRevenue = Boolean(data.monthlyRevenue || updates.monthlyRevenue);
  const hasProcessor = Boolean(data.currentProcessor || updates.currentProcessor);
  const hasDocs = Boolean(uploads?.some(file => file.status === "parsed"));
  const needsConsent = !data.ownerSignature;

  const missing: string[] = [];
  if (!hasBusiness) missing.push("legal business name");
  if (!hasOwner) missing.push("primary owner & % ownership");
  if (!hasRevenue) missing.push("monthly card revenue");
  if (!hasProcessor) missing.push("current processor");
  if (!hasDocs) missing.push("a recent statement or ID upload");
  if (needsConsent) missing.push("owner consent");

  return missing;
}

function buildReply(options: {
  message?: string;
  data: Partial<OnboardingData> & { merchantStatements?: Array<{ name: string; size: number }> };
  uploads?: ChatRequestBody["uploads"];
  updates: Partial<OnboardingData>;
  adminConfig?: ChatRequestBody["adminConfig"];
}) {
  const { message, data, uploads = [], updates, adminConfig } = options;
  const missing = describeMissing(data, uploads, updates);

  if (!message) {
    const intro =
      "I’m Split Copilot. I’ll take your onboarding from start to finish here—just chat back when you’re ready.";
    const prompt = missing.length
      ? `To begin, share your ${missing[0]} and drag a statement or ID. I’ll fill everything else automatically.`
      : "You can upload a statement or confirm the final consent and I’ll publish the bundle.";
    return {
      reply: `${intro} ${prompt}`,
      detail: adminConfig?.model
        ? `Using ${adminConfig.model} via project ${adminConfig.projectId || "split-onboarding-app"}.`
        : "I’ll keep the flow focused on KYB, uploads, and consent—no other prompts needed.",
      updates,
    };
  }

  const confirmations: string[] = [];
  if (updates.legalName) confirmations.push(`legal name set to ${updates.legalName}`);
  if (updates.ownerName && updates.ownershipPercentage) confirmations.push(`owner ${updates.ownerName} at ${updates.ownershipPercentage}%`);
  if (updates.monthlyRevenue) confirmations.push(`monthly revenue captured as $${Number(updates.monthlyRevenue).toLocaleString()}`);
  if (updates.currentProcessor) confirmations.push(`processor noted as ${updates.currentProcessor}`);

  const parts = [
    confirmations.length
      ? `Got it—${confirmations.join(", ")}.`
      : "Thanks, I’m keeping everything in the onboarding record.",
  ];

  if (uploads.length) {
    const parsedUploads = uploads.filter(file => file.status === "parsed");
    if (parsedUploads.length) {
      parts.push(
        `${parsedUploads.length} file${parsedUploads.length > 1 ? "s" : ""} parsed. Revenue, processor, and ownership evidence are attached to this session.`
      );
    }
  }

  if (missing.length === 0) {
    parts.push("All core items are captured. I can prepare the consent packet and ready the ChatGPT + embed deployment next.");
  } else {
    const topTwo = missing.slice(0, 2).join(" and ");
    parts.push(`Next, I still need ${topTwo}. You can type it or drop a document and I’ll extract it.`);
  }

  return {
    reply: parts.join(" "),
    detail: "Everything remains conversational—no buttons or forms, just the chat thread handling KYB, uploads, and consent.",
    updates,
  };
}

export async function POST(request: Request) {
  const body = (await request.json()) as ChatRequestBody;
  const message = sanitize(body.message);
  const data = body.data;
  const uploads = body.uploads || [];
  const adminConfig = body.adminConfig;

  const updates = message ? extractUpdates(message) : {};
  const response = buildReply({ message, data, uploads, updates, adminConfig });

  return NextResponse.json(response);
}
