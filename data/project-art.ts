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
  relay: { alt: "AI concept: orange job tokens meet at a junction in brushed-metal channels", medium: "Machined metal / queue study", paper: "#e5e9eb", ink: "#26333b", accent: "#a43f23", contrast: "#f4c4ab", layout: "sequence" },
  splendor: { alt: "AI concept: colored gems, brass tokens and blank cards on plum velvet", medium: "Velvet & gemstones", paper: "#ebe1e8", ink: "#402334", accent: "#704158", contrast: "#e3d9a4", layout: "spread", screen: "The multiplayer board, captured from the project." },
  "algo-explorer": { alt: "AI concept: orange thread exploring a folded blue paper maze", medium: "Cut paper / path study", paper: "#e0e9f6", ink: "#203855", accent: "#315c97", contrast: "#f0bc8b", layout: "sequence", screen: "The A* visualization and tutor in the same workspace." },
  "simple-db": { alt: "AI concept: green-tabbed archive cards with one coral record pulled forward", medium: "Paper archive / stored records", paper: "#e6e9dc", ink: "#2c4236", accent: "#456448", contrast: "#e8b3a0", layout: "diptych" },
  "petclinic-devops": { alt: "AI concept: blue and terracotta linocut of a modular clinic with a dog and cat", medium: "Two-color linocut", paper: "#e2eaf2", ink: "#233e5f", accent: "#375d8b", contrast: "#edc5a5", layout: "sequence" },
  "333gle": { alt: "AI concept: orange magnifying glass isolates a blue mark in a paper collage", medium: "Print collage / document search", paper: "#f1e8d6", ink: "#333129", accent: "#9f4924", contrast: "#c3d3ee", layout: "diptych", screen: "The original search interface and captured results." },
  xv6: { alt: "AI concept: phosphor-green memory-like cells glowing through curved CRT glass", medium: "Phosphor / analog light", paper: "#18231c", ink: "#dfebd5", accent: "#aac985", contrast: "#384c31", layout: "spread" },
  "rss-aggregator": { alt: "AI concept: coral printed ribbons converge into a teal stream on seafoam paper", medium: "Screenprint / collected feeds", paper: "#dcece6", ink: "#1c4945", accent: "#347970", contrast: "#f0b6a4", layout: "sequence", screen: "Existing Swagger documentation for the API, not a reader-app mockup." },
  cypress: { alt: "AI concept: plum and chartreuse folded documents form a branching paper sculpture", medium: "Folded paper / workspace study", paper: "#e9e0ef", ink: "#49324e", accent: "#71537b", contrast: "#dbe0ad", layout: "diptych", screen: "Existing landing-page capture. Some advertised features are unfinished." },
  "leetcode-clone": { alt: "AI concept: a yellow angular puzzle piece between graphite forms in a woodblock print", medium: "Woodblock / problem solving", paper: "#f0e9d7", ink: "#38362d", accent: "#7c601b", contrast: "#e9cc6e", layout: "spread", screen: "The problem, editor and test panel in the existing capture." },
  cliphop: { alt: "AI concept: three skateboard exposures in a hot-pink and mint zine collage", medium: "Motion collage / short clips", paper: "#f2e0e7", ink: "#4d293c", accent: "#963d68", contrast: "#bfe4d5", layout: "sequence", screen: "The original video feed with topic navigation and creator information." },
  propertize: { alt: "AI concept: terracotta architectural models cast long shadows over a blue courtyard", medium: "Architectural model / light study", paper: "#e0eaf1", ink: "#2c4353", accent: "#536f88", contrast: "#edc0a3", layout: "diptych", screen: "The dashboard as captured. All displayed figures are demo content." },
  mems: { alt: "AI concept: imagined coastal travel photographs on peach paper with a sea-glass pebble", medium: "Film collage / imagined places", paper: "#f0e1d6", ink: "#4d3e34", accent: "#86634c", contrast: "#bfd8cf", layout: "spread", screen: "The saved-place collection from the existing project screenshot." },
};

export const projectArtPath = (slug: PortfolioProjectSlug) => `/project-media/art-direction/${slug}-v1.webp`;
