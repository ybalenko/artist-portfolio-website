export interface HomeCarouselImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  published: boolean;
  displayOrder: number;
}

export const homeCarouselImages: HomeCarouselImage[] = [
  {
    id: "temporary-home-image",
    src: "/home-artwork.svg",
    alt: "Temporary abstract artwork in magenta, cobalt blue, ochre, and black",
    width: 960,
    height: 960,
    published: true,
    displayOrder: 1,
  },
];

export const publishedHomeCarouselImages = homeCarouselImages
  .filter((image) => image.published)
  .sort((firstImage, secondImage) => {
    return firstImage.displayOrder - secondImage.displayOrder;
  });
