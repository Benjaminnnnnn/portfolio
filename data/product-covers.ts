import type { PortfolioProjectSlug } from "./portfolio-projects";

export const productCovers = {
  relay: { title: "Relay", description: "A job queue that recovers after a worker crash", caption: "Recorded job history · local experiment", kind: "recorded-demo" },
  splendor: { title: "Splendor", description: "Play the gem-trading game together", caption: "Actual game-board capture", kind: "screenshot" },
  "algo-explorer": { title: "AlgoExplorer", description: "Step through algorithms. Ask about each frame.", caption: "Actual pathfinding and tutor capture", kind: "screenshot" },
  "simple-db": { title: "SimpleDB", description: "A Java database, from queries to stored pages", caption: "Actual BufferPool.java excerpt · not a running database UI", kind: "source-code" },
  "petclinic-devops": { title: "PetClinic / DevOps", description: "Build with Jenkins. Deploy to a virtual machine.", caption: "Repository build and VM screenshots · historical captures", kind: "screenshot" },
  "333gle": { title: "333gle", description: "Search documents with a C++ web server", caption: "Actual search-results capture", kind: "screenshot" },
  xv6: { title: "xv6", description: "Inside a teaching operating system", caption: "Existing terminal capture · not a new RISC-V test run", kind: "screenshot" },
  "rss-aggregator": { title: "RSS Aggregator", description: "An API for following and collecting feeds", caption: "Actual Swagger API documentation capture", kind: "screenshot" },
  cypress: { title: "Cypress", description: "Set up your own workspace", caption: "Setup-form reconstruction from the implemented component", kind: "ui-reconstruction" },
  "leetcode-clone": { title: "Coding Practice", description: "Read a problem. Write and test a solution.", caption: "Actual problem and code-editor capture", kind: "screenshot" },
  cliphop: { title: "ClipHop", description: "Discover clips, creators and topics", caption: "Actual video-feed capture", kind: "screenshot" },
  propertize: { title: "Propertize", description: "A dashboard for managing properties", caption: "Actual dashboard capture · demo figures", kind: "screenshot" },
  mems: { title: "Mems", description: "Save places and the stories behind them", caption: "Actual saved-place collection · demo posts", kind: "screenshot" },
} as const satisfies Record<PortfolioProjectSlug, { title: string; description: string; caption: string; kind: string }>;

// Percent crops of original captures. Aspect ratios prevent distorted UI text.
export const coverCrops: Partial<Record<PortfolioProjectSlug, { x: number; y: number; width: number; height: number; ratio: number }>> = {
  splendor: { x: 0, y: 0, width: 100, height: 100, ratio: 1800 / 981 },
  "algo-explorer": { x: 0, y: 0, width: 100, height: 100, ratio: 1800 / 988 },
  "333gle": { x: 0, y: 0, width: 100, height: 100, ratio: 1800 / 988 },
  xv6: { x: 0, y: 7, width: 78, height: 72, ratio: 1800 / 993 },
  "rss-aggregator": { x: 0, y: 14, width: 100, height: 85, ratio: 1800 / 1028 },
  "leetcode-clone": { x: 23.5, y: 21.5, width: 76.5, height: 78.5, ratio: 1800 / 1013 },
  cliphop: { x: 13, y: 0, width: 75, height: 100, ratio: 1800 / 948 },
  propertize: { x: 0, y: 0, width: 100, height: 100, ratio: 1513 / 867 },
  mems: { x: 18, y: 0, width: 64, height: 100, ratio: 1800 / 887 },
};
