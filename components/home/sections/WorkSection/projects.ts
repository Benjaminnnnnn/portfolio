import { projects as portfolioProjects } from "@/data/portfolio-projects";

export type Project = {
  title: string;
  detail: string;
  image: string;
  alt: string;
  href: string;
  tag?: string;
};

export const projects: readonly Project[] = portfolioProjects.map((project) => ({
  title: project.title.toUpperCase(),
  detail: project.category.toUpperCase(),
  image: project.cover,
  alt: project.coverAlt,
  href: `/${project.slug}`,
  tag: "VIEW ↗",
}));
