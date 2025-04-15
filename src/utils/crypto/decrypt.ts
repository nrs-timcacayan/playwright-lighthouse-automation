import CryptoJS from 'crypto-js';

/**
 * Gets the secret key from the environment
 *
 * @returns The secret key or empty string if not found
 */
function getSecretKey(): string {
  return process.env.LIGHTHOUSE_SECRET_KEY ?? '';
}

/**
 * Decrypts an encrypted string using AES encryption with the secret key
 *
 * @param encryptedText - The encrypted text to decrypt
 * @returns The decrypted string
 * @throws Error when secret key is not available from any source
 */
export function decrypt(encryptedText: string): string {
  try {
    if (!encryptedText) {
      return '';
    }

    const key = getSecretKey();

    if (!key) {
      throw new Error(
        'Secret key is not available. ' +
          'Please add LIGHTHOUSE_SECRET_KEY to your .env file. ' +
          'Refer to the team wiki for the current secret key value.'
      );
    }

    // Decrypt the text
    const bytes = CryptoJS.AES.decrypt(encryptedText, key);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedText) {
      throw new Error(
        'Decryption failed: The encrypted text could not be decrypted with the provided key.'
      );
    }

    return decryptedText;
  } catch (error) {
    // Rethrow our custom errors with guidance
    if (error instanceof Error && error.message.includes('Secret key is not available')) {
      throw error;
    }

    console.error('Decryption failed:', error);
    throw new Error('Failed to decrypt the text. Please verify your secret key is correct.');
  }
}
