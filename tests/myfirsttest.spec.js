import { test } from "@playwright/test";

test("Exercise 1", async ({ page }) => {
  await page.goto("https://devexpress.github.io/testcafe/example");
});
