import {
  backend,
  beaconfire,
  cliphop,
  cpp,
  creator,
  css,
  docker,
  git,
  html,
  javascript,
  kubernetes,
  mems,
  mobile,
  mongodb,
  nodejs,
  propertize,
  reactjs,
  redux,
  seal,
  tailwind,
  tttgle,
  typescript,
  uw,
  web,
  xv6,
} from "../assets";

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

const services = [
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

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
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
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
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
  {
    name: "kubernetes",
    icon: kubernetes,
  },
  // {
  //   name: "python",
  //   icon: python,
  // },
  {
    name: "c++",
    icon: cpp,
  },
];

const experiences = [
  {
    title: "Full-Stack Engineer",
    company_name: "BeaconFire",
    icon: beaconfire,
    iconBg: "#ffffff",
    date: "Auguest 2022 - December 2022",
    points: [
      "Maintained internal software platforms, designed and delivered 5+ new microservices with CI/CD pipeline in a containerized development environment (React, JS, TS, Bootstrap, Docker, AWS ECS)",
      "Upgraded current platforms with 30% better performance and more security by investigating and improving backend middleware and database accesses. (Node, Express, MongoDB).",
      "Wrote 200+ unit tests for user interfaces, backend-processing, database interactions, and more. (Cypress).",
    ],
  },
  {
    title: "Web Development Teaching Assistant",
    company_name: "University of Washington",
    icon: uw,
    iconBg: "#E6DEDD",
    date: "June 2021 -  August 2022",
    points: [
      "Instructed a full-stack web development course to 40 students.",
      "Included materials, such as HTML5, CSS, JavaScript, Vue, React, Node, Express, MySQL, MongoDB, RESTful APIs, Git, data visualizations, Linux, responsive web design, security vulnerabilities (XSS, CRSF), etc.",
      "Designed and code reviewed 10+ medium sized creative web application projects.",
    ],
  },
  {
    title: "Full-Stack Engineer",
    company_name: "Sensors Robotic and Automation Laboratory",
    icon: seal,
    iconBg: "#E6DEDD",
    date: "February 2020 - June 2021",
    points: [
      "Deployed an automation software system for management process over 50 lab projects and 200 student/faculty researchers in an agile development team.",
      "Implemented and containerized 10+ microservices, such as daily project progress tracker, project pitch & fund, team communication channel, and project showcase. (HTML, SCSS, React, React-router, Redux, Typescript, GraphQL, AWS Amplify, AppSync, Google OAuth, ECS, Docker, JWT)",
      "Virtualized the server for the dev and test environment needs and automated configuration process with Docker.",
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

const projects = [
  {
    name: "ClipHop",
    description:
      "ClipHop is an immersive video sharing web application that seamlessly combines the power of social media with captivating short-form videos, reminiscent of the popular platform TikTok.",
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

export { services, technologies, experiences, testimonials, projects };
