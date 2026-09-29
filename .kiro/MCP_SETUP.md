# MCP Configuration Setup Guide

**For Lesson 6: Model Context Protocol**

## Overview

This project uses MCP (Model Context Protocol) to connect to external AI services for quote generation, analysis, and categorization. This guide explains how to set up MCP servers.

## Prerequisites

- **uv** and **uvx** installed (Python package manager)
  - Install: https://docs.astral.sh/uv/getting-started/installation/
  - uvx allows running Python packages without installation

## MCP Configuration Location

The MCP configuration should be created at one of these locations:
- **User-level (global):** `~/.kiro/settings/mcp.json`
- **Workspace-level:** `.kiro/settings/mcp.json` (requires folder creation)

## Recommended Configuration

### Step 1: Create MCP Configuration Directory

```powershell
New-Item -ItemType Directory -Path ".kiro/settings" -Force
```

### Step 2: Create MCP Configuration File

Create `.kiro/settings/mcp.json`:

```json
{
  "mcpServers": {
    "claude-ai": {
      "command": "uvx",
      "args": [
        "mcp-server-claude",
        "--model",
        "claude-opus-4"
      ],
      "env": {
        "ANTHROPIC_API_KEY": "${ANTHROPIC_API_KEY}",
        "MCP_LOG_LEVEL": "info"
      },
      "disabled": false,
      "description": "Claude AI service for quote generation and analysis"
    },
    "local-llm": {
      "command": "uvx",
      "args": [
        "mcp-server-ollama",
        "--base-url",
        "http://localhost:11434"
      ],
      "env": {
        "MODEL_NAME": "llama2",
        "MCP_LOG_LEVEL": "info"
      },
      "disabled": true,
      "description": "Local LLM via Ollama for offline quote generation (optional)"
    }
  },
  "agentPermissions": {
    "task-validator-agent": {
      "allowedMcpServers": [],
      "description": "Strict validation agent - no MCP access"
    },
    "ai-assistant-agent": {
      "allowedMcpServers": [
        "claude-ai",
        "local-llm"
      ],
      "description": "AI assistant with full MCP access"
    }
  },
  "globalSettings": {
    "timeout": 30000,
    "retryAttempts": 3,
    "retryDelay": 1000,
    "cachingEnabled": true,
    "cacheTTL": 86400
  }
}
```

### Step 3: Set Environment Variables

Set your API key:

```powershell
# PowerShell
$env:ANTHROPIC_API_KEY = "your-api-key-here"

# Or add to your shell profile for persistence
```

### Step 4: Verify Setup

Test the MCP connection:

```bash
uvx mcp-server-claude --model claude-opus-4
```

## MCP Servers Explained

### Claude AI Service (Primary)
- **Purpose:** Generate quotes, explain meaning, categorize
- **Requires:** Anthropic API key
- **Models:** claude-opus-4 (best), claude-sonnet-4 (faster), claude-haiku-4 (cheaper)
- **Status:** Enabled by default

**Capabilities:**
- generateQuote(category, style) → generates original quote
- explainQuote(text) → provides meaning and context
- categorizeQuote(text) → assigns to category
- isAvailable() → checks service status

### Local LLM (Optional)
- **Purpose:** Offline quote generation fallback
- **Requires:** Ollama running locally
- **Models:** llama2, mistral, neural-chat
- **Status:** Disabled by default

**Setup Ollama:**
```bash
# Install from https://ollama.ai
# Run server
ollama serve

# In another terminal, pull a model
ollama pull llama2
```

## Agent Permissions

### TaskValidatorAgent
- **MCP Access:** ❌ Disabled
- **Tools:** Read-only (validation only)
- **Use Case:** Validate quotes before storage
- **Autonomy:** Supervised (asks for approval)

### AIAssistantAgent
- **MCP Access:** ✅ Enabled
- **Tools:** Read/write, can call MCP services
- **Use Case:** Generate and analyze quotes
- **Autonomy:** Autopilot (works independently)

## Rate Limiting

The system enforces these limits:
- **Per Minute:** 10 quote generations
- **Per Hour:** 100 quote generations
- **Per Day:** 500 quote generations

This prevents excessive API costs and respects service quotas.

## Caching Strategy

- **Enabled by default:** Responses cached for 24 hours
- **Cache location:** `data/cache/ai-responses.json`
- **Max cache size:** 1000 entries
- **Benefits:** Faster response, lower costs, offline capability

## Error Handling

### Scenario 1: MCP Server Unavailable
- Falls back to local quotes from collection
- Logs error for debugging
- Tries alternate server if configured

### Scenario 2: Rate Limited
- Waits and retries with exponential backoff
- After 3 failures, uses cached/local quotes
- Notifies user of limitation

### Scenario 3: Invalid Response
- Validates response format
- Rejects invalid quotes
- Suggests manual verification

## Troubleshooting

### Issue: "MCP server not found"
**Solution:**
1. Verify uvx is installed: `uvx --version`
2. Check MCP configuration syntax
3. Ensure server is not disabled
4. Reconnect via MCP Server view in Kiro

### Issue: "API key not found"
**Solution:**
1. Set ANTHROPIC_API_KEY environment variable
2. Restart Kiro session
3. Verify key is valid

### Issue: "Rate limit exceeded"
**Solution:**
1. Wait 1 minute before next request
2. Check daily usage limits
3. Consider using cache only

### Issue: "Connection timeout"
**Solution:**
1. Check internet connection
2. Verify MCP server URL is correct
3. Increase timeout in configuration
4. Try local LLM if available

## Testing MCP Integration

### Test Configuration
```typescript
// src/test-mcp.ts
import axios from 'axios';

async function testMCP() {
  try {
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'claude-opus-4',
      prompt: 'Generate a motivation quote',
    });
    console.log('✓ MCP connected');
    console.log(response.data);
  } catch (error) {
    console.error('✗ MCP connection failed:', error.message);
  }
}

testMCP();
```

### Run Test
```bash
npx ts-node src/test-mcp.ts
```

## Production Considerations

### Security
- ✅ Store API keys in environment variables
- ✅ Use .env file (add to .gitignore)
- ✅ Rotate keys regularly
- ✅ Use service accounts with minimal permissions

### Performance
- ✅ Enable caching (reduces API calls)
- ✅ Implement rate limiting (prevents overuse)
- ✅ Use faster models for real-time requests
- ✅ Batch requests when possible

### Reliability
- ✅ Configure multiple MCP servers (failover)
- ✅ Implement retry logic with backoff
- ✅ Monitor API usage and costs
- ✅ Set up alerts for errors/rate limits

## Next Steps

1. Create `.kiro/settings/mcp.json` with configuration above
2. Set ANTHROPIC_API_KEY environment variable
3. Test with `npm run test:mcp`
4. Start using quote generation commands
5. Monitor usage and adjust rate limits as needed

## Resources

- [Anthropic API Documentation](https://docs.anthropic.com)
- [Ollama Documentation](https://ollama.ai)
- [Kiro MCP Documentation](https://kiro.dev)
- [MCP Protocol Specification](https://spec.modelcontextprotocol.io)

