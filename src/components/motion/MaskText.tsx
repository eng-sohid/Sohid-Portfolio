"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { isContentLoaded, onContentLoaded } from "../../lib/preloader-state";

/**
 * Masked line reveal — text slides up from inside an overflow-hidden line,
 * the classic "award site" heading animation.
 *
 * The text is always present in the DOM (SEO friendly). Animations wait for
 * the preloader, honor `prefers-reduced-motion` (via CSS in globals.css),
 * and animate only transform/opacity for a stable 60fps.
 */
export default function MaskText({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  /** Extra delay in ms after the line enters the viewport. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    let observer: IntersectionObserver | null = null;
    let unsubscribe = () => {};

    const start = () => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;

          setShown(true);
          observer?.disconnect();
        },
        { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
      );

      observer.observe(element);
    };

    if (isContentLoaded()) {
      start();
    } else {
      unsubscribe = onContentLoaded(start);
    }

    return () => {
      unsubscribe();
      observer?.disconnect();
    };
  }, []);

  return (
    <span ref={ref} className={shown ? `mask-line mask-line-in ${className}` : `mask-line ${className}`}>
      <span
        className="mask-line-inner"
        style={shown && delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
      >
        {children}
      </span>
    </span>
  );
}
