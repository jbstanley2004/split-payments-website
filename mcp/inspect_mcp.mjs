import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
console.log(Object.getOwnPropertyNames(McpServer.prototype));
const server = new McpServer({ name: "test", version: "1.0" });
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(server)));
console.log(server);
