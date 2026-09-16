import type { Metadata } from "next";

import { getOrigin } from "./getOrigin";

export const SITE_NAME = "The Valuation School";

// No dedicated 1200x630 OG asset exists yet; the main logo is the closest
// aspect ratio available until a proper social-share image is designed.
export const DEFAULT_OG_IMAGE = {
  url: "/img/main-logo.jpg",
  width: 500,
  height: 267,
  alt: SITE_NAME,
};

interface OgImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

interface BuildSocialMetadataOptions {
  title: string;
  description?: string;
  path: string;
  type?: "website" | "article";
  image?: OgImage;
}

export function buildSocialMetadata({
  title,
  description,
  path,
  type = "website",
  image = DEFAULT_OG_IMAGE,
}: BuildSocialMetadataOptions): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      title,
      description,
      url: getOrigin(path),
      siteName: SITE_NAME,
      locale: "en_US",
      type,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}
