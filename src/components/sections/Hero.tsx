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
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;

    if (!section || !content || !image) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        delay: 0.15,
        defaults: { ease: "power3.out" },
      });

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
        { opacity: 0, y: 25 },
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
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh items-center overflow-hidden px-6 pb-24 pt-32 sm:pt-36"
    >
      <HeroBackground />

      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="absolute left-[-10%] top-[20%] h-72 w-72 rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-[5%] right-[-5%] h-80 w-80 rounded-full bg-accent/5 blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        {/* Hero Content */}
        <div ref={contentRef} className="max-w-2xl">
          <p
            className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-line bg-card/80 px-4 py-2 text-sm text-accent shadow-lg shadow-black/5 backdrop-blur-xl"
            role="status"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available for work
          </p>

          <h1
            id="hero-heading"
            className="mt-7 overflow-hidden text-4xl font-bold leading-[1.15] tracking-tight text-fg sm:text-6xl lg:text-7xl"
          >
            <span className="hero-title-line block">
              Hi, I&apos;m {site.name}
            </span>

            <span className="hero-title-line mt-2 block text-accent">
              Full-Stack Web Developer
            </span>
          </h1>

          <p className="hero-description mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {site.intro}
          </p>

          <p className="hero-description mt-3 max-w-xl font-[family-name:var(--font-noto-bengali)] text-base leading-[1.9] text-muted/85 sm:text-lg">
            আমি Next.js, React আর Tailwind দিয়ে দ্রুত, সুন্দর ও আধুনিক ওয়েব
            অ্যাপ বানাই।
          </p>

          {/* CTA Buttons */}
          <div className="hero-actions mt-9 flex flex-wrap gap-4">
            <a
              href="#projects"
              className={`${btnPrimary} group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/15`}
            >
              View Projects
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>

            <a
              href="#contact"
              className={`${btnOutline} transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:text-accent`}
            >
              Contact Me
            </a>
          </div>

          {/* Social Links */}
          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-4 text-sm text-muted">
            <li className="hero-social">
              <a
                href={site.github}
                {...ext}
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:text-accent"
              >
                <GitHubIcon size={17} />
                GitHub
              </a>
            </li>

            <li className="hero-social">
              <a
                href={site.linkedin}
                {...ext}
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:text-accent"
              >
                <LinkedInIcon size={17} />
                LinkedIn
              </a>
            </li>

            <li className="hero-social">
              <a
                href="/Sohid-CV.pdf"
                download
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:text-accent"
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
          className="relative mx-auto w-full max-w-[390px] opacity-0 lg:max-w-[440px]"
        >
          {/* Glow */}
          <div
            aria-hidden="true"
            className="absolute -inset-10 rounded-full bg-accent/10 blur-[80px]"
          />

          {/* Orbit decoration */}
          <div
            aria-hidden="true"
            className="hero-orbit pointer-events-none absolute -inset-5 rounded-full border border-dashed border-accent/25"
          >
            <span className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_18px_rgba(204,255,0,0.8)]" />
          </div>

          {/* Image Frame */}
          <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-line bg-card shadow-2xl shadow-black/20">
            <div
              aria-hidden="true"
              className="absolute inset-0 z-10 rounded-[2rem] ring-1 ring-inset ring-white/10"
            />

            <Image
              src="/Profile-2.jpeg"
              alt={`Portrait of ${site.name}`}
              fill
              priority
              sizes="(min-width: 1024px) 440px, (min-width: 640px) 390px, 85vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />

            {/* Image overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-black/30 to-transparent"
            />
          </div>

          {/* Floating Badge */}
          <div className="absolute -bottom-5 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-bg/90 px-5 py-2.5 text-xs font-medium text-muted shadow-xl backdrop-blur-xl sm:text-sm">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_rgba(204,255,0,0.8)]" />
            Building with Next.js
          </div>

          {/* Corner decoration */}
          <div
            aria-hidden="true"
            className="absolute -right-3 -top-3 h-16 w-16 rounded-tr-3xl border-r-2 border-t-2 border-accent/50"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-3 -left-3 h-16 w-16 rounded-bl-3xl border-b-2 border-l-2 border-accent/50"
          />
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#projects"
        aria-label="Scroll down to projects"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted transition-colors hover:text-accent sm:flex"
      >
        Scroll
        <span className="hero-scroll-line h-9 w-px bg-accent" />
      </a>
    </section>
  );
}
