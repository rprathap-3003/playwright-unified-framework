import { test as base, _electron as electron, ElectronApplication, Page } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../pages/web/login.page';
import { InventoryPage } from '../pages/web/inventory.page';
import { MobileNavPage } from '../pages/mobile/mobile-nav.page';
import { DesktopAssistantPage } from '../pages/desktop/desktop-assistant.page';
import { config } from '../../config/env.config';

type UnifiedFixtures = {
  // Web & Mobile Page Objects
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  mobileNavPage: MobileNavPage;

  // Desktop Fixtures
  desktopSession: {
    app: ElectronApplication;
    window: Page;
    desktopPage: DesktopAssistantPage;
  };
};

export const test = base.extend<UnifiedFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  mobileNavPage: async ({ page }, use) => {
    await use(new MobileNavPage(page));
  },

  desktopSession: async ({}, use) => {
    // Launch Desktop application via Playwright Electron driver
    const appPath = path.resolve(config.desktopAppEntry);
    const app = await electron.launch({
      args: [appPath],
    });

    const window = await app.firstWindow();
    await window.waitForLoadState('domcontentloaded');

    const desktopPage = new DesktopAssistantPage(app, window);

    // Provide to test context
    await use({
      app,
      window,
      desktopPage,
    });

    // Teardown: close desktop app cleanly
    await app.close();
  },
});

export { expect } from '@playwright/test';
