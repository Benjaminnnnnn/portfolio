import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleShell } from "@/components/ArticleShell";
import { JsonLd } from "@/components/JsonLd";
import {
  isPortfolioProjectSlug,
  portfolioProjects,
  projectOrder,
} from "@/data/portfolio-projects";
import { pageAlternates } from "@/lib/page-metadata";
import { projectJsonLd } from "@/lib/structured-data";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projectOrder.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isPortfolioProjectSlug(slug)) return {};
  const project = portfolioProjects[slug];
  return {
    title: project.title,
    description: project.summary,
    keywords: [project.title, project.category, ...project.stack, "Benjamin Zhuang"],
    alternates: pageAlternates(`/${slug}/`),
    openGraph: {
      type: "article",
      siteName: "Benjamin Zhuang",
      title: `${project.title} — Benjamin Zhuang`,
      description: project.summary,
      url: `/${slug}/`,
      images: [{ url: "/preview.png", width: 1200, height: 630 }],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  if (!isPortfolioProjectSlug(slug)) notFound();
  const project = portfolioProjects[slug];
  return (
    <>
      <JsonLd data={projectJsonLd(project)} />
      <ArticleShell project={project} />
    </>
  );
}
