// src/components/Footer.tsx
import CurrentYear from "../components/CurrentYear";
import { site } from "../data/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-sm text-white/50 sm:flex-row">
        <p>
          © <CurrentYear /> {site.name}. All rights reserved.
        </p>
        <p>Built with Next.js, Tailwind & Three.js</p>
      </div>
    </footer>
  );
}
