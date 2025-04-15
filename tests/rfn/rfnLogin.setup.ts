import { chromium, expect } from '@playwright/test';
import { test as setup } from '../../src/fixtures/nrs.fixture';
import { dirname } from 'path';
import { mkdirSync, existsSync } from 'fs';
import { STORAGE_STATE } from '../../playwright.config';
import { rfnDomain } from '../../env/domains/rfn.domain';
import { decrypt } from '../../src/utils/crypto/decrypt';

// Ensure the auth directory exists
const authDir = dirname(STORAGE_STATE);
if (!existsSync(authDir)) {
  mkdirSync(authDir, { recursive: true });
}

setup('authenticate', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const decryptedPassword = decrypt(rfnDomain.endUserEncryptedPassword);

  await page.goto(rfnDomain.loginUrl);
  await page.locator('#inputFieldEmail').fill(rfnDomain.endUserEmail);
  await page.locator('#inputFieldPassword').fill(decryptedPassword);
  await page.locator("//button[@class='login-btn rfn-button-primary']").click();

  // Click Agree for Disclaimer Modal
  await page.addLocatorHandler(page.locator('div.modal-content'), async () => {
    await page.locator('#btnLoginDisclaimerAgree').click();
  });

  await expect(page).toHaveURL(/researchfn\/all/, { timeout: 15000 });
  await context.storageState({ path: '.auth/rfnStorageState.json' });
  await browser.close();
});
