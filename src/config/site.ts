const RAW_PHONE = import.meta.env.PUBLIC_GS_PHONE ?? "(801) 877-0447";
const RAW_EMAIL = import.meta.env.PUBLIC_GS_EMAIL ?? "hello@greatsoftware.dev";

/** Single source of truth for all contact + brand info. */
export const site = {
  name: "Great Software",
  tagline: "A whole range of software.",
  oneLiner:
    "I build and run my own products, take on client work, and consult on agentic systems that hold up in production.",
  domain: "greatsoftware.dev",
  url: "https://greatsoftware.dev",
  legalUpdated: "June 16, 2026",
  email: RAW_EMAIL,
  phone: RAW_PHONE,
  /** mailto: href derived from email */
  mailHref: `mailto:${RAW_EMAIL}`,
  /** tel: href with non-digits stripped, +1 prefixed */
  phoneHref: `tel:+1${RAW_PHONE.replace(/\D/g, "")}`,
} as const;

export type Site = typeof site;
