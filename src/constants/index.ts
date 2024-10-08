import {
  backend,
  beaconfire,
  cliphop,
  cpp,
  creator,
  cypress,
  docker,
  git,
  graphql,
  javascript,
  leetcode,
  mems,
  microsoft,
  mobile,
  mongodb,
  nextjs,
  nodejs,
  propertize,
  python,
  reactjs,
  redux,
  rssagg,
  seal,
  tailwind,
  tttgle,
  typescript,
  uw,
  web,
  xv6,
} from "../assets";

export interface IExperince {
  title: string;
  company_name: string;
  icon: string;
  iconBg: string;
  date: string;
  points: string[];
}

export interface IProject {
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
  title: string;
  icon: string;
}
export interface ITechnology {
  name: string;
  icon: string;
}
export interface ITestimonial {}

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
    title: "Web Developer",
    icon: web,
  },
  {
    title: "Frontend Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Software Engineer",
    icon: creator,
  },
];

const technologies: ITechnology[] = [
  // {
  //   name: "HTML 5",
  //   icon: html,
  // },
  // {
  //   name: "CSS 3",
  //   icon: css,
  // },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
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
    name: "GraphQL",
    icon: graphql,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
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
    title: "Software Engineer I",
    company_name: "Microsoft",
    icon: microsoft,
    iconBg: "#ffffff",
    date: "April 2023 - Current",
    points: [
      "Collaborated with cross-functional teams and partners to build cross-platform Microsoft Teams meeting experience with high-performance edge/cloud-based AI camera pipelines and hardware cameras devices.",
      "Participated in agile development of Teams meeting experience and implemented new features that meets business requirements.",
      "Ownership in E2E intelligent camera automation testing framework, resulting in a 30% increase in test coverage.",
      "Led weekly bug bash sessions with meeting up to 30 participants to overall Teams meeting room experience.",
    ],
  },
  {
    title: "Full-Stack Engineer",
    company_name: "BeaconFire Inc",
    icon: beaconfire,
    iconBg: "#ffffff",
    date: "August 2022 - December 2022",
    points: [
      "Spearheaded the maintenance of internal software platforms while delivering 5+ new microservices, enhancing the CI/CD pipeline in a containerized development environment, utilizing React, TypeScript, Tailwind CSS, Docker, AWS ECS.",
      "Upgraded existing platforms to achieve a 30% performance boost and enhanced security. Accomplished through in-depth investigation and improvements to backend middleware and database accesses, employing Node, Express, MongoDB.",
      "Implemented comprehensive testing strategy, covering 100+ unit tests for user interfaces and backend using Cypress.",
    ],
  },
  {
    title: "Web Development Teaching Assistant",
    company_name: "University of Washington",
    icon: uw,
    iconBg: "#E6DEDD",
    date: "June 2021 -  August 2022",
    points: [
      "Facilitated instruction for a web development course, guiding a cohort of 40 students in essential web development skills.",
      "Developed comprehensive course materials, covering HTML5, CSS, JavaScript, React.js, Node.js, Express.js, SQLite, MongoDB, RESTful APIs, Git, data visualizations, responsive web design, security vulnerabilities.",
      "Provided guidance and support to students in designing and implementing 10+ creative projects, fostering a collaborative environment that encourage code reviews and constructive feedback.",
    ],
  },
  {
    title: "Full-Stack Engineer",
    company_name: "Sensors Robotic and Automation Laboratory",
    icon: seal,
    iconBg: "#E6DEDD",
    date: "February 2020 - June 2021",
    points: [
      "Led an agile development team in deploying a content management system (CMS) to manage over 50 lab projects and support 400+ student/faculty researchers; streamlined project management process and improved overall efficiency.",
      "Implemented and delivered 5+ microservices, including a project issue tracker, team communication channel, and project showcase. Technology encompasses React, Redux, Typescript, AWS Amplify, AWS AppSync, AWS Fargate, AWS Cognito, Google OAuth, JWT, and Terraform.",
    ],
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
    name: "Cypress (WIP)",
    description:
      "Cypress is an all-in-one platform for seamless team collaboration and project management.",
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
    name: "LeetCode [Clone]",
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

export { experiences, projects, services, technologies, testimonials };
