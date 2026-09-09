import { test, expect } from "../fixtures/test";
import {
  alternateSection,
  emptySection,
  expectedMetadata,
  initialSection,
  type PortfolioImageFixture,
  representatives,
} from "../fixtures/portfolio-content";
import type { Locator } from "@playwright/test";

const initial = representatives(initialSection);
const alternate = representatives(alternateSection);

const expectImage = async (
  imageLocator: Locator,
  image: PortfolioImageFixture,
) => {
  await expect(imageLocator).toHaveAttribute("src", image.src);
  await expect(imageLocator).toHaveAttribute("alt", image.alt);
  await expect(imageLocator).toHaveAttribute("width", String(image.width));
  await expect(imageLocator).toHaveAttribute("height", String(image.height));
};

const expectMetadata = async (
  target: {
    metadataValue: (
      field: "name" | "medium" | "size" | "year" | "availability",
    ) => import("@playwright/test").Locator;
  },
  image: PortfolioImageFixture,
) => {
  const values = expectedMetadata(image);
  await expect(target.metadataValue("name")).toHaveText(values.name);
  await expect(target.metadataValue("medium")).toHaveText(values.medium);
  await expect(target.metadataValue("size")).toHaveText(values.size);
  await expect(target.metadataValue("year")).toHaveText(values.year);
  await expect(target.metadataValue("availability")).toHaveText(
    values.availability,
  );
};

test("PORTFOLIO-01 direct load and refresh restore URL selection", async ({
  portfolio,
  page,
}) => {
  expect((await portfolio.goto())?.status()).toBe(200);
  await portfolio.selectThumbnail(Math.floor(initialSection.images.length / 2));
  await expect(page).toHaveURL(
    new RegExp(`#${initialSection.id}/${initial.middle.id}$`),
  );
  expect((await page.reload())?.status()).toBe(200);
  await expectImage(portfolio.selectedImage, initial.middle);
  await expect(
    portfolio.thumbnail(Math.floor(initialSection.images.length / 2)),
  ).toHaveAttribute("aria-current", "true");
});

test("PORTFOLIO-02 metadata and page headings", async ({ portfolio, page }) => {
  await portfolio.goto();
  await expect(page).toHaveTitle("Portfolio — Yulia Balenko");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "Selected artwork by Yulia Balenko.",
  );
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(portfolio.eyebrow).toBeVisible();
  await expect(portfolio.main.getByRole("heading", { level: 1 })).toHaveCount(
    1,
  );
  await expect(portfolio.heading).toBeVisible();
});

test("PORTFOLIO-03 Portfolio is the active primary destination", async ({
  portfolio,
}) => {
  await portfolio.goto();
  await expect(portfolio.header.portfolioLink).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(portfolio.header.portfolioLink).toHaveClass(/\bactive\b/);
  await expect(
    portfolio.header.navigation.locator('[aria-current="page"]'),
  ).toHaveCount(1);
  await expect(portfolio.header.links).toHaveText([
    "Home",
    "Portfolio",
    "Resume",
    "Contacts",
  ]);
});

test("PORTFOLIO-04 section controls have approved order and label", async ({
  portfolio,
}) => {
  await portfolio.goto();
  await expect(portfolio.sectionNavigation).toBeVisible();
  await expect(portfolio.sectionButtons).toHaveText([
    "Landscapes",
    "Still life",
    "Other",
  ]);
});

test("PORTFOLIO-05 first populated section is initially active", async ({
  portfolio,
}) => {
  await portfolio.goto();
  await expect(portfolio.sectionButton(initialSection.label)).toHaveAttribute(
    "aria-current",
    "true",
  );
  await expect(portfolio.visibleSection).toHaveCount(1);
  await expect(portfolio.visibleSection).toHaveAttribute(
    "data-portfolio-section",
    initialSection.id,
  );
  await expectImage(portfolio.selectedImage, initial.first);
});

test("PORTFOLIO-06 changing populated section selects its first artwork", async ({
  portfolio,
  page,
}) => {
  await portfolio.goto();
  await portfolio.selectSection(alternateSection.label);
  await expect(portfolio.sectionButton(alternateSection.label)).toHaveAttribute(
    "aria-current",
    "true",
  );
  await expect(
    portfolio.sectionNavigation.locator('[aria-current="true"]'),
  ).toHaveCount(1);
  await expect(portfolio.visibleSection).toHaveAttribute(
    "data-portfolio-section",
    alternateSection.id,
  );
  await expectImage(portfolio.selectedImage, alternate.first);
  await expect(page).toHaveURL(
    new RegExp(`#${alternateSection.id}/${alternate.first.id}$`),
  );
});

