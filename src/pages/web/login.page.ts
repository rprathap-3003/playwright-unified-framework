import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../core/base.page';
import { AllureHelper } from '../../utils/allure-helper';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async open(): Promise<void> {
    await this.navigate('/');
  }

  async login(username: string, password: string): Promise<void> {
    await AllureHelper.step(`Perform login with user: ${username}`, async () => {
      await this.fill(this.usernameInput, username, 'Enter username');
      await this.fill(this.passwordInput, password, 'Enter password');
      await this.click(this.loginButton, 'Click Login button');
    });
  }

  async verifyErrorMessage(expectedError: string): Promise<void> {
    await this.expectVisible(this.errorMessage);
    await this.expectText(this.errorMessage, expectedError);
    await this.captureStepScreenshot('Login Error Displayed');
  }
}
