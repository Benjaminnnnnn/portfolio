import type { PortfolioProjectSlug } from "./portfolio-projects";

export type DiagramKind = "leases" | "throughput" | "buffer" | "transactions" | "operators" | "environments" | "checks" | "monitoring" | "rules" | "frames" | "workspace" | "practice" | "content" | "fetch" | "search" | "kernel" | "removal" | "itinerary-check" | "refund-gate" | "refund-recovery" | "model3d" | "capture-flow" | "task-detect" | "ppe-compare";
export type StudyVisual = {
  title: string;
  caption: string;
  crop?: { x: number; y: number; width: number; height: number };
  diagram?: DiagramKind;
  replay?: boolean;
};

export const projectScopeNotes: Record<PortfolioProjectSlug, string> = {
  poreia: "Built solo. One model call per request, checked by code rather than by a second model. Itinerary quality has not been formally evaluated.",
  "tartan-tickets": "Team coursework on a starter codebase from the course staff; the repository is private. Refunds, session middleware, metrics, and load tests are my work. Other guardrails are teammates'.",
  companion: "A two-person hackathon MVP with a private repository. The landing page's user counts and rating are placeholder copy, and its object images are image-model renders, not app output.",
  "ppe-motion": "A team practicum for an industry sponsor. The repository and recordings are private, so the drawings here are schematic and contain no study data. The analysis is signal processing, not machine learning.",
  relay: "An AI-assisted systems study. The results are from local tests. Delivery is at least once, so external writes still need duplicate protection.",
  handpick: "Pre-release: there is no public build yet. Captures are App Store screenshots with a demo photo library, not a user's photos.",
  splendor: "Built by a four-person team. The repository credits AI assistance for the interface, art, initial infrastructure, and documentation.",
  "algo-explorer": "The tutor connects to Gemini and OpenAI. Algorithm tests and checked examples for its explanations are still needed.",
  "simple-db": "Coursework built on a teaching framework. The repository includes tests; they have not been rerun for this page.",
  "petclinic-devops": "A course extension of the open-source Spring PetClinic app. The diagrams show the documented VM setup, not a live deployment.",
  "333gle": "UW CSE 333 coursework. The repository includes course-provided code and indexing libraries.",
  xv6: "Coursework on the existing xv6 teaching kernel. The upstream kernel and included networking code belong to their original authors.",
  "rss-aggregator": "A single-service implementation with concurrent fetching. Worker leases and automated tests are not included in this version.",
  cypress: "A workspace prototype with accounts and navigation. The reworked landing page lists only implemented features; AI features remain unfinished.",
  "leetcode-clone": "A coding-practice clone. It does not establish a production-grade isolated code-execution service.",
  cliphop: "The project covers feeds, profiles, and publishing with Sanity. Video encoding and large-scale media delivery are outside its scope.",
};

