import type { Page } from "@playwright/test";
import { HomeCarousel } from "../components/HomeCarousel";
import { SiteLayout } from "../components/SiteLayout";

export class HomePage {
  readonly layout: SiteLayout;
  readonly carousel: HomeCarousel;

  constructor(readonly page: Page) {
    this.layout = new SiteLayout(page);
    this.carousel = new HomeCarousel(page);
  }

  get main() {
    return this.layout.main;
  }
  get header() {
    return this.layout.header;
  }
  get footer() {
    return this.layout.footer;
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
  async goto() {
    return this.page.goto("/");
  }
}
