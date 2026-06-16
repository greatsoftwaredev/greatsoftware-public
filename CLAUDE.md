# greatsoftware.dev

The Great Software company site — a static **Astro 5 + Tailwind v4** site presenting Great Software as a broad software studio (its own products, client work, and research). Deployed to **GitHub Pages** on the custom domain `greatsoftware.dev`.

## Commands

```bash
npm run dev       # local dev server
npm run build     # build to dist/ (what Pages deploys)
npm run preview   # serve the built dist/
npm run check     # astro check — type/diagnostics (keep at 0 errors)
npm test          # build + assertion harness (see Testing)
```

## Architecture

- `src/layouts/Layout.astro` — the shell every page uses: `<head>` meta/OG/canonical, fonts, skip link, sticky `Nav`, `<slot/>`, `Footer`, and the fixed `Mountains` backdrop. Accepts `title` + `description` props.
- `src/components/` — focused single-purpose components: `Logo` (three-peak mark + wordmark), `Mountains` (fixed bottom-edge ridgelines), `Nav`, `Footer`, `ProductCard`, `LegalPage` (prose wrapper for Privacy/Terms), `AlpenglowHero` (home hero + the one interactive island).
- `src/pages/` — one file per route: `index`, `about`, `privacy`, `terms`, `contact`, `404`. Astro emits `route/index.html` (so `/privacy` 301s to `/privacy/`).
- `src/config/site.ts` — **single source of truth** for all brand/contact data.

## Conventions

**Design tokens live in `src/styles/global.css`** under Tailwind v4's `@theme` block — colors (`paper`, `sky`, `ink`, `muted`, `line`, `ridge-1..4`, `accent`) and fonts (`heading` = Outfit, `body` = Work Sans, `mono` = JetBrains Mono). Use the generated utilities (`bg-paper`, `text-ink`, `text-muted`, `text-accent`, `font-mono`, …) — don't hardcode hex values in components. The base layer in the same file holds global element styles, the `:focus-visible` outline, and the `prefers-reduced-motion` block.

**Accent must stay WCAG AA.** `--color-accent` is `#C04F2B` — the lightest terracotta that clears 4.5:1 against both white and the paper background (used for links, CTAs, status chips). If you retint it, keep contrast ≥ 4.5:1 for any text use.

**Contact info is build-time configurable.** Everything (Contact page, footer, the SMS HELP lines in the legal pages, metadata) reads `site.email` / `site.phone` / `site.mailHref` / `site.phoneHref` from `src/config/site.ts`. The phone is currently the stub `(555) 555-5555`. To change either, edit the one file, or override at build with `PUBLIC_GS_EMAIL` / `PUBLIC_GS_PHONE` (env var or a GitHub Actions repo variable) — no code change needed. Never hardcode contact details in a component.

**One interactive island, as garnish.** `AlpenglowHero` hydrates a single ArrowJS (`@arrow-js/core`) time-of-day slider that drives the `--tod` CSS variable (the mountains warm toward terracotta at "dusk"). The page is fully static and functional with JS off — keep it that way; don't route or render content through the island.

**Legal copy is compliance-locked.** The Privacy "SMS / Text Messaging" section and the Terms "SMS Program" section are required verbatim for 10DLC SMS carrier approval (source: `REBUILD-PLAN.md`). Do not reword them. `npm test` asserts the exact compliance strings are present in the built HTML — a regression fails the test.

## Testing

`npm test` (→ `scripts/test_runner.sh`) builds the site and runs `scripts/check-build.mjs`, which asserts invariants on the built `dist/` HTML (pages exist, home content, the 10DLC compliance strings, contact-config flow-through, no leftover React artifacts) and writes `test_logs/latest_summary.json` in the standard `{timestamp, mode, total, passed, failed, skipped, failures[]}` format. **Read `test_logs/latest_summary.json` for results.** Assertion count is self-tallying — add a `check(...)` call and the total updates automatically. `--smoke` / `--fast` / full all run the same pass (the build is fast).

## Deploy

Push to `main` triggers `.github/workflows/deploy.yml`, which runs `npm ci && npm run build` and publishes `dist/`. `public/CNAME` (`greatsoftware.dev`) and `astro.config.mjs`'s `site` must stay set for correct URLs. Don't push directly to `main` — open a PR.

## Docs

- Design spec: `docs/superpowers/specs/2026-06-16-greatsoftware-rebuild-design.md`
- Implementation plan: `docs/superpowers/plans/2026-06-16-greatsoftware-rebuild.md`
- Operator runbook (Telnyx number, 10DLC campaign fields): `REBUILD-PLAN.md`