// Crops refer to the existing project images, not additional product screens.
// Diagrams are explanatory drawings, not captures of running services.
export const projectVisuals: Record<PortfolioProjectSlug, readonly [StudyVisual, StudyVisual, StudyVisual]> = {
  poreia: [
    { title: "One sentence is enough", crop: { x: 20, y: 45.5, width: 60, height: 20 }, caption: "The prompt bar from the live home screen, with its placeholder trip." },
    { title: "Somewhere to start", crop: { x: 21.5, y: 67, width: 57, height: 23 }, caption: "Four example requests: a budget, a mood, a pace, a length." },
    { title: "Before a plan reaches the screen", diagram: "itinerary-check", caption: "Each reply is parsed, validated against the schema, and compared with the requested destination. A mismatch triggers one correction request." },
  ],
  "tartan-tickets": [
    { title: "Ask Scotty", crop: { x: 72.5, y: 30, width: 27, height: 60 }, caption: "The assistant panel on the events page. Signed-out visitors can chat but cannot refund." },
    { title: "Seven checks before money moves", diagram: "refund-gate", caption: "Every refund request passes these in order. Failing one stops the refund and reports why." },
    { title: "If the payment call fails", diagram: "refund-recovery", caption: "The order waits in refund-pending. A sweep asks the payment provider what happened, then finishes or undoes the refund." },
  ],
  companion: [
    { title: "An object worth keeping", crop: { x: 2, y: 42, width: 19, height: 34 }, caption: "A collectible from the landing page. This is an image-model render made for the mock-up." },
    { title: "Small things, kept", crop: { x: 73, y: 0, width: 16, height: 34 }, caption: "A keychain from the same page, also an image-model render." },
    { title: "From photo to model", diagram: "model3d", caption: "Submit the photo, poll the prediction, then download and convert once. Later requests read the cached file." },
  ],
  "ppe-motion": [
    { title: "From capture to comparison", diagram: "capture-flow", caption: "The steps an operator follows. The command line and the browser workspace call the same services." },
    { title: "Cutting a recording into tasks", diagram: "task-detect", caption: "A schematic of one continuous capture. Boundaries are proposed from movement and confirmed by the operator." },
    { title: "One change at a time", diagram: "ppe-compare", caption: "A comparison needs matched trials: the same subject, task, and protocol, with different gear." },
  ],
  relay: [
    { title: "One current owner", diagram: "leases", caption: "A fresh lease token separates the current worker from a late one." },
    { title: "A job after a crash", replay: true, caption: "Recorded local experiment · September 2026" },
    { title: "More execution slots", diagram: "throughput", caption: "3,000 jobs per configuration. One local trial each, including submission and queue drain. These are not production capacity figures." },
  ],
  handpick: [
    { title: "One photo, one choice", crop: { x: 33.6, y: 0, width: 32.4, height: 100 }, caption: "The review screen: Keep, Delete, Undo, and album sorting without leaving the photo." },
    { title: "A manageable set", crop: { x: 0, y: 0, width: 32.4, height: 100 }, caption: "The Organize home offers small sets such as This Week instead of the whole library." },
    { title: "Nothing leaves until you confirm", diagram: "removal", caption: "Deleted photos wait in Handpick's trash. Only a confirmed batch reaches the Photos library." },
  ],
  splendor: [
    { title: "The shared board", crop: { x: 19.5, y: 22, width: 58, height: 55 }, caption: "Detail from the four-player game: card costs, bonuses, and the three decks." },
    { title: "Whose turn is it?", crop: { x: 79, y: 7, width: 20, height: 60 }, caption: "The player panel keeps the current turn and every player's tokens beside the board." },
    { title: "Checking a move", diagram: "rules", caption: "Rule checks happen before an accepted move changes shared game state." },
  ],
  "algo-explorer": [
    { title: "Pause on a frame", crop: { x: 12, y: 35, width: 48, height: 54 }, caption: "The finished A* path. Start, goal, walls and the rebuilt path have different marks." },
    { title: "Ask beside the grid", crop: { x: 73, y: 7, width: 27, height: 93 }, caption: "The tutor panel stays beside the active visualization. This is a crop of the same screen." },
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
    { title: "The entry page", crop: { x: 18, y: 17, width: 64, height: 52 }, caption: "The reworked hero. Its feature list names only what the prototype implements." },
    { title: "Workspace navigation", diagram: "workspace", caption: "A schematic of the implemented account, workspace, and dashboard areas. This is not an editor screenshot." },
    { title: "The data layer", diagram: "content", caption: "Next.js, Supabase, and Drizzle support the workspace prototype. AI features remain unfinished." },
  ],
  "leetcode-clone": [
    { title: "Read the problem", crop: { x: 0, y: 7, width: 50, height: 60 }, caption: "The problem description and first example from the workspace capture." },
    { title: "Code and test cases", crop: { x: 50, y: 7, width: 50, height: 93 }, caption: "The editor and test panel from the same screenshot. Test cases run in the browser, not an isolated server." },
    { title: "A practice workspace", diagram: "practice", caption: "The layout keeps the problem, solution, and feedback within one view." },
  ],
  cliphop: [
    { title: "A clip in the feed", crop: { x: 42, y: 12, width: 47, height: 56 }, caption: "A post groups its creator, video, and reactions." },
    { title: "Browse by topic", crop: { x: 11.5, y: 18, width: 28, height: 42 }, caption: "Topic navigation from the reworked feed." },
    { title: "Clips and creators", diagram: "content", caption: "A conceptual view of the content stored through Sanity." },
  ],
};
