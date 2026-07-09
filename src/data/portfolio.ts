export interface PortfolioImage {
  id: string;
  src: string;
  alt: string;
  name: string;
  medium: string;
  size: string;
  year: string;
  width: number;
  height: number;
}

export interface PortfolioSection {
  id: "landscapes" | "stilllife";
  label: string;
  images: PortfolioImage[];
}

const getYearFromArtworkId = (id: string) => id.split("-")[2] ?? "TBD";

const getSequenceFromArtworkId = (id: string) => id.split("-")[3] ?? "";

const formatStillLifeName = (id: string) => {
  const year = getYearFromArtworkId(id);
  const sequence = getSequenceFromArtworkId(id);
  return sequence ? `Still life ${year}-${sequence}` : `Still life ${year}`;
};

const stillLifeImage = ({
  id,
  width,
  height,
}: {
  id: string;
  width: number;
  height: number;
}): PortfolioImage => ({
  id,
  src: `https://yulia-balenko-portfolio-images.s3.us-east-1.amazonaws.com/portfolio/stilllifes/${id}.jpg`,
  alt: `Still life artwork by Yulia Balenko from ${getYearFromArtworkId(id)}`,
  name: formatStillLifeName(id),
  medium: "TBD",
  size: "TBD",
  year: getYearFromArtworkId(id),
  width,
  height,
});

export const portfolioSections: PortfolioSection[] = [
  {
    id: "landscapes",
    label: "Landscapes",
    images: [
      {
        id: "landscape-test-01",
        src: "/artwork-local/test-01.svg",
        alt: "Temporary abstract landscape artwork with magenta and ochre shapes",
        name: "Temporary landscape 01",
        medium: "TBD",
        size: "TBD",
        year: "TBD",
        width: 1200,
        height: 900,
      },
      {
        id: "landscape-test-02",
        src: "/artwork-local/test-02.svg",
        alt: "Temporary abstract landscape artwork with blue and rose blocks",
        name: "Temporary landscape 02",
        medium: "TBD",
        size: "TBD",
        year: "TBD",
        width: 1200,
        height: 900,
      },
      {
        id: "landscape-test-03",
        src: "/artwork-local/test-03.svg",
        alt: "Temporary abstract landscape artwork with dark linework and warm fields",
        name: "Temporary landscape 03",
        medium: "TBD",
        size: "TBD",
        year: "TBD",
        width: 1200,
        height: 900,
      },
    ],
  },
  {
    id: "stilllife",
    label: "Still life",
    images: [
      stillLifeImage({
        id: "yulia-art-2025-01",
        width: 1600,
        height: 1600,
      }),
      stillLifeImage({
        id: "yulia-art-2025-02",
        width: 1600,
        height: 1248,
      }),
      stillLifeImage({
        id: "yulia-art-2025-03",
        width: 1600,
        height: 1600,
      }),
      stillLifeImage({
        id: "yulia-art-2025-04",
        width: 1600,
        height: 1600,
      }),
      stillLifeImage({
        id: "yulia-art-2025-05",
        width: 1600,
        height: 1600,
      }),
      stillLifeImage({
        id: "yulia-art-2024-02",
        width: 1600,
        height: 1613,
      }),
      stillLifeImage({
        id: "yulia-art-2024-03",
        width: 1246,
        height: 1600,
      }),
      stillLifeImage({
        id: "yulia-art-2023-01",
        width: 1252,
        height: 1600,
      }),
      stillLifeImage({
        id: "yulia-art-2023-02",
        width: 1254,
        height: 1600,
      }),
      stillLifeImage({
        id: "yulia-art-2023-03",
        width: 1600,
        height: 1258,
      }),
      stillLifeImage({
        id: "yulia-art-2023-04",
        width: 1258,
        height: 1600,
      }),
      stillLifeImage({
        id: "yulia-art-2023-05",
        width: 1600,
        height: 1600,
      }),
      stillLifeImage({
        id: "yulia-art-2023-06",
        width: 1600,
        height: 1609,
      }),
      stillLifeImage({
        id: "yulia-art-2023-07",
        width: 1234,
        height: 1600,
      }),
      stillLifeImage({
        id: "yulia-art-2023-08",
        width: 1600,
        height: 1606,
      }),
      stillLifeImage({
        id: "yulia-art-2023-09",
        width: 1600,
        height: 1257,
      }),
      stillLifeImage({
        id: "yulia-art-2019-01",
        width: 1200,
        height: 960,
      }),
      stillLifeImage({
        id: "yulia-art-2019-02",
        width: 1200,
        height: 960,
      }),
    ],
  },
];

export const portfolioImages = portfolioSections.flatMap(
  (section) => section.images,
);
