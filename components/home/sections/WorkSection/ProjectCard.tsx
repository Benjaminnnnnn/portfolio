import { ProjectArtwork } from "@/components/ProjectArtwork";
import Link from "next/link";
import type { CSSProperties, PointerEvent } from "react";
import type { Project } from "./projects";
import { projectArt } from "@/data/project-art";
import { projectMarketing } from "@/data/project-marketing";
import type { PortfolioProjectSlug } from "@/data/portfolio-projects";

type ProjectCardProps = {
  project: Project;
  index: number;
  onActivate: (slug: string) => void;
};

// Cursor spotlight + gentle tilt, written straight to CSS variables.
function track(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== "mouse") return;
  const el = event.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (event.clientX - r.left) / r.width, y = (event.clientY - r.top) / r.height;
  el.style.setProperty("--mx", `${x * 100}%`);
  el.style.setProperty("--my", `${y * 100}%`);
  el.style.setProperty("--ry", `${(x - 0.5) * 7}deg`);
  el.style.setProperty("--rx", `${(0.5 - y) * 6}deg`);
}

function reset(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty("--ry", "0deg");
  event.currentTarget.style.setProperty("--rx", "0deg");
}

export function ProjectCard({ project, index, onActivate }: ProjectCardProps) {
  const slug = project.slug as PortfolioProjectSlug;
  const art = projectArt[slug];
  const [a, b, c] = projectMarketing[slug].glow;
  return (
    <article
      className="project-card project-card-gallery"
      data-project-card
      data-slug={project.slug}
      onPointerEnter={() => onActivate(project.slug)}
      onFocus={() => onActivate(project.slug)}
      style={{ "--card-accent": art.accent, "--card-paper": art.paper, "--card-ink": art.ink, "--glow-a": a, "--glow-b": b, "--glow-c": c } as CSSProperties}
    >
      <Link className="project-media" href={project.href} aria-label={`Read ${project.title} case study`} onPointerMove={track} onPointerLeave={reset}>
        <span className="project-media-tilt">
          <ProjectArtwork slug={project.slug} alt={project.alt} priority={index < 2} />
          <span className="card-spotlight" aria-hidden="true" />
        </span>
        <span className="card-glow" aria-hidden="true" />
        <span className="project-type-tag">{project.detail}</span>
      </Link>
      <div className="project-description">
        <h3><Link href={project.href}>{project.title}</Link></h3>
        <span className="project-number">{String(index + 1).padStart(2, "0")} <span aria-hidden="true">↗</span></span>
        <p className="project-tagline">{project.headline}</p>
      </div>
    </article>
  );
}
