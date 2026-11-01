---
description: "Generate an E2E test case with Allure annotations, fixtures, and assertions"
---

# Generate Test Case

You are writing an E2E test scenario in Playwright.

## Requirements:
1. Import `test` and `expect` from `@core/test.fixture`.
2. Annotate the suite and each test using `AllureHelper.setMetadata`:
   - `epic`, `feature`, `story`, `severity`, `owner`, `tags`.
3. Inject required Page Objects via fixtures (e.g. `{ loginPage, inventoryPage }` or `{ desktopSession }`).
4. Rely on web-first assertions: `await expect(locator).toBeVisible()`.
5. Do not use hardcoded delays or `waitForTimeout`.

## Scenario Details:
Platform: {{web|mobile|desktop}}
Test Name: {{testName}}
Test Steps:
{{steps}}
Expected Result:
{{expectedResult}}
