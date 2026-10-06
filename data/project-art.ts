import type { PortfolioProjectSlug } from "./portfolio-projects";

type ProjectArt = {
  alt: string;
  medium: string;
  paper: string;
  ink: string;
  accent: string;
  contrast: string;
  layout: "spread" | "diptych" | "sequence";
  screen?: string;
};

// Editorial concepts are separate from project.cover, the real interface capture.
// Prompts and provenance: docs/project-art-prompts.json.
export const projectArt: Record<PortfolioProjectSlug, ProjectArt> = {
  poreia: { alt: "Poreia's home screen over a dusk mountain photograph", medium: "Dusk photograph / one sentence", paper: "#f1e3d9", ink: "#3a2a2a", accent: "#a8452f", contrast: "#c9d6e2", layout: "spread", screen: "The live home screen. Generating a trip requires signing in, so no itinerary is shown." },
  "tartan-tickets": { alt: "Tartan Tickets events page with the Scotty assistant panel open", medium: "Tartan red / one confirmation", paper: "#f3e4e1", ink: "#3d1a1a", accent: "#8f1d1d", contrast: "#cfe3d2", layout: "diptych", screen: "A local build of the frontend with no backend running, so the event list is empty. The Scotty panel shows its greeting and quick actions." },
  companion: { alt: "Companion landing page with floating collectible objects", medium: "Pastel plastic / small objects", paper: "#eef3ea", ink: "#1f2d27", accent: "#1e7a55", contrast: "#f6d3df", layout: "sequence", screen: "The web landing page. Its user counts and rating are placeholder copy, and the objects are image-model renders." },
  "ppe-motion": { alt: "Schematic motion trace divided into tasks", medium: "Safety green / motion trace", paper: "#e4efe6", ink: "#16301f", accent: "#157a3c", contrast: "#f2d9a8", layout: "diptych" },
  relay: { alt: "AI concept: orange job tokens meet at a junction in brushed-metal channels", medium: "Machined metal / queue study", paper: "#e5e9eb", ink: "#26333b", accent: "#a43f23", contrast: "#f4c4ab", layout: "sequence" },
  handpick: { alt: "Handpick App Store screenshots on warm paper", medium: "Warm paper / one photo at a time", paper: "#f3eee6", ink: "#2d2724", accent: "#9c4a36", contrast: "#e6d6ec", layout: "sequence", screen: "App Store screenshots of the Organize home, single-photo review and collection grid, shown with a demo library." },
  splendor: { alt: "AI concept: colored gems, brass tokens and blank cards on plum velvet", medium: "Velvet & gemstones", paper: "#ebe1e8", ink: "#402334", accent: "#704158", contrast: "#e3d9a4", layout: "spread", screen: "A real four-player game running on a local build, mid-game tokens set through the test-state endpoint." },
  "algo-explorer": { alt: "AI concept: orange thread exploring a folded blue paper maze", medium: "Cut paper / path study", paper: "#e0e9f6", ink: "#203855", accent: "#315c97", contrast: "#f0bc8b", layout: "sequence", screen: "The reworked UI after an A* run: the finished path beside the tutor panel." },
  "simple-db": { alt: "AI concept: green-tabbed archive cards with one coral record pulled forward", medium: "Paper archive / stored records", paper: "#e6e9dc", ink: "#2c4236", accent: "#456448", contrast: "#e8b3a0", layout: "diptych" },
  "petclinic-devops": { alt: "AI concept: blue and terracotta linocut of a modular clinic with a dog and cat", medium: "Two-color linocut", paper: "#e2eaf2", ink: "#233e5f", accent: "#375d8b", contrast: "#edc5a5", layout: "sequence" },
  "333gle": { alt: "AI concept: orange magnifying glass isolates a blue mark in a paper collage", medium: "Print collage / document search", paper: "#f1e8d6", ink: "#333129", accent: "#9f4924", contrast: "#c3d3ee", layout: "diptych", screen: "The original search interface and captured results." },
  xv6: { alt: "AI concept: phosphor-green memory-like cells glowing through curved CRT glass", medium: "Phosphor / analog light", paper: "#18231c", ink: "#dfebd5", accent: "#aac985", contrast: "#384c31", layout: "spread" },
  "rss-aggregator": { alt: "AI concept: coral printed ribbons converge into a teal stream on seafoam paper", medium: "Screenprint / collected feeds", paper: "#dcece6", ink: "#1c4945", accent: "#347970", contrast: "#f0b6a4", layout: "sequence", screen: "Existing Swagger documentation for the API, not a reader-app mockup." },
  cypress: { alt: "AI concept: plum and chartreuse folded documents form a branching paper sculpture", medium: "Folded paper / workspace study", paper: "#e9e0ef", ink: "#49324e", accent: "#71537b", contrast: "#dbe0ad", layout: "diptych", screen: "The reworked landing page, which now lists only implemented features." },
  "leetcode-clone": { alt: "AI concept: a yellow angular puzzle piece between graphite forms in a woodblock print", medium: "Woodblock / problem solving", paper: "#f0e9d7", ink: "#38362d", accent: "#7c601b", contrast: "#e9cc6e", layout: "spread", screen: "The reworked dark workspace with a Two Sum solution in the editor." },
  cliphop: { alt: "AI concept: three skateboard exposures in a hot-pink and mint zine collage", medium: "Motion collage / short clips", paper: "#f2e0e7", ink: "#4d293c", accent: "#963d68", contrast: "#bfe4d5", layout: "sequence", screen: "The reworked night feed, reading posts from the project's Sanity dataset." },
};

export const projectArtPath = (slug: PortfolioProjectSlug) => `/project-media/art-direction/${slug}-v1.webp`;
