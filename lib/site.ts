// One source for who the site is about, so metadata, JSON-LD, llms.txt and
// the Markdown copies of each page can't drift apart.
export const siteUrl = "https://benjaminnnnnn.github.io/portfolio";

export const profile = {
  name: "Benjamin Zhuang",
  alternateName: "Zheyi Zhuang",
  jobTitle: "Software Engineer",
  description:
    "Software engineer and master's student at Carnegie Mellon University. Builds web applications, AI products, and backend systems, and studies the systems underneath them. Previously at Microsoft on Teams Rooms.",
  email: "benjaminzhuangjobs@outlook.com",
  locality: "Pittsburgh",
  region: "PA",
  country: "US",
  school: "Carnegie Mellon University",
  github: "https://github.com/Benjaminnnnnn",
  linkedin: "https://www.linkedin.com/in/benjamin-zhuang/",
  resume: `${siteUrl}/resume.pdf`,
} as const;

export const absoluteUrl = (path: string) => `${siteUrl}${path}`;
