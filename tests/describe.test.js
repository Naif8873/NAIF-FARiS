import { test, expect } from "@playwright/test";
import { BASE_URL, URLS } from "../data/urls.js";
import { LoginPage } from "../pages/LoginPage.js";
import { InventoryPage } from "../pages/InventoryPage.js";
import { USERS } from "../data/users.js";

test.describe("Negative Login Tests", () => {
  test.beforeEach("Navigate to Login Page", async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test("Login with standard user but wrong password should fail", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(USERS.out_user.username, USERS.out_user.password);

    // Should show error message and stay on login page
    await expect(page).toHaveURL(BASE_URL);
    // Could add assertion for error message if there's a visible error element
  });
});
