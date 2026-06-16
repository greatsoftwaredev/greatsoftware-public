# greatsoftware.dev Astro Rebuild — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the half-built React/TanStack SPA with a clean, light "studio at altitude" Astro + Tailwind site presenting Great Software as a broad software studio, with the 10DLC-required Privacy + Messaging Terms pages.

**Architecture:** Static Astro site (outputs to `dist`, deployed unchanged to GitHub Pages). A shared `Layout.astro` wraps every page with sticky nav, a fixed bottom-edge mountain-ridgeline backdrop, and footer. All contact/brand data flows from a single build-time config module (`src/config/site.ts`). One vanilla-JS Astro island powered by ArrowJS adds a playful "alpenglow" time-of-day control in the hero (pure garnish; site is fully functional with JS off).

**Tech Stack:** Astro 5, Tailwind CSS v4 (`@tailwindcss/vite`), `@arrow-js/core`, fonts Outfit + Work Sans + JetBrains Mono. No test framework existed in the scaffold; verification is build-based plus a Node assertion script for compliance-critical legal content.

**Spec:** `docs/superpowers/specs/2026-06-16-greatsoftware-rebuild-design.md`
**Branch:** `astro-rebuild` (already created; do NOT work on `main`).

---

## File map

**Created:**
- `astro.config.mjs` — Astro config (site URL, Tailwind vite plugin)
- `tsconfig.json` — Astro's strict TS base (replaces the React tsconfigs)
- `src/styles/global.css` — Tailwind import + `@theme` design tokens + base layer
- `src/config/site.ts` — single source of truth for contact/brand (build-time vars)
- `src/layouts/Layout.astro` — base shell (head/meta, nav, mountains, footer, slot)
- `src/components/Logo.astro` — three-peak line mark + wordmark
- `src/components/Mountains.astro` — fixed bottom-edge ridgeline SVG band
- `src/components/Nav.astro` — sticky top nav
- `src/components/Footer.astro` — footer with nav + legal links + email
- `src/components/ProductCard.astro` — product/venture card
- `src/components/LegalPage.astro` — prose wrapper for Privacy/Terms
- `src/components/AlpenglowHero.astro` — hero block + ArrowJS island
- `src/pages/index.astro` — Home
- `src/pages/about.astro` — About / How we work
- `src/pages/privacy.astro` — Privacy Policy (with SMS section)
- `src/pages/terms.astro` — Terms / Messaging Terms
- `src/pages/contact.astro` — Contact
- `public/404.html` — kept (already present)
- `public/CNAME` — kept (already present)
- `public/favicon.svg` — three-peak favicon
- `scripts/check-build.mjs` — asserts critical invariants on built `dist`
- `scripts/test_runner.sh` — runs build + checks, writes `test_logs/latest_summary.json`

**Removed (old React SPA):**
- `index.html`, `vite.config.ts`, `eslint.config.js`
- `tsconfig.app.json`, `tsconfig.node.json`
- `src/main.tsx`, `src/routeTree.gen.ts`
- `src/routes/**`, `src/components/*.tsx`, `src/components/*.module.css`, `src/styles/global.css` (old)

**Modified:**
- `package.json` — swap React/Vite deps for Astro/Tailwind/ArrowJS; new scripts

---

### Task 1: Tear down the old SPA and stand up an empty Astro skeleton

**Files:**
- Delete: `index.html`, `vite.config.ts`, `eslint.config.js`, `tsconfig.app.json`, `tsconfig.node.json`, `src/main.tsx`, `src/routeTree.gen.ts`, `src/routes/`, `src/components/` (the `.tsx`/`.module.css` files), old `src/styles/global.css`
- Create: `astro.config.mjs`, `tsconfig.json`
- Modify: `package.json`

- [ ] **Step 1: Remove old SPA source**

```bash
git rm -r src/routes src/components src/styles/global.css src/main.tsx src/routeTree.gen.ts \
  index.html vite.config.ts eslint.config.js tsconfig.app.json tsconfig.node.json
```

- [ ] **Step 2: Replace `package.json`**

```json
{
  "name": "greatsoftware-public",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "test": "bash scripts/test_runner.sh"
  },
  "dependencies": {
    "@arrow-js/core": "^1.0.0-alpha.9",
    "astro": "^5.2.0"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.4",
    "typescript": "^5.7.0"
  }
}
```

(Tailwind is added in Task 2 via `astro add`, which appends its own deps.)

- [ ] **Step 3: Create `astro.config.mjs`**

```js
// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://greatsoftware.dev',
});
```

- [ ] **Step 4: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 5: Install dependencies**

Run: `rm -rf node_modules package-lock.json && npm install`
Expected: installs Astro; no React/Vite/TanStack packages remain.

- [ ] **Step 6: Create a placeholder home page so the build has something**

Create `src/pages/index.astro`:

```astro
<!doctype html>
<html lang="en">
  <head><meta charset="utf-8" /><title>Great Software</title></head>
  <body><h1>Great Software</h1></body>
</html>
```

- [ ] **Step 7: Verify the build works**

