import { Page, expect } from '@playwright/test';
import { decrypt } from '../../utils/crypto/decrypt';

export type UserRole = 'endUser' | 'underwriter' | 'admin';

export class NRSLoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get locators() {
    return {
      button: {
        login: this.page.getByRole('button', { name: 'Login', exact: true }),
      },
      inputField: {
        email: this.page.getByRole('textbox', { name: 'Email Address' }),
        password: this.page.getByRole('textbox', { name: 'Password' }),
      },
    };
  }

  async login(email: string, password: string) {
    await this.locators.inputField.email.fill(email);
    await this.locators.inputField.password.fill(password);
    await this.locators.button.login.click();
  }

  /**
   * Login with a specific user role, decrypting the password if needed
   */
  async loginWithRole(role: UserRole) {
    let email: string;
    let encryptedPassword: string;

    switch (role) {
      case 'endUser':
        email = process.env.ENDUSER_EMAIL!;
        encryptedPassword = process.env.ENDUSER_ENCRYPTED_PASSWORD!;
        break;
      case 'underwriter':
        email = process.env.UNDERWRITER_EMAIL!;
        encryptedPassword = process.env.UNDERWRITER_ENCRYPTED_PASSWORD!;
        break;
      case 'admin':
        email = process.env.ADMIN_EMAIL!;
        encryptedPassword = process.env.ADMIN_ENCRYPTED_PASSWORD!;
        break;
      default:
        throw new Error(`Unknown user role: ${role}`);
    }

    if (!email || !encryptedPassword) {
      throw new Error(`Missing credentials for role: ${role}`);
    }

    // Decrypt the password using the function with default ENCRYPTION_KEY
    const password = decrypt(encryptedPassword);

    // Login with the decrypted password
    await this.login(email, password);
  }
}

export async function navigateToNRSLoginPage(page: Page) {
  await page.goto(process.env.NRS_LOGIN_URL!);
  await expect(page).toHaveURL(/login/, { timeout: 15000 });
}
