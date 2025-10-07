import { test, expect } from "@playwright/test";
import { BASE_URL, URLS } from "../data/urls.js";
import { LoginPage } from "../pages/LoginPage.js";
import { InventoryPage } from "../pages/InventoryPage.js";
import { CartPage } from "../pages/CartPage.js";
import { CheckoutStepOnePage } from "../pages/CheckoutStepOnePage.js";
import { CheckoutStepTwoPage } from "../pages/CheckoutStepTwoPage.js";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage.js";
import { USERS } from "../data/users.js";

test("Demo - רכישה מלאה עם Naif Faris", async ({ page }) => {
  console.log("🎬 התחלת הדמו - תהליך רכישה מלא");
  
  // 1. פתיחת האתר
  console.log("🌐 פותח את האתר...");
  await page.goto(BASE_URL);
  await page.waitForTimeout(3000);
  
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutStepOnePage = new CheckoutStepOnePage(page);
  const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
  const checkoutCompletePage = new CheckoutCompletePage(page);

  // 2. התחברות
  console.log("🔐 מתחבר עם משתמש רגיל...");
  await loginPage.login(USERS.standardUser.username, USERS.standardUser.password);
  await page.waitForTimeout(3000);
  console.log("✅ התחברות הצליחה!");

  // 3. בחירת מוצרים
  console.log("🛍️ בוחר מוצרים...");
  await page.waitForTimeout(2000);
  
  console.log("   📦 מוסיף Sauce Labs Backpack");
  await inventoryPage.addBackpackToCart.click();
  await page.waitForTimeout(2000);
  
  console.log("   💡 מוסיף Sauce Labs Bike Light");
  await inventoryPage.addBikeLightToCart.click();
  await page.waitForTimeout(2000);

  // 4. בדיקת העגלה
  console.log("🔢 בודק שהעגלה מציגה 2 פריטים...");
  await expect(inventoryPage.cartBadge).toHaveText("2");
  await page.waitForTimeout(2000);

  // 5. מעבר לעגלה
  console.log("🛒 עובר לעגלת הקניות...");
  await inventoryPage.goToCart();
  await expect(page).toHaveURL(URLS.CART_URL);
  await page.waitForTimeout(3000);
  console.log("   📋 רואה את המוצרים בעגלה");

  // 6. תחילת תהליך רכישה
  console.log("💳 מתחיל תהליך רכישה...");
  await cartPage.proceedToCheckout();
  await expect(page).toHaveURL(URLS.CHECKOUT_STEP_ONE_URL);
  await page.waitForTimeout(3000);

  // 7. מילוי פרטים אישיים
  console.log("📝 ממלא פרטים אישיים...");
  await page.waitForTimeout(2000);
  
  console.log("   ✏️ שם פרטי: Naif");
  await checkoutStepOnePage.firstNameInput.fill("Naif");
  await page.waitForTimeout(1500);
  
  console.log("   ✏️ שם משפחה: Faris");
  await checkoutStepOnePage.lastNameInput.fill("Faris");
  await page.waitForTimeout(1500);
  
  console.log("   ✏️ מיקוד: 12345");
  await checkoutStepOnePage.postalCodeInput.fill("12345");
  await page.waitForTimeout(2000);

  // 8. מעבר לשלב הבא
  console.log("➡️ עובר לשלב הבא...");
  await checkoutStepOnePage.clickContinue();
  await expect(page).toHaveURL(URLS.CHECKOUT_STEP_TWO_URL);
  await page.waitForTimeout(3000);

  // 9. סקירת ההזמנה
  console.log("👁️ בודק פרטי ההזמנה...");
  await expect(checkoutStepTwoPage.pageTitle).toHaveText("Checkout: Overview");
  await expect(checkoutStepTwoPage.cartItems).toHaveCount(2);
  
  const itemNames = await checkoutStepTwoPage.getItemNames();
  console.log("   📦 מוצרים בהזמנה:", itemNames);
  await page.waitForTimeout(3000);

  // 10. סיום הרכישה
  console.log("✅ מסיים את הרכישה...");
  await checkoutStepTwoPage.clickFinish();
  await expect(page).toHaveURL(URLS.CHECKOUT_COMPLETE_URL);
  await page.waitForTimeout(3000);

  // 11. בדיקת הודעת הצלחה
  console.log("🎉 בודק הודעת הצלחה...");
  await expect(checkoutCompletePage.pageTitle).toHaveText("Checkout: Complete!");
  
  const headerText = await checkoutCompletePage.getCompleteHeader();
  console.log("   💌 הודעה:", headerText);
  
  const completeText = await checkoutCompletePage.getCompleteText();
  console.log("   📨 פרטים:", completeText);
  
  await expect(checkoutCompletePage.ponyExpressImage).toBeVisible();
  console.log("   🐎 תמונת Pony Express מוצגת");
  await page.waitForTimeout(3000);

  // 12. חזרה לעמוד הבית
  console.log("🏠 חוזר לעמוד הבית...");
  await checkoutCompletePage.clickBackHome();
  await expect(page).toHaveURL(URLS.INVENTORY_URL);
  await page.waitForTimeout(2000);

  console.log("🎊 הדמו הושלם בהצלחה!");
  console.log("📋 סיכום: רכישה מלאה של 2 מוצרים בשם Naif Faris");
  await page.waitForTimeout(3000);
});