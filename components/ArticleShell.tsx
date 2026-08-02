import type { RecoveredArticle } from "@/data/recovered-articles";
import { GridOverlay } from "./site/GridOverlay";
import { SiteChrome } from "./site/SiteChrome";

export function ArticleShell({ article }: { article: RecoveredArticle }) {
  return (
    <div className="article-root">
      <GridOverlay />
      <SiteChrome />
      <main className="article-scroll no-scrollbar">
        <article
          className="article-shell"
          data-mdx-article="true"
          dangerouslySetInnerHTML={{ __html: article.html }}
        />
      </main>
    </div>
  );
}
