import { chromium, expect } from '@playwright/test';
import { test as setup } from '../../src/fixtures/nrs.fixture';
import { dirname } from 'path';
import { mkdirSync, existsSync } from 'fs';
import { STORAGE_STATE } from '../../playwright.config';
import { nrsDomain } from '../../env/domains/nrs.domain';
import { decrypt } from '../../src/utils/crypto/decrypt';

// Ensure the auth directory exists
const authDir = dirname(STORAGE_STATE);
if (!existsSync(authDir)) {
  mkdirSync(authDir, { recursive: true });
}

setup('authenticate', async () => {
  // Launch a browser
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const decryptedPassword = decrypt(nrsDomain.endUserEncryptedPassword);

  await page.goto(nrsDomain.loginUrl);
  await page.getByRole('textbox', { name: 'Email Address' }).fill(nrsDomain.endUserEmail);
  await page.getByRole('textbox', { name: 'Password' }).fill(decryptedPassword);
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  await expect(page).toHaveURL(/events\/active/, { timeout: 15000 });
  await context.storageState({ path: '.auth/nrsStorageState.json' });
  await browser.close();
});
