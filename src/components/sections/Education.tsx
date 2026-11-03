import Reveal from "../../components/Reveal";
import { education } from "../../data/site";

import { section, container, kicker, h2 } from "../../lib/styles";

export default function Education() {
  return (
    <section id="education" className={`${section} relative overflow-hidden`}>
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-accent/5 blur-[130px]"
      />

      <div className={`${container} relative`}>
        {/* Section heading */}
        <Reveal>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className={kicker}>
                Education
                <span aria-hidden="true" className="h-px w-8 bg-accent/50" />
              </p>

              <h2 className={h2}>
                My <span className="text-accent">education.</span>
              </h2>
            </div>

            <p className="max-w-xs text-sm leading-relaxed text-muted">
              The academic journey behind what I learn and build.
            </p>
          </div>
        </Reveal>

        {/* Education timeline */}
        <ol className="relative mt-12">
          {/* Timeline line */}
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-[7px] top-8 w-px bg-line sm:left-[188px]"
          />

          {education.map((item, index) => (
            <li key={item.degree} className="relative">
              <Reveal delay={index * 120}>
                <div className="relative grid gap-5 pb-8 sm:grid-cols-[160px_1fr] sm:gap-10 sm:pb-10">
                  {/* Timeline marker */}
                  <div className="relative flex items-center gap-4 sm:items-start sm:pt-7">
                    <span
                      className={`relative z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                        item.current
                          ? "border-accent bg-accent/20 shadow-[0_0_18px_rgba(204,255,0,0.25)]"
                          : "border-line bg-bg"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          item.current ? "bg-accent" : "bg-muted/50"
                        }`}
                      />
                    </span>

                    <div className="flex flex-wrap items-center gap-3 sm:block">
                      <p className="font-mono text-sm font-medium tracking-wide text-accent">
                        {item.period}
                      </p>

                      {item.current && (
                        <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-soft px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                          Currently studying
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Education content */}
                  <article
                    className={`group relative overflow-hidden rounded-2xl transition-all duration-500 ${
                      item.current
                        ? "border border-accent/25 bg-card p-6 shadow-[0_10px_40px_rgba(0,0,0,0.12)] hover:border-accent/45 sm:p-8"
                        : "border border-line bg-card/40 p-6 hover:border-accent/25 hover:bg-card sm:p-8"
                    }`}
                  >
                    {item.current && (
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent/10 blur-[80px]"
                      />
                    )}

                    <div className="relative">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="max-w-2xl">
                          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                            {item.current
                              ? "Current education"
                              : `Academic record / ${String(index + 1).padStart(2, "0")}`}
                          </p>

                          <h3 className="text-xl font-semibold leading-snug text-fg transition-colors duration-300 group-hover:text-accent sm:text-2xl">
                            {item.degree}
                          </h3>

                          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                            {item.institute}
                          </p>
                        </div>

                        {item.gpa && (
                          <div className="rounded-xl border border-accent/25 bg-accent/5 px-4 py-3">
                            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-muted">
                              GPA
                            </p>

                            <p className="mt-1 text-xl font-bold text-accent">
                              {item.gpa}
                            </p>
                          </div>
                        )}
                      </div>

                      {item.note && (
                        <p className="mt-5 max-w-2xl border-t border-line pt-5 text-sm leading-[1.9] text-muted">
                          {item.note}
                        </p>
                      )}
                    </div>

                    {/* Hover accent */}
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-700 group-hover:w-full"
                    />
                  </article>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
