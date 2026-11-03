"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

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

    // Skip long animation for reduced-motion users.
    if (prefersReducedMotion.matches) {
      document.body.style.overflow = previousOverflow;
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
        0,
      )
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
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[#080908] text-white"
      aria-label="Loading portfolio"
      role="status"
    >
      <div className="absolute inset-0 bg-grid opacity-40" />

      <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ccff00]/10 blur-[120px]" />

      <div className="preloader-content relative z-10 w-full max-w-md px-8">
        <div className="mb-16 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tighter">
            Sohid<span className="text-[#ccff00]">.</span>
          </span>

          <span className="text-xs uppercase tracking-[0.3em] text-white/40">
            Portfolio 2026
          </span>
        </div>

        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-white/40">
              Crafting digital experiences
            </p>

            <h2 className="text-2xl font-semibold tracking-tight">
              Welcome<span className="text-[#ccff00]">.</span>
            </h2>
          </div>

          <div className="flex items-start">
            <span
              ref={counterRef}
              className="text-6xl font-bold tracking-tighter text-[#ccff00] tabular-nums"
            >
              00
            </span>

            <span className="mt-2 text-sm text-white/40">%</span>
          </div>
        </div>

        <div className="h-[2px] w-full overflow-hidden bg-white/10">
          <div className="preloader-progress h-full w-full origin-left scale-x-0 bg-[#ccff00]" />
        </div>

        <div className="mt-5 flex justify-between text-[10px] uppercase tracking-[0.25em] text-white/30">
          <span>Full Stack Developer</span>
          <span>Loading Experience</span>
        </div>
      </div>
    </div>
  );
}
