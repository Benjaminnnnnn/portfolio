import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/site/SiteChrome";

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
        </article>
      </main>
    </div>
  );
}
