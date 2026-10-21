export const site = {
  name: "Sohid Mondol",
  email: "sohid10960@gmail.com",
  // Put your PDF at public/Sohid-Mondol-CV.pdf
  whatsapp: "8801719026575",
  cv: "/Sohid-Mondol-CV.pdf",
  about:
    "I'm a Computer Science student who enjoys turning ideas into fast, clean, and easy-to-use websites. I learn by building real projects, and I care about readable code, good design, and accessibility.",
  github: "https://github.com/eng-sohid",
  linkedin: "https://www.linkedin.com/in/md-sohid-mondol-0a6666408/",
};

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
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
    items: ["Node.js", "Express.js", "REST APIs", "MongoDB"],
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

export const services = [
  {
    title: "Responsive interfaces",
    description:
      "Clean, mobile-first layouts built with React, Next.js, and Tailwind CSS that look right on every screen.",
  },
  {
    title: "Full-stack web apps",
    description:
      "End-to-end features with TypeScript, from the user interface to the database, deployed on Vercel.",
  },
  {
    title: "API and data integration",
    description:
      "Connecting apps to REST APIs and MongoDB so content and data stay dynamic and easy to update.",
  },
];

export type Education = {
  degree: string;
  institute: string;
  period: string;
  note?: string;
};

export const education: Education[] = [
  {
    degree: "Diploma in Engineering",
    institute: "Graphic Arts Institute",
    period: "2024 – Present",
    note: "Currently studying, with a focus on building real web projects alongside my diploma.",
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institute: "New All Insaf Islami Acadeay",
    period: "Completed in 2024",
  },
];
