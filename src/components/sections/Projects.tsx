// src/components/sections/Projects.tsx
import Reveal from "../../components/Reveal";
import { projects } from "../../data/site";
import {
  section,
  h2,
  btnSmallPrimary,
  btnSmallOutline,
  ext,
} from "../../lib/styles";

export default function Projects() {
  return (
    <section id="projects" className={section}>
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className={h2}>Projects</h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 120}>
              <article
                className={`flex h-full flex-col rounded-2xl border border-white/10 bg-gradient-to-br ${p.gradient} to-transparent p-6 transition duration-300 hover:-translate-y-1 hover:border-lime-400/50`}
              >
                <p
                  className={`text-xs font-semibold uppercase tracking-widest ${p.accent}`}
                >
                  {p.subtitle}
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-white">
                  {p.title}
                  <span className="ml-2 text-base font-normal text-white/50 font-[family-name:var(--font-noto-bengali)]">
                    {p.titleBn}
                  </span>
                </h3>
                <p className="mt-3 flex-1 text-white/70">{p.description}</p>

                <ul className="mt-4 flex flex-wrap gap-2 text-xs">
                  {p.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-white/15 px-3 py-1 text-white/80"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex gap-3">
                  {p.demo && (
                    <a href={p.demo} {...ext} className={btnSmallPrimary}>
                      Live Demo
                    </a>
                  )}
                  {p.github && (
                    <a href={p.github} {...ext} className={btnSmallOutline}>
                      GitHub
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
