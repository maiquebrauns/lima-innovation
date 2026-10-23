import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "localhost:3001",
    "127.0.0.1:3001",
    "192.168.0.94:3001",
    "192.168.0.94",
  ],
  devIndicators: false,
};

export default nextConfig;
