# Agent readiness

What this site publishes for AI agents, crawlers, and answer engines, and what
GitHub Pages can't do.

## Published files

All under `https://benjaminnnnnn.github.io/portfolio/`, generated at build time
from `data/` so they can't drift from the HTML.

| Path | Source | Purpose |
| --- | --- | --- |
| `llms.txt` | `app/llms.txt/route.ts` | [llmstxt.org](https://llmstxt.org) index, with a "When to use this" section |
| `llms-full.txt` | `app/llms-full.txt/route.ts` | Every page's Markdown in one file |
| `index.md`, `<slug>/index.md` | `app/index.md`, `app/[slug]/index.md` | Markdown copy of each page, linked from its HTML with `<link rel="alternate" type="text/markdown">` |
| `about/`, `contact/`, `privacy/` | `data/info-pages.ts` | Trust pages, also exported as Markdown |
| `sitemap.xml` | `app/sitemap.ts` | Every HTML page, `lastmod` from the deploying commit |
| `robots.txt` | `public/robots.txt` | Allows all crawlers; names AI agents explicitly |

Every page carries JSON-LD (`lib/structured-data.ts`): a `Person` with
`contactPoint` and `address`, `WebSite` and `ProfilePage` on the home page,
`CreativeWork` and `BreadcrumbList` on case studies, and `AboutPage`,
`ContactPage`, or `WebPage` on the trust pages.

## Verify

```sh
PAGES_BASE_PATH=/portfolio npm run build
npm run test:agents
```

`scripts/verify-agent-readiness.mjs` reads `out/` and checks the llms.txt layout
and links, sitemap coverage and `lastmod`, robots rules, canonical / `lang` /
`og:image` / `og:type` / Markdown alternate on every page, JSON-LD types, 500+
characters of text and sequential headings without JavaScript, trust-page
length, and the 404 page's links.

## Not possible on GitHub Pages

- **Markdown content negotiation** (`Accept: text/markdown` → Markdown with
  `Vary: Accept`) and **Markdown 404 bodies** need a server or edge function
  that reads request headers. GitHub Pages serves static files with fixed
  headers. The `.md` copies are the closest static equivalent; full
  negotiation needs a proxy in front (for example a Cloudflare Worker on a
  custom domain).
- **Domain-root files.** Crawlers read `robots.txt` and `/sitemap.xml` only at
  `https://benjaminnnnnn.github.io/`, which is served by the separate
  `benjaminnnnnn.github.io` repository, not this one. Audits that scan the
  bare domain see that repository's content.
