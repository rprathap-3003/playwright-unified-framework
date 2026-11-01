# 🚀 Playwright Multi-Platform Enterprise Test Automation Framework
### Desktop (Electron / Native) • Mobile (Emulation / PWA) • Web (E2E) • Allure Reporting • Playwright MCP • GitHub Copilot

An enterprise-grade, multi-platform test automation framework built with **TypeScript**, **Playwright**, **Allure Reporting**, **Playwright Model Context Protocol (MCP)**, and **GitHub Copilot** AI-assisted authoring.

---

## 🌟 Key Highlights & Capabilities

- 🌐 **Unified Multi-Platform Support**:
  - **Web Applications**: Cross-browser testing on Chromium, Firefox, WebKit.
  - **Mobile Applications**: Device emulation for iOS (iPhone) and Android (Pixel), responsive layouts, and mobile drawers.
  - **Desktop Applications**: First-class automation of Electron desktop applications via Playwright `_electron`, with extension points for Windows Native (WinAppDriver / Appium).
- 📊 **Allure 3 Reporting**:
  - Auto-generated rich HTML dashboards with Epic -> Feature -> Story breakdowns.
  - Defect categorization (Product Defect, Timeout, Infrastructure).
  - Screenshots, videos, and full Playwright traces attached automatically on step or test failure.
- 🤖 **Playwright Model Context Protocol (MCP)**:
  - Enables AI agents (GitHub Copilot Agent Mode, Claude Desktop, Cursor) to control live browsers, inspect DOM elements, and self-heal or explore apps autonomously.
- 💡 **GitHub Copilot Native Integration**:
  - Dedicated `.github/copilot-instructions.md` enforce Page Object Model patterns, resilient locator strategies, and Allure decorators.
  - Reusable prompt templates in `.github/prompts/` for instant Page Object generation, test scenario writing, and locator self-healing.
- 🧩 **Robust Page Object Model (POM) & Custom Fixtures**:
  - Type-safe dependency injection of Page Objects into tests without manual instantiation.
  - Auto-logging and Allure step tracing for all locator interactions.

---

## 📁 Project Directory Structure

```text
playwright-unified-framework/
├── .github/
│   ├── copilot-instructions.md        # AI standards & coding guidelines for Copilot
│   ├── prompts/
│   │   ├── generate-page-object.prompt.md
│   │   ├── generate-test-case.prompt.md
│   │   └── self-heal-locator.prompt.md
│   └── workflows/
│       └── test-and-report.yml         # CI/CD workflow with Allure artifact generation
├── .vscode/
│   ├── extensions.json                # Recommended VS Code plugins
│   └── settings.json                  # IDE workspace settings
├── config/
│   ├── allure/
│   │   └── categories.json            # Defect classification rules
│   └── env.config.ts                  # Typed environment variables
├── mcp/
│   ├── mcp-server-config.json         # MCP server registration for AI agents
│   └── playwright-mcp-agent-guide.md  # Step-by-step MCP guide
├── src/
│   ├── core/
│   │   ├── base.page.ts               # Core Web/Mobile Page Object
│   │   ├── base.desktop.page.ts       # Core Desktop Page Object
│   │   └── test.fixture.ts            # Dependency-injected test fixtures
│   ├── desktop-app/                   # Sample Electron desktop application
│   │   ├── index.html
│   │   ├── main.js
│   │   └── preload.js
│   ├── pages/
│   │   ├── web/                       # Web Page Objects (LoginPage, InventoryPage)
│   │   ├── mobile/                    # Mobile Page Objects (MobileNavPage)
│   │   └── desktop/                   # Desktop Page Objects (DesktopAssistantPage)
│   └── utils/
│       ├── allure-helper.ts           # Allure steps, metadata & attachment helper
│       └── logger.ts                  # Colorized console logger
├── tests/
│   ├── web/                           # Web E2E test suites
│   ├── mobile/                        # Mobile emulation test suites
│   └── desktop/                       # Desktop application test suites
├── playwright.config.ts               # Multi-project Playwright configuration
├── package.json                       # Scripts and dependencies
├── tsconfig.json                      # TypeScript configuration with path aliases
└── README.md                          # Framework documentation
```

---

## ⚡ Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18 or higher (v20+ recommended)
- **Java JRE/JDK**: 11 or higher (required by Allure CLI to compile HTML reports)

