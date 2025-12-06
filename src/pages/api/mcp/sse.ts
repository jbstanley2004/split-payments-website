import { NextApiRequest, NextApiResponse } from "next";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { createMcpServer } from "@/lib/mcp-server/setup";
import { transportMap } from "@/lib/mcp-server/transports";
import fs from "fs/promises";
import path from "path";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }

  console.log("MCP SSE: New connection request");

  const loadTemplate = async () => {
     // Try to resolve the path relative to process.cwd()
     // In Vercel, public files are usually served, but fs access might be different.
     // We'll try standard location.
     const filePath = path.join(process.cwd(), "public", "mcp-widget", "profile-onboarding.html");
     return fs.readFile(filePath, "utf8");
  };

  try {
    const server = await createMcpServer(loadTemplate);
    
    // We point the client to the messages endpoint. 
    // We assume it's relative to the current origin.
    const transport = new SSEServerTransport("/api/mcp/messages", res);
    
    console.log(`MCP SSE: Created transport with sessionId ${transport.sessionId}`);
    
    transportMap.set(transport.sessionId, transport);

    transport.onclose = () => {
        console.log(`MCP SSE: Closed session ${transport.sessionId}`);
        transportMap.delete(transport.sessionId);
    };

    // Connect the server to the transport
    await server.connect(transport);
    
    // Start the transport (send headers and initial event)
    // Note: SSEServerTransport.start() sends the 200 OK and headers.
    await transport.start();
    
    console.log("MCP SSE: Transport started");
  } catch (err) {
    console.error("MCP SSE: Error starting server", err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
