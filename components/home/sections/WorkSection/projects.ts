import { projects as portfolioProjects } from "@/data/portfolio-projects";

export type Project = {
  title: string;
  detail: string;
  image: string;
  alt: string;
  href: string;
  tag?: string;
  slug: string;
  summary: string;
  context: string;
  stack: readonly string[];
  sourceUrl: string;
  sourceStatus?: "pending";
  accent: string;
};

export const projects: readonly Project[] = portfolioProjects.map((project) => ({
  title: project.title,
  detail: project.category,
  image: project.cover,
  alt: project.coverAlt,
  href: `/${project.slug}`,
  slug: project.slug,
  summary: project.summary,
  context: project.context,
  stack: project.stack,
  sourceUrl: project.sourceUrl,
  sourceStatus: project.sourceStatus,
  accent: project.accent,
}));

export const featuredProjects = projects.slice(0, 3);
export const systemsStudies = projects.slice(3, 7);
export const archiveProjects = projects.slice(7);
