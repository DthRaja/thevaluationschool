import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Valuation School | CFA Level 1 Coaching, Valuation & Financial Modelling (AVFM)",
    short_name: "The Valuation School",
    description:
      "Stop memorizing. Start understanding. Master CFA Level 1, valuation & financial modelling (AVFM), equity research and career mentoring with The Valuation School. 20,000+ learners",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "img/favicon/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "img/favicon/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
