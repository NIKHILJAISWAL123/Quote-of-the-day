# Quote Generator Power

> AI-powered quote generation, analysis, and management for Kiro

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/yourusername/quote-generator-power/releases)
[![Kiro Compatible](https://img.shields.io/badge/Kiro-Compatible-brightgreen.svg)](https://kiro.dev)

## Overview

Quote Generator Power is a comprehensive Kiro power for generating original inspirational quotes, analyzing their meaning, categorizing them intelligently, and extracting actionable productivity insights. Perfect for developers, writers, speakers, and anyone seeking daily inspiration.

## Features

✨ **Quote Generation** - Create original, contextual quotes in 6 categories  
🔍 **Quote Analysis** - Understand meaning, emotional impact, and applications  
🏷️ **Smart Categorization** - Auto-classify quotes with confidence scoring  
🚀 **Productivity Tips** - Get actionable suggestions based on quote themes  
💾 **Response Caching** - Fast responses with intelligent caching  
⚡ **Rate Limiting** - Respect API quotas with built-in rate limiting  
🤖 **AI-Powered** - Uses Claude AI via MCP for intelligent processing  

## Installation

### Quick Start

1. **Install uv** (required for MCP):
   ```bash
   # https://docs.astral.sh/uv/getting-started/installation/
   ```

2. **Add to Kiro**:
   ```bash
   # Copy this power to ~/.kiro/powers/ or your workspace .kiro/powers/
   # Or install from Kiro power registry
   ```

3. **Configure MCP** (if not already done):
   ```bash
   # Create .kiro/settings/mcp.json with Claude AI configuration
   # See MCP_SETUP.md for details
   ```

4. **Set Environment Variable**:
   ```bash
   $env:ANTHROPIC_API_KEY = "your-api-key"
   ```

### From GitHub

```bash
git clone https://github.com/yourusername/quote-generator-power.git
cd quote-generator-power
# Follow setup steps above
```

## Usage

### Generate a Quote

```bash
kiro quote generate --category motivation --style inspirational
```

### Analyze a Quote

```bash
kiro quote analyze "The only way to do great work is to love what you do."
```

### Categorize a Quote

```bash
kiro quote categorize "Success is a journey, not a destination"
```

### Get Productivity Tips

```bash
kiro productivity tips --context "I'm struggling with focus"
```

### In Chat

Just mention a quote-related task:
- "Generate a funny quote about programming"
- "Explain this: 'The only constant in life is change'"
- "What category does this quote belong to?"
- "Give me productivity tips for deep work"

## Skills

### 1. Quote Generation

Generate original, attributed quotes for specific categories and styles.

**Categories:**
- `motivation` - Inspirational, overcoming obstacles
- `success` - Achievement-focused, winning mindset
- `funny` - Humorous, witty observations
- `wisdom` - Philosophical, timeless insights
- `leadership` - Management, team dynamics
- `other` - Experimental, unique

**Styles:** inspirational, humorous, philosophical, motivational, authoritative

[Full documentation](skills/quote-generation.md)

### 2. Quote Analysis

Analyze quotes to extract deeper meaning and practical applications.

**Analyzes:**
- Core message and philosophy
- Emotional tone and impact
- Historical/cultural context
- Real-world applications
- Author attribution accuracy

[Full documentation](skills/quote-analysis.md)

### 3. Smart Categorization

Automatically classify any quote into one of 6 categories with confidence scoring.

**Returns:**
- Primary category with confidence score
- Alternative category suggestions
- Keywords and reasoning
- Classification accuracy details

[Full documentation](skills/quote-categorization.md)

### 4. Productivity Tips

Generate actionable productivity suggestions based on quote themes and context.

**Provides:**
- Time management insights
- Focus and concentration tips
- Motivation strategies
- Daily habits and weekly goals
- Specific, implementable actions

[Full documentation](skills/productivity-tips.md)

## Configuration

### Environment Variables

```bash
# Required
ANTHROPIC_API_KEY=sk-...                 # Your Anthropic API key

# Optional
MCP_TIMEOUT=30000                        # MCP call timeout (ms)
ENABLE_QUOTE_CACHE=true                  # Enable response caching
CACHE_TTL=86400                          # Cache TTL (seconds, default: 24 hours)
RATE_LIMIT_PER_MINUTE=10                 # Requests per minute
RATE_LIMIT_PER_HOUR=100                  # Requests per hour
RATE_LIMIT_PER_DAY=500                   # Requests per day
```

### Create `.env` file

```bash
# .env
ANTHROPIC_API_KEY=sk-your-key-here
ENABLE_QUOTE_CACHE=true
CACHE_TTL=86400
```

## Architecture

```
Quote Generator Power
├── Skills (4 core capabilities)
│   ├── Quote Generation
│   ├── Quote Analysis
│   ├── Smart Categorization
│   └── Productivity Tips
├── MCP Integration (Claude AI)
├── Rate Limiting
├── Response Caching
└── Steering & Best Practices
```

## Performance

| Operation | Time | Notes |
|-----------|------|-------|
| Generate quote | <3s | First call, uses MCP |
| Cached quote | <100ms | From local cache |
| Analyze quote | <2s | Via MCP |
| Categorize quote | <1s | Via MCP |
| Batch process | <5s | 10+ quotes |

## Rate Limits

To respect API quotas and prevent unexpected costs:

- **10** generations per minute
- **100** generations per hour
- **500** generations per day

Exceeding limits triggers fallback to local quotes or caching.

## Caching

Responses are cached by default for 24 hours to:
- Reduce API costs
- Improve response speed
- Enable offline functionality
- Prevent duplicate generations

Cache location: `data/cache/ai-responses.json`

## Best Practices

See [BEST_PRACTICES.md](BEST_PRACTICES.md) for comprehensive guidelines:

- ✅ Validate AI responses before storage
- ✅ Use confidence scores for categorization
- ✅ Implement caching strategically
- ✅ Respect rate limits
- ✅ Provide context for better results
- ❌ Don't trust AI output without validation
- ❌ Don't ignore rate limiting

## Examples

### Generate Motivation Quote

```bash
kiro quote generate --category motivation
# Output:
# "Every challenge is an opportunity to grow stronger."
# Author: Quote Generator
# Explanation: This quote emphasizes resilience and growth mindset...
```

### Analyze Famous Quote

```bash
kiro quote analyze "Be yourself; everyone else is already taken." --author "Oscar Wilde"
# Output:
# Core Message: Authenticity and self-acceptance
# Emotional Tone: Humorous, empowering
# Application: Personal branding, self-confidence
# Historical Context: Oscar Wilde, 19th century playwright...
```

### Categorize Unknown Quote

```bash
kiro quote categorize "The only way to do great work is to love what you do."
# Output:
# Category: motivation (95% confidence)
# Keywords: work, love, excellence, passion
# Alternatives: success (45% confidence)
```

### Get Daily Productivity Tips

```bash
kiro productivity tips --format actionable
# Output:
# Today's Focus: 2 deep work blocks of 90 minutes each
# Quick Win: 15-minute focus session before emails
# Weekly Goal: Build one new productivity habit
# Daily Habit: Start with your most important task
```

## Troubleshooting

### "MCP server not found"

1. Verify MCP is configured in `.kiro/settings/mcp.json`
2. Check that `uv` and `uvx` are installed
3. Ensure `ANTHROPIC_API_KEY` is set
4. Reconnect MCP servers in Kiro

### "Rate limit exceeded"

1. Wait at least 1 minute before next request
2. Check daily usage with dashboard
3. Consider upgrading API plan
4. Enable caching to reduce requests

### "Invalid response from AI"

1. Check internet connection
2. Verify API key is valid
3. Try a different category or simpler request
4. Check MCP logs for errors

### "Slow responses"

1. Enable response caching
2. Check network connection
3. Try using cached results
4. Consider using faster model (claude-haiku)

## Development

### Local Testing

```bash
# Install dependencies
npm install

# Run tests
npm run test

# Run property-based tests
npm run test:properties

# Build
npm run build

# Start development
npm run dev
```

### Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## Project Structure

```
quote-generator-power/
├── power.json                    # Power manifest
├── README.md                     # This file
├── CHANGELOG.md                  # Version history
├── BEST_PRACTICES.md             # Guidelines
├── LICENSE                       # MIT License
├── skills/
│   ├── quote-generation.md
│   ├── quote-analysis.md
│   ├── quote-categorization.md
│   └── productivity-tips.md
├── steering/
│   └── quote-best-practices.md
├── src/
│   ├── types.ts
│   ├── validators.ts
│   ├── ai-client.ts
│   └── app.ts
├── tests/
│   ├── app.test.ts
│   ├── properties.test.ts
│   └── quotes.test.ts
└── examples/
    └── usage-examples.md
```

## Integration Examples

### In Your Project

```typescript
import { QuoteGenerator } from 'quote-generator-power';

const generator = new QuoteGenerator({
  apiKey: process.env.ANTHROPIC_API_KEY,
  cache: true,
  cacheDir: './data/cache',
});

// Generate quote
const quote = await generator.generateQuote('motivation', 'inspirational');

// Analyze quote
const analysis = await generator.analyzeQuote(quote.text);

// Categorize
const category = await generator.categorizeQuote(quote.text);

// Get tips
const tips = await generator.getProductivityTips(quote);
```

## License

MIT © 2026 [Your Name]

## Support

- 📖 [Documentation](https://github.com/yourusername/quote-generator-power/wiki)
- 💬 [Discussions](https://github.com/yourusername/quote-generator-power/discussions)
- 🐛 [Report Issues](https://github.com/yourusername/quote-generator-power/issues)
- 📧 Email: your.email@example.com

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

---

Made with ❤️ for the Kiro community
