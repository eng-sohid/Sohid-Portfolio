"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Rotating role text — cycles through a list of phrases with a
 * soft vertical swap plus a blinking caret.
 *
 * The first phrase is duplicated as visually-hidden text so screen
 * readers and crawlers always get a stable, meaningful value.
 * Rotation is skipped entirely for reduced-motion users.
 */
export default function RotatingRole({
  roles,
  interval = 3000,
  className = "",
}: {
  roles: string[];
  /** Time each role stays on screen (ms). */
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const timeoutRef = useRef(0);

  const current = roles[index] ?? "";

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Skip for reduced motion — keep the static role.
    if (reducedMotion.matches) return;

    const rotate = () => {
      setVisible(false);

      // Wait for the out-animation, then swap the text and fade back in.
      timeoutRef.current = window.setTimeout(() => {
        setIndex((prev) => (prev + 1) % roles.length);
        setVisible(true);
      }, 320);
    };

    const intervalId = window.setInterval(rotate, interval);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutRef.current);
    };
  }, [interval, roles.length]);

  return (
    <>
      {/* Static, screen-reader / crawler friendly value */}
      <span className="sr-only">{roles[0]}</span>

      <span aria-hidden="true" className={`inline-block overflow-hidden align-baseline ${className}`}>
        <span
          key={current}
          className={`role-swap ${visible ? "role-in" : "role-out"}`}
        >
          {current}
        </span>

        {/* Blinking caret */}
        <span className="typing-caret ml-1 inline-block h-[0.9em] w-[2px] translate-y-[0.08em] bg-accent" />
      </span>
    </>
  );
}
