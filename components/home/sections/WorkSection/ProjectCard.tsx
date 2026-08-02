import Image from "next/image";
import Link from "next/link";
import type { Project } from "./projects";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link className="project-card" data-project-card href={project.href}>
      <div className="project-media">
        <Image
          src={project.image}
          alt={project.alt}
          fill
          sizes="(max-width: 720px) 100vw, 33vw"
          priority={index < 3}
        />
      </div>
      <div className="project-meta">
        <span>{project.title}</span>
        <span>
          {project.detail}
          {project.tag ? `  ${project.tag}` : ""}
        </span>
      </div>
    </Link>
  );
}
