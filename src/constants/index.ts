import {
  backend,
  beaconfire,
  cliphop,
  cmu,
  cpp,
  creator,
  cypress,
  docker,
  git,
  graphql,
  leetcode,
  mems,
  microsoft,
  mobile,
  mongodb,
  nextjs,
  playwright,
  propertize,
  python,
  reactjs,
  redux,
  rest,
  rssagg,
  seal,
  tailwind,
  tttgle,
  typescript,
  uw,
  web,
  xv6
} from "../assets";

export interface IExperince {
  id: string;
  title: string;
  company_name: string;
  icon: string;
  iconBg: string;
  date: string;
  points: string[];
}

export interface IProject {
  id: string;
  name: string;
  description: string;
  tags: {
    name: string;
    color: string;
  }[];
  image: string;
  source_code_link: string;
  demo_link?: string;
}

export interface IService {
  id: string;
  title: string;
  icon: string;
}
export interface ITechnology {
  name: string;
  icon: string;
}
export interface ITestimonial { }
export interface IEducation {
  id: string;
  school: string;
  degree: string;
  period: string;
  gpa?: string;
  coursework: string[];
  icon: string;
}

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "experience",
    title: "Experience",
  },
  {
    id: "education",
    title: "Education",
  },
  {
    id: "tech",
    title: "Skill",
  },
  {
    id: "project",
    title: "Project",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services: IService[] = [
  {
    id: "web",
    title: "Web Developer",
    icon: web,
  },
  {
    id: "frontend",
    title: "Frontend Developer",
    icon: mobile,
  },
  {
    id: "backend",
    title: "Backend Developer",
    icon: backend,
  },
  {
    id: "software",
    title: "Software Engineer",
    icon: creator,
  },
];

const technologies: ITechnology[] = [
  // {
  //   name: "JavaScript",
  //   icon: javascript,
  // },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Next JS",
    icon: nextjs,
  },
  {
    name: "Redux",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "PlayWright",
    icon: playwright
  },
  // {
  //   name: "Node JS",
  //   icon: nodejs,
  // },
  {
    name: "REST API",
    icon: rest,
  },
  {
    name: "GraphQL",
    icon: graphql,
  },
  // {
  //   name: "gRPC",
  //   icon: grpc,
  // },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  // {
  //   name: "Three JS",
  //   icon: threejs,
  // },
  {
    name: "git",
    icon: git,
  },
  // {
  //   name: "figma",
  //   icon: figma,
  // },
  {
    name: "docker",
    icon: docker,
  },
  // {
  //   name: "kubernetes",
  //   icon: kubernetes,
  // },
  {
    name: "python",
    icon: python,
  },
  {
    name: "c++",
    icon: cpp,
  },
];

const experiences: IExperince[] = [
  {
    id: "microsoft",
    title: "Software Engineer I",
    company_name: "Microsoft",
    icon: microsoft,
    iconBg: "#ffffff",
    date: "April 2023 - October 2024",
    points: [
      "Shipped privacy-first people identification for Teams Rooms, enabling advanced/legacy room hardware and expanding accessibility for 10M+ meeting participants with zero P0 incidents post-launch.",
      "Optimized a 1080p@30fps face detection pipeline (ONNX Runtime + CPU optimizations), sustaining ~99% detection accuracy with ~22ms p95 latency and trimming GPU cost by ~8%.",
      "Reinforced face enrollment flows with PII minimization and retention controls to meet enterprise privacy requirements and pass internal audits.",
      "Instituted automation tests for AI/ML services to 99% coverage, reducing regression incidents by 30%.",
    ],
  },
  {
    id: "beaconfire",
    title: "Full-Stack Engineer",
    company_name: "BeaconFire Inc",
    icon: beaconfire,
    iconBg: "#ffffff",
    date: "August 2022 - December 2022",
    points: [
      "Engineered internal management platform UI (React/Next.js) and onboarding flows so new teams could self-serve setup and configurations, speeding time-to-first-commit from 7 days to 1 day for 50 teams.",
      "Delivered API layer and persistence (Express + Redis) with auth and audit logging to guard internal workflows, serving 700 internal users at ~99.9% uptime.",
      "Streamlined CI/CD pipelines (GitHub Actions) to cut release time by ~10 minutes per deploy and stabilize rollback reliability.",
    ],
  },
  {
    id: "uw",
    title: "Web Development Teaching Assistant",
    company_name: "University of Washington",
    icon: uw,
    iconBg: "#E6DEDD",
    date: "June 2021 - August 2022",
    points: [
      "Taught 40+ students on advanced web development and algorithms; ran weekly code reviews labs with actionable feedback.",
      "Started project review checklists and CI gating, increasing assignment pass consistency and code quality.",
    ],
  },
  {
    id: "seal",
    title: "Full-Stack Engineer",
    company_name: "Sensors, Energy, and Automation Laboratory",
    icon: seal,
    iconBg: "#E6DEDD",
    date: "February 2020 - June 2021",
    points: [
      "Built a research CMS and data pipeline handling 500+ daily entries with real-time analysis dashboards.",
      "Automated the research data processing microservice, eliminating ~30 hours/week of manual effort.",
    ],
  },
];

