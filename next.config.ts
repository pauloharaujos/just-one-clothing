import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://tailwindcss.com/**'),
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      }
    ],
  },
};

export default nextConfig;
