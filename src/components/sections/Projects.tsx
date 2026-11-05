import Reveal from "../../components/Reveal";
import MaskText from "../../components/motion/MaskText";
import TiltCard from "../../components/motion/TiltCard";
import { projects } from "../../data/site";

import {
  section,
  container,
  kicker,
  h2,
  ext,
  btnSmallPrimary,
  btnSmallOutline,
} from "../../lib/styles";

import { ArrowUpRight, GitHubIcon } from "../../components/icons";

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className={`${section} relative overflow-hidden`}
    >
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        data-parallax="0.12"
        className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-accent/5 blur-[130px]"
      />

      <div className={`${container} relative`}>
        {/* Section heading */}
        <Reveal>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className={kicker}>
                Projects
                <span aria-hidden="true" className="h-px w-8 bg-accent/50" />
              </p>

              <h2 id="projects-heading" className={h2}>
                <MaskText className="block">
                  Selected <span className="text-accent">work.</span>
                </MaskText>
              </h2>

              <p className="lead mt-4 max-w-xl">
                Real projects built end to end — deployed, documented, and open
                source.
              </p>
            </div>

            <p className="hidden text-sm text-muted sm:block">
              A collection of my work
              <span className="ml-2 text-accent">↘</span>
            </p>
          </div>
        </Reveal>

        {/* Project grid */}
        <div className="mt-14 grid gap-7 md:grid-cols-2">
          {projects.map((p, i) => {
            const featured = i === 0;

            return (
              <Reveal
                key={p.title}
                delay={i * 120}
                className={featured ? "md:col-span-2" : ""}
              >
                <TiltCard
                  max={featured ? 4 : 6}
                  className="h-full"
                >
                  <article
                    className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-card transition-[border-color,background-color,box-shadow] duration-500 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/5 ${
                      featured ? "md:flex-row" : ""
                    }`}
                  >
                  {/* Project visual */}
                  <div
                    className={`relative isolate overflow-hidden bg-gradient-to-br ${p.gradient} to-transparent ${
                      featured
                        ? "aspect-[16/9] md:aspect-auto md:min-h-[380px] md:w-[54%]"
                        : "aspect-[16/9]"
                    }`}
                  >
                    {/* Grid pattern */}
                    <div
                      aria-hidden="true"
                      className="bg-grid absolute inset-0 opacity-50 transition-opacity duration-500 group-hover:opacity-80"
                    />

                    {/* Glow */}
                    <div
                      aria-hidden="true"
                      className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[70px] transition-all duration-700 group-hover:scale-150 group-hover:bg-accent/20"
                    />

                    {/* Bengali title decoration */}
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-4 left-5 select-none font-[family-name:var(--font-noto-bengali)] text-6xl font-bold text-fg/[0.07] transition-all duration-500 group-hover:-translate-y-3 group-hover:text-fg/[0.13] sm:text-8xl md:left-8"
                    >
                      {p.titleBn}
                    </span>

                    {/* Project number */}
                    <span className="absolute right-6 top-6 font-mono text-sm tracking-widest text-muted/70">
                      PROJECT / {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Center title */}
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      <h3
                        className={`text-center font-bold tracking-tight text-fg/80 transition-all duration-500 group-hover:scale-105 group-hover:text-fg ${
                          featured
                            ? "text-4xl sm:text-6xl"
                            : "text-3xl sm:text-4xl"
                        }`}
                      >
                        {p.title}
                      </h3>
                    </div>

                    {/* Bottom accent line */}
                    <div className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 group-hover:scale-x-100" />
                  </div>

                  {/* Project details */}
                  <div
                    className={`relative flex flex-1 flex-col p-6 sm:p-8 ${
                      featured ? "md:justify-center md:p-10" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                        {p.subtitle}
                      </p>

                      <span className="text-xs text-muted/50">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                      {p.title}

                      <span className="font-[family-name:var(--font-noto-bengali)] text-base font-normal text-muted">
                        {p.titleBn}
                      </span>
                    </h3>

                    <p className="mt-4 flex-1 leading-relaxed text-muted">
                      {p.description}
                    </p>

                    {/* Technologies */}
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {p.tech.map((technology) => (
                        <li
                          key={technology}
                          className="rounded-full border border-line bg-bg/50 px-3.5 py-1.5 text-xs font-medium text-fg/75 transition-all duration-300 hover:border-accent/50 hover:bg-accent-soft hover:text-accent"
                        >
                          {technology}
                        </li>
                      ))}
                    </ul>

                    {/* Project links */}
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      {p.demo && (
                        <a
                          href={p.demo}
                          {...ext}
                          className={`${btnSmallPrimary} group/link`}
                        >
                          <span className="inline-flex items-center gap-2">
                            Live Demo
                            <ArrowUpRight
                              size={15}
                              className="transition-transform duration-300 group-hover/link:-translate-y-1 group-hover/link:translate-x-1"
                            />
                          </span>
                        </a>
                      )}

                      {p.github && (
                        <a
                          href={p.github}
                          {...ext}
                          className={`${btnSmallOutline} transition-all duration-300 hover:border-accent hover:text-accent`}
                        >
                          <span className="inline-flex items-center gap-2">
                            <GitHubIcon size={15} />
                            {p.backend ? "Frontend GitHub" : "GitHub"}
                          </span>
                        </a>
                      )}

                      {p.backend && (
                        <a
                          href={p.backend}
                          {...ext}
                          className={`${btnSmallOutline} transition-all duration-300 hover:border-accent hover:text-accent`}
                        >
                          <span className="inline-flex items-center gap-2">
                            <GitHubIcon size={15} />
                            Backend GitHub
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom decoration */}
        <Reveal>
          <div className="mt-12 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-muted/60">
            <span className="h-px w-10 bg-line" />
            More projects coming soon
            <span className="h-px w-10 bg-line" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
