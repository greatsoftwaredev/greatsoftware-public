# greatsoftware.dev — Rebuild Plan

**Date:** 2026-06-16
**For:** a fresh build session (run from this repo). This is the *what* + *content*; execute it here.
**Why now:** Great Software needs a real company site — broader than the Tenet project — and the
**Tenet lead-delivery feature needs a privacy policy + messaging terms** for 10DLC SMS approval. This
rebuild delivers both.

## Vision

**Great Software is a software studio / company — Tenet is one product, not the whole story.** The site
should present GS as the parent and showcase products/ventures (the existing `ProductCard` pattern is
exactly right). Tenet (rank-and-rent local lead-gen) is the first product card; leave the layout ready
for more. Keep the positioning broad and product-agnostic on the home/about; the Tenet specifics live on
its card / a product page.

> ⚠️ Operator to supply: the GS tagline + one-liner, and any other ventures/products to list beyond
> Tenet. Until then, use a flexible "studio that builds and runs software products" framing.

## Tech

- **Astro + Tailwind**, deployed to **GitHub Pages** (unchanged — the existing `.github/workflows/deploy.yml`
  runs `npm ci && npm run build` and uploads `dist`; Astro outputs to `dist`, so the workflow needs no
  changes). Custom domain `greatsoftware.dev` is already wired (CNAME in `public/`).
- **Design via the `ui-ux-pro-max` skill** — run it first to generate the design system (style, palette,
  typography), then build to it. Aim for a clean, modern studio look.
- **ArrowJS island for fun** — Astro supports islands, so build the site in Astro and drop ONE
  ArrowJS-powered interactive component (e.g. an animated hero, a playful widget) via a client `<script>`
  on an otherwise-static page. ArrowJS is the *garnish*, not the foundation — don't route/content with it.
- **Replaces** the current React 19 + TanStack Router SPA scaffold. Carry forward the content intent
  (Hero, ProductCard grid, Legal pages, Terms) — just rebuilt in Astro. SEO is much better static.

## Pages

| Page | Purpose |
|---|---|
| **Home** | What Great Software is (studio/company). Hero + a **Products** grid (ProductCard; Tenet first). |
| **About / How we work** | The studio story; how GS builds + runs products. |
| **Products** (or sections on Home) | One card per product. Tenet: "We build and rent lead-generation websites to local service businesses, and deliver the calls + web leads they generate." |
| **Privacy Policy** | Full policy **with the SMS section below** (10DLC requirement). |
| **Terms / Messaging Terms** | Service terms + the SMS consent/opt-out terms (the campaign's optional T&C URL). |
| **Contact** | Business email + the new Telnyx business phone (below). |

Publish, then **capture the Privacy + Terms URLs** — they go in the 10DLC campaign form.

## Paste-ready content

### Privacy Policy — SMS / Text Messaging section (the 10DLC must-have)

> **SMS / Text Messaging.** We send SMS notifications to our business clients about leads generated on
> the websites we operate for them. By providing a mobile number and agreeing to our service terms, a
> client consents to receive these messages.
> - We **do not share or sell** mobile numbers or SMS opt-in data to third parties or affiliates for
>   marketing. This information is shared only with our SMS provider (Telnyx) solely to deliver the
>   messages the client has requested.
> - Message frequency varies based on lead activity.
> - Message and data rates may apply.
> - Reply **STOP** to unsubscribe at any time; reply **HELP** for help, or contact us at
>   [business email] / [business phone].

### Messaging Terms (own page, or a section of Terms)

> **SMS Program.** Great Software sends transactional lead-notification texts to business clients who
> have opted in by providing their mobile number and agreeing to these terms when they engage our
> services. Messages notify the client of new leads (phone calls and website form submissions) on the
> sites we run for them. Frequency varies with lead activity; message & data rates may apply. Reply STOP
> to opt out, HELP for help. We honor opt-outs immediately and do not sell or share opt-in data for
> marketing (see Privacy Policy).

## Business phone (Telnyx) — operator task

A single **Telnyx** number is the Great Software business line **and** the SMS sender
(`TELNYX_SMS_FROM`) **and** the number assigned to the 10DLC campaign. One number, one bill.

1. **Buy a Telnyx number** (pick an area code you like).
2. **Forward inbound calls → your cell.** Simplest: a Telnyx **TeXML application** with a bin that does
   `<Response><Dial>+1YOURCELL</Dial></Response>`, set as the number's voice handler. (Or Call Control
   with a forward — TeXML is the least-code path for plain forwarding.)