Run: `npm run build`
Expected: succeeds; `dist/index.html` exists containing "Great Software".

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: remove React SPA, scaffold empty Astro project"
```

---

### Task 2: Add Tailwind v4 and the design-token theme

**Files:**
- Modify: `astro.config.mjs` (Tailwind vite plugin, added by `astro add`)
- Create: `src/styles/global.css`

- [ ] **Step 1: Add Tailwind via the official integration**

Run: `npx astro add tailwind --yes`
Expected: installs `tailwindcss` + `@tailwindcss/vite`, updates `astro.config.mjs` to register the Vite plugin, and creates `src/styles/global.css` with `@import "tailwindcss";`.

- [ ] **Step 2: Replace `src/styles/global.css` with the full token theme**

```css
@import "tailwindcss";

@theme {
  --color-paper: #FAF9F6;
  --color-sky: #EAF1F6;
  --color-ink: #1A2230;
  --color-muted: #566173;
  --color-line: #E3E2DC;
  --color-ridge-1: #C7D3DE;
  --color-ridge-2: #9FB2C4;
  --color-ridge-3: #6B8299;
  --color-ridge-4: #3E5468;
  --color-accent: #D9663E;
  --color-accent-ink: #FFFFFF;

  --font-heading: "Outfit", ui-sans-serif, system-ui, sans-serif;
  --font-body: "Work Sans", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
  body {
    background-color: var(--color-paper);
    color: var(--color-muted);
    font-family: var(--font-body);
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
  }
  h1, h2, h3, h4 {
    font-family: var(--font-heading);
    color: var(--color-ink);
    line-height: 1.1;
  }
  a { color: var(--color-accent); text-decoration: none; }
  a:hover { text-decoration: underline; }
  :focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
}
```

- [ ] **Step 3: Verify tokens compile**

Temporarily set `src/pages/index.astro` body to:
```astro
<body class="bg-paper text-ink">
  <h1 class="font-heading text-accent">Great Software</h1>
</body>
```
Run: `npm run build`
Expected: succeeds; `dist/index.html` includes generated utility classes (no Tailwind errors). Revert the body change after (Task 6 rebuilds index).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Tailwind v4 with studio-at-altitude design tokens"
```

---

### Task 3: Central contact/brand config (build-time variables)

**Files:**
- Create: `src/config/site.ts`
- Create: `scripts/check-build.mjs` (started here; extended in Task 12)

- [ ] **Step 1: Write `src/config/site.ts`**

```ts
const RAW_PHONE = import.meta.env.PUBLIC_GS_PHONE ?? "(555) 555-5555";
const RAW_EMAIL = import.meta.env.PUBLIC_GS_EMAIL ?? "hello@greatsoftware.dev";

/** Single source of truth for all contact + brand info. */
export const site = {
  name: "Great Software",
  tagline: "A whole range of software.",
  oneLiner:
    "An independent software studio — our own products, client work, and research. Whatever the problem needs.",
  domain: "greatsoftware.dev",
  url: "https://greatsoftware.dev",
  email: RAW_EMAIL,
  phone: RAW_PHONE,
  /** mailto: href derived from email */
  mailHref: `mailto:${RAW_EMAIL}`,
  /** tel: href with non-digits stripped, +1 prefixed */
  phoneHref: `tel:+1${RAW_PHONE.replace(/\D/g, "")}`,
} as const;

export type Site = typeof site;
```

- [ ] **Step 2: Verify it imports and derives correctly**

