import { ElectronApplication, Page, Locator, expect } from '@playwright/test';
import { AllureHelper } from '../utils/allure-helper';
import { Logger } from '../utils/logger';

/**
 * Base Desktop Page Object model for Electron and Desktop Applications
 */
export abstract class BaseDesktopPage {
  readonly electronApp: ElectronApplication;
  readonly window: Page;

  constructor(electronApp: ElectronApplication, window: Page) {
    this.electronApp = electronApp;
    this.window = window;
  }

  /**
   * Click desktop element with Allure step logging
   */
  async click(locator: Locator, stepName?: string): Promise<void> {
    const label = stepName || `Desktop click on ${locator}`;
    await AllureHelper.step(label, async () => {
      Logger.info(`Desktop action: ${label}`);
      await locator.waitFor({ state: 'visible' });
      await locator.click();
    });
  }

  /**
   * Fill desktop input field
   */
  async fill(locator: Locator, value: string, stepName?: string): Promise<void> {
    const label = stepName || `Desktop fill into ${locator}`;
    await AllureHelper.step(label, async () => {
      Logger.info(`Desktop action: ${label}`);
      await locator.waitFor({ state: 'visible' });
      await locator.fill(value);
    });
  }

  /**
   * Evaluate code in Electron main process
   */
  async evaluateInMainProcess<T>(fn: (electron: unknown) => T): Promise<T> {
    return await this.electronApp.evaluate(fn);
  }

  /**
   * Verify desktop window title
   */
  async expectTitle(title: string): Promise<void> {
    await AllureHelper.step(`Verify desktop window title is "${title}"`, async () => {
      const actualTitle = await this.window.title();
      expect(actualTitle).toBe(title);
    });
  }

  /**
   * Capture desktop window screenshot
   */
  async captureDesktopScreenshot(name = 'Desktop Window'): Promise<void> {
    await AllureHelper.attachScreenshot(this.window, name);
  }
}
