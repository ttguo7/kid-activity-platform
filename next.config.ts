import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.bellevuedowntown.com',
      },
      {
        protocol: 'https',
        hostname: 'www.bellevueartsfair.com',
      },
      {
        protocol: 'https',
        hostname: 'bellevuedowntown.com',
      },
      {
        protocol: 'https',
        hostname: 'bellevueartsfair.com',
      },
      {
        protocol: 'https',
        hostname: '**.bellevuedowntown.com',
      },
      {
        protocol: 'https',
        hostname: '**.bellevueartsfair.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