Run:
```bash
npx tsx -e "import('./src/config/site.ts').then(m => console.log(m.site.phoneHref, m.site.mailHref))" 2>/dev/null \
  || node --experimental-strip-types -e "import('./src/config/site.ts').then(m=>console.log(m.site.phoneHref,m.site.mailHref))"
```
Expected: prints `tel:+15555555555 mailto:hello@greatsoftware.dev`.
(If neither runner is available, skip — Task 12's build check verifies the rendered output instead.)

- [ ] **Step 3: Commit**

```bash
git add src/config/site.ts
git commit -m "feat: add central site config for build-time contact info"
```

---

### Task 4: Logo (three-peak mark) and fixed Mountains backdrop

**Files:**
- Create: `src/components/Logo.astro`
- Create: `src/components/Mountains.astro`
- Create: `public/favicon.svg`

- [ ] **Step 1: Write `src/components/Logo.astro`**

A clean geometric three-peak line mark (nod to the old trident's three points) + optional wordmark.

```astro
---
interface Props {
  withWordmark?: boolean;
  class?: string;
}
const { withWordmark = true, class: className = "" } = Astro.props;
---
<span class={`inline-flex items-center gap-2 ${className}`}>
  <svg viewBox="0 0 48 32" width="32" height="22" role="img" aria-label="Great Software"
       fill="none" stroke="currentColor" stroke-width="2"
       stroke-linejoin="round" stroke-linecap="round" class="text-ink">
    <!-- three peaks: left, center (tallest), right -->
    <path d="M2 30 L12 14 L20 24 L24 6 L30 24 L38 12 L46 30" />
  </svg>
  {withWordmark && (
    <span class="font-heading font-semibold text-ink tracking-tight">Great Software</span>
  )}
</span>
```

- [ ] **Step 2: Write `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 32">
  <path d="M2 30 L12 14 L20 24 L24 6 L30 24 L38 12 L46 30"
        fill="none" stroke="#1A2230" stroke-width="3"
        stroke-linejoin="round" stroke-linecap="round"/>
</svg>
```

- [ ] **Step 3: Write `src/components/Mountains.astro`**

Fixed, decorative, behind content; layered ridgelines far→near. Shrinks on mobile via responsive height; no pointer events; hidden from a11y tree.

```astro
---
// Decorative fixed ridgeline band anchored to the bottom of the viewport.
---
<div aria-hidden="true"
     class="pointer-events-none fixed inset-x-0 bottom-0 -z-10 h-[34vh] min-h-[160px] max-md:h-[120px] max-md:min-h-[120px] overflow-hidden">
  <svg class="absolute bottom-0 w-full h-full" viewBox="0 0 1440 400"
       preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
    <!-- far -->
    <path fill="var(--color-ridge-1)" d="M0 320 L240 210 L470 300 L720 180 L980 290 L1230 200 L1440 280 L1440 400 L0 400 Z"/>
    <!-- mid-far -->
    <path fill="var(--color-ridge-2)" d="M0 360 L210 250 L430 330 L690 230 L940 330 L1200 250 L1440 320 L1440 400 L0 400 Z"/>
    <!-- mid-near -->
    <path fill="var(--color-ridge-3)" d="M0 390 L260 300 L520 370 L780 290 L1040 370 L1300 300 L1440 360 L1440 400 L0 400 Z"/>
    <!-- near -->
    <path fill="var(--color-ridge-4)" d="M0 400 L320 350 L600 395 L880 345 L1160 395 L1440 360 L1440 400 L0 400 Z"/>
    <!-- alpenglow overlay: opacity driven by the --tod CSS var (set by the ArrowJS island; default subtle) -->
    <rect x="0" y="0" width="1440" height="400" fill="var(--color-accent)"
          style="opacity: calc(var(--tod, 0.4) * 0.22); mix-blend-mode: multiply;"/>
  </svg>
</div>
```

- [ ] **Step 4: Verify build**

Temporarily import both into `src/pages/index.astro` and `npm run build`.
Expected: succeeds; `dist/index.html` contains the ridgeline `<path` fills and favicon is copied to `dist/favicon.svg`.

- [ ] **Step 5: Commit**

```bash
git add src/components/Logo.astro src/components/Mountains.astro public/favicon.svg
git commit -m "feat: add three-peak logo and fixed mountain-ridgeline backdrop"
```

---

### Task 5: Layout shell, Nav, Footer

**Files:**
- Create: `src/components/Nav.astro`, `src/components/Footer.astro`, `src/layouts/Layout.astro`

- [ ] **Step 1: Write `src/components/Nav.astro`**

```astro
---
import Logo from "./Logo.astro";
const links = [
  { href: "/#products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
---
<header class="sticky top-0 z-30 backdrop-blur-sm bg-paper/80 border-b border-line">
  <nav class="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
    <a href="/" class="no-underline hover:no-underline"><Logo /></a>
    <ul class="flex items-center gap-6 list-none m-0 p-0">
      {links.map((l) => (
        <li>
          <a href={l.href}
             class="font-mono text-sm text-muted hover:text-ink no-underline hover:no-underline transition-colors duration-200">
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
</header>
```

- [ ] **Step 2: Write `src/components/Footer.astro`**

```astro
---
import { site } from "../config/site";
import Logo from "./Logo.astro";
const year = new Date().getFullYear();
---
<footer class="relative z-10 mt-32 border-t border-line bg-paper/90">
  <div class="mx-auto max-w-6xl px-6 py-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
    <Logo />
    <ul class="flex flex-wrap gap-x-6 gap-y-2 list-none m-0 p-0 font-mono text-sm">
      <li><a href="/about" class="text-muted hover:text-ink no-underline">About</a></li>
      <li><a href="/privacy" class="text-muted hover:text-ink no-underline">Privacy</a></li>
      <li><a href="/terms" class="text-muted hover:text-ink no-underline">Terms</a></li>
      <li><a href={site.mailHref} class="text-muted hover:text-ink no-underline">{site.email}</a></li>
    </ul>
  </div>
  <p class="mx-auto max-w-6xl px-6 pb-10 text-xs text-muted font-mono">© {year} {site.name}</p>
</footer>
```

- [ ] **Step 3: Write `src/layouts/Layout.astro`**

```astro
---
import "../styles/global.css";
import { site } from "../config/site";
import Nav from "../components/Nav.astro";
import Footer from "../components/Footer.astro";
import Mountains from "../components/Mountains.astro";

interface Props {
  title?: string;
  description?: string;
}
const {
  title = site.name,
  description = site.oneLiner,
} = Astro.props;
const fullTitle = title === site.name ? `${site.name} — ${site.tagline}` : `${title} — ${site.name}`;
const canonical = new URL(Astro.url.pathname, site.url).href;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <title>{fullTitle}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={fullTitle} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta name="twitter:card" content="summary" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Work+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" />
  </head>
  <body class="min-h-screen flex flex-col">
    <Nav />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
    <Mountains />
  </body>
</html>
```

- [ ] **Step 4: Point the placeholder home at the layout and verify**

Set `src/pages/index.astro`:
```astro
---
import Layout from "../layouts/Layout.astro";
---
<Layout>
  <section class="mx-auto max-w-6xl px-6 py-24">
    <h1 class="text-5xl">Great Software</h1>
  </section>
</Layout>
```
Run: `npm run build`
Expected: succeeds; `dist/index.html` contains the nav links, footer email `hello@greatsoftware.dev`, fonts `<link>`, and canonical URL `https://greatsoftware.dev/`.

- [ ] **Step 5: Commit**

```bash
git add src/components/Nav.astro src/components/Footer.astro src/layouts/Layout.astro src/pages/index.astro
git commit -m "feat: add base layout with sticky nav, footer, and meta"
```

---

### Task 6: ProductCard + Home page (hero placeholder, products grid, how-we-work)

**Files:**
- Create: `src/components/ProductCard.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write `src/components/ProductCard.astro`**

```astro
---
interface Props {
  title: string;
  description: string;
  status: "live" | "coming-soon";
  link?: string;
  linkText?: string;
}
const { title, description, status, link, linkText } = Astro.props;
const statusLabel = status === "live" ? "live" : "coming soon";
const statusClass = status === "live" ? "text-accent" : "text-muted";
---
<article class="group rounded-xl border border-line bg-paper p-6 transition-colors duration-200 hover:border-accent flex flex-col gap-3">
  <div class="flex items-center justify-between">
    <h3 class="text-xl">{title}</h3>
    <span class={`font-mono text-xs uppercase tracking-wider ${statusClass}`}>
      <span aria-hidden="true">●</span> {statusLabel}
    </span>
  </div>
  <p class="text-muted m-0">{description}</p>
  {link && (
    <a href={link} class="font-mono text-sm text-accent mt-auto no-underline group-hover:underline"
       target={link.startsWith("http") ? "_blank" : undefined}
       rel={link.startsWith("http") ? "noopener noreferrer" : undefined}>
      {linkText ?? "Learn more →"}
    </a>
  )}
</article>
```

- [ ] **Step 2: Write the Home page (hero is a static placeholder until Task 7 swaps in the island)**

`src/pages/index.astro`:
```astro
---
import Layout from "../layouts/Layout.astro";
import ProductCard from "../components/ProductCard.astro";
import { site } from "../config/site";

const products = [
  {
    title: "Tenet",
    description: "We build and rent lead-generation websites to local service businesses, and deliver the calls and web leads they generate.",
    status: "live" as const,
  },
  {
    title: "Changesets for VS Code",
    description: "Manage changesets directly from VS Code and Cursor. Manual, AI-powered, or empty changesets — one command.",
    status: "live" as const,
    link: "https://open-vsx.org/extension/GreatSoftwareLLC/vscode-changesets",
    linkText: "View on Open VSX →",
  },
  {
    title: "Meld",
    description: "A couples intimacy app. Two people. One toggle. Zero rejection.",
    status: "coming-soon" as const,
  },
];

const steps = [
  { k: "build", t: "Build", d: "Products, client work, prototypes, research — whatever the problem actually needs." },
  { k: "ship", t: "Ship", d: "Real software in production, not slideware. We sweat the parts users feel." },
  { k: "support", t: "Support", d: "We stand behind what we make and keep improving it." },
];
---
<Layout>
  <!-- Hero (static placeholder; AlpenglowHero replaces this in Task 7) -->
  <section class="mx-auto max-w-6xl px-6 pt-24 pb-28">
    <p class="font-mono text-sm text-accent mb-4">An independent software studio</p>
    <h1 class="text-5xl md:text-7xl tracking-tight max-w-3xl">{site.tagline}</h1>
    <p class="mt-6 max-w-xl text-lg text-muted">{site.oneLiner}</p>
    <div class="mt-8 flex gap-4">
      <a href="#products"
         class="rounded-lg bg-accent px-5 py-3 font-mono text-sm text-accent-ink no-underline hover:no-underline hover:opacity-90 transition-opacity duration-200">
        See our work
      </a>
      <a href="/about"
         class="rounded-lg border border-line px-5 py-3 font-mono text-sm text-ink no-underline hover:no-underline hover:border-accent transition-colors duration-200">
        About the studio
      </a>
    </div>
  </section>

  <!-- Products -->
  <section id="products" class="mx-auto max-w-6xl px-6 py-12 scroll-mt-20">
    <h2 class="text-3xl mb-8">Products &amp; ventures</h2>
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => <ProductCard {...p} />)}
    </div>
  </section>

  <!-- How we work -->
  <section class="mx-auto max-w-6xl px-6 py-16">
    <h2 class="text-3xl mb-8">How we work</h2>
    <div class="grid gap-6 sm:grid-cols-3">
      {steps.map((s, i) => (
        <div class="flex flex-col gap-2">
          <span class="font-mono text-sm text-accent">0{i + 1} · {s.k}</span>
          <h3 class="text-xl">{s.t}</h3>
          <p class="text-muted m-0">{s.d}</p>
        </div>
      ))}
    </div>
    <a href="/about" class="inline-block mt-8 font-mono text-sm text-accent">Read more about the studio →</a>
  </section>
