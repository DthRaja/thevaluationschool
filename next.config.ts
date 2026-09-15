import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    optimizeCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tvs.thebestlectures.in",
        pathname: "/tvs/Uploads/**",
      },
    ],
  },
};

export default nextConfig;
