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
      ease: "power3",
    });

    const moveY = gsap.quickTo(cursor, "y", {
      duration: 0.45,
      ease: "power3",
    });

    const dotX = gsap.quickTo(dot, "x", {
      duration: 0.12,
      ease: "power2.out",
    });

    const dotY = gsap.quickTo(dot, "y", {
      duration: 0.12,
      ease: "power2.out",
    });

    const handleMouseMove = (event: MouseEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);
      dotX(event.clientX);
      dotY(event.clientY);
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, {
        scale: 1.7,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, select, [role='button']",
    );

    window.addEventListener("mousemove", handleMouseMove);

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
    });

    gsap.set(dot, {
      xPercent: -50,
      yPercent: -50,
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });

      gsap.killTweensOf(cursor);
      gsap.killTweensOf(dot);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[300] hidden h-10 w-10 rounded-full border border-accent/70 lg:block"
        aria-hidden="true"
      />

      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[301] hidden h-1.5 w-1.5 rounded-full bg-accent lg:block"
        aria-hidden="true"
      />
    </>
  );
}
