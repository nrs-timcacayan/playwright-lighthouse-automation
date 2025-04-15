import { Page, expect } from "@playwright/test";

export class EventsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get locators() {
    return {
      // Category: Events
      events: {
        header: this.page.locator("#left-panel-detail-events"),
        subcategories: {
          active: this.page.locator("text=Active"),
          pricedDealDocuments: this.page.locator("text=Priced Deal Documents"),
          expired: this.page.locator("text=Expired"),
          archived: this.page.locator("text=Archived"),
        },
      },
      // Category: NetRoadshow Library
      netRoadshowLibrary: {
        header: this.page.locator("text=NetRoadshow Library"),
      },
    };
  }
}

export async function navigateToEventsActivePage(page: Page) {
  await expect(async () => {
    await page.goto(process.env.NRS_BASE_URL! + "/mynrs/events/active");
    await expect(page).toHaveURL(/events\/active/);
  }).toPass();
}

export async function navigateToEventsPricedDealDocumentsPage(page: Page) {
  await expect(async () => {
    await page.goto(
      process.env.NRS_BASE_URL! + "/mynrs/events/pricedDealDocuments"
    );
    await expect(page).toHaveURL(/events\/pricedDealDocuments/);
  }).toPass();
}

export async function navigateToEventsExpiredPage(page: Page) {
  await expect(async () => {
    await page.goto(process.env.NRS_BASE_URL! + "/mynrs/events/expired");
    await expect(page).toHaveURL(/events\/expired/);
  }).toPass();
}

export async function navigateToEventsArchivedPage(page: Page) {
  await expect(async () => {
    await page.goto(process.env.NRS_BASE_URL! + "/mynrs/events/archived");
    await expect(page).toHaveURL(/events\/archived/);
  }).toPass();
}

export async function navigateToLibraryPage(page: Page) {
  await expect(async () => {
    await page.goto(process.env.NRS_BASE_URL! + "/mynrs/library");
    await expect(page).toHaveURL(/library/);
  }).toPass();
}
