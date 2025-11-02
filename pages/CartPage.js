export class CartPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.cartItems = page.locator(".cart_item"); // שינוי selector
    this.cartItemNames = page.locator(".inventory_item_name");
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async getCartItemNames() {
    return await this.cartItemNames.allTextContents();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
