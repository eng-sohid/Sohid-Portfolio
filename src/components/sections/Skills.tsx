// src/components/sections/Skills.tsx
import Reveal from "../../components/Reveal";
import { skillGroups } from "../../data/site";
import { section, h2 } from "../../lib/styles";

export default function Skills() {
  return (
    <section id="skills" className={section}>
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className={h2}>Skills</h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 120}>
              <div className="h-full rounded-2xl border border-white/10 p-6 transition hover:border-lime-400/50">
                <h3 className="text-lg font-semibold text-lime-400">
                  {g.title}
                </h3>
                <p className="mt-2 text-sm text-white/60">{g.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-white/15 px-3 py-1 text-sm text-white/80"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
