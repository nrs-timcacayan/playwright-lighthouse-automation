import { Page, expect } from "@playwright/test";

export class ResearchFNPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get locators() {
    TODO: "Add Locators";
    return {};
  }
}

export async function navigateToRFNInvestorViewPage(page: Page) {
  await expect(async () => {
    await page.goto(process.env.RFN_BASE_URL! + "/researchfn/all");
    await expect(page).toHaveURL(/researchfn\/all/, { timeout: 15000 });
  }).toPass();
}
