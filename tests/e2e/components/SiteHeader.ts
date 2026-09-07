import type { Page } from "@playwright/test";

export class SiteHeader {
  constructor(private readonly page: Page) {}

  get navigation() {
    return this.page.getByRole("navigation", { name: "Primary navigation" });
  }
  get links() {
    return this.navigation.getByRole("link");
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
    return this.page.getByRole("link", {
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
