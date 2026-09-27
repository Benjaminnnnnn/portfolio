"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ShaderField } from "@/components/shader/ShaderField";
import { projectMarketing } from "@/data/project-marketing";
import type { PortfolioProjectSlug } from "@/data/portfolio-projects";
import { SectionFrame } from "../../shared/SectionFrame";
import { ProjectCard } from "./ProjectCard";
import { projects } from "./projects";
import { useProjectReveal } from "./useProjectReveal";

export function WorkSection() {
  const section = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(projects[0].slug);
  const activate = useCallback((slug: string) => setActive(slug), []);
  useProjectReveal(section, grid);

  // Without hover (touch), the card closest to the middle of the screen leads.
  useEffect(() => {
    if (window.matchMedia("(hover: hover)").matches || !grid.current) return;
    const io = new IntersectionObserver((entries) => {
      const hit = entries.find((e) => e.isIntersecting);
      const slug = hit?.target.getAttribute("data-slug");
      if (slug) setActive(slug);
    }, { rootMargin: "-45% 0px -45% 0px" });
    grid.current.querySelectorAll("[data-project-card]").forEach((card) => io.observe(card));
    return () => io.disconnect();
  }, []);

  return (
    <SectionFrame ref={section} name="work" className="work-section work-gallery-section" id="work">
      <div className="work-stage" aria-hidden="true">
        <ShaderField colors={projectMarketing[active as PortfolioProjectSlug].glow} className="work-shader" />
      </div>
      <header className="work-gallery-heading">
        <h2>Selected work</h2>
        <p>Web and iOS apps, systems, and coursework <span>01—{String(projects.length).padStart(2, "0")}</span></p>
      </header>
      <div ref={grid} className="projects-grid work-gallery-grid">
        {projects.map((project, index) => <ProjectCard project={project} index={index} onActivate={activate} key={project.slug} />)}
      </div>
      <a className="all-repositories" href="https://github.com/Benjaminnnnnn?tab=repositories" target="_blank" rel="noreferrer">All repositories on GitHub <span aria-hidden="true">↗</span></a>
    </SectionFrame>
  );
}
