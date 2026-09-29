# Quote Generation Skill

**Skill ID:** quote-generation  
**Version:** 1.0.0  
**Part of:** Quote Generator Power

## Overview

This skill enables AI-powered generation of original, contextual quotes. It uses advanced language models to create quotes that match specific categories, styles, and contexts.

## How to Use

### Basic Usage
When you need an inspirational quote, mention you want to:
- "Generate a motivation quote"
- "Create a funny quote about success"
- "Give me wisdom for today"

### With the Power Loaded

```bash
kiro quote generate --category motivation --style inspirational
```

## Capabilities

### 1. Generate Quote by Category
Generate quotes for any of these categories:
- **motivation** - Inspirational messages for overcoming obstacles
- **success** - Achievement-focused, winning mindset quotes
- **funny** - Humorous and witty observations
- **wisdom** - Philosophical and timeless insights
- **leadership** - Management and team dynamics quotes
- **other** - Experimental and unique quotes

### 2. Style Customization
Tailor the generated quote to specific styles:
- Inspirational (uplifting, empowering)
- Humorous (witty, lighthearted)
- Philosophical (reflective, deep)
- Motivational (action-oriented, energizing)
- Authoritative (commanding, decisive)

### 3. Context-Aware Generation
Generate quotes relevant to specific situations:
- Work/career contexts
- Personal growth/self-improvement
- Relationships and communication
- Health and wellness
- Learning and development

## Implementation Details

### Prompt Engineering
The skill uses carefully crafted prompts that:
1. Specify the category and desired tone
2. Request original, attributed quotes (not famous ones)
3. Include style and context parameters
4. Request structured JSON response
5. Enforce length constraints (15-50 words)

### Response Validation
All generated quotes are validated to ensure:
- Text length is 10-500 characters
- Author attribution is present and valid
- Quote structure matches expected format
- No duplicate or offensive content
- Explanation (if provided) is relevant

### Caching Strategy
Generated quotes are cached to:
- Reduce API costs
- Improve response speed
- Prevent duplicate generations
- Allow offline functionality

## Best Practices

1. **Specify Category** - Always include a category for best results
2. **Add Context** - Provide context when available for more relevant quotes
3. **Request Explanation** - Ask for explanations for deeper insights
4. **Cache Results** - Use caching for frequently requested quotes
5. **Validate Responses** - Always validate AI responses before storing

## Error Handling

If quote generation fails:
1. System falls back to local pre-generated quotes
2. Returns cached quotes from previous sessions
3. Provides offline-mode alternatives
4. Logs errors for debugging

## Performance

- **Fast generation** - Typically <3 seconds per quote
- **Cached responses** - <100ms for cached quotes
- **Batch generation** - Can generate multiple quotes efficiently
- **Rate limiting** - Respects API quotas and limits

## Configuration

Configure via environment variables:
```bash
ENABLE_QUOTE_CACHE=true
CACHE_TTL=86400
RATE_LIMIT_PER_MINUTE=10
GENERATION_TIMEOUT=3000
```

## Examples

### Generate Motivation Quote
```
Input: Generate a motivation quote for Monday morning
Output:
{
  "text": "Every Monday is a fresh opportunity to build the life you want.",
  "author": "Your Power",
  "category": "motivation",
  "explanation": "This quote reminds you that each week brings new possibilities for growth and achievement."
}
```

### Generate Success Quote with Style
```
Input: Create an ambitious success quote for entrepreneurs
Output:
{
  "text": "Success is not a destination, it's the momentum of continuous improvement.",
  "author": "Your Power",
  "category": "success",
  "style": "ambitious",
  "explanation": "This quote emphasizes that success is an ongoing process, not a final goal."
}
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Slow generation | Check network connection, use cached quotes |
| Rate limited | Wait before generating more quotes |
| Invalid response | Check AI service logs, try different category |
| Memory issues | Clear cache, reduce batch size |

## Related Skills

- **Quote Analysis** - Understand generated quotes better
- **Smart Categorization** - Auto-categorize quotes
- **Productivity Tips** - Get context-aware suggestions

