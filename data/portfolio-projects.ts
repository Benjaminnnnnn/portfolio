export type ProjectMetric = {
  value: string;
  label: string;
};

export type ProjectChapter = {
  eyebrow: string;
  title: string;
  body: readonly string[];
};

export type ProjectFlowStep = {
  label: string;
  detail: string;
};

export type PortfolioProject = {
  slug: string;
  title: string;
  category: string;
  context: string;
  headline: string;
  summary: string;
  cover: string;
  coverAlt: string;
  accent: string;
  stack: readonly string[];
  sourceUrl: string;
  metrics: readonly ProjectMetric[];
  chapters: readonly ProjectChapter[];
  flow: readonly ProjectFlowStep[];
  editorialVisual?: {
    src: string;
    alt: string;
    caption: string;
  };
};

export const projectOrder = [
  "algo-explorer",
  "splendor",
  "cypress",
  "leetcode-clone",
  "cliphop",
  "rss-aggregator",
  "propertize",
  "mems",
  "333gle",
  "xv6",
] as const;

export const portfolioProjects = {
  "algo-explorer": {
    slug: "algo-explorer",
    title: "AlgoExplorer",
    category: "AI learning tool",
    context: "Independent product",
    headline: "Make algorithms observable, one frame at a time.",
    summary:
      "An interactive data-structures and algorithms playground that combines step-by-step visualization, implementation notes, complexity guidance, and an AI tutor grounded in the learner's current frame.",
    cover: "/project-media/algo.webp",
    coverAlt: "AlgoExplorer visualizing an A-star pathfinding algorithm beside an AI tutor",
    accent: "#8d5bff",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Gemini", "ChatGPT"],
    sourceUrl: "https://github.com/Benjaminnnnnn/algo-explorer",
    metrics: [
      { value: "20+", label: "algorithms and data structures" },
      { value: "10+", label: "visualization data models" },
      { value: "2", label: "context-aware AI tutor modes" },
    ],
    chapters: [
      {
        eyebrow: "01 / Problem",
        title: "A visualizer is only useful when the learner can follow the state.",
        body: [
          "Algorithm demos often animate the final answer without explaining the transition that produced it. The product needed to make every meaningful step inspectable while staying flexible enough for grids, trees, graphs, arrays, and other data structures.",
          "AI explanations introduced a second systems problem: the tutor needed the live visualization context, not a generic description of the algorithm.",
        ],
      },
      {
        eyebrow: "02 / System",
        title: "A shared frame model separates algorithm execution from presentation.",
        body: [
          "I modeled an extensible frame type that represents algorithm-specific state across more than ten data-structure families. Playback controls consume that common timeline while each visualization renders only the state it understands.",
          "That separation keeps stepping, speed, reset, and navigation behavior consistent without forcing every algorithm into the same visual shape.",
        ],
      },
      {
        eyebrow: "03 / Learning loop",
        title: "The interface keeps code, complexity, animation, and explanation in one loop.",
        body: [
          "Learners can move through an algorithm frame by frame, compare implementations, review complexity, and ask Gemini or ChatGPT about the exact state on screen. A command palette shortens the path between exploration and action.",
        ],
      },
    ],
    flow: [
      { label: "Choose", detail: "Select an algorithm or data structure." },
      { label: "Execute", detail: "Produce a typed sequence of state frames." },
      { label: "Inspect", detail: "Scrub, replay, and compare implementations." },
      { label: "Ask", detail: "Send the active frame to a contextual AI tutor." },
    ],
    editorialVisual: {
      src: "/project-media/algo-system.webp",
      alt: "Conceptual step sequence connecting algorithm frames to contextual intelligence",
      caption: "Conceptual learning-system visualization created for this case study with GPT Image 2.",
    },
  },
  splendor: {
    slug: "splendor",
    title: "Splendor",
    category: "Real-time multiplayer",
    context: "Four-person team project",
    headline: "Turn a rule-dense tabletop game into a reliable shared system.",
    summary:
      "A real-time web adaptation of Splendor with multiplayer lobbies, chat, betting, notifications, achievements, and AI coaching, backed by a deliberate domain model and a broad automated test strategy.",
    cover: "/project-media/splendor.webp",
    coverAlt: "A multiplayer Splendor game board with cards, tokens, players, and an AI advisor",
    accent: "#7357ff",
    stack: ["React", "TypeScript", "Node.js", "Express", "Socket.IO", "SQLite", "Playwright"],
    sourceUrl: "https://github.com/Benjaminnnnnn/splendor",
    metrics: [
      { value: "4", label: "engineers on the team" },
      { value: "5", label: "complementary testing layers" },
      { value: "Live", label: "multiplayer state and chat" },
    ],
    chapters: [
      {
        eyebrow: "01 / Challenge",
        title: "Every move has to be legal, ordered, and identical for every player.",
        body: [
          "A multiplayer board game combines strict domain rules with unreliable network timing. The experience needed a single source of truth for turn state, purchases, reservations, tokens, lobbies, and social features without letting client behavior redefine the rules.",
        ],
      },
      {
        eyebrow: "02 / Architecture",
        title: "Domain-driven commands keep gameplay rules explicit.",
        body: [
          "The game logic uses domain-driven boundaries and command-style actions. Each command validates intent, applies a legal state transition, and produces a clean contract for the API and Socket.IO layer.",
          "SQLite persistence and bcrypt-backed authentication support player accounts, while the real-time layer coordinates lobbies, chat, notifications, betting, and achievements.",
        ],
      },
      {
        eyebrow: "03 / Quality",
        title: "Reliability is tested from rules to real browser journeys.",
        body: [
          "The project combines unit, integration, end-to-end, property-based, and mutation testing with Vitest, Playwright, fast-check, and Stryker. Together they check specific examples, generated edge cases, browser flows, and whether assertions are strong enough to catch intentional faults.",
        ],
      },
    ],
    flow: [
      { label: "Intent", detail: "A player sends a typed game command." },
      { label: "Validate", detail: "The domain checks turn and rule constraints." },
      { label: "Commit", detail: "The server applies and persists the transition." },
      { label: "Broadcast", detail: "Socket.IO synchronizes every connected player." },
    ],
    editorialVisual: {
      src: "/project-media/splendor-system.webp",
      alt: "Conceptual multiplayer game-state engine connected to four players",
      caption: "Conceptual real-time game-system visualization created for this case study with GPT Image 2.",
    },
  },
  cypress: {
    slug: "cypress",
    title: "Cypress",
    category: "Collaborative workspace",
    context: "Full-stack product build",
    headline: "A calm writing surface for work that is live, versioned, and assisted.",
    summary:
      "A Notion-inspired workspace for collaborative documents, version history, and AI-assisted summaries and action items, built on a typed Next.js and PostgreSQL stack.",
    cover: "/project-media/cypress.webp",
    coverAlt: "Cypress collaboration platform landing interface in a dark violet visual system",
    accent: "#7d3cff",
    stack: ["Next.js", "React", "TypeScript", "Supabase", "Drizzle ORM", "PostgreSQL"],
    sourceUrl: "https://github.com/Benjaminnnnnn/cypress",
    metrics: [
      { value: "Live", label: "collaborative document editing" },
      { value: "Versioned", label: "document history" },
      { value: "AI", label: "summaries and action items" },
    ],
    chapters: [
      {
        eyebrow: "01 / Product",
        title: "Collaboration should add presence without adding noise.",
        body: [
          "The product brings documents, workspaces, clients, and project context into one interface. The central challenge was keeping the writing experience focused while still making collaboration, history, and assistant features discoverable.",
        ],
      },
      {
        eyebrow: "02 / Data",
        title: "Typed persistence gives collaborative features a stable foundation.",
        body: [
          "Next.js provides the application shell, Supabase supports the connected backend, and Drizzle ORM defines the PostgreSQL model in TypeScript. The result is a shared vocabulary from database records to interface state.",
        ],
      },
      {
        eyebrow: "03 / Assistance",
        title: "AI is placed beside the work, not in front of it.",
        body: [
          "Assistant actions focus on concrete document jobs such as producing a summary or extracting action items. Version history preserves a clear path back as documents and generated outputs evolve.",
        ],
      },
    ],
    flow: [
      { label: "Write", detail: "Create and organize documents in a workspace." },
      { label: "Sync", detail: "Share live document state with collaborators." },
      { label: "Preserve", detail: "Track meaningful versions over time." },
      { label: "Assist", detail: "Summarize content and surface action items." },
    ],
    editorialVisual: {
      src: "/project-media/cypress-system.webp",
      alt: "Conceptual document versions flowing through an AI summarization lens",
      caption: "Conceptual collaboration-system visualization created for this case study with GPT Image 2.",
    },
  },
  "leetcode-clone": {
    slug: "leetcode-clone",
    title: "LeetCode Clone",
    category: "Developer learning",
    context: "Independent full-stack build",
    headline: "Keep the problem, code, and feedback in one focused workspace.",
    summary:
      "A coding-practice application with searchable challenges, an in-browser editor, examples, complexity notes, and submission feedback in a responsive two-panel workspace.",
    cover: "/project-media/leetcode.webp",
    coverAlt: "LeetCode clone showing a problem list and a dark code editor workspace",
    accent: "#f4a72c",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Firebase"],
    sourceUrl: "https://github.com/Benjaminnnnnn/leetcode-clone",
    metrics: [
      { value: "2-pane", label: "problem and editor workspace" },
      { value: "Typed", label: "React application state" },
      { value: "Instant", label: "submission feedback loop" },
    ],
    chapters: [
      {
        eyebrow: "01 / Experience",
        title: "Practice works best when context switching disappears.",
        body: [
          "The interface keeps the problem statement, examples, constraints, notes, and editor visible together. Filtering by category and difficulty makes it easy to move from browsing to solving without losing orientation.",
        ],
      },
      {
        eyebrow: "02 / Interface",
        title: "A responsive split view protects the coding task.",
        body: [
          "The workspace gives the editor the visual weight it needs while preserving readable problem context. Theme controls and compact navigation support longer sessions without overwhelming the primary task.",
        ],
      },
      {
        eyebrow: "03 / Platform",
        title: "Firebase supports the application services behind the practice loop.",
        body: [
          "The Next.js and TypeScript front end connects the challenge and user flows to Firebase, keeping the implementation compact while still covering the full product journey from discovery to submitted work.",
        ],
      },
    ],
    flow: [
      { label: "Discover", detail: "Filter the available coding challenges." },
      { label: "Understand", detail: "Review examples, constraints, and notes." },
      { label: "Solve", detail: "Write and run a solution in the browser." },
      { label: "Learn", detail: "Use the result to refine the next attempt." },
    ],
    editorialVisual: {
      src: "/project-media/leetcode-system.webp",
      alt: "Conceptual coding-practice loop passing abstract code blocks through a test gate",
      caption: "Conceptual practice-loop visualization created for this case study with GPT Image 2.",
    },
  },
  cliphop: {
    slug: "cliphop",
    title: "ClipHop",
    category: "Social video",
    context: "Independent product build",
    headline: "A short-form video feed with enough structure to keep discovery human.",
    summary:
      "An immersive social video application with topic discovery, profiles, search, uploads, and reactions, using Sanity as a flexible content backend and OAuth for account access.",
    cover: "/project-media/cliphop.webp",
    coverAlt: "ClipHop video playground with a discovery sidebar and vertical social posts",
    accent: "#ff6b78",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Sanity", "OAuth 2.0"],
    sourceUrl: "https://github.com/Benjaminnnnnn/cliphop",
    metrics: [
      { value: "Feed", label: "topic-led video discovery" },
      { value: "Social", label: "profiles and reactions" },
      { value: "CMS", label: "structured Sanity content" },
    ],
    chapters: [
      {
        eyebrow: "01 / Product",
        title: "A video feed still needs landmarks.",
        body: [
          "ClipHop balances an immersive central feed with stable navigation for topics, search, account suggestions, and profiles. The layout keeps the current clip prominent without hiding where the user can go next.",
        ],
      },
      {
        eyebrow: "02 / Content",
        title: "Structured content keeps uploads and discovery flexible.",
        body: [
          "Sanity provides the content model behind clips, creators, and topics. Next.js and Tailwind CSS turn that model into a responsive experience, while OAuth 2.0 supports account-aware publishing and interaction.",
        ],
      },
      {
        eyebrow: "03 / Interaction",
        title: "Small social signals make a media surface feel alive.",
        body: [
          "Profile context, reaction counts, topic filters, and creator suggestions surround the core viewing experience with just enough participation and discovery affordance.",
        ],
      },
    ],
    flow: [
      { label: "Enter", detail: "Land in a focused stream of clips." },
      { label: "Discover", detail: "Move through topics, search, and creators." },
      { label: "React", detail: "Respond to the content and its author." },
      { label: "Publish", detail: "Upload media into a structured content model." },
    ],
    editorialVisual: {
      src: "/project-media/cliphop-system.webp",
      alt: "Conceptual vertical media frames connected by topic paths and social signals",
      caption: "Conceptual content-system visualization created for this case study with GPT Image 2.",
    },
  },
  "rss-aggregator": {
    slug: "rss-aggregator",
    title: "RSS Aggregator",
    category: "Go backend service",
    context: "Independent systems project",
    headline: "Turn many changing feeds into one dependable reading pipeline.",
    summary:
      "An RSS subscription and scraping service built in Go, with a documented HTTP API and PostgreSQL persistence generated through sqlc.",
    cover: "/project-media/rssagg.webp",
    coverAlt: "Swagger documentation for the RSS feed API with health and feed endpoints",
    accent: "#69a9ff",
    stack: ["Go", "go-chi", "PostgreSQL", "sqlc", "REST"],
    sourceUrl: "https://github.com/Benjaminnnnnn/go-rssagg",
    metrics: [
      { value: "Go", label: "concurrent feed processing" },
      { value: "REST", label: "documented service contract" },
      { value: "SQL", label: "typed PostgreSQL queries" },
    ],
    chapters: [
      {
        eyebrow: "01 / Service",
        title: "Feeds update independently; the reader should not have to care.",
        body: [
          "The service separates subscription management from feed retrieval so sources can be refreshed on their own schedules. A concise HTTP surface lets clients create, follow, and query feeds through a consistent contract.",
        ],
      },
      {
        eyebrow: "02 / Backend",
        title: "A small Go stack keeps concurrency and routing legible.",
        body: [
          "go-chi handles HTTP routing, PostgreSQL stores feed and follow state, and sqlc turns SQL into typed Go operations. The architecture stays close to the underlying protocols instead of hiding them behind a large framework.",
        ],
      },
      {
        eyebrow: "03 / Operability",
        title: "The API documents the service as clearly as the code does.",
        body: [
          "Health checks and browsable endpoint documentation make the service easier to inspect and integrate. Explicit resources keep error handling and ownership boundaries visible.",
        ],
      },
    ],
    flow: [
      { label: "Subscribe", detail: "Register a feed and a reader relationship." },
      { label: "Schedule", detail: "Select sources ready for another refresh." },
      { label: "Fetch", detail: "Retrieve and parse each source concurrently." },
      { label: "Persist", detail: "Store normalized entries for client queries." },
    ],
    editorialVisual: {
      src: "/project-media/rssagg-system.webp",
      alt: "Conceptual feed sources flowing through a normalizer into ordered content records",
      caption: "Conceptual aggregation-pipeline visualization created for this case study with GPT Image 2.",
    },
  },
  propertize: {
    slug: "propertize",
    title: "Propertize",
    category: "Operations dashboard",
    context: "Full-stack CRUD product",
    headline: "Make a dense property operation feel easy to scan and act on.",
    summary:
      "A real-estate management dashboard for property records, customer activity, referrals, and performance reporting, with authenticated full-stack CRUD workflows.",
    cover: "/project-media/propertize.webp",
    coverAlt: "Propertize dashboard with property totals, revenue chart, and referral breakdowns",
    accent: "#3f68ff",
    stack: ["React", "TypeScript", "Material UI", "Node.js", "MongoDB", "OAuth 2.0"],
    sourceUrl: "https://github.com/Benjaminnnnnn/propertize",
    metrics: [
      { value: "CRUD", label: "complete property workflows" },
      { value: "OAuth", label: "account access" },
      { value: "Live", label: "dashboard summaries" },
    ],
    chapters: [
      {
        eyebrow: "01 / Information",
        title: "Operational data should reveal priorities before details.",
        body: [
          "The dashboard leads with a compact status layer, then uses charts and referral breakdowns to make patterns visible. Navigation remains stable as users move between properties, customers, messages, and settings.",
        ],
      },
      {
        eyebrow: "02 / Workflow",
        title: "Common property actions share a predictable structure.",
        body: [
          "Create, read, update, and delete flows use consistent React and Material UI patterns. That consistency reduces the cognitive cost of maintaining many records and creates clear places for validation and feedback.",
        ],
      },
      {
        eyebrow: "03 / Stack",
        title: "The interface and data service meet at a straightforward API boundary.",
        body: [
          "A Node.js service persists property data in MongoDB, while OAuth 2.0 handles identity. The typed React client keeps the operational surface responsive and maintainable.",
        ],
      },
    ],
    flow: [
      { label: "Overview", detail: "Scan portfolio and customer indicators." },
      { label: "Find", detail: "Navigate to the record that needs attention." },
      { label: "Act", detail: "Create or update property information." },
      { label: "Review", detail: "Return to an updated operational picture." },
    ],
    editorialVisual: {
      src: "/project-media/propertize-system.webp",
      alt: "Conceptual property portfolio connecting buildings to clear operational controls",
      caption: "Conceptual operations-system visualization created for this case study with GPT Image 2.",
    },
  },
  mems: {
    slug: "mems",
    title: "Mems",
    category: "Travel social product",
    context: "Full-stack product build",
    headline: "Collect places as stories, not just pins on a map.",
    summary:
      "A travel-focused social platform for sharing memorable places through visual cards, location context, personal posts, and community discovery.",
    cover: "/project-media/mems.webp",
    coverAlt: "Mems travel platform displaying a grid of destination cards on a dark interface",
    accent: "#4ea1ff",
    stack: ["React", "Node.js", "MongoDB", "Google Cloud Platform"],
    sourceUrl: "https://github.com/Benjaminnnnnn/mems",
    metrics: [
      { value: "Places", label: "location-led storytelling" },
      { value: "Social", label: "shared travel memories" },
      { value: "Cloud", label: "hosted media and services" },
    ],
    chapters: [
      {
        eyebrow: "01 / Idea",
        title: "A saved place becomes more useful when it carries a point of view.",
        body: [
          "Mems treats destinations as personal stories. Image-led cards combine place names, location details, and descriptions so a collection feels both useful for planning and expressive enough to share.",
        ],
      },
      {
        eyebrow: "02 / Discovery",
        title: "The grid supports browsing without flattening every destination.",
        body: [
          "A responsive card system creates a consistent rhythm across very different places. Ownership controls and profile context distinguish personal collections from community discovery.",
        ],
      },
      {
        eyebrow: "03 / Platform",
        title: "A familiar full-stack model supports posts, people, and media.",
        body: [
          "React delivers the browsing and authoring experience, Node.js and MongoDB manage the underlying social records, and Google Cloud Platform supports the deployed service and media workflow.",
        ],
      },
    ],
    flow: [
      { label: "Remember", detail: "Create a place with story and imagery." },
      { label: "Organize", detail: "Keep personal destinations together." },
      { label: "Share", detail: "Publish a memory to the community." },
      { label: "Discover", detail: "Find the next place through other people." },
    ],
    editorialVisual: {
      src: "/project-media/mems-system.webp",
      alt: "Conceptual travel-memory cards connected across a topographic collection",
      caption: "Conceptual travel-memory visualization created for this case study with GPT Image 2.",
    },
  },
  "333gle": {
    slug: "333gle",
    title: "333gle",
    category: "Search systems",
    context: "C++ systems project",
    headline: "Search millions of index files without making the query wait in line.",
    summary:
      "A multithreaded search engine that uses in-memory data structures to perform multi-query retrieval across millions of indexed files.",
    cover: "/project-media/333gle.webp",
    coverAlt: "333gle search results page returning matches for a query",
    accent: "#f3a31b",
    stack: ["C++", "Multithreading", "In-memory indexing", "GDB", "Valgrind"],
    sourceUrl: "https://github.com/Benjaminnnnnn/333gle",
    metrics: [
      { value: "Millions", label: "of index files supported" },
      { value: "Parallel", label: "multi-query execution" },
      { value: "C++", label: "memory-conscious implementation" },
    ],
    chapters: [
      {
        eyebrow: "01 / Constraint",
        title: "The corpus is large, but the answer still has to feel immediate.",
        body: [
          "Scanning documents at query time does not scale to a collection measured in millions of files. The system needed to move the expensive work into indexing, keep the searchable structure in memory, and distribute independent query work safely.",
        ],
      },
      {
        eyebrow: "02 / Engine",
        title: "Index once, then let threads share the retrieval work.",
        body: [
          "The engine builds in-memory structures that map query terms to candidate documents. Multiple query operations can then run across the prepared index instead of repeatedly touching the source corpus.",
          "Concurrency improves throughput while explicit ownership and synchronization keep shared state understandable.",
        ],
      },
      {
        eyebrow: "03 / Verification",
        title: "Systems code is only fast when its memory behavior is trustworthy.",
        body: [
          "GDB supports step-level debugging and Valgrind helps surface leaks and invalid memory access. Those tools are part of the engineering loop, not an afterthought to the final executable.",
        ],
      },
    ],
    flow: [
      { label: "Parse", detail: "Read the source corpus into indexable terms." },
      { label: "Index", detail: "Build compact in-memory lookup structures." },
      { label: "Dispatch", detail: "Assign independent query work to threads." },
      { label: "Rank", detail: "Merge matches into a concise result set." },
    ],
    editorialVisual: {
      src: "/project-media/333gle-system.webp",
      alt: "Conceptual lattice showing parallel query paths moving through an in-memory index",
      caption: "Conceptual system visualization created for this case study with GPT Image 2.",
    },
  },
  xv6: {
    slug: "xv6",
    title: "xv6",
    category: "Operating systems",
    context: "RISC-V systems project",
    headline: "Learn an operating system by changing the machinery itself.",
    summary:
      "A teaching-oriented RISC-V operating-system project exploring core Unix behavior, concurrency, threads, process state, and low-level debugging in a Linux environment.",
    cover: "/project-media/xv6.webp",
    coverAlt: "xv6 terminal showing a running Unix-like file system and shell commands",
    accent: "#ff7367",
    stack: ["C", "RISC-V", "Linux", "Threads", "Concurrency"],
    sourceUrl: "https://github.com/Benjaminnnnnn/xv6",
    metrics: [
      { value: "RISC-V", label: "instruction-set target" },
      { value: "Kernel", label: "process and memory work" },
      { value: "Threads", label: "concurrency implementation" },
    ],
    chapters: [
      {
        eyebrow: "01 / Model",
        title: "xv6 is small enough to read and complete enough to behave like a system.",
        body: [
          "The project uses a compact teaching kernel to make operating-system mechanisms tangible. Shell commands, processes, system calls, files, and memory all connect to code that can be traced rather than treated as a black box.",
        ],
      },
      {
        eyebrow: "02 / Concurrency",
        title: "Threads turn simple control flow into shared-state design.",
        body: [
          "Adding and reasoning about threads requires deliberate process state, scheduling behavior, synchronization, and cleanup. The work focuses on those boundaries and on the invariants that keep simultaneous execution safe.",
        ],
      },
      {
        eyebrow: "03 / Debugging",
        title: "At kernel level, every abstraction eventually becomes an address or instruction.",
        body: [
          "The Linux and RISC-V workflow makes failures concrete: inspect registers, trace execution, follow memory, and connect user-visible shell behavior back to the kernel path that produced it.",
        ],
      },
    ],
    flow: [
      { label: "Request", detail: "A user program crosses the system-call boundary." },
      { label: "Schedule", detail: "The kernel selects runnable process or thread state." },
      { label: "Protect", detail: "Locks guard shared memory and resources." },
      { label: "Return", detail: "Execution resumes with updated user-visible state." },
    ],
    editorialVisual: {
      src: "/project-media/xv6-system.webp",
      alt: "Conceptual kernel machine with four execution threads, locks, and memory blocks",
      caption: "Conceptual system visualization created for this case study with GPT Image 2.",
    },
  },
} as const satisfies Record<(typeof projectOrder)[number], PortfolioProject>;

export type PortfolioProjectSlug = keyof typeof portfolioProjects;

export const projects = projectOrder.map((slug) => portfolioProjects[slug]);

export function isPortfolioProjectSlug(slug: string): slug is PortfolioProjectSlug {
  return slug in portfolioProjects;
}

export function getNextProject(slug: PortfolioProjectSlug) {
  const index = projectOrder.indexOf(slug);
  const nextSlug = projectOrder[(index + 1) % projectOrder.length];
  return portfolioProjects[nextSlug];
}
