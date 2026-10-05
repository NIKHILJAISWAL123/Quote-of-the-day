# Start Development Server - Instructions

## Prerequisites

Wait for `npm install` to complete. Check status:

```powershell
cd e:\kiro2
npm list
```

If you see the packages listed, installation is done.

---

## Option 1: Quick Start (Recommended)

### Command 1: Build the project
```powershell
cd e:\kiro2
npm run build
```

### Command 2: Start dev server
```powershell
npm run dev
```

This will start the CLI application which:
- ✅ Shows quote statistics
- ✅ Displays today's quote of the day
- ✅ Shows random quotes by category
- ✅ Validates quotes
- ✅ Displays project summary

---

## Option 2: Run Tests

### Run all tests
```powershell
npm run test
```

### Run property-based tests only
```powershell
npm run test:properties
```

### Run with coverage
```powershell
npm run test:coverage
```

---

## Option 3: Full Development Flow

```powershell
# Install (if not done yet)
npm install

# Build
npm run build

# Run tests
npm run test:properties

# Start application
npm run dev

# Format code
npm run format

# Check linting
npm run lint
```

---

## What Each Command Does

| Command | Purpose | Time |
|---------|---------|------|
| `npm install` | Installs dependencies | 1-2 min |
| `npm run build` | Compiles TypeScript | 10-30 sec |
| `npm run dev` | Runs the CLI app | Immediate |
| `npm run test` | Runs all tests | 5-10 sec |
| `npm run test:properties` | Property-based tests | 10-20 sec |
| `npm run format` | Auto-formats code | 5 sec |
| `npm run lint` | Checks code quality | 5 sec |

---

## Current Installation Status

🔄 **npm install** is running in background...

Once complete, you can run any of the commands above.

---

## Localhost Server Option

To run a simple HTTP server on localhost:

### Option A: Using Node (no extra setup)
```powershell
npx http-server ./dist -p 8080
```

Then visit: http://localhost:8080

### Option B: Using Python
```powershell
python -m http.server 8000 --directory ./dist
```

Then visit: http://localhost:8000

### Option C: Using npm http-server
```powershell
npm install -g http-server
http-server ./dist -p 8080
```

---

## Full Startup Sequence

```powershell
# 1. Navigate to project
cd e:\kiro2

# 2. Build
npm run build

# 3. Start HTTP server (in background)
npx http-server ./dist -p 8080

# 4. In another terminal, run CLI
npm run dev
```

Then:
- 🌐 Web: http://localhost:8080
- 💻 CLI: Shows output in terminal

---

## Recommended: Development Mode

```powershell
# Terminal 1: Watch and rebuild
npm run build -- --watch

# Terminal 2: Run tests in watch mode
npm run test:watch

# Terminal 3: Run the app
npm run dev
```

---

## Verify Everything Works

Run this to verify:

```powershell
cd e:\kiro2

# Check installation
npm list chalk uuid commander axios

# Run quick test
npm run test:properties

# Show stats
npm run dev
```

If all pass, you're ready to go! 🚀

---

## Need Help?

1. Check logs: `npm run build` (shows any errors)
2. Clear and reinstall: `rm -r node_modules; npm install`
3. Check Node version: `node --version` (need 18+)
4. Check npm version: `npm --version`

---

**When npm install finishes**, run:
```powershell
npm run dev
```

That's it! 🎉
