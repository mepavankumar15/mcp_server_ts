"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const zod_1 = require("zod");
require("dotenv/config");
const server = new mcp_js_1.McpServer({
    name: "Avyukth server",
    version: "1.0.0",
});
server.tool("getavyus", {
    fullPrompt: zod_1.z.string().describe("the complete user query about avyu data"),
    avyuName: zod_1.z.string().optional().describe("Optional specific avs name to focus on"),
}, async ({ fullPrompt, avyuName }) => {
    try {
        const response = await fetch('https://api.eigenexplorer.com/avs', {
            headers: {
                'X-API-TOKEN': process.env.EIGEN_EXPLORER_API_KEY || '',
            }
        });
        const json = await response.json();
        const claudeResponse = await fetch("https://api.anthropic.com/v1/messages", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.CLAUDE_API_KEY || '',
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-7-sonnet-20250219',
                max_tokens: 1024,
                messages: [
                    {
                        role: 'user',
                        content: `
                You are an Avyu data assistant. Your task is to analyze Avyu data and respond to user queries.
                
                Here is the AVyu data from the Pavan API:
                ${JSON.stringify(json, null, 2)}
                
                User query: ${fullPrompt}
                AVyu name: ${avyuName}
                
                Provide a detailed, well-structured response that directly addresses the user's query about the AVS data.
                Focus on being accurate, informative, and comprehensive.
              `
                    }
                ]
            })
        });
        const claudeJson = await claudeResponse.json();
        return {
            content: [
                {
                    type: "text",
                    text: `${claudeJson.content[0].text}`,
                },
            ],
        };
    }
    catch (err) {
        return {
            content: [
                {
                    type: "text",
                    text: "Error Fetching the data..",
                },
            ],
        };
    }
});
const transport = new stdio_js_1.StdioServerTransport();
await server.connect(transport);
