import { test, expect } from "../fixtures/test";
import { artistStatement } from "../fixtures/home-content";
import {
  homeArtistPortrait,
  publishedHomeCarouselImages as images,
} from "../../../src/data/homeCarousel";

test.describe("Home", { tag: "@home" }, () => {
  test("HOME-01 direct load and refresh", async ({ home, page }) => {
    expect((await home.goto())?.status()).toBe(200);
    await expect(home.heading).toBeVisible();
    expect((await page.reload())?.status()).toBe(200);
    await expect(home.heading).toBeVisible();
    await expect(page).toHaveURL(/\/$/);
  });

  test("HOME-02 metadata", async ({ home, page }) => {
    await home.goto();
    await expect(page).toHaveTitle("Yulia Balenko — Artist");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      "The artist portfolio of Yulia Balenko.",
    );
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("HOME-03 heading and eyebrow", async ({ home }) => {
    await home.goto();
    await expect(home.eyebrow).toBeVisible();
    await expect(home.main.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(home.heading).toBeVisible();
  });

  test("HOME-04 complete approved artist statement", async ({ home }) => {
    await home.goto();
    await expect(home.paragraphs).toHaveText(artistStatement);
    for (const paragraph of await home.paragraphs.all())
      await expect(paragraph).toBeVisible();
  });

  test("HOME-10 portrait loads in a square area with alternative text", async ({
    home,
  }) => {
    await home.goto();
    await expect(home.portrait).toHaveAttribute("src", homeArtistPortrait.src);
    await expect(home.portrait).toHaveAttribute("alt", homeArtistPortrait.alt);
    await expect(home.portrait).toBeVisible();
    await expect(home.portrait).toHaveJSProperty("complete", true);
    await expect(home.portrait).toHaveJSProperty("naturalWidth", 960);
    const box = await home.portrait.boundingBox();
    expect(box).not.toBeNull();
    expect(Math.abs(box!.width - box!.height)).toBeLessThan(1);
  });

  test("HOME-11 first configured image and accessible position", async ({
    home,
  }) => {
    await home.goto();
    await expect(home.carousel.image).toBeVisible();
    await expect(home.carousel.image).toHaveAttribute("src", images[0].src);
    await expect(home.carousel.image).toHaveAttribute("alt", images[0].alt);
    await expect(home.carousel.image).toHaveAttribute(
      "width",
      String(images[0].width),
    );
    await expect(home.carousel.image).toHaveAttribute(
      "height",
      String(images[0].height),
    );
    await expect(home.carousel.image).toHaveJSProperty("naturalWidth", 960);
    await expect(home.carousel.status).toHaveAttribute("aria-live", "polite");
    await expect(home.carousel.status).toHaveText(`1 / ${images.length}`);
    await expect(home.carousel.root.getByRole("button")).toHaveCount(0);
  });

  test.describe("carousel timing", () => {
    test.beforeEach(async ({ carouselClock }) => {
      void carouselClock;
    });

    test("HOME-12 advances after seven seconds and updates metadata", async ({
      home,
      page,
    }) => {
      await home.goto();
      await page.clock.runFor(6999);
      await expect(home.carousel.image).toHaveAttribute("src", images[0].src);
      await page.clock.runFor(1);
      await expect(home.carousel.image).toHaveAttribute("src", images[1].src);
      await expect(home.carousel.image).toHaveAttribute("alt", images[1].alt);
      await expect(home.carousel.image).toHaveAttribute(
        "width",
        String(images[1].width),
      );
      await expect(home.carousel.image).toHaveAttribute(
        "height",
        String(images[1].height),
      );
      await expect(home.carousel.status).toHaveText(`2 / ${images.length}`);
    });

    test("HOME-13 follows configured order and wraps to first image", async ({
      home,
      page,
    }) => {
      await home.goto();
      for (const image of images.slice(1)) {
        await page.clock.runFor(7000);
        await expect(home.carousel.image).toHaveAttribute("src", image.src);
      }
      await page.clock.runFor(7000);
      await expect(home.carousel.image).toHaveAttribute("src", images[0].src);
      await expect(home.carousel.status).toHaveText(`1 / ${images.length}`);
    });

    test("HOME-14 hovering pauses rotation", async ({ home, page }) => {
      await home.goto();
      await home.carousel.hover();
      await page.clock.runFor(21000);
      await expect(home.carousel.image).toHaveAttribute("src", images[0].src);
    });

    test("HOME-15 leaving resumes one rotation timer", async ({
      home,
      page,
    }) => {
      await home.goto();
      for (let i = 0; i < 3; i++) {
        await home.carousel.hover();
        await home.carousel.leave();
      }
      await page.clock.runFor(7000);
      await expect(home.carousel.image).toHaveAttribute("src", images[1].src);
      await page.clock.runFor(7000);
      await expect(home.carousel.image).toHaveAttribute("src", images[2].src);
    });

    test("HOME-17 changing reduced motion stops and resumes rotation", async ({
      home,
      page,
    }) => {
      await home.goto();
      await page.clock.runFor(7000);
      await expect(home.carousel.image).toHaveAttribute("src", images[1].src);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await expect
        .poll(() =>
          page.evaluate(() =>
            Reflect.get(window, "__reducedMotionChangeCount"),
          ),
        )
        .toBe(1);
      await page.clock.runFor(21000);
      await expect(home.carousel.image).toHaveAttribute("src", images[1].src);
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await expect
        .poll(() =>
          page.evaluate(() =>
            Reflect.get(window, "__reducedMotionChangeCount"),
          ),
        )
        .toBe(2);
      await page.clock.runFor(7000);
      await expect(home.carousel.image).toHaveAttribute("src", images[2].src);
    });

    test("HOME-22 rotation and navigation have no uncaught errors", async ({
      home,
      page,
    }) => {
      await home.goto();
      await page.clock.runFor(14000);
      await expect(home.carousel.status).toHaveText(`3 / ${images.length}`);
      await home.header.contactsLink.click();
      await home.header.homeLink.click();
      await expect(home.heading).toBeVisible();
      // The automatic runtimeErrors fixture asserts on every page and popup.
    });
  });

  test("HOME-16 reduced motion at load disables rotation", async ({
    home,
    page,
  }) => {
    await page.clock.install();
    await home.goto();
    await page.clock.runFor(21000);
    await expect(home.carousel.image).toHaveAttribute("src", images[0].src);
    await expect(home.carousel.status).toHaveText(`1 / ${images.length}`);
  });

  test("HOME-18 layout adapts to the project viewport", async ({
    home,
    page,
  }) => {
    await home.goto();
    const image = (await home.carousel.image.boundingBox())!;
    const portrait = (await home.portrait.boundingBox())!;
    const statement = (await home.statement.boundingBox())!;
    if (page.viewportSize()!.width > 640) {
      expect(Math.abs(image.y - portrait.y)).toBeLessThan(1);
      expect(portrait.x).toBeGreaterThanOrEqual(image.x + image.width);
    } else {
      expect(portrait.y).toBeGreaterThanOrEqual(image.y + image.height);
    }
    expect(statement.y).toBeGreaterThanOrEqual(portrait.y + portrait.height);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });

  test("HOME-19 narrow widths have no horizontal overflow or overlap", async ({
    home,
    page,
  }) => {
    await home.goto();
    for (const width of [320, 390, 640]) {
      await page.setViewportSize({ width, height: 844 });
      const image = (await home.carousel.image.boundingBox())!;
      const portrait = (await home.portrait.boundingBox())!;
      expect(portrait.y).toBeGreaterThanOrEqual(image.y + image.height);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await expect(home.statement).toBeVisible();
    }
  });

  test.describe("without JavaScript", () => {
    test.use({ javaScriptEnabled: false });
    test("HOME-21 static Home content remains usable", async ({ home }) => {
      await home.goto();
      await expect(home.heading).toBeVisible();
      await expect(home.paragraphs).toHaveText(artistStatement);
      await expect(home.portrait).toBeVisible();
      await expect(home.carousel.image).toHaveAttribute("src", images[0].src);
    });
  });
});