### 2. Installation
Open your terminal in the project directory:

```bash
cd playwright-unified-framework
npm install
npx playwright install --with-deps
```

### 3. Running Tests by Platform

```bash
# Run ALL test suites (Web, Mobile, Desktop)
npm test

# Run Web tests across Chromium, Firefox, and WebKit
npm run test:web

# Run Mobile tests on Pixel 7 and iPhone 15 emulation
npm run test:mobile

# Run Desktop Electron tests
npm run test:desktop

# Run tests in headed browser mode
npm run test:headed

# Run tests with Playwright Interactive Debugger (Inspector)
npm run test:debug
```

---

## 📊 Allure Reporting Workflow

The framework produces Allure XML/JSON results in `./allure-results` and compiles an interactive HTML dashboard:

```bash
# Generate the Allure HTML report from test results
npm run allure:generate

# Open the generated Allure report in default browser
npm run allure:open

# Start a local web server serving the Allure report dynamically
npm run allure:serve

# One-shot command: run tests, generate report, and open
npm run report
```

### Allure Features Configured:
- **Hierarchical Grouping**: Epic ➔ Feature ➔ Story.
- **Defect Categories**: Automatic tagging of Assertion failures vs Timeouts vs Infrastructure issues.
- **Visual Artifacts**: Failure screenshots, full DOM traces, and test execution videos attached.

---

## 🤖 Playwright MCP (Model Context Protocol) Integration

Playwright MCP allows autonomous agents (such as Claude Desktop, GitHub Copilot Agent Mode, or Cursor) to directly manipulate browsers.

### Registering the MCP Server
Use the configuration located in `mcp/mcp-server-config.json` inside your agent client (e.g., Claude Desktop `claude_desktop_config.json` or `.vscode/mcp.json`):

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@executeautomation/playwright-mcp-server"],
      "env": {
        "HEADLESS": "false"
      }
    }
  }
}
```

### What You Can Ask the MCP Agent:
- *"Navigate to https://www.saucedemo.com, log in as standard_user, and capture a full-page screenshot."*
- *"Inspect the product list and extract accessible locator roles for the add to cart buttons."*
- *"Heal broken locator on checkout form by scanning the live DOM."*

See [`mcp/playwright-mcp-agent-guide.md`](mcp/playwright-mcp-agent-guide.md) for complete details.

---

## 💡 GitHub Copilot Integration

This repository includes custom instructions and prompt templates specifically tuned for GitHub Copilot.

### 1. Custom Workspace Instructions (`.github/copilot-instructions.md`)
GitHub Copilot automatically loads these instructions whenever you chat or request code suggestions. It ensures:
- All generated Page Objects extend `BasePage` or `BaseDesktopPage`.
- Prioritizes resilient locators (`getByRole`, `getByLabel`, `getByTestId`).
- Annotates every test suite with `AllureHelper.setMetadata(...)`.
- Injects Page Objects via `test.fixture.ts` instead of manual instantiation.

### 2. Prompt Templates (`.github/prompts/`)
In GitHub Copilot Chat (VS Code), reference these prompts:
- `/generate-page-object`: Generates compliant Page Objects from HTML snippets or acceptance criteria.
- `/generate-test-case`: Writes structured test specifications with Allure decorators.
- `/self-heal-locator`: Diagnoses failed locators and suggests resilient alternatives.

---

## 🖥️ Desktop & Mobile Deep Dive

### Desktop Applications (Electron & Native)
1. **Electron Apps**: Automated directly via Playwright's native `_electron` API. The fixture in `src/core/test.fixture.ts` handles launch, window detection, and cleanup automatically.
2. **Native Windows Applications**: For pure Win32/WPF/WinUI native apps, you can easily bridge Playwright with Appium Windows Driver (WinAppDriver) using the same POM architecture.

### Mobile Applications (Emulation & Native)
1. **Mobile Web & Responsive Apps**: Built-in Playwright device descriptors (`Pixel 7`, `iPhone 15`) emulate screen dimensions, pixel ratios, touch events, and user agents accurately.
2. **Native iOS/Android Apps**: For native binary APK/IPA automation, standard Appium / WebdriverIO bindings can be slotted in alongside the fixture layer.
