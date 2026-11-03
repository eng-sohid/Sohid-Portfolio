"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import HeroBackground from "../../components/three/HeroBackground";
import { GitHubIcon, LinkedInIcon, Download } from "../../components/icons";
import { site } from "../../data/site";
import { btnPrimary, btnOutline, ext } from "../../lib/styles";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;

    if (!section || !image) return;

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          normalMotion: "(prefers-reduced-motion: no-preference)",
        },
        (matchContext) => {
          const { reduceMotion } = matchContext.conditions as {
            reduceMotion: boolean;
            normalMotion: boolean;
          };

          const timeline = gsap.timeline({
            delay: 0.15,
            defaults: { ease: "power3.out" },
          });

          if (reduceMotion) {
            gsap.set(
              ".hero-eyebrow, .hero-title-line, .hero-description, .hero-actions, .hero-social, .hero-image",
              { opacity: 1, clearProps: "transform" },
            );
            return;
          }

          timeline.fromTo(
            ".hero-eyebrow",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.7 },
          );

          timeline.fromTo(
            ".hero-title-line",
            { opacity: 0, y: 55, rotateX: -15 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.9,
              stagger: 0.15,
            },
            "-=0.35",
          );

          timeline.fromTo(
            ".hero-description",
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
            "-=0.4",
          );

          timeline.fromTo(
            ".hero-actions",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.65 },
            "-=0.3",
          );

          timeline.fromTo(
            ".hero-social",
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
            "-=0.25",
          );

          timeline.fromTo(
            image,
            { opacity: 0, scale: 0.88, x: 35 },
            { opacity: 1, scale: 1, x: 0, duration: 1.1 },
            "-=0.8",
          );

          gsap.to(image, {
            y: -12,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });

          gsap.to(".hero-orbit", {
            rotate: 360,
            duration: 30,
            repeat: -1,
            ease: "none",
          });

          gsap.to(".hero-scroll-line", {
            scaleY: 0.45,
            transformOrigin: "top",
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        },
      );

      return () => media.revert();
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-svh items-center overflow-hidden px-6 pb-24 pt-32 sm:pt-36"
    >
      <HeroBackground />

      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div className="absolute left-[-12%] top-[12%] h-80 w-80 rounded-full bg-accent/10 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-8%] h-96 w-96 rounded-full bg-accent/10 blur-[150px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg/70" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        {/* Hero Content */}
        <div className="max-w-3xl">
          <p
            className="hero-eyebrow inline-flex items-center gap-3 rounded-full border border-accent/20 bg-accent/5 px-4 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-accent shadow-[0_0_35px_rgba(204,255,0,0.05)] backdrop-blur-xl sm:text-sm"
            role="status"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_rgba(204,255,0,0.9)]" />
            </span>
            Available for work
          </p>

          <h1
            id="hero-heading"
            className="mt-8 overflow-hidden text-[clamp(2.8rem,7vw,6.4rem)] font-bold leading-[1.04] tracking-[-0.065em] text-fg"
          >
            <span className="hero-title-line block">Hi, I&apos;m</span>

            <span className="hero-title-line mt-2 block">
              <span className="text-accent">{site.name}</span>
              <span className="text-accent/40">.</span>
            </span>

            <span className="hero-title-line mt-4 block text-[0.43em] font-medium leading-tight tracking-[-0.035em] text-muted sm:text-[0.48em]">
              Full-Stack Web Developer
            </span>
          </h1>

          <p className="hero-description mt-8 max-w-xl text-base leading-[1.9] text-muted sm:text-lg">
            {site.intro}
          </p>

          <p className="hero-description mt-3 max-w-xl font-[family-name:var(--font-noto-bengali)] text-sm leading-[2] text-muted/80 sm:text-base">
            আমি Next.js, React আর Tailwind দিয়ে দ্রুত, সুন্দর ও আধুনিক ওয়েব
            অ্যাপ বানাই।
          </p>

          {/* CTA Buttons */}
          <div className="hero-actions mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className={`${btnPrimary} group min-h-12 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/20`}
            >
              View Projects
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>

            <a
              href="#contact"
              className={`${btnOutline} min-h-12 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:text-accent`}
            >
              Contact Me
            </a>
          </div>

          {/* Social Links */}
          <ul className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-line/70 pt-7 text-sm text-muted">
            <li className="hero-social">
              <a
                href={site.github}
                {...ext}
                className="inline-flex items-center gap-2.5 transition-all duration-300 hover:-translate-y-1 hover:text-accent"
              >
                <GitHubIcon size={17} />
                GitHub
              </a>
            </li>

            <li className="hero-social">
              <a
                href={site.linkedin}
                {...ext}
                className="inline-flex items-center gap-2.5 transition-all duration-300 hover:-translate-y-1 hover:text-accent"
              >
                <LinkedInIcon size={17} />
                LinkedIn
              </a>
            </li>

            <li className="hero-social">
              <a
                href="/Sohid-CV.pdf"
                download
                className="inline-flex items-center gap-2.5 transition-all duration-300 hover:-translate-y-1 hover:text-accent"
              >
                <Download size={17} />
                Download CV
              </a>
            </li>
          </ul>
        </div>

        {/* Profile Image */}
        <div
          ref={imageRef}
          className="hero-image relative mx-auto w-full max-w-[340px] opacity-0 sm:max-w-[410px] lg:max-w-[460px]"
        >
          {/* Ambient glow */}
          <div
            aria-hidden="true"
            className="absolute -inset-12 rounded-full bg-accent/10 blur-[100px]"
          />

          {/* Orbit decoration */}
          <div
            aria-hidden="true"
            className="hero-orbit pointer-events-none absolute -inset-6 rounded-full border border-dashed border-accent/25"
          >
            <span className="absolute left-1/2 top-[-5px] h-3 w-3 rounded-full bg-accent shadow-[0_0_20px_rgba(204,255,0,0.9)]" />
          </div>

          {/* Image Frame */}
          <div className="group relative aspect-square overflow-hidden rounded-[2rem] border border-accent/20 bg-card shadow-[0_25px_100px_rgba(0,0,0,0.45)] sm:rounded-[2.5rem]">
            <div
              aria-hidden="true"
              className="absolute inset-0 z-10 rounded-[inherit] ring-1 ring-inset ring-white/10"
            />

            <Image
              src="/Profile-2.jpeg"
              alt={`Portrait of ${site.name}`}
              fill
              priority
              sizes="(min-width: 1024px) 460px, (min-width: 640px) 410px, 85vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 z-10 bg-gradient-to-t from-black/45 via-transparent to-transparent"
            />

            {/* Image corner details */}
            <div
              aria-hidden="true"
              className="absolute left-5 top-5 z-20 h-10 w-10 rounded-tl-xl border-l-2 border-t-2 border-accent/70"
            />
            <div
              aria-hidden="true"
              className="absolute bottom-5 right-5 z-20 h-10 w-10 rounded-br-xl border-b-2 border-r-2 border-accent/70"
            />
          </div>

          {/* Floating Badge */}
          <div className="absolute -bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-full border border-accent/20 bg-bg/90 px-5 py-3 text-xs font-medium text-fg shadow-2xl backdrop-blur-2xl sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgba(204,255,0,0.9)]" />
            Building with Next.js
          </div>

          {/* Decorative corner */}
          <div
            aria-hidden="true"
            className="absolute -right-4 -top-4 -z-10 h-24 w-24 rounded-tr-[2rem] border-r border-t border-accent/30"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-4 -left-4 -z-10 h-24 w-24 rounded-bl-[2rem] border-b border-l border-accent/30"
          />
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#projects"
        aria-label="Scroll down to projects"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] text-muted transition-colors hover:text-accent sm:flex"
      >
        Scroll to explore
        <span className="hero-scroll-line h-9 w-px bg-accent" />
      </a>
    </section>
  );
}
