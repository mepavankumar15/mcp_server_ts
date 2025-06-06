"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
require("dotenv/config");
const server = new mcp_js_1.McpServer({
    name: "Avyukth server",
    version: "1.0.0",
});
