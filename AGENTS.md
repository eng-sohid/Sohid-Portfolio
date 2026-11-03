<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

- `npm install` — package-lock.json is committed; npm is the package manager
- `npm run dev` — dev server at http://localhost:3000 (Turbopack)
- `npm run build` — production build (`next build`)
- `npm run start` — production server (`next start`)
- `npm run lint` — ESLint with `eslint-config-next` (core-web-vitals + typescript rules)

There is no test runner and no `npm test` script — do not look for tests; none exist in this repo.

## Structure

Personal portfolio, still a single-page App Router site: `src/app/page.tsx` is a Server Component that stacks the homepage sections (`Hero` down to `Contact`); navigation jumps to sections by anchor (`#about`…`#projects`). Real entrypoints:

- `src/components/sections/*` — About, Services, Skills, Education, Projects, Contact (one per page section; order set in `page.tsx`)
- `src/components/three/*` — React Three Fiber hero scene (`Scene3D.tsx` is a good orientation point)
- `src/data/site.ts` — ALL page content (site info, nav links, skills, projects). Edit data here, not JSX, for content changes
- `src/lib/styles.ts` — shared Tailwind class strings (buttons, section, h2). Reuse these instead of duplicating classes
- Static assets: `public/` (served at `/`); `src/app/globals.css` (Tailwind v4 `@theme` + custom keyframes: `.hero-fade`, `.reveal`, marquee, caret)

## Conventions

- Client Components are the exception, not the default. Only 7 files have `"use client"`: `Navbar`, `Reveal`, `CurrentYear`, `ThemeToggle`, and the three `components/three/*` files. Keep sections as Server Components and push interactivity into leaf components
- Theme system: all colors are CSS variables in `globals.css` (`--bg`, `--fg`, `--muted`, `--line`, `--card`, `--accent`, `--accent-fill`, …) exposed as Tailwind utilities (`bg-bg`, `text-fg`, `text-muted`, `border-line`, `bg-card`, `text-accent`). Dark is `:root`; light is `html.light`, applied before first paint by an inline script in `layout.tsx` (don't remove it — it prevents a flash). Never hardcode `white`/`#080a08`/`lime-400` in JSX — use the tokens. Buttons use `bg-accent-fill` (always bright lime) + `text-black`
- Bengali text (comments and on-page copy) appears throughout; it renders via `Noto_Sans_Bengali` loaded in `layout.tsx`. Geist has no Bengali glyphs — use `font-[family-name:var(--font-noto-bengali)]` on any new Bengali text
- `NEXT_PUBLIC_SITE_URL` env var sets `metadataBase`/openGraph URLs in `layout.tsx`; falls back to `http://localhost:3000`
- `next.config.ts` enables `cacheComponents` + `partialPrefetching`, `transpilePackages: ["three"]`, and whitelists the devicon/simpleicons CDNs for skill logo images
- Tech logos come from CDN URLs verified working (`techLogoUrl()` in `data/site.ts`); glyphs that are dark (Next.js, GitHub, Express, Vercel) render on a white chip via the `lightLogo` flag

## Verification

Run `lint -> build` before considering a change done. TypeScript is strict (`strict`, `isolatedModules`) and type-checked as part of `next build`; there is no separate `tsc` script.

## Gotchas

- Do not commit: `.next/`, `out/`, `build/`, `next-env.d.ts`, `.env*`, `.vercel`, `node_modules`
- `next-env.d.ts` is auto-generated and gitignored, but listed in `tsconfig.json`
- No CI workflows, no pre-commit config, no `opencode.json`, no other instruction files
- `new Date()` (or any current-time value) cannot run while prerendering a Client Component — Next.js 16 blocks it. `CurrentYear.tsx` exists as the pattern: render `null`/empty on server, set the value in `useState` + `useEffect` on mount. Attribution year in the footer uses it
- Import paths from deep components are relative (`../../data/site`), not `@/`; `@/*` maps to project root (not `src/*`)
