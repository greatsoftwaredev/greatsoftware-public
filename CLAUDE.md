# greatsoftware.dev

The Great Software company site — a static **Astro 7 + Tailwind v4** site presenting Great Software
as a broad software studio (its own products, client work, and research). Built to `dist/` and
deployed to **GitHub Pages** on the custom domain `greatsoftware.dev` on every push to `main`.

## Commands

```bash
npm run dev       # local dev server (interactive for humans; auto-backgrounds in an agent session)
npm run build     # build to dist/ (what Pages deploys)
npm run preview   # serve the built dist/
npm run check     # astro check — type/diagnostics (keep at 0 errors)
npm test          # build + assertion harness (see Testing)
```

## Architecture

- `src/layouts/Layout.astro` — the shell every page uses: `<head>` meta/OG/canonical, fonts, skip
  link, sticky `Nav`, `<slot/>`, `Footer`, and the fixed `Mountains` backdrop. Accepts `title` +
  `description` props.
- `src/components/` — focused single-purpose components: `Logo` (three-peak mark + wordmark),
  `Mountains` (fixed bottom-edge ridgelines), `Nav`, `Footer`, `ProductCard`, `LegalPage` (prose
  wrapper for Privacy/Terms), `AlpenglowHero` (home hero + the one interactive island).
- `src/pages/` — one file per route: `index`, `about`, `privacy`, `terms`, `contact`, `404`. Astro
  emits `route/index.html` (so `/privacy` 301s to `/privacy/`).
- `src/config/site.ts` — **single source of truth** for all brand/contact data.

## Conventions

**Design tokens live in `src/styles/global.css`** under Tailwind v4's `@theme` block — colors
(`paper`, `sky`, `ink`, `muted`, `line`, `ridge-1..4`, `accent`) and fonts (`heading` = Outfit,
`body` = Work Sans, `mono` = JetBrains Mono). Use the generated utilities (`bg-paper`, `text-ink`,
`text-muted`, `text-accent`, `font-mono`, …) — don't hardcode hex values in components. The base
layer in the same file holds global element styles, the `:focus-visible` outline, and the
`prefers-reduced-motion` block.

**Accent must stay WCAG AA.** `--color-accent` is `#C04F2B` — the lightest terracotta that clears
4.5:1 against both white and the paper background (used for links, CTAs, status chips). If you
retint it, keep contrast ≥ 4.5:1 for any text use.

**Contact info is build-time configurable.** Everything (Contact page, footer, the SMS HELP lines in
the legal pages, metadata) reads `site.email` / `site.phone` / `site.mailHref` / `site.phoneHref`
from `src/config/site.ts`. To change either, edit the one file, or override at build with
`PUBLIC_GS_EMAIL` / `PUBLIC_GS_PHONE` (env var or a GitHub Actions repo variable) — no code change
needed. Never hardcode contact details in a component.

**Client JS is one small controller — keep it garnish.** The only client script is an inline
vanilla-JS controller in `Layout.astro` that drives the theme toggle and the time-of-day ambience:
it maps the visitor's local hour to dawn/day/dusk/night presets, sets the `--tod` CSS variable, and
toggles `.night` (the `Mountains` backdrop warms toward terracotta at "dusk"). The hero
(`AlpenglowHero`) is static. Pages are fully static and functional with JS off — keep it that way;
don't route or render content through script. (Note: `@arrow-js/core` is still a dependency but is
currently unused in `src/` — a leftover; drop it or use it deliberately, don't assume it's wired.)

**Legal copy is compliance-locked.** The Privacy "SMS / Text Messaging" section and the Terms "SMS
Program" section are required verbatim for 10DLC SMS carrier approval. Do not reword them. `npm test`
asserts the exact compliance strings (STOP/HELP, "do not share or sell", Telnyx, "SMS Program") are
present in the built HTML — a regression fails the test.

**Whitespace & the Rust compiler (Astro 7).** The v7 `.astro` compiler errors on unclosed non-void
tags (it no longer auto-corrects) and collapses whitespace-only text nodes between tags. If you need
a rendered space between two inline elements, add an explicit `{' '}`. Keep `astro check` at 0 errors.

## Testing

`npm test` (→ `scripts/test_runner.sh`) builds the site and runs `scripts/check-build.mjs`, which
asserts invariants on the built `dist/` HTML (pages exist, home content, the 10DLC compliance
strings, contact-config flow-through, no leftover React artifacts) and writes
`test_logs/latest_summary.json` in the standard `{timestamp, mode, total, passed, failed, skipped,
failures[]}` format. **Read `test_logs/latest_summary.json` for results.** Assertion count is
self-tallying — add a `check(...)` call and the total updates automatically. `--smoke` / `--fast` /
full all run the same pass (the build is fast).

## Dev server — agent workflow (Astro 7)

Astro 7's dev server is agent-aware. It detects coding agents via the `am-i-vibing` package; in an
agent session `detectAgenticEnvironment().type === "agent"`, so a plain `astro dev` **auto-runs in
the background and returns control** (with JSON logging) instead of hanging the session. Humans
running `npm run dev` in a normal terminal still get the interactive foreground server — unchanged.

Background server commands (also wired as npm scripts):

| Command | npm script | Purpose |
|---|---|---|
| `astro dev --background` | `npm run dev:bg` | Start detached; returns immediately. |
| `astro dev status` | `npm run dev:status` | Is a server running? (pid, uptime) |
| `astro dev logs [--follow]` | `npm run dev:logs` | View background server logs. |
| `astro dev stop` | `npm run dev:stop` | Stop the background server. |

Add `--json` to any of these for machine-readable output (one JSON object per line:
`{message, label, level}`). In an agent session JSON logging is on by default.

The whole `.astro/` dir is **generated and gitignored** — content types (`*.d.ts`, `*.mjs`), the
dev-server lockfile (`dev.json`), logs (`dev.log`), and telemetry (`settings.json`). `astro
sync`/`check`/`build` regenerate it (including in CI), so never commit it.

**Gotcha:** only one background server per port (4321). Starting a second, or restarting before the
previous one fully exits, fails with *"Dev server process exited before becoming ready."* Recover
with `npm run dev:stop` (or `astro dev stop`) before starting again; check with `npm run dev:status`.

## Deploy

Push to `main` triggers `.github/workflows/deploy.yml`, which runs `npm ci && npm run build` (Node
22) and publishes `dist/`. `public/CNAME` (`greatsoftware.dev`) and `astro.config.mjs`'s `site` must
stay set for correct URLs. Don't push directly to `main` — open a PR.

## Docs

- Design spec: `docs/superpowers/specs/2026-06-16-greatsoftware-rebuild-design.md`
- Implementation plan: `docs/superpowers/plans/2026-06-16-greatsoftware-rebuild.md`
