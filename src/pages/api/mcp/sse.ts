import { NextApiRequest, NextApiResponse } from "next";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { createMcpServer } from "@/lib/mcp-server/setup";
import { transportMap } from "@/lib/mcp-server/transports";
import { WIDGET_TEMPLATE } from "@/lib/mcp-server/template";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // Or specific origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== "GET") {
    console.log(`MCP SSE: Method ${req.method} not allowed`);
    res.status(405).end();
    return;
  }

  console.log("MCP SSE: New connection request");

  try {
    // Use the embedded template
    const loadTemplate = async () => WIDGET_TEMPLATE;

    const server = await createMcpServer(loadTemplate);
    
    // We point the client to the messages endpoint. 
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
    await transport.start();
    
    console.log("MCP SSE: Transport started");
  } catch (err) {
    console.error("MCP SSE: Error starting server", err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}