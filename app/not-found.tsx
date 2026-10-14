import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/site/SiteChrome";
import { withBasePath } from "@/lib/base-path";

export const metadata: Metadata = { title: "Page not found" };

// Exported as out/404.html, which GitHub Pages serves for any missing path.
export default function NotFound() {
  return (
    <div className="article-root">
      <SiteChrome />
      <main className="article-scroll no-scrollbar">
        <article className="article-shell">
          <header className="study-header">
            <Link className="study-back" href="/#work">← All projects</Link>
            <h1>404</h1>
            <p className="study-context">This page doesn&apos;t exist or has moved.</p>
          </header>
          {/* Plain links so people and agents can recover without running JavaScript. */}
          <div className="info-body">
            <p>
              Every page is listed in the <a href={withBasePath("/sitemap.xml")}>sitemap</a>. Agents can
              read <a href={withBasePath("/llms.txt")}>llms.txt</a> for a plain-text index of the site.
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}
