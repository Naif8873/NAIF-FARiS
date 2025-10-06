import { test, expect } from "@playwright/test";
import { BASE_URL, URLS } from "../data/urls.js";
import { LoginPage } from "../pages/LoginPage.js";
import { InventoryPage } from "../pages/InventoryPage.js";
import { CartPage } from "../pages/CartPage.js";
import { USERS } from "../data/users.js";

test("Visual Demo - Add products to cart", async ({ page }) => {
  console.log("🚀 מתחיל את הבדיקה...");
  
  // פתיחת הדף
  await page.goto(BASE_URL);
  console.log("📱 נפתח דף הלוגין");
  
  // המתנה כדי לראות
  await page.waitForTimeout(2000);
  
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  // התחברות
  console.log("🔑 מתחבר למערכת...");
  await loginPage.login(
    USERS.standardUser.username,
    USERS.standardUser.password
  );
  
  // המתנה לראות את עמוד המוצרים
  await page.waitForTimeout(2000);
  console.log("🛍️ הגעתי לעמוד המוצרים");

  // וידוא שהגענו לעמוד המלאי
  await expect(page).toHaveURL(URLS.INVENTORY_URL);
  await expect(inventoryPage.pageTitle).toHaveText("Products");

  // הוספת המוצר הראשון
  console.log("➕ מוסיף מוצר ראשון - Backpack");
  await inventoryPage.addBackpackToCart.click();
  await page.waitForTimeout(1500);
  
  // הוספת המוצר השני
  console.log("➕ מוסיף מוצר שני - Bike Light");
  await inventoryPage.addBikeLightToCart.click();
  await page.waitForTimeout(1500);

  // בדיקה שהעגלה מציגה 2
  console.log("🔍 בודק שהעגלה מציגה 2 פריטים");
  await expect(inventoryPage.cartBadge).toHaveText("2");
  await page.waitForTimeout(1500);

  // מעבר לעגלה
  console.log("🛒 עובר לעמוד העגלה");
  await inventoryPage.goToCart();
  await page.waitForTimeout(2000);

  // וידוא שאנחנו בעמוד העגלה
  await expect(page).toHaveURL(`${BASE_URL}cart.html`);
  await expect(cartPage.pageTitle).toHaveText("Your Cart");

  // בדיקה שיש 2 פריטים
  console.log("✅ בודק שיש 2 פריטים בעגלה");
  await expect(cartPage.cartItems).toHaveCount(2);
  
  // בדיקה שמות המוצרים
  const itemNames = await cartPage.getCartItemNames();
  expect(itemNames).toContain("Sauce Labs Backpack");
  expect(itemNames).toContain("Sauce Labs Bike Light");
  
  console.log("🎉 הבדיקה הושלמה בהצלחה!");
  console.log("📦 מוצרים בעגלה:", itemNames);
  
  // המתנה סופית כדי לראות את התוצאה
  await page.waitForTimeout(3000);
});