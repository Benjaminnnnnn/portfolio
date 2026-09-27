import type { PortfolioProjectSlug } from "./portfolio-projects";

export type ProjectMarketing = {
  // Three vivid colors for the shader field; they echo the marketing image.
  glow: readonly [string, string, string];
  // Where the pixels inside the marketing frame came from.
  caption: string;
};

// Images are rendered by scripts/marketing/render.mjs; see docs/marketing.md.
export const marketingImage = (slug: PortfolioProjectSlug) => `/project-media/marketing/${slug}.webp`;

export const projectMarketing: Record<PortfolioProjectSlug, ProjectMarketing> = {
  relay: { glow: ["#ff6a3d", "#ffb65c", "#5aa9d6"], caption: "Recorded local experiment · not live traffic" },
  handpick: { glow: ["#ff8a65", "#c38bff", "#7fd1c0"], caption: "App Store screenshots · demo photo library" },
  splendor: { glow: ["#f5c518", "#e0245e", "#3b4fd8"], caption: "Local build · reworked home, real four-player game" },
  "algo-explorer": { glow: ["#8b5cf6", "#22d3ee", "#34d399"], caption: "Local build · reworked UI" },
  "simple-db": { glow: ["#34d399", "#bef264", "#0ea5a4"], caption: "Source excerpt · BufferPool.java" },
  "petclinic-devops": { glow: ["#5b8cff", "#5eead4", "#a78bfa"], caption: "Historical project screenshots · browser chrome cropped" },
  "333gle": { glow: ["#f97316", "#facc15", "#60a5fa"], caption: "Existing search capture · real HttpServer.cc excerpt" },
  xv6: { glow: ["#a3e635", "#22c55e", "#14b8a6"], caption: "Existing terminal capture · not a new test run" },
  "rss-aggregator": { glow: ["#14b8a6", "#fb7185", "#38bdf8"], caption: "Existing Swagger capture · example from swagger.json" },
  cypress: { glow: ["#818cf8", "#c084fc", "#f472b6"], caption: "Local build · reworked landing page" },
  "leetcode-clone": { glow: ["#ffa116", "#ff5e7e", "#9b7bff"], caption: "Local build · reworked UI" },
  cliphop: { glow: ["#ff4081", "#00e5ff", "#ffb74d"], caption: "Local build · reworked feed, live Sanity data" },
  propertize: { glow: ["#475be8", "#a78bfa", "#5eead4"], caption: "Project screenshots · demo figures" },
  mems: { glow: ["#f08a5d", "#3fb39a", "#f5b3d0"], caption: "Existing capture · demo posts" },
};
