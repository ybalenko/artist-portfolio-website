import portfolioManifest from "../../docs/deployment/manifest.json";

export interface PortfolioImage {
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

type PortfolioSectionId = "landscapes" | "stilllife" | "other";

export interface PortfolioSection {
  id: PortfolioSectionId;
  label: string;
  images: PortfolioImage[];
}

interface PortfolioManifest {
  schemaVersion: 1;
  updatedAt: string;
  baseUrl: string;
  sections: PortfolioManifestSection[];
}

interface PortfolioManifestSection {
  id: PortfolioSectionId;
  label: string;
  items: PortfolioManifestItem[];
}

interface PortfolioManifestItem {
  id: string;
  file: string;
  alt: string;
  name: string;
  medium: string;
  size: string;
  year: string;
  availability: string;
  width: number;
  height: number;
  published: boolean;
}

const allowedSectionIds = new Set<PortfolioSectionId>([
  "landscapes",
  "stilllife",
  "other",
]);

const isPortfolioSectionId = (value: string): value is PortfolioSectionId =>
  allowedSectionIds.has(value as PortfolioSectionId);

export const formatAvailabilityStatus = (
  availability: PortfolioImage["availability"],
) => {
  if (availability === "available") return "Available";

  return availability;
};

const validateManifest = (manifest: PortfolioManifest) => {
  const errors: string[] = [];
  const sectionIds = new Set<string>();
  const imageIds = new Set<string>();

  if (manifest.schemaVersion !== 1) {
    errors.push("schemaVersion must be 1.");
  }

  if (!manifest.updatedAt) {
    errors.push("updatedAt is required.");
  }

  if (!manifest.baseUrl || !manifest.baseUrl.startsWith("https://")) {
    errors.push("baseUrl must be an HTTPS URL.");
  }

  if (!Array.isArray(manifest.sections)) {
    errors.push("sections must be an array.");
  }

  for (const section of manifest.sections ?? []) {
    const sectionContext = `section ${section.id || "<missing>"}`;

    if (!section.id || !isPortfolioSectionId(section.id)) {
      errors.push(
        `${sectionContext}: id must be landscapes, stilllife, or other.`,
      );
    }

    if (sectionIds.has(section.id)) {
      errors.push(`${sectionContext}: duplicate section id.`);
    }

    sectionIds.add(section.id);

    if (!section.label) {
      errors.push(`${sectionContext}: label is required.`);
    }

    if (!Array.isArray(section.items)) {
      errors.push(`${sectionContext}: items must be an array.`);
    }

    for (const item of section.items ?? []) {
      const itemContext = `${sectionContext} item ${item.id || "<missing>"}`;

      for (const field of [
        "id",
        "file",
        "alt",
        "name",
        "medium",
        "size",
        "year",
        "availability",
      ] as const) {
        if (typeof item[field] !== "string" || item[field].trim() === "") {
          errors.push(`${itemContext}: ${field} is required.`);
        }
      }

      if (imageIds.has(item.id)) {
        errors.push(`${itemContext}: duplicate artwork id.`);
      }

      imageIds.add(item.id);

      if (item.file.startsWith("/") || item.file.startsWith("http")) {
        errors.push(`${itemContext}: file must be a relative path.`);
      }

      if (item.year !== "TBD" && !/^\d{4}$/.test(item.year)) {
        errors.push(`${itemContext}: year must be TBD or YYYY.`);
      }

      if (!Number.isFinite(item.width) || item.width <= 0) {
        errors.push(`${itemContext}: width must be a positive number.`);
      }

      if (!Number.isFinite(item.height) || item.height <= 0) {
        errors.push(`${itemContext}: height must be a positive number.`);
      }

      if (typeof item.published !== "boolean") {
        errors.push(`${itemContext}: published must be boolean.`);
      }
    }
  }

  if (errors.length > 0) {
    throw new Error(`Invalid Portfolio manifest:\n- ${errors.join("\n- ")}`);
  }
};

const normalizeBaseUrl = (baseUrl: string) => baseUrl.replace(/\/$/, "");

const getImageUrl = (baseUrl: string, file: string) =>
  `${normalizeBaseUrl(baseUrl)}/${file}`;

const getSortableYear = (year: string) => {
  if (/^\d{4}$/.test(year)) return Number(year);

  return Number.NEGATIVE_INFINITY;
};

const manifest = portfolioManifest as PortfolioManifest;

validateManifest(manifest);

export const portfolioSections: PortfolioSection[] = manifest.sections.map(
  (section) => ({
    id: section.id,
    label: section.label,
    images: section.items
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => item.published)
      .sort((left, right) => {
        const yearDifference =
          getSortableYear(right.item.year) - getSortableYear(left.item.year);

        if (yearDifference !== 0) return yearDifference;

        return left.index - right.index;
      })
      .map(({ item }) => ({
        id: item.id,
        src: getImageUrl(manifest.baseUrl, item.file),
        alt: item.alt,
        name: item.name,
        medium: item.medium,
        size: item.size,
        year: item.year,
        availability: item.availability,
        width: item.width,
        height: item.height,
      })),
  }),
);

export const portfolioImages = portfolioSections.flatMap(
  (section) => section.images,
);
