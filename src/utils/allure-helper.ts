import { Page, test } from '@playwright/test';
import * as allure from 'allure-js-commons';

export type SeverityLevel = 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial';

/**
 * Allure Helper Utility to provide clean decorators and programmatic reporting annotations
 */
export class AllureHelper {
  /**
   * Log a structured step in the Allure report
   */
  static async step<T>(title: string, action: () => Promise<T>): Promise<T> {
    return await test.step(title, action);
  }

  /**
   * Set metadata hierarchy: Epic -> Feature -> Story
   */
  static setMetadata(options: {
    epic?: string;
    feature?: string;
    story?: string;
    severity?: SeverityLevel;
    owner?: string;
    description?: string;
    tags?: string[];
  }): void {
    if (options.epic) allure.epic(options.epic);
    if (options.feature) allure.feature(options.feature);
    if (options.story) allure.story(options.story);
    if (options.severity) allure.severity(options.severity);
    if (options.owner) allure.owner(options.owner);
    if (options.description) allure.description(options.description);
    if (options.tags && options.tags.length > 0) {
      allure.tags(...options.tags);
    }
  }

  /**
   * Attach a full-page screenshot directly to the current Allure step
   */
  static async attachScreenshot(page: Page, name = 'Step Screenshot'): Promise<void> {
    const screenshot = await page.screenshot({ fullPage: true });
    await allure.attachment(name, screenshot, 'image/png');
  }

  /**
   * Attach JSON payload to the Allure report
   */
  static async attachJson(name: string, data: unknown): Promise<void> {
    await allure.attachment(name, JSON.stringify(data, null, 2), 'application/json');
  }

  /**
   * Attach plain text or logs
   */
  static async attachText(name: string, content: string): Promise<void> {
    await allure.attachment(name, content, 'text/plain');
  }

  /**
   * Link issue tracker / ticket
   */
  static issue(id: string, url?: string): void {
    allure.issue(id, url || `https://jira.company.com/browse/${id}`);
  }

  /**
   * Link test management system (TMS / TestRail / Zephyr)
   */
  static tms(id: string, url?: string): void {
    allure.tms(id, url || `https://testrail.company.com/index.php?/cases/view/${id}`);
  }
}