</Layout>
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: succeeds; `dist/index.html` contains "Tenet", "Changesets for VS Code", "Meld", the Open VSX link, and the tagline.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProductCard.astro src/pages/index.astro
git commit -m "feat: build home page with hero, products grid, and how-we-work"
```

---

### Task 7: ArrowJS "alpenglow" island in the hero

**Files:**
- Create: `src/components/AlpenglowHero.astro`
- Modify: `src/pages/index.astro` (replace static hero with the island)

> **Verify the API first:** confirm `@arrow-js/core` exports `reactive` and `html` and that reactive bindings are expressed as functions (`${() => state.x}`), per the package README. Adjust the script below if the installed version differs.

- [ ] **Step 1: Write `src/components/AlpenglowHero.astro`**

The slider drives the `--tod` CSS variable on `:root`; the fixed Mountains' alpenglow overlay and the hero sky react to it. Renders server-side at a default "golden hour" state; fully functional with JS off.

```astro
---
import { site } from "../config/site";
---
<section
  class="relative mx-auto max-w-6xl px-6 pt-24 pb-28"
  style="background: linear-gradient(180deg, color-mix(in srgb, var(--color-sky) calc(var(--tod,0.6)*100%), var(--color-paper)) 0%, var(--color-paper) 70%);">
  <p class="font-mono text-sm text-accent mb-4">An independent software studio</p>
  <h1 class="text-5xl md:text-7xl tracking-tight max-w-3xl">{site.tagline}</h1>
  <p class="mt-6 max-w-xl text-lg text-muted">{site.oneLiner}</p>

  <div class="mt-8 flex flex-wrap gap-4">
    <a href="#products"
       class="rounded-lg bg-accent px-5 py-3 font-mono text-sm text-accent-ink no-underline hover:no-underline hover:opacity-90 transition-opacity duration-200">
      See our work
    </a>
    <a href="/about"
       class="rounded-lg border border-line px-5 py-3 font-mono text-sm text-ink no-underline hover:no-underline hover:border-accent transition-colors duration-200">
      About the studio
    </a>
  </div>

  <!-- ArrowJS island: time-of-day / alpenglow control (garnish) -->
  <div data-alpenglow class="mt-12 flex items-center gap-3 font-mono text-xs text-muted">
    <label for="tod">alpenglow</label>
    <input id="tod" type="range" min="0" max="100" value="60"
           class="accent-[var(--color-accent)] w-40 cursor-pointer" aria-label="Time of day" />
    <span data-tod-label>golden hour</span>
  </div>
