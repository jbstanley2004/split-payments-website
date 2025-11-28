import { NextResponse } from "next/server";
import { OnboardingData } from "@/contexts/onboarding-context";

interface UploadSummary {
  id: string;
  name: string;
  size: number;
  status: "parsed";
  extracted: string;
}

async function synthesizeUpdates(files: File[]): Promise<Partial<OnboardingData>> {
  const updates: Partial<OnboardingData> = {};
  const textBlobs = await Promise.all(files.map(file => file.text().catch(() => "")));
  const combined = `${files.map(file => file.name.toLowerCase()).join(" ")} ${textBlobs.join(" ").toLowerCase()}`;

  if (combined.includes("stripe")) updates.currentProcessor = "Stripe";
  if (combined.includes("square")) updates.currentProcessor = "Square";
  if (combined.includes("adyen")) updates.currentProcessor = "Adyen";
  if (combined.includes("worldpay")) updates.currentProcessor = "Worldpay";

  const revenueHint = combined.match(/\$?([\d,.]{4,})(?:\s*(?:per month|month|\/mo|monthly|mrr|card volume))/i);
  if (revenueHint) updates.monthlyRevenue = revenueHint[1].replace(/,/g, "");

  const ownerHint = combined.match(/owner[:\s]+([A-Za-z\s']+)(?:.*?(\d{1,3})%)/i);
  if (ownerHint) {
    updates.ownerName = ownerHint[1].trim();
    updates.ownershipPercentage = ownerHint[2];
  }

  return updates;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const files = formData.getAll("files").filter(Boolean) as File[];

  if (!files.length) {
    return NextResponse.json({ error: "No files provided" }, { status: 400 });
  }

  const uploads: UploadSummary[] = files.map(file => ({
    id: `${file.name}-${file.size}-${Date.now()}`,
    name: file.name,
    size: file.size,
    status: "parsed",
    extracted: "Parsed for revenue, processor history, and ownership evidence",
  }));

  const updates = await synthesizeUpdates(files);
  const reply = `I parsed ${uploads.length} file${uploads.length > 1 ? "s" : ""}. I’ll use them to prefill revenue, processor, and owner details.`;

  return NextResponse.json({ uploads, updates, reply });
}
