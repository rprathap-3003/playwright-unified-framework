---
description: "Generate a new Page Object following the Playwright + Allure framework standards"
---

# Generate Page Object

You are creating a new Page Object for our enterprise test automation framework.

## Requirements:
1. Target Platform: Specify if this is Web, Mobile, or Desktop.
2. Inheritance:
   - For Web/Mobile: Extend `BasePage` from `@core/base.page`.
   - For Desktop: Extend `BaseDesktopPage` from `@core/base.desktop.page`.
3. Locators:
   - Use `readonly` locator properties initialized in constructor.
   - Prefer role-based locators (`getByRole`), label locators (`getByLabel`), or test IDs (`getByTestId`).
4. Methods:
   - Encapsulate user actions into semantic business methods.
   - Wrap critical business steps inside `AllureHelper.step()`.
   - Use `this.captureStepScreenshot()` for critical visual assertions.
5. Export the class cleanly.

## Input Context:
Page Name: {{pageName}}
HTML Snippet or Feature Requirements:
{{htmlOrRequirements}}