</section>

<script>
  import { reactive, watch } from "@arrow-js/core";

  const root = document.querySelector<HTMLElement>("[data-alpenglow]");
  const input = root?.querySelector<HTMLInputElement>("#tod");
  const label = root?.querySelector<HTMLElement>("[data-tod-label]");

  if (root && input && label) {
    const state = reactive({ t: 60 });

    watch(() => {
      const t = state.t / 100; // 0 dawn → 1 dusk
      document.documentElement.style.setProperty("--tod", t.toFixed(3));
      label.textContent = t < 0.33 ? "dawn" : t < 0.7 ? "golden hour" : "dusk";
    });

    input.addEventListener("input", () => { state.t = Number(input.value); });
  }
</script>
```

- [ ] **Step 2: Set the default `--tod` so the static (no-JS) render still looks intentional**

Add to `src/styles/global.css` `@layer base` `html` rule:
```css
  html { --tod: 0.6; }
```

- [ ] **Step 3: Use the island on the Home page**

In `src/pages/index.astro`: remove the static `<section>...</section>` hero block and replace with:
```astro
---
import AlpenglowHero from "../components/AlpenglowHero.astro";
// (keep the existing ProductCard, site, products, steps imports/consts)
---
<Layout>
  <AlpenglowHero />
  <!-- products + how-we-work sections unchanged -->
```

- [ ] **Step 4: Verify build and graceful degradation**

Run: `npm run build`
Expected: succeeds; `dist/index.html` contains `data-alpenglow` and the tagline, and the hero text renders without requiring the script. Confirm the script bundles (an Astro asset `<script type="module">` is emitted).

- [ ] **Step 5: Manual smoke (optional but recommended)**

Run: `npm run preview` and load the URL; drag the alpenglow slider → the mountain ridges should warm toward terracotta at "dusk". With JS disabled the hero still renders fully.

- [ ] **Step 6: Commit**

```bash
git add src/components/AlpenglowHero.astro src/pages/index.astro src/styles/global.css
git commit -m "feat: add ArrowJS alpenglow time-of-day island to hero"
```

---

### Task 8: About / How we work page

**Files:**
- Create: `src/pages/about.astro`

- [ ] **Step 1: Write `src/pages/about.astro`**

```astro
---
import Layout from "../layouts/Layout.astro";
import { site } from "../config/site";
---
<Layout title="About" description="How Great Software works — an independent software studio across products, client work, and research.">
  <section class="mx-auto max-w-3xl px-6 pt-24 pb-16">
    <p class="font-mono text-sm text-accent mb-4">About the studio</p>
    <h1 class="text-4xl md:text-5xl tracking-tight">A whole range of software.</h1>
    <div class="mt-8 flex flex-col gap-5 text-lg text-muted">
      <p>{site.name} is an independent software studio. We take on a deliberately broad range of work — our own products, client and consulting builds, and research — and hold all of it to one standard: software that actually works in the real world.</p>
      <p>Some of what we build, we run ourselves: live lead-generation systems, developer tooling, products with real users. Some we design and hand off. Some never ships at all — it's research that sharpens the next thing we build.</p>
      <p>The common thread isn't a single product or a single market. It's range, and the craft to do each kind of work well.</p>
    </div>

    <h2 class="text-2xl mt-16 mb-6">How we work</h2>
    <ol class="flex flex-col gap-6 list-none m-0 p-0">
      <li><span class="font-mono text-sm text-accent">01 · build</span><p class="text-muted mt-1 mb-0">Start from the actual problem. Pick the smallest thing that proves the idea, then make it real.</p></li>
      <li><span class="font-mono text-sm text-accent">02 · ship</span><p class="text-muted mt-1 mb-0">Put it in front of real users and real load. Polish the parts people feel.</p></li>
      <li><span class="font-mono text-sm text-accent">03 · support</span><p class="text-muted mt-1 mb-0">Stand behind it. Keep measuring, keep improving, or hand it off cleanly.</p></li>
    </ol>

    <p class="mt-12 font-mono text-sm">
      <a href="/contact" class="text-accent">Work with us →</a>
    </p>
  </section>
