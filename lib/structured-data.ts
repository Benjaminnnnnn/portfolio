import type { InfoPage } from "@/data/info-pages";
import type { PortfolioProject } from "@/data/portfolio-projects";
import { absoluteUrl, profile, siteUrl } from "./site";

// schema.org JSON-LD. Nodes share @ids so search engines and agents resolve
// every page back to the same Person and WebSite.
const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;

export const person = {
  "@type": "Person",
  "@id": personId,
  name: profile.name,
  alternateName: profile.alternateName,
  url: `${siteUrl}/`,
  image: absoluteUrl("/preview.png"),
  description: profile.description,
  jobTitle: profile.jobTitle,
  email: `mailto:${profile.email}`,
  alumniOf: { "@type": "CollegeOrUniversity", name: profile.school },
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.locality,
    addressRegion: profile.region,
    addressCountry: profile.country,
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "recruiting",
    email: profile.email,
    url: absoluteUrl("/contact/"),
    availableLanguage: "English",
  },
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: [
    "Distributed systems", "Database systems", "Cloud computing", "Operating systems",
    "Backend development", "Web development", "AI agents", "Python", "Go", "TypeScript", "Java", "C++", "Swift",
  ],
};

const website = {
  "@type": "WebSite",
  "@id": websiteId,
  name: profile.name,
  url: `${siteUrl}/`,
  description: profile.description,
  inLanguage: "en",
  author: { "@id": personId },
  publisher: { "@id": personId },
};

const graph = (...nodes: object[]) => ({ "@context": "https://schema.org", "@graph": nodes });

export function homeJsonLd(projects: readonly PortfolioProject[]) {
  return graph(person, website, {
    "@type": "ProfilePage",
    "@id": `${siteUrl}/#profile`,
    url: `${siteUrl}/`,
    name: `${profile.name} — Software Engineer`,
    isPartOf: { "@id": websiteId },
    mainEntity: { "@id": personId },
    hasPart: projects.map((project) => ({ "@id": absoluteUrl(`/${project.slug}/#work`) })),
  });
}

export function projectJsonLd(project: PortfolioProject) {
  const url = absoluteUrl(`/${project.slug}/`);
  return graph(
    {
      "@type": "CreativeWork",
      "@id": `${url}#work`,
      name: project.title,
      headline: project.headline,
      description: project.summary,
      genre: project.category,
      url,
      image: absoluteUrl(project.cover),
      keywords: project.stack.join(", "),
      inLanguage: "en",
      author: { "@id": personId },
      isPartOf: { "@id": websiteId },
      ...(project.sourceStatus ? {} : { codeRepository: project.sourceUrl }),
      ...(project.demoUrl ? { sameAs: project.demoUrl } : {}),
    },
    breadcrumbs(project.title, url),
  );
}

export function infoJsonLd(page: InfoPage) {
  const url = absoluteUrl(`/${page.slug}/`);
  return graph(
    person,
    {
      "@type": page.schemaType,
      "@id": `${url}#page`,
      url,
      name: page.title,
      description: page.description,
      inLanguage: "en",
      isPartOf: { "@id": websiteId },
      about: { "@id": personId },
    },
    breadcrumbs(page.title, url),
  );
}

function breadcrumbs(name: string, url: string) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: profile.name, item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name, item: url },
    ],
  };
}

// "<" can't appear raw inside a <script>; escape it so data can't close the tag.
export const serializeJsonLd = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");
