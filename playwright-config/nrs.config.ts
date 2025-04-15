import { defineConfig, devices } from "@playwright/test";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Get directory path in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Constants for Lighthouse configuration
export const LIGHTHOUSE_PORT = 9222;
export const LIGHTHOUSE_REPORT_DIR = join(process.cwd(), "lighthouse-reports");

// Authentication storage state path
export const STORAGE_STATE = join(
  process.cwd(),
  ".auth",
  "nrsStorageState.json"
);

export default defineConfig({
  testDir: join(__dirname, "../tests/nrs"),
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  timeout: 120000,

  globalSetup: join(__dirname, "../src/setup/globalSetup.ts"),

  use: {
    ...devices["Desktop Chrome"],
    trace: "on-first-retry",
    headless: false,
    launchOptions: {
      args: [
        "--remote-debugging-address=0.0.0.0",
        `--remote-debugging-port=${LIGHTHOUSE_PORT}`,
        "--no-sandbox",
        "--disable-extensions",
      ],
      headless: false,
    },
  },

  projects: [
    {
      name: "loginSetup",
      testMatch: /.*\.setup\.ts/,
    },

    {
      name: "endUser tests",
      dependencies: ["loginSetup"],
      use: {
        storageState: STORAGE_STATE,
      },
    },
  ],

  reporter: [["line"], ["html", { open: "never" }]],
});
