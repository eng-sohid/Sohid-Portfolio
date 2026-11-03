import Reveal from "../../components/Reveal";
import { site } from "../../data/site";

import { section, container, kicker, h2, lead, ext } from "../../lib/styles";

import {
  ArrowUpRight,
  GitHubIcon,
  LinkedInIcon,
  Mail,
  MessageCircle,
} from "../../components/icons";

const whatsappLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  "Hi Sohid, I found your portfolio and would like to talk.",
)}`;

const channels = [
  {
    label: "Chat on WhatsApp",
    detail: "For a quick conversation",
    href: whatsappLink,
    icon: MessageCircle,
    external: true,
  },
  {
    label: "Send me an email",
    detail: site.email,
    href: `mailto:${site.email}`,
    icon: Mail,
    external: false,
  },
  {
    label: "LinkedIn",
    detail: "Professional profile",
    href: site.linkedin,
    icon: LinkedInIcon,
    external: true,
  },
  {
    label: "GitHub",
    detail: "Code and open-source work",
    href: site.github,
    icon: GitHubIcon,
    external: true,
  },
];

export default function Contact() {
  return (
    <section id="contact" className={`${section} relative overflow-hidden`}>
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-accent/10 blur-[140px]"
      />

      <div className={`${container} relative`}>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          {/* Contact introduction */}
          <Reveal>
            <div>
              <p className={kicker}>
                Contact
                <span aria-hidden="true" className="h-px w-8 bg-accent/50" />
              </p>

              <h2 className={`${h2} max-w-2xl`}>
                Let&apos;s build something{" "}
                <span className="text-accent">together.</span>
              </h2>

              <p className={`${lead} mt-6 max-w-xl`}>
                I&apos;m open to internships, freelance projects, and junior
                developer roles. Drop me a message and I&apos;ll get back to you
                soon.
              </p>

              {/* Email link */}
              <a
                href={`mailto:${site.email}`}
                className="group mt-9 inline-flex max-w-full items-center gap-3 break-all text-lg font-semibold text-fg transition-colors duration-300 hover:text-accent sm:text-2xl"
              >
                {site.email}

                <ArrowUpRight
                  size={22}
                  className="shrink-0 text-accent/60 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>

              {/* Availability indicator */}
              <div className="mt-12 flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                </span>

                <span className="text-xs font-medium tracking-wide text-muted">
                  Open to opportunities
                </span>
              </div>
            </div>
          </Reveal>

          {/* Contact channels */}
          <Reveal delay={150}>
            <div>
              <div className="mb-5 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  Get in touch
                </p>

                <span className="font-mono text-[10px] tracking-widest text-accent/60">
                  CONTACT / 001
                </span>
              </div>

              <ul className="flex flex-col gap-3">
                {channels.map((channel, index) => {
                  const Icon = channel.icon;

                  return (
                    <li key={channel.label}>
                      <a
                        href={channel.href}
                        {...(channel.external ? ext : {})}
                        className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl border border-line bg-card/70 p-4 transition-all duration-500 hover:-translate-x-1 hover:border-accent/40 hover:bg-card sm:p-5"
                      >
                        {/* Hover background */}
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-accent/5 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                        />

                        <span className="relative flex min-w-0 items-center gap-4">
                          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-accent/5 text-accent transition-all duration-300 group-hover:border-accent/30 group-hover:bg-accent/10">
                            <Icon size={20} />
                          </span>

                          <span className="flex min-w-0 flex-col gap-1">
                            <span className="font-semibold text-fg transition-colors duration-300 group-hover:text-accent">
                              {channel.label}
                            </span>

                            <span className="truncate text-xs text-muted sm:text-sm">
                              {channel.detail}
                            </span>
                          </span>
                        </span>

                        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 group-hover:border-accent/40 group-hover:text-accent">
                          <ArrowUpRight
                            size={17}
                            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                        </span>

                        <span
                          aria-hidden="true"
                          className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full"
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Bottom decoration */}
        <div className="mt-20 flex items-center gap-4 border-t border-line pt-6">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />

          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
            Have an idea? Let&apos;s talk.
          </span>

          <span className="h-px flex-1 bg-line" />

          <span className="font-mono text-[10px] tracking-widest text-muted/60">
            SOHID.
          </span>
        </div>
      </div>
    </section>
  );
}
