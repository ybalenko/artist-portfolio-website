import type { Page } from "@playwright/test";

export class SiteHeader {
  constructor(private readonly page: Page) {}

  get root() {
    return this.page.getByRole("banner", { includeHidden: true });
  }
  get navigation() {
    return this.root.getByRole("navigation", { name: "Primary navigation" });
  }
  get links() {
    return this.navigation.getByRole("link");
  }
  get currentLinks() {
    return this.navigation.locator('[aria-current="page"]');
  }
  get activeLinks() {
    return this.navigation.locator("a.active");
  }
  get homeLink() {
    return this.navigation.getByRole("link", { name: "Home", exact: true });
  }
  get portfolioLink() {
    return this.navigation.getByRole("link", {
      name: "Portfolio",
      exact: true,
    });
  }
  get resumeLink() {
    return this.navigation.getByRole("link", { name: "Resume", exact: true });
  }
  get contactsLink() {
    return this.navigation.getByRole("link", { name: "Contacts", exact: true });
  }
  get wordmark() {
    return this.root.getByRole("link", {
      name: "Yulia Balenko, Home",
      exact: true,
    });
  }

  async openResume() {
    const popup = this.page.waitForEvent("popup");
    await this.resumeLink.click();
    return popup;
  }
}
