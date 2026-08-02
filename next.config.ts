import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // This repo is checked out as a git worktree nested inside the parent clone,
  // which still carries the v1 Vite app (postcss.config.cjs + tailwind v3) on
  // main. Without pinning the root, Next walks up past the worktree, picks up
  // that PostCSS config, and runs tailwind v3 over app/original.css -- which is
  // already-compiled tailwind v4 output. Pinning stops the upward search here.
  turbopack: {
    root: import.meta.dirname,
  },
  // GitHub Pages serves static files only, so the site is pre-rendered to out/.
  output: "export",
  // Directory indexes keep project routes portable across GitHub Pages and
  // ordinary static file servers.
  trailingSlash: true,
  // next/image's default loader needs a server; static export requires opting out.
  images: {
    unoptimized: true,
  },
  experimental: {
    useTypeScriptCli: true,
  },
};

export default nextConfig;
