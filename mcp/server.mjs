import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  buildMeta,
  buildStructuredContent,
  generateAccountId,
  loadProfile,
  resetProfile,
  summarizeProfile,
  updateField,
} from "./profile-state.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templateUri = "ui://widget/business-profile-onboarding.html";

async function loadTemplate() {
  const templatePath = path.join(__dirname, "widget", "profile-onboarding.html");
  return readFile(templatePath, "utf8");
}

function responsePayload(profile, message) {
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

const server = new McpServer({ name: "split-payments-mcp", version: "0.1.0" });

server.registerResource(
  "business-profile-widget",
  templateUri,
  {},
  async () => ({
    contents: [
      {
        uri: templateUri,
        mimeType: "text/html+skybridge",
        text: await loadTemplate(),
        _meta: {
          "openai/widgetPrefersBorder": true,
          "openai/widgetDomain": "https://chatgpt.com",
          "openai/widgetCSP": {
            connect_domains: ["https://api.split-payments.local"],
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
    title: "Load onboarding and Portal profile",
    description: "Loads the business onboarding wizard state and portal profile values.",
    inputSchema: {
      type: "object",
      properties: {
        accountId: { type: "string", description: "Account, workspace, or merchant identifier." },
        restart: { type: "boolean", description: "If true, clears any saved progress before loading." },
      },
      required: [],
    },
    _meta: {
      "openai/outputTemplate": templateUri,
      "openai/toolInvocation/invoking": "Fetching business onboarding state…",
      "openai/toolInvocation/invoked": "Business profile ready.",
    },
  },
  async ({ accountId, restart }) => {
    const resolvedAccountId = accountId?.trim() ? accountId : generateAccountId();
    const createdNewAccount = !accountId?.trim();
    const profile = restart ? resetProfile(resolvedAccountId) : loadProfile(resolvedAccountId);
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
    title: "Update a business profile field",
    description: "Saves a field for the business onboarding wizard and Portal profile.",
    inputSchema: {
      type: "object",
      properties: {
        accountId: { type: "string", description: "Account, workspace, or merchant identifier." },
        sectionKey: { type: "string", description: "Section identifier (business_profile, contact, payments)." },
        fieldKey: { type: "string", description: "Field identifier inside the section." },
        value: { type: ["string", "number"], description: "Value to store." },
      },
      required: ["accountId", "sectionKey", "fieldKey", "value"],
    },
    _meta: {
      "openai/outputTemplate": templateUri,
      "openai/widgetAccessible": true,
      "openai/toolInvocation/invoking": "Saving profile change…",
      "openai/toolInvocation/invoked": "Profile updated.",
    },
  },
  async ({ accountId, sectionKey, fieldKey, value }) => {
    const profile = updateField(accountId, sectionKey, fieldKey, String(value));
    return responsePayload(profile, `Saved ${fieldKey} in ${sectionKey}.`);
  }
);

server.registerTool(
  "reset_business_profile",
  {
    title: "Reset onboarding state",
    description: "Clears saved values so the onboarding wizard can start over.",
    inputSchema: {
      type: "object",
      properties: {
        accountId: { type: "string", description: "Account, workspace, or merchant identifier." },
      },
      required: ["accountId"],
    },
    _meta: {
      "openai/outputTemplate": templateUri,
      "openai/widgetAccessible": true,
      "openai/toolInvocation/invoking": "Resetting onboarding…",
      "openai/toolInvocation/invoked": "Onboarding state cleared.",
    },
  },
  async ({ accountId }) => {
    const profile = resetProfile(accountId);
    return responsePayload(profile, "Started a fresh onboarding session.");
  }
);

const port = process.env.PORT || 3030;
server
  .listen({ port })
  .then(() => {
    console.log(`MCP server listening on port ${port}`);
  })
  .catch((error) => {
    console.error("Failed to start MCP server", error);
    process.exit(1);
  });
