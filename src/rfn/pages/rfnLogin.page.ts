import { Page, expect } from "@playwright/test";

export class RFNLoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get locators() {
    return {
      inputField: {
        email: this.page.locator("#inputFieldEmail"),
        password: this.page.locator("#inputFieldPassword"),
      },
      button: {
        login: this.page.locator(
          "//button[@class='login-btn rfn-button-primary']"
        ),
      },
    };
  }
}
