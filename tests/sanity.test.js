import { test, expect } from "@playwright/test";
import { BASE_URL, URLS } from "../data/urls.js";
import { LoginPage } from "../pages/LoginPage.js";
import { InventoryPage } from "../pages/InventoryPage.js";
import { CartPage } from "../pages/CartPage.js";
import { CheckoutStepOnePage } from "../pages/CheckoutStepOnePage.js";
import { CheckoutStepTwoPage } from "../pages/CheckoutStepTwoPage.js";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage.js";
import { USERS } from "../data/users.js";

test.describe("Sanity Test", () => {
  test.beforeEach("Navigate To Login Page", async ({ page }) => {
    await page.goto(BASE_URL);
  });
  test("Complete E2E Flow from Login to Checkout Complete", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    await loginPage.login(
      USERS.standardUser.username,
      USERS.standardUser.password
    );
    await expect(page).toHaveURL(URLS.INVENTORY_URL);
    await expect(inventoryPage.pageTitle).toHaveText("Products");

    await inventoryPage.addSpecificProductsToCart();
    await expect(inventoryPage.cartBadge).toHaveText("2");

    await inventoryPage.goToCart();
    await expect(page).toHaveURL(URLS.CART_URL);
    await expect(cartPage.pageTitle).toHaveText("Your Cart");
    await expect(cartPage.cartItems).toHaveCount(2);

    await expect(cartPage.cartItemNames.nth(0)).toHaveText(
      "Sauce Labs Backpack"
    );
    await expect(cartPage.cartItemNames.nth(1)).toHaveText(
      "Sauce Labs Bike Light"
    );

    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(URLS.CHECKOUT_STEP_ONE_URL);
    await expect(checkoutStepOnePage.pageTitle).toHaveText(
      "Checkout: Your Information"
    );

    await checkoutStepOnePage.fillCheckoutForm("Naif", "Faris", "12345");
    await checkoutStepOnePage.clickContinue();

    await expect(page).toHaveURL(URLS.CHECKOUT_STEP_TWO_URL);
    await expect(checkoutStepTwoPage.pageTitle).toHaveText(
      "Checkout: Overview"
    );

    await checkoutStepTwoPage.clickFinish();

    await expect(page).toHaveURL(URLS.CHECKOUT_COMPLETE_URL);
    await expect(checkoutCompletePage.pageTitle).toHaveText(
      "Checkout: Complete!"
    );

    await expect(checkoutCompletePage.completeHeader).toHaveText(
      "Thank you for your order!"
    );
  });
});
