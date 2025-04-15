# Credential Encryption Guide

## Overview

This document provides instructions for encrypting sensitive credentials used in the Playwright Lighthouse automation project. All passwords in environment files should be encrypted to prevent accidental exposure or unauthorized access.

## Requirements

- Node.js installed
- crypto-js package (`npm install -D crypto-js`)
- Access to the team wiki for the secret key

## Setting Up Your Environment

### Step 1: Get the Secret Key

The secret key is stored in the team wiki for security reasons. Please refer to this [wiki page](https://netroadshow.atlassian.net/wiki/spaces/~7120204721c23de6674426a693725911eebe9a/pages/4635131911/Secret+Key+for+Playwright+Lighthouse+Tests).

> **Note:** This wiki page is currently in a personal space and will eventually be moved to the proper team space.

Add the secret key to your local `.env` file (not committed to version control):

```
LIGHTHOUSE_SECRET_KEY="the_key_from_wiki"
```

**IMPORTANT: Never commit this key to version control or share it publicly.**

### Step 2: Create the Encryption Script

Create a file named `encrypt.cjs` in your project:

```javascript
#!/usr/bin/env node

const CryptoJS = require('crypto-js');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prompt = query => {
  return new Promise(resolve => {
    rl.question(query, answer => {
      resolve(answer);
    });
  });
};

const encrypt = (value, secretKey) => {
  return CryptoJS.AES.encrypt(value, secretKey).toString();
};

async function main() {
  const secretKey = await prompt('Secret key: ');
  const value = await prompt('Value: ');

  if (secretKey && value) {
    console.log(encrypt(value, secretKey));
  }

  rl.close();
}

main().catch(error => {
  console.error('Error:', error);
  rl.close();
});
```

**Note**: This file should be gitignored and never committed with actual values.

### Step 3: Install Required Dependency

Install the crypto-js package if you haven't already:

```bash
npm install -D crypto-js
```

### Step 4: Encrypt Your Passwords

Run the encryption script:

```bash
node encrypt.cjs
```

When prompted:

1. Enter the secret key (from the wiki)
2. Enter the value to encrypt
3. Copy the resulting encrypted string

### Step 5: Add Encrypted Values to Environment Files

Copy the encrypted values to your environment files:

```
# Example .env.prod format
ENDUSER_ENCRYPTED_PASSWORD=U2FsdGVkX19...encrypted-string...
UNDERWRITER_ENCRYPTED_PASSWORD=U2FsdGVkX19...encrypted-string...
ADMIN_ENCRYPTED_PASSWORD=U2FsdGVkX19...encrypted-string...
```

## Security Best Practices

1. Never commit unencrypted passwords
2. Never commit your secret key
3. Always refer to the wiki for the current secret key
4. Limit access to the secret key to authorized personnel only
5. Delete any temporary encryption scripts after using them

## How It Works

The project uses the AES encryption algorithm from the crypto-js package, which is a symmetric encryption algorithm. This means the same secret key is used for both encryption and decryption.

During test execution, the `decrypt` function in `src/utils/crypto/decrypt.ts` automatically decrypts passwords using the `LIGHTHOUSE_SECRET_KEY` environment variable from your `.env` file.
