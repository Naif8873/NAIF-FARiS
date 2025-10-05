import { test } from "@playwright/test";

test("Exercise 1", async ({ page }) => {
  await page.goto("https://devexpress.github.io/testcafe/example");
})
test('Exercise 1', async ({page}) => {
    for (const checkboxDataTestId of [
      'remote-testing-checkbox',
      'parallel-testing-checkbox',
      'analysis-checkbox',
    ]) {
      await page.getByTestId(checkboxDataTestId).check()
      await expect(page.getByTestId(checkboxDataTestId)).toBeChecked()
    }
  })