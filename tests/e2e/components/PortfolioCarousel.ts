import type { Page } from "@playwright/test";

export class PortfolioCarousel {
  constructor(private readonly page: Page) {}

  get root() {
    return this.page.locator("[data-carousel]");
  }
  get image() {
    return this.root.getByRole("img");
  }
  get metadata() {
    return this.root.locator("[data-carousel-metadata]");
  }
  get closeButton() {
    return this.root.getByRole("button", { name: "Close carousel" });
  }
  get previousButton() {
    return this.root.getByRole("button", { name: "Previous artwork" });
  }
  get nextButton() {
    return this.root.getByRole("button", { name: "Next artwork" });
  }

  metadataValue(field: "name" | "medium" | "size" | "year" | "availability") {
    return this.metadata.locator(`[data-metadata-${field}]`);
  }

  async previous() {
    await this.previousButton.click();
  }

  async next() {
    await this.nextButton.click();
  }

  async close() {
    await this.closeButton.click();
  }
}
