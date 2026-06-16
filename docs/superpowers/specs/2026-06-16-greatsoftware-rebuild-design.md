# greatsoftware.dev Rebuild — Design Spec

**Date:** 2026-06-16
**Status:** Approved (design direction), ready for implementation planning
**Supersedes:** the current React 19 + TanStack Router SPA scaffold (to be removed)
**Source plan:** `REBUILD-PLAN.md` (paste-ready legal/SMS content lives there)

---

## 1. Vision & positioning

Great Software is an **independent software studio** with a deliberately **broad** practice: its
own products, client/consulting builds (some built-and-handed-off), and research. The site
presents GS as the parent studio and showcases work via a product/venture grid — Tenet is the
first card, with room for more. Positioning copy stays broad and product-agnostic on Home/About;
product specifics live on the cards.

A second, hard requirement: this rebuild ships a real **Privacy Policy** and **Terms / Messaging
Terms** page. These unblock the Tenet SMS lead-delivery feature's **10DLC carrier approval**
(Telnyx). Their published URLs go into the 10DLC campaign form. These pages are **required**.

**Tagline (hero headline):** "A whole range of software."
**One-liner (hero sub):** "An independent software studio — our own products, client work, and
research. Whatever the problem needs."
The pun is intentional and load-bearing: the *mountain range* in the art and the *range of work*
are the same idea. Wording may be tweaked later; the concept is fixed.

---

## 2. Design system — "Studio at altitude"

Clean, light, premium studio aesthetic with a Utah / Wasatch alpine motif. Warm paper background,
granite-ink text, **layered alpine ridgelines fixed to the bottom edge of the viewport**; content
lives in the "sky" above. Atmospheric perspective: far ridges pale/hazy, near ridges deep.

### Palette

| Token | Value | Use |
|---|---|---|
| `paper` | `#FAF9F6` | page background / sky top |
| `sky` | `#EAF1F6` | subtle hero sky gradient (fades into paper) |
| `ink` | `#1A2230` | headings, high-contrast text |
| `muted` | `#566173` | body / secondary text (>= 4.5:1 on paper) |
| `line` | `#E3E2DC` | hairline borders |
| `ridge-1` | `#C7D3DE` | farthest mountain layer (palest) |
| `ridge-2` | `#9FB2C4` | mid-far layer |
| `ridge-3` | `#6B8299` | mid-near layer |
| `ridge-4` | `#3E5468` | nearest layer (deepest) |
| `accent` | `#D9663E` | alpenglow terracotta — CTAs, links, "live" status, hover |
| `accent-ink` | `#FFFFFF` | text on accent fills |

Accent is confirmed terracotta. (Alternatives considered and declined: pine `#2F7D5B`, alpine blue
`#2B6CB0`.) All text/background pairings must meet WCAG AA (4.5:1 normal text). Verify accent on
paper for link text; darken accent for small text if it fails.

### Typography

- **Headings:** Outfit (geometric, distinctive).
- **Body:** Work Sans (humanist, readable; >= 16px on mobile, line-height 1.5–1.75).
- **Technical labels / status chips / small meta:** JetBrains Mono — this mono touch is what keeps
  the site reading as a *software* studio rather than an outdoor brand. Use sparingly.
- Self-host or Google Fonts with `display=swap`; preconnect; reserve space to avoid layout shift.

### Feel & motion

Generous whitespace, hairline-bordered cards, restraint. Transitions 150–300ms on color/opacity
(never layout-shifting scale on hover). `prefers-reduced-motion` fully respected (no parallax, no
autoplay). Z-index scale: ridges behind content (e.g. 0), content 10, sticky nav 30, island
controls within hero local stacking.

---

## 3. Signature element — the fixed mountains

A layered SVG ridgeline band **fixed to the bottom edge** of the viewport (3–4 overlapping ranges,
`ridge-1`..`ridge-4`, far/pale → near/deep). Content scrolls in the sky above it.

