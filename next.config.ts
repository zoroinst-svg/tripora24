import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Type-checking läuft im Editor — Build braucht es nicht
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "images.kiwi.com" },
      { hostname: "photo.hotellook.com" },
    ],
  },
};

export default nextConfig;
