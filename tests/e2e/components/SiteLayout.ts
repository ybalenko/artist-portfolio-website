import type { Locator, Page } from "@playwright/test";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export class SiteLayout {
  readonly header: SiteHeader;
  readonly footer: SiteFooter;

  constructor(private readonly page: Page) {
    this.header = new SiteHeader(page);
    this.footer = new SiteFooter(page);
  }

  get main() {
    return this.page.getByRole("main");
  }

  get skipLink() {
    return this.page.getByRole("link", {
      name: "Skip to main content",
      includeHidden: true,
    });
  }

  async tabTo(target: Locator) {
    // Bound traversal by the document size; never force focus onto the target.
    const limit = await this.page
      .locator("a, button, input, select, textarea, [tabindex]")
      .count();
    for (let i = 0; i <= limit; i++) {
      await this.page.keyboard.press("Tab");
      if (
        await target.evaluate((element) => element === document.activeElement)
      )
        return;
    }
    throw new Error(
      "Keyboard traversal did not reach the requested layout control",
    );
  }
}
