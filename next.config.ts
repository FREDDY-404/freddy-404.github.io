import type { NextConfig } from "next";

// Served from the root of https://freddy-404.github.io, so no base path is needed.
// If the repo is ever renamed (e.g. to "portfolio"), set basePath to "/portfolio".
const basePath = "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
