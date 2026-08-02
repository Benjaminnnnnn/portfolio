import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import {
  getNextProject,
  type PortfolioProject,
  type PortfolioProjectSlug,
} from "@/data/portfolio-projects";
import { SiteChrome } from "./site/SiteChrome";

export function ArticleShell({ project }: { project: PortfolioProject }) {
  const nextProject = getNextProject(project.slug as PortfolioProjectSlug);
  const projectStyle = { "--project-accent": project.accent } as CSSProperties;

  return (
    <div className="article-root" style={projectStyle}>
      <SiteChrome />
      <main className="article-scroll no-scrollbar">
        <article className="article-shell">
          <header className="study-header">
            <div className="study-kicker">
              <span>CASE STUDY</span>
              <span>{project.category}</span>
            </div>
            <h1>{project.title}</h1>
            <p className="study-headline">{project.headline}</p>
            <div className="study-header-bottom">
              <p>{project.summary}</p>
              <a href={project.sourceUrl} target="_blank" rel="noreferrer">
                View repository <span aria-hidden="true">↗</span>
              </a>
            </div>
          </header>

          <figure className="study-hero">
            <Image
              src={project.cover}
              alt={project.coverAlt}
              fill
              priority
              sizes="(max-width: 760px) 100vw, 92vw"
            />
          </figure>

          <section className="study-overview" aria-labelledby="study-overview-title">
            <p className="study-section-label">Overview / 00</p>
            <div>
              <h2 id="study-overview-title">A product view and a systems view.</h2>
              <p>{project.summary}</p>
            </div>
            <dl className="study-facts">
              <div>
                <dt>Context</dt>
                <dd>{project.context}</dd>
              </div>
              <div>
                <dt>Discipline</dt>
                <dd>{project.category}</dd>
              </div>
              <div>
                <dt>Stack</dt>
                <dd>{project.stack.join(" · ")}</dd>
              </div>
            </dl>
          </section>

          <section className="study-metrics" aria-label="Project highlights">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </section>

          <div className="study-chapters">
            {project.chapters.map((chapter) => (
              <section className="study-chapter" key={chapter.eyebrow}>
                <p className="study-section-label">{chapter.eyebrow}</p>
                <div>
                  <h2>{chapter.title}</h2>
                  {chapter.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {project.editorialVisual ? (
            <figure className="study-editorial">
              <div>
                <Image
                  src={project.editorialVisual.src}
                  alt={project.editorialVisual.alt}
                  fill
                  sizes="(max-width: 760px) 100vw, 92vw"
                />
              </div>
              <figcaption>{project.editorialVisual.caption}</figcaption>
            </figure>
          ) : null}

          <section className="study-flow" aria-labelledby="study-flow-title">
            <div className="study-flow-heading">
              <p className="study-section-label">System map / 04</p>
              <h2 id="study-flow-title">The core loop</h2>
            </div>
            <ol>
              {project.flow.map((step, index) => (
                <li key={step.label}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step.label}</strong>
                  <p>{step.detail}</p>
                </li>
              ))}
            </ol>
          </section>

          <footer className="study-next">
            <p>Next case study</p>
            <Link href={`/${nextProject.slug}`}>
              <span>{nextProject.category}</span>
              <strong>{nextProject.title}</strong>
              <span aria-hidden="true">↗</span>
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}
