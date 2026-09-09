import { test as base } from "./test";
import type { HomePage } from "../pages/HomePage";
import type { PortfolioPage } from "../pages/PortfolioPage";

export const test = base.extend<{
  siteName: "Home" | "Portfolio";
  site: HomePage | PortfolioPage;
}>({
  siteName: ["Home", { option: true }],
  site: async ({ home, portfolio, siteName }, use) => {
    await use(siteName === "Home" ? home : portfolio);
  },
});

export { expect } from "./test";
