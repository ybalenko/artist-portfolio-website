import type { Page } from "@playwright/test";

export class HomeCarousel {
  constructor(private readonly page: Page) {}

  get root() {
    return this.page.getByRole("complementary", {
      name: "Home carousel",
      exact: true,
    });
  }
  get image() {
    return this.root.getByRole("img");
  }
  // The live region has no accessible name; use its existing stable hook.
  get status() {
    return this.page.locator("[data-home-carousel-status]");
  }

  async hover() {
    await this.root.hover();
  }
  async leave() {
    await this.page.mouse.move(0, 0);
  }
}
