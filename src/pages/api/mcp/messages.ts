import { NextApiRequest, NextApiResponse } from "next";
import { transportMap } from "@/lib/mcp-server/transports";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const sessionId = req.query.sessionId as string;
  if (!sessionId) {
    res.status(400).send("Missing sessionId");
    return;
  }

  const transport = transportMap.get(sessionId);
  if (!transport) {
    console.error(`MCP Message: Session ${sessionId} not found in transport map (Size: ${transportMap.size})`);
    res.status(404).send("Session not found (Serverless instance mismatch?)");
    return;
  }

  await transport.handlePostMessage(req, res);
}