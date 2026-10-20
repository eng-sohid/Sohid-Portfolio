// src/components/sections/Contact.tsx
import Reveal from "../../components/Reveal";
import { site } from "../../data/site";
import { section, h2, btnPrimary, btnOutline, ext } from "../../lib/styles";

const whatsappLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  "Hi Sohid, I found your portfolio and would like to talk.",
)}`;

export default function Contact() {
  return (
    <section id="contact" className={section}>
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-lime-400">
            Contact
          </p>
          <h2 className={h2}>Let&apos;s work together</h2>
          <p className="mt-6 max-w-2xl text-base text-white/70 sm:text-lg">
            I&apos;m open to internships, freelance projects, and junior
            developer roles. Drop me a message and I&apos;ll get back to you
            soon.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href={whatsappLink} {...ext} className={btnPrimary}>
              Chat on WhatsApp
            </a>
            <a href={`mailto:${site.email}`} className={btnOutline}>
              Send me an email
            </a>
            <a href={site.github} {...ext} className={btnOutline}>
              GitHub
            </a>
            <a href={site.linkedin} {...ext} className={btnOutline}>
              LinkedIn
            </a>
          </div>

          <p className="mt-6 text-sm text-white/50">{site.email}</p>
        </Reveal>
      </div>
    </section>
  );
}
