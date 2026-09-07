import type { Page } from "@playwright/test";

export class SiteFooter {
  constructor(private readonly page: Page) {}

  get root() {
    return this.page.getByRole("contentinfo");
  }
  get facebookLink() {
    return this.root.getByRole("link", {
      name: "Yulia Balenko Art Facebook page",
    });
  }
}
