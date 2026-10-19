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

- Single-page App Router site: `src/app/page.tsx` (`"use client"`), `src/app/layout.tsx` (root layout + `metadata`), `src/app/globals.css`
- Static assets: `public/` (served at `/`); `src/app/favicon.ico`
- Import alias `@/*` → project root (not `src/*`)
- Tailwind CSS v4 via `@tailwindcss/turbopack`; CSS loader is wired in `next.config.ts`

## Verification

Run `lint -> build` before considering a change done. TypeScript is strict (`strict`, `isolatedModules`) and type-checked as part of `next build`; there is no separate `tsc` script.

## Gotchas

- Do not commit: `.next/`, `out/`, `build/`, `next-env.d.ts`, `.env*`, `.vercel`, `node_modules`
- `next-env.d.ts` is auto-generated and gitignored, but listed in `tsconfig.json`
- No CI workflows, no pre-commit config, no `opencode.json`, no other instruction files
- `page.tsx` is `"use client"` — `new Date()` (or any current-time value) cannot run during prerender. Next.js 16 blocks it. Compute dates client-side with `useState` + `useEffect`, or move dynamic content to a Server Component.
