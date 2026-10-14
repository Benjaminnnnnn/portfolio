import { execSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { infoPageOrder } from "@/data/info-pages";
import { projectOrder } from "@/data/portfolio-projects";
import { siteUrl } from "@/lib/site";

// Static export needs this to emit out/sitemap.xml at build time.
export const dynamic = "force-static";

// Page content lives in data/, so the deploying commit's date is when any page
// last changed. Falls back to build time outside a git checkout.
function lastModified() {
  try {
    return new Date(execSync("git log -1 --format=%cI", { encoding: "utf8" }).trim());
  } catch {
    return new Date();
  }
}

// Generated from projectOrder so new projects can't be left out.
export default function sitemap(): MetadataRoute.Sitemap {
  const modified = lastModified();
  return [
    { url: `${siteUrl}/`, lastModified: modified, priority: 1 },
    ...projectOrder.map((slug) => ({ url: `${siteUrl}/${slug}/`, lastModified: modified })),
    ...infoPageOrder.map((slug) => ({ url: `${siteUrl}/${slug}/`, lastModified: modified, priority: 0.5 })),
  ];
}
