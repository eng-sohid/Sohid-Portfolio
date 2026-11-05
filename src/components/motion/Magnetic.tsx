"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

/**
 * Magnetic hover — the wrapped element drifts toward the cursor
 * (with a softer inner layer), then springs back with an elastic ease.
 *
 * Desktop-only (hover + fine pointer), disabled for reduced motion,
 * and animates only transforms.
 */
export default function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  /** 0–1. How far the element follows the cursor. */
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    const inner = innerRef.current;

    if (!element || !inner) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches || reducedMotion.matches) return;

    const xTo = gsap.quickTo(element, "x", {
      duration: 0.4,
      ease: "power3.out",
    });

    const yTo = gsap.quickTo(element, "y", {
      duration: 0.4,
      ease: "power3.out",
    });

    const innerXTo = gsap.quickTo(inner, "x", {
      duration: 0.5,
      ease: "power3.out",
    });

    const innerYTo = gsap.quickTo(inner, "y", {
      duration: 0.5,
      ease: "power3.out",
    });

    const handleMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();

      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);

      xTo(dx * strength);
      yTo(dy * strength);

      // Inner layer follows a bit further for a depth effect.
      innerXTo(dx * strength * 0.35);
      innerYTo(dy * strength * 0.35);
    };

    const handleLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.4)",
        overwrite: "auto",
      });

      gsap.to(inner, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.4)",
        overwrite: "auto",
      });
    };

    element.addEventListener("pointermove", handleMove);
    element.addEventListener("pointerleave", handleLeave);

    return () => {
      element.removeEventListener("pointermove", handleMove);
      element.removeEventListener("pointerleave", handleLeave);

      gsap.killTweensOf([element, inner]);
    };
  }, [strength]);

  return (
    <span ref={ref} className={`inline-block will-change-transform ${className}`}>
      <span ref={innerRef} className="inline-block will-change-transform">
        {children}
      </span>
    </span>
  );
}
