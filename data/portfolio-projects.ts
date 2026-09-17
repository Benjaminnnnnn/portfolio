import { systemsProjects } from "./systems-projects";

export type ProjectMetric = {
  value: string;
  label: string;
};

export type ProjectChapter = {
  eyebrow: string;
  title: string;
  body: readonly string[];
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
  coverCaption?: string;
  accent: string;
  stack: readonly string[];
  sourceUrl: string;
  sourceStatus?: "pending";
  metrics: readonly ProjectMetric[];
  chapters: readonly ProjectChapter[];
  evidence?: readonly { label: string; href: string }[];
};

export const projectOrder = [
  "relay", "splendor", "algo-explorer", "simple-db", "petclinic-devops",
  "333gle", "xv6", "rss-aggregator", "cypress", "leetcode-clone",
  "cliphop", "propertize", "mems",
] as const;

export const portfolioProjects = {
  ...systemsProjects,
  "algo-explorer": {
    slug: "algo-explorer",
    title: "AlgoExplorer",
    category: "AI learning tool",
    context: "Independent product",
    headline: "Pause an algorithm. See what changed.",
    summary:
      "Step through algorithms, inspect their state, and ask an AI tutor about the frame on screen. Code, explanations, and playback share the same workspace.",
    cover: "/project-media/algo.webp",
    coverAlt: "AlgoExplorer visualizing an A-star pathfinding algorithm beside an AI tutor",
    accent: "#8d5bff",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Gemini", "ChatGPT"],
    sourceUrl: "https://github.com/Benjaminnnnnn/algo-explorer",
    metrics: [
      { value: "Frame by frame", label: "inspect each state transition" },
      { value: "Typed", label: "visualization state models" },
      { value: "2", label: "context-aware AI tutor modes" },
    ],
    chapters: [
      {
        "eyebrow": "01 / Context",
        "title": "Pause before the next step.",
        "body": [
          "Playback controls let you pause, step, and replay the algorithm. The grid keeps the current state on screen."
        ]
      },
      {
        "eyebrow": "02 / Implementation",
        "title": "Ask about the current frame.",
        "body": [
          "The tutor receives the active frame with your question. Separate services connect the interface to Gemini and OpenAI."
        ]
      },
      {
        "eyebrow": "03 / Notes",
        "title": "Check the explanations, too.",
        "body": [
          "Algorithm and browser tests are still on the README roadmap. The tutor also needs checked examples to test its explanations."
        ]
      }
    ],
  },
  splendor: {
    slug: "splendor",
    title: "Splendor",
    category: "Real-time multiplayer",
    context: "Four-person team project",
    headline: "One game board, shared by everyone in the room.",
    summary:
      "A browser version of Splendor with multiplayer lobbies, game rules, chat, and an AI advisor. A team project with tests from individual rules through browser play.",
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
        "eyebrow": "01 / Context",
        "title": "Validate a move before sharing it.",
        "body": [
          "Purchasing cards, reserving cards, and taking tokens depend on the current turn and board state. The project separates these rules from HTTP and socket handling so an action can be checked before changing the game."
        ]
      },
      {
        "eyebrow": "02 / Implementation",
        "title": "Build the application as a team.",
        "body": [
          "Accounts, lobbies, chat, notifications, achievements, and an AI advisor sit around the game. React renders the client, while Express, Socket.IO, and SQLite support the server.",
          "This case study describes the team's application. The repository credits AI assistance for the UI, art, initial infrastructure, and documentation."
        ]
      },
      {
        "eyebrow": "03 / Notes",
        "title": "Test the rules from several directions.",
        "body": [
          "The repository includes Vitest and Supertest, Playwright browser tests, fast-check property tests, and Stryker mutation testing. They check examples, generated cases, full browser flows, and whether assertions catch changed behavior."
        ]
      }
    ],
  },
  cypress: {
    slug: "cypress",
    title: "Cypress",
    category: "Workspace prototype",
    context: "Full-stack product build",
    headline: "Organize documents in a shared workspace.",
    summary:
      "A workspace prototype built with Next.js, Supabase, and Drizzle, with account access, workspace creation, and dashboard navigation.",
    cover: "/project-media/cypress.webp",
    coverAlt: "Cypress collaboration platform landing interface in a dark violet visual system",
    accent: "#7d3cff",
    stack: ["Next.js", "React", "TypeScript", "Supabase", "Drizzle ORM", "PostgreSQL"],
    sourceUrl: "https://github.com/Benjaminnnnnn/cypress",
    metrics: [
      { value: "Next.js", label: "application routes" },
      { value: "PostgreSQL", label: "workspace data" },
      { value: "Drizzle", label: "typed database model" },
    ],
    chapters: [
      {
        "eyebrow": "01 / Context",
        "title": "Start with accounts and workspaces.",
        "body": [
          "The public implementation includes login and signup routes, workspace creation, a dashboard, and sidebar navigation."
        ]
      },
      {
        "eyebrow": "02 / Implementation",
        "title": "Describe the data in TypeScript.",
        "body": [
          "Next.js provides the application routes, Supabase supplies backend services, and Drizzle describes the PostgreSQL model."
        ]
      },
      {
        "eyebrow": "03 / Notes",
        "title": "Keep unfinished features visible.",
        "body": [
          "The README lists state-provider refactoring and AI capabilities as future work. This is a workspace prototype; the public source reviewed here does not establish a complete collaborative editor, version history, or AI summaries."
        ]
      }
    ],
  },
  "leetcode-clone": {
    slug: "leetcode-clone",
    title: "LeetCode Clone",
    category: "Developer learning",
    context: "Independent full-stack build",
    headline: "Keep the problem beside the code.",
    summary:
      "A coding-practice interface with problem browsing, an editor, examples, and submission feedback. Built with Next.js, TypeScript, and Firebase.",
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
        "eyebrow": "01 / Context",
        "title": "Keep the problem and editor together.",
        "body": [
          "The interface brings the problem statement, examples, and editor into a shared workspace so they can be read together."
        ]
      },
      {
        "eyebrow": "02 / Implementation",
        "title": "Leave room for the code.",
        "body": [
          "The split layout separates reading from editing. Compact controls keep problem navigation close to the active task."
        ]
      },
      {
        "eyebrow": "03 / Notes",
        "title": "Build the practice flow.",
        "body": [
          "The project connects a typed React interface to Firebase services. It is a coding-practice clone, with no claim of a production-grade isolated code-execution service."
        ]
      }
    ],
  },
  cliphop: {
    slug: "cliphop",
    title: "ClipHop",
    category: "Social video",
    context: "Independent product build",
    headline: "A video feed with room to explore.",
    summary:
      "A short-video application with profiles, topic browsing, uploads, and reactions, using Sanity for content and OAuth for sign-in.",
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
        "eyebrow": "01 / Context",
        "title": "Browse beyond the current clip.",
        "body": [
          "The central feed sits beside navigation for topics, search, and profiles. A viewer can move to related content while keeping the overall layout."
        ]
      },
      {
        "eyebrow": "02 / Implementation",
        "title": "Model clips and creators together.",
        "body": [
          "Sanity stores the content behind videos and creator profiles. The Next.js client renders it into the feed and account views."
        ]
      },
      {
        "eyebrow": "03 / Notes",
        "title": "Add participation around playback.",
        "body": [
          "Account-aware actions let users publish and react to clips. The project focuses on application flows rather than custom video encoding or large-scale media delivery."
        ]
      }
    ],
  },
  "rss-aggregator": {
    slug: "rss-aggregator",
    title: "RSS Aggregator",
    category: "Go backend service",
    context: "Independent systems project",
    headline: "Collect updates from several feeds at once.",
    summary:
      "A Go service for RSS subscriptions, concurrent feed retrieval, and PostgreSQL storage, with a documented HTTP API.",
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
        "eyebrow": "01 / Context",
        "title": "Separate subscriptions from fetching.",
        "body": [
          "HTTP handlers manage users, feeds, and follows. PostgreSQL stores those relationships and the posts collected from each source."
        ]
      },
      {
        "eyebrow": "02 / Implementation",
        "title": "Fetch a batch concurrently.",
        "body": [
          "A ticker selects feeds for the next batch. Goroutines fetch and parse them concurrently, and a wait group waits for the batch before the next iteration. The HTTP client has a ten-second timeout."
        ]
      },
      {
        "eyebrow": "03 / Notes",
        "title": "Study what happens when a fetch fails.",
        "body": [
          "This version has no worker lease protocol or automated tests in its public tree. It marks a feed fetched before retrieval and continues after logging a fetch error. Relay studies the ownership and recovery questions that appear when background work spans multiple processes."
        ]
      }
    ],
  },
  propertize: {
    slug: "propertize",
    title: "Propertize",
    category: "Operations dashboard",
    context: "Full-stack CRUD product",
    headline: "Find a property. Update its details.",
    summary:
      "A property-management interface with listing CRUD, account access, and dashboard views, built with React, Material UI, Node.js, and MongoDB.",
    cover: "/project-media/propertize.webp",
    coverAlt: "Propertize dashboard with property totals, revenue chart, and referral breakdowns",
    accent: "#3f68ff",
    stack: ["React", "TypeScript", "Material UI", "Node.js", "MongoDB", "OAuth 2.0"],
    sourceUrl: "https://github.com/Benjaminnnnnn/propertize",
    metrics: [
      { value: "CRUD", label: "complete property workflows" },
      { value: "OAuth", label: "account access" },
      { value: "UI", label: "dashboard and chart examples" },
    ],
    chapters: [
      {
        "eyebrow": "01 / Context",
        "title": "Put the property list within reach.",
        "body": [
          "The dashboard combines summary cards with navigation to property records. The charts are interface examples, not independently verified business metrics."
        ]
      },
      {
        "eyebrow": "02 / Implementation",
        "title": "Use consistent forms for changes.",
        "body": [
          "Create and edit views share React and Material UI patterns. The project covers the lifecycle of a property record, including deletion."
        ]
      },
      {
        "eyebrow": "03 / Notes",
        "title": "Persist listings through a Node service.",
        "body": [
          "The client connects to a Node.js backend and MongoDB. Account access supports the property-management workflow."
        ]
      }
    ],
  },
  mems: {
    slug: "mems",
    title: "Mems",
    category: "Travel social product",
    context: "Full-stack product build",
    headline: "Save a place with the story behind it.",
    summary:
      "A travel-themed social app for posts about places, with image cards, descriptions, and personal collections.",
    cover: "/project-media/mems.webp",
    coverAlt: "Mems travel platform displaying a grid of destination cards on a dark interface",
    accent: "#4ea1ff",
    stack: ["React", "Node.js", "MongoDB"],
    sourceUrl: "https://github.com/Benjaminnnnnn/mems",
    metrics: [
      { value: "Places", label: "location-led storytelling" },
      { value: "Social", label: "shared travel memories" },
      { value: "MongoDB", label: "post storage" },
    ],
    chapters: [
      {
        "eyebrow": "01 / Context",
        "title": "Keep the image and description together.",
        "body": [
          "Destination cards pair a place with a photo and a short description. The layout supports browsing across travel posts."
        ]
      },
      {
        "eyebrow": "02 / Implementation",
        "title": "Distinguish personal posts from browsing.",
        "body": [
          "Profile context and ownership controls separate a user's own posts from the wider collection."
        ]
      },
      {
        "eyebrow": "03 / Notes",
        "title": "Build the post workflow end to end.",
        "body": [
          "React handles browsing and authoring, while Node.js and MongoDB support the underlying records."
        ]
      }
    ],
  },
  "333gle": {
    slug: "333gle",
    title: "333gle",
    category: "Search systems",
    context: "UW CSE 333 coursework",
    headline: "From a browser request to matching documents.",
    summary:
      "A C++ course project connecting HTTP parsing, sockets, a thread pool, and indexed document search. Includes tests for the server's lower-level components.",
    cover: "/project-media/333gle.webp",
    coverAlt: "333gle search results page returning matches for a query",
    accent: "#f3a31b",
    stack: ["C++", "Multithreading", "In-memory indexing", "GDB", "Valgrind"],
    sourceUrl: "https://github.com/Benjaminnnnnn/333gle",
    metrics: [
      { value: "HTTP", label: "request and response handling" },
      { value: "Parallel", label: "multi-query execution" },
      { value: "C++", label: "memory-conscious implementation" },
    ],
    chapters: [
      {
        "eyebrow": "01 / Context",
        "title": "Hand a connection to a worker.",
        "body": [
          "The server opens a listening socket and dispatches accepted connections through a thread pool. Each task carries the connection and index context needed to answer a request."
        ]
      },
      {
        "eyebrow": "02 / Implementation",
        "title": "Turn a query into a results page.",
        "body": [
          "The HTTP layer handles file and query requests. Query processing uses index-reader libraries from earlier coursework, and the server formats matching documents for the browser."
        ]
      },
      {
        "eyebrow": "03 / Notes",
        "title": "Keep the course scope clear.",
        "body": [
          "The repository includes course-provided code and static indexing libraries, plus tests for files, HTTP handling, sockets, and the thread pool."
        ]
      }
    ],
  },
  xv6: {
    slug: "xv6",
    title: "xv6",
    category: "Operating systems",
    context: "Coursework on the xv6 teaching kernel",
    headline: "Trace a shell command into the kernel.",
    summary:
      "Operating-systems coursework using xv6 on RISC-V, with shell, utility, and allocator lab configuration in the repository.",
    cover: "/project-media/xv6.webp",
    coverAlt: "xv6 terminal showing a running Unix-like file system and shell commands",
    accent: "#ff7367",
    stack: ["C", "RISC-V", "QEMU", "Unix"],
    sourceUrl: "https://github.com/Benjaminnnnnn/xv6",
    metrics: [
      { value: "RISC-V", label: "instruction-set target" },
      { value: "Kernel", label: "process and memory work" },
      { value: "Labs", label: "shell, utilities, and allocation" },
    ],
    chapters: [
      {
        "eyebrow": "01 / Context",
        "title": "Read an operating system you can follow.",
        "body": [
          "xv6 is an existing teaching kernel. Its source exposes processes, system calls, files, memory, and locks in one repository. The upstream authors are credited in its README."
        ]
      },
      {
        "eyebrow": "02 / Implementation",
        "title": "Connect user programs to kernel behavior.",
        "body": [
          "The lab configuration covers shell work, utilities, and allocation. The repository provides a way to follow a command from user code into the kernel's resource handling."
        ]
      },
      {
        "eyebrow": "03 / Notes",
        "title": "Separate the teaching system from the lab work.",
        "body": [
          "The repository includes the xv6 kernel and third-party networking code. This page describes coursework on that system without claiming authorship of the kernel or every included feature."
        ]
      }
    ],
  },
} as const satisfies Record<(typeof projectOrder)[number], PortfolioProject>;

export type PortfolioProjectSlug = keyof typeof portfolioProjects;

export const projects: readonly PortfolioProject[] = projectOrder.map((slug) => portfolioProjects[slug]);

export function isPortfolioProjectSlug(slug: string): slug is PortfolioProjectSlug {
  return Object.hasOwn(portfolioProjects, slug);
}

export function getNextProject(slug: PortfolioProjectSlug) {
  const index = projectOrder.indexOf(slug);
  const nextSlug = projectOrder[(index + 1) % projectOrder.length];
  return portfolioProjects[nextSlug];
}
