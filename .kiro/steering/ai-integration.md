# AI Integration & MCP Guidelines

This document specifies how to integrate with AI services and MCP servers for the Quote of the Day Generator.

## MCP Server Configuration

The Quote Generator uses Model Context Protocol (MCP) to connect to AI/LLM services. Configuration is stored in `.kiro/settings/mcp.json`.

### Supported MCP Servers

#### 1. Claude AI Service (Primary)
- **Purpose:** Generate quotes, provide explanations, suggest categories
- **Server:** Claude LLM via uvx
- **Methods:** 
  - `generateQuote(category, style)` - Generate new quote
  - `explainQuote(text)` - Provide context/meaning
  - `categorizeQuote(text)` - Suggest category

#### 2. Alternative: Local LLM
- **Purpose:** Offline quote generation
- **Server:** Ollama or similar
- **Fallback:** When cloud service unavailable

## AI Client Integration

### File: `src/ai-client.ts`

**Responsibilities:**
- Connect to MCP servers
- Call AI generation methods
- Cache responses
- Handle errors gracefully
- Rate limiting

**Interface:**
```typescript
interface IAIClient {
  generateQuote(category: QuoteCategory, style?: string): Promise<string>;
  explainQuote(text: string): Promise<string>;
  categorizeQuote(text: string): Promise<QuoteCategory>;
  isAvailable(): Promise<boolean>;
}
```

### API Call Pattern

```typescript
// Generate quote with category
const quote = await aiClient.generateQuote('motivation', 'inspirational');

// Get explanation
const explanation = await aiClient.explainQuote(quote);

// Auto-categorize imported quote
const category = await aiClient.categorizeQuote(importedText);
```

## Quote Generation Strategy

### Prompt Template

```
Generate a {style} quote about {topic} in the "{category}" category.
Requirements:
- Quote should be original and insightful
- Between 15-50 words
- Attributable to a real person or "Original Quote"
- Inspiring and thought-provoking

Format as JSON:
{
  "text": "the quote here",
  "author": "author name",
  "explanation": "brief explanation of meaning"
}
```

### Categories & Styles

| Category | Suggested Styles |
|----------|------------------|
| motivation | inspirational, empowering, encouraging |
| success | ambitious, goal-oriented, achievement-focused |
| funny | witty, humorous, lighthearted |
| wisdom | philosophical, reflective, timeless |
| leadership | commanding, visionary, authoritative |
| other | creative, unique, experimental |

## Caching Strategy

### Cache Storage
- Location: `data/cache/ai-responses.json`
- Format: `{ prompt_hash: response }`
- TTL: 24 hours
- Max entries: 1000

### Cache Key Generation
```typescript
const cacheKey = hashFunction(category + style + timestamp_day);
```

### Benefits
- Reduce API calls
- Faster quote generation
- Reduce costs
- Prevent duplicate generations

## Error Handling

### Scenario 1: MCP Server Unavailable
```typescript
try {
  const quote = await aiClient.generateQuote(category);
} catch (error) {
  // Fallback to random quote from collection
  return getRandomQuote(category);
}
```

### Scenario 2: Invalid AI Response
```typescript
// Validate response format
if (!isValidAIResponse(response)) {
  throw new Error('AI response does not match expected format');
}
```

### Scenario 3: Rate Limited
```typescript
// Implement exponential backoff
// After 3 failures, fallback to local quotes
```

## Response Validation

All AI responses must be validated:

```typescript
interface IAIQuoteResponse {
  text: string;           // 10-500 characters
  author: string;         // 2-100 characters
  explanation?: string;   // Optional, max 300 characters
}

function validateAIResponse(response: unknown): IAIQuoteResponse {
  if (!isObject(response)) throw new Error('Response not an object');
  if (typeof response.text !== 'string' || response.text.length < 10) {
    throw new Error('Text invalid');
  }
  if (typeof response.author !== 'string' || response.author.length < 2) {
    throw new Error('Author invalid');
  }
  return response as IAIQuoteResponse;
}
```

## Rate Limiting

### Limits
- Max 10 quote generations per minute
- Max 100 per hour
- Max 500 per day

### Implementation
```typescript
const rateLimiter = new RateLimiter({
  maxPerMinute: 10,
  maxPerHour: 100,
  maxPerDay: 500,
});

if (!rateLimiter.canMakeRequest()) {
  throw new Error('Rate limit exceeded');
}
```

## Configuration

### Environment Variables
```bash
# MCP Server configuration
MCP_SERVER_TYPE=claude          # or 'ollama', 'local'
MCP_SERVER_URL=http://localhost:11434
MCP_API_KEY=sk-xxx              # If required
MCP_TIMEOUT=3000                # ms
MCP_RETRY_ATTEMPTS=3

# Caching
ENABLE_AI_CACHE=true
CACHE_TTL=86400                 # 24 hours in seconds

# Rate limiting
RATE_LIMIT_PER_MINUTE=10
RATE_LIMIT_PER_HOUR=100
```

### Development vs Production

**Development:**
- Use fast local cache
- Lower rate limits to prevent quota issues
- Shorter timeouts for quick feedback

**Production:**
- Use cloud MCP servers
- Implement persistent cache
- Strict rate limiting
- Comprehensive error logging

## Testing AI Integration

### Unit Tests
- Mock MCP responses
- Test error scenarios
- Validate response format
- Test caching logic

### Integration Tests
- Call real MCP server (in CI/CD)
- Test rate limiting
- Test fallback behavior

### Example Test
```typescript
describe('AIClient', () => {
  it('should generate valid quote from AI service', async () => {
    const quote = await aiClient.generateQuote('motivation');
    expect(quote).toHaveLength(> 10);
    expect(quote).toHaveLength(< 500);
  });

  it('should fallback to local quotes when AI unavailable', async () => {
    mockMCPServerDown();
    const quote = await aiClient.generateQuote('motivation');
    expect(quote).toBeDefined();
    expect(quote.isAIGenerated).toBe(false);
  });
});
```

## Best Practices

1. **Always validate AI responses** - Don't trust external services
2. **Implement caching** - Reduce costs and improve performance
3. **Use rate limiting** - Respect service quotas
4. **Graceful degradation** - Fallback to local quotes if AI fails
5. **Log all interactions** - For debugging and monitoring
6. **Monitor costs** - Track API usage and expenses
7. **Version responses** - Track which quotes came from which AI version

