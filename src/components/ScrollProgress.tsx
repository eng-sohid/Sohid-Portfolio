"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll progress bar — a thin accent line pinned to the very top of the
 * viewport that fills as the page is scrolled. rAF-throttled and
 * transform-only (scaleX), so it stays at 60fps alongside Lenis.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;

    if (!bar) return;

    let frame = 0;

    const update = () => {
      frame = 0;

      const max =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress = max > 0 ? window.scrollY / max : 0;

      bar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
    };

    const schedule = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(update);
    };

    update();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="fixed left-0 top-0 z-[70] h-[2.5px] w-full origin-left bg-accent shadow-[0_0_10px_var(--accent-glow)]"
      style={{ transform: "scaleX(0)" }}
    />
  );
}
