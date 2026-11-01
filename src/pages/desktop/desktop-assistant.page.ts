import { ElectronApplication, Locator, Page } from '@playwright/test';
import { BaseDesktopPage } from '../../core/base.desktop.page';
import { AllureHelper } from '../../utils/allure-helper';

export class DesktopAssistantPage extends BaseDesktopPage {
  readonly heading: Locator;
  readonly usernameInput: Locator;
  readonly workspaceInput: Locator;
  readonly connectButton: Locator;
  readonly statusMessage: Locator;

  constructor(electronApp: ElectronApplication, window: Page) {
    super(electronApp, window);
    this.heading = window.locator('#app-heading');
    this.usernameInput = window.locator('#desktop-username');
    this.workspaceInput = window.locator('#desktop-workspace');
    this.connectButton = window.locator('#btn-desktop-connect');
    this.statusMessage = window.locator('[data-test-id="status-message"], #status-message');
  }

  async verifyDesktopAppLoaded(): Promise<void> {
    await AllureHelper.step('Verify Desktop Application window is loaded and rendered', async () => {
      await this.expectTitle('Enterprise Desktop Assistant');
      await this.click(this.heading, 'Focus Desktop window');
      await this.captureDesktopScreenshot('Desktop App Initialized');
    });
  }

  async connectWorkspace(licenseKey: string, workspace: string): Promise<void> {
    await AllureHelper.step(`Connect Desktop App to workspace "${workspace}"`, async () => {
      await this.fill(this.usernameInput, licenseKey, 'Enter desktop license key');
      await this.fill(this.workspaceInput, workspace, 'Enter desktop workspace');
      await this.click(this.connectButton, 'Click Connect Workspace button');
    });
  }

  async verifyConnectedStatus(expectedSubstring: string): Promise<void> {
    await AllureHelper.step(`Verify desktop connection message contains: "${expectedSubstring}"`, async () => {
      await this.window.waitForSelector('#status-message.status-success', { state: 'visible' });
      const text = await this.statusMessage.innerText();
      if (!text.includes(expectedSubstring)) {
        throw new Error(`Expected desktop status to contain "${expectedSubstring}", but got: "${text}"`);
      }
      await this.captureDesktopScreenshot('Desktop Connected Success');
    });
  }
}
