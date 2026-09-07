import type { Page } from "@playwright/test";
import { HomeCarousel } from "../components/HomeCarousel";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

export class HomePage {
  readonly header: SiteHeader;
  readonly footer: SiteFooter;
  readonly carousel: HomeCarousel;

  constructor(readonly page: Page) {
    this.header = new SiteHeader(page);
    this.footer = new SiteFooter(page);
    this.carousel = new HomeCarousel(page);
  }

  get main() {
    return this.page.getByRole("main");
  }
  get heading() {
    return this.main.getByRole("heading", {
      level: 1,
      name: "Artist Statement",
      exact: true,
    });
  }
  get eyebrow() {
    return this.main.getByText("Home", { exact: true });
  }
  get statement() {
    return this.main.locator(".artist-statement");
  }
  get paragraphs() {
    return this.statement.getByRole("paragraph");
  }
  get portrait() {
    return this.main
      .getByRole("complementary", { name: "Artist portrait" })
      .getByRole("img");
  }
  get skipLink() {
    return this.page.getByRole("link", { name: "Skip to main content" });
  }

  async goto() {
    return this.page.goto("/");
  }
}
