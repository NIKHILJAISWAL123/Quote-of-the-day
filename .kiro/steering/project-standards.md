# Project Standards & Conventions

This document defines the coding standards, naming conventions, and file organization for the Quote of the Day Generator project.

## File Structure

```
e:\kiro2/
├── .kiro/
│   ├── specs/                  # Feature specifications
│   ├── steering/               # Project knowledge & standards
│   ├── hooks/                  # Event-triggered automations
│   ├── agents/                 # Custom agents
│   ├── powers/                 # Power definitions
│   └── settings/
│       └── mcp.json           # MCP server config
├── src/
│   ├── app.ts                 # CLI entry point
│   ├── quotes.ts              # Quote manager
│   ├── validators.ts          # Validation logic
│   └── ai-client.ts           # AI service integration
├── tests/
│   ├── app.test.ts            # CLI tests
│   ├── quotes.test.ts         # Quote manager tests
│   └── properties.test.ts     # Property-based tests
├── data/
│   └── quotes.json            # Quote storage
├── powers/
│   └── quote-generator-power/  # Packaged power
├── package.json
├── tsconfig.json
└── README.md
```

## Naming Conventions

### Files
- Use **kebab-case** for file names: `quote-manager.ts`, `ai-client.ts`
- Use **PascalCase** for class names: `QuoteManager`, `AIClient`
- Use **camelCase** for functions and variables: `getRandomQuote()`, `quoteList`

### Types & Interfaces
- Prefix interfaces with `I`: `IQuote`, `IQuoteManager`
- Use descriptive names: `IQuoteValidationResult`, not `IResult`
- Categories: Use string union types `'motivation' | 'success' | 'funny'...`

### Variables
- Use descriptive names: `selectedQuote`, not `q` or `quote1`
- Boolean variables start with `is`/`has`: `isValid`, `hasQuotes`
- Constants in UPPERCASE: `DEFAULT_CATEGORY`, `QUOTE_ID_LENGTH`

## Code Style

### TypeScript
- Use strict mode: `strict: true` in tsconfig.json
- Always specify return types on functions
- Use interfaces for objects, not types (unless union/intersection)
- Avoid `any` type
- Use `const` by default, `let` when necessary, never `var`

### Error Handling
- Always catch and handle errors gracefully
- Provide meaningful error messages
- Log errors for debugging
- Throw custom error classes for domain errors

```typescript
class QuoteNotFoundError extends Error {
  constructor(id: string) {
    super(`Quote with ID ${id} not found`);
    this.name = 'QuoteNotFoundError';
  }
}
```

### Comments
- Use JSDoc for public methods
- Explain WHY, not WHAT
- Keep comments short and relevant

```typescript
/**
 * Generates a unique identifier for a quote
 * @returns UUID string
 */
function generateQuoteId(): string {
  return v4();
}
```

## Testing Standards

### Unit Tests
- Test one concept per test
- Use descriptive test names: `should return random quote when quotes exist`
- Arrange-Act-Assert pattern
- Aim for >80% coverage

### Property-Based Tests
- Define general properties that must always hold
- Use fast-check for generating test cases
- Test edge cases and invariants

## Git Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`  
**Example:** `feat(quotes): add AI quote generation`

## Dependencies

### Production
- `typescript` - Language
- `uuid` - Generate unique IDs
- `axios` - HTTP client
- `commander` - CLI parsing
- `chalk` - Terminal colors

### Development
- `jest` - Test runner
- `ts-jest` - TypeScript support for Jest
- `@types/jest` - Type definitions
- `@types/node` - Node types
- `fast-check` - Property-based testing
- `eslint` - Linting
- `prettier` - Code formatting

## Performance Guidelines

- Quote retrieval: < 1 second
- AI generation: < 3 seconds (acceptable latency)
- Memory: Keep full quotes collection in RAM
- Cache AI responses to avoid duplicates

## Security Guidelines

- Validate all user input
- Sanitize quote text before storage
- No sensitive data in quotes
- Backup quotes regularly
- Handle file system errors gracefully

## Documentation

- Update README.md with new features
- Add JSDoc comments to public APIs
- Keep steering files up-to-date
- Document breaking changes in CHANGELOG

