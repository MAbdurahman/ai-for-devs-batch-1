# AI-Enabled Development Environment Setup Handbook

This handbook walks you through setting up everything you need to start coding with AI tools. Follow each section in order. By the end, you will have a fully working AI-powered development environment.

If you get stuck on any step, check the Troubleshooting section at the bottom.

---

## 1. VS Code (Your Code Editor)

VS Code is a free, lightweight code editor made by Microsoft. Most AI coding tools plug into it as extensions.

### How to Install

1. Go to https://code.visualstudio.com/
2. Download the installer for your operating system
3. Run the installer
4. IMPORTANT: When the installer asks, check the box that says "Add to PATH" — this lets you open VS Code from the terminal

### Check If It Worked

Open your terminal (Command Prompt or PowerShell) and type:

```bash
code --version
```

If you see a version number, you are good to go.

### Useful Extensions to Install

Open your terminal and run these one by one:

```bash
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
```

What these do:
- ms-python.python — Python language support
- vscode-typescript-next — Better TypeScript support
- prettier — Auto-formats your code so it looks clean
- eslint — Catches JavaScript/TypeScript errors as you type

### Recommended Settings

Open VS Code settings with Ctrl + , (comma) and set these:
- Auto Save: Set "files.autoSave" to "afterDelay" — so you never lose work
- Format on Save: Turn on "editor.formatOnSave" — your code gets formatted every time you save

---

## 2. Node.js (JavaScript Runtime)

Node.js lets you run JavaScript outside the browser. Many AI CLI tools (like Claude Code and Gemini CLI) need it to work.

### How to Install

Option A: Direct Download (Simplest)

1. Go to https://nodejs.org/
2. Download the LTS (Long Term Support) version — this is the stable one
3. Run the installer and follow the prompts
4. Restart your terminal after installation

Option B: Using nvm (Better for managing versions)

nvm lets you install multiple versions of Node.js and switch between them. Useful if different projects need different versions.

1. Download nvm-windows from: https://github.com/coreybutler/nvm-windows/releases
2. Install it
3. Open a new terminal and run:

```bash
nvm install --lts
nvm use --lts
```

### Check If It Worked

```bash
node --version
npm --version
```

Both should show version numbers.

### Install Some Useful Global Packages

```bash
npm install -g nodemon
npm install -g typescript
npm install -g ts-node
```

What these do:
- nodemon — Automatically restarts your app when you change code
- typescript — Lets you write typed JavaScript
- ts-node — Run TypeScript files directly without compiling first

---

## 3. GitHub Copilot

GitHub Copilot is an AI code assistant that lives inside VS Code. It suggests code as you type, like autocomplete on steroids.

### What You Need First

