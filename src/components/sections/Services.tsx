// src/components/sections/Services.tsx
import Reveal from "../../components/Reveal";
import { services } from "../../data/site";
import { section, h2 } from "../../lib/styles";

export default function Services() {
  return (
    <section id="services" className={section}>
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-lime-400">
            Services
          </p>
          <h2 className={h2}>What I Do</h2>
          <p className="mt-6 max-w-2xl text-base text-white/70 sm:text-lg">
            From the first sketch to a live website, here is how I can help
            bring your idea to life.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 120}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 p-6 transition duration-300 hover:-translate-y-1 hover:border-lime-400/50">
                <span
                  aria-hidden="true"
                  className="text-5xl font-bold text-lime-400/20 transition group-hover:text-lime-400/50"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  {s.title}
                </h3>
                <p className="mt-3 text-white/70">{s.description}</p>
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-0.5 w-0 bg-lime-400 transition-all duration-500 group-hover:w-full"
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
