import * as path from 'path';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

const rootEnvPath = path.resolve(process.cwd(), '.env');

if (fs.existsSync(rootEnvPath)) {
  dotenv.config({ path: rootEnvPath });
}

async function globalSetup() {
  const environment = process.env.ENVIRONMENT;
  console.log('Environment:', environment);

  if (!environment) {
    throw new Error(
      'ERROR: .env file is missing or ENVIRONMENT variable is not set. Please copy .env.example to .env and fill in the required values.'
    );
  }

  const envPath = path.resolve(process.cwd(), `env/.env.${environment}`);
  if (!fs.existsSync(envPath)) return;

  dotenv.config({ path: envPath, override: true });
}

export default globalSetup;
