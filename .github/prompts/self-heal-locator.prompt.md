---
description: "Diagnose broken locator from test failure and suggest resilient replacement"
---

# Self-Heal Broken Locator

Analyze the failed test step and current DOM snapshot to recommend a resilient replacement locator.

## Instructions:
1. Examine the failed locator and the Playwright error message.
2. Inspect the latest DOM structure / HTML snippet provided.
3. Identify the element using accessible roles, labels, or test IDs.
4. Replace the locator following the framework priority (`getByRole` -> `getByLabel` -> `getByTestId`).
5. Output the updated Page Object snippet with explanation.

## Failure Context:
Failed Locator: {{brokenLocator}}
Error Log:
{{errorLog}}
Updated DOM / HTML:
{{domHtml}}
