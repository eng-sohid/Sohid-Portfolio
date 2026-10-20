// src/components/sections/Hero.tsx
import HeroBackground from "../../components/three/HeroBackground";
import { site } from "../../data/site";
import { btnPrimary, btnOutline, ext } from "../../lib/styles";

export default function Hero() {
  return (
    <section
      id="about"
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh items-center overflow-hidden px-6 pb-24 pt-32 sm:pt-36"
    >
      <HeroBackground />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="hero-fade max-w-xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-sm text-lime-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-400" />
            </span>
            Available for work
          </p>

          <h1
            id="hero-heading"
            className="text-4xl font-bold leading-tight text-white sm:text-6xl"
          >
            Hi, I&apos;m <span className="text-lime-400">{site.name}</span>
            <br />
            Full-Stack Web Developer
          </h1>

          <p className="mt-6 text-base leading-relaxed text-white/70 sm:text-lg font-[family-name:var(--font-noto-bengali)]">
            আমি Next.js, React আর Tailwind দিয়ে দ্রুত, সুন্দর ও আধুনিক ওয়েব
            অ্যাপ বানাই।
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#projects" className={btnPrimary}>
              View Projects
            </a>
            <a href="/Sohid-CV.pdf" download className={btnOutline}>
              Download CV
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
            <li>
              <a
                href={site.github}
                {...ext}
                className="transition hover:text-lime-400"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={site.linkedin}
                {...ext}
                className="transition hover:text-lime-400"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="transition hover:text-lime-400"
              >
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <a
        href="#projects"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-widest text-white/40 transition hover:text-lime-400 sm:flex"
      >
        Scroll
        <span className="h-8 w-px animate-pulse bg-current" />
      </a>
    </section>
  );
}
