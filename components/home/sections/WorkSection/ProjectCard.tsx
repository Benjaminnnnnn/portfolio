import { ProjectArtwork } from "@/components/ProjectArtwork";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Project } from "./projects";
import { projectArt } from "@/data/project-art";
import { projectMeta } from "@/data/project-meta";
import type { PortfolioProjectSlug } from "@/data/portfolio-projects";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const slug = project.slug as PortfolioProjectSlug;
  const art = projectArt[slug];
  const meta = projectMeta[slug];
  return (
    <article className="project-card project-card-gallery" data-project-card style={{ "--card-accent": art.accent, "--card-paper": art.paper, "--card-ink": art.ink } as CSSProperties}>
      <Link className="project-media specimen-host" href={project.href} aria-label={`Read ${project.title} case study`}>
        <ProjectArtwork slug={project.slug} alt={project.alt} />
        <span className="project-type-tag">{meta.kind}</span>
      </Link>
      <div className="project-description">
        <h3><Link href={project.href}>{project.title}</Link></h3>
        <span className="project-number"><span className="project-year">{meta.years}</span> {String(index + 1).padStart(2, "0")} <span aria-hidden="true">↗</span></span>
      </div>
    </article>
  );
}
