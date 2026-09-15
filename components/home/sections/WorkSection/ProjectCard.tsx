import { ProjectArtwork } from "@/components/ProjectArtwork";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Project } from "./projects";
import { projectArt } from "@/data/project-art";
import type { PortfolioProjectSlug } from "@/data/portfolio-projects";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const art = projectArt[project.slug as PortfolioProjectSlug];
  return (
    <article className="project-card project-card-gallery" data-project-card style={{ "--card-accent": art.accent, "--card-paper": art.paper, "--card-ink": art.ink } as CSSProperties}>
      <Link className="project-media" href={project.href} aria-label={`Read ${project.title} case study`}>
        <ProjectArtwork slug={project.slug} src={project.image} alt={project.alt} />
        <span className="project-type-tag">{project.detail}</span>
      </Link>
      <div className="project-description">
        <h3><Link href={project.href}>{project.title}</Link></h3>
        <span className="project-number">{String(index + 1).padStart(2, "0")} <span aria-hidden="true">↗</span></span>
      </div>
    </article>
  );
}
