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
            accountId: { type: "string", description: "Account, workspace, or merchant identifier." },
            restart: { type: "boolean", description: "If true, clears any saved progress before loading." },
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
            accountId: { type: "string", description: "Account, workspace, or merchant identifier." },
            sectionKey: { type: "string", description: "Section identifier (business_profile, contact, payments)." },
            fieldKey: { type: "string", description: "Field identifier inside the section." },
            value: { type: "string", description: "Value to store." },
        },
        async ({ accountId, sectionKey, fieldKey, value }) => {
            const profile = await updateField(accountId, sectionKey, fieldKey, String(value));
            return responsePayload(profile, `Saved ${fieldKey} in ${sectionKey}.`);
        }
    );

    server.registerTool(
        "reset_business_profile",
        {
            accountId: { type: "string", description: "Account, workspace, or merchant identifier." },
        },
        async ({ accountId }) => {
            const profile = await resetProfile(accountId);
            return responsePayload(profile, "Started a fresh onboarding session.");
        }
    );

    const app = express();

    // CORS Middleware
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
        res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        if (req.method === "OPTIONS") return res.sendStatus(200);
        next();
    });

    app.get("/mcp/sse", async (req, res) => {
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