test("PORTFOLIO-07 configured empty section shows its empty state", async ({
  portfolio,
  page,
}) => {
  await portfolio.goto();
  await portfolio.selectSection(emptySection.label);
  await expect(portfolio.sectionButton(emptySection.label)).toHaveAttribute(
    "aria-current",
    "true",
  );
  await expect(portfolio.emptyState).toContainText("Coming soon");
  await expect(portfolio.emptyState).toContainText(
    "No published artwork is available in this section yet.",
  );
  await expect(portfolio.selectedImage).toHaveCount(0);
  await expect(portfolio.selectedMetadata).toHaveCount(0);
  await expect(portfolio.thumbnails).toHaveCount(0);
  await expect(page).toHaveURL(new RegExp(`#${emptySection.id}$`));
});

test("PORTFOLIO-08 returning from empty section resets populated selection", async ({
  portfolio,
  page,
}) => {
  await portfolio.goto();
  await portfolio.selectThumbnail(1);
  await portfolio.selectSection(emptySection.label);
  await portfolio.selectSection(initialSection.label);
  await expectImage(portfolio.selectedImage, initial.first);
  await expect(portfolio.thumbnail(0)).toHaveAttribute("aria-current", "true");
  await expect(page).toHaveURL(
    new RegExp(`#${initialSection.id}/${initial.first.id}$`),
  );
});

test("PORTFOLIO-09 selected artwork exposes source dimensions and alt text", async ({
  portfolio,
}) => {
  await portfolio.goto();
  await expectImage(portfolio.selectedImage, initial.first);
  await expect(portfolio.selectedImage).toBeVisible();
  await expect(portfolio.selectedImage).toHaveJSProperty("complete", true);
  await expect(portfolio.selectedImage).toHaveJSProperty("naturalWidth", 960);
});

test("PORTFOLIO-10 selected artwork shows all metadata", async ({
  portfolio,
}) => {
  await portfolio.goto();
  await expect(portfolio.selectedMetadata.locator("dt")).toHaveText([
    "Name",
    "Medium",
    "Size",
    "Year",
    "Status",
  ]);
  await expectMetadata(portfolio, initial.first);
});

test("PORTFOLIO-11 thumbnail selection synchronizes gallery and URL", async ({
  portfolio,
  page,
}) => {
  await portfolio.goto();
  const index = Math.floor(initialSection.images.length / 2);
  await portfolio.selectThumbnail(index);
  await expectImage(portfolio.selectedImage, initial.middle);
  await expectMetadata(portfolio, initial.middle);
  await expect(
    portfolio.visibleSection.locator('[data-thumbnail][aria-current="true"]'),
  ).toHaveCount(1);
  await expect(portfolio.thumbnail(index)).toHaveAttribute(
    "aria-current",
    "true",
  );
  await expect(portfolio.featureButton).toHaveAttribute(
    "data-index",
    String(index),
  );
  await expect(page).toHaveURL(
    new RegExp(`#${initialSection.id}/${initial.middle.id}$`),
  );
});

test("PORTFOLIO-12 thumbnails have accessible labels and one current item", async ({
  portfolio,
}) => {
  await portfolio.goto();
  await expect(portfolio.thumbnailRegion).toHaveAttribute(
    "aria-label",
    `${initialSection.label} thumbnails`,
  );
  const labels = await portfolio.thumbnails.evaluateAll((buttons) =>
    buttons.map((button) => button.getAttribute("aria-label")),
  );
  expect(new Set(labels).size).toBe(labels.length);
  expect(labels.every(Boolean)).toBe(true);
  await expect(
    portfolio.visibleSection.locator('[data-thumbnail][aria-current="true"]'),
  ).toHaveCount(1);
});

test("PORTFOLIO-13 feature artwork opens accessible carousel and moves focus", async ({
  portfolio,
  page,
}) => {
  await portfolio.goto();
  await portfolio.openFeatureCarousel();
  await expect(portfolio.carousel.root).toBeVisible();
  await expect(
    page.getByRole("dialog", { name: "Artwork carousel" }),
  ).toBeVisible();
  await expect(portfolio.carousel.root).toHaveAttribute("aria-modal", "true");
  await expect(portfolio.carousel.closeButton).toBeFocused();
  await expectImage(portfolio.carousel.image, initial.first);
});

test("PORTFOLIO-14 double-clicked thumbnail opens carousel on that artwork", async ({
  portfolio,
}) => {
  await portfolio.goto();
  const index = Math.floor(initialSection.images.length / 2);
  await portfolio.openThumbnailCarousel(index);
  await expect(portfolio.carousel.root).toBeVisible();
  await expectImage(portfolio.carousel.image, initial.middle);
  await portfolio.carousel.close();
  await expect(portfolio.thumbnail(index)).toBeFocused();
});

