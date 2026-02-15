// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "via.placeholder.com",                  // تصاویر placeholder
      "6991a44b6279728b0154fb36.mockapi.io", // تصاویر Biography و Showreel
      "6991a5b96279728b0154fe77.mockapi.io", // تصاویر Projects
      "6991a6e96279728b01550164.mockapi.io", // تصاویر Music Tracks و Demo Videos
      "images.unsplash.com"                   // تصاویر واقعی مثل عکس پروفایل Person
    ],
  },
};

export default nextConfig;
