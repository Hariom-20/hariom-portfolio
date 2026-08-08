// Single source of truth — all content is drawn strictly from Hariom Sharma's resume.
// No fabricated companies, metrics, clients, or links.

export const profile = {
  name: "Hariom Sharma",
  first: "Hariom",
  role: "Full Stack Web Developer (MERN Stack)",
  location: "Faridabad, Haryana, India",
  email: "hs7290487@gmail.com",
  phone: "+91 9643980373",
  linkedin: "https://www.linkedin.com/in/hariom-sharma2005",
  positioning:
    "Full Stack MERN Developer building scalable, production-ready web applications with modern frontend experiences, robust backend systems and cloud deployment.",
  aboutIntro:
    "Full Stack MERN Developer with experience building and deploying scalable web applications using MongoDB, Express.js, React.js and Node.js. Experienced in RESTful API development, JWT authentication and cloud deployment across AWS, Vercel and Render.",
};

export type Stat = {
  value: number;
  suffix: string;
  label: string;
  display?: string;
};

export const statsTech: Stat[] = [
  { value: 2, suffix: "+", label: "Years Experience" },
  { value: 4, suffix: "", label: "MERN Technologies", display: "MERN" },
  { value: 2, suffix: "", label: "Production Projects" },
  { value: 4, suffix: "", label: "Cloud Platforms" },
];

export const statsHr: Stat[] = [
  { value: 2, suffix: "+", label: "Years Experience" },
  { value: 3, suffix: "", label: "Roles Held" },
  { value: 4, suffix: "", label: "Live Projects" },
  { value: 4, suffix: "", label: "Cloud Platforms" },
];

export type Tech = {
  name: string;
  group: "Frontend" | "Backend" | "Database" | "Cloud" | "Tools" | "CMS";
  blurb: string;
};

export const technologies: Tech[] = [
  { name: "React.js", group: "Frontend", blurb: "Component-driven UI architecture" },
  { name: "Next.js", group: "Frontend", blurb: "Production React framework" },
  { name: "JavaScript", group: "Frontend", blurb: "Modern ES6+ language features" },
  { name: "HTML5", group: "Frontend", blurb: "Semantic, accessible markup" },
  { name: "CSS3", group: "Frontend", blurb: "Responsive, modern styling" },
  { name: "Node.js", group: "Backend", blurb: "Server-side JavaScript runtime" },
  { name: "Express.js", group: "Backend", blurb: "Fast, minimal API layer" },
  { name: "REST APIs", group: "Backend", blurb: "Clean, resource-based endpoints" },
  { name: "JWT", group: "Backend", blurb: "Stateless secure authentication" },
  { name: "MongoDB", group: "Database", blurb: "Flexible NoSQL document store" },
  { name: "Mongoose", group: "Database", blurb: "Schema-driven ODM modelling" },
  { name: "AWS", group: "Cloud", blurb: "EC2 & S3 cloud infrastructure" },
  { name: "Vercel", group: "Cloud", blurb: "Edge frontend deployment" },
  { name: "Render", group: "Cloud", blurb: "Managed backend hosting" },
  { name: "Git", group: "Tools", blurb: "Version control workflow" },
  { name: "GitHub", group: "Tools", blurb: "Collaboration & CI" },
  { name: "Postman", group: "Tools", blurb: "API design & testing" },
  { name: "WordPress", group: "CMS", blurb: "Custom theme development" },
];

export type ExperienceLink = { label: string; url: string };

export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  points: string[];
  tags: string[];
  links?: ExperienceLink[];
};

export const experiences: Experience[] = [
  {
    role: "Freelance Web Developer",
    company: "Self-Employed",
    location: "Remote",
    period: "Nov 2025 – Present",
    current: true,
    points: [
      "Designing and developing high-converting WordPress landing pages for marketing agencies",
      "Built campaign landing pages for Creasip and HypeRatings — influencer marketing agencies — with responsive, SEO-friendly layouts and lead-capture forms",
      "Optimizing pages for performance, mobile responsiveness and search visibility",
      "Continuing full-stack MERN development — building web applications with React.js, Node.js, Express.js and MongoDB",
    ],
    tags: ["WordPress", "Landing Pages", "SEO", "React.js", "Node.js", "MongoDB"],
    links: [
      {
        label: "HypeRatings — Nano Influencer LP",
        url: "https://hyperatings.com/nano-influencer-marketing-agency/",
      },
      {
        label: "Creasip — Macro Influencer LP",
        url: "https://creasip.com/lp/macro-influencer-marketing-agency/",
      },
    ],
  },
  {
    role: "Full-Spectrum IT Assistant",
    company: "Ambrosia Botanicals",
    location: "Gurugram",
    period: "Apr 2025 – Oct 2025",
    points: [
      "Customized WordPress themes aligned with brand identity and SEO best practices",
      "Deployed applications on AWS, Vercel and Render",
      "Integrated payment gateways, email services and cloud storage",
      "Provided technical IT support",
      "Conducted code reviews and followed clean coding standards",
    ],
    tags: ["WordPress", "AWS", "Vercel", "Render", "SEO"],
  },
  {
    role: "Full Stack Developer",
    company: "Onetick Technologies",
    location: "Faridabad",
    period: "Apr 2024 – Mar 2025",
    points: [
      "Developed full-stack MERN applications",
      "Designed RESTful APIs",
      "Built responsive React interfaces",
      "Debugged and optimized existing codebases",
    ],
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
  },
];

