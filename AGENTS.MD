# AGENTS

## Purpose
This document orients an incoming AI agent to the split-payments-website project and the MCP server that powers the ChatGPT widget for portal onboarding. It is intentionally neutral and factual.

## Codebase Overview
- **Framework:** Next.js (app router) frontend with public assets and portal pages.
- **MCP Service:** `mcp/server.mjs` (Node/Express + @modelcontextprotocol/sdk) serving the SSE endpoint at `https://34-58-90-123.nip.io/mcp`.
- **Widget:** `mcp/widget/profile-onboarding.html` renders the business profile onboarding UI inside ChatGPT, using Firebase client SDK for auth.
- **Data Layer:** Firebase Admin (`mcp/firebase-setup.mjs`, `mcp/profile-state.mjs`) storing application/profile data in Firestore (`applications` collection).
- **Manifest:** `public/.well-known/mcp-manifest.json` points to the MCP endpoint and lists tools/resources for the widget.
- **Dependencies:** MCP SDK, Express, Firebase Admin. Client widget loads Firebase JS SDK from gstatic.

## Intended Functionality
- ChatGPT connects to `https://34-58-90-123.nip.io/mcp` (SSE).
- MCP exposes tools: load business profile, update fields, reset profile, etc., and serves the onboarding widget resource.
- Widget shows sign-in/sign-up via Firebase Auth, then a multi-section business profile form. User controls navigation; no auto-advance.
- Data persists to Firestore through MCP tools and stays in sync with the portal’s business profile sections.

## Current State (latest known)
- TLS via Caddy; firewall open on 80/443/3030.
- CSP/connect domains include Firebase endpoints; widget domain set to `https://34-58-90-123.nip.io`.
- MCP service healthy; tool handlers instrumented with verbose logging.

## Most Recent Error (no extra context)
- Client connects and completes `initialize`, `notifications/initialized`, `tools/list`, `resources/read`, then `tools/call load_business_profile`.
- Immediately after `tools/call`, the client aborts the SSE (ECONNRESET). No server-side exceptions. Prior client message observed: `v3Schema.safeParseAsync is not a function` (client-side validation).

## What the Agent Must Do
1) **Stabilize MCP handshake and tools:**
   - Inspect `mcp/server.mjs` logs for the next attempt; verify `load_business_profile` response shape and metadata align with MCP SDK expectations.
   - If client schema mismatch persists, verify returned payload matches MCP JSON-RPC tool response schema and remove any optional fields that could break client validation.

2) **Widget/Firebase checks:**
   - Ensure Firebase Auth authorized domains include the MCP host (`34-58-90-123.nip.io` or final hostname).
   - Confirm widget config uses the correct `authDomain` and that CSP/resource/connect domains cover Firebase endpoints.

3) **Deployment:**
   - MCP endpoint should remain at `https://34-58-90-123.nip.io/mcp` (or successor) with valid TLS and SSE.
   - Keep Caddy running; ensure `mcp.service` is enabled and healthy after changes.

4) **Logging/Diagnostics:**
   - Use `journalctl -u mcp.service -n 200 --no-pager` on the VM to capture the next connector attempt.
   - Verify tool logs (“tool … success/fail”, payload size, metadata keys) to detect any internal exceptions.

5) **Do not downgrade dependencies.**
   - Top-level `zod` was removed to avoid client/SDK version mismatch; MCP SDK should use its bundled compatible Zod.

## Success Criteria
- ChatGPT connector establishes and maintains SSE without aborting.
- Widget loads, allows sign-in/sign-up, and all onboarding sections can be completed and submitted.
- Tool calls succeed and persist data to Firestore without schema/validation errors.
- Endpoint is deployable and production-ready with valid TLS and open firewall ports.