- A GitHub account (free at https://github.com)
- A Copilot subscription — free if you are a student (apply at https://education.github.com), otherwise $10/month

### How to Install

Option A: Using VS Code UI

1. Open VS Code
2. Press Ctrl + Shift + X to open the Extensions panel
3. Search for "GitHub Copilot"
4. Install both "GitHub Copilot" and "GitHub Copilot Chat"

Option B: Using terminal

```bash
code --install-extension GitHub.copilot
code --install-extension GitHub.copilot-chat
```

### How to Activate It

1. Look at the bottom-left corner of VS Code
2. Click "Sign in to GitHub"
3. A browser window opens — authorize the extension
4. Come back to VS Code — you should see the Copilot icon in the bottom status bar

### How to Use It

- Just start typing code — Copilot shows gray suggestions
- Press Tab to accept a suggestion
- Press Esc to dismiss it
- Press Ctrl + Shift + I to open Copilot Chat (ask questions in natural language)
- Select code and press Ctrl + I for inline chat (ask Copilot about specific code)

### Quick Test

Create a new file called test.js and type this comment:

```javascript
// function to calculate fibonacci
```

Wait a second. Copilot should suggest a complete function below your comment. If it does, everything is working.

---

## 4. Claude Code (CLI Agent)

Claude Code is a command-line AI tool made by Anthropic. You run it in your terminal and it can read, write, and modify your entire project. Think of it as an AI developer sitting in your terminal.

### What You Need First

- Node.js version 18 or higher (you installed this in step 2)
- An Anthropic API key — get one at https://console.anthropic.com/

### How to Install

```bash
npm install -g @anthropic-ai/claude-code
```

### How to Set Up Your API Key

You need to tell Claude Code your API key so it can connect to Anthropic's servers.

For Windows CMD (temporary, lasts until you close the terminal):

```bash
set ANTHROPIC_API_KEY=your-api-key-here
```

For Windows PowerShell (temporary):

```bash
$env:ANTHROPIC_API_KEY="your-api-key-here"
```

For permanent setup (so you do not have to type it every time):
1. Open Start Menu, search "Environment Variables"
2. Click "Edit the system environment variables"
3. Click "Environment Variables" button
4. Under User Variables, click "New"
5. Variable name: ANTHROPIC_API_KEY
6. Variable value: paste your key
7. Click OK, restart your terminal

### Check If It Worked

```bash
claude --version
```

### How to Use It

Navigate to your project folder first, then start Claude:

```bash
cd your-project-folder
claude
```

Now you can talk to it like a chat. Some examples:

```bash
claude "explain this codebase structure"
claude "add error handling to the auth module"
claude "review main.py for security issues"
```

### Commands You Can Use Inside a Claude Code Session

| Command | What It Does |
|---------|--------------|
| /help | Shows all available commands |
| /clear | Clears the conversation history and starts fresh |
| /exit | Exits Claude Code |
| Just type normally | Ask questions or give instructions |

---

## 5. Gemini CLI

Gemini CLI is Google's command-line AI tool. Similar to Claude Code but powered by Google's Gemini model.

### What You Need First

- Node.js version 18 or higher
- A Google AI API key from: https://aistudio.google.com/apikey

### How to Install

```bash
npm install -g @google/gemini-cli
```

### How to Set Up Your API Key

For Windows CMD (temporary):

```bash
set GOOGLE_API_KEY=your-api-key-here
```

For Windows PowerShell (temporary):

```bash
$env:GOOGLE_API_KEY="your-api-key-here"
```

Or you can log in with your Google account instead:

```bash
gemini auth login
```

### Check If It Worked

```bash
gemini --version
```

### How to Use It

```bash
# Start an interactive session
gemini

# Give it a one-shot task
gemini "create a REST API with Express and TypeScript"

# Work inside a project
cd your-project-folder
gemini "add unit tests for the utils module"
```

---

## 6. Python Setup (For AI/ML Projects)

Python is the most popular language for AI and machine learning. Even if you mostly write JavaScript, you will need Python for some AI libraries.

### How to Install

1. Go to https://www.python.org/downloads/
2. Download the latest version
3. Run the installer
4. IMPORTANT: Check the box that says "Add Python to PATH" — do not skip this

### Check If It Worked

```bash
python --version
pip --version
```

### Setting Up a Virtual Environment

A virtual environment keeps your project's packages separate from other projects. Always use one.

```bash
# Create a virtual environment (run this inside your project folder)
python -m venv venv

# Activate it (Windows CMD)
venv\Scripts\activate

# Activate it (PowerShell)
.\venv\Scripts\Activate.ps1
```

When activated, you will see (venv) at the beginning of your terminal prompt.

### Install Common AI Packages

With your virtual environment activated:

```bash
pip install openai anthropic google-generativeai langchain
```

What these do:
- openai — Talk to OpenAI's API (GPT models)
- anthropic — Talk to Anthropic's API (Claude models)
- google-generativeai — Talk to Google's API (Gemini models)
- langchain — Framework for building AI-powered applications

---

## 7. Git and GitHub Setup

Git tracks changes to your code. GitHub hosts your code online and lets you collaborate with others. Every developer needs both.

### How to Install Git

1. Go to https://git-scm.com/downloads
2. Download and install with default options

### Check If It Worked and Configure

```bash
git --version
```

Now set your name and email (GitHub uses these to identify your commits):

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
git config --global init.defaultBranch main
```

### GitHub CLI (Optional but Handy)

The GitHub CLI lets you create repos, pull requests, and more from your terminal.

```bash
# Install via winget
winget install GitHub.cli

# Or download from: https://cli.github.com/

# Log in to your GitHub account
gh auth login

# Check if it worked
gh auth status
```

---

## 8. Managing Your API Keys Safely

You will have several API keys (Anthropic, OpenAI, Google). Here is the safe way to manage them.

### Step 1: Create a .env File

In your project's root folder, create a file called .env and put your keys in it:

```
ANTHROPIC_API_KEY=sk-ant-xxxxx
OPENAI_API_KEY=sk-xxxxx
GOOGLE_API_KEY=AIzaxxxxx
```

### Step 2: Install dotenv (To Load Keys in Code)

For Node.js projects:
```bash
npm install dotenv
```

For Python projects:
```bash
pip install python-dotenv
```

### Step 3: Add .env to .gitignore

This is critical. It prevents your keys from being uploaded to GitHub where anyone can see them.

```bash
echo .env >> .gitignore
```

NEVER commit API keys to version control. If you accidentally push a key to GitHub, consider it compromised — revoke it immediately and generate a new one.

---

## Quick Verification Checklist

Run all of these commands. If each one shows a version number, your setup is complete.

```bash
code --version          # VS Code
node --version          # Node.js
npm --version           # npm (comes with Node.js)
python --version        # Python
git --version           # Git
gh --version            # GitHub CLI
claude --version        # Claude Code
gemini --version        # Gemini CLI
```

---

## Troubleshooting Common Issues

| Problem | How to Fix It |
|---------|---------------|
| "node is not recognized" | Restart your terminal. If still broken, reinstall Node.js and make sure "Add to PATH" is checked. |
| "claude is not recognized" | Run `npm install -g @anthropic-ai/claude-code` again. Make sure Node.js is installed first. |
| Copilot is not suggesting anything | Check your subscription is active. Try signing out and back in. |
| API key not working | Go to the provider's dashboard and verify the key exists. Check for typos or extra spaces. |
| Permission denied when installing npm packages | Run your terminal as Administrator, or better yet, use nvm to manage Node.js. |
| Python venv will not activate in PowerShell | Run this command first: `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser` |
| "python is not recognized" | Reinstall Python and check "Add to PATH". Or try using `python3` instead of `python`. |

---

## Recommended Folder Structure for This Course

Keep your work organized like this:

```
ai-tools/
    lecture-1-tool-mindmap/
        notes.md
        setuphandbook.md
        demo-1/
    lecture-2/
    projects/
    .env              (your API keys - git-ignored)
    .gitignore        (tells git to ignore .env and other files)
```

---

## What to Do Next

1. Follow each section above in order
2. Run the verification checklist to confirm everything works
3. If something fails, check the troubleshooting table
4. Once everything passes, you are ready to start coding with AI tools
