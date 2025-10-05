import { test, expect } from "@playwright/test";
import { BASE_URL, URLS } from "../data/urls.js";
import { LoginPage } from "../pages/LoginPage.js";
import { InventoryPage } from "../pages/InventoryPage.js";
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
    { timeout: 60000 },
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
