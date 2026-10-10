import { defineConfig } from "@playwright/test";
import baseConfig from "./playwright.config";

export default defineConfig({
  ...baseConfig,
  testIgnore: [],
  testMatch: "contacts-configured.spec.ts",
  outputDir: ".playwright/contact-results",
  use: {
    ...baseConfig.use,
    baseURL: "http://127.0.0.1:4323",
  },
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: ".playwright/contact-report" }],
  ],
  webServer: {
    command: "npm run build:e2e:contacts && npm run preview:e2e:contacts",
    url: "http://127.0.0.1:4323",
    reuseExistingServer: false,
    timeout: 120_000,
    env: {
      PUBLIC_CONTACT_API_URL: "https://contact-api.test.invalid/messages",
      ASTRO_TELEMETRY_DISABLED: "1",
    },
  },
});
