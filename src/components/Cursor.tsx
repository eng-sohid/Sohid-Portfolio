"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;

    if (!cursor || !dot) return;

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!mediaQuery.matches || reducedMotion.matches) return;

    const moveX = gsap.quickTo(cursor, "x", {
      duration: 0.45,
      ease: "power3.out",
    });

    const moveY = gsap.quickTo(cursor, "y", {
      duration: 0.45,
      ease: "power3.out",
    });

    const dotX = gsap.quickTo(dot, "x", {
      duration: 0.12,
      ease: "power2.out",
    });

    const dotY = gsap.quickTo(dot, "y", {
      duration: 0.12,
      ease: "power2.out",
    });

    gsap.set([cursor, dot], {
      xPercent: -50,
      yPercent: -50,
      autoAlpha: 0,
    });

    const showCursor = () => {
      gsap.to([cursor, dot], {
        autoAlpha: 1,
        duration: 0.2,
        overwrite: true,
      });
    };

    const hideCursor = () => {
      gsap.to([cursor, dot], {
        autoAlpha: 0,
        duration: 0.2,
        overwrite: true,
      });
    };

    const handlePointerMove = (event: PointerEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);

      dotX(event.clientX);
      dotY(event.clientY);

      showCursor();
    };

    const handlePointerOver = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) return;

      const interactive = target.closest(
        "a, button, input, textarea, select, [role='button']",
      );

      if (interactive) {
        gsap.to(cursor, {
          scale: 1.7,
          duration: 0.3,
          ease: "power2.out",
          overwrite: true,
        });
      }
    };

    const handlePointerOut = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) return;

      const interactive = target.closest(
        "a, button, input, textarea, select, [role='button']",
      );

      if (interactive) {
        gsap.to(cursor, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
          overwrite: true,
        });
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerover", handlePointerOver);
    window.addEventListener("pointerout", handlePointerOut);
    window.addEventListener("pointerleave", hideCursor);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("pointerleave", hideCursor);

      gsap.killTweensOf([cursor, dot]);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[300] hidden h-10 w-10 rounded-full border border-accent/70 opacity-0 lg:block"
        aria-hidden="true"
      />

      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[301] hidden h-1.5 w-1.5 rounded-full bg-accent opacity-0 lg:block"
        aria-hidden="true"
      />
    </>
  );
}
