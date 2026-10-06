import type { PortfolioProjectSlug } from "./portfolio-projects";

export type ProjectMeta = {
  // Years from the repository (created → last push), or the project's term.
  years: string;
  // Small lime tag on the card.
  kind: string;
  // Where the specimen's material comes from.
  specimen: string;
};

export const projectMeta: Record<PortfolioProjectSlug, ProjectMeta> = {
  poreia: { years: "2026", kind: "AI product", specimen: "Prompt bar and example requests over the home screen's photograph (Pexels)" },
  "tartan-tickets": { years: "2026", kind: "Team project", specimen: "Refund confirmation wording from Scotty's system prompt, over the events page capture" },
  companion: { years: "2026", kind: "iOS app", specimen: "Object renders from the landing page; image-generated, not app output" },
  "ppe-motion": { years: "2026", kind: "Practicum", specimen: "Schematic of task detection; not recorded data" },
  relay: { years: "2026", kind: "Systems", specimen: "Event log from the recorded worker-crash experiment" },
  handpick: { years: "2026", kind: "iOS app", specimen: "Photos from Handpick's CC0 demo library" },
  splendor: { years: "2025–2026", kind: "Team project", specimen: "Card and noble art from the game's repository" },
  "algo-explorer": { years: "2025–2026", kind: "Web app", specimen: "A* grid redrawn from a recorded run" },
  "simple-db": { years: "2023", kind: "Coursework", specimen: "BufferPool page slots, from the source" },
  "petclinic-devops": { years: "2026", kind: "DevOps", specimen: "Stage names from the repository Jenkinsfile" },
  "333gle": { years: "2023", kind: "Coursework", specimen: "Wordmark cropped from the search page capture" },
  xv6: { years: "2023", kind: "Coursework", specimen: "Lines from the existing terminal capture" },
  "rss-aggregator": { years: "2023", kind: "API", specimen: "Request example from the project's swagger.json" },
  cypress: { years: "2023–2024", kind: "Web app", specimen: "Workspace setup form, redrawn from the component" },
  "leetcode-clone": { years: "2023–2025", kind: "Web app", specimen: "Two Sum and its three bundled test cases" },
  cliphop: { years: "2023–2025", kind: "Web app", specimen: "The topic list from the feed sidebar" },
};
