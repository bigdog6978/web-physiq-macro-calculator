import { STORE_LINKS } from "@/lib/config/storeLinks";

export type CTAPlacement =
  | "hero"
  | "inline_article"
  | "post_results"
  | "bottom_page"
  | "sticky_mobile";

export type CTAPageType = "home" | "seo" | "legal" | "marketing";

export interface CTAContent {
  eyebrow: string;
  headline: string;
  copy: string;
  /** Trust signal shown beneath the primary button. Keep short — max ~40 chars. */
  trust: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

const APP_STORE_URL = STORE_LINKS.ios;
const GOOGLE_PLAY_URL = STORE_LINKS.android;

export function getCTAContent(
  placement: CTAPlacement,
  pageType: CTAPageType
): CTAContent {
  // ---- post_results: highest intent moment — user just got their macros ----
  if (placement === "post_results") {
    return {
      eyebrow: "Next step",
      headline: "Save these targets and start tracking today.",
      copy:
        "Log meals in seconds, stay aligned with your goal, and see real progress — not just a number on a page.",
      trust: "Free · Always",
      primaryLabel: "Track Macros in Physiq",
      primaryHref: APP_STORE_URL,
      secondaryLabel: "Download for Android",
      secondaryHref: GOOGLE_PLAY_URL ?? undefined,
    };
  }

  // ---- inline_article: mid-content, low friction ----
  if (placement === "inline_article") {
    return {
      eyebrow: "Physiq App",
      headline: "Turn these targets into daily results.",
      copy:
        "The calculator gives you the plan. Physiq helps you execute it — fast meal logging, consistent tracking.",
      trust: "Free download · No subscription required",
      primaryLabel: "Get the App",
      primaryHref: APP_STORE_URL,
      secondaryLabel: "Google Play",
      secondaryHref: GOOGLE_PLAY_URL ?? undefined,
    };
  }

  // ---- bottom_page: end-of-content, reader is warmed up ----
  if (placement === "bottom_page") {
    return {
      eyebrow: "Physiq App",
      headline:
        pageType === "seo"
          ? "Ready to follow these macros every day?"
          : "Make consistency your competitive advantage.",
      copy:
        "Calculate on the web, execute in the app. Physiq makes daily macro tracking lightweight and sustainable.",
      trust: "Free download · 4.8★ on App Store",
      primaryLabel: "Download Physiq Free",
      primaryHref: APP_STORE_URL,
      secondaryLabel: "Google Play",
      secondaryHref: GOOGLE_PLAY_URL ?? undefined,
    };
  }

  // ---- sticky_mobile: compact, one clear action ----
  if (placement === "sticky_mobile") {
    return {
      eyebrow: "Physiq App",
      headline: "Track today's macros",
      copy: "",
      trust: "",
      primaryLabel: "Download Free",
      primaryHref: APP_STORE_URL,
    };
  }

  // ---- hero: shown after user has already engaged with the tool ----
  return {
    eyebrow: "Physiq App",
    headline: "Calculate here. Track it daily in the app.",
    copy:
      "The free web tool sets your targets. The Physiq app keeps you consistent with fast daily food logging.",
    trust: "Free download · No account required",
    primaryLabel: "Download on App Store",
    primaryHref: APP_STORE_URL,
    secondaryLabel: "Google Play",
    secondaryHref: GOOGLE_PLAY_URL ?? undefined,
  };
}
