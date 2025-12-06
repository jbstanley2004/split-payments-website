import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  loadProfile,
  resetProfile,
  summarizeProfile,
  updateField,
  generateAccountId,
  buildMeta,
  buildStructuredContent,
  Profile
} from "./profile-state";
import { readFile } from "node:fs/promises";
import path from "node:path";

// We need to know where the widget file is.
// In Next.js (Vercel), reading files at runtime can be tricky depending on bundling.
// We'll try process.cwd() + public/mcp-widget/profile-onboarding.html
// OR we can embed it as a string if we want to be safe.
// For now, let's assume we can read it.

const WIDGET_TEMPLATE_URI = "ui://widget/business-profile-onboarding.html";

// Environment variables
const widgetDomain = process.env.WIDGET_DOMAIN?.trim() || "https://chatgpt.com";
const connectDomains = (process.env.WIDGET_CONNECT_DOMAINS || "https://api.split-payments.local")
  .split(",")
  .map((domain) => domain.trim())
  .filter(Boolean);

function responsePayload(profile: Profile, message: string) {
  const metadata = buildMeta(profile);
  return {
    structuredContent: buildStructuredContent(profile),
    content: [
      {
        type: "text",
        text: message,
      },
    ],
    toolResponseMetadata: metadata,
    _meta: metadata,
  };
}

export async function createMcpServer(loadTemplateFn: () => Promise<string>) {
  const server = new McpServer({ name: "split-payments-mcp", version: "0.1.0" });

  server.registerResource(
    "business-profile-widget",
    WIDGET_TEMPLATE_URI,
    {},
    async () => ({
      contents: [
        {
          uri: WIDGET_TEMPLATE_URI,
          mimeType: "text/html+skybridge",
          text: await loadTemplateFn(),
          _meta: {
            "openai/widgetPrefersBorder": true,
            "openai/widgetDomain": widgetDomain,
            "openai/widgetCSP": {
              connect_domains: connectDomains,
              resource_domains: ["https://*.oaistatic.com"],
            },
            "openai/widgetDescription":
              "Guided onboarding wizard that stays in sync with Portal profile fields.",
          },
        },
      ],
    })
  );

  server.registerTool(
    "load_business_profile",
    {
      accountId: { type: "string", description: "Account, workspace, or merchant identifier." },
      restart: { type: "boolean", description: "If true, clears any saved progress before loading." },
    },
    async ({ accountId, restart }) => {
        // Safe casting arguments
        const aid = accountId as string | undefined;
        const rst = restart as boolean | undefined;

      const resolvedAccountId = aid?.trim() ? aid : generateAccountId();
      const createdNewAccount = !aid?.trim();
      const profile = rst ? await resetProfile(resolvedAccountId) : await loadProfile(resolvedAccountId);
      const summary = summarizeProfile(profile);
      const message = createdNewAccount
        ? "Created a new account and loaded onboarding."
        : summary.onboardingStatus === "complete"
          ? "Profile is complete."
          : `Continuing onboarding with the ${summary.nextSection?.title ?? "next"} section.`;
      return responsePayload(profile, message);
    }
  );

  server.registerTool(
    "update_business_profile_field",
    {
      accountId: { type: "string", description: "Account, workspace, or merchant identifier." },
      sectionKey: { type: "string", description: "Section identifier (business_profile, contact, payments)." },
      fieldKey: { type: "string", description: "Field identifier inside the section." },
      value: { type: "string", description: "Value to store." }, // Schema allows number, but we stringify
    },
    async ({ accountId, sectionKey, fieldKey, value }) => {
        const aid = accountId as string;
        const sk = sectionKey as string;
        const fk = fieldKey as string;
        const val = String(value);

      const profile = await updateField(aid, sk, fk, val);
      return responsePayload(profile, `Saved ${fk} in ${sk}.`);
    }
  );

  server.registerTool(
    "reset_business_profile",
    {
      accountId: { type: "string", description: "Account, workspace, or merchant identifier." },
    },
    async ({ accountId }) => {
        const aid = accountId as string;
      const profile = await resetProfile(aid);
      return responsePayload(profile, "Started a fresh onboarding session.");
    }
  );

  return server;
}
