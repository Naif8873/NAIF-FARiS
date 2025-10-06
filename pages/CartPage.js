export class CartPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.cartItems = page.locator(".cart_item"); // שינוי selector
    this.cartItemNames = page.locator(".inventory_item_name");
    this.removeButtons = page.locator('[data-test*="remove"]');
    this.continueShoppingButton = page.locator(
      '[data-test="continue-shopping"]'
    );
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async getCartItemsCount() {
    return await this.cartItems.count();
  }

  async getCartItemNames() {
    return await this.cartItemNames.allTextContents();
  }

  async removeItemFromCart(index = 0) {
    await this.removeButtons.nth(index).click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