test("PORTFOLIO-15 carousel metadata matches selected gallery artwork", async ({
  portfolio,
}) => {
  await portfolio.goto();
  const index = Math.floor(initialSection.images.length / 2);
  await portfolio.selectThumbnail(index);
  await portfolio.openFeatureCarousel();
  await expectImage(portfolio.carousel.image, initial.middle);
  await expectMetadata(portfolio.carousel, initial.middle);
});

test("PORTFOLIO-16 previous and next synchronize carousel and gallery", async ({
  portfolio,
  page,
}) => {
  await portfolio.goto();
  await portfolio.openFeatureCarousel();
  await portfolio.carousel.next();
  await expectImage(portfolio.carousel.image, initialSection.images[1]);
  await expectImage(portfolio.selectedImage, initialSection.images[1]);
  await expectMetadata(portfolio, initialSection.images[1]);
  await expect(portfolio.thumbnail(1)).toHaveAttribute("aria-current", "true");
  await expect(page).toHaveURL(
    new RegExp(`#${initialSection.id}/${initialSection.images[1].id}$`),
  );
  await portfolio.carousel.previous();
  await expectImage(portfolio.carousel.image, initial.first);
  await expect(portfolio.thumbnail(0)).toHaveAttribute("aria-current", "true");
});

test("PORTFOLIO-17 carousel controls wrap at both ends", async ({
  portfolio,
}) => {
  await portfolio.goto();
  await portfolio.openFeatureCarousel();
  await portfolio.carousel.previous();
  await expectImage(portfolio.carousel.image, initial.last);
  await portfolio.carousel.next();
  await expectImage(portfolio.carousel.image, initial.first);
  await portfolio.carousel.close();
  await portfolio.selectThumbnail(initialSection.images.length - 1);
  await portfolio.openFeatureCarousel();
  await portfolio.carousel.next();
  await expectImage(portfolio.carousel.image, initial.first);
});

test("PORTFOLIO-18 carousel arrow keys navigate artwork", async ({
  portfolio,
  page,
}) => {
  await portfolio.goto();
  await portfolio.openFeatureCarousel();
  await page.keyboard.press("ArrowRight");
  await expectImage(portfolio.carousel.image, initialSection.images[1]);
  await page.keyboard.press("ArrowLeft");
  await expectImage(portfolio.carousel.image, initial.first);
});

test("PORTFOLIO-19 close button restores feature focus and gallery", async ({
  portfolio,
}) => {
  await portfolio.goto();
  await portfolio.openFeatureCarousel();
  await portfolio.carousel.close();
  await expect(portfolio.carousel.root).toBeHidden();
  await expect(portfolio.content).not.toHaveAttribute("aria-hidden");
  await expect(portfolio.featureButton).toBeFocused();
});

test("PORTFOLIO-20 Escape restores thumbnail focus and gallery", async ({
  portfolio,
  page,
}) => {
  await portfolio.goto();
  const index = Math.floor(initialSection.images.length / 2);
  await portfolio.openThumbnailCarousel(index);
  await page.keyboard.press("Escape");
  await expect(portfolio.carousel.root).toBeHidden();
  await expect(portfolio.content).not.toHaveAttribute("aria-hidden");
  await expect(portfolio.thumbnail(index)).toBeFocused();
});

test("PORTFOLIO-21 open carousel isolates and then restores background", async ({
  portfolio,
}) => {
  await portfolio.goto();
  await portfolio.openFeatureCarousel();
  await expect(portfolio.content).toHaveAttribute("aria-hidden", "true");
  expect(
    await portfolio.content.evaluate(
      (element) => (element as HTMLElement).inert,
    ),
  ).toBe(true);
  await portfolio.carousel.close();
  await expect(portfolio.content).not.toHaveAttribute("aria-hidden");
  expect(
    await portfolio.content.evaluate(
      (element) => (element as HTMLElement).inert,
    ),
  ).toBe(false);
});

test("PORTFOLIO-22 section-and-artwork deep link selects without opening modal", async ({
  portfolio,
}) => {
  await portfolio.goto(`#${alternateSection.id}/${alternate.middle.id}`);
  await expect(portfolio.visibleSection).toHaveAttribute(
    "data-portfolio-section",
    alternateSection.id,
  );
  await expectImage(portfolio.selectedImage, alternate.middle);
  await expect(portfolio.carousel.root).toBeHidden();
});

