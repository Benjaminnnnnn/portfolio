import type { Metadata } from "next";
import type { InfoPage } from "@/data/info-pages";

// Canonical URL plus a link to the page's Markdown copy for agents.
export function pageAlternates(path: string): Metadata["alternates"] {
  return { canonical: path, types: { "text/markdown": `${path}index.md` } };
}

export function infoMetadata(page: InfoPage): Metadata {
  const path = `/${page.slug}/`;
  return {
    title: page.title,
    description: page.description,
    alternates: pageAlternates(path),
    openGraph: {
      type: "website",
      siteName: "Benjamin Zhuang",
      title: `${page.title} — Benjamin Zhuang`,
      description: page.description,
      url: path,
      images: [{ url: "/preview.png", width: 1200, height: 630, alt: "Benjamin Zhuang portfolio" }],
    },
  };
}
