import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
        port: "",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
