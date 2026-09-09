import portfolioManifest from "../../../docs/deployment/manifest.json" with { type: "json" };

export interface PortfolioImageFixture {
  id: string;
  src: string;
  alt: string;
  name: string;
  medium: string;
  size: string;
  year: string;
  availability: string;
  width: number;
  height: number;
}

export interface PortfolioSectionFixture {
  id: string;
  label: string;
  images: PortfolioImageFixture[];
}

const baseUrl = portfolioManifest.baseUrl.replace(/\/$/, "");
const sortableYear = (year: string) =>
  /^\d{4}$/.test(year) ? Number(year) : -Infinity;

export const portfolioSections: PortfolioSectionFixture[] =
  portfolioManifest.sections.map((section) => ({
    id: section.id,
    label: section.label,
    images: section.items
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => item.published)
      .sort(
        (left, right) =>
          sortableYear(right.item.year) - sortableYear(left.item.year) ||
          left.index - right.index,
      )
      .map(({ item }) => ({
        id: item.id,
        src: `${baseUrl}/${item.file}`,
        alt: item.alt,
        name: item.name,
        medium: item.medium,
        size: item.size,
        year: item.year,
        availability: item.availability,
        width: item.width,
        height: item.height,
      })),
  }));

export const populatedSections = portfolioSections.filter(
  (section) => section.images.length > 0,
);
export const emptySection = portfolioSections.find(
  (section) => section.images.length === 0,
)!;
export const initialSection = populatedSections[0];
export const alternateSection = populatedSections[1];

export const representatives = (section: PortfolioSectionFixture) => ({
  first: section.images[0],
  middle: section.images[Math.floor(section.images.length / 2)],
  last: section.images.at(-1)!,
});

export const expectedMetadata = (image: PortfolioImageFixture) => ({
  name: image.name,
  medium: image.medium,
  size: image.size,
  year: image.year,
  availability:
    image.availability === "available" ? "Available" : image.availability,
});
