"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "./icons";

const KEY = "theme";

type Theme = "dark" | "light";

// Listen for theme changes.
function subscribe(callback: () => void) {
  window.addEventListener("themechange", callback);

  return () => {
    window.removeEventListener("themechange", callback);
  };
}

// Get the current theme from HTML.
function getSnapshot(): Theme {
  return document.documentElement.classList.contains("light")
    ? "light"
    : "dark";
}

// Server-side fallback.
function getServerSnapshot(): Theme {
  return "dark";
}

export default function ThemeToggle({
  className = "",
}: {
  className?: string;
}) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";

    const root = document.documentElement;

    // Smooth theme transition.
    root.classList.add("theme-anim");

    window.setTimeout(() => {
      root.classList.remove("theme-anim");
    }, 400);

    // Update HTML theme.
    root.classList.toggle("light", next === "light");

    // Save theme preference.
    try {
      localStorage.setItem(KEY, next);
    } catch {
      // Ignore storage errors.
    }

    // Notify other components.
    window.dispatchEvent(new Event("themechange"));
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={!isDark}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`
        group relative inline-flex h-10 w-10 items-center
        justify-center overflow-hidden rounded-full
        border border-line bg-card text-muted
        transition-all duration-300
        hover:-translate-y-0.5
        hover:border-accent/50
        hover:bg-accent/5
        hover:text-accent
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-accent
        focus-visible:ring-offset-2
        focus-visible:ring-offset-bg
        ${className}
      `}
    >
      <span
        className={`
          absolute inset-0 rounded-full bg-accent/10
          transition-transform duration-500
          ${isDark ? "scale-0" : "scale-100"}
        `}
      />

      <span className="relative flex items-center justify-center">
        {isDark ? (
          <Sun
            size={18}
            className="transition-transform duration-500 group-hover:rotate-45"
          />
        ) : (
          <Moon
            size={18}
            className="transition-transform duration-500 group-hover:-rotate-12"
          />
        )}
      </span>
    </button>
  );
}
