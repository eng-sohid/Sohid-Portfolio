"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    // Respect reduced-motion preferences.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (prefersReducedMotion.matches) {
      const frame = window.requestAnimationFrame(() => {
        setShown(true);
      });

      return () => {
        window.cancelAnimationFrame(frame);
      };
    }

    // Reveal element when it enters the viewport.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: shown ? `${delay}ms` : "0ms",
      }}
      className={`
        reveal
        ${shown ? "reveal-in" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
