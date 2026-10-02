import type { MetadataRoute } from "next";
import { projectOrder } from "@/data/portfolio-projects";

// Static export needs this to emit out/sitemap.xml at build time.
export const dynamic = "force-static";

const site = "https://benjaminnnnnn.github.io/portfolio";

// Generated from projectOrder so new projects can't be left out.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site}/`, priority: 1 },
    ...projectOrder.map((slug) => ({ url: `${site}/${slug}/` })),
  ];
}
