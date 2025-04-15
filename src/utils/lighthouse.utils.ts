import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { generateReport } from "lighthouse";
import lighthouse from "lighthouse";
import { connect, Page as PuppeteerPage } from "puppeteer";
import { Page } from "@playwright/test";
import {
  LIGHTHOUSE_PORT,
  LIGHTHOUSE_REPORT_DIR,
} from "../../playwright.config";
import {
  lighthouseConfig,
  lighthouseRunOptions,
} from "../config/lighthouseConfig";

// Use a closure to ensure we only create one directory per Node.js process
const getReportDir = (() => {
  let reportDirPath: string | null = null;

  return () => {
    if (!reportDirPath) {
      // Create a timestamp for this test run
      const runTimestamp = new Date().toISOString().replace(/:/g, "-");

      // Create a single report directory for this test run
      reportDirPath = join(LIGHTHOUSE_REPORT_DIR, runTimestamp);

      if (!existsSync(reportDirPath)) {
        mkdirSync(reportDirPath, { recursive: true });
        console.log(`Created Lighthouse report directory: ${reportDirPath}`);
      }
    }

    return reportDirPath;
  };
})();

/**
 * Saves Lighthouse reports to the filesystem
 */
export function saveLighthouseReports({
  lhr,
  reportName = "lighthouse-report",
}: {
  lhr: any;
  reportName?: string;
}): void {
  const finalReportName = `${reportName}`;
  const reportDir = getReportDir();

  // Save JSON report
  writeFileSync(
    join(reportDir, `${finalReportName}.json`),
    JSON.stringify(lhr, null, 2)
  );

  // Save HTML report
  writeFileSync(
    join(reportDir, `${finalReportName}.html`),
    generateReport(lhr, "html")
  );

  console.log(
    `Lighthouse report saved to: ${reportDir} with name: ${finalReportName}`
  );
}

/**
 * Runs a Lighthouse audit on the current page and saves the reports
 */
export async function runLighthouseAuditAndSaveReports(
  page: Page,
  reportName: string
): Promise<void> {
  // Get authentication data
  const cookies = await page.context().cookies();
  const currentUrl = page.url();

  // Connect Puppeteer to the same browser
  const puppeteerBrowser = await connect({
    browserURL: `http://127.0.0.1:${LIGHTHOUSE_PORT}`,
  });

  let puppeteerPage: PuppeteerPage | undefined = undefined;

  try {
    puppeteerPage = await puppeteerBrowser.newPage();
    TODO: "Refactor `setCookie` since it's deprecated";
    await puppeteerPage.setCookie(...cookies);
    await puppeteerPage.goto(currentUrl, { waitUntil: "load" });

    // Run Lighthouse with settings that match Chrome DevTools
    const result = await lighthouse(
      currentUrl,
      {
        ...lighthouseRunOptions,
        port: LIGHTHOUSE_PORT,
      },
      lighthouseConfig
    );

    // Add null check for result
    if (!result) {
      throw new Error("Lighthouse audit failed to run");
    }

    // Save reports using the utility function
    saveLighthouseReports({
      lhr: result.lhr,
      reportName,
    });
  } finally {
    // Clean up
    if (puppeteerPage) {
      await puppeteerPage.close();
    }
    await puppeteerBrowser.disconnect();
  }
}
