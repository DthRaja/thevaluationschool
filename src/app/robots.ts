import type { MetadataRoute } from "next";

import { getOrigin } from "./lib/getOrigin";

export default  function robots(): MetadataRoute.Robots {
  
  const origin =  getOrigin()

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/secure/",
    },
    sitemap: `${origin}sitemap.xml`,
  };
}
