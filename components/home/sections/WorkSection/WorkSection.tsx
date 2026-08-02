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
    <SectionFrame ref={section} name="work" className="work-section" id="work">
      <div className="work-heading">
        <span>SELECTED WORK / 02</span>
        <span>AI · DESIGN · TASTE · ENGINEERING</span>
      </div>
      <div ref={grid} className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard project={project} index={index} key={project.title} />
        ))}
      </div>
    </SectionFrame>
  );
}
