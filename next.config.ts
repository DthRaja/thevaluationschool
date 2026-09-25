import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    optimizeCss: true,
    serverActions: {
      allowedOrigins: ["thevaluationschool.com", "www.thevaluationschool.com"],
    },
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
