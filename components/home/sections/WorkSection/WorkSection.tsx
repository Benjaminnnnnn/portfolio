"use client";

import { useRef } from "react";
import { SectionFrame } from "../../shared/SectionFrame";
import { ProjectCard } from "./ProjectCard";
import { projects } from "./projects";
import { useProjectReveal } from "./useProjectReveal";

export function WorkSection() {
  const section = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  useProjectReveal(section, grid);

  return (
    <SectionFrame ref={section} name="work" className="work-section work-gallery-section" id="work">
      <header className="work-gallery-heading"><h2>Selected work</h2><p>Web apps, systems, and coursework <span>01—13</span></p></header>
      <div ref={grid} className="projects-grid work-gallery-grid">
        {projects.map((project, index) => <ProjectCard project={project} index={index} key={project.slug} />)}
      </div>
      <a className="all-repositories" href="https://github.com/Benjaminnnnnn?tab=repositories" target="_blank" rel="noreferrer">All repositories on GitHub <span aria-hidden="true">↗</span></a>
    </SectionFrame>
  );
}
