import { test as base, expect } from "@playwright/test";
import {
  homeArtistPortrait,
  publishedHomeCarouselImages,
} from "../../../src/data/homeCarousel";
import { resume } from "../../../src/data/resume";
import { HomePage } from "../pages/HomePage";

const imageUrls = new Set([
  homeArtistPortrait.src,
  ...publishedHomeCarouselImages.map((image) => image.src),
]);
const imageFixture =
  '<svg xmlns="http://www.w3.org/2000/svg" width="960" height="960"><rect width="960" height="960" fill="#c4b6a1"/></svg>';

export const test = base.extend<{
  home: HomePage;
  networkGuard: void;
  runtimeErrors: void;
  carouselClock: void;
}>({
  networkGuard: [
    async ({ context, baseURL }, use) => {
      const unexpected: string[] = [];
      await context.route("**/*", async (route) => {
        const request = route.request();
        const url = new URL(request.url());
        if (request.method() !== "GET" && request.method() !== "HEAD") {
          unexpected.push(`${request.method()} ${url.origin}${url.pathname}`);
          await route.abort();
        } else if (url.origin === new URL(baseURL!).origin) {
          await route.continue();
        } else if (imageUrls.has(request.url())) {
          await route.fulfill({
            contentType: "image/svg+xml",
            body: imageFixture,
          });
        } else if (
          request.url() === resume.pdfUrl ||
          request.url() === "https://www.facebook.com/YuliaBalenkoArt"
        ) {
          // Test the outbound browser destination, not a native PDF viewer or live service.
          await route.fulfill({
            contentType: "text/html",
            body: "<!doctype html><title>External destination fixture</title>",
          });
        } else if (
          url.hostname ===
            "yulia-balenko-portfolio-images.s3.us-east-1.amazonaws.com" &&
          request.resourceType() === "image"
        ) {
          // Portfolio images can load when HOME-07 follows the navigation link.
          await route.fulfill({
            contentType: "image/svg+xml",
            body: imageFixture,
          });
        } else {
          unexpected.push(`${request.method()} ${url.origin}${url.pathname}`);
          await route.abort();
        }
      });
      await use();
      expect(
        unexpected,
        "No unexpected external requests or write requests",
      ).toEqual([]);
    },
    { auto: true },
  ],
  runtimeErrors: [
    async ({ context }, use) => {
      const errors: string[] = [];
      context.on("page", (page) =>
        page.on("pageerror", (error) => errors.push(error.message)),
      );
      await use();
      expect(errors, "No uncaught browser JavaScript errors").toEqual([]);
    },
    { auto: true },
  ],
  home: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  carouselClock: async ({ page }, use) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    const start = new Date("2026-09-07T12:00:00Z");
    await page.clock.install({ time: start });
    await page.clock.pauseAt(start);
    await use();
  },
});

export { expect } from "@playwright/test";
