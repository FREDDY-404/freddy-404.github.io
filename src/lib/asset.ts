// Prefix files from /public with the deploy base path (e.g. /portfolio on GitHub Pages).
export const asset = (path: string) =>
  path.startsWith("/") ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}` : path;
