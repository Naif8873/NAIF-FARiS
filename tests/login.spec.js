import { test, expect } from "@playwright/test";
import { BASE_URL, URLS } from "../data/urls.js";
import { LoginPage } from "../pages/LoginPage.js";
import { InventoryPage } from "../pages/InventoryPage.js";
import { USERS } from "../data/users.js";

test.describe("Positive Login Tests", () => {
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

  test("Login with problem user", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await loginPage.login(
      USERS.problem_user.username,
      USERS.problem_user.password
    );
    await expect(page).toHaveURL(URLS.INVENTORY_URL);
    await expect(inventoryPage.pageTitle).toHaveText("Products");
  });

  test(
    "Login with performance glitch user",
    { timeout: 60000 }, // why you use timeout of 60 seconds here?
    async ({ page }) => {
      const loginPage = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);
      await loginPage.login(
        USERS.performance_glitch_user.username,
        USERS.performance_glitch_user.password
      );
      await expect(page).toHaveURL(URLS.INVENTORY_URL);
      await expect(inventoryPage.pageTitle).toHaveText("Products");
    }
  );

  test("Login with error user", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await loginPage.login(USERS.error_user.username, USERS.error_user.password);
    await expect(page).toHaveURL(URLS.INVENTORY_URL);
    await expect(inventoryPage.pageTitle).toHaveText("Products");
  });

  test("Login with visual user", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await loginPage.login(
      USERS.visual_user.username,
      USERS.visual_user.password
    );
    await expect(page).toHaveURL(URLS.INVENTORY_URL);
    await expect(inventoryPage.pageTitle).toHaveText("Products");
  });
});

test.describe("Negative Login Tests", () => { // why you dont assert the error message itself for each of the test cases??
  test.beforeEach("Navigate to Login Page", async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test("Login with empty username should fail", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      USERS.user_not2.username, // שם משתמש ריק
      USERS.user_not2.password
    );

    // Should show error message and stay on login page
    await expect(page).toHaveURL(BASE_URL);
  });

  test("Login with non-existent user should fail", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      USERS.user_not.username, // משתמש לא קיים
      USERS.user_not.password
    );

    // Should show error message and stay on login page
    await expect(page).toHaveURL(BASE_URL);
  });

  test("Login with wrong password should fail", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      USERS.out_user.username, // שם משתמש תקין אבל סיסמה שגויה
      USERS.out_user.password
    );

    // Should show error message and stay on login page
    await expect(page).toHaveURL(BASE_URL);
  });

  test("Login with user_not1 should fail", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      USERS.user_not1.username, // משתמש לא קיים עם סיסמה שגויה
      USERS.user_not1.password
    );

    // Should show error message and stay on login page
    await expect(page).toHaveURL(BASE_URL);
  });

  test("Login with user_not3 should fail", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      USERS.user_not3.username, // משתמש לא קיים עם סיסמה שגויה
      USERS.user_not3.password
    );

    // Should show error message and stay on login page
    await expect(page).toHaveURL(BASE_URL);
  });

  test("Login with empty password should fail", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      USERS.user_not4.username, // שם משתמש תקין אבל סיסמה ריקה
      USERS.user_not4.password
    );

    // Should show error message and stay on login page
    await expect(page).toHaveURL(BASE_URL);
  });

  test("Login with both empty credentials should fail", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      USERS.user_not5.username, // שם משתמש ריק וסיסמה ריקה
      USERS.user_not5.password
    );

    // Should show error message and stay on login page
    await expect(page).toHaveURL(BASE_URL);
  });
});
