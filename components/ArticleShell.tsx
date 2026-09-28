import Link from "next/link";
import type { CSSProperties } from "react";
import { getNextProject, type PortfolioProject, type PortfolioProjectSlug } from "@/data/portfolio-projects";
import { projectVisuals, projectScopeNotes } from "@/data/project-visuals";
import { projectArt } from "@/data/project-art";
import { projectMeta } from "@/data/project-meta";
import { SiteChrome } from "./site/SiteChrome";
import { LeaseReplay } from "./LeaseReplay";
import { ProjectArtwork } from "./ProjectArtwork";
import { ProjectDiagram } from "./ProjectDiagram";
import { StudyImage } from "./StudyImage";

export function ArticleShell({ project }: { project: PortfolioProject }) {
  const slug = project.slug as PortfolioProjectSlug;
  const nextProject = getNextProject(slug);
  const visuals = projectVisuals[slug];
  const art = projectArt[slug];
  const meta = projectMeta[slug];
  return (
    <div className={`article-root study-art-directed study-${slug} study-layout-${art.layout}`} style={{ "--project-accent": art.accent, "--study-paper": art.paper, "--study-ink": art.ink, "--study-contrast": art.contrast } as CSSProperties}>
      <SiteChrome />
      <main className="article-scroll no-scrollbar">
        <article className="article-shell">
          <header className="study-header">
            <Link className="study-back" href="/#work">← All projects</Link>
            <h1>{project.title}</h1>
            <p className="study-context">{project.context} · {meta.years}</p>
          </header>
          <figure className="study-hero">
            <div className="study-hero-stage specimen-host"><ProjectArtwork slug={slug} alt={project.coverAlt} /></div>
            <figcaption><span>{meta.specimen}</span><span>Product preview</span></figcaption>
          </figure>
          <section className="study-intro" aria-label="About this project">
            <p>{project.summary}</p>
            <p className="study-scope">{projectScopeNotes[slug]}</p>
            {project.sourceStatus === "pending" ? <span className="study-source project-source-pending">Source publication pending</span> : <a className="study-source" href={project.sourceUrl} target="_blank" rel="noreferrer">View repository <span aria-hidden="true">↗</span></a>}
          </section>

          <div className="study-gallery">
            {art.screen && <figure className="study-screen-spread">
              <StudyImage src={project.cover} alt={project.coverAlt} full visual={{ title: "The interface", caption: art.screen, crop: { x: 0, y: 0, width: 100, height: 100 } }} />
              <figcaption><span>Interface capture</span><p>{art.screen}</p></figcaption>
            </figure>}
            {visuals.map((visual, index) => {
              return <section className={`study-chapter study-panel-${index + 1}${visual.replay ? " study-chapter-replay" : ""}${visual.crop ? " study-panel-capture" : " study-panel-diagram"}`} key={visual.title} aria-labelledby={`detail-${index}`}>
                <figure className="study-visual">
                  {visual.crop ? <StudyImage src={project.cover} alt={project.coverAlt} visual={visual} /> : visual.replay ? <LeaseReplay /> : <ProjectDiagram kind={visual.diagram!} slug={slug} />}
                  <figcaption><span className="study-panel-number" aria-hidden="true">0{index + 1}</span><div><h2 id={`detail-${index}`}>{visual.title}</h2><p>{visual.caption}</p></div></figcaption>
                </figure>
              </section>;
            })}
          </div>

          <details className="study-notes"><summary>Implementation notes</summary><div>{project.chapters.map(chapter => <section key={chapter.eyebrow}><h2>{chapter.title}</h2>{chapter.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}</div></details>

          {project.evidence && project.sourceStatus !== "pending" ? <nav className="study-evidence" aria-label="Project code and notes"><span>Code & notes</span>{project.evidence.map(item => <a key={item.href} href={item.href} target="_blank" rel="noreferrer">{item.label} ↗</a>)}</nav> : null}

          <dl className="study-meta">
            <div><dt>Years</dt><dd>{meta.years}</dd></div>
            <div><dt>Type</dt><dd>{meta.kind}</dd></div>
            <div><dt>Context</dt><dd>{project.context}</dd></div>
            <div className="study-meta-wide"><dt>Stack</dt><dd>{project.stack.join(", ")}</dd></div>
            <div className="study-meta-wide"><dt>Links</dt><dd>{project.sourceStatus === "pending" ? "Source publication pending" : <a href={project.sourceUrl} target="_blank" rel="noreferrer">Repository ↗</a>}<Link href="/#work">All work</Link><Link href="/#contact">Contact</Link></dd></div>
          </dl>

          <footer className="study-next"><Link className="specimen-host" href={`/${nextProject.slug}`}><div className="study-next-thumb"><ProjectArtwork slug={nextProject.slug} alt={nextProject.coverAlt} /></div><div><span>Next project</span><strong>{nextProject.title}</strong><small>{projectMeta[nextProject.slug as PortfolioProjectSlug].kind} · {projectMeta[nextProject.slug as PortfolioProjectSlug].years}</small></div><span aria-hidden="true">↗</span></Link></footer>
        </article>
      </main>
    </div>
  );
}
