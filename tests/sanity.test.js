import { test, expect } from "@playwright/test";
import { BASE_URL, URLS } from "../data/urls.js";
import { LoginPage } from "../pages/LoginPage.js";
import { InventoryPage } from "../pages/InventoryPage.js";
import { CartPage } from "../pages/CartPage.js";
import { CheckoutStepOnePage } from "../pages/CheckoutStepOnePage.js";
import { CheckoutStepTwoPage } from "../pages/CheckoutStepTwoPage.js";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage.js";
import { USERS } from "../data/users.js";

test.describe("Login Tests", () => { // why the suite name is login tests? this sanity scenatio needs to be 1 test case - e2e flow - fix it and then i will check this entire file again
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
    await expect(page).toHaveURL(URLS.CART_URL);
    await expect(cartPage.pageTitle).toHaveText("Your Cart");

    // וידוא שיש 2 פריטים בעגלה
    await expect(cartPage.cartItems).toHaveCount(2);

    // וידוא שמות המוצרים נכונים
    const itemNames = await cartPage.getCartItemNames();
    expect(itemNames).toContain("Sauce Labs Backpack");
    expect(itemNames).toContain("Sauce Labs Bike Light");
  });

  test("Navigate to checkout from cart", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // התחברות למערכת
    await loginPage.login(
      USERS.standardUser.username,
      USERS.standardUser.password
    );

    // הוספת מוצר לעגלה
    await inventoryPage.addSpecificProductsToCart();

    // מעבר לעגלה
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(URLS.CART_URL);

    // מעבר לתהליך הרכישה
    await cartPage.proceedToCheckout();

    // וידוא שהגענו לעמוד מילוי פרטי הרכישה
    await expect(page).toHaveURL(URLS.CHECKOUT_STEP_ONE_URL);
  });

  test("Verify all page URLs navigation", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // התחברות למערכת
    await loginPage.login(
      USERS.standardUser.username,
      USERS.standardUser.password
    );

    // בדיקה שהגענו לעמוד המלאי
    await expect(page).toHaveURL(URLS.INVENTORY_URL);

    // הוספת מוצר ומעבר לעגלה
    await inventoryPage.addBackpackToCart.click();
    await inventoryPage.goToCart();

    // בדיקה שהגענו לעמוד העגלה
    await expect(page).toHaveURL(URLS.CART_URL);

    // חזרה לעמוד המוצרים
    await cartPage.continueShopping();
    await expect(page).toHaveURL(URLS.INVENTORY_URL);
  });

  test("Complete checkout process - Step One", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);

    // התחברות למערכת
    await loginPage.login(
      USERS.standardUser.username,
      USERS.standardUser.password
    );

    // הוספת מוצרים לעגלה
    await inventoryPage.addSpecificProductsToCart();

    // מעבר לעגלה ולתהליך רכישה
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    // אימות הגעה לעמוד One Step Checkout
    await expect(page).toHaveURL(URLS.CHECKOUT_STEP_ONE_URL);
    await expect(checkoutStepOnePage.pageTitle).toHaveText(
      "Checkout: Your Information"
    );

    // מילוי הטופס
    await checkoutStepOnePage.fillCheckoutForm("Naif", "Faris", "12345");

    // מעבר לעמוד הבא
    await checkoutStepOnePage.clickContinue();

    // אימות מעבר לעמוד Two Step
    await expect(page).toHaveURL(URLS.CHECKOUT_STEP_TWO_URL);
  });

  test("Complete checkout process - Step Two", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);

    // התחברות למערכת
    await loginPage.login(
      USERS.standardUser.username,
      USERS.standardUser.password
    );

    // הוספת מוצרים לעגלה
    await inventoryPage.addSpecificProductsToCart();

    // מעבר לעגלה ולתהליך רכישה
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    // מילוי פרטי רכישה
    await checkoutStepOnePage.fillCheckoutForm("Naif", "Faris", "12345");
    await checkoutStepOnePage.clickContinue();

    // אימות הגעה לעמוד Two Step Checkout
    await expect(page).toHaveURL(URLS.CHECKOUT_STEP_TWO_URL);
    await expect(checkoutStepTwoPage.pageTitle).toHaveText(
      "Checkout: Overview"
    );

    // אימות שהמוצרים מוצגים נכון
    await expect(checkoutStepTwoPage.cartItems).toHaveCount(2);
    const itemNames = await checkoutStepTwoPage.getItemNames();
    expect(itemNames).toContain("Sauce Labs Backpack");
    expect(itemNames).toContain("Sauce Labs Bike Light");

    // סיום הרכישה
    await checkoutStepTwoPage.clickFinish();

    // אימות מעבר לעמוד השלמת הרכישה
    await expect(page).toHaveURL(URLS.CHECKOUT_COMPLETE_URL);
  });

  test("Complete checkout process - Completion", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    // התחברות למערכת
    await loginPage.login(
      USERS.standardUser.username,
      USERS.standardUser.password
    );

    // הוספת מוצרים לעגלה
    await inventoryPage.addSpecificProductsToCart();

    // ביצוע תהליך רכישה מלא
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutStepOnePage.fillCheckoutForm("Naif", "Faris", "12345");
    await checkoutStepOnePage.clickContinue();
    await checkoutStepTwoPage.clickFinish();

    // אימות הגעה לעמוד השלמת הרכישה
    await expect(page).toHaveURL(URLS.CHECKOUT_COMPLETE_URL);
    await expect(checkoutCompletePage.pageTitle).toHaveText(
      "Checkout: Complete!"
    );

    // אימות הודעות התודה
    const headerText = await checkoutCompletePage.getCompleteHeader();
    expect(headerText).toContain("Thank you for your order!");

    const completeText = await checkoutCompletePage.getCompleteText();
    expect(completeText).toContain("Your order has been dispatched");

    // אימות שתמונת הpony express מוצגת
    await expect(checkoutCompletePage.ponyExpressImage).toBeVisible();

    // חזרה לעמוד הבית
    await checkoutCompletePage.clickBackHome();
    await expect(page).toHaveURL(URLS.INVENTORY_URL);
  });
});
