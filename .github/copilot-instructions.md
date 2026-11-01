# GitHub Copilot Instructions for Playwright Unified Automation Framework

This project is an Enterprise-grade Multi-Platform (Web, Mobile Emulation, and Desktop Electron) Test Automation Framework built on **Playwright**, **TypeScript**, **Allure Reporting**, and **Playwright MCP**.

Whenever you suggest, generate, or refactor test automation code, adhere strictly to the following standards and patterns.

---

## 1. Architectural Guidelines & Page Object Model (POM)

- **Web & Mobile Page Objects**:
  - Must extend `BasePage` from `@core/base.page`.
  - Store locators as readonly properties initialized in the constructor.
  - Follow the encapsulation pattern: methods perform business actions and return either `void` or a subsequent Page Object.
  - Never expose raw Playwright locators for direct manipulation inside spec files.
- **Desktop Page Objects**:
  - Must extend `BaseDesktopPage` from `@core/base.desktop.page`.
  - Interact with desktop controls via the `this.window` Playwright page reference or evaluate Electron main process functions via `this.electronApp`.

---

## 2. Locator Strategy (Priority Order)

Always prioritize user-facing, resilient locators in this order:
1. `page.getByRole('button', { name: 'Submit' })`
2. `page.getByLabel('Username')`
3. `page.getByPlaceholder('Enter your email')`
4. `page.getByTestId('data-testid')`
5. `page.getByText('Specific text', { exact: true })`

**Forbidden**:
- Do **NOT** use brittle CSS hierarchies (`div > ul > li:nth-child(3) > a`).
- Do **NOT** use absolute or generated XPaths (`/html/body/div[2]/div/form/button`).

---

## 3. Allure Reporting Standards

Every test and interaction must produce rich metadata for Allure Reports:
- **Test Suite Metadata**:
  In `test.beforeEach` or at the top of each test, call:
  ```typescript
  AllureHelper.setMetadata({
    epic: 'Module Name',
    feature: 'Feature Name',
    story: 'User Story / Scenario',
    severity: 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial',
    owner: 'Team or QA Engineer',
    tags: ['web', 'smoke'],
  });
  ```
- **Step Tracking**:
  Wrap granular actions inside `AllureHelper.step('Descriptive Step Name', async () => { ... })`.
- **Failure Attachments**:
  Traces, screenshots, and videos are automatically captured on failure per `playwright.config.ts`.
  Use `AllureHelper.attachScreenshot(page, 'Step Name')` when visual evidence is required at a specific checkpoint.

---

## 4. Test Fixtures & Dependency Injection

- Do **NOT** manually instantiate page objects in test files with `new LoginPage(page)`.
- Always import `test` and `expect` from `@core/test.fixture`:
  ```typescript
  import { test, expect } from '../../src/core/test.fixture';
  ```
- Inject page objects directly into test arguments:
  ```typescript
  test('TC-EXAMPLE: Verify dashboard', async ({ loginPage, inventoryPage }) => { ... });
  ```
- For Desktop tests, inject the `desktopSession` fixture:
  ```typescript
  test('TC-DESKTOP: Connect workspace', async ({ desktopSession }) => {
    const { desktopPage } = desktopSession;
    await desktopPage.verifyDesktopAppLoaded();
  });
  ```

---

## 5. Synchronization & Assertions

- **Web-First Assertions**: Always use async `expect(locator).toBeVisible()`, `expect(locator).toHaveText()`, etc.
- **Auto-Waiting**: Rely on Playwright's built-in auto-waiting.
- **Never use**: `page.waitForTimeout()` or arbitrary sleep calls.

---

## 6. Example Test Template for Copilot

```typescript
import { test } from '../../src/core/test.fixture';
import { AllureHelper } from '../../src/utils/allure-helper';

test.describe('Feature: Checkout Flow', () => {
  test.beforeEach(async ({ loginPage }) => {
    AllureHelper.setMetadata({
      epic: 'E-Commerce Portal',
      feature: 'Checkout',
      owner: 'Billing Squad',
    });
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('TC-CHK-001: User completes order successfully', async ({ inventoryPage }) => {
    AllureHelper.setMetadata({
      story: 'Happy Path Checkout',
      severity: 'critical',
      tags: ['web', 'smoke', 'checkout'],
    });

    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    await inventoryPage.verifyCartBadgeCount(1);
  });
});
```
