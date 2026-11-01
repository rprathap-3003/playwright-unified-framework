import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../../core/base.page';
import { AllureHelper } from '../../utils/allure-helper';

export class MobileNavPage extends BasePage {
  readonly menuButton: Locator;
  readonly closeMenuButton: Locator;
  readonly navMenuContainer: Locator;
  readonly allItemsLink: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.closeMenuButton = page.locator('#react-burger-cross-btn');
    this.navMenuContainer = page.locator('.bm-menu-wrap');
    this.allItemsLink = page.locator('#inventory_sidebar_link');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async openMobileMenu(): Promise<void> {
    await AllureHelper.step('Open mobile hamburger navigation drawer', async () => {
      await this.click(this.menuButton, 'Tap mobile hamburger button');
      await this.expectVisible(this.allItemsLink);
      await this.captureStepScreenshot('Mobile Navigation Drawer Open');
    });
  }

  async closeMobileMenu(): Promise<void> {
    await AllureHelper.step('Close mobile navigation drawer', async () => {
      await this.click(this.closeMenuButton, 'Tap close drawer button');
      await expect(this.navMenuContainer).toHaveAttribute('aria-hidden', 'true');
    });
  }

  async logout(): Promise<void> {
    await AllureHelper.step('Perform mobile logout', async () => {
      await this.openMobileMenu();
      await this.click(this.logoutLink, 'Tap Logout menu item');
    });
  }
}
