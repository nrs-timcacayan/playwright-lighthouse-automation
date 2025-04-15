# Playwright Lighthouse Automation

This project automates Lighthouse audits using Playwright and Puppeteer, allowing you to run performance, accessibility, best practices, and SEO audits against authenticated web pages of NetRoadshow and ResearchFN applications.

## Installation

```bash
npm install
```

## Usage

Run tests for NetRoadshow (NRS):

```bash
npm run nrs
```

Run tests for ResearchFN (RFN):

```bash
npm run rfn
```

### Environment-specific tests:

```bash
# NetRoadshow Production
npm run nrs:prod

# NetRoadshow Staging
npm run nrs:stage

# ResearchFN Production
npm run rfn:prod

# ResearchFN Staging
npm run rfn:stage
```

## Environment Setup

### Local Development

This project uses environment variables for configuration. Copy `.env.example` to `.env` and fill in the required values.

**Important Note**: The `.env` file is used ONLY for local development and testing. It is not used when tests are executed in CI environments.

### Encrypted Passwords

For security, all passwords in the environment files are stored in encrypted form. To work with encrypted passwords:

1. Add the secret key to your `.env` file:

   ```
   # Get the actual value from the team wiki
   LIGHTHOUSE_SECRET_KEY="secret-key-from-wiki"
   ```

2. Use encrypted password values in your environment files:
   ```
   ENDUSER_ENCRYPTED_PASSWORD=U2FsdGVkX19...encrypted-string...
   ```

For details on encrypting new passwords, please refer to the [Encryption Guide](docs/encryption-guide.md) and this [wiki page](https://netroadshow.atlassian.net/wiki/spaces/~7120204721c23de6674426a693725911eebe9a/pages/4635131911/Secret+Key+for+Playwright+Lighthouse+Tests).

## Documentation

The following documentation guides are available in the `docs` folder:

- [Lighthouse Configuration Guide](docs/lighthouse-config-guide.md) - Detailed information about the Lighthouse configuration settings, including parameters, simulation environment, and best practices for adjusting settings.

- [Encryption Guide](docs/encryption-guide.md) - Instructions for encrypting sensitive credentials, setting up your environment with the secret key, and understanding how the encryption/decryption system works.

## Reports

View the latest test report:

```bash
npm run report
```

Lighthouse reports are saved in the `lighthouse-reports` directory.
