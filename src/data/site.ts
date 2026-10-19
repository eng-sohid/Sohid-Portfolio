export const site = {
  name: "Sohid Mondol",
  email: "sohid10960@gmail.com",
  github: "https://github.com/eng-sohid",
  linkedin: "https://www.linkedin.com/in/md-sohid-mondol-0a6666408/",
};

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
];

export const skillGroups = [
  {
    title: "Frontend",
    description: "Responsive, accessible interfaces built with modern tooling.",
    items: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend & Data",
    description: "Working with APIs and databases in full-stack projects.",
    items: ["REST APIs", "MongoDB"],
  },
  {
    title: "Tools & Workflow",
    description: "The everyday tools I use to build, review, and ship.",
    items: ["Git & GitHub", "Vercel", "VS Code", "ESLint", "Prettier"],
  },
];

export type Project = {
  title: string;
  titleBn: string;
  subtitle: string;
  description: string;
  tech: string[];
  gradient: string;
  accent: string;
  demo?: string;
  github?: string;
};

export const projects: Project[] = [
  {
    title: "Bazar Dor",
    titleBn: "বাজার দর",
    subtitle: "Product Price Platform",
    description:
      "A responsive Bengali product-price platform designed to help users explore everyday essentials and view product prices by category.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
    gradient: "from-lime-400/15",
    accent: "text-lime-400",
    demo: "https://bazar-dor-nine.vercel.app",
    github: "https://github.com/eng-sohid/Bazar-dor",
  },
  {
    title: "Bangla News 24",
    titleBn: "বাংলা নিউজ ২৪",
    subtitle: "News Website",
    description:
      "A Bengali news website built for practice, featuring a clean news-focused layout, responsive design, and API-based news content.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "REST API"],
    gradient: "from-red-500/15",
    accent: "text-red-400",
    demo: "https://bangla-news-24-neon.vercel.app/",
    // github: "https://github.com/eng-sohid/<repo-name>", // add when the repo is public
  },
];
