// Set at build time (see next.config.ts). GitHub Pages serves this repo under
// /portfolio, and Next only prefixes its own routes and _next assets — plain
// public-file URLs handed to next/image (unoptimized), three.js loaders, or
// Audio have to be prefixed by hand.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string) {
  return path.startsWith("/") ? `${basePath}${path}` : path;
}
