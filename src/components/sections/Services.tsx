import Reveal from "../../components/Reveal";
import { services } from "../../data/site";

import { section, container, kicker, h2, card, lead } from "../../lib/styles";

export default function Services() {
  return (
    <section id="services" className={`${section} relative overflow-hidden`}>
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-accent/5 blur-[130px]"
      />

      <div className={`${container} relative`}>
        {/* Section heading */}
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className={kicker}>
                Services
                <span aria-hidden="true" className="h-px w-8 bg-accent/50" />
              </p>

              <h2 className={`${h2} max-w-xl`}>
                What I <span className="text-accent">do.</span>
              </h2>
            </div>

            <p className={`${lead} max-w-md`}>
              From the first sketch to a live website, here is how I can help
              bring your idea to life.
            </p>
          </div>
        </Reveal>

        {/* Services cards */}
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 120}>
              <article
                className={`${card} group relative flex h-full min-h-[300px] flex-col overflow-hidden p-7 transition-all duration-500 hover:-translate-y-2 hover:border-accent/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] sm:p-8`}
              >
                {/* Hover glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent/0 blur-[80px] transition-all duration-700 group-hover:bg-accent/10"
                />

                <div className="relative flex flex-1 flex-col">
                  {/* Number and decorative icon */}
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-sm tracking-widest text-accent/70">
                      / {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-lg text-muted transition-all duration-500 group-hover:rotate-45 group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:text-accent"
                    >
                      ↗
                    </span>
                  </div>

                  {/* Content */}
                  <div className="mt-12">
                    <h3 className="text-xl font-semibold tracking-tight text-fg transition-colors duration-300 group-hover:text-accent sm:text-2xl">
                      {service.title}
                    </h3>

                    <p className="mt-4 text-sm leading-[1.9] text-muted sm:text-base">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom decoration */}
                  <div className="mt-auto pt-10">
                    <div className="h-px w-full bg-line transition-all duration-500 group-hover:bg-accent/40" />

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                        What I offer
                      </span>

                      <span className="h-1.5 w-1.5 rounded-full bg-accent/40 transition-all duration-300 group-hover:scale-150 group-hover:bg-accent" />
                    </div>
                  </div>
                </div>

                {/* Bottom accent line */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-700 group-hover:w-full"
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
