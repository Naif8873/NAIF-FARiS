import { test, expect } from "@playwright/test";
import { BASE_URL, URLS } from "../data/urls.js";
import { LoginPage } from "../pages/LoginPage.js";
import { InventoryPage } from "../pages/InventoryPage.js";
import { CartPage } from "../pages/CartPage.js";
import { CheckoutStepOnePage } from "../pages/CheckoutStepOnePage.js";
import { CheckoutStepTwoPage } from "../pages/CheckoutStepTwoPage.js";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage.js";
import { USERS } from "../data/users.js";

test("Visual Demo - Complete E2E Checkout Process", async ({ page }) => {
  console.log("🛒 מתחיל תהליך רכישה מלא...");

  // פתיחת הדף
  await page.goto(BASE_URL);
  console.log("📱 נפתח דף הלוגין");
  await page.waitForTimeout(2000);

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutStepOnePage = new CheckoutStepOnePage(page);
  const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
  const checkoutCompletePage = new CheckoutCompletePage(page);

  // שלב 1: התחברות
  console.log("🔑 מתחבר למערכת...");
  await loginPage.login(
    USERS.standardUser.username,
    USERS.standardUser.password
  );
  await page.waitForTimeout(2000);
  console.log("✅ התחברות הושלמה - עמוד המוצרים");

  // שלב 2: הוספת מוצרים
  console.log("🛍️ מוסיף מוצרים לעגלה...");
  await inventoryPage.addBackpackToCart.click();
  await page.waitForTimeout(1000);
  console.log("   ➕ נוסף Backpack");

  await inventoryPage.addBikeLightToCart.click();
  await page.waitForTimeout(1000);
  console.log("   ➕ נוסף Bike Light");

  await expect(inventoryPage.cartBadge).toHaveText("2");
  console.log("🔢 העגלה מציגה 2 פריטים");
  await page.waitForTimeout(1500);

  // שלב 3: מעבר לעגלה
  console.log("🛒 עובר לעמוד העגלה...");
  await inventoryPage.goToCart();
  await expect(page).toHaveURL(URLS.CART_URL);
  await expect(cartPage.pageTitle).toHaveText("Your Cart");
  console.log("📋 בעמוד העגלה - רואה את המוצרים");
  await page.waitForTimeout(2000);

  // שלב 4: מעבר לתהליך רכישה
  console.log("💳 מתחיל תהליך רכישה...");
  await cartPage.proceedToCheckout();
  await expect(page).toHaveURL(URLS.CHECKOUT_STEP_ONE_URL);
  await expect(checkoutStepOnePage.pageTitle).toHaveText(
    "Checkout: Your Information"
  );
  console.log("📝 בעמוד מילוי פרטים");
  await page.waitForTimeout(2000);

  // שלב 5: מילוי פרטים
  console.log("✏️ ממלא פרטי רכישה...");
  await checkoutStepOnePage.fillCheckoutForm("Naif", "Faris", "12345");
  await page.waitForTimeout(1500);
  console.log("   📝 שם פרטי: Naif");
  console.log("   📝 שם משפחה: Faris");
  console.log("   📝 מיקוד: 12345");

  await checkoutStepOnePage.clickContinue();
  await expect(page).toHaveURL(URLS.CHECKOUT_STEP_TWO_URL);
  await expect(checkoutStepTwoPage.pageTitle).toHaveText("Checkout: Overview");
  console.log("👁️ בעמוד סקירת ההזמנה");
  await page.waitForTimeout(2000);

  // שלב 6: סקירה וסיום
  console.log("🔍 בודק פרטי ההזמנה...");
  await expect(checkoutStepTwoPage.cartItems).toHaveCount(2);
  const itemNames = await checkoutStepTwoPage.getItemNames();
  console.log("📦 מוצרים בהזמנה:", itemNames);
  await page.waitForTimeout(1500);

  console.log("✅ מסיים את הרכישה...");
  await checkoutStepTwoPage.clickFinish();
  await expect(page).toHaveURL(URLS.CHECKOUT_COMPLETE_URL);
  await expect(checkoutCompletePage.pageTitle).toHaveText(
    "Checkout: Complete!"
  );
  console.log("🎉 הגעתי לעמוד השלמת הרכישה");
  await page.waitForTimeout(2000);

  // שלב 7: אימות הודעות תודה
  console.log("📬 בודק הודעות תודה...");
  const headerText = await checkoutCompletePage.getCompleteHeader();
  console.log("💌 כותרת תודה:", headerText);

  const completeText = await checkoutCompletePage.getCompleteText();
  console.log("📨 טקסט השלמה:", completeText);

  await expect(checkoutCompletePage.ponyExpressImage).toBeVisible();
  console.log("🐎 תמונת Pony Express מוצגת");
  await page.waitForTimeout(2000);

  // שלב 8: חזרה הביתה
  console.log("🏠 חוזר לעמוד הבית...");
  await checkoutCompletePage.clickBackHome();
  await expect(page).toHaveURL(URLS.INVENTORY_URL);
  console.log("✅ חזרתי לעמוד המוצרים");
  await page.waitForTimeout(2000);

  console.log("🎊 תהליך הרכישה הושלם בהצלחה!");
  console.log("🛍️ סיכום: רכישת 2 מוצרים בוצעה במלואה");
});
