import {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js";
import {StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {z} from "zod";
import "dotenv/config"

const server = new McpServer({
    name: "Avyukth server",
    version: "1.0.0",
});

server.tool(
    "getavyus",
    {
        fullPrompt : z.string().describe("the complete user query about avyu data"),
        avyuName: z.string().optional().describe("Optional specific avs name to focus on"),
    },
    async ({fullPrompt , avyuName}) => {
        try{
            const response = await fetch('https://api.eigenexplorer.com/avs', {
                headers: {
                    'X-API-TOKEN': process.env.EIGEN_EXPLORER_API_KEY || '',
                }
            })

        } catch (err){
            return {
                content: [
                    {
                        type:"text",
                        text: "Error Fetching the data..",
                    },
                ],
            };
        }
    }
)