import CurrentYear from "../components/CurrentYear";
import { GitHubIcon, LinkedInIcon, Mail } from "./icons";
import { site, navLinks } from "../data/site";

const socials = [
  { href: site.github, label: "GitHub", icon: GitHubIcon },
  { href: site.linkedin, label: "LinkedIn", icon: LinkedInIcon },
  { href: `mailto:${site.email}`, label: "Email", icon: Mail },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg px-6 pb-8 pt-14">
      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[500px] -translate-x-1/2 rounded-full bg-accent/5 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Main footer */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <a
              href="#home"
              className="group inline-flex items-center text-2xl font-bold tracking-tight text-fg"
              aria-label="Sohid Mondol, back to top"
            >
              Sohid
              <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">
                .
              </span>
            </a>

            <p className="mt-2 text-sm text-muted">Full-Stack Web Developer</p>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted/70">
              Building digital experiences with creativity, curiosity, and code.
            </p>

            {/* Social links */}
            <ul className="mt-6 flex gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                const isEmail = social.href.startsWith("mailto:");

                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      {...(!isEmail
                        ? {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          }
                        : {})}
                      aria-label={social.label}
                      title={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-card text-muted transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-accent/5 hover:text-accent"
                    >
                      <Icon size={17} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Navigation */}
          <div className="md:pt-2">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Navigation
            </p>

            <nav aria-label="Footer navigation">
              <ul className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm sm:gap-x-16">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-muted transition-colors duration-300 hover:text-accent"
                    >
                      <span
                        aria-hidden="true"
                        className="h-1 w-1 rounded-full bg-accent/40 transition-all duration-300 group-hover:scale-150 group-hover:bg-accent"
                      />

                      {link.label}
                    </a>
                  </li>
                ))}

                <li>
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-2 text-muted transition-colors duration-300 hover:text-accent"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 rounded-full bg-accent/40 transition-all duration-300 group-hover:scale-150 group-hover:bg-accent"
                    />
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-xs text-muted/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {site.name}. All rights reserved.
          </p>

          <p>Built with Next.js, Tailwind CSS &amp; Three.js</p>

          <a
            href="#home"
            className="group inline-flex items-center gap-2 transition-colors hover:text-accent"
          >
            Back to top
            <span className="transition-transform duration-300 group-hover:-translate-y-1">
              ↑
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
