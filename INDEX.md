# Project Index - Quote of the Day Generator

**Complete Kiro Curriculum Implementation (All 7 Lessons + Bonus 2)**

## 📋 Navigation Guide

### Start Here
- **[README.md](README.md)** - Project overview and features
- **[QUICK_START.md](QUICK_START.md)** - 5-minute setup guide
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Completion checklist

### Lesson 1: Spec-Driven Development (250 credits)
📄 **File:** [`.kiro/specs/feature-ai-quote-generation.md`](.kiro/specs/feature-ai-quote-generation.md)
- Requirements definition
- Technical design
- Implementation phases
- Success criteria

### Lesson 2: Steering Documents (250 credits)
📂 **Directory:** [`.kiro/steering/`](.kiro/steering/)

1. **[project-standards.md](.kiro/steering/project-standards.md)**
   - File structure
   - Naming conventions
   - Code style guide
   - Testing standards
   - Dependencies

2. **[quote-format.md](.kiro/steering/quote-format.md)**
   - Quote data model
   - Validation rules
   - JSON storage format
   - Category guidelines
   - Import standards

3. **[ai-integration.md](.kiro/steering/ai-integration.md)**
   - MCP server configuration
   - AI client integration
   - Quote generation strategy
   - Caching strategy
   - Error handling

### Lesson 3: Hooks & Automation (250 credits)
📂 **Directory:** [`.kiro/hooks/`](.kiro/hooks/)

1. **[lint-on-save.json](.kiro/hooks/lint-on-save.json)** - Lint TypeScript on save
2. **[test-after-task.json](.kiro/hooks/test-after-task.json)** - Run tests after tasks
3. **[format-on-create.json](.kiro/hooks/format-on-create.json)** - Format new files

### Lesson 4: Property-Based Testing (500 credits)
📄 **File:** [tests/properties.test.ts](tests/properties.test.ts)

10 Core Invariants Tested:
1. Quote IDs are valid UUIDs
2. Text length is valid (10-500 chars)
3. Author length is valid (2-100 chars)
4. Category is always valid
5. DateAdded never in future
6. Collection consistency maintained
7. Operations preserve invariants
8. AI responses are valid
9. Category filtering is consistent
10. Metadata stays synchronized

### Lesson 5: Kiro Powers (500 credits)
📄 **Files:**
- [`.kiro/powers/quote-generator-power.json`](.kiro/powers/quote-generator-power.json) - Power manifest
- **Skills:**
  - [quote-generation.md](.kiro/powers/quote-generation-skill.md)
  - [quote-analysis.md](.kiro/powers/quote-analysis-skill.md)
  - [quote-categorization.md](.kiro/powers/quote-categorization-skill.md)
  - [productivity-tips.md](.kiro/powers/productivity-tips-skill.md)
- **Steering:**
  - [quote-best-practices.md](.kiro/powers/quote-best-practices.md)

### Lesson 6: Model Context Protocol (1,000 credits)
📄 **File:** [`.kiro/MCP_SETUP.md`](.kiro/MCP_SETUP.md)
- MCP server configuration
- Claude AI setup
- Ollama local LLM setup
- Rate limiting configuration
- Caching strategy
- Error handling and recovery
- Troubleshooting guide

### Lesson 7: Custom Agents (1,000 credits)
📂 **Directory:** [`.kiro/agents/`](.kiro/agents/)

1. **[task-validator-agent.json](.kiro/agents/task-validator-agent.json)**
   - Strict validation
   - Read-only tools
   - No MCP access
   - Supervised autonomy

2. **[ai-assistant-agent.json](.kiro/agents/ai-assistant-agent.json)**
   - Permissive configuration
   - Full MCP access
   - Autopilot autonomy
   - Rate limiting

### Bonus Lesson 2: Package a Kiro Power (250 credits)
📂 **Directory:** [powers/quote-generator-power/](powers/quote-generator-power/)

**Complete Package Contents:**
- **[power.json](powers/quote-generator-power/power.json)** - Power manifest
- **[README.md](powers/quote-generator-power/README.md)** - Comprehensive documentation
- **[CHANGELOG.md](powers/quote-generator-power/CHANGELOG.md)** - Version history
- **[CONTRIBUTING.md](powers/quote-generator-power/CONTRIBUTING.md)** - Contribution guidelines
- **[BEST_PRACTICES.md](powers/quote-generator-power/BEST_PRACTICES.md)** - Usage guidelines
- **[LICENSE](powers/quote-generator-power/LICENSE)** - MIT license
- **[package.json](powers/quote-generator-power/package.json)** - NPM configuration
- **Skills:** Full documentation
- **Steering:** Best practices

### Application Code (Tasks 9-10)
📂 **Directory:** `src/`
- **[app.ts](src/app.ts)** - CLI application entry point
- **[types.ts](src/types.ts)** - Core type definitions
- **[quotes.ts](src/quotes.ts)** - Quote Manager (CRUD operations)
- **[validators.ts](src/validators.ts)** - Validation logic

📂 **Directory:** `tests/`
- **[properties.test.ts](tests/properties.test.ts)** - Property-based tests
- **[quotes.test.ts](tests/quotes.test.ts)** - Unit tests

### Configuration Files
- **[package.json](package.json)** - NPM dependencies and scripts
- **[tsconfig.json](tsconfig.json)** - TypeScript configuration
- **[jest.config.js](jest.config.js)** - Jest test configuration

### Data
- **[data/quotes.json](data/quotes.json)** - Quote storage (created at runtime)

## 🎯 By Learning Objective

### Understanding Project Structure
1. Read [README.md](README.md)
2. Review [project-standards.md](.kiro/steering/project-standards.md)
3. Look at `src/` directory structure

