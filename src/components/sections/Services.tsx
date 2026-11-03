import Reveal from "../../components/Reveal";
import { services } from "../../data/site";

import { section, container, kicker, h2, card, lead } from "../../lib/styles";

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className={`${section} relative isolate overflow-hidden`}
    >
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-accent/8 blur-[140px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-accent/5 blur-[130px]"
      />

      <div className={`${container} relative`}>
        {/* Section heading */}
        <Reveal>
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <p className={`${kicker} flex items-center gap-3`}>
                <span className="h-px w-8 bg-accent" />
                Services
                <span className="font-mono text-[10px] tracking-widest text-muted/50">
                  / 02
                </span>
              </p>

              <h2
                id="services-heading"
                className={`${h2} mt-6 max-w-xl leading-[1.12] tracking-[-0.05em]`}
              >
                What I can
                <br />
                <span className="text-accent">build for you.</span>
              </h2>
            </div>

            <p className={`${lead} max-w-md leading-[1.9]`}>
              From the first sketch to a live website, here is how I can help
              bring your idea to life.
            </p>
          </div>
        </Reveal>

        {/* Services cards */}
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 120}>
              <article
                className={`${card} group relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-3xl border border-line/80 p-7 shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-2 hover:border-accent/30 hover:shadow-[0_25px_70px_rgba(0,0,0,0.25)] sm:p-8`}
              >
                {/* Hover atmosphere */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/0 blur-[90px] transition-all duration-700 group-hover:bg-accent/10"
                />

                <div className="relative flex flex-1 flex-col">
                  {/* Number and icon */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-[0.2em] text-accent/80">
                      SERVICE / {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      aria-hidden="true"
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-card/70 text-xl text-muted transition-all duration-500 group-hover:rotate-45 group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:text-accent"
                    >
                      ↗
                    </span>
                  </div>

                  {/* Content */}
                  <div className="mt-14">
                    <h3 className="text-xl font-semibold tracking-tight text-fg transition-colors duration-300 group-hover:text-accent sm:text-2xl">
                      {service.title}
                    </h3>

                    <p className="mt-4 text-sm leading-[1.95] text-muted sm:text-base">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom details */}
                  <div className="mt-auto pt-12">
                    <div className="h-px w-full bg-line transition-colors duration-500 group-hover:bg-accent/40" />

                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                        What I offer
                      </span>

                      <span className="flex items-center gap-2 text-xs font-medium text-muted transition-colors duration-300 group-hover:text-accent">
                        Explore
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Animated bottom accent */}
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
