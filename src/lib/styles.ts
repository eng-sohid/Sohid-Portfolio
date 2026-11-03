// src/lib/styles.ts
export const ext = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

/* Layout */
export const section = "border-t border-line px-6 py-24 sm:py-32";
export const container = "mx-auto max-w-6xl";
export const kicker =
  "mb-3 flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-accent";
export const h2 = "text-3xl font-bold text-fg text-balance sm:text-5xl";
export const lead = "mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg";

/* Buttons — accent-fill is a bright lime in both themes and always pairs with black text */
export const btnPrimary =
  "inline-flex items-center gap-2 rounded-full bg-accent-fill px-6 py-3.5 font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0";
export const btnOutline =
  "inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 font-semibold text-fg transition duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent active:translate-y-0";
export const btnSmallPrimary =
  "inline-flex items-center gap-2 rounded-full bg-accent-fill px-4 py-2.5 text-sm font-semibold text-black transition hover:brightness-110";
export const btnSmallOutline =
  "inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-fg transition hover:border-accent hover:text-accent";

/* Cards */
export const card =
  "rounded-2xl border border-line bg-card transition duration-300 hover:border-accent/40 hover:bg-card-hover";
