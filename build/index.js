import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { javaScriptIntro } from "./prompts/javascript_1.js";
import { javascriptOpps } from "./prompts/javascript_opps.js";
import { mainPrompt } from "./prompts/main.js";
const server = new McpServer({
    name: "mcp code teacher",
    version: "1.0.0"
});
server.registerTool("teach_me", {
    title: "teach me how to code",
    description: "the base prompt for instruction and tutorials.",
    inputSchema: z.object({})
}, async (args) => {
    return {
        content: [{ type: "text", text: mainPrompt }]
    };
});
server.registerTool("javascript_intro", {
    title: "intro to JavaScript",
    description: "an introduction to javascript, what it is, where it runs and what it's commonly used for as well as variable types.",
    inputSchema: z.object({})
}, async (args) => {
    return {
        content: [{ type: "text", text: javaScriptIntro }]
    };
});
server.registerTool("javascript_opps", {
    title: "Javascript operators ",
    description: "an introduction to javascript operators, doing math, logical operators and comparitors",
    inputSchema: z.object({})
}, async (args) => {
    return {
        content: [{ type: "text", text: javascriptOpps }]
    };
});
const transport = new StdioServerTransport();
async function start() {
    try {
        console.error("Starting MCP server mc_code_teacher...");
        await server.connect(transport);
        console.error("MCP server disconnected");
    }
    catch (err) {
        console.error("MCP server failed to start", err);
        process.exit(1);
    }
}
start();
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled promise rejection:', reason);
});
process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err);
});
process.on('SIGINT', async () => {
    console.error('SIGINT received, shutting down...');
    try {
        if (typeof transport.close === 'function')
            await transport.close();
    }
    finally {
        process.exit(0);
    }
});
