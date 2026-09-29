# Quick Start Guide

**Quote of the Day Generator - Kiro Curriculum Project**

## ⚡ 5-Minute Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Build
```bash
npm run build
```

### 3. Run
```bash
npm run dev
```

You'll see:
- ✓ Sample quotes added
- ✓ Quote collection statistics
- ✓ Today's quote of the day
- ✓ Random quotes by category
- ✓ Validation examples
- ✓ Project components summary

## 📖 What Each Command Does

| Command | Purpose |
|---------|---------|
| `npm run build` | Compile TypeScript to JavaScript |
| `npm run dev` | Run app in development mode |
| `npm start` | Run compiled app |
| `npm run test` | Run all tests |
| `npm run test:watch` | Tests in watch mode |
| `npm run test:coverage` | Coverage report |
| `npm run test:properties` | Property-based tests only |
| `npm run lint` | Check code quality |
| `npm run format` | Auto-format code |

## 🎓 Learning Path (20 minutes)

### Step 1: Understand the Spec (5 min)
Read: `.kiro/specs/feature-ai-quote-generation.md`
- See the complete specification
- Understand requirements and design

### Step 2: Review Steering Docs (5 min)
Read: `.kiro/steering/*.md` (3 files)
- project-standards.md - Code conventions
- quote-format.md - Data model
- ai-integration.md - AI setup

### Step 3: Run Tests (5 min)
```bash
npm run test:properties
```
See 10 core invariants being tested

### Step 4: Review Power (5 min)
Read: `powers/quote-generator-power/README.md`
- Understand power structure
- See usage examples

## 🔍 Project Tour

### Location of Each Lesson

**Lesson 1 - Spec:** `.kiro/specs/feature-ai-quote-generation.md`
**Lesson 2 - Steering:** `.kiro/steering/` (3 files)
**Lesson 3 - Hooks:** `.kiro/hooks/` (3 hooks)
**Lesson 4 - PBT:** `tests/properties.test.ts` (10 invariants)
**Lesson 5 - Power:** `.kiro/powers/quote-generator-power.json` + skills
**Lesson 6 - MCP:** `.kiro/MCP_SETUP.md`
**Lesson 7 - Agents:** `.kiro/agents/` (2 agents)
**Bonus 2 - Packaging:** `powers/quote-generator-power/` (complete package)

## 💡 Key Files to Explore

1. **`README.md`** - Project overview
2. **`src/validators.ts`** - Validation logic (follows spec)
3. **`src/quotes.ts`** - Quote Manager
4. **`tests/properties.test.ts`** - Property-based tests
5. **`powers/quote-generator-power/README.md`** - Power docs

## 🧪 Running Tests

### All Tests
```bash
npm run test
```

### Only Property-Based Tests
```bash
npm run test:properties
```

### Specific Test File
```bash
npm run test -- quotes.test.ts
```

### With Coverage
```bash
npm run test:coverage
```

### Watch Mode
```bash
npm run test:watch
```

## 📝 Project Statistics

- **Files:** 35+
- **Source Code:** ~1,000 lines
- **Tests:** ~800 lines
- **Documentation:** ~2,000 lines
- **Credits:** 4,250
- **Status:** ✅ Complete

## ❓ FAQ

### Q: Where do I start learning?
**A:** Read `README.md` first, then `.kiro/specs/feature-ai-quote-generation.md`

### Q: How do I run the project?
**A:** `npm install` → `npm run build` → `npm run dev`

### Q: Where are the tests?
**A:** `tests/` directory. Run with `npm run test`

### Q: What about the power?
**A:** In `powers/quote-generator-power/` - fully packaged and ready to share

### Q: How do I verify it works?
**A:** Run `npm run test:properties` to see 10 core invariants tested

### Q: Can I use this as a template?
**A:** Yes! Follow the structure in `.kiro/steering/project-standards.md`

### Q: How many credits is this?
**A:** 4,250 credits total (7 lessons × 250-1000 + bonus × 250)

## 🚀 Next Steps

1. **Run the project:** `npm run dev`
2. **Explore the code:** Start with `src/types.ts`
3. **Study the tests:** `tests/properties.test.ts` for property-based testing
4. **Review the power:** `powers/quote-generator-power/README.md`
5. **Read the docs:** `.kiro/steering/` files
6. **Extend it:** Add new quote categories or features

## 📚 Resources

- [Main README](README.md) - Complete project documentation
- [Feature Spec](.kiro/specs/feature-ai-quote-generation.md) - Technical specification
- [Steering Docs](.kiro/steering/) - Project knowledge
- [Power Docs](powers/quote-generator-power/README.md) - Power usage guide
- [Project Summary](PROJECT_SUMMARY.md) - Completion checklist

## 💬 Tips

- Use `npm run format` to auto-format code
- Run `npm run test:watch` while developing
- Check `npm run lint` for code issues
- Read `.kiro/steering/project-standards.md` for conventions
- Property-based tests are in `tests/properties.test.ts`

---

**Ready?** Run `npm run dev` to start! 🎉