test("PORTFOLIO-23 generated artwork URL restores state in a new page", async ({
  portfolio,
  page,
  context,
}) => {
  await portfolio.goto();
  const index = Math.floor(initialSection.images.length / 2);
  await portfolio.selectThumbnail(index);
  const selectedUrl = page.url();
  const sharedPage = await context.newPage();
  await sharedPage.goto(selectedUrl);
  await expect(
    sharedPage.locator("[data-portfolio-section]:not([hidden])"),
  ).toHaveAttribute("data-portfolio-section", initialSection.id);
  await expect(
    sharedPage.locator("[data-selected-image]").filter({ visible: true }),
  ).toHaveAttribute("src", initial.middle.src);
  await expect(
    sharedPage.locator(
      '[data-portfolio-section]:not([hidden]) [data-thumbnail][aria-current="true"]',
    ),
  ).toHaveAttribute("data-index", String(index));
  await sharedPage.close();
});

test("PORTFOLIO-24 legacy artwork-only and section-only hashes work", async ({
  portfolio,
  page,
}) => {
  await portfolio.goto(`#${alternate.middle.id}`);
  await expect(portfolio.visibleSection).toHaveAttribute(
    "data-portfolio-section",
    alternateSection.id,
  );
  await expectImage(portfolio.selectedImage, alternate.middle);
  await page.goto(`/portfolio/#${emptySection.id}`);
  await expect(portfolio.visibleSection).toHaveAttribute(
    "data-portfolio-section",
    emptySection.id,
  );
  await expect(portfolio.emptyState).toBeVisible();
});

test("PORTFOLIO-25 invalid hash leaves default gallery usable", async ({
  portfolio,
}) => {
  await portfolio.goto("#unknown-section/unknown-artwork");
  await expect(portfolio.visibleSection).toHaveAttribute(
    "data-portfolio-section",
    initialSection.id,
  );
  await expectImage(portfolio.selectedImage, initial.first);
  await portfolio.selectThumbnail(1);
  await expectImage(portfolio.selectedImage, initialSection.images[1]);
});

test("PORTFOLIO-26 controls are keyboard reachable with visible focus", async ({
  portfolio,
  page,
}) => {
  await portfolio.goto();
  await portfolio.sectionButton(initialSection.label).focus();
  await expect(portfolio.sectionButton(initialSection.label)).toBeFocused();
  await expect(portfolio.sectionButton(initialSection.label)).toHaveCSS(
    "outline-style",
    "solid",
  );
  await page.keyboard.press("Tab");
  await expect(portfolio.sectionButton(alternateSection.label)).toBeFocused();
  await portfolio.featureButton.focus();
  await page.keyboard.press("Enter");
  await expect(portfolio.carousel.closeButton).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(portfolio.carousel.previousButton).toBeFocused();
  await expect(portfolio.carousel.previousButton).toHaveCSS(
    "outline-style",
    "solid",
  );
});

test("PORTFOLIO-27 gallery and modal adapt without page overflow", async ({
  portfolio,
  page,
}) => {
  await portfolio.goto();
  await expect(portfolio.sectionNavigation).toBeVisible();
  await expect(portfolio.featureButton).toBeVisible();
  await expect(portfolio.selectedMetadata).toBeVisible();
  await expect(portfolio.thumbnail(0)).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await portfolio.openFeatureCarousel();
  await expect(portfolio.carousel.closeButton).toBeInViewport();
  await expect(portfolio.carousel.previousButton).toBeInViewport();
  await expect(portfolio.carousel.nextButton).toBeInViewport();
  await expect(portfolio.carousel.image).toBeInViewport();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("PORTFOLIO-28 initial gallery remains available", async ({
    portfolio,
  }) => {
    await portfolio.goto();
    await expect(portfolio.heading).toBeVisible();
    await expect(portfolio.visibleSection).toHaveAttribute(
      "data-portfolio-section",
      initialSection.id,
    );
    await expectImage(portfolio.selectedImage, initial.first);
    await expectMetadata(portfolio, initial.first);
    await expect(portfolio.thumbnails).not.toHaveCount(0);
    await expect(portfolio.carousel.root).toBeHidden();
  });
});

test("PORTFOLIO-29 normal interactions have no uncaught errors", async ({
  portfolio,
  page,
}) => {
  await portfolio.goto();
  await portfolio.selectSection(alternateSection.label);
  await portfolio.selectThumbnail(1);
  await portfolio.openFeatureCarousel();
  await portfolio.carousel.next();
  await page.keyboard.press("ArrowLeft");
  await portfolio.carousel.close();
  await page.goto(`/portfolio/#${initialSection.id}/${initial.last.id}`);
  await expectImage(portfolio.selectedImage, initial.last);
  // The automatic runtimeErrors fixture asserts after the scenario.
});
