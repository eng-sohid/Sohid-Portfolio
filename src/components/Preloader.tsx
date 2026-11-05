"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import { markContentLoaded } from "../lib/preloader-state";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const counter = counterRef.current;

    if (!container || !counter) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Skip the long animation for reduced-motion users.
    if (prefersReducedMotion.matches) {
      document.body.style.overflow = previousOverflow;
      markContentLoaded();

      const frameId = window.requestAnimationFrame(() => setFinished(true));
      return () => window.cancelAnimationFrame(frameId);
    }

    const counterObject = { value: 0 };

    const timeline = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = previousOverflow;
        setFinished(true);
      },
    });

    timeline
      // Name reveal — masked line slides up.
      .fromTo(
        ".preloader-name",
        { yPercent: 105 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
        },
        0.2,
      )
      .fromTo(
        ".preloader-sub",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        0.55,
      )
      .to(counterObject, {
        value: 100,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: () => {
          counter.textContent = Math.round(counterObject.value)
            .toString()
            .padStart(2, "0");
        },
      })
      .to(
        container.querySelector(".preloader-progress"),
        {
          scaleX: 1,
          duration: 2,
          ease: "power2.inOut",
        },
        0.3,
      )
      // Let the intro animations below start while the curtain lifts.
      .call(() => markContentLoaded(), undefined, 2.45)
      .to(".preloader-content", {
        y: -35,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
      })
      .to(container, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
      });

    return () => {
      timeline.kill();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (finished) return null;

  return (
    <div
      ref={containerRef}
      className="preloader-root fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-bg text-fg"
      aria-label="Loading portfolio"
      role="status"
    >
      <div className="absolute inset-0 bg-grid opacity-40" />

      <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />

      <div className="preloader-content relative z-10 w-full max-w-md px-8">
        <div className="mb-16 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tighter">
            Sohid<span className="text-accent">.</span>
          </span>

          <span className="text-xs uppercase tracking-[0.3em] text-muted">
            Portfolio 2026
          </span>
        </div>

        <div className="mb-5 flex items-end justify-between gap-6">
          <div>
            <p className="preloader-sub mb-2 text-xs uppercase tracking-[0.3em] text-muted">
              Crafting digital experiences
            </p>

            <h2 className="text-2xl font-semibold tracking-tight">
              Welcome<span className="text-accent">.</span>
            </h2>

            {/* Masked name reveal */}
            <div className="mt-3 overflow-hidden">
              <p className="preloader-name text-4xl font-bold tracking-[-0.05em] sm:text-5xl">
                Sohid Mondol<span className="text-accent">.</span>
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <span
              ref={counterRef}
              className="text-6xl font-bold tracking-tighter text-accent tabular-nums"
            >
              00
            </span>

            <span className="mt-2 text-sm text-muted">%</span>
          </div>
        </div>

        <div className="h-[2px] w-full overflow-hidden bg-line">
          <div className="preloader-progress h-full w-full origin-left scale-x-0 bg-accent" />
        </div>

        <div className="mt-5 flex justify-between text-[10px] uppercase tracking-[0.25em] text-muted/60">
          <span>Full Stack Developer</span>
          <span>Loading Experience</span>
        </div>
      </div>
    </div>
  );
}
