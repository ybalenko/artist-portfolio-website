import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e/specs",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  timeout: 30_000,
  expect: { timeout: 5_000 },
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:4322",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    serviceWorkers: "block",
    reducedMotion: "reduce",
  },
  projects: [
    {
      name: "chrome-desktop",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
        viewport: { width: 1440, height: 1000 },
      },
    },
    {
      name: "chrome-mobile",
      use: {
        ...devices["Pixel 7"],
        channel: "chrome",
        viewport: { width: 390, height: 844 },
      },
    },
    {
      name: "chrome-tablet",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
        viewport: { width: 768, height: 1024 },
        hasTouch: true,
      },
    },
  ],
  webServer: {
    command: "npm run build:e2e && npm run preview:e2e",
    url: "http://127.0.0.1:4322",
    reuseExistingServer: false,
    timeout: 120_000,
    env: { PUBLIC_CONTACT_API_URL: "", ASTRO_TELEMETRY_DISABLED: "1" },
  },
});
