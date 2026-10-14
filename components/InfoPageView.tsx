import Link from "next/link";
import type { InfoPage } from "@/data/info-pages";
import { infoJsonLd } from "@/lib/structured-data";
import { JsonLd } from "./JsonLd";
import { SiteChrome } from "./site/SiteChrome";

// Copy is plain text so it doubles as Markdown; turn its URLs and email into links here.
const linkPattern = /(https:\/\/[^\s]+[^\s.,]|[\w.+-]+@[\w-]+\.[\w.]+\w)/g;

function linkify(text: string) {
  return text.split(linkPattern).map((part, index) => {
    if (index % 2 === 0) return part;
    const href = part.includes("@") && !part.startsWith("http") ? `mailto:${part}` : part;
    return <a key={index} href={href}>{part}</a>;
  });
}

// About, contact and privacy share the case-study shell so they read as part of the site.
export function InfoPageView({ page }: { page: InfoPage }) {
  return (
    <div className="article-root">
      <JsonLd data={infoJsonLd(page)} />
      <SiteChrome />
      <main className="article-scroll no-scrollbar">
        <article className="article-shell">
          <header className="study-header">
            <Link className="study-back" href="/">← Home</Link>
            <h1>{page.title}</h1>
            <p className="study-context">{page.description}</p>
          </header>
          <div className="info-body">
            {page.sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.body.map((paragraph) => <p key={paragraph}>{linkify(paragraph)}</p>)}
              </section>
            ))}
          </div>
        </article>
      </main>
    </div>
  );
}
