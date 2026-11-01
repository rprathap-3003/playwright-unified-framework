import { test } from '../../src/core/test.fixture';
import { AllureHelper } from '../../src/utils/allure-helper';

test.describe('Web Authentication - Login Suite', () => {
  test.beforeEach(async ({ loginPage }) => {
    AllureHelper.setMetadata({
      epic: 'E-Commerce Portal',
      feature: 'User Authentication',
      owner: 'QA Automation Team',
    });
    await loginPage.open();
  });

  test('TC-WEB-001: Standard user can log in successfully', async ({ loginPage, inventoryPage }) => {
    AllureHelper.setMetadata({
      story: 'Standard User Login',
      severity: 'blocker',
      tags: ['web', 'smoke', 'authentication'],
    });

    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.verifyOnInventoryPage();
  });

  test('TC-WEB-002: Locked out user receives appropriate error message', async ({ loginPage }) => {
    AllureHelper.setMetadata({
      story: 'Locked Out User Validation',
      severity: 'critical',
      tags: ['web', 'regression', 'negative'],
    });

    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.verifyErrorMessage('Epic sadface: Sorry, this user has been locked out.');
  });
});
