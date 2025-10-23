import { test, expect } from "@playwright/test";
import { BASE_URL, URLS } from "../data/urls.js";
import { LoginPage } from "../pages/LoginPage.js";
import { InventoryPage } from "../pages/InventoryPage.js";
import { USERS } from "../data/users.js";

test.describe("Positive Login Page", () => {
  test.beforeEach("Navigate To Login Page", async ({ page }) => {
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

  test("Login with error user", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(USERS.error_user.username, USERS.error_user.password);

    await expect(page).toHaveURL(URLS.INVENTORY_URL);
  });

  test("Login with visual user", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
      USERS.visual_user.username,
      USERS.visual_user.password
    );

    await expect(page).toHaveURL(URLS.INVENTORY_URL);
  });

  test("Login with performance glitch user", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
      USERS.performance_glitch_user.username,
      USERS.performance_glitch_user.password
    );

    await expect(page).toHaveURL(URLS.INVENTORY_URL);
  });

  test("Login with problem user", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
      USERS.problem_user.username,
      USERS.problem_user.password
    );

    await expect(page).toHaveURL(URLS.INVENTORY_URL);
  });
});

test.describe("Negative Login Tests", () => {
  test.beforeEach("Navigate to Login Page", async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test("Login with locked out user", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
      USERS.lockedOutUser.username,
      USERS.lockedOutUser.password
    );

    // Assert error message is displayed
    await expect(loginPage.errorMessage).toHaveText(
      /Epic sadface: Sorry, this user has been locked out/
    );
  });

  test("Login with invalid password", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
      USERS.invalidPasswordUser.username,
      USERS.invalidPasswordUser.password
    );

    // Assert error message is displayed
    await expect(loginPage.errorMessage).toHaveText(
      /Epic sadface: Username and password do not match any user in this service/
    );
  });

  test("Login with invalid username", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
      USERS.invalidUsernameUser.username,
      USERS.invalidUsernameUser.password
    );

    // Assert error message is displayed
    await expect(loginPage.errorMessage).toHaveText(
      /Epic sadface: Username and password do not match any user in this service/
    );
  });

  test("Login with empty username", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
      USERS.emptyUsernameUser.username,
      USERS.emptyUsernameUser.password
    );

    // Assert error message is displayed
    await expect(loginPage.errorMessage).toHaveText(
      /Epic sadface: Username is required/
    );
  });

  test("Login with empty password", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
      USERS.emptyPasswordUser.username,
      USERS.emptyPasswordUser.password
    );

    // Assert error message is displayed
    await expect(loginPage.errorMessage).toHaveText(
      /Epic sadface: Password is required/
    );
  });

  test("Login with empty both fields", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
      USERS.emptyBothFieldsUser.username,
      USERS.emptyBothFieldsUser.password
    );

    // Assert error message is displayed
    await expect(loginPage.errorMessage).toHaveText(
      /Epic sadface: Username is required/
    );
  });
});
