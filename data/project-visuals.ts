import type { PortfolioProjectSlug } from "./portfolio-projects";

export type DiagramKind = "leases" | "throughput" | "buffer" | "transactions" | "operators" | "environments" | "checks" | "monitoring" | "rules" | "frames" | "workspace" | "practice" | "content" | "fetch" | "properties" | "places" | "search" | "kernel";
export type StudyVisual = {
  title: string;
  caption: string;
  crop?: { x: number; y: number; width: number; height: number };
  diagram?: DiagramKind;
  replay?: boolean;
};

export const projectScopeNotes: Record<PortfolioProjectSlug, string> = {
  relay: "An AI-assisted systems study. The results are from local tests. Delivery is at least once, so external writes still need duplicate protection.",
  splendor: "Built by a four-person team. The repository credits AI assistance for the interface, art, initial infrastructure, and documentation.",
  "algo-explorer": "The tutor connects to Gemini and OpenAI. Algorithm tests and checked examples for its explanations are still needed.",
  "simple-db": "Coursework built on a teaching framework. The repository includes tests; they have not been rerun for this page.",
  "petclinic-devops": "A course extension of the open-source Spring PetClinic app. The diagrams show the documented VM setup, not a live deployment.",
  "333gle": "UW CSE 333 coursework. The repository includes course-provided code and indexing libraries.",
  xv6: "Coursework on the existing xv6 teaching kernel. The upstream kernel and included networking code belong to their original authors.",
  "rss-aggregator": "A single-service implementation with concurrent fetching. Worker leases and automated tests are not included in this version.",
  cypress: "A workspace prototype with accounts and navigation. The landing page advertises features beyond the verified implementation; AI features remain unfinished.",
  "leetcode-clone": "A coding-practice clone. It does not establish a production-grade isolated code-execution service.",
  cliphop: "The project covers feeds, profiles, and publishing with Sanity. Video encoding and large-scale media delivery are outside its scope.",
  propertize: "Dashboard numbers are demo content, not measured business results.",
  mems: "The gallery uses existing project captures with demo travel posts.",
};

