// src/components/sections/About.tsx
import Image from "next/image";
import Reveal from "../../components/Reveal";
import { site } from "../../data/site";
import { section, h2 } from "../../lib/styles";

export default function About() {
  return (
    <section id="about" className={section}>
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1fr_2fr]">
        <Reveal>
          <div className="relative mx-auto aspect-square w-60 overflow-hidden rounded-2xl border border-white/10 sm:w-72">
            <Image
              src="/Profile.jpeg"
              alt={`Portrait of ${site.name}`}
              fill
              sizes="(min-width: 640px) 288px, 240px"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={150}>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-lime-400">
            About
          </p>
          <h2 className={h2}>About Me</h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            {site.about}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
