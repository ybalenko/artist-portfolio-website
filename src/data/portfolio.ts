export interface PortfolioImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface PortfolioSection {
  id: "landscapes" | "stilllife";
  label: string;
  images: PortfolioImage[];
}

export const portfolioSections: PortfolioSection[] = [
  {
    id: "landscapes",
    label: "Landscapes",
    images: [
      {
        id: "landscape-test-01",
        src: "/artwork-local/test-01.svg",
        alt: "Temporary abstract landscape artwork with magenta and ochre shapes",
        width: 1200,
        height: 900,
      },
      {
        id: "landscape-test-02",
        src: "/artwork-local/test-02.svg",
        alt: "Temporary abstract landscape artwork with blue and rose blocks",
        width: 1200,
        height: 900,
      },
      {
        id: "landscape-test-03",
        src: "/artwork-local/test-03.svg",
        alt: "Temporary abstract landscape artwork with dark linework and warm fields",
        width: 1200,
        height: 900,
      },
    ],
  },
  {
    id: "stilllife",
    label: "Still life",
    images: [
      {
        id: "yulia-art-2019-01",
        src: "https://yulia-balenko-portfolio-images.s3.us-east-1.amazonaws.com/portfolio/stilllifes/yulia-art-2019-01.jpg",
        alt: "Still life artwork by Yulia Balenko from 2019",
        width: 1200,
        height: 960,
      },
      {
        id: "yulia-art-2019-02",
        src: "https://yulia-balenko-portfolio-images.s3.us-east-1.amazonaws.com/portfolio/stilllifes/yulia-art-2019-02.jpg",
        alt: "Still life artwork by Yulia Balenko from 2019",
        width: 1200,
        height: 960,
      },
      {
        id: "yulia-art-2023-01",
        src: "https://yulia-balenko-portfolio-images.s3.us-east-1.amazonaws.com/portfolio/stilllifes/yulia-art-2023-01.jpg",
        alt: "Still life artwork by Yulia Balenko from 2023",
        width: 1252,
        height: 1600,
      },
      {
        id: "yulia-art-2023-02",
        src: "https://yulia-balenko-portfolio-images.s3.us-east-1.amazonaws.com/portfolio/stilllifes/yulia-art-2023-02.jpg",
        alt: "Still life artwork by Yulia Balenko from 2023",
        width: 1254,
        height: 1600,
      },
      {
        id: "yulia-art-2023-03",
        src: "https://yulia-balenko-portfolio-images.s3.us-east-1.amazonaws.com/portfolio/stilllifes/yulia-art-2023-03.jpg",
        alt: "Still life artwork by Yulia Balenko from 2023",
        width: 1600,
        height: 1258,
      },
      {
        id: "yulia-art-2023-04",
        src: "https://yulia-balenko-portfolio-images.s3.us-east-1.amazonaws.com/portfolio/stilllifes/yulia-art-2023-04.jpg",
        alt: "Still life artwork by Yulia Balenko from 2023",
        width: 1258,
        height: 1600,
      },
      {
        id: "yulia-art-2023-05",
        src: "https://yulia-balenko-portfolio-images.s3.us-east-1.amazonaws.com/portfolio/stilllifes/yulia-art-2023-05.jpg",
        alt: "Still life artwork by Yulia Balenko from 2023",
        width: 1600,
        height: 1600,
      },
      {
        id: "yulia-art-2023-06",
        src: "https://yulia-balenko-portfolio-images.s3.us-east-1.amazonaws.com/portfolio/stilllifes/yulia-art-2023-06.jpg",
        alt: "Still life artwork by Yulia Balenko from 2023",
        width: 1600,
        height: 1609,
      },
      {
        id: "yulia-art-2023-07",
        src: "https://yulia-balenko-portfolio-images.s3.us-east-1.amazonaws.com/portfolio/stilllifes/yulia-art-2023-07.jpg",
        alt: "Still life artwork by Yulia Balenko from 2023",
        width: 1234,
        height: 1600,
      },
      {
        id: "yulia-art-2023-08",
        src: "https://yulia-balenko-portfolio-images.s3.us-east-1.amazonaws.com/portfolio/stilllifes/yulia-art-2023-08.jpg",
        alt: "Still life artwork by Yulia Balenko from 2023",
        width: 1600,
        height: 1606,
      },
      {
        id: "yulia-art-2023-09",
        src: "https://yulia-balenko-portfolio-images.s3.us-east-1.amazonaws.com/portfolio/stilllifes/yulia-art-2023-09.jpg",
        alt: "Still life artwork by Yulia Balenko from 2023",
        width: 1600,
        height: 1257,
      },
      {
        id: "yulia-art-2024-02",
        src: "https://yulia-balenko-portfolio-images.s3.us-east-1.amazonaws.com/portfolio/stilllifes/yulia-art-2024-02.jpg",
        alt: "Still life artwork by Yulia Balenko from 2024",
        width: 1600,
        height: 1613,
      },
      {
        id: "yulia-art-2024-03",
        src: "https://yulia-balenko-portfolio-images.s3.us-east-1.amazonaws.com/portfolio/stilllifes/yulia-art-2024-03.jpg",
        alt: "Still life artwork by Yulia Balenko from 2024",
        width: 1246,
        height: 1600,
      },
      {
        id: "yulia-art-2025-01",
        src: "https://yulia-balenko-portfolio-images.s3.us-east-1.amazonaws.com/portfolio/stilllifes/yulia-art-2025-01.jpg",
        alt: "Still life artwork by Yulia Balenko from 2025",
        width: 1600,
        height: 1600,
      },
      {
        id: "yulia-art-2025-02",
        src: "https://yulia-balenko-portfolio-images.s3.us-east-1.amazonaws.com/portfolio/stilllifes/yulia-art-2025-02.jpg",
        alt: "Still life artwork by Yulia Balenko from 2025",
        width: 1600,
        height: 1248,
      },
      {
        id: "yulia-art-2025-03",
        src: "https://yulia-balenko-portfolio-images.s3.us-east-1.amazonaws.com/portfolio/stilllifes/yulia-art-2025-03.jpg",
        alt: "Still life artwork by Yulia Balenko from 2025",
        width: 1600,
        height: 1600,
      },
      {
        id: "yulia-art-2025-04",
        src: "https://yulia-balenko-portfolio-images.s3.us-east-1.amazonaws.com/portfolio/stilllifes/yulia-art-2025-04.jpg",
        alt: "Still life artwork by Yulia Balenko from 2025",
        width: 1600,
        height: 1600,
      },
      {
        id: "yulia-art-2025-05",
        src: "https://yulia-balenko-portfolio-images.s3.us-east-1.amazonaws.com/portfolio/stilllifes/yulia-art-2025-05.jpg",
        alt: "Still life artwork by Yulia Balenko from 2025",
        width: 1600,
        height: 1600,
      },
    ],
  },
];

export const portfolioImages = portfolioSections.flatMap(
  (section) => section.images,
);
