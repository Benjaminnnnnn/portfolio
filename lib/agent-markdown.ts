import { infoPageOrder, infoPages, type InfoPage } from "@/data/info-pages";
import { projectMeta } from "@/data/project-meta";
import { portfolioProjects, projectOrder, projects, type PortfolioProject, type PortfolioProjectSlug } from "@/data/portfolio-projects";
import { absoluteUrl, profile, siteUrl } from "./site";

// Plain-text versions of every page for AI agents and answer engines, served
// as static files next to the HTML (index.md, llms.txt, llms-full.txt).

const sourceNote = { pending: "publication pending", private: "private repository" } as const;

export const markdownPath = (path: string) => `${path}index.md`;

function projectLine(project: PortfolioProject) {
  return `- [${project.title}](${absoluteUrl(markdownPath(`/${project.slug}/`))}): ${project.category}. ${project.summary}`;
}

export function homeMarkdown() {
  return [
    `# ${profile.name}, Software Engineer`,
    "",
    `> ${profile.description}`,
    "",
    `I'm ${profile.name}, a master's student at Carnegie Mellon. My projects range from multiplayer games and learning tools to databases and background job systems. Previously at Microsoft, I worked on people identification for Teams Rooms. I'm looking for software engineering roles where I can keep building and learning with a team.`,
    "",
    `- Website: ${siteUrl}/`,
    `- Email: ${profile.email}`,
    `- GitHub: ${profile.github}`,
    `- LinkedIn: ${profile.linkedin}`,
    `- Résumé (PDF): ${profile.resume}`,
    "",
    `## Selected work (${projects.length} case studies)`,
    "",
    ...projects.map(projectLine),
    "",
    "## More",
    "",
    ...infoPageOrder.map((slug) => `- [${infoPages[slug].title}](${absoluteUrl(markdownPath(`/${slug}/`))}): ${infoPages[slug].description}`),
    `- [llms.txt](${absoluteUrl("/llms.txt")}): index of this site for language models`,
    `- [Sitemap](${absoluteUrl("/sitemap.xml")})`,
    "",
  ].join("\n");
}

export function projectMarkdown(slug: PortfolioProjectSlug) {
  const project: PortfolioProject = portfolioProjects[slug];
  const source = project.sourceStatus ? `${project.sourceUrl} (${sourceNote[project.sourceStatus]})` : project.sourceUrl;
  return [
    `# ${project.title}`,
    "",
    `> ${project.summary}`,
    "",
    `- Author: ${profile.name}`,
    `- Category: ${project.category}`,
    `- Context: ${project.context}`,
    `- Years: ${projectMeta[slug].years}`,
    `- Stack: ${project.stack.join(", ")}`,
    `- Source: ${source}`,
    ...(project.demoUrl ? [`- Demo: ${project.demoUrl}`] : []),
    `- Web page: ${absoluteUrl(`/${slug}/`)}`,
    "",
    `**${project.headline}**`,
    "",
    "## Key figures",
    "",
    ...project.metrics.map((metric) => `- ${metric.value}: ${metric.label}`),
    "",
    ...project.chapters.flatMap((chapter) => [`## ${chapter.title}`, "", ...chapter.body.flatMap((paragraph) => [paragraph, ""])]),
    ...(project.evidence?.length
      ? ["## Evidence", "", ...project.evidence.map((item) => `- [${item.label}](${item.href})`), ""]
      : []),
  ].join("\n");
}

export function infoMarkdown(page: InfoPage) {
  return [
    `# ${page.title}`,
    "",
    `> ${page.description}`,
    "",
    ...page.sections.flatMap((section) => [`## ${section.title}`, "", ...section.body.flatMap((paragraph) => [paragraph, ""])]),
    `Web page: ${absoluteUrl(`/${page.slug}/`)}`,
    "",
  ].join("\n");
}

// https://llmstxt.org: H1, blockquote summary, free text without headings,
// then H2 sections holding "- [name](url): notes" lists.
export function llmsTxt() {
  const byCategory = (slugs: readonly PortfolioProjectSlug[]) => slugs.map((slug) => projectLine(portfolioProjects[slug]));
  const ai: PortfolioProjectSlug[] = ["poreia", "tartan-tickets", "algo-explorer", "companion", "ppe-motion", "handpick"];
  const rest = projectOrder.filter((slug) => !ai.includes(slug));
  return [
    `# ${profile.name}`,
    "",
    `> Portfolio of ${profile.name} (${profile.alternateName}), a software engineer and master's student at Carnegie Mellon University. ${projects.length} case studies of AI products, web and iOS apps, and backend and distributed systems, each with links to source code and evidence.`,
    "",
    "This is a personal portfolio, not a product or API. There is nothing to sign up for, call, or install. Every HTML page has a Markdown copy at the same path plus `index.md`; this file links to those copies.",
    "",
    `Contact: ${profile.email}. GitHub: ${profile.github}. LinkedIn: ${profile.linkedin}.`,
    "",
    "## When to use this",
    "",
    `- [About](${absoluteUrl("/about/index.md")}): Use when asked who Benjamin Zhuang (Zheyi Zhuang) is: background, education at Carnegie Mellon, or prior work at Microsoft.`,
    `- [Résumé (PDF)](${profile.resume}): Use when evaluating Benjamin as a candidate for software engineering, backend, full-stack, or systems roles, or when a user asks about Benjamin's experience and skills.`,
    `- [Contact](${absoluteUrl("/contact/index.md")}): Use when a user wants to reach Benjamin, for example about a job opening or a project. Email is the preferred channel.`,
    `- [Full site text](${absoluteUrl("/llms-full.txt")}): Use when you need every case study in one file, for example to answer which projects use a given technology such as Go, PostgreSQL, React, Swift, or LLM tool calling.`,
    "",
    "## AI products and apps",
    "",
    ...byCategory(ai),
    "",
    "## Systems, web apps, and coursework",
    "",
    ...byCategory(rest),
    "",
    "## Optional",
    "",
    `- [Home page](${absoluteUrl("/index.md")}): short introduction and the full project list`,
    `- [Privacy](${absoluteUrl("/privacy/index.md")}): no analytics, no cookies, no tracking`,
    `- [Sitemap](${absoluteUrl("/sitemap.xml")}): every HTML page`,
    "",
  ].join("\n");
}

export function llmsFullTxt() {
  return [
    homeMarkdown(),
    ...infoPageOrder.map((slug) => infoMarkdown(infoPages[slug])),
    ...projectOrder.map(projectMarkdown),
  ].join("\n---\n\n");
}