const educations: IEducation[] = [
  {
    id: "cmu",
    school: "Carnegie Mellon University",
    degree: "Master of Software Engineering",
    period: "Expected December 2026",
    gpa: "3.9 / 4.0",
    coursework: [
      "Cloud Computing",
      "Distributed Systems",
      "Quality Assurance",
      "API Design",
      "Software Architecture",
    ],
    icon: cmu,
  },
  {
    id: "uw",
    school: "University of Washington",
    degree: "B.S. in Computer Science",
    period: "September 2018 - December 2022",
    gpa: "3.85 / 4.0; Dean's List: 13 quarters",
    coursework: [
      "Machine Learning",
      "Natural Language Processing",
      "Operating Systems",
      "Algorithms",
      "Computer Graphics",
    ],
    icon: uw,
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects: IProject[] = [
  {
    id: "cypress",
    name: "Cypress (WIP)",
    description:
      "Designed a Notion-like editor with real-time collaborative document editing, version history, and AI assistants for summaries and action items.",
    tags: [
      {
        name: "react-typescript",
        color: "blue-text-gradient",
      },

      {
        name: "nextjs",
        color: "green-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "drizzle-orm",
        color: "green-text-gradient",
      },
      {
        name: "postgresql",
        color: "pink-text-gradient",
      },
    ],
    image: cypress,
    source_code_link: "https://github.com/Benjaminnnnnn/cypress",
  },
  {
    id: "leetcode",
    name: "LeetCode (Clone)",
    description:
      "LeetCode is an online platform offering coding challenges and interview preparation resources for software engineers and developers.",
    tags: [
      {
        name: "react-typescript",
        color: "blue-text-gradient",
      },
      {
        name: "tailwind",
        color: "blue-text-gradient",
      },
      {
        name: "nextjs",
        color: "green-text-gradient",
      },
      {
        name: "firebase",
        color: "orange-text-gradient",
      },
    ],
    image: leetcode,
    source_code_link: "https://github.com/Benjaminnnnnn/leetcode-clone",
  },
  {
    id: "cliphop",
    name: "ClipHop",
    description:
      "ClipHop is an immersive video sharing web application that combines the power of social media with captivating short-form videos.",
    tags: [
      {
        name: "react-typescript",
        color: "blue-text-gradient",
      },
      {
        name: "tailwind",
        color: "blue-text-gradient",
      },
      {
        name: "nextjs",
        color: "green-text-gradient",
      },
      {
        name: "sanity",
        color: "green-text-gradient",
      },
      {
        name: "oauth2",
        color: "pink-text-gradient",
      },
    ],
    image: cliphop,
    source_code_link: "https://github.com/Benjaminnnnnn/cliphop",
  },
  {
    id: "rssagg",
    name: "RSS Aggregator",
    description:
      "An RSS feed aggregator web server and scraper, desinged to be dynamic and effective. Get/subscribe your favorite RSS feeds here.",
    tags: [
      {
        name: "go",
        color: "blue-text-gradient",
      },
      {
        name: "go-chi",
        color: "blue-text-gradient",
      },
      {
        name: "postgresql",
        color: "blue-text-gradient",
      },
      {
        name: "sqlc",
        color: "green-text-gradient",
      },
    ],
    image: rssagg,
    source_code_link: "https://github.com/Benjaminnnnnn/go-rssagg",
  },
  {
    id: "propertize",
    name: "Propertize",
    description:
      "Propertize is a user-friendly and efficient CRUD real estate dashboard application designed to streamline property management process.",
    tags: [
      {
        name: "react-typescript",
        color: "blue-text-gradient",
      },
      {
        name: "mui",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "node",
        color: "green-text-gradient",
      },
      {
        name: "oauth2",
        color: "pink-text-gradient",
      },
    ],
    image: propertize,
    source_code_link: "https://github.com/Benjaminnnnnn/propertize",
    // demo_link: "https://leafy-centaur-afc811.netlify.app/",
  },
  {
    id: "mems",
    name: "Mems",
    description:
      "Social media platform that enables users to share their favorite travel places to others and record their best part of memories.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "node",
        color: "green-text-gradient",
      },
      {
        name: "gcp",
        color: "pink-text-gradient",
      },
    ],
    image: mems,
    source_code_link: "https://github.com/Benjaminnnnnn/mems",
  },
  {
    id: "tttgle",
    name: "333gle",
    description:
      "A multithreaded search engine with in-memory data-structures to effectively perform multi-query searches over more than millions of index files.",
    tags: [
      {
        name: "C++",
        color: "blue-text-gradient",
      },
      {
        name: "GDB",
        color: "green-text-gradient",
      },
      {
        name: "Valgrind",
        color: "pink-text-gradient",
      },
    ],
    image: tttgle,
    source_code_link: "https://github.com/Benjaminnnnnn/333gle",
  },
  {
    id: "xv6",
    name: "xv6",
    description:
      "A teaching-style operating system implementing the standard RISC-V instruction set under a Linux development environment. xv6 supports concurrency and threads.",
    tags: [
      {
        name: "C",
        color: "blue-text-gradient",
      },
      {
        name: "Linux",
        color: "green-text-gradient",
      },
      {
        name: "RISC-V",
        color: "pink-text-gradient",
      },
    ],
    image: xv6,
    source_code_link: "https://github.com/Benjaminnnnnn/xv6",
  },
];

const LinkedIn = {
  title: "LinkedIn",
  link: "https://www.linkedin.com/in/benjamin-zhuang/",
};

export {
  educations, experiences, LinkedIn,
  projects,
  services,
  technologies,
  testimonials
};
