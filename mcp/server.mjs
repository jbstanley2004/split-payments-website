import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import {
    buildMeta,
    buildStructuredContent,
    generateAccountId,
    loadProfile,
    resetProfile,
    summarizeProfile,
    updateField,
} from "./profile-state.mjs";
import "./firebase-setup.mjs"; // Initialize Firebase Admin

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templateUri = "ui://widget/business-profile-onboarding.html";
const widgetDomain = process.env.WIDGET_DOMAIN?.trim() || "https://www.ccsplit.org";
const connectDomains = (process.env.WIDGET_CONNECT_DOMAINS || "https://www.ccsplit.org,https://api.ccsplit.org,https://firestore.googleapis.com,https://identitytoolkit.googleapis.com")
    .split(",")
    .map((domain) => domain.trim())
    .filter(Boolean);
const widgetMeta = {
    "openai/outputTemplate": templateUri,
    "openai/widgetAccessible": true,
    "openai/resultCanProduceWidget": true,
    "openai/widgetPrefersBorder": true,
    "openai/widgetDescription": "Guided onboarding wizard that stays in sync with Portal profile fields.",
};

async function loadTemplate() {
    const templatePath = path.join(__dirname, "widget", "profile-onboarding.html");
    return readFile(templatePath, "utf8");
}

function responsePayload(profile, message) {
    const metadata = { ...buildMeta(profile), ...widgetMeta };
    const summary = summarizeProfile(profile);

    // Suppress model-facing text until the entire onboarding is complete. This keeps the
    // assistant silent while the user works through the widgets and only surfaces a
    // response after the last section is submitted.
    const content = summary.onboardingStatus === "complete" && message
        ? [
            {
                type: "text",
                text: message,
            },
        ]
        : [];

    return {
        structuredContent: buildStructuredContent(profile),
        content,
        toolResponseMetadata: metadata,
        _meta: metadata,
    };
}

// Global transport map to persist sessions across requests in a long-running process
const transportMap = new Map();

async function startServer() {
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
                        "openai/widgetDomain": widgetDomain,
                        "openai/widgetCSP": {
                            connect_domains: connectDomains,
                            resource_domains: ["https://*.oaistatic.com", "https://*.gstatic.com", "https://*.firebaseio.com", "https://*.googleapis.com"],
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
            title: "Load business profile",
            description: "Fetch or create onboarding data and render the profile widget.",
            inputSchema: {
                type: "object",
                properties: {
                    accountId: { type: "string", description: "Account, workspace, or merchant identifier." },
                    restart: { type: "boolean", description: "If true, clears any saved progress before loading." },
                },
            },
            _meta: widgetMeta,
        },
        async ({ accountId, restart }) => {
            const resolvedAccountId = accountId?.trim() ? accountId : generateAccountId();
            const createdNewAccount = !accountId?.trim();
            const profile = restart ? await resetProfile(resolvedAccountId) : await loadProfile(resolvedAccountId);
            const summary = summarizeProfile(profile);
            const message = createdNewAccount
                ? "Created a new account and loaded onboarding."  // This message is for the LLM
                : summary.onboardingStatus === "complete"
                    ? "Profile is complete."
                    : `Continuing onboarding with the ${summary.nextSection?.title ?? "next"} section.`;
            return responsePayload(profile, message);
        }
    );

    server.registerTool(
        "update_business_profile_field",
        {
            title: "Update profile field",
            description: "Persist a single profile field and refresh widget state.",
            inputSchema: {
                type: "object",
                properties: {
                    accountId: { type: "string", description: "Account, workspace, or merchant identifier." },
                    sectionKey: { type: "string", description: "Section identifier (business_profile, contact, payments)." },
                    fieldKey: { type: "string", description: "Field identifier inside the section." },
                    value: { type: "string", description: "Value to store." },
                },
                required: ["accountId", "sectionKey", "fieldKey", "value"],
            },
            _meta: widgetMeta,
        },
        async ({ accountId, sectionKey, fieldKey, value }) => {
            const profile = await updateField(accountId, sectionKey, fieldKey, String(value));
            return responsePayload(profile, `Saved ${fieldKey} in ${sectionKey}.`);
        }
    );

    server.registerTool(
        "reset_business_profile",
        {
            title: "Reset business profile",
            description: "Clear saved progress and restart onboarding in the widget.",
            inputSchema: {
                type: "object",
                properties: {
                    accountId: { type: "string", description: "Account, workspace, or merchant identifier." },
                },
                required: ["accountId"],
            },
            _meta: widgetMeta,
        },
        async ({ accountId }) => {
            const profile = await resetProfile(accountId);
            return responsePayload(profile, "Started a fresh onboarding session.");
        }
    );

    const app = express();

    // Basic body parsing so the POST /mcp/messages handler can decode JSON payloads
    app.use(express.json({ limit: "1mb" }));

    // CORS Middleware
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
        res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        if (req.method === "OPTIONS") return res.sendStatus(200);
        next();
    });

    app.get(["/mcp", "/mcp/sse"], async (req, res) => {
        console.log("New SSE connection");

        const transport = new SSEServerTransport("/mcp/messages", res);
        transportMap.set(transport.sessionId, transport);

        transport.onclose = () => {
            console.log(`Session closed: ${transport.sessionId}`);
            transportMap.delete(transport.sessionId);
        };

        await server.connect(transport);
    });

    app.post("/mcp/messages", async (req, res) => {
        const sessionId = req.query.sessionId;
        if (!sessionId) {
            res.status(400).send("Missing sessionId");
            return;
        }

        const transport = transportMap.get(sessionId);
        if (!transport) {
            res.status(404).send("Session not found");
            return;
        }

        await transport.handlePostMessage(req, res);
    });

    // Health check
    app.get("/", (req, res) => {
        res.send("MCP Server is running");
    });

    const port = process.env.PORT || 3030;
    app.listen(port, () => {
        console.log(`MCP server listening on port ${port}`);
    });
}

startServer().catch(console.error);
