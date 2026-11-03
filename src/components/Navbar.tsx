"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import { navLinks, site } from "../data/site";
import { ext } from "../lib/styles";
import ThemeToggle from "./ThemeToggle";

const observedSections = [...navLinks.map((link) => link.href), "#contact"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#home");

  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Navbar entrance animation
  useEffect(() => {
    if (!headerRef.current || !navRef.current) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        delay: 0.2,
        defaults: { ease: "power3.out" },
      });

      timeline.fromTo(
        headerRef.current,
        { y: -35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
      );

      timeline.fromTo(
        navRef.current,
        { scale: 0.97 },
        { scale: 1, duration: 0.7 },
        "-=0.55",
      );
    }, headerRef);

    return () => context.revert();
  }, []);

  // Highlight active section
  useEffect(() => {
    const sections = observedSections
      .map((href) => document.querySelector(href))
      .filter((element): element is Element => element !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Close mobile menu with Escape
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  // Mobile menu animation
  useEffect(() => {
    if (!menuOpen || !mobileMenuRef.current) return;

    const menu = mobileMenuRef.current;
    const links = menu.querySelectorAll(".mobile-nav-link");

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      timeline.fromTo(
        menu,
        { opacity: 0, y: -12, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35 },
      );

      timeline.fromTo(
        links,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.045 },
        "-=0.15",
      );
    }, menu);

    return () => context.revert();
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const linkClass = (href: string) =>
    `relative rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
      active === href
        ? "bg-accent/10 text-accent"
        : "text-muted hover:bg-accent/5 hover:text-fg"
    }`;

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 opacity-0 sm:px-6"
    >
      <div className="mx-auto max-w-7xl">
        <nav
          ref={navRef}
          aria-label="Primary"
          className="flex items-center justify-between gap-3 rounded-2xl border border-line/70 bg-bg/75 px-3 py-3 shadow-[0_12px_50px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition-colors duration-300 sm:px-5"
        >
          {/* Logo */}
          <a
            href="#home"
            aria-label="Sohid Mondol, back to top"
            onClick={closeMenu}
            className="group shrink-0 px-2 text-2xl font-bold tracking-[-0.07em] text-fg"
          >
            Sohid
            <span className="text-accent transition-colors duration-300 group-hover:text-fg">
              .
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 rounded-full border border-line/50 bg-card/50 p-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={active === link.href ? "page" : undefined}
                className={linkClass(link.href)}
              >
                {link.label}
                {active === link.href && (
                  <span className="absolute inset-x-4 -bottom-0.5 h-px bg-accent shadow-[0_0_8px_rgba(204,255,0,0.8)]" />
                )}
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={site.cv}
              {...ext}
              className="hidden rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors duration-300 hover:text-accent sm:block"
            >
              View CV
            </a>

            <ThemeToggle />

            <a
              href="#contact"
              className="hidden rounded-full bg-accent-fill px-5 py-2.5 text-sm font-semibold text-black shadow-[0_0_20px_rgba(204,255,0,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(204,255,0,0.2)] sm:block"
            >
              Let&apos;s Talk <span className="ml-1">↗</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="rounded-full border border-line p-2.5 text-fg transition-all duration-300 hover:border-accent hover:text-accent md:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
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
          </div>
        </nav>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div
            ref={mobileMenuRef}
            id="mobile-menu"
            className="mt-3 rounded-2xl border border-line/70 bg-bg/95 p-3 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-1 text-sm font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={active === link.href ? "page" : undefined}
                  className={`mobile-nav-link ${linkClass(link.href)}`}
                >
                  {link.label}
                  {active === link.href && (
                    <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                  )}
                </a>
              ))}

              <a
                href={site.cv}
                {...ext}
                onClick={closeMenu}
                className="mobile-nav-link rounded-full px-4 py-3 text-muted transition hover:text-accent"
              >
                View CV
              </a>

              <a
                href="#contact"
                onClick={closeMenu}
                className="mobile-nav-link mt-1 rounded-full bg-accent-fill px-4 py-3 text-center font-semibold text-black transition hover:brightness-110"
              >
                Let&apos;s Talk ↗
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
