import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const origin = `${protocol}://${host}`;

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
