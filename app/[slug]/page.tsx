import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleShell } from "@/components/ArticleShell";
import {
  isPortfolioProjectSlug,
  portfolioProjects,
  projectOrder,
} from "@/data/portfolio-projects";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projectOrder.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isPortfolioProjectSlug(slug)) return {};
  const project = portfolioProjects[slug];
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  if (!isPortfolioProjectSlug(slug)) notFound();
  return <ArticleShell project={portfolioProjects[slug]} />;
}
