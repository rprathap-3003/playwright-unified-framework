import { test } from '../../src/core/test.fixture';
import { AllureHelper } from '../../src/utils/allure-helper';

test.describe('Web Inventory & Shopping Cart Suite', () => {
  test.beforeEach(async ({ loginPage }) => {
    AllureHelper.setMetadata({
      epic: 'E-Commerce Portal',
      feature: 'Product Catalog & Cart',
      owner: 'E-Commerce Squad',
    });
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('TC-WEB-003: User can add products to shopping cart and verify badge count', async ({
    inventoryPage,
  }) => {
    AllureHelper.setMetadata({
      story: 'Cart Counter Increment',
      severity: 'critical',
      tags: ['web', 'cart', 'e2e'],
    });

    await inventoryPage.verifyOnInventoryPage();
    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    await inventoryPage.verifyCartBadgeCount(1);

    await inventoryPage.addItemToCartByName('Sauce Labs Bike Light');
    await inventoryPage.verifyCartBadgeCount(2);
  });
});
