import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../../core/base.page';
import { AllureHelper } from '../../utils/allure-helper';

export class InventoryPage extends BasePage {
  readonly titleHeader: Locator;
  readonly inventoryItems: Locator;
  readonly shoppingCartBadge: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.titleHeader = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async verifyOnInventoryPage(): Promise<void> {
    await AllureHelper.step('Verify user is on Products/Inventory page', async () => {
      await this.expectVisible(this.titleHeader);
      await this.expectText(this.titleHeader, 'Products');
      await this.captureStepScreenshot('Inventory Page Loaded');
    });
  }

  async addItemToCartByName(itemName: string): Promise<void> {
    await AllureHelper.step(`Add item "${itemName}" to cart`, async () => {
      const itemContainer = this.inventoryItems.filter({ hasText: itemName });
      const addToCartBtn = itemContainer.getByRole('button', { name: /add to cart/i });
      await this.click(addToCartBtn, `Click Add to cart for ${itemName}`);
    });
  }

  async verifyCartBadgeCount(expectedCount: number): Promise<void> {
    await AllureHelper.step(`Verify cart badge shows "${expectedCount}"`, async () => {
      await this.expectVisible(this.shoppingCartBadge);
      await expect(this.shoppingCartBadge).toHaveText(expectedCount.toString());
    });
  }
}
