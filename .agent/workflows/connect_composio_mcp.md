---
description: How to connect and verify Composio MCP servers
---

# Connect to Composio MCP

This workflow outlines the standard procedure for connecting to a Composio hosted MCP server, verifying the connection, and handling common issues.

## 1. Obtain Credentials
Ensure you have the following from the Composio dashboard or user:
- **MCP Server URL**: Usually looks like `https://backend.composio.dev/v3/mcp/<UUID>/mcp?user_id=<UUID>`
- **API Key**: The Composio API key (often provided in the URL query params or separately).

## 2. Configure project
Add the server configuration to `public/.well-known/mcp-manifest.json`.

```json
{
  "mcpServers": {
    "Composio [Service Name]": {
      "url": "https://backend.composio.dev/v3/mcp/...",
      "headers": {
        "x-api-key": "[API_KEY]"
      }
    }
  }
}
```

> [!NOTE]
> Ensure you use the `x-api-key` header. Some Composio endpoints require this header even if the key is in the URL query parameters.

## 3. Verify Connection
Run a quick verification to ensure the server is reachable and authorized.

```bash
# Replace URL and KEY
curl -I -H "x-api-key: [KEY]" "[URL]"
```
Expected output: `HTTP/2 200` or `307` (redirects are common for Apollo endpoints).

## 4. Troubleshooting

### 401 Unauthorized
- **Cause**: Invalid API Key or missing header.
- **Fix**: Ensure `x-api-key` is set in the headers. Try verifying with `curl`.

### Toolkit Mismatch / "Tool not among possible toolkits"
- **Cause**: The MCP server ID might typically associate with a specific toolkit (e.g., Github), but you are trying to use tools from another toolkit (e.g., Notion) that isn't enabled for that specific server instance.
- **Fix**: 
    1. Verify the `user_id` in the URL has the correct connected accounts.
    2. Use the `COMPOSIO_LIST_TOOLKITS` tool (if available) to see what is enabled.
    3. If managing multiple tools (Notion, GitHub, etc.), ensure the MCP server instance supports *all* of them, or configure separate servers in `mcp-manifest.json` for each service.

### API Endpoint Variations
- **Apollo vs Backend**:
    - `apollo.composio.dev`: Often a gateway/redirector.
    - `backend.composio.dev`: The direct backend.
    - If one fails (e.g., 404 or protocol error), try swapping the domain in the URL.
