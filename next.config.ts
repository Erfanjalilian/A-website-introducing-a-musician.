import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "via.placeholder.com",          // برای تصاویر placeholder
      "6991a44b6279728b0154fb36.mockapi.io", // دامنه API برای تصاویر Biography و Showreel
      "6991a5b96279728b0154fe77.mockapi.io", // دامنه API برای Projects
      "6991a6e96279728b01550164.mockapi.io"  // دامنه API برای Music Tracks و Demo Videos
    ],
  },
};

export default nextConfig;
