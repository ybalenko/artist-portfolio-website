export interface HomeCarouselImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  published: boolean;
  displayOrder: number;
}

const homeCarouselBaseUrl =
  "https://yulia-balenko-portfolio-images.s3.us-east-1.amazonaws.com/portfolio/home-carousel";

export const homeArtistPortrait = {
  id: "yulia-balenko-portrait",
  src: `${homeCarouselBaseUrl}/Yulia_Balenko.jpg`,
  alt: "Portrait of artist Yulia Balenko",
  width: 960,
  height: 961,
};

export const homeCarouselImages: HomeCarouselImage[] = [
  {
    id: "home-carousel-01",
    src: `${homeCarouselBaseUrl}/home-carousel-01.jpg`,
    alt: "Curated Home carousel image 1 by Yulia Balenko",
    width: 960,
    height: 960,
    published: true,
    displayOrder: 1,
  },
  {
    id: "home-carousel-02",
    src: `${homeCarouselBaseUrl}/home-carousel-02.jpg`,
    alt: "Curated Home carousel image 2 by Yulia Balenko",
    width: 960,
    height: 960,
    published: true,
    displayOrder: 2,
  },
  {
    id: "home-carousel-03",
    src: `${homeCarouselBaseUrl}/home-carousel-03.jpg`,
    alt: "Curated Home carousel image 3 by Yulia Balenko",
    width: 960,
    height: 960,
    published: true,
    displayOrder: 3,
  },
  {
    id: "home-carousel-04",
    src: `${homeCarouselBaseUrl}/home-carousel-04.jpg`,
    alt: "Curated Home carousel image 4 by Yulia Balenko",
    width: 960,
    height: 960,
    published: true,
    displayOrder: 4,
  },
  {
    id: "home-carousel-05",
    src: `${homeCarouselBaseUrl}/home-carousel-05.jpg`,
    alt: "Curated Home carousel image 5 by Yulia Balenko",
    width: 960,
    height: 960,
    published: true,
    displayOrder: 5,
  },
  {
    id: "home-carousel-06",
    src: `${homeCarouselBaseUrl}/home-carousel-06.jpg`,
    alt: "Curated Home carousel image 6 by Yulia Balenko",
    width: 960,
    height: 960,
    published: true,
    displayOrder: 6,
  },
  {
    id: "home-carousel-07",
    src: `${homeCarouselBaseUrl}/home-carousel-07.jpg`,
    alt: "Curated Home carousel image 7 by Yulia Balenko",
    width: 960,
    height: 960,
    published: true,
    displayOrder: 7,
  },
];

export const publishedHomeCarouselImages = homeCarouselImages
  .filter((image) => image.published)
  .sort((firstImage, secondImage) => {
    return firstImage.displayOrder - secondImage.displayOrder;
  });

for (const image of publishedHomeCarouselImages) {
  if (!image.src.startsWith("https://")) {
    throw new Error(
      `Published Home carousel image "${image.id}" must use a public HTTPS S3 URL.`,
    );
  }
}