</Layout>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: succeeds; `dist/about/index.html` exists and contains "How we work".

- [ ] **Step 3: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: add About / how-we-work page"
```

---

### Task 9: LegalPage component + Privacy Policy (with SMS section)

**Files:**
- Create: `src/components/LegalPage.astro`
- Create: `src/pages/privacy.astro`

- [ ] **Step 1: Write `src/components/LegalPage.astro`**

A constrained prose wrapper with readable measure and consistent legal styling.

```astro
---
interface Props { title: string; updated: string; }
const { title, updated } = Astro.props;
---
<section class="mx-auto max-w-3xl px-6 pt-24 pb-16">
  <h1 class="text-4xl tracking-tight">{title}</h1>
  <p class="font-mono text-sm text-muted mt-2">Last updated: {updated}</p>
  <div class="legal mt-8 flex flex-col gap-5 text-muted">
    <slot />
  </div>
</section>

<style is:global>
  .legal h2 { font-size: 1.5rem; margin-top: 1.5rem; color: var(--color-ink); }
  .legal h3 { font-size: 1.15rem; margin-top: 1rem; color: var(--color-ink); }
  .legal ul { padding-left: 1.25rem; list-style: disc; display: flex; flex-direction: column; gap: 0.4rem; }
  .legal p, .legal li { line-height: 1.7; }
  .legal strong { color: var(--color-ink); }
</style>
```

- [ ] **Step 2: Write `src/pages/privacy.astro` — include the SMS section verbatim from the spec/REBUILD-PLAN**

```astro
---
import Layout from "../layouts/Layout.astro";
import LegalPage from "../components/LegalPage.astro";
import { site } from "../config/site";
---
<Layout title="Privacy Policy" description="Great Software privacy policy, including SMS/text messaging practices.">
  <LegalPage title="Privacy Policy" updated="June 16, 2026">
    <p>{site.name} ("we", "us") operates {site.domain} and the software products and services described on it. This policy explains what information we collect, how we use it, and the choices you have.</p>

    <h2>Information we collect</h2>
    <p>We collect information you provide directly — such as your name, email address, phone number, and any details you include when you contact us or engage our services — and basic technical data (such as IP address and browser type) collected automatically when you visit our site.</p>

    <h2>How we use information</h2>
    <p>We use the information to provide and operate our services, respond to inquiries, deliver the leads and notifications our clients have requested, maintain security, and comply with legal obligations. We do not sell personal information.</p>

    <h2>SMS / Text Messaging</h2>
    <p>We send SMS notifications to our business clients about leads generated on the websites we operate for them. By providing a mobile number and agreeing to our service terms, a client consents to receive these messages.</p>
    <ul>
      <li>We <strong>do not share or sell</strong> mobile numbers or SMS opt-in data to third parties or affiliates for marketing. This information is shared only with our SMS provider (Telnyx) solely to deliver the messages the client has requested.</li>
      <li>Message frequency varies based on lead activity.</li>
      <li>Message and data rates may apply.</li>
      <li>Reply <strong>STOP</strong> to unsubscribe at any time; reply <strong>HELP</strong> for help, or contact us at <a href={site.mailHref}>{site.email}</a> / <a href={site.phoneHref}>{site.phone}</a>.</li>
    </ul>

    <h2>Data sharing</h2>
    <p>We share information only with service providers who help us operate (such as hosting and our SMS provider), and only as needed to deliver our services or as required by law.</p>

    <h2>Data retention &amp; security</h2>
    <p>We retain information for as long as needed to provide our services and meet legal requirements, and we use reasonable safeguards to protect it.</p>

    <h2>Your choices</h2>
    <p>You may request access to or deletion of your personal information, and you may opt out of SMS at any time by replying STOP. Contact us at <a href={site.mailHref}>{site.email}</a>.</p>

    <h2>Contact</h2>
    <p>Questions about this policy? Email <a href={site.mailHref}>{site.email}</a> or call <a href={site.phoneHref}>{site.phone}</a>. See also our <a href="/terms">Terms &amp; Messaging Terms</a>.</p>
  </LegalPage>
</Layout>
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: succeeds; `dist/privacy/index.html` exists and contains the exact strings "do not share or sell", "Reply", "STOP", "HELP", "Telnyx", and the stub phone "(555) 555-5555".

- [ ] **Step 4: Commit**

```bash
git add src/components/LegalPage.astro src/pages/privacy.astro
git commit -m "feat: add Privacy Policy with 10DLC SMS section"
```

---

### Task 10: Terms / Messaging Terms page

**Files:**
- Create: `src/pages/terms.astro`

- [ ] **Step 1: Write `src/pages/terms.astro` — include the Messaging Terms verbatim from the spec/REBUILD-PLAN**

