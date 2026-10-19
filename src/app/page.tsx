import Image from "next/image";
import Navbar from "../components/Navbar";
import CurrentYear from "../components/CurrentYear";
import { site, skillGroups, projects } from "../data/site";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

const btnPrimary =
  "inline-flex items-center rounded-lg bg-lime-400 px-6 py-3.5 font-semibold text-black transition duration-300 hover:bg-lime-300";
const btnOutline =
  "inline-flex items-center rounded-lg border border-white/15 px-6 py-3.5 font-semibold text-white transition duration-300 hover:border-lime-400 hover:text-lime-400";
const btnSmallPrimary =
  "rounded-lg bg-lime-400 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-lime-300";
const btnSmallOutline =
  "rounded-lg border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-lime-400 hover:text-lime-400";
const section = "border-t border-white/10 px-6 py-20 sm:py-28";
const h2 = "text-3xl font-bold text-white sm:text-4xl";

export default function Home() {
  return (
    <>
      <Navbar />

      <main id="main">
        {/* Hero */}
        <section
          id="about"
          aria-labelledby="hero-heading"
          className="relative overflow-hidden px-6 py-20 sm:py-28 lg:py-32"
        >
          <div className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-lime-400/10 blur-[120px]" />

          <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
            <div>
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/5 px-4 py-2 text-sm text-lime-400">
                <span className="h-2 w-2 rounded-full bg-lime-400" />
                Computer Science student · Open to opportunities
              </p>

              <h1
                id="hero-heading"
                className="text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
              >
                Hi, I&apos;m
                <br />
                Sohid <span className="text-lime-400">Mondol.</span>
              </h1>

              <p className="mt-5 text-xl font-semibold text-gray-300 sm:text-2xl">
                Full-stack web developer in the making.
              </p>

              <p className="mt-6 max-w-xl text-base leading-8 text-gray-400 sm:text-lg">
                I&apos;m a Computer Science student who enjoys building
                responsive web applications with React, Next.js, and TypeScript.
                I&apos;m growing through hands-on projects, with the goal of
                becoming a professional software engineer.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <a href="#projects" className={btnPrimary}>
                  View projects
                </a>
                <a href="#contact" className={btnOutline}>
                  Contact me
                </a>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-5 text-sm text-gray-400">
                <a
                  href={site.github}
                  {...ext}
                  className="transition hover:text-lime-400"
                >
                  GitHub
                </a>
                <span className="h-1 w-1 rounded-full bg-gray-600" />
                <a
                  href={site.linkedin}
                  {...ext}
                  className="transition hover:text-lime-400"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Profile image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm">
                <div className="absolute -inset-3 rotate-6 rounded-3xl border border-lime-400/20" />

                {/* `fill` needs a parent with a size, so the aspect ratio lives here. */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-[#111511]">
                  <Image
                    src="/Profile.jpeg"
                    alt="Portrait of Sohid Mondol"
                    fill
                    priority
                    sizes="(min-width: 640px) 384px, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-6 pt-20">
                    <p className="text-lg font-bold text-white">Sohid Mondol</p>
                    <p className="mt-1 text-sm text-lime-400">
                      Full-Stack Web Developer in Progress
                    </p>
                  </div>
                </div>

                <div className="absolute -bottom-5 -left-5 rounded-xl border border-white/10 bg-[#111511] px-4 py-3 shadow-xl sm:-left-8">
                  <p className="text-xs text-gray-400">Currently learning</p>
                  <p className="mt-1 text-sm font-semibold text-lime-400">
                    React, Next.js, TypeScript
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section
          id="skills"
          aria-labelledby="skills-heading"
          className={section}
        >
          <div className="mx-auto max-w-6xl">
            <h2 id="skills-heading" className={h2}>
              Skills
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-gray-400">
              The technologies I use to build modern, responsive web
              applications.
            </p>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {skillGroups.map((group) => (
                <div
                  key={group.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition duration-300 hover:border-lime-400/40"
                >
                  <h3 className="font-bold text-white">{group.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {group.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-gray-300"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section
          id="projects"
          aria-labelledby="projects-heading"
          className={section}
        >
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <h2 id="projects-heading" className={h2}>
                  Projects
                </h2>
                <p className="mt-4 max-w-xl leading-7 text-gray-400">
                  Projects I&apos;ve built while learning and sharpening my web
                  development skills.
                </p>
              </div>

              <a
                href={site.github}
                {...ext}
                className="w-fit text-sm font-semibold text-lime-400 transition hover:text-lime-300"
              >
                More on GitHub
              </a>
            </div>

            <div className="mt-12 grid gap-7 md:grid-cols-2">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition duration-300 hover:border-lime-400/40"
                >
                  <div
                    className={`flex h-52 items-center justify-center border-b border-white/10 bg-gradient-to-br ${project.gradient} via-[#101510] to-black`}
                  >
                    <div className="text-center">
                      <p lang="bn" className="text-3xl font-bold text-white">
                        {project.titleBn}
                      </p>
                      <p className={`mt-1 text-sm ${project.accent}`}>
                        {project.title}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <ul className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-300"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>

                    <h3 className="mt-5 text-xl font-bold text-white">
                      {project.title}: {project.subtitle}
                    </h3>
                    <p className="mt-3 leading-7 text-gray-400">
                      {project.description}
                    </p>

                    <div className="mt-auto flex flex-wrap gap-3 pt-7">
                      {project.demo && (
                        <a
                          href={project.demo}
                          {...ext}
                          aria-label={`${project.title}: live demo (opens in a new tab)`}
                          className={btnSmallPrimary}
                        >
                          Live demo
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          {...ext}
                          aria-label={`${project.title}: source code on GitHub (opens in a new tab)`}
                          className={btnSmallOutline}
                        >
                          Source code
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className={section}
        >
          <div className="mx-auto max-w-6xl">
            <h2
              id="contact-heading"
              className="text-3xl font-bold text-white sm:text-5xl"
            >
              Let&apos;s work together.
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-gray-400">
              I&apos;m always interested in learning, building meaningful
              projects, and connecting with people in the tech community. Reach
              out if you&apos;d like to collaborate or discuss an opportunity.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a href={`mailto:${site.email}`} className={btnPrimary}>
                Email me
              </a>
              <a href={site.linkedin} {...ext} className={btnOutline}>
                LinkedIn
              </a>
              <a href={site.github} {...ext} className={btnOutline}>
                GitHub
              </a>
            </div>

            <p className="mt-8 text-sm text-gray-500">
              Prefer to write directly?{" "}
              <a
                href={`mailto:${site.email}`}
                className="break-all text-gray-300 underline decoration-white/20 underline-offset-4 transition hover:text-lime-400"
              >
                {site.email}
              </a>
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center text-sm text-gray-500 sm:flex-row sm:text-left">
          <p>
            © <CurrentYear /> {site.name}. All rights reserved.
          </p>
          <p>Built with Next.js and Tailwind CSS.</p>
          <a href="#" className="transition hover:text-lime-400">
            Back to top
          </a>
        </div>
      </footer>
    </>
  );
}