3. **Enable SMS** on the number → this is `TELNYX_SMS_FROM`.
4. **Inbound text → cell forwarding is OPTIONAL and needs a tiny handler** (Telnyx won't auto-forward
   SMS): a small webhook that catches the number's inbound-message event and re-sends to your cell.
   Defer it — STOP is auto-handled by Telnyx, and you can read replies in the Telnyx portal for now.
5. Put the number on the **Contact** page + use it as the brand/campaign contact + in the SMS HELP copy.

## 10DLC campaign — field reference (for the redo; copy-paste)

**⚠️ Load Telnyx account balance FIRST** so adding funds can't bounce you out mid-form (that's what
killed the last attempt). Brand is already processing. Campaign:

- **Use case:** `Low Volume Mixed`
- **Sub-types (check both):** `Account Notification` + `Customer Care`
- **Vertical:** `Professional Services` (or `Marketing and Advertising`)
- **Campaign description:**
  > Account Notification and Customer Care messages from Great Software. We notify our business clients
  > when a new lead — a phone call or a website form submission — arrives on the lead-generation website
  > we operate for them. Low volume; recipients are our own contracted clients.
- **Opt-in workflow description:**
  > Verbal/Paper: Clients provide their mobile number and agree to receive lead-notification texts when
  > they sign their service agreement with Great Software during onboarding. Not a public web form or
  > marketing list. Consent is not a condition of purchase.
- **Opt-in keywords:** `START,YES` · **Opt-out:** `STOP,UNSUBSCRIBE` · **Help:** `HELP`
- **Opt-in message:**
  > Great Software: You're subscribed to lead notifications. Msg frequency varies. Msg&data rates may
  > apply. Reply HELP for help, STOP to opt out.
- **Opt-out message:**
  > Great Software: You are unsubscribed and will receive no further messages.
- **Help message:**
  > Great Software: For help, visit greatsoftware.dev. Msg&data rates may apply.
- **Sample message 1:**
  > Great Software: New web lead — John D., (817) 555-1234. "Cracks in the drywall." — via
  > tarrantfoundationrepair.com. Reply STOP to opt out.
- **Sample message 2:**
  > Great Software: Missed lead from (817) 555-1234 on your foundation repair site at 2:14pm. Reply HELP
  > for help, STOP to opt out.
- **Privacy policy URL / Terms URL:** the pages you publish in this rebuild.
- **Attributes:** Embedded Link = **Yes** (sample `https://tarrantfoundationrepair.com`) · Embedded
  Phone Number = **Yes** · Number Pooling = **No** · Age-Gated = **No** · Direct Lending = **No**
- **Webhooks:** leave blank.
- **Cost:** ~$10 application + $4.50 (3-mo min) one-off, then **$1.50/mo**. (+ ~$4 brand, already done.)

> The sample messages now match what the Tenet code actually sends — both `buildLeadSms` (form-lead
> delivery) and `buildMissedSms` (call miss-text) were updated to prefix "Great Software:" (tenet commit
> 81d63a1), so registered samples == sent traffic.

## Suggested order

1. Run `ui-ux-pro-max` → design system.
2. Scaffold Astro (+ Tailwind), port content (Hero, Products/Tenet card, About), add the ArrowJS island.
3. Write Privacy + Terms/Messaging pages (copy above) + Contact.
4. Ship to GitHub Pages; verify greatsoftware.dev resolves; capture Privacy + Terms URLs.
5. (Operator, once Telnyx funded) buy the business number + forward to cell; set as `TELNYX_SMS_FROM`.
6. (Operator) redo the 10DLC campaign with the reference above + the new URLs + number.
7. Back in Tenet: set the secrets + run the live test text (see tenet ROADMAP "Now").