export type Project = {
  index: string;
  title: string;
  stack: string[];
  description: string;
  features: string[];
  problem: string;
  solution: string;
  technology: string;
  result: string;
  demoUrl: string | null;
  githubUrl: string | null;
  accent: string;
};

export const projects: Project[] = [
  {
    index: "01",
    title: "E-Commerce Platform",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Vercel", "Render"],
    description:
      "Full-featured e-commerce platform with product browsing, cart, order management and secure authentication.",
    features: [
      "Product browsing",
      "Cart",
      "Order management",
      "JWT authentication",
      "RESTful backend",
      "Payment gateway",
      "Cloud deployment",
    ],
    problem:
      "Deliver a production-grade online store covering the full purchase journey — from browsing to checkout to order tracking.",
    solution:
      "A MERN application with modular RESTful services for products, cart and orders, secured with JWT authentication and role-based access, wired to a payment gateway.",
    technology: "React.js · Node.js · Express.js · MongoDB · Mongoose · JWT",
    result:
      "A scalable storefront and admin dashboard, with the frontend deployed on Vercel and backend services on Render.",
    demoUrl: null,
    githubUrl: null,
    accent: "#6366f1",
  },
  {
    index: "02",
    title: "JobIQ",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    description:
      "Modern job portal enabling job search, applications and employer job posting management.",
    features: [
      "Job search",
      "Job applications",
      "Employer job posting",
      "Authentication",
      "User profiles",
      "REST APIs",
      "Responsive React UI",
    ],
    problem:
      "Connect job seekers and employers in one place — searching and applying for roles while letting employers post and manage listings.",
    solution:
      "A responsive React interface backed by secure authentication, job-posting APIs and user profile management with a clean component architecture.",
    technology: "React.js · Node.js · Express.js · MongoDB",
    result:
      "A fully responsive job portal with distinct seeker and employer flows built on a maintainable component structure.",
    demoUrl: null,
    githubUrl: null,
    accent: "#8b5cf6",
  },
];

export const services = [
  {
    index: "01",
    title: "Full Stack Development",
    desc: "Scalable frontend and backend applications.",
  },
  {
    index: "02",
    title: "E-Commerce Development",
    desc: "Production-ready commerce platforms with authentication, payments and order management.",
  },
  {
    index: "03",
    title: "API & Backend Development",
    desc: "RESTful APIs, authentication, business logic and database architecture.",
  },
  {
    index: "04",
    title: "Deployment & Cloud",
    desc: "AWS, Vercel and Render deployment and application management.",
  },
];

export const education = {
  degree: "Bachelor of Technology — Computer Science Engineering",
  school: "Faridabad College of Engineering and Management",
  period: "Aug 2023 – Present",
};

export type Persona = "tech" | "hr";

export const personaCopy = {
  heroSubtitle: {
    tech: "Full Stack Web Developer specializing in MERN, modern frontend architecture, scalable APIs and production-ready applications.",
    hr: "Full Stack Web Developer with 2+ years building and shipping real web products — from client landing pages to full applications and cloud deployment.",
  },
  heroTag: {
    tech: "MERN Stack",
    hr: "Web Developer",
  },
  aboutIntro: {
    tech: "Full Stack MERN Developer with experience building and deploying scalable web applications using MongoDB, Express.js, React.js and Node.js. Experienced in RESTful API development, JWT authentication and cloud deployment across AWS, Vercel and Render.",
    hr: "Full Stack Web Developer with 2+ years of hands-on experience delivering web applications and marketing websites for clients and teams. I take projects from idea to launch — the interface, the backend and the deployment — with a focus on reliability, clean work and real results.",
  },
  aboutSecondary: {
    tech: "I care about clean code, performance and solving real-world problems — from designing resilient APIs to shipping polished, responsive interfaces and managing deployments end to end.",
    hr: "I've worked across freelance projects, an IT support role and a full-stack developer position — comfortable owning work independently, collaborating with a team and communicating clearly throughout.",
  },
  stackDesc: {
    tech: "A constellation of the frontend, backend, database and cloud tools I use to ship production-ready applications. Hover to explore.",
    hr: "A snapshot of the core skills I bring across frontend, backend, database, cloud and content-management work.",
  },
  experienceDesc: {
    tech: "A track record of building full-stack applications, customizing platforms and shipping to the cloud.",
    hr: "A track record across freelance, IT support and full-stack development roles — delivering real projects end to end.",
  },
  projectsDesc: {
    tech: "A closer look at what I've been building — from full-stack commerce to a modern job platform.",
    hr: "Selected projects that show how I take ideas from concept to a working, live product.",
  },
} as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];
