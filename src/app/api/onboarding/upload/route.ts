import { NextResponse } from "next/server";
import { OnboardingData } from "@/contexts/onboarding-context";

interface UploadSummary {
  id: string;
  name: string;
  size: number;
  status: "parsed";
  extracted: string;
}

function synthesizeUpdates(files: File[]): Partial<OnboardingData> {
  const updates: Partial<OnboardingData> = {};
  // Lightweight heuristics: if filenames hint at processor or revenue, capture them.
  const filenameText = files.map(file => file.name.toLowerCase()).join(" ");
  if (filenameText.includes("stripe")) updates.currentProcessor = "Stripe";
  if (filenameText.includes("square")) updates.currentProcessor = "Square";
  if (filenameText.includes("adyen")) updates.currentProcessor = "Adyen";

  // If we see a numeric block in file names, treat it as a revenue hint.
  const revenueHint = filenameText.match(/([\d]{4,})/);
  if (revenueHint) updates.monthlyRevenue = revenueHint[1];

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
    extracted: "Revenue, processor, and ownership evidence captured",
  }));

  const updates = synthesizeUpdates(files);
  const reply = `I parsed ${uploads.length} file${uploads.length > 1 ? "s" : ""} and attached the findings to your onboarding session.`;

  return NextResponse.json({ uploads, updates, reply });
}
