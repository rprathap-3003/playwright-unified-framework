# Playwright Model Context Protocol (MCP) Integration Guide

This framework integrates with **Playwright MCP**, exposing browser automation capabilities as standard MCP tools for AI agents (GitHub Copilot Agent Mode, Claude Desktop, Cursor, and custom agentic runners).

---

## 1. Why Playwright MCP?

Instead of relying solely on static code generation:
- **Interactive Exploration**: The AI agent can launch a browser, inspect DOM live, perform actions, and extract high-resilient locators.
- **Autonomous E2E Test Execution**: An agent can run a full user journey against your web or desktop web app and record Allure steps.
- **Self-Healing Locators**: If a test fails in CI or locally, the agent uses MCP tools to inspect the live page state and update broken locators.

---

## 2. Supported MCP Tools Available to Agents

| MCP Tool | Description | Example Usage |
| :--- | :--- | :--- |
| `navigate` | Directs the browser to a given URL | `navigate(url: "https://example.com")` |
| `click` | Clicks an element matched by selector or text | `click(selector: "button:has-text('Login')")` |
| `fill` | Clears and inputs text into an input field | `fill(selector: "#username", value: "admin")` |
| `hover` | Hovers over an element | `hover(selector: ".nav-dropdown")` |
| `take_screenshot` | Captures a viewport or full-page PNG | `take_screenshot(name: "login-page")` |
| `evaluate_script`| Executes JavaScript in the browser context | `evaluate_script(script: "window.scrollTo(0, 500)")` |
| `get_elements` | Lists interactive elements and their locators | `get_elements(selector: "button, input, a")` |

---

## 3. Configuring Playwright MCP in IDE & Agents

### A. In Claude Desktop / VS Code MCP Clients
Add the server entry to your client's MCP configuration (`claude_desktop_config.json` or `.vscode/mcp.json`):

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

### B. In GitHub Copilot Agent Mode / Terminal
You can launch the Playwright MCP server directly:
```bash
npx -y @executeautomation/playwright-mcp-server
```
or run the official MCP Playwright server:
```bash
npx -y @modelcontextprotocol/server-playwright
```

---

## 4. Driving Automated Tests via Playwright MCP

When paired with this framework, an AI agent can:
1. Boot the MCP browser session.
2. Navigate to your target application.
3. Automatically generate a typed Page Object extending `BasePage`.
4. Wrap all interactions inside `AllureHelper.step()`.
5. Verify tests run cleanly via `npm test`.
