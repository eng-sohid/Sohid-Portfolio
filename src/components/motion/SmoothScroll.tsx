"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

    // Use native scrolling for touch devices and reduced motion.
    if (prefersReducedMotion || !hasFinePointer) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.11,
      smoothWheel: true,
      syncTouch: false,
    });

    let animationFrameId = 0;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    // Smooth scrolling for internal section links.
    function handleAnchorClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>('a[href^="#"]');

      if (!link || link.target === "_blank" || link.hasAttribute("download")) {
        return;
      }

      const href = link.getAttribute("href");

      if (!href || href === "#") return;

      const section = document.getElementById(
        decodeURIComponent(href.slice(1)),
      );

      if (!section) return;

      event.preventDefault();

      lenis.scrollTo(section, {
        offset: -96,
        duration: 1.2,
      });

      // Keep the URL hash in sync.
      window.history.pushState(null, "", href);
    }

    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
