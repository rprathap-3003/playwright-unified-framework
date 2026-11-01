import { test } from '../../src/core/test.fixture';
import { AllureHelper } from '../../src/utils/allure-helper';

test.describe('Mobile Responsive & Navigation Suite', () => {
  test.beforeEach(async ({ loginPage }) => {
    AllureHelper.setMetadata({
      epic: 'Mobile Experience',
      feature: 'Responsive Drawer & Navigation',
      owner: 'Mobile QA Team',
    });
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('TC-MOB-001: Mobile user can open and close the navigation drawer', async ({
    inventoryPage,
    mobileNavPage,
  }) => {
    AllureHelper.setMetadata({
      story: 'Mobile Drawer Toggle',
      severity: 'normal',
      tags: ['mobile', 'responsive', 'smoke'],
    });

    await inventoryPage.verifyOnInventoryPage();
    await mobileNavPage.openMobileMenu();
    await mobileNavPage.closeMobileMenu();
  });

  test('TC-MOB-002: Mobile user can log out via drawer menu', async ({
    mobileNavPage,
    loginPage,
  }) => {
    AllureHelper.setMetadata({
      story: 'Mobile Logout Flow',
      severity: 'critical',
      tags: ['mobile', 'auth', 'regression'],
    });

    await mobileNavPage.logout();
    await loginPage.expectVisible(loginPage.loginButton);
  });
});
