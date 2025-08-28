import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://tailwindcss.com/**')],
  },
};

export default nextConfig;
