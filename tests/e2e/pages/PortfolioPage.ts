import type { Page } from "@playwright/test";
import { PortfolioCarousel } from "../components/PortfolioCarousel";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export class PortfolioPage {
  readonly header: SiteHeader;
  readonly footer: SiteFooter;
  readonly carousel: PortfolioCarousel;

  constructor(readonly page: Page) {
    this.header = new SiteHeader(page);
    this.footer = new SiteFooter(page);
    this.carousel = new PortfolioCarousel(page);
  }

  get main() {
    return this.page.getByRole("main");
  }
  get heading() {
    return this.main.getByRole("heading", {
      level: 1,
      name: "Selected works",
      exact: true,
    });
  }
  get eyebrow() {
    return this.main.getByText("Portfolio", { exact: true });
  }
  get sectionNavigation() {
    return this.main.getByRole("navigation", { name: "Portfolio sections" });
  }
  get sectionButtons() {
    return this.sectionNavigation.getByRole("button");
  }
  get content() {
    return this.main.locator("[data-portfolio-content]");
  }
  get visibleSection() {
    return this.content.locator("[data-portfolio-section]:not([hidden])");
  }
  get featureButton() {
    return this.visibleSection.locator("[data-open-carousel]");
  }
  get selectedImage() {
    return this.visibleSection.locator("[data-selected-image]");
  }
  get selectedMetadata() {
    return this.visibleSection.locator("[data-selected-metadata]");
  }
  get thumbnails() {
    return this.visibleSection.locator("[data-thumbnail]");
  }
  get thumbnailRegion() {
    return this.visibleSection.locator(".portfolio-thumbnails");
  }
  get emptyState() {
    return this.visibleSection.locator(".portfolio-empty-state");
  }

  sectionButton(label: string) {
    return this.sectionNavigation.getByRole("button", {
      name: label,
      exact: true,
    });
  }

  section(id: string) {
    return this.content.locator(`[data-portfolio-section="${id}"]`);
  }

  thumbnail(index: number) {
    return this.thumbnails.nth(index);
  }

  metadataValue(field: "name" | "medium" | "size" | "year" | "availability") {
    return this.selectedMetadata.locator(`[data-metadata-${field}]`);
  }

  async goto(hash = "") {
    return this.page.goto(`/portfolio/${hash}`);
  }

  async selectSection(label: string) {
    await this.sectionButton(label).click();
  }

  async selectThumbnail(index: number) {
    await this.thumbnail(index).click();
  }

  async openFeatureCarousel() {
    await this.featureButton.click();
  }

  async openThumbnailCarousel(index: number) {
    await this.thumbnail(index).dblclick();
  }
}
