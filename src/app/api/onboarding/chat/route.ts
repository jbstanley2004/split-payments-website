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

  const emailMatch = message.match(/([\w.-]+@[\w.-]+\.[A-Za-z]{2,})/);
  if (emailMatch) updates.businessEmail = emailMatch[1];

  const phoneMatch = message.match(/(?:\+?1\s*)?(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/);
  if (phoneMatch) updates.businessPhone = phoneMatch[1];

  const einMatch = message.match(/ein(?: is|:)?\s*(\d{2}[-\s]?\d{7})/i);
  if (einMatch) updates.ein = einMatch[1].replace(/\s|-/g, "");

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

function buildKnowledgeBaseReply(message: string) {
  const lower = message.toLowerCase();
  const entries: Array<{ test: (text: string) => boolean; answer: string }> = [
    {
      test: text => /how long|timeline|turnaround|time to|fast|quick/i.test(text),
      answer:
        "I start underwriting instantly. If your uploads are legible, approvals typically take a few minutes; bank verification can add a short delay but I keep you updated in this thread.",
    },
    {
      test: text => /what do you need|information|what else|anything else|next/i.test(text),
      answer:
        "I need a legal business name, the primary owner and percentage, monthly card volume, your current processor, and one recent statement or ID. If you drop a document, I'll parse it for you.",
    },
    {
      test: text => /security|secure|privacy|encrypted|pci/i.test(text),
      answer:
        "Uploads stay in an encrypted intake bucket and only power this onboarding. Keys and model settings live in the admin console; end-users never see them.",
    },
    {
      test: text => /gpt|model|which model|5\.1/i.test(text),
      answer:
        "You're paired with GPT 5.1 Mini for speed. I can be switched to GPT-4o tiers in the admin controls without interrupting this session.",
    },
    {
      test: text => /why upload|do i need a statement|statement/i.test(text),
      answer:
        "A recent statement or ID lets me verify revenue, processor history, and ownership faster. If you prefer, you can type the details instead and I'll proceed.",
    },
    {
      test: text => /consent|signature|sign/i.test(text),
      answer:
        "When we're done, I'll prepare a short consent message right here. You can type your name to sign, and I'll log the timestamp for underwriting.",
    },
    {
      test: text => /bank|deposit|funding|payout/i.test(text),
      answer:
        "Once approved, we confirm your settlement account securely. I’ll prompt for routing and account verification inside this chat when we reach that step.",
    },
  ];

  const match = entries.find(entry => entry.test(lower));
  if (match) return match.answer;

  if (/hello|hi|hey/i.test(lower)) {
    return "Hi—I'm Split Copilot. Ask me anything about your onboarding or drop a document and I'll take it from here.";
  }

  return `I can answer anything about onboarding, funding, and document handling. I also captured your question: "${message}"—I'll keep it in this thread while we move forward.`;
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
    const intro = "I’m Split Copilot. I’ll handle the entire onboarding for you in this chat.";
    const prompt = missing.length
      ? `Tell me your ${missing[0]} or drop a recent statement. I’ll auto-fill the rest as we talk.`
      : "Everything looks captured—confirm consent here and I’ll finalize your packet.";
    return {
      reply: `${intro} ${prompt}`,
      detail: adminConfig?.model
        ? `Running ${adminConfig.model} in project ${adminConfig.projectId || "split-onboarding-app"}.`
        : "I’m tuned for onboarding only—no prompts or menus needed.",
      updates,
    };
  }

  const confirmations: string[] = [];
  if (updates.legalName) confirmations.push(`legal name set to ${updates.legalName}`);
  if (updates.ownerName && updates.ownershipPercentage) confirmations.push(`owner ${updates.ownerName} at ${updates.ownershipPercentage}%`);
  if (updates.monthlyRevenue) confirmations.push(`monthly revenue captured as $${Number(updates.monthlyRevenue).toLocaleString()}`);
  if (updates.currentProcessor) confirmations.push(`processor noted as ${updates.currentProcessor}`);
  if (updates.businessEmail) confirmations.push(`contact email saved as ${updates.businessEmail}`);
  if (updates.businessPhone) confirmations.push(`business phone saved`);

  const isQuestion = /\?|how|what|when|why|who|where|which/i.test(message);
  const narrativeReply = isQuestion ? buildKnowledgeBaseReply(message) : undefined;

  const parts = [
    confirmations.length
      ? `Got it—${confirmations.join(", ")}.`
      : "Logged. I’m keeping everything in your onboarding record.",
    narrativeReply || "",
  ].filter(Boolean);

  if (uploads.length) {
    const parsedUploads = uploads.filter(file => file.status === "parsed");
    if (parsedUploads.length) {
      parts.push(
        `${parsedUploads.length} file${parsedUploads.length > 1 ? "s" : ""} parsed. I’m using them to prefill revenue, processor history, and ownership evidence.`
      );
    }
  }

  if (missing.length === 0) {
    parts.push("All required items are present. Ready for consent—type your name to sign, or ask me anything before we finalize.");
  } else {
    const topTwo = missing.slice(0, 2).join(" and ");
    parts.push(`Next, I still need ${topTwo}. Tell me in natural language or drop a file and I’ll extract it.`);
  }

  return {
    reply: parts.join(" "),
    detail: "Fully conversational. I answer questions, parse uploads, and keep this thread synced to your onboarding record.",
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
