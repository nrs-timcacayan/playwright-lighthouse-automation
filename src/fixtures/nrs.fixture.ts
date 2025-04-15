import { test as baseTest } from '@playwright/test';
import { NRSLoginPage } from '../nrs/pages/nrsLogin.page';

export const test = baseTest.extend<{
  loginPage: NRSLoginPage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new NRSLoginPage(page));
  },
});
