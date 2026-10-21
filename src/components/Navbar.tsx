"use client";

import { useEffect, useState } from "react";
import { navLinks, site } from "../data/site";
import { ext } from "../lib/styles";

const observedSections = [...navLinks.map((l) => l.href), "#contact"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#about");

  // Highlight the link for the section currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    observedSections.forEach((href) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu with the Escape key.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const linkClass = (href: string) =>
    `transition hover:text-lime-400 ${
      active === href ? "text-lime-400" : "text-gray-300"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080a08]/90 backdrop-blur-lg">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5"
      >
        <a
          href="#"
          aria-label="Sohid Mondol, back to top"
          className="text-2xl font-bold tracking-tight text-white"
        >
          Sohid<span className="text-lime-400">.</span>
        </a>

        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href ? "true" : undefined}
              className={linkClass(link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 sm:flex">
          <a
            href={site.cv}
            {...ext}
            className="text-sm font-semibold text-gray-300 transition hover:text-lime-400"
          >
            View CV
          </a>
          <a
            href="#contact"
            className="rounded-full border border-lime-400/50 px-5 py-2.5 text-sm font-semibold text-lime-400 transition duration-300 hover:bg-lime-400 hover:text-black"
          >
            Contact me
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="rounded-lg border border-white/15 p-2 text-white transition hover:border-lime-400 hover:text-lime-400 md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {menuOpen ? (
              <>
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </>
            ) : (
              <>
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-white/10 px-6 py-4 md:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={linkClass(link.href)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={site.cv}
              {...ext}
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 transition hover:text-lime-400"
            >
              View CV
            </a>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="font-semibold text-lime-400 transition hover:text-lime-300"
            >
              Contact me
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
