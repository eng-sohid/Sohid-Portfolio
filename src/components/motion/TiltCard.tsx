"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

/**
 * 3D tilt card — the card rotates subtly toward the cursor and
 * springs back flat on leave.
 *
 * Desktop-only, disabled for reduced motion, transform-only (60fps).
 * The wrapper owns the transform so it never fights CSS hover
 * transitions on the child element.
 */
export default function TiltCard({
  children,
  max = 6,
  className = "",
}: {
  children: ReactNode;
  /** Maximum rotation in degrees. */
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches || reducedMotion.matches) return;

    gsap.set(element, {
      transformPerspective: 900,
      transformStyle: "preserve-3d",
    });

    const handleMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();

      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;

      gsap.to(element, {
        rotateY: px * max,
        rotateX: -py * max,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleLeave = () => {
      gsap.to(element, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.9,
        ease: "elastic.out(1, 0.5)",
        overwrite: "auto",
      });
    };

    element.addEventListener("pointermove", handleMove);
    element.addEventListener("pointerleave", handleLeave);

    return () => {
      element.removeEventListener("pointermove", handleMove);
      element.removeEventListener("pointerleave", handleLeave);

      gsap.killTweensOf(element);
    };
  }, [max]);

  return (
    <div ref={ref} className={className} style={{ transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
}
