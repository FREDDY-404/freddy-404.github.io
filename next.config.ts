import type { NextConfig } from "next";

// GitHub Pages serves this repo under /portfolio; local dev stays at /
const basePath = process.env.GITHUB_PAGES === "true" ? "/portfolio" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
