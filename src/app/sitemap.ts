import type { MetadataRoute } from "next";

import { getOrigin } from "./lib/getOrigin";

export default  function sitemap(): MetadataRoute.Sitemap {
  
  const origin = getOrigin()

  const urls = [
    "/",
    "/PrivacyPolicy",
    "/RefundPolicy",
    "/contact-us",
    "/avfm",
    "/erc",
    "/alumni",
    "/cfa",
    "/crw",
    "/linkedin-mentoring-program",
    "/Terms",
  ];

  const sitemap: MetadataRoute.Sitemap = urls.map((url) => ({
    url: `${origin}${url}`,
    lastModified: new Date("2026-01-08"),
    changeFrequency: "daily",
    priority: 0.9,
  }));

  return sitemap;
}
