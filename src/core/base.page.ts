import { Page, Locator, expect } from '@playwright/test';
import { AllureHelper } from '../utils/allure-helper';
import { Logger } from '../utils/logger';

/**
 * Base Page Object model providing common reusable interactions,
 * integrated Allure step tracing, and robust waiting strategies.
 */
export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a path or full URL
   */
  async navigate(path: string): Promise<void> {
    await AllureHelper.step(`Navigate to ${path}`, async () => {
      Logger.info(`Navigating to: ${path}`);
      await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    });
  }

  /**
   * Click an element with automatic Allure step reporting
   */
  async click(locator: Locator, stepName?: string): Promise<void> {
    const label = stepName || `Click on ${locator}`;
    await AllureHelper.step(label, async () => {
      Logger.info(`Clicking: ${label}`);
      await locator.waitFor({ state: 'visible' });
      await locator.click();
    });
  }

  /**
   * Type text into an input field (clearing first)
   */
  async fill(locator: Locator, value: string, stepName?: string): Promise<void> {
    const label = stepName || `Fill value into ${locator}`;
    await AllureHelper.step(label, async () => {
      Logger.info(`Filling value into: ${label}`);
      await locator.waitFor({ state: 'visible' });
      await locator.fill(value);
    });
  }

  /**
   * Assert element is visible
   */
  async expectVisible(locator: Locator, timeout = 10000): Promise<void> {
    await AllureHelper.step(`Assert element is visible: ${locator}`, async () => {
      await expect(locator).toBeVisible({ timeout });
    });
  }

  /**
   * Assert element contains specific text
   */
  async expectText(locator: Locator, expectedText: string): Promise<void> {
    await AllureHelper.step(`Assert text contains "${expectedText}" on ${locator}`, async () => {
      await expect(locator).toContainText(expectedText);
    });
  }

  /**
   * Capture and attach screenshot to current Allure step
   */
  async captureStepScreenshot(name: string): Promise<void> {
    await AllureHelper.attachScreenshot(this.page, name);
  }

  /**
   * Wait for network idle state
   */
  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Reload current page
   */
  async reload(): Promise<void> {
    await this.page.reload({ waitUntil: 'domcontentloaded' });
  }
}
