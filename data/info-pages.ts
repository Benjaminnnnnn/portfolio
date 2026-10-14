import { profile } from "@/lib/site";

// About, contact and privacy. Rendered as HTML pages and as the Markdown
// copies agents read (see lib/agent-markdown.ts), so keep facts here only.
export type InfoSection = { title: string; body: readonly string[] };

export type InfoPage = {
  slug: "about" | "contact" | "privacy";
  title: string;
  description: string;
  schemaType: "AboutPage" | "ContactPage" | "WebPage";
  sections: readonly InfoSection[];
};

export const infoPages = {
  about: {
    slug: "about",
    title: "About Benjamin Zhuang",
    description:
      "Benjamin Zhuang is a software engineer and master's student at Carnegie Mellon University who builds web applications, AI products, and backend systems.",
    schemaType: "AboutPage",
    sections: [
      {
        title: "Who I am",
        body: [
          `I'm ${profile.name} (also ${profile.alternateName}), a master's student at Carnegie Mellon University in Pittsburgh. I build web applications and study the systems that run underneath them.`,
          "Previously at Microsoft, I worked on people identification for Teams Rooms. I'm looking for software engineering roles where I can keep building and learning with a team.",
        ],
      },
      {
        title: "What I work on",
        body: [
          "My projects range from AI products and iOS apps to multiplayer games, learning tools, databases, and background job systems. Recent work includes Poreia, an AI travel planner that validates every model reply against a schema; the refund tool and its guards for Tartan Tickets, an LLM assistant that can move money; and Relay, a Go and PostgreSQL job queue with a recorded worker-crash experiment.",
          "I write in Go, Python, TypeScript, Java, C, C++, and Swift, and I'm most at home on backend services, distributed systems, and the full-stack web.",
        ],
      },
      {
        title: "How this site is written",
        body: [
          "Each case study says what I built, what I didn't, and where the evidence is: source code, recorded experiments, and test files. When a repository is private or still unpublished, the page says so. Numbers come from the linked runs, not estimates.",
        ],
      },
    ],
  },
  contact: {
    slug: "contact",
    title: "Contact",
    description: `How to reach Benjamin Zhuang about software engineering roles, collaborations, or questions about a project: email ${profile.email}.`,
    schemaType: "ContactPage",
    sections: [
      {
        title: "Email",
        body: [
          `The best way to reach me is email: ${profile.email}. Recruiters are welcome; including the role, team, and location helps me reply with the right details.`,
        ],
      },
      {
        title: "Elsewhere",
        body: [
          `LinkedIn: ${profile.linkedin}. GitHub: ${profile.github}, where most of the projects on this site are published. My résumé is at ${profile.resume}.`,
        ],
      },
      {
        title: "Location",
        body: [
          `I'm based in ${profile.locality}, Pennsylvania, at Carnegie Mellon University, and work in US Eastern time.`,
        ],
      },
      {
        title: "Before you write",
        body: [
          "If you're asking about a specific project, the case study usually links its source, tests, and recorded results. Some repositories belong to a course or a team and are private; those pages say so, and I can walk through the work on a call instead.",
        ],
      },
    ],
  },
  privacy: {
    slug: "privacy",
    title: "Privacy",
    description:
      "This site has no analytics, no cookies, and no tracking. It stores two display preferences in your browser and is hosted on GitHub Pages.",
    schemaType: "WebPage",
    sections: [
      {
        title: "What this site collects",
        body: [
          "Nothing. There are no analytics, advertising, cookies, forms, or third-party scripts. Fonts, images, 3D models, and music are served from this site itself.",
        ],
      },
      {
        title: "What stays in your browser",
        body: [
          "Two preferences are saved in your browser's local storage so they survive a reload: \"theme\" (light, dark, or automatic) and \"sound\" (whether the background music plays). They never leave your device, and clearing site data removes them.",
        ],
      },
      {
        title: "Hosting",
        body: [
          "The site is a static export hosted on GitHub Pages. GitHub may log visitors' IP addresses for security and operation of the service; see the GitHub Privacy Statement at https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement. I don't have access to those logs.",
        ],
      },
      {
        title: "Links and email",
        body: [
          `Links to GitHub, LinkedIn, and project demos take you to sites with their own privacy policies. If you email me at ${profile.email}, I use your message only to reply and don't share it.`,
        ],
      },
    ],
  },
} as const satisfies Record<InfoPage["slug"], InfoPage>;

export const infoPageOrder = ["about", "contact", "privacy"] as const;