- Implemented as a fixed-position decorative SVG behind content (low z-index, `aria-hidden`,
  `pointer-events: none`).
- Desktop height ~28–34vh; **mobile shrinks to ~120px** so it never covers content. Content
  containers carry enough bottom padding that text never collides with the deepest ridge without a
  backing surface.
- Footer is designed to read cleanly over `ridge-4` (sufficient contrast, or a subtle scrim).
- With `prefers-reduced-motion: reduce` → perfectly still. Otherwise a *very* subtle
  pointer/scroll parallax between layers (small translate, transform-only).

**Logo mark:** a new clean geometric **three-peak** line mark (a quiet nod to the prior trident's
three points, reborn as a mountain range). Single-color, scales to favicon. Pairs with an Outfit
wordmark. (Fallback if disliked: wordmark only.)

---

## 4. Information architecture

| Route | Page | Purpose |
|---|---|---|
| `/` | Home | Hero (tagline + island) + Products grid + "How we work" teaser + footer |
| `/about` | About / How we work | Studio story; broad practice (products, client work, research) |
| `/privacy` | Privacy Policy | Full policy **including the SMS / Text Messaging section** (10DLC) |
| `/terms` | Terms / Messaging Terms | Service terms + the SMS Program / Messaging Terms section |
| `/contact` | Contact | Business email + phone (from config), simple and direct |

Sticky top nav: three-peak mark + "Great Software" wordmark (mono or Outfit) on the left; links
(Products/About/Contact) on the right. Footer repeats nav + legal links (Privacy, Terms) + email.
Nav has proper spacing from edges; content offset so nothing hides behind it.

---

## 5. Home page layout

1. **Hero** — Outfit headline ("A whole range of software."), one-liner sub, primary terracotta
   CTA ("See our work" → smooth-scroll to Products) + ghost "About" link. Sky gradient top; the
   fixed mountains anchor the view. Hosts the **ArrowJS island** (§7).
2. **Products grid** — responsive grid of `ProductCard`s, hairline-bordered, terracotta-glow on
   hover, each with a mono status chip. Built to hold more cards as ventures are added.
   - **Tenet** — `live` — first card. "We build and rent lead-generation websites to local service
     businesses, and deliver the calls and web leads they generate."
   - **Changesets for VS Code** — `live` — links to Open VSX
     (`https://open-vsx.org/extension/GreatSoftwareLLC/vscode-changesets`).
   - **Meld** — `coming soon` — "A couples intimacy app. Two people. One toggle. Zero rejection."
3. **"How we work" teaser** — short strip framing the broad practice (e.g. build → ship →
   support/operate, plus client work & research), linking to `/about`.
4. **Footer.**

---

## 6. Components (Astro)

- `Layout.astro` — base shell: `<head>` meta/OG/favicon, fonts, sticky `Nav`, `<slot/>`, fixed
  `Mountains`, `Footer`. All pages use it.
- `Nav.astro`, `Footer.astro`, `Logo.astro` (three-peak mark), `Mountains.astro` (fixed SVG band).
- `Hero.astro` (Home), `ProductCard.astro` (props: title, description, status `live|coming-soon`,
  optional link + linkText), `LegalPage.astro` (typographic prose wrapper for Privacy/Terms).
- `AlpenglowHero` island — see §7.

Each component has one clear purpose and reads from `site.config` for any contact/brand data.

---

## 7. ArrowJS island — "alpenglow slider"

A small **time-of-day control** in the hero. A slider (dawn → midday → dusk) drives, reactively via
ArrowJS, the hero **sky gradient** and **mountain layer colors**; at dusk the peaks catch terracotta
alpenglow and the accent glows.

- **Garnish, not foundation.** The page is fully static Astro. The hero renders at a default
  "golden hour" state server-side and is fully functional with JS disabled. ArrowJS hydrates only
  this one control via a client `<script>` (Astro island). ArrowJS drives *only* presentation
  (CSS custom properties / inline gradient values), never routing or content.