```astro
---
import Layout from "../layouts/Layout.astro";
import LegalPage from "../components/LegalPage.astro";
import { site } from "../config/site";
---
<Layout title="Terms & Messaging Terms" description="Great Software service terms and SMS messaging terms.">
  <LegalPage title="Terms & Messaging Terms" updated="June 16, 2026">
    <p>These terms govern your use of {site.domain} and the services {site.name} provides. By engaging our services, you agree to these terms.</p>

    <h2>Services</h2>
    <p>{site.name} provides software products, client and consulting builds, and related services. Specific deliverables, fees, and timelines are set out in the agreement we sign with each client.</p>

    <h2>Acceptable use</h2>
    <p>You agree not to misuse our services, interfere with their operation, or use them for unlawful purposes.</p>

    <h2>SMS Program — Messaging Terms</h2>
    <p>{site.name} sends transactional lead-notification texts to business clients who have opted in by providing their mobile number and agreeing to these terms when they engage our services. Messages notify the client of new leads (phone calls and website form submissions) on the sites we run for them. Frequency varies with lead activity; message &amp; data rates may apply. Reply <strong>STOP</strong> to opt out, <strong>HELP</strong> for help. We honor opt-outs immediately and do not sell or share opt-in data for marketing (see our <a href="/privacy">Privacy Policy</a>).</p>
    <p>For help with messaging, contact us at <a href={site.mailHref}>{site.email}</a> or <a href={site.phoneHref}>{site.phone}</a>.</p>

    <h2>Disclaimers &amp; liability</h2>
    <p>Our services are provided "as is" to the extent permitted by law. We are not liable for indirect or consequential damages arising from use of the services.</p>

    <h2>Changes</h2>
    <p>We may update these terms; material changes will be reflected by the "last updated" date above.</p>

    <h2>Contact</h2>
    <p>Questions? Email <a href={site.mailHref}>{site.email}</a> or call <a href={site.phoneHref}>{site.phone}</a>.</p>
  </LegalPage>
</Layout>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: succeeds; `dist/terms/index.html` exists and contains "SMS Program", "STOP", "HELP", "message & data rates may apply" (rendered as "message &amp; data rates" → "message & data rates" in HTML text), and "do not sell or share opt-in data".

- [ ] **Step 3: Commit**

```bash
git add src/pages/terms.astro
git commit -m "feat: add Terms & Messaging Terms page"
```

---

### Task 11: Contact page

**Files:**
- Create: `src/pages/contact.astro`

- [ ] **Step 1: Write `src/pages/contact.astro`**

```astro
---
import Layout from "../layouts/Layout.astro";
import { site } from "../config/site";
---
<Layout title="Contact" description="Get in touch with Great Software.">
  <section class="mx-auto max-w-3xl px-6 pt-24 pb-16">
    <p class="font-mono text-sm text-accent mb-4">Contact</p>
    <h1 class="text-4xl md:text-5xl tracking-tight">Let's talk.</h1>
    <p class="mt-6 text-lg text-muted max-w-xl">Have a product idea, a project, or a problem worth solving? Reach out directly — we read everything.</p>

    <dl class="mt-10 flex flex-col gap-6">
      <div>
        <dt class="font-mono text-sm text-muted">Email</dt>
        <dd class="m-0 text-xl"><a href={site.mailHref}>{site.email}</a></dd>
      </div>
      <div>
        <dt class="font-mono text-sm text-muted">Phone</dt>
        <dd class="m-0 text-xl"><a href={site.phoneHref}>{site.phone}</a></dd>
      </div>
    </dl>
  </section>
</Layout>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: succeeds; `dist/contact/index.html` contains the email and the stub phone, with `mailto:` and `tel:+15555555555` hrefs.

- [ ] **Step 3: Commit**

```bash
git add src/pages/contact.astro
git commit -m "feat: add Contact page"
```

---

### Task 12: Verification harness, 404, and final build check

**Files:**
- Create: `scripts/check-build.mjs`, `scripts/test_runner.sh`
- Verify: `public/404.html`, `public/CNAME` present and correct

- [ ] **Step 1: Confirm `public/404.html` and `public/CNAME` survived the teardown**

Run: `cat public/CNAME && test -f public/404.html && echo "404 ok"`
Expected: prints `greatsoftware.dev` and `404 ok`. If `public/404.html` is missing, create a minimal one:
```html
<!doctype html><meta charset="utf-8"><title>Not found — Great Software</title>
<meta http-equiv="refresh" content="0; url=/"><a href="/">Great Software</a>
```

- [ ] **Step 2: Write `scripts/check-build.mjs` (asserts compliance-critical invariants)**

