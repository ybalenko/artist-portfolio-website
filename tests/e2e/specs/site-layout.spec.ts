import { test, expect } from "../fixtures/site-layout";
import { resume } from "../../../src/data/resume";
import type { Locator } from "@playwright/test";

const facebookUrl = "https://www.facebook.com/YuliaBalenkoArt";
const copyright = "© 2026 Yulia Balenko. All rights reserved.";

async function expectVisibleFocus(control: Locator) {
  await expect(control).toBeFocused();
  await expect(control).toBeInViewport();
  await expect(control).toHaveCSS("outline-style", "solid");
  expect(
    await control.evaluate((el) =>
      parseFloat(getComputedStyle(el).outlineWidth),
    ),
  ).toBeGreaterThan(0);
}

for (const siteName of ["Home", "Portfolio"] as const) {
  test.describe(
    siteName,
    { tag: ["@layout", siteName === "Home" ? "@home" : "@portfolio"] },
    () => {
      test.use({ siteName });
      test.beforeEach(async ({ site }) => {
        await site.goto();
      });

      test("SHARED-01 unique visible landmarks", async ({ site }) => {
        for (const landmark of [
          site.header.root,
          site.main,
          site.footer.root,
        ]) {
          await expect(landmark).toHaveCount(1);
          await expect(landmark).toBeVisible();
        }
      });

      test("SHARED-02 primary navigation labels and destinations", async ({
        site,
      }) => {
        await expect(site.header.links).toHaveText([
          "Home",
          "Portfolio",
          "Resume",
          "Contacts",
        ]);
        for (const [link, href] of [
          [site.header.homeLink, "/"],
          [site.header.portfolioLink, "/portfolio/"],
          [site.header.resumeLink, resume.pdfUrl],
          [site.header.contactsLink, "/contacts/"],
        ] as const) {
          await expect(link).toBeVisible();
          await expect(link).toHaveAttribute("href", href);
        }
      });

      test("SHARED-03 only the current destination is active", async ({
        site,
      }) => {
        await expect(site.header.currentLinks).toHaveCount(1);
        await expect(site.header.currentLinks).toHaveText(siteName);
        await expect(site.header.activeLinks).toHaveCount(1);
        await expect(site.header.activeLinks).toHaveText(siteName);
      });

      test("SHARED-04 wordmark and internal navigation work", async ({
        site,
        page,
      }) => {
        for (const [link, path] of [
          [site.header.wordmark, "/"],
          [site.header.homeLink, "/"],
          [site.header.portfolioLink, "/portfolio/"],
          [site.header.contactsLink, "/contacts/"],
        ] as const) {
          await site.goto();
          await link.click();
          await expect(page).toHaveURL(new URL(path, page.url()).href);
          await expect(site.main).toBeVisible();
        }
      });

      test("SHARED-05 Resume opens a new tab and preserves the page", async ({
        site,
        page,
      }) => {
        const originalUrl = page.url();
        await expect(site.header.resumeLink).toHaveAttribute(
          "target",
          "_blank",
        );
        await expect(site.header.resumeLink).toHaveAttribute(
          "rel",
          /\bnoopener\b/,
        );
        const popup = await site.header.openResume();
        await expect(popup).toHaveURL(resume.pdfUrl);
        await popup.close();
        await expect(page).toHaveURL(originalUrl);
        await expect(site.heading).toBeVisible();
      });

      test("SHARED-06 footer copyright", async ({ site }) => {
        await site.footer.root.scrollIntoViewIfNeeded();
        await expect(site.footer.root).toBeInViewport();
        await expect(site.footer.root).toContainText(copyright);
      });

      test("SHARED-07 accessible Facebook link opens a new tab", async ({
        site,
        page,
      }) => {
        const originalUrl = page.url();
        await site.footer.root.scrollIntoViewIfNeeded();
        await expect(site.footer.facebookLink).toBeInViewport();
        await expect(site.footer.facebookLink).toHaveAttribute(
          "href",
          facebookUrl,
        );
        await expect(site.footer.facebookLink).toHaveAttribute(
          "target",
          "_blank",
        );
        await expect(site.footer.facebookLink).toHaveAttribute(
          "rel",
          /\bnoopener\b/,
        );
        const popup = await site.footer.openFacebook();
        await expect(popup).toHaveURL(facebookUrl);
        await popup.close();
        await expect(page).toHaveURL(originalUrl);
      });

      test("SHARED-08 header and footer support keyboard activation", async ({
        site,
        page,
      }) => {
        // Six independent navigation journeys, including traversing the gallery to the footer.
        test.setTimeout(60_000);
        const controls = [
          { link: site.header.wordmark, path: "/" },
          { link: site.header.homeLink, path: "/" },
          { link: site.header.portfolioLink, path: "/portfolio/" },
          { link: site.header.resumeLink, path: resume.pdfUrl },
          { link: site.header.contactsLink, path: "/contacts/" },
          { link: site.footer.facebookLink, path: facebookUrl },
        ];
        for (const { link, path } of controls) {
          await site.goto();
          await site.layout.tabTo(link);
          await expectVisibleFocus(link);
          if (path.startsWith("https:")) {
            const popupPromise = page.waitForEvent("popup");
            await page.keyboard.press("Enter");
            const popup = await popupPromise;
            await expect(popup).toHaveURL(path);
            await popup.close();
          } else {
            await page.keyboard.press("Enter");
            await expect(page).toHaveURL(new URL(path, page.url()).href);
          }
        }
      });

      test("SHARED-09 skip link moves keyboard focus to main", async ({
        site,
        page,
      }) => {
        await page.keyboard.press("Tab");
        await expect(site.layout.skipLink).toBeFocused();
        await expect(site.layout.skipLink).toBeInViewport();
        await page.keyboard.press("Enter");
        await expect(site.main).toBeFocused();
      });

      test("SHARED-10 header and footer fit the viewport", async ({
        site,
        page,
      }) => {
        const original = page.viewportSize()!;
        for (const width of new Set([original.width, 320, 390, 640])) {
          await page.setViewportSize({ width, height: original.height });
          expect(
            await page.evaluate(
              () => document.documentElement.scrollWidth <= innerWidth,
            ),
          ).toBe(true);
          const controls = [
            site.header.wordmark,
            ...(await site.header.links.all()),
            site.footer.facebookLink,
          ];
          for (const control of controls) {
            await control.scrollIntoViewIfNeeded();
            await expect(control).toBeInViewport({ ratio: 1 });
            await control.click({ trial: true });
          }
          const header = (await site.header.root.boundingBox())!;
          const main = (await site.main.boundingBox())!;
          const footer = (await site.footer.root.boundingBox())!;
          expect(main.y).toBeGreaterThanOrEqual(header.y + header.height - 1);
          expect(footer.y).toBeGreaterThanOrEqual(main.y + main.height - 1);
        }
      });

      test.describe("without JavaScript", () => {
        test.use({ javaScriptEnabled: false });
        test("SHARED-11 shared content and links work without JavaScript", async ({
          site,
          page,
        }) => {
          await expect(site.header.navigation).toBeVisible();
          await expect(site.footer.root).toContainText(copyright);
          const popup = await site.footer.openFacebook();
          await expect(popup).toHaveURL(facebookUrl);
          await popup.close();
          await site.header.contactsLink.click();
          await expect(page).toHaveURL(/\/contacts\/$/);
          await site.header.homeLink.click();
          await expect(page).toHaveURL(/\/$/);
        });
      });
    },
  );
}
