# How to Create a New Git Commit

## 📝 **Step-by-Step Commands**

### **Step 1: Check what changed**
```powershell
cd e:\kiro2
git status
```

You'll see files marked as:
- `modified:` - Files you changed
- `new file:` - Files you created

---

### **Step 2: Stage your changes**

**Option A: Stage ALL changes**
```powershell
git add .
```

**Option B: Stage specific files**
```powershell
git add dist/index.html
git add server.js
```

---

### **Step 3: Check staged files**
```powershell
git status
```

Staged files will be green and show "Changes to be committed"

---

### **Step 4: Create a commit**
```powershell
git commit -m "your message here"
```

**Example messages:**
```powershell
git commit -m "feat: add beautiful website interface"
git commit -m "feat: simplify quote display to show only quotes"
git commit -m "fix: update server to serve index.html"
```

---

## 🎯 **COMPLETE COMMAND SEQUENCE**

Copy and paste these commands:

```powershell
cd e:\kiro2
git status
git add .
git commit -m "feat: add website interface with quote display"
git log --oneline
```

---

## ✨ **What Each Command Does**

| Command | What it does |
|---------|-------------|
| `git status` | Shows what changed |
| `git add .` | Stages all changes |
| `git add filename` | Stages specific file |
| `git commit -m "message"` | Creates commit with message |
| `git log` | Shows all commits |
| `git log --oneline` | Shows commits in short format |

---

## 📋 **YOUR CHANGES (Ready to Commit)**

New/Modified files:
- ✅ `dist/index.html` - New beautiful website interface
- ✅ `server.js` - Updated to serve index.html
- ✅ Other files you created

---

## 💡 **COMMIT MESSAGE FORMAT**

Good format:
```
<type>(<scope>): <subject>

<optional body>
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `refactor` - Code refactoring
- `docs` - Documentation
- `style` - Code formatting

**Examples:**
```powershell
git commit -m "feat: add website UI for quote display"
git commit -m "fix: update server to serve HTML"
git commit -m "refactor: simplify quote interface"
```

---

## 🚀 **THEN PUSH TO GITHUB**

After committing locally, push to GitHub:

```powershell
git push -u origin main
```

**Or if remote already set:**
```powershell
git push
```

---

## 🔍 **VERIFY YOUR COMMIT**

Check your commits:
```powershell
git log --oneline
```

You should see:
```
abc1234 (HEAD -> main) feat: add website interface
def5678 feat: Quote of the Day Generator - All 7 Kiro Lessons
```

---

## ⚠️ **IF YOU MADE A MISTAKE**

### Undo last commit (keep changes)
```powershell
git reset --soft HEAD~1
```

### Undo last commit (discard changes)
```powershell
git reset --hard HEAD~1
```

### Change last commit message
```powershell
git commit --amend -m "new message"
```

---

## ✅ **QUICK REFERENCE**

```powershell
# 1. Check status
git status

# 2. Stage changes
git add .

# 3. Create commit
git commit -m "feat: add website interface"

# 4. View commits
git log --oneline

# 5. Push to GitHub
git push
```

That's it! 🎉
