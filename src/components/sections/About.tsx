import Reveal from "../../components/Reveal";
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
    <section id="about" className={`${section} relative overflow-hidden`}>
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-accent/5 blur-[120px]"
      />

      <div
        className={`${container} relative grid items-start gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-20`}
      >
        {/* About Content */}
        <Reveal>
          <div>
            <p className={kicker}>
              About
              <span aria-hidden="true" className="h-px w-8 bg-accent/50" />
            </p>

            <h2 className={`${h2} max-w-xl`}>
              A little about <span className="text-accent">me.</span>
            </h2>

            <div className="mt-8 space-y-5">
              <p className="max-w-2xl text-base leading-[1.9] text-muted sm:text-lg">
                {site.about}
              </p>

              <p className="max-w-2xl text-base leading-[1.9] text-muted sm:text-lg">
                At the Graphic Arts Institute I study Computer Science and
                Technology — then apply what I learn right away by building and
                deploying real projects with React, Next.js, TypeScript, and
                MongoDB.
              </p>

              <p className="max-w-2xl text-base leading-[1.9] text-muted sm:text-lg">
                What excites me is the full journey of building: a clean
                interface, readable code behind it, and a product people
                actually enjoy using.
              </p>
            </div>

            {/* Personal approach */}
            <div className="mt-9 flex items-center gap-4 border-l-2 border-accent/60 pl-5">
              <span className="text-2xl font-light text-accent">“</span>

              <p className="text-sm leading-relaxed text-muted">
                Learning by building. Improving with every project.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Information Card */}
        <Reveal delay={150}>
          <div className={`${card} relative overflow-hidden p-6 sm:p-8`}>
            {/* Card glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent/10 blur-[70px]"
            />

            <div className="relative">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    Quick overview
                  </p>

                  <h3 className="mt-2 text-xl font-semibold text-fg">
                    At a glance.
                  </h3>
                </div>

                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/20 bg-accent-soft text-accent"
                >
                  ✳
                </span>
              </div>

              <dl>
                {facts.map((fact, index) => (
                  <div
                    key={fact.label}
                    className="group flex flex-col gap-2 border-b border-line py-5 last:border-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between sm:gap-5"
                  >
                    <dt className="flex shrink-0 items-center gap-3 text-xs font-semibold uppercase tracking-wider text-muted">
                      <span className="font-mono text-accent/60">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {fact.label}
                    </dt>

                    <dd className="max-w-[260px] text-sm font-medium leading-relaxed text-fg transition-colors duration-300 group-hover:text-accent sm:text-right">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Bottom decoration */}
              <div className="mt-8 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="h-px flex-1 bg-line" />
                <span className="font-mono text-[10px] tracking-widest text-muted/60">
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
