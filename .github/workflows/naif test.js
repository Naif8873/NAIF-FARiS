// playwright.config.test.js
import { test, expect } from "@playwright/test";

test("Full purchase flow on saucedemo.com", async ({ page }) => {
  // 1. Login
  await page.goto("https://www.saucedemo.com/");
  await page.fill('[data-test="username"]', "standard_user");
  await page.fill('[data-test="password"]', "secret_sauce");
  await page.click('[data-test="login-button"]');

  // 2. Assert inventory page URL and title
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  await expect(page.locator(".title")).toHaveText("Products");

  // 3. Add two products to cart
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');

  // 4. Assert cart badge shows 2
  await expect(page.locator(".shopping_cart_badge")).toHaveText("2");

  // 5. Go to cart, assert URL, title, and items
  await page.click(".shopping_cart_link");
  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
  await expect(page.locator(".title")).toHaveText("Your Cart");
  await expect(page.locator(".cart_item")).toHaveCount(2);

  // 6. Proceed to checkout step one, assert URL and title
  await page.click('[data-test="checkout"]');
  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-one.html"
  );
  await expect(page.locator(".title")).toHaveText("Checkout: Your Information");

  // 7. Fill form and continue
  await page.fill('[data-test="firstName"]', "John");
  await page.fill('[data-test="lastName"]', "Doe");
  await page.fill('[data-test="postalCode"]', "12345");
  await page.click('[data-test="continue"]');

  // 8. Assert checkout step two URL and title
  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-two.html"
  );
  await expect(page.locator(".title")).toHaveText("Checkout: Overview");

  // 9. Finish checkout, assert complete URL, title, and thank you message
  await page.click('[data-test="finish"]');
  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-complete.html"
  );
  await expect(page.locator(".title")).toHaveText("Checkout: Complete!");
  await expect(page.locator(".complete-header")).toHaveText(
    "Thank you for your order!"
  );
});
