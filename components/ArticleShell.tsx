import Link from "next/link";
import type { CSSProperties } from "react";
import { getNextProject, type PortfolioProject, type PortfolioProjectSlug } from "@/data/portfolio-projects";
import { projectVisuals, projectScopeNotes } from "@/data/project-visuals";
import { SiteChrome } from "./site/SiteChrome";
import { LeaseReplay } from "./LeaseReplay";
import { ProjectArtwork } from "./ProjectArtwork";
import { ProjectDiagram } from "./ProjectDiagram";
import { StudyImage } from "./StudyImage";

export function ArticleShell({ project }: { project: PortfolioProject }) {
  const slug = project.slug as PortfolioProjectSlug;
  const nextProject = getNextProject(slug);
  const visuals = projectVisuals[slug];
  return (
    <div className="article-root" style={{ "--project-accent": project.accent } as CSSProperties}>
      <SiteChrome />
      <main className="article-scroll no-scrollbar">
        <article className="article-shell">
          <header className="study-header">
            <Link className="study-back" href="/#work">← All projects</Link>
            <h1>{project.title}</h1>
            <p className="study-context">{project.context}</p>
          </header>
          <section className="study-intro" aria-label="About this project">
            <p>{project.summary}</p>
            <p className="study-scope">{projectScopeNotes[slug]}</p>
            <p className="study-stack">{project.stack.join(" / ")}</p>
            {project.sourceStatus === "pending" ? <span className="study-source project-source-pending">Source publication pending</span> : <a className="study-source" href={project.sourceUrl} target="_blank" rel="noreferrer">View repository <span aria-hidden="true">↗</span></a>}
          </section>

          <div className="study-gallery">
            <figure className="study-hero">
              <ProjectArtwork slug={slug} src={project.cover} alt={project.coverAlt} priority />
              <figcaption>{["relay", "splendor", "simple-db", "petclinic-devops", "xv6"].includes(slug) ? "Project cover · original graphic" : "Project cover · existing interface capture"}</figcaption>
            </figure>
            {visuals.map((visual, index) => {
              return <section className={`study-chapter${visual.replay ? " study-chapter-replay" : ""}`} key={visual.title} aria-labelledby={`detail-${index}`}>
                <figure className="study-visual">
                  {visual.crop ? <StudyImage src={project.cover} alt={project.coverAlt} visual={visual} /> : visual.replay ? <LeaseReplay /> : <ProjectDiagram kind={visual.diagram!} slug={slug} />}
                  <figcaption><h2 id={`detail-${index}`}>{visual.title}</h2><p>{visual.caption}</p></figcaption>
                </figure>
              </section>;
            })}
          </div>

          <details className="study-notes"><summary>Implementation notes</summary><div>{project.chapters.map(chapter => <section key={chapter.eyebrow}><h2>{chapter.title}</h2>{chapter.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}</div></details>

          {project.evidence && project.sourceStatus !== "pending" ? <nav className="study-evidence" aria-label="Project code and notes"><span>Code & notes</span>{project.evidence.map(item => <a key={item.href} href={item.href} target="_blank" rel="noreferrer">{item.label} ↗</a>)}</nav> : null}

          <footer className="study-next"><Link href={`/${nextProject.slug}`}><div className="study-next-thumb"><ProjectArtwork slug={nextProject.slug} src={nextProject.cover} alt={nextProject.coverAlt} /></div><div><span>Next project</span><strong>{nextProject.title}</strong><small>{nextProject.category}</small></div><span aria-hidden="true">↗</span></Link></footer>
        </article>
      </main>
    </div>
  );
}
