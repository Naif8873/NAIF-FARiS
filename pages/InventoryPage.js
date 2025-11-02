export class InventoryPage {
	constructor(page) {
		this.page = page;
		this.pageTitle = page.locator('[data-test="title"]');
		this.addToCartButtons = page.locator('button[id*="add-to-cart"]');
		this.cartBadge = page.locator(".shopping_cart_badge");
		this.cartLink = page.locator(".shopping_cart_link");
		this.inventoryItems = page.locator(".inventory_item");

		// מוצרים ספציפיים
		this.addBackpackToCart = page.locator(
			'["add-to-cart-sauce-labs-backpack"]',
		);
		this.addBikeLightToCart = page.locator(
			'["add-to-cart-sauce-labs-bike-light"]',
		);
	}

	async addSpecificProductsToCart() {
		// הוספת מוצרים ספציפיים
		await this.addBackpackToCart.click();
		await this.addBikeLightToCart.click();
	}

	async goToCart() {
		await this.cartLink.click();
	}
}
