import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./sanity/lib/image-loader.ts",
  },
};

export default nextConfig;
