import type { NextConfig, SizeLimit } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: (process.env.NEXT_BODY_SIZE_LIMIT ||
        "2mb") as SizeLimit,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `*.${process.env.NEXT_IMAGES_HOSTNAME}`,
      },
    ],
  },
};

export default nextConfig;
