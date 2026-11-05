"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Subtle scroll parallax for decorative elements.
 *
 * Add `data-parallax="<strength>"` (0–1) to any absolutely-positioned,
 * `aria-hidden` decoration; this component finds them all and moves them
 * slightly against the scroll direction.
 *
 * Desktop-only, disabled for reduced motion, transform-only (60fps)
 * with ScrollTrigger's scrub for buttery tracking alongside Lenis.
 */
export default function Parallax() {
  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const narrowScreen = window.matchMedia("(max-width: 767px)");

    if (!finePointer.matches || reducedMotion.matches || narrowScreen.matches) {
      return;
    }

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]"),
    );

    if (!elements.length) return;

    const tweens = elements.map((element) => {
      const strength = Number.parseFloat(element.dataset.parallax ?? "0.2");

      const safeStrength = Number.isFinite(strength)
        ? Math.min(Math.max(strength, 0), 1)
        : 0.2;

      // Distance is proportional to the element's own size so the effect
      // stays subtle on small decorations and visible on large glows.
      const distance = safeStrength * element.offsetHeight * 2;

      return gsap.fromTo(
        element,
        { y: distance * 0.5 },
        {
          y: -distance * 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        },
      );
    });

    ScrollTrigger.refresh();

    return () => {
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });

      gsap.set(elements, { clearProps: "transform" });
    };
  }, []);

  return null;
}
