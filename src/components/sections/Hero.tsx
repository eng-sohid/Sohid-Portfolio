"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import { GitHubIcon, LinkedInIcon, Download } from "../../components/icons";
import { site } from "../../data/site";
import { btnPrimary, btnOutline, ext } from "../../lib/styles";
import { onContentLoaded } from "../../lib/preloader-state";
import Magnetic from "../../components/motion/Magnetic";
import RotatingRole from "../../components/motion/RotatingRole";

// The 3D hero background is decorative: load it after hydration so it
// never blocks first paint (three.js is the heaviest part of the bundle).
const HeroBackground = dynamic(
  () => import("../../components/three/HeroBackground"),
  { ssr: false },
);

// Role rotation — phrases taken from the site's own copy & metadata,
// nothing invented.
const roles = [
  "Full-Stack Web Developer",
  "React & Next.js Developer",
  "Computer Science Student",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;

    if (!section || !image) return;

    const media = gsap.matchMedia();

    const unsubscribe = onContentLoaded(() => {
      media.add(
        {
          mobile: "(max-width: 767px)",
          desktop: "(min-width: 768px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (matchContext) => {
          const { mobile, reduceMotion } = matchContext.conditions as {
            mobile: boolean;
            desktop: boolean;
            reduceMotion: boolean;
          };

          const animatedElements =
            ".hero-eyebrow, .hero-title-line, .hero-description, .hero-actions, .hero-social, .hero-image";

          if (reduceMotion) {
            gsap.set(animatedElements, {
              opacity: 1,
              clearProps: "transform",
            });
            return;
          }

          const timeline = gsap.timeline({
            delay: 0.05,
            defaults: { ease: "power3.out" },
          });

          timeline.fromTo(
            ".hero-eyebrow",
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.55 },
          );

          // Masked line reveal for the headline.
          timeline.fromTo(
            ".hero-title-line",
            { yPercent: 115 },
            {
              yPercent: 0,
              duration: mobile ? 0.75 : 1,
              ease: "power4.out",
              stagger: mobile ? 0.09 : 0.14,
            },
            "-=0.35",
          );

          timeline.fromTo(
            ".hero-description",
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.08,
            },
            "-=0.5",
          );

          timeline.fromTo(
            ".hero-actions",
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.5 },
            "-=0.2",
          );

          timeline.fromTo(
            ".hero-social",
            { opacity: 0, y: 10 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.08,
            },
            "-=0.2",
          );

          timeline.fromTo(
            image,
            {
              opacity: 0,
              y: mobile ? 20 : 0,
              x: mobile ? 0 : 25,
              scale: 0.96,
            },
            {
              opacity: 1,
              y: 0,
              x: 0,
              scale: 1,
              duration: 0.8,
            },
            "-=0.2",
          );

          // Keep decorative animations desktop-only.
          if (!mobile) {
            gsap.to(".hero-orbit", {
              rotate: 360,
              duration: 35,
              repeat: -1,
              ease: "none",
            });

            gsap.to(image, {
              y: -8,
              duration: 4,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });

            gsap.to(".hero-scroll-line", {
              scaleY: 0.45,
              transformOrigin: "top",
              duration: 0.8,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          }
        },
      );
    });

    return () => {
      unsubscribe();
      media.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-svh items-center overflow-hidden px-5 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:pt-36"
    >
      <HeroBackground />

      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div
          data-parallax="0.12"
          className="absolute left-[-12%] top-[12%] h-72 w-72 rounded-full bg-accent/10 blur-[120px] sm:h-80 sm:w-80"
        />
        <div
          data-parallax="0.16"
          className="absolute bottom-[-10%] right-[-8%] h-72 w-72 rounded-full bg-accent/10 blur-[130px] sm:h-96 sm:w-96"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg/70" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 sm:gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        {/* Hero Content */}
        <div className="w-full max-w-3xl">
          <p
            className="hero-eyebrow inline-flex items-center gap-2.5 rounded-full border border-accent/20 bg-accent/5 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-accent backdrop-blur-xl sm:gap-3 sm:px-4 sm:py-2.5 sm:text-sm"
            role="status"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available for work
          </p>

          <h1
            id="hero-heading"
            className="mt-6 text-[clamp(2.4rem,11vw,6.4rem)] font-bold leading-[1.05] tracking-[-0.06em] text-fg sm:mt-8 sm:text-[clamp(3.5rem,7vw,6.4rem)]"
          >
            <span className="block overflow-hidden pb-[0.12em]">
              <span className="hero-title-line block">Hi, I&apos;m</span>
            </span>

            <span className="block overflow-hidden pb-[0.12em]">
              <span className="hero-title-line block break-words">
                <span className="text-accent">{site.name}</span>
                <span className="text-accent/50">.</span>
              </span>
            </span>

            <span className="mt-2 block overflow-hidden pb-[0.1em]">
              <span className="hero-title-line block min-h-[1.3em] text-[0.39em] font-medium leading-tight tracking-[-0.035em] text-muted sm:text-[0.48em]">
                <RotatingRole roles={roles} />
              </span>
            </span>
          </h1>

          {/* Intro copy — soft light-only backdrop keeps it readable
              over the 3D background in light mode. */}
          <div className="mt-6 max-w-xl sm:mt-8 light:-mx-3.5 light:rounded-2xl light:border light:border-white/70 light:bg-white/55 light:p-3.5 light:shadow-[0_8px_30px_rgba(20,45,40,0.05)] light:backdrop-blur-sm">
            <p className="hero-description text-sm leading-[1.85] text-muted sm:text-lg sm:leading-[1.9]">
              {site.intro}
            </p>

            <p className="hero-description mt-3 font-[family-name:var(--font-noto-bengali)] text-xs leading-[2] text-muted sm:text-base">
              আমি Next.js, React আর Tailwind দিয়ে দ্রুত, সুন্দর ও আধুনিক ওয়েব
              অ্যাপ বানাই।
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="hero-actions mt-7 grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 sm:mt-10 sm:flex sm:flex-wrap sm:items-center sm:gap-4">
            <Magnetic strength={0.3}>
              <a
                href="#projects"
                className={`${btnPrimary} group min-h-12 w-full justify-center text-sm sm:w-auto sm:text-base`}
              >
                View Projects
                <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </Magnetic>

            <Magnetic strength={0.3}>
              <a
                href="#contact"
                className={`${btnOutline} min-h-12 w-full justify-center text-sm sm:w-auto sm:text-base`}
              >
                Contact Me
              </a>
            </Magnetic>
          </div>

          {/* Social Links */}
          <ul className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-4 border-t border-line/70 pt-5 text-xs text-muted sm:mt-10 sm:gap-x-7 sm:pt-7 sm:text-sm">
            <li className="hero-social">
              <a
                href={site.github}
                {...ext}
                className="inline-flex items-center gap-2 transition-colors hover:text-accent"
              >
                <GitHubIcon size={16} />
                GitHub
              </a>
            </li>

            <li className="hero-social">
              <a
                href={site.linkedin}
                {...ext}
                className="inline-flex items-center gap-2 transition-colors hover:text-accent"
              >
                <LinkedInIcon size={16} />
                LinkedIn
              </a>
            </li>

            <li className="hero-social">
              <a
                href={site.cv}
                download="Md_Sohid_Mondol_Resume.pdf"
                className="inline-flex items-center gap-2 transition-colors hover:text-accent"
              >
                <Download size={16} />
                Download CV
              </a>
            </li>
          </ul>
        </div>

        {/* Profile Image */}
        <div
          ref={imageRef}
          className="hero-image relative mx-auto w-[min(72vw,270px)] sm:w-full sm:max-w-[360px] lg:max-w-[460px]"
        >
          {/* Ambient glow */}
          <div
            aria-hidden="true"
            className="absolute -inset-8 rounded-full bg-accent/10 blur-[75px] sm:-inset-12 sm:blur-[100px]"
          />

          {/* Orbit decoration: hidden on mobile */}
          <div
            aria-hidden="true"
            className="hero-orbit pointer-events-none absolute -inset-4 hidden rounded-full border border-dashed border-accent/25 sm:block sm:-inset-6"
          >
            <span className="absolute left-1/2 top-[-5px] h-3 w-3 rounded-full bg-accent" />
          </div>

          {/* Image Frame */}
          <div className="group relative aspect-square overflow-hidden rounded-[1.6rem] border border-accent/20 bg-card shadow-[0_25px_70px_rgba(0,0,0,0.25)] sm:rounded-[2.5rem] sm:shadow-[0_25px_100px_rgba(0,0,0,0.35)]">
            <div
              aria-hidden="true"
              className="absolute inset-0 z-10 rounded-[inherit] ring-1 ring-inset ring-white/10"
            />

            <Image
              src="/Profile-2.jpeg"
              alt={`Portrait of ${site.name}`}
              fill
              priority
              sizes="(min-width: 1024px) 460px, (min-width: 640px) 360px, 72vw"
              className="object-cover transition-transform duration-700 sm:group-hover:scale-105"
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 z-10 bg-gradient-to-t from-black/35 via-transparent to-transparent"
            />

            <div
              aria-hidden="true"
              className="absolute left-4 top-4 z-20 h-8 w-8 rounded-tl-lg border-l-2 border-t-2 border-accent/70 sm:left-5 sm:top-5 sm:h-10 sm:w-10"
            />

            <div
              aria-hidden="true"
              className="absolute bottom-4 right-4 z-20 h-8 w-8 rounded-br-lg border-b-2 border-r-2 border-accent/70 sm:bottom-5 sm:right-5 sm:h-10 sm:w-10"
            />
          </div>

          {/* Floating Badge */}
          <div className="absolute -bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-accent/20 bg-bg/95 px-4 py-2.5 text-[10px] font-semibold text-fg shadow-xl backdrop-blur-xl sm:-bottom-5 sm:gap-2.5 sm:px-5 sm:py-3 sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Building with Next.js
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#projects"
        aria-label="Scroll down to projects"
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] text-muted transition-colors hover:text-accent lg:flex"
      >
        Scroll to explore
        <span className="hero-scroll-line h-9 w-px bg-accent" />
      </a>
    </section>
  );
}
