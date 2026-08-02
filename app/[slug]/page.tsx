import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleShell } from "@/components/ArticleShell";
import { recoveredArticles, type RecoveredArticleSlug } from "@/data/recovered-articles";

type PageProps = { params: Promise<{ slug: string }> };

function isRecoveredSlug(slug: string): slug is RecoveredArticleSlug {
  return slug in recoveredArticles;
}

export function generateStaticParams() {
  return Object.keys(recoveredArticles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isRecoveredSlug(slug)) return {};
  const article = recoveredArticles[slug];
  return { title: article.title, description: article.description };
}

export default async function RecoveredArticlePage({ params }: PageProps) {
  const { slug } = await params;
  if (!isRecoveredSlug(slug)) notFound();
  return <ArticleShell article={recoveredArticles[slug]} />;
}
