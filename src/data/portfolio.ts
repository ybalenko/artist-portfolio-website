export interface PortfolioImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const portfolioImages: PortfolioImage[] = [
  {
    id: "test-01",
    src: "/artwork-local/test-01.svg",
    alt: "Temporary abstract artwork with magenta and ochre shapes",
    width: 1200,
    height: 900,
  },
  {
    id: "test-02",
    src: "/artwork-local/test-02.svg",
    alt: "Temporary abstract artwork with blue and rose blocks",
    width: 1200,
    height: 900,
  },
  {
    id: "test-03",
    src: "/artwork-local/test-03.svg",
    alt: "Temporary abstract artwork with dark linework and warm fields",
    width: 1200,
    height: 900,
  },
  {
    id: "test-04",
    src: "/artwork-local/test-04.svg",
    alt: "Temporary abstract artwork with watercolor-like green and pink washes",
    width: 1200,
    height: 900,
  },
  {
    id: "test-05",
    src: "/artwork-local/test-05.svg",
    alt: "Temporary abstract artwork with cobalt, cream, and black gestures",
    width: 1200,
    height: 900,
  },
  {
    id: "test-06",
    src: "/artwork-local/test-06.svg",
    alt: "Temporary abstract artwork with layered red and blue forms",
    width: 1200,
    height: 900,
  },
];