- Respects `prefers-reduced-motion` (no autoplay drift; manual slider still allowed).
- ArrowJS added as a dependency; imported only in the island script.

---

## 8. Centralized contact config (build-time variable)

Single source of truth: **`src/config/site.ts`**.

```ts
export const site = {
  name: "Great Software",
  domain: "greatsoftware.dev",
  email: import.meta.env.PUBLIC_GS_EMAIL ?? "hello@greatsoftware.dev",
  phone: import.meta.env.PUBLIC_GS_PHONE ?? "(555) 555-5555",
} as const;
// derived: mailHref = `mailto:${site.email}`, phoneHref = `tel:+1${digits(site.phone)}`
```

- Every contact/brand reference imports from here: Contact page, Footer, the SMS **HELP** line in
  Privacy & Terms, and page metadata. **Updating phone/email is a one-line change in one file.**
- `import.meta.env.PUBLIC_* ?? default` makes them true **build-time variables**: overridable via a
  local `.env` or a **GitHub Actions repo variable** without code changes, while committed defaults
  keep the GitHub Pages build green with no required secrets.
- Phone is stubbed `(555) 555-5555` until the real Telnyx number arrives.

---

## 9. Legal content (10DLC-critical)

Use the **exact paste-ready copy from `REBUILD-PLAN.md`**:

- **Privacy Policy** must include the "SMS / Text Messaging" section verbatim (no-share/no-sell
  clause, Telnyx as provider, frequency varies, msg & data rates, STOP/HELP). The `[business
  email]` / `[business phone]` slots are filled from `site.config`.
- **Terms / Messaging Terms** must include the "SMS Program" / Messaging Terms section verbatim.
- Both pages otherwise contain a reasonable standard policy/terms body around the SMS section.

After deploy, capture the canonical **Privacy** (`https://greatsoftware.dev/privacy`) and **Terms**
(`https://greatsoftware.dev/terms`) URLs and report them back — they go in the Telnyx 10DLC form.

---

## 10. Tech, build & deploy

- **Astro + Tailwind.** Tailwind theme tokens map to the palette/type in §2.
- Output to **`dist`** (Astro default). The existing `.github/workflows/deploy.yml`
  (`npm ci && npm run build`, uploads `dist`) needs **no changes**.
- `astro.config` `site: "https://greatsoftware.dev"`, `base: "/"` (custom domain, apex).
- Carry over `public/CNAME` (`greatsoftware.dev`) and a `public/404.html`.
- Per-page SEO: title, description, canonical, OpenGraph/Twitter, favicon (three-peak mark).
- Remove the old React/TanStack/Vite SPA (`src/main.tsx`, `src/routes/**`, `*.module.css`,
  `index.html`, `vite.config.ts`, React deps) as part of the swap.

---

## 11. Success criteria

- All five pages render and are linked from nav/footer.
- Privacy `/privacy` and Terms `/terms` are live with the exact SMS sections; URLs captured.
- Contact info comes solely from `src/config/site.ts`; overridable at build time.
- Fixed mountains render across breakpoints (375 / 768 / 1024 / 1440) without covering content or
  causing horizontal scroll.
- ArrowJS alpenglow slider works and degrades gracefully (static, functional with JS off).
- `npm run build` produces `dist`; deploys via the unchanged workflow; `greatsoftware.dev` resolves.
- Accessibility: 4.5:1 contrast, visible focus states, labeled controls/inputs, alt text, keyboard
  nav, `prefers-reduced-motion` honored. No emojis as icons (SVG only).

---

## 12. Out of scope

- Telnyx number purchase, call/SMS forwarding, the 10DLC campaign submission (operator tasks).
- A dedicated per-product page for Tenet (cards link out / describe inline for now).
- CMS / blog / analytics.
- Dark mode (light theme only by design).
