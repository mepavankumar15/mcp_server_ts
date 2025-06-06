import {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js";
import {StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {z} from "zod";
import "dotenv/config"

const server = new McpServer({
    name: "Avyukth server",
    version: "1.0.0",
});