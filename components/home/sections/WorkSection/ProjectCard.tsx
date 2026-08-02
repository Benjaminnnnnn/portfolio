import Image from "next/image";
import Link from "next/link";
import type { Project } from "./projects";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const content = (
    <>
      <div className="project-media">
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(max-width: 720px) 100vw, 33vw"
          priority={index < 3}
        />
      </div>
      <div className="project-meta">
        <span>{project.title}</span>
        <span>
          {project.year}
          {project.tag ? `  ${project.tag}` : ""}
        </span>
      </div>
    </>
  );

  if (project.external) {
    return (
      <a
        className="project-card"
        data-project-card
        href={project.href}
        target="_blank"
        rel="noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link className="project-card" data-project-card href={project.href}>
      {content}
    </Link>
  );
}
