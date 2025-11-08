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
        hostname: "twelvebd.com",
      },
      {
        protocol: "https",
        hostname: "www.aarong.com",
      },
    ],
  },
};
export default nextConfig;
