export class CheckoutStepTwoPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async clickFinish() {
    await this.finishButton.click();
  }
}
