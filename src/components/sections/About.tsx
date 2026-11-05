import Reveal from "../../components/Reveal";
import MaskText from "../../components/motion/MaskText";
import { site } from "../../data/site";

import { section, container, kicker, h2, card } from "../../lib/styles";

const facts = [
  {
    label: "Studying",
    value: "Diploma in Computer Science & Technology",
  },
  {
    label: "Building with",
    value: "React · Next.js · TypeScript · MongoDB",
  },
  {
    label: "Open to",
    value: "Internships · Freelance · Junior roles",
  },
  {
    label: "GPA (SSC)",
    value: "5.00",
  },
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className={`${section} relative isolate overflow-hidden`}
    >
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        data-parallax="0.14"
        className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-accent/8 blur-[140px]"
      />

      <div
        aria-hidden="true"
        data-parallax="0.1"
        className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent/5 blur-[120px]"
      />

      <div
        className={`${container} relative grid items-start gap-14 lg:grid-cols-[1.4fr_0.9fr] lg:gap-24`}
      >
        {/* About Content */}
        <Reveal>
          <div>
            <p className={`${kicker} flex items-center gap-3`}>
              <span className="h-px w-8 bg-accent" />
              About Me
              <span className="font-mono text-[10px] tracking-widest text-muted/50">
                / 01
              </span>
            </p>

            <h2
              id="about-heading"
              className={`${h2} mt-6 max-w-2xl leading-[1.12] tracking-[-0.05em]`}
            >
              <MaskText className="block">More than code.</MaskText>

              <MaskText className="block" delay={110}>
                <span className="text-accent">Driven by curiosity.</span>
              </MaskText>
            </h2>

            <div className="mt-9 max-w-2xl space-y-6">
              <p className="text-base leading-[1.95] text-muted sm:text-lg">
                {site.about}
              </p>

              <p className="text-base leading-[1.95] text-muted sm:text-lg">
                At the Graphic Arts Institute I study Computer Science and
                Technology — then apply what I learn right away by building and
                deploying real projects with React, Next.js, TypeScript, and
                MongoDB.
              </p>

              <p className="text-base leading-[1.95] text-muted sm:text-lg">
                What excites me is the full journey of building: a clean
                interface, readable code behind it, and a product people
                actually enjoy using.
              </p>
            </div>

            {/* Personal approach */}
            <div className="group mt-10 flex max-w-xl items-start gap-4 rounded-r-2xl border-l-2 border-accent bg-accent/5 py-5 pl-5 pr-5 transition-colors duration-300 hover:bg-accent/10">
              <span
                aria-hidden="true"
                className="text-4xl font-light leading-none text-accent"
              >
                “
              </span>

              <div>
                <p className="text-sm font-medium leading-relaxed text-fg sm:text-base">
                  Learning by building. Improving with every project.
                </p>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                  My approach
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Information Card */}
        <Reveal delay={150}>
          <div
            className={`${card} group relative overflow-hidden rounded-3xl border border-line/80 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.18)] transition-all duration-500 hover:border-accent/30 sm:p-8`}
          >
            {/* Card atmosphere */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-[90px] transition-opacity duration-500 group-hover:bg-accent/15"
            />

            <div className="relative">
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">
                    Personal Snapshot
                  </p>

                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-fg">
                    At a glance<span className="text-accent">.</span>
                  </h3>

                  <p className="mt-2 text-xs text-muted">
                    A little more about my journey.
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-xl text-accent shadow-[0_0_25px_var(--accent-glow)]"
                >
                  ✳
                </span>
              </div>

              <dl>
                {facts.map((fact, index) => (
                  <div
                    key={fact.label}
                    className="group/item flex flex-col gap-3 border-b border-line/80 py-5 last:border-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between sm:gap-5"
                  >
                    <dt className="flex shrink-0 items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                      <span className="font-mono text-accent/70">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {fact.label}
                    </dt>

                    <dd className="max-w-[260px] text-sm font-medium leading-relaxed text-fg transition-colors duration-300 group-hover/item:text-accent sm:text-right">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Card footer */}
              <div className="mt-9 flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent-glow)]" />
                <span className="h-px flex-1 bg-line" />
                <span className="font-mono text-[9px] tracking-[0.2em] text-muted/60">
                  ABOUT / SOHID
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
