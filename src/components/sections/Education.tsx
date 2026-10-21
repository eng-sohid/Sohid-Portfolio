// src/components/sections/Education.tsx
import Reveal from "../../components/Reveal";
import { education } from "../../data/site";
import { section, h2 } from "../../lib/styles";

export default function Education() {
  return (
    <section id="education" className={section}>
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-lime-400">
            Education
          </p>
          <h2 className={h2}>My Education</h2>
        </Reveal>

        <ol className="relative mt-12 border-l border-white/15 pl-8">
          {education.map((e, i) => (
            <li key={e.degree} className="mb-10 last:mb-0">
              <Reveal delay={i * 120}>
                <span
                  aria-hidden="true"
                  className={`absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full border-2 border-lime-400 ${
                    e.current ? "animate-pulse bg-lime-400" : "bg-[#080a08]"
                  }`}
                />

                <p className="flex flex-wrap items-center gap-3 text-sm font-medium text-lime-400">
                  {e.period}
                  {e.current && (
                    <span className="rounded-full bg-lime-400 px-3 py-0.5 text-xs font-semibold text-black">
                      Currently Studying
                    </span>
                  )}
                </p>

                <h3 className="mt-1 text-xl font-semibold text-white">
                  {e.degree}
                </h3>
                <p className="mt-1 text-white/70">{e.institute}</p>

                {e.gpa && (
                  <p className="mt-3 inline-block rounded-full border border-lime-400/50 px-3 py-1 text-sm font-semibold text-lime-400">
                    GPA : {e.gpa}
                  </p>
                )}

                {e.note && (
                  <p className="mt-2 max-w-2xl text-sm text-white/50">
                    {e.note}
                  </p>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
