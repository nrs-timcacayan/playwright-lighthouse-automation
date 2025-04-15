# Lighthouse Configuration Guide

## Overview

This configuration file defines the settings for running Lighthouse audits programmatically within our Playwright automation framework. It ensures consistent testing parameters for evaluating web page quality across NetRoadshow (NRS) and ResearchFN (RFN) applications.

The configuration consists of two primary objects:

1. **`lighthouseConfig`**: Defines the core audit environment
2. **`lighthouseRunOptions`**: Controls the execution parameters

## Configuration Details

### `lighthouseConfig`

```typescript
export const lighthouseConfig = {
  extends: 'lighthouse:default',
  settings: {
    throttling: {
      cpuSlowdownMultiplier: 5,
      rttMs: 40,
      throughputKbps: 10240,
    },
    formFactor: 'desktop',
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
```

| Parameter               | Current Value            | Description                                       |
| ----------------------- | ------------------------ | ------------------------------------------------- |
| `extends`               | `"lighthouse:default"`   | Base configuration being extended                 |
| `cpuSlowdownMultiplier` | `5`                      | Simulates CPU throttling (higher = slower)        |
| `rttMs`                 | `40`                     | Round-trip time in milliseconds (network latency) |
| `throughputKbps`        | `10240`                  | Network speed in Kbps (~10 Mbps)                  |
| `screenEmulation`       | Width: 1350, Height: 940 | Desktop screen dimensions                         |
| `disableStorageReset`   | `false`                  | Whether to preserve browser storage between runs  |

### `lighthouseRunOptions`

```typescript
export const lighthouseRunOptions = {
  output: 'json',
  logLevel: 'silent',
  onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  formFactor: 'desktop',
  throttlingMethod: 'simulate',
  disableStorageReset: false,
};
```

| Parameter          | Current Value          | Description                                |
| ------------------ | ---------------------- | ------------------------------------------ |
| `output`           | `"json"`               | Format of the Lighthouse report output     |
| `logLevel`         | `"silent"`             | Controls verbosity of console output       |
| `onlyCategories`   | All 4 major categories | Audit categories to include                |
| `throttlingMethod` | `"simulate"`           | Method for applying performance throttling |

#### Output Format Options

The `output` parameter determines the format of the Lighthouse report:

- `'json'`: (Default) JSON output for programmatic consumption and parsing
- `'html'`: HTML report that can be opened in a browser
- `'csv'`: CSV format for data export to spreadsheets
- `'md'`: Markdown format report

Example:

```typescript
// Generate both JSON and HTML reports
output: ['json', 'html'];
```

#### Log Level Options

The `logLevel` parameter controls console output verbosity:

- `'silent'`: (Default) No logging to console
- `'error'`: Only error messages
- `'warn'`: Errors and warnings
- `'info'`: Standard information, errors, and warnings
- `'verbose'`: Detailed logging with debugging information

Example for debugging:

```typescript
logLevel: 'info'; // See more details during execution
```

## Key Concept: Simulated Environment

It is crucial to understand that this configuration primarily uses simulated throttling (`throttlingMethod: "simulate"`). This means Lighthouse does not measure the actual performance of the machine running the test. Instead, it:

1. Runs the test quickly on the host machine (unthrottled)
2. Uses the throttling settings to estimate how the page would perform under those specific, predefined conditions

This simulation ensures consistent and reproducible results across different machines and test runs, which is the standard practice for benchmarking and tracking changes over time.

## Adjusting Settings

### 1. Common Configuration Adjustments

- **To simulate different screen resolutions:**

  ```typescript
  screenEmulation: {
    width: 1920,  // Full HD display
    height: 1080,
    deviceScaleFactor: 1,
    mobile: false,
  }
  ```

- **To simulate different network conditions:**

  ```typescript
  throttling: {
    cpuSlowdownMultiplier: 2,     // Less CPU throttling for faster machines
    rttMs: 150,                  // Higher latency (slower connection)
    throughputKbps: 5120,        // ~5 Mbps (slower bandwidth)
  }
  ```

- **To focus on specific audit categories:**

  ```typescript
  onlyCategories: ['performance']; // Only run performance audits
  ```

- **To test logged-in states:**
  ```typescript
  disableStorageReset: true; // Preserve cookies/storage
  ```

### 2. Using Actual System Performance (Non-Standard Use - Use with Caution)

Lighthouse throttling is designed for simulation, not for precisely replicating the performance of the machine running the test. Using local conditions introduces variability and makes results less comparable over time or across different machines.

However, if the goal is to run Lighthouse using the host machine's actual network and CPU capabilities:

```typescript
throttlingMethod: 'provided'; // Disable all internal throttling
```

> **Note:** Adjusting `cpuSlowdownMultiplier`, `rttMs`, or `throughputKbps` based on local speed tests is not the standard way to mimic the local system when using the 'simulate' method. Those parameters define the target simulation, not the host's capabilities. Use `throttlingMethod: "provided"` to bypass simulation entirely.

## Best Practices

1. Maintain consistent settings between test runs to ensure comparable results
2. Consider running multiple tests and averaging results for better stability
3. Document any configuration changes when reporting performance improvements
4. Use the simulated environment (`throttlingMethod: "simulate"`) for CI/CD integration
5. When comparing performance over time, always use the same configuration settings
