import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tasfin-shop.s3.eu-north-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "pub-e4bff183853a4153b77097918c463364.r2.dev",
      },
    ],
  },
};

export default nextConfig;
