import Image from "next/image";
import Reveal from "../../components/Reveal";
import { skillGroups, techLogoUrl } from "../../data/site";

import { section, container, kicker, h2, card } from "../../lib/styles";

// All skills are repeated to create a seamless marquee.
const marqueeItems = skillGroups.flatMap((group) => group.items);

function Logo({
  url,
  lightLogo,
  size,
}: {
  url: string;
  lightLogo?: boolean;
  size: number;
}) {
  return (
    <Image
      src={url}
      alt=""
      width={size}
      height={size}
      unoptimized
      className={lightLogo ? "rounded-sm bg-white p-0.5" : "object-contain"}
    />
  );
}

export default function Skills() {
  return (
    <section id="skills" className={`${section} relative overflow-hidden`}>
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-accent/5 blur-[130px]"
      />

      <div className={`${container} relative`}>
        {/* Section heading */}
        <Reveal>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className={kicker}>
                Skills
                <span aria-hidden="true" className="h-px w-8 bg-accent/50" />
              </p>

              <h2 className={`${h2} max-w-2xl`}>
                Tools I build <span className="text-accent">with.</span>
              </h2>
            </div>

            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Technologies and tools I use to turn ideas into functional digital
              experiences.
            </p>
          </div>
        </Reveal>

        {/* Skill categories */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 100}>
              <div
                className={`${card} group relative h-full overflow-hidden p-6 transition-all duration-500 hover:-translate-y-2 hover:border-accent/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.18)]`}
              >
                {/* Card glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/0 blur-[65px] transition-all duration-500 group-hover:bg-accent/10"
                />

                <div className="relative">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="font-mono text-xs tracking-widest text-accent/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full bg-accent/40 transition-all duration-300 group-hover:scale-125 group-hover:bg-accent group-hover:shadow-[0_0_12px_var(--accent)]"
                    />
                  </div>

                  <h3 className="text-lg font-semibold text-fg transition-colors duration-300 group-hover:text-accent">
                    {group.title}
                  </h3>

                  <p className="mt-2 min-h-10 text-sm leading-relaxed text-muted">
                    {group.description}
                  </p>

                  <div className="my-5 h-px w-full bg-line" />

                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => {
                      const url = techLogoUrl(item);

                      return (
                        <li key={item.name}>
                          <span
                            title={item.name}
                            className="flex items-center gap-2 rounded-full border border-line bg-card px-3 py-2 text-xs font-medium text-fg/90 transition-all duration-300 hover:border-accent/50 hover:bg-accent/5 hover:text-accent"
                          >
                            {url ? (
                              <Logo
                                url={url}
                                lightLogo={item.lightLogo}
                                size={18}
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="h-1.5 w-1.5 rounded-full bg-accent/70"
                              />
                            )}

                            {item.name}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Technology marquee */}
        <Reveal delay={200}>
          <div className="mt-16">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Technologies I work with
              </p>

              <span className="font-mono text-[10px] tracking-widest text-accent/60">
                TECH STACK / 001
              </span>
            </div>

            <div
              aria-hidden="true"
              className="marquee relative overflow-hidden border-y border-line py-6"
            >
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent sm:w-28" />

              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent sm:w-28" />

              <ul className="marquee-track flex w-max shrink-0 items-center gap-10 sm:gap-14">
                {[...marqueeItems, ...marqueeItems].map((item, index) => {
                  const url = techLogoUrl(item);

                  return (
                    <li
                      key={`${item.name}-${index}`}
                      className="flex shrink-0 items-center gap-3 opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                    >
                      {url && (
                        <Logo url={url} lightLogo={item.lightLogo} size={25} />
                      )}

                      <span className="text-sm font-medium text-fg">
                        {item.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