```js
import { readFileSync, existsSync } from "node:fs";

const failures = [];
function check(name, cond) {
  if (!cond) failures.push(name);
}
function html(path) {
  return existsSync(path) ? readFileSync(path, "utf8") : "";
}

const pages = {
  home: html("dist/index.html"),
  about: html("dist/about/index.html"),
  privacy: html("dist/privacy/index.html"),
  terms: html("dist/terms/index.html"),
  contact: html("dist/contact/index.html"),
};

// pages exist
for (const [name, content] of Object.entries(pages)) {
  check(`page:${name} built`, content.length > 0);
}

// home content
check("home: tagline", pages.home.includes("A whole range of software"));
check("home: Tenet", pages.home.includes("Tenet"));
check("home: Changesets", pages.home.includes("Changesets for VS Code"));
check("home: Meld", pages.home.includes("Meld"));
check("home: alpenglow island", pages.home.includes("data-alpenglow"));

// 10DLC compliance — Privacy
check("privacy: no-share clause", pages.privacy.includes("do not share or sell"));
check("privacy: STOP", pages.privacy.includes("STOP"));
check("privacy: HELP", pages.privacy.includes("HELP"));
check("privacy: Telnyx", pages.privacy.includes("Telnyx"));

// 10DLC compliance — Terms
check("terms: SMS Program", pages.terms.includes("SMS Program"));
check("terms: opt-out clause", pages.terms.includes("do not sell or share opt-in data"));

// contact config flows through (stub phone + email)
check("privacy: contact phone", pages.privacy.includes("(555) 555-5555"));
check("contact: email", pages.contact.includes("hello@greatsoftware.dev"));
check("contact: tel href", pages.contact.includes("tel:+15555555555"));

// no leftover React SPA artifacts
check("no old main.tsx", !existsSync("src/main.tsx"));
check("no index.html at root src", !existsSync("index.html"));

const total = 20;
const passed = total - failures.length;
const summary = {
  timestamp: new Date().toISOString(),
  mode: "full",
  total,
  passed,
  failed: failures.length,
  skipped: 0,
  failures: failures.map((f) => ({ file: "dist", line: 0, test_name: f, error: "assertion failed" })),
};
import("node:fs").then(({ mkdirSync, writeFileSync }) => {
  mkdirSync("test_logs", { recursive: true });
  writeFileSync("test_logs/latest_summary.json", JSON.stringify(summary, null, 2));
});

if (failures.length) {
  console.error("FAILED:\n" + failures.map((f) => "  - " + f).join("\n"));
  process.exit(1);
}
console.log(`OK — ${passed}/${total} build assertions passed`);
```

(Update the `total = 20` constant if you add/remove checks so the summary count stays accurate.)

- [ ] **Step 3: Write `scripts/test_runner.sh` (the standard project test interface)**

```bash
#!/usr/bin/env bash
set -euo pipefail
# Static site: --smoke / --fast / full all run the same build + assertions (fast enough).
echo "Building site..."
npm run build >/dev/null
echo "Running build assertions..."
node scripts/check-build.mjs
```

- [ ] **Step 4: Make it executable and run the full check**

Run: `chmod +x scripts/test_runner.sh && npm test`
Expected: build succeeds, prints "OK — 20/20 build assertions passed", and writes `test_logs/latest_summary.json` with `"failed": 0`.

- [ ] **Step 5: Run the type/diagnostics check**

Run: `npm run check`
Expected: `astro check` reports 0 errors (warnings acceptable). Fix any errors before committing.

- [ ] **Step 6: Add `test_logs/` to `.gitignore`**

Append to `.gitignore`:
```
test_logs/
```

- [ ] **Step 7: Commit**

```bash
git add scripts/check-build.mjs scripts/test_runner.sh public/404.html .gitignore
git commit -m "test: add build-assertion harness and standard test runner"
```

---

### Task 13: Responsive + accessibility pass and final review

**Files:** any component needing fixes surfaced by the pass.

- [ ] **Step 1: Build and preview**

Run: `npm run build && npm run preview`

- [ ] **Step 2: Check breakpoints**

In the browser, verify at 375px, 768px, 1024px, 1440px:
- No horizontal scroll.
- Mountains shrink to ~120px on mobile and never cover hero/footer text.
- Nav links remain tappable (≥44px height target) and readable.
- Product grid reflows 1→2→3 columns.

- [ ] **Step 3: Accessibility spot-check**

- Tab through: nav, hero CTAs, alpenglow slider, product links, footer — focus rings visible (the `:focus-visible` outline).
- Confirm the alpenglow `<input>` has `aria-label` and the slider is operable by keyboard.
- Confirm body/muted text on paper meets 4.5:1 (muted `#566173` on `#FAF9F6` ≈ 6.4:1 ✓; accent `#D9663E` on paper ≈ 3.4:1 — only used for large text/UI and links with underline-on-hover; if used for small body text anywhere, darken it).
- Confirm `prefers-reduced-motion` disables smooth scroll/transitions (toggle OS setting or DevTools emulation).

- [ ] **Step 4: Fix anything the pass surfaced, then re-run `npm test`**

Expected: still 20/20.

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix: responsive and accessibility refinements"
```

- [ ] **Step 6: Push and open PR**

```bash
git push -u origin astro-rebuild
```
Then open a PR from `astro-rebuild` → `main` describing the rebuild. After merge, the existing `.github/workflows/deploy.yml` builds and deploys to GitHub Pages automatically.

- [ ] **Step 7: After deploy — capture the legal URLs**

Verify `https://greatsoftware.dev/privacy` and `https://greatsoftware.dev/terms` resolve and show the SMS sections. Report both URLs back to the operator for the Telnyx 10DLC campaign form.

---

## Self-review notes

- **Spec coverage:** positioning/tagline (Tasks 3, 6), design tokens (Task 2), fixed mountains (Task 4), three-peak logo (Task 4), five pages (Tasks 6, 8–11), product grid Tenet-first (Task 6), ArrowJS island (Task 7), site config build-time vars (Task 3), verbatim SMS legal sections (Tasks 9–10), unchanged deploy + CNAME + 404 (Tasks 1, 12), SEO meta (Task 5), success criteria → assertion harness (Task 12), responsive/a11y (Task 13). All covered.
- **Type consistency:** `site` config shape (Task 3) is consumed identically everywhere; `ProductCard` `Props` (Task 6) match the `products` objects; `status` union `"live" | "coming-soon"` consistent.
- **Known follow-ups (out of scope, fine to defer):** real Telnyx phone number (find-and-replace via env/config), dedicated Tenet product page, OG image asset.
