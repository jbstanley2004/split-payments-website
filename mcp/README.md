# Split Payments MCP server

This folder contains a reference MCP server plus a lightweight widget that mirrors the Split business onboarding wizard and Portal profile fields.

## What you get
- **HTTP MCP server** with tools to load, update, and reset onboarding/profile data.
- **Widget template** served as `text/html+skybridge` so it renders inline in ChatGPT.
- **Shared state model** that keeps onboarding and Portal profile answers in sync.

## Project layout
- `server.mjs` – MCP server that registers the widget resource and three tools.
- `profile-state.mjs` – In-memory store for onboarding/profile fields and helper summarization.
- `widget/profile-onboarding.html` – Vanilla JS widget that renders the wizard in chat and calls tools for updates.

## Running locally
1. Install dependencies in this subproject:
   ```bash
   cd mcp
   npm install @modelcontextprotocol/sdk
   ```
   (Add any dev server or bundler you prefer; the widget runs without a build step.)
2. Start the server:
   ```bash
   PORT=3030 node server.mjs
   ```
3. Point MCP Inspector or a ChatGPT connector at `http://localhost:3030/mcp` to exercise the tools and widget.

## Production hosting guidance
- The MCP server expects to bind to its own port, which Vercel's static/Next.js hosting model does not support. Plan on
  deploying the MCP server as a **separate service** (e.g., Fly.io, Railway, Render, or a small VM/container) and route it
  through a dedicated subdomain such as **`mcp.ccsplit.org`**.
- Minimal production recipe:
  1. Deploy this folder as a long-running Node service (for example, `PORT=3030 node server.mjs`).
  2. Create a DNS record pointing `mcp.ccsplit.org` to that service (A/AAAA or CNAME, depending on host).
  3. Keep your main site on `www.ccsplit.org` via Vercel; the two can ship together by releasing the site and the MCP
     service in the same rollout.
- Configure widget metadata for the production origin when starting the service:
  - `WIDGET_DOMAIN=https://www.ccsplit.org` so the SDK trusts the widget for your production origin.
  - `WIDGET_CONNECT_DOMAINS=https://api.your-production-host` (comma-separated) so the widget's CSP allows calls to your
    APIs.

## Tools exposed
- `load_business_profile` – Loads onboarding + Portal profile values and returns the widget template metadata.
- `update_business_profile_field` – Saves a field inside a section (widget accessible).
- `reset_business_profile` – Clears in-memory state to restart onboarding (widget accessible).

All tools include `openai/outputTemplate` metadata to render the wizard. Widget-accessible tools opt into `openai/widgetAccessible` so the iframe can call them directly.

## Widget runtime
The widget reads `window.openai.toolOutput` for the summary shown to the model and `window.openai.toolResponseMetadata` for the full field definitions. It persists the currently selected section with `setWidgetState`, calls tools through `callTool`, and requests height updates via `notifyIntrinsicHeight`.
