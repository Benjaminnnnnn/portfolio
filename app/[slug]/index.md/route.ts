import { infoPageOrder, infoPages } from "@/data/info-pages";
import { isPortfolioProjectSlug, projectOrder } from "@/data/portfolio-projects";
import { infoMarkdown, projectMarkdown } from "@/lib/agent-markdown";

// Markdown copy of each project and info page, exported as out/<slug>/index.md.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return [...projectOrder, ...infoPageOrder].map((slug) => ({ slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const body = isPortfolioProjectSlug(slug)
    ? projectMarkdown(slug)
    : infoMarkdown(infoPages[slug as (typeof infoPageOrder)[number]]);
  return new Response(body, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
