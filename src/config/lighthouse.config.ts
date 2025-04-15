import lrDesktopConfig from "lighthouse/core/config/lr-desktop-config.js";

export const lighthouseConfig = {
  extends: "lighthouse:default",
  settings: {
    throttling: {
      cpuSlowdownMultiplier: 5,
      rttMs: 40,
      throughputKbps: 10240,
    },
    formFactor: "desktop" as "desktop",
    screenEmulation: {
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
      mobile: false,
    },
    disableStorageReset: false,
    emulatedUserAgent: lrDesktopConfig.settings.emulatedUserAgent,
  },
};

export const lighthouseRunOptions = {
  output: "json" as const,
  logLevel: "silent" as const,
  onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
  formFactor: "desktop" as const,
  throttlingMethod: "simulate" as const,
  disableStorageReset: false,
};