// Crops refer to the existing project images, not additional product screens.
// Diagrams are explanatory drawings, not captures of running services.
export const projectVisuals: Record<PortfolioProjectSlug, readonly [StudyVisual, StudyVisual, StudyVisual]> = {
  relay: [
    { title: "One current owner", diagram: "leases", caption: "A fresh lease token separates the current worker from a late one." },
    { title: "A job after a crash", replay: true, caption: "Recorded local experiment · September 2026" },
    { title: "More execution slots", diagram: "throughput", caption: "3,000 jobs per configuration. One local trial each, including submission and queue drain. These are not production capacity figures." },
  ],
  splendor: [
    { title: "The shared board", crop: { x: 18, y: 22, width: 59, height: 57 }, caption: "Detail from the game screenshot: card costs, bonuses, and available decks." },
    { title: "Whose turn is it?", crop: { x: 80, y: 7, width: 19, height: 28 }, caption: "The player panel keeps the current turn and prestige points beside the board." },
    { title: "Checking a move", diagram: "rules", caption: "Rule checks happen before an accepted move changes shared game state." },
  ],
  "algo-explorer": [
    { title: "Pause on a frame", crop: { x: 14, y: 34, width: 45, height: 57 }, caption: "Detail from the A* screenshot. Start, goal, and blocked cells have different marks." },
    { title: "Ask beside the grid", crop: { x: 75, y: 8, width: 24, height: 77 }, caption: "The tutor panel stays beside the active visualization. This is a crop of the same screen." },
    { title: "What the tutor receives", diagram: "frames", caption: "The active frame gives the question a specific algorithm state to refer to." },
  ],
  "simple-db": [
    { title: "Inside the buffer pool", diagram: "buffer", caption: "Conceptual cache example. The default page size in BufferPool is 4 KiB." },
    { title: "Two ways to finish", diagram: "transactions", caption: "Commit writes dirty pages; abort restores pages from disk. Both release locks." },
    { title: "Below a query", diagram: "operators", caption: "A conceptual operator tree showing how a query reaches stored pages." },
  ],
  "petclinic-devops": [
    { title: "Two environments", diagram: "environments", caption: "Environment boundaries from the repository's VM setup guide." },
    { title: "Different checks", diagram: "checks", caption: "Build, code analysis, and running-app security checks serve different purposes. No current pass result is shown." },
    { title: "After deployment", diagram: "monitoring", caption: "The documented monitoring setup. This is an architecture drawing, not live telemetry." },
  ],
  "333gle": [
    { title: "A query in the browser", crop: { x: 34, y: 0, width: 35, height: 32 }, caption: "The search form from the existing application screenshot." },
    { title: "Matching documents", crop: { x: 0, y: 37, width: 57, height: 60 }, caption: "Results for “hello” in the captured example. The page reports 44 matches." },
    { title: "Serving a request", diagram: "search", caption: "A connection is assigned to the thread pool; query handling reads the prepared index." },
  ],
  xv6: [
    { title: "From shell to kernel", diagram: "kernel", caption: "A conceptual view of the teaching kernel. It does not represent a new operating system authored from scratch." },
    { title: "Files in the shell", crop: { x: 0, y: 27, width: 39, height: 71 }, caption: "Detail from the existing terminal image. This older capture is not evidence of a new RISC-V test run." },
    { title: "Processes and resources", diagram: "operators", caption: "A simplified resource hierarchy for studying the kernel, not a runtime trace." },
  ],
  "rss-aggregator": [
    { title: "The feed endpoints", crop: { x: 1, y: 71, width: 54, height: 28 }, caption: "The existing Swagger screen lists feed retrieval and creation routes." },
    { title: "A concurrent batch", diagram: "fetch", caption: "The ticker starts a batch; the wait group waits for its goroutines. This version has no worker leases." },
    { title: "Readers and feeds", diagram: "content", caption: "Conceptual data relationships behind subscriptions and collected posts." },
  ],
  cypress: [
    { title: "The entry page", crop: { x: 0, y: 0, width: 100, height: 50 }, caption: "Existing landing-page image. Its marketing copy includes features beyond the verified prototype." },
    { title: "Workspace navigation", diagram: "workspace", caption: "A schematic of the implemented account, workspace, and dashboard areas. This is not an editor screenshot." },
    { title: "The data layer", diagram: "content", caption: "Next.js, Supabase, and Drizzle support the workspace prototype. AI features remain unfinished." },
  ],
  "leetcode-clone": [
    { title: "Read the problem", crop: { x: 24, y: 28, width: 37, height: 43 }, caption: "The problem description and example from the existing screenshot." },
    { title: "Code and test cases", crop: { x: 62, y: 28, width: 38, height: 72 }, caption: "The editor and test panel from the same screenshot. This does not establish isolated server-side execution." },
    { title: "A practice workspace", diagram: "practice", caption: "The layout keeps the problem, solution, and feedback within one view." },
  ],
  cliphop: [
    { title: "A clip in the feed", crop: { x: 43, y: 13, width: 43, height: 62 }, caption: "The captured post groups its creator, video, and reactions." },
    { title: "Browse by topic", crop: { x: 14, y: 21, width: 26, height: 47 }, caption: "Topic navigation from the existing feed screenshot." },
    { title: "Clips and creators", diagram: "content", caption: "A conceptual view of the content stored through Sanity." },
  ],
  propertize: [
    { title: "The dashboard overview", crop: { x: 6, y: 18, width: 92, height: 15 }, caption: "Summary cards from the dashboard screenshot. The numbers are demo content, not business results." },
    { title: "Chart details", crop: { x: 6, y: 37, width: 54, height: 62 }, caption: "The chart compares two example series. It is an interface example, not measured revenue." },
    { title: "Editing a property", diagram: "properties", caption: "A conceptual record view for the project's create, read, update, and delete operations." },
  ],
  mems: [
    { title: "A place and its story", crop: { x: 61, y: 9, width: 20, height: 61 }, caption: "A destination card from the existing screenshot, with image, address, and description." },
    { title: "A personal collection", crop: { x: 19, y: 8, width: 62, height: 64 }, caption: "The saved-place grid. Existing demo posts are shown as they appeared in the capture." },
    { title: "The parts of a post", diagram: "places", caption: "A conceptual post model for the React, Node.js, and MongoDB application." },
  ],
};
