export const site = {
  name: "Sohid Mondol",
  email: "sohid10960@gmail.com",
  // Put your PDF at public/Sohid-Mondol-CV.pdf
  whatsapp: "8801719026575",
  cv: "/Sohid-CV.pdf",
  about:
    "I'm a Computer Science student who enjoys turning ideas into fast, clean, and easy-to-use websites. I learn by building real projects, and I care about readable code, good design, and accessibility.",
  intro:
    "Computer Science student building fast, modern web experiences with React, Next.js, and TypeScript.",
  github: "https://github.com/eng-sohid",
  linkedin: "https://www.linkedin.com/in/md-sohid-mondol-0a6666408/",
};

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#projects", label: "Projects" },
];

type SkillGroup = {
  title: string;
  description: string;
  items: {
    name: string;
    /** Path inside devicon/icons, or "simpleicons:<slug>" for icons devicon doesn't have. */
    logo?: string;
    /** Logos that are dark glyphs (Next.js, GitHub, …) need a white backdrop to stay visible in dark mode. */
    lightLogo?: boolean;
  }[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages & Core",
    description: "The languages I write every day.",
    items: [
      { name: "HTML5", logo: "html5/html5-original" },
      { name: "CSS3", logo: "css3/css3-original" },
      { name: "JavaScript", logo: "javascript/javascript-original" },
      { name: "TypeScript", logo: "typescript/typescript-original" },
      { name: "Python", logo: "python/python-original" },
      { name: "C", logo: "c/c-original" },
      { name: "C++", logo: "cplusplus/cplusplus-original" },
    ],
  },
  {
    title: "Frontend",
    description: "Interfaces that feel fast and look sharp.",
    items: [
      { name: "React", logo: "react/react-original" },
      { name: "Next.js", logo: "nextjs/nextjs-original", lightLogo: true },
      { name: "Tailwind CSS", logo: "tailwindcss/tailwindcss-original" },
    ],
  },
  {
    title: "Backend & Data",
    description: "APIs and databases behind the UI.",
    items: [
      { name: "Node.js", logo: "nodejs/nodejs-original" },
      { name: "Express.js", logo: "express/express-original", lightLogo: true },
      { name: "MongoDB", logo: "mongodb/mongodb-original" },
      { name: "REST APIs" },
    ],
  },
  {
    title: "Tools & Workflow",
    description: "How I build, review, and ship.",
    items: [
      { name: "Git", logo: "git/git-original" },
      { name: "GitHub", logo: "github/github-original", lightLogo: true },
      { name: "Vercel", logo: "vercel/vercel-original", lightLogo: true },
      { name: "VS Code", logo: "vscode/vscode-original" },
      { name: "ESLint", logo: "eslint/eslint-original" },
      { name: "Prettier", logo: "simpleicons:prettier:F7B733" },
    ],
  },
];

/** Resolves a skill logo to a verified CDN URL. */
export function techLogoUrl(item: SkillGroup["items"][number]): string | null {
  if (!item.logo) return null;
  if (item.logo.startsWith("simpleicons:")) {
    const [, slug, color] = item.logo.split(":");
    return `https://cdn.simpleicons.org/${slug}${color ? `/${color}` : ""}`;
  }
  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${item.logo}.svg`;
}

export type Project = {
  title: string;
  titleBn: string;
  subtitle: string;
  description: string;
  tech: string[];
  gradient: string;
  demo?: string;
  github?: string;
  backend?: string;
};

export const projects: Project[] = [
  {
    title: "BookNook",
    titleBn: "বুক নুক",
    subtitle: "Full Stack Online Book Platform",
    description:
      "A full-stack online book platform where users can explore books, browse different categories, and discover their favorite reads. Built with separate frontend and backend applications, featuring a responsive interface and book management functionality.",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Better Auth",
    ],
    gradient: "from-violet-500/15",
    demo: "https://book-nook-theta.vercel.app",
    github: "https://github.com/eng-sohid/Book-Nook",
    backend: "https://github.com/eng-sohid/Book-Nook-Backend",
  },

  {
    title: "Wanderlust",
    titleBn: "ওয়ান্ডারলাস্ট",
    subtitle: "Travel & Destination Booking Platform",
    description:
      "A modern travel booking platform where users can explore destinations, view trip details, and book their favorite travel experiences. Features user authentication, destination management, and booking management with a responsive interface.",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Better Auth",
    ],
    gradient: "from-sky-500/15",
    demo: "https://wanderlust-omega-woad.vercel.app",
    github: "https://github.com/eng-sohid/Wander-lust-Frontend",
    backend: "https://github.com/eng-sohid/Wander-lust-Backend",
  },
  {
    title: "Bazar Dor",
    titleBn: "বাজার দর",
    subtitle: "Product Price Platform",
    description:
      "A responsive Bengali product-price platform designed to help users explore everyday essentials and view product prices by category.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
    gradient: "from-lime-400/15",
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
    demo: "https://bangla-news-24-neon.vercel.app",
    github: "https://github.com/eng-sohid/Bangla-News-24",
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
  gpa?: string;
  current?: boolean;
};

export const education: Education[] = [
  {
    degree: "Diploma in Engineering (Computer Science & Technology)",
    institute: "Graphic Arts Institute",
    period: "Session 2024–25 · Currently in 4th Semester",
    note: "Studying Computer Science and Technology, while building real-world web projects with React, Next.js, and TypeScript.",
    current: true,
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institute: "New All Insaf Islami Academy",
    period: "Completed in 2024",
    gpa: "5.00",
  },
];
