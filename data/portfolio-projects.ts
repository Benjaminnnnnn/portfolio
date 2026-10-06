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
  // "pending": will be published. "private": course, team, or sponsor repository.
  sourceStatus?: "pending" | "private";
  demoUrl?: string;
  metrics: readonly ProjectMetric[];
  chapters: readonly ProjectChapter[];
  evidence?: readonly { label: string; href: string }[];
};

export const projectOrder = [
  "poreia", "tartan-tickets", "relay", "handpick", "companion", "ppe-motion",
  "splendor", "algo-explorer", "simple-db", "petclinic-devops",
  "333gle", "xv6", "rss-aggregator", "cypress", "leetcode-clone", "cliphop",
] as const;

export const portfolioProjects = {
  ...systemsProjects,
  poreia: {
    slug: "poreia",
    title: "Poreia",
    category: "AI travel planner",
    context: "Independent product",
    headline: "One sentence in. A trip you can edit out.",
    summary:
      "A travel planner that turns one sentence into a multi-day itinerary with costs, a map, and an editable day-by-day plan. The model's answer has to pass a schema and a destination check before anyone sees it.",
    cover: "/project-media/poreia.webp",
    coverAlt: "Poreia home screen: a prompt bar with a placeholder Lisbon trip above four example requests, over a dusk mountain photograph",
    accent: "#e2674a",
    stack: ["Next.js", "React", "TypeScript", "Hono", "Cloudflare Workers", "Supabase", "PostgreSQL", "Drizzle", "Zod", "Leaflet"],
    sourceUrl: "https://github.com/Benjaminnnnnn/poreia",
    demoUrl: "https://poreia-five.vercel.app",
    metrics: [
      { value: "1 sentence", label: "is enough to start a trip" },
      { value: "Zod", label: "schema every model reply must pass" },
      { value: "1 retry", label: "correction pass when the destination drifts" },
    ],
    chapters: [
      {
        "eyebrow": "01 / Context",
        "title": "Start from a sentence.",
        "body": [
          "The home screen asks for one sentence: a place, a mood, a length, or a budget. The result is a day-by-day plan with times, places, cost estimates, and a budget breakdown, drawn on a map and open to drag-and-drop reordering.",
          "Trips are saved to an account, can be refined with follow-up requests, and can be shared."
        ]
      },
      {
        "eyebrow": "02 / Implementation",
        "title": "Treat the model's answer as untrusted input.",
        "body": [
          "A Hono service on Cloudflare Workers sends the request to an OpenAI model through Pollinations, with a fixed JSON shape and a low temperature. The reply is parsed and validated with Zod. Anything that fails becomes an error instead of a half-built trip.",
          "The service then compares the itinerary's destination with the place the user named. If the model wandered elsewhere, it asks once more with an explicit correction. A refinement has to stay in the current trip's destination, and the notes a traveller wrote for each day survive regeneration."
        ]
      },
      {
        "eyebrow": "03 / Notes",
        "title": "One model, checked by code.",
        "body": [
          "The checks are ordinary code, not a second model. The repository includes integration tests for the trips API and a rate limit on trip requests. The quality of the itineraries themselves has not been evaluated."
        ]
      }
    ],
  },
  "tartan-tickets": {
    slug: "tartan-tickets",
    title: "Tartan Tickets",
    category: "AI agent safety",
    context: "CMU 17-643 Quality Management · four-person team",
    headline: "An assistant that can refund money needs more than a prompt.",
    summary:
      "A course ticketing platform with Scotty, an LLM assistant that looks up orders, buys tickets, and issues refunds through tool calls. I built the refund capability and the guards around it: the model can ask for a refund, but it cannot decide one.",
    cover: "/project-media/tartan-tickets.webp",
    coverAlt: "Tartan Tickets events page with the Scotty assistant panel open, showing its greeting and three quick actions",
    accent: "#b30000",
    stack: ["TypeScript", "Node.js", "Express", "React", "PostgreSQL", "TypeORM", "OpenAI SDK", "LiteLLM", "Prometheus", "Grafana", "Playwright", "k6"],
    sourceUrl: "https://github.com/CMU-643/17643-s26-team04",
    sourceStatus: "private",
    metrics: [
      { value: "10 tools", label: "the assistant can call" },
      { value: "1 refund", label: "at most per assistant turn" },
      { value: "$10,000", label: "ceiling before a person takes over" },
    ],
    chapters: [
      {
        "eyebrow": "01 / Context",
        "title": "Start from a course codebase.",
        "body": [
          "Tartan Tickets is the starter project for CMU's Quality Management course: a React frontend, Express services, PostgreSQL, and a Prometheus and Grafana stack. The course staff added Scotty, an assistant that calls tools through an OpenAI-compatible gateway.",
          "Each teammate took one capability to make safe enough to launch. Mine was refunds."
        ]
      },
      {
        "eyebrow": "02 / Implementation",
        "title": "The model proposes. The service decides.",
        "body": [
          "A refund passes checks the model cannot skip: a signed-in user, an explicit confirmation, valid input, ownership of the order, no earlier refund, an event that has not ended, and an amount under the ceiling. The user's identity comes from the session token on the server, never from the model's tool arguments.",
          "The order moves to refund-pending in a guarded transaction before the payment provider is called with an idempotency key. If that call fails, a sweep every five minutes asks the provider what happened to orders stuck for ten minutes, then completes or rolls back the refund."
        ]
      },
      {
        "eyebrow": "03 / Notes",
        "title": "What I built, and what I didn't.",
        "body": [
          "Besides refunds I added the session middleware Scotty's tools rely on, Prometheus metrics, Grafana dashboards, alert rules, Playwright end-to-end tests, and k6 load tests. Teammates hardened purchasing, order lookup, and event discovery.",
          "The platform and the first version of Scotty came from the course staff, and the repository is private."
        ]
      }
    ],
  },
  companion: {
    slug: "companion",
    title: "Companion",
    category: "3D collectibles app",
    context: "Hackathon MVP · two-person team",
    headline: "Photograph an object. Keep it as a 3D collectible.",
    summary:
      "An iPhone app that turns a photo of a real object into a textured 3D model to spin, keep, and arrange in a personal collection. A small API hands the photo to an image-to-3D model and converts the result for iOS.",
    cover: "/project-media/companion.webp",
    coverAlt: "Companion landing page: the headline 'Bring your collectibles to life' surrounded by floating collectible objects",
    accent: "#1e8a5e",
    stack: ["Swift", "SwiftUI", "WidgetKit", "Node.js", "Hono", "Zod", "Next.js", "React Three Fiber", "Meshy 6 via Wavespeed"],
    sourceUrl: "https://github.com/Benjaminnnnnn/companion",
    sourceStatus: "private",
    demoUrl: "https://companion-eight-zeta.vercel.app",
    metrics: [
      { value: "1 photo", label: "in, one textured model out" },
      { value: "30,000", label: "triangle target per model" },
      { value: "USDZ", label: "converted once, then cached" },
    ],
    chapters: [
      {
        "eyebrow": "01 / Context",
        "title": "A shelf for things you care about.",
        "body": [
          "Companion was built in a week as a hackathon MVP. You photograph an object, wait while a model is generated, and get a 3D collectible that lives in a gallery and on home screen widgets."
        ]
      },
      {
        "eyebrow": "02 / Implementation",
        "title": "Submit, poll, convert once.",
        "body": [
          "The API sends the photo to Meshy 6 through Wavespeed and returns a prediction ID, which the app polls. The first time a prediction completes, the server downloads the GLB, converts it to USDZ with a Python script, and caches the result so later polls and downloads reuse it.",
          "Routes are described with Zod schemas that also generate the OpenAPI document. The model provider, converter, and cache sit behind small interfaces, so the generation flow reads top to bottom."
        ]
      },
      {
        "eyebrow": "03 / Notes",
        "title": "What is real and what is a mock-up.",
        "body": [
          "The 3D generation path is real. The web landing page is a marketing mock-up: its user counts, rating, and community screens are placeholder content, and its object pictures are image-model renders rather than app output.",
          "I worked on the iOS interface, widgets, model rendering, the web app, and the API scaffold, with one teammate. The repository is private."
        ]
      }
    ],
  },
  "ppe-motion": {
    slug: "ppe-motion",
    title: "PPE Motion Analysis",
    category: "Motion-capture analytics",
    context: "CMU MSE practicum · sponsored by MSA Safety",
    headline: "Does the gear change how a firefighter moves?",
    summary:
      "A local tool that turns Xsens motion capture into repeatable comparisons between protective-equipment designs: the same subject and the same task, with one piece of gear changed. A command line and a browser workspace drive the same services.",
    cover: "/project-media/ppe-motion.svg",
    coverAlt: "Schematic of a continuous motion trace divided into four tasks",
    coverCaption: "Schematic drawn for this case study. It contains no recorded data.",
    accent: "#157a3c",
    stack: ["Python", "FastAPI", "NumPy", "SciPy", "OpenSim", "SQLite", "Parquet", "React", "TypeScript", "Playwright"],
    sourceUrl: "https://bitbucket.org/msasafety/kinematic-analysis",
    sourceStatus: "private",
    metrics: [
      { value: "A / B", label: "matched trials with one gear change" },
      { value: "9", label: "measurement rules the code must hold to" },
      { value: "127.0.0.1", label: "captures stay on the operator's machine" },
    ],
    chapters: [
      {
        "eyebrow": "01 / Context",
        "title": "Compare gear, not people.",
        "body": [
          "MSA Safety designs protective equipment. The practicum team built a tool for its engineers: capture a subject in Xsens MVN, import the recording, record what was worn, divide it into tasks, run the analysis, then compare one configuration against another on matched trials."
        ]
      },
      {
        "eyebrow": "02 / Implementation",
        "title": "Find the tasks in the motion.",
        "body": [
          "A study is usually captured without pausing between exercises. The tool drafts task boundaries from joint-angle movement: where the body goes still, and where one exercise flows into the next. With a protocol chosen, it cuts the recording into exactly the tasks that protocol prescribes. The operator confirms the boundaries before they count.",
          "The backend is one domain model with adapters for Xsens files, OpenSim, SQLite, and Parquet. Dependencies point inward, and a test fails when they do not. The browser's API types are generated from the backend schema."
        ]
      },
      {
        "eyebrow": "03 / Notes",
        "title": "No score, no p-value.",
        "body": [
          "The tool reports differences on matched trials and which direction each metric favours. It does not produce an overall gear score, a significance test, or a causal claim, and missing measurements stay missing.",
          "The recordings and repository belong to the sponsor, so this page uses drawings instead of screens. There is no machine-learning model here; task detection is signal processing."
        ]
      }
    ],
  },
  handpick: {
    slug: "handpick",
    title: "Handpick",
    category: "iOS photo app",
    context: "Independent product · pre-release",
    headline: "Clear a cluttered camera roll, one decision at a time.",
    summary:
      "An iPhone and iPad app for clearing a cluttered photo library one photo at a time. Keep it, delete it, or sort it into an album, and nothing leaves the library until you confirm the batch.",
    cover: "/project-media/handpick.webp",
    coverAlt: "Handpick on iPhone: the Organize home screen, a single photo under review with Keep and Delete, and a collection grid",
    accent: "#c0573f",
    stack: ["Swift", "SwiftUI", "PhotoKit", "Vision", "WidgetKit", "StoreKit", "Tuist"],
    sourceUrl: "https://github.com/Benjaminnnnnn/handpick",
    metrics: [
      { value: "4", label: "review states per photo" },
      { value: "0.92", label: "similarity bar before suggesting a duplicate" },
      { value: "3 min", label: "window for comparing shots" },
    ],
    chapters: [
      {
        "eyebrow": "01 / Context",
        "title": "Make cleanup feel small.",
        "body": [
          "Libraries grow faster than anyone sorts them. Handpick offers manageable sets such as This Week, On This Day, or Large Files, then shows one photo at a time with a few direct actions and undo."
        ]
      },
      {
        "eyebrow": "02 / Implementation",
        "title": "Stage deletions before they happen.",
        "body": [
          "Every photo the app has seen is unreviewed, kept, pending removal, or deleted. Delete moves a photo to Handpick's own trash; only a confirmed batch reaches PhotoKit, where iOS asks once more.",
          "A background scan reads each photo with Vision for similarity, quality, and faces. Duplicates are only suggested within a three-minute window at a high similarity bar, because inventing one asks someone to delete a photo they wanted."
        ]
      },
      {
        "eyebrow": "03 / Notes",
        "title": "Still in development.",
        "body": [
          "There is no public build yet. The project is generated with Tuist, built and tested in Xcode Cloud, and covered by unit and UI tests. The captures here are App Store screenshots with a demo photo library."
        ]
      }
    ],
  },
  "algo-explorer": {
    slug: "algo-explorer",
    title: "AlgoExplorer",
    category: "AI learning tool",
    context: "Independent product",
    headline: "Pause an algorithm. See what changed.",
    summary:
      "Step through algorithms, inspect their state, and ask an AI tutor about the frame on screen. Code, explanations, and playback share the same workspace.",
    cover: "/project-media/algo-v2.webp",
    coverAlt: "Reworked AlgoExplorer: a finished A-star path glowing on a dark grid beside the AI tutor panel",
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
    cover: "/project-media/splendor-v2.webp",
    coverAlt: "A four-player Splendor game: nobles, three tiers of cards, the token bank, and every player's tokens",
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
    cover: "/project-media/cypress-v2.webp",
    coverAlt: "Reworked Cypress landing page with a highlighted headline and the implemented feature list",
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
    cover: "/project-media/leetcode-v2.webp",
    coverAlt: "Two Sum in the reworked coding workspace: problem statement, a hash-map solution in the editor, and test cases",
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
    cover: "/project-media/cliphop-v2.webp",
    coverAlt: "Reworked ClipHop night feed: topic chips, suggested creators, and a video post with a neon frame",
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
