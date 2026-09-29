# Contributing to Quote Generator Power

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and inclusive. We're building a community around this power.

## Ways to Contribute

- 🐛 **Report bugs** - Found an issue? Open a GitHub issue
- 💡 **Suggest features** - Have an idea? Discuss it in issues
- 📝 **Improve docs** - Help us improve documentation
- 🔧 **Submit code** - Fix bugs or add features
- ✅ **Test** - Help test new features
- 📢 **Share feedback** - Tell us how you're using it

## Getting Started

### 1. Fork the Repository

```bash
git clone https://github.com/yourusername/quote-generator-power.git
cd quote-generator-power
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### 4. Make Your Changes

Follow the [code style guide](#code-style).

### 5. Test Your Changes

```bash
npm run test
npm run test:coverage
```

### 6. Commit Your Changes

Follow [commit message format](#commit-message-format):

```bash
git commit -m "feat(quotes): add new quote category"
```

### 7. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then open a pull request on GitHub.

## Code Style

### TypeScript

- Use strict mode (`strict: true`)
- Always specify return types
- Use `const` by default
- Avoid `any` type
- Use interfaces for objects

```typescript
/**
 * Generate a quote
 * @param category - Quote category
 * @returns Generated quote
 */
function generateQuote(category: string): IQuote {
  // implementation
}
```

### Naming Conventions

- **Files:** kebab-case (`quote-manager.ts`)
- **Classes:** PascalCase (`QuoteManager`)
- **Functions:** camelCase (`generateQuote()`)
- **Constants:** UPPERCASE (`DEFAULT_CATEGORY`)
- **Interfaces:** Prefix with `I` (`IQuote`)

### Comments

- Use JSDoc for public functions
- Explain WHY, not WHAT
- Keep comments short and relevant

```typescript
/**
 * Validates quote against schema
 * @param quote - Quote to validate
 * @returns Validation result
 */
```

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style (formatting, missing semicolons)
- `refactor` - Code refactoring
- `perf` - Performance improvement
- `test` - Adding or updating tests
- `chore` - Build, dependencies, etc.

### Examples

```
feat(quotes): add multi-language support
fix(categorization): handle edge case in confidence scoring
docs: update installation instructions
test(properties): add invariant for quote uniqueness
```

## Pull Request Process

1. **Update documentation** if you change functionality
2. **Add tests** for new features
3. **Run tests** - All tests must pass: `npm run test`
4. **Update CHANGELOG.md** - Add entry under Unreleased
5. **Self-review** - Check your own code first
6. **Describe changes** - Explain what and why in PR description

### PR Title Format

```
[Type] Short description (under 70 characters)
```

Examples:
- `[Feature] Add multi-language quote support`
- `[Fix] Resolve race condition in cache`
- `[Docs] Add example for productivity tips`

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking change fixing an issue)
- [ ] New feature (non-breaking change adding functionality)
- [ ] Breaking change (fix or feature causing existing functionality to change)

## Testing
How to test these changes

## Checklist
- [ ] Tests pass locally
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] No console.log or debug code
- [ ] Commits squashed if multiple
```

## Testing Guidelines

### Unit Tests

```typescript
describe('QuoteManager', () => {
  test('should generate valid quote', () => {
    const quote = manager.generateQuote('motivation');
    expect(quote).toHaveProperty('id');
    expect(quote.text.length).toBeGreaterThan(0);
  });
});
```

### Property-Based Tests

```typescript
fc.assert(
  fc.property(
    fc.string({ minLength: 10, maxLength: 500 }),
    (text) => {
      expect(text.length).toBeGreaterThanOrEqual(10);
      return true;
    }
  )
);
```

### Run Tests

```bash
# All tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# Properties only
npm run test:properties
```

## Documentation

### Update README

Add new features to README.md with:
- Feature description
- Usage example
- Links to full documentation

### Add Examples

Add usage examples to `examples/`:
- Create new `.md` file
- Include code and output
- Explain the use case

### Update Changelog

Add entry to CHANGELOG.md:
```markdown
### Added
- New feature description
```

## Development Tips

### Debug Output

```typescript
import chalk from 'chalk';

console.log(chalk.green('✓ Quote generated'));
console.error(chalk.red('✗ Error:', error.message));
```

### Quick Testing

```bash
# Run specific test
npm run test -- quotes.test.ts

# Run with verbose output
npm run test -- --verbose
```

### Performance Testing

```bash
// In your test
const start = Date.now();
// ... code to test ...
const duration = Date.now() - start;
console.log(`Took ${duration}ms`);
```

## Reporting Bugs

### Bug Report Template

```markdown
## Description
Clear description of the bug

## Steps to Reproduce
1. ...
2. ...
3. ...

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- Node version: 
- Kiro version:
- OS: Windows/Mac/Linux

## Additional Context
Screenshots, logs, etc.
```

## Feature Requests

### Feature Request Template

```markdown
## Description
Clear description of the feature

## Use Case
Why is this needed?

## Proposed Solution
How should this work?

## Alternatives
Other approaches?

## Additional Context
Examples, references, etc.
```

## Communication

- 💬 **Discussions:** Feature ideas, general questions
- 🐛 **Issues:** Bug reports, feature requests
- 📧 **Email:** For sensitive matters
- 🤝 **PR Comments:** Technical discussion

## Questions?

- 📖 Check the [README](README.md)
- 📚 Check the [skills documentation](skills/)
- 💬 [Start a discussion](https://github.com/yourusername/quote-generator-power/discussions)
- 🐛 [Search existing issues](https://github.com/yourusername/quote-generator-power/issues)

## Recognition

Contributors are recognized in:
- GitHub contributors page
- README.md acknowledgments section
- Release notes for major contributions

Thank you for contributing! 🎉

---

**Last Updated:** September 29, 2026