### Understanding Quote Management
1. Study [quote-format.md](.kiro/steering/quote-format.md)
2. Review [src/types.ts](src/types.ts)
3. Examine [src/validators.ts](src/validators.ts)
4. Study [src/quotes.ts](src/quotes.ts)

### Understanding Validation
1. Read [quote-format.md](.kiro/steering/quote-format.md) (rules)
2. Review [src/validators.ts](src/validators.ts) (implementation)
3. Study [tests/quotes.test.ts](tests/quotes.test.ts) (test cases)

### Understanding Testing
1. Review [tests/properties.test.ts](tests/properties.test.ts) (10 invariants)
2. Study [tests/quotes.test.ts](tests/quotes.test.ts) (unit tests)
3. Run: `npm run test:properties`

### Understanding AI Integration
1. Read [ai-integration.md](.kiro/steering/ai-integration.md)
2. Review [.kiro/MCP_SETUP.md](.kiro/MCP_SETUP.md)
3. Check [ai-assistant-agent.json](.kiro/agents/ai-assistant-agent.json)

### Understanding Hooks
1. Review 3 files in [.kiro/hooks/](.kiro/hooks/)
2. Understand event triggers and matchers
3. See how they integrate with project

### Understanding Powers
1. Read [powers/quote-generator-power/README.md](powers/quote-generator-power/README.md)
2. Review 4 skill files
3. Check [power.json](powers/quote-generator-power/power.json) manifest

### Understanding Custom Agents
1. Review 2 files in [.kiro/agents/](.kiro/agents/)
2. Compare permissions between them
3. See how they integrate with MCP

## 📚 Documentation Files

### Quick References
- [QUICK_START.md](QUICK_START.md) - 5-minute setup
- [INDEX.md](INDEX.md) - This file

### Comprehensive Guides
- [README.md](README.md) - Full project documentation
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Completion checklist
- [powers/quote-generator-power/README.md](powers/quote-generator-power/README.md) - Power guide
- [powers/quote-generator-power/BEST_PRACTICES.md](powers/quote-generator-power/BEST_PRACTICES.md) - Usage guide

### Technical Documentation
- [.kiro/specs/feature-ai-quote-generation.md](.kiro/specs/feature-ai-quote-generation.md) - Feature spec
- [.kiro/steering/project-standards.md](.kiro/steering/project-standards.md) - Code standards
- [.kiro/steering/quote-format.md](.kiro/steering/quote-format.md) - Data model
- [.kiro/steering/ai-integration.md](.kiro/steering/ai-integration.md) - AI integration
- [.kiro/MCP_SETUP.md](.kiro/MCP_SETUP.md) - MCP configuration

### Skill Documentation
- [.kiro/powers/quote-generation-skill.md](.kiro/powers/quote-generation-skill.md)
- [.kiro/powers/quote-analysis-skill.md](.kiro/powers/quote-analysis-skill.md)
- [.kiro/powers/quote-categorization-skill.md](.kiro/powers/quote-categorization-skill.md)
- [.kiro/powers/productivity-tips-skill.md](.kiro/powers/productivity-tips-skill.md)

## 🎓 Learning Paths

### For Beginners
1. [QUICK_START.md](QUICK_START.md) - Setup
2. [README.md](README.md) - Overview
3. [.kiro/specs/feature-ai-quote-generation.md](.kiro/specs/feature-ai-quote-generation.md) - Spec
4. Run `npm run dev` - See it work

### For Intermediate
1. Review [.kiro/steering/](.kiro/steering/) files
2. Study [tests/properties.test.ts](tests/properties.test.ts)
3. Examine [src/](src/) code
4. Review [.kiro/agents/](.kiro/agents/) agents

### For Advanced
1. Study all steering documents
2. Understand property-based testing deeply
3. Review power packaging structure
4. Examine MCP setup and configuration
5. Study custom agent permissions

## 🚀 Quick Commands

| Goal | Command |
|------|---------|
| Setup | `npm install` |
| Build | `npm run build` |
| Run | `npm run dev` |
| Test | `npm run test` |
| Test (PBT) | `npm run test:properties` |
| Format | `npm run format` |
| Lint | `npm run lint` |

## 📊 Project Statistics

- **Total Files:** 35+
- **Documentation:** 10+ markdown files
- **Source Code:** 4 TypeScript files
- **Tests:** 2 test suites with 100+ test cases
- **Credits:** 4,250 total

## ✅ Verification Checklist

Use this to verify everything is working:

- [ ] Run `npm install` - installs dependencies
- [ ] Run `npm run build` - compiles successfully
- [ ] Run `npm run dev` - app runs without errors
- [ ] Run `npm run test` - all tests pass
- [ ] Run `npm run test:properties` - 10 invariants pass
- [ ] Read [README.md](README.md) - understand project
- [ ] Review [.kiro/specs/feature-ai-quote-generation.md](.kiro/specs/feature-ai-quote-generation.md) - understand spec
- [ ] Examine [tests/properties.test.ts](tests/properties.test.ts) - understand PBT
- [ ] Check [powers/quote-generator-power/README.md](powers/quote-generator-power/README.md) - understand power

## 🏆 Credits Summary

| Lesson | Credit | Files |
|--------|--------|-------|
| 1 | 250 | 1 spec |
| 2 | 250 | 3 steering docs |
| 3 | 250 | 3 hooks |
| 4 | 500 | 1 test suite (10 invariants) |
| 5 | 500 | 1 power + 4 skills |
| 6 | 1,000 | 1 config guide |
| 7 | 1,000 | 2 agents |
| B2 | 250 | 1 packaged power |
| **Total** | **4,250** | **35+ files** |

---

**Status:** ✅ Complete  
**Last Updated:** September 29, 2026  
**Ready for submission:** Yes
