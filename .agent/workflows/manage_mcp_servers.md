---
description: How to connect HTTP/SSE and Stdio (Local) MCP servers
---

# Connect any MCP Server

This workflow covers adding both HTTP/SSE (Server-Sent Events) and Stdio (Local Process) MCP servers to your workspace configuration.

## A. Configuration File
All MCP servers are configured in `public/.well-known/mcp-manifest.json`.

```json
{
  "mcpServers": {
    "My Server Name": {
      ... configuration ...
    }
  }
}
```

## B. Connecting an HTTP/SSE Server
Use this for remote servers (e.g., Composio, Supabase, Flux) that communicate via HTTP and Server-Sent Events.

**Configuration Format:**
```json
"My Remote Server": {
  "url": "https://api.example.com/mcp",
  "headers": {
    "x-api-key": "YOUR_API_KEY"
  }
}
```
*Note: For public servers (like Cloudflare Docs), `headers` may be omitted.*

**Steps:**
1. Open `public/.well-known/mcp-manifest.json`.
2. Add a new entry under `mcpServers` with the `url` and required `headers`.
3. Save the file.
4. Verify connection using `curl` (see Verification below).

## C. Connecting a Stdio (Local) Server
Use this for running MCP servers locally on your machine (e.g., a Python script, a Node.js process, or a binary).

**Configuration Format:**
```json
"My Local Server": {
  "command": "python3", 
  "args": ["/absolute/path/to/server.py", "--option", "value"],
  "env": {
    "API_KEY": "secret"
  }
}
```
*Note: Ensure you use absolute paths for commands and arguments to avoid resolution issues.*

**Steps:**
1. Ensure the server executable or script works manually in the terminal.
2. Open `public/.well-known/mcp-manifest.json`.
3. Add a new entry using `command`, `args`, and `env`.
4. Save the file.

## D. Verification and Debugging

### 1. Verify HTTP/SSE
Run a curl command to check if the endpoint is reachable.
```bash
curl -I -H "x-api-key: ..." "https://api.example.com/mcp"
```

### 2. Verify Stdio
Run the command directly in your terminal to check for startup errors.
```bash
# Example
/path/to/virtualenv/bin/python3 /path/to/server.py
```
*It should start and wait for input (or log startup messages). If it crashes immediately, fix the script or environment.*

### 3. Check Logs
If the IDE/Agent fails to connect, check the workspace logs or the Output panel for "MCP" related errors.
