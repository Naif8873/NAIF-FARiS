import { test, expect } from "@playwright/test";
import { BASE_URL, URLS } from "../data/urls.js";
import { LoginPage } from "../pages/LoginPage.js";
import { InventoryPage } from "../pages/InventoryPage.js";
import { CartPage } from "../pages/CartPage.js";
import { USERS } from "../data/users.js";

test.describe("Login Tests", () => {
  test.beforeEach("Navigate to Login Page", async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test("Login with standard user", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await loginPage.login(
      USERS.standardUser.username,
      USERS.standardUser.password
    );
    await expect(page).toHaveURL(URLS.INVENTORY_URL);
    await expect(inventoryPage.pageTitle).toHaveText("Products");
  });

  test("Verify page title is correct", async ({ page }) => {
    // בדיקת כותרת הדף הראשי (Login page)
    await expect(page).toHaveTitle(/Swag Labs/);
  });

  test("Add 2 products to shopping cart", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // התחברות למערכת
    await loginPage.login(
      USERS.standardUser.username,
      USERS.standardUser.password
    );

    // וידוא שהגענו לעמוד המלאי
    await expect(page).toHaveURL(URLS.INVENTORY_URL);
    await expect(inventoryPage.pageTitle).toHaveText("Products");

    // הוספת 2 מוצרים ספציפיים לעגלה
    await inventoryPage.addSpecificProductsToCart();

    // וידוא שהעגלה מציגה 2 פריטים
    await expect(inventoryPage.cartBadge).toHaveText("2");

    // מעבר לעגלת הקניות
    await inventoryPage.goToCart();

    // וידוא שאנחנו בעמוד העגלה
    await expect(page).toHaveURL(`${BASE_URL}cart.html`);
    await expect(cartPage.pageTitle).toHaveText("Your Cart");

    // וידוא שיש 2 פריטים בעגלה
    await expect(cartPage.cartItems).toHaveCount(2);

    // וידוא שמות המוצרים נכונים
    const itemNames = await cartPage.getCartItemNames();
    expect(itemNames).toContain("Sauce Labs Backpack");
    expect(itemNames).toContain("Sauce Labs Bike Light");
  });
});
