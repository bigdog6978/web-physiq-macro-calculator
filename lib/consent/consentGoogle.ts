/**
 * Apply consent to Google (Consent Mode v2).
 * Scripts are loaded ONLY when consent is granted.
 * Default state = denied for ad_storage, analytics_storage, ad_user_data, ad_personalization.
 */

import type { ConsentState } from "./consentTypes";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

let gaLoaded = false;
let adsenseLoaded = false;

function ensureGtag(): void {
  if (typeof window === "undefined") return;
  if (window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
}

function setConsentDefault(): void {
  ensureGtag();
  window.gtag?.("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500,
  });
}

function loadGAScript(): void {
  if (typeof document === "undefined" || !GA_ID || gaLoaded) return;
  ensureGtag();
  setConsentDefault();
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
  window.gtag?.("js", new Date());
  window.gtag?.("config", GA_ID, { anonymize_ip: true });
  gaLoaded = true;
}

function loadAdSenseScript(): void {
  if (typeof document === "undefined" || !ADSENSE_ID || adsenseLoaded) return;
  ensureGtag();
  setConsentDefault();
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`;
  script.crossOrigin = "anonymous";
  document.head.appendChild(script);
  adsenseLoaded = true;
}

export function applyConsentToGoogle(consent: ConsentState): void {
  if (typeof window === "undefined") return;
  ensureGtag();

  const getValue = (key: string): "granted" | "denied" => {
    if (key === "analytics_storage") return consent.analytics ? "granted" : "denied";
    if (["ad_storage", "ad_user_data", "ad_personalization"].includes(key)) {
      return consent.advertising ? "granted" : "denied";
    }
    return "denied";
  };

  window.gtag?.("consent", "update", {
    ad_storage: getValue("ad_storage"),
    analytics_storage: getValue("analytics_storage"),
    ad_user_data: getValue("ad_user_data"),
    ad_personalization: getValue("ad_personalization"),
  });

  if (consent.analytics && GA_ID) {
    loadGAScript();
  }
  if (consent.advertising && ADSENSE_ID) {
    loadAdSenseScript();
  }
}

export function initConsentDefault(): void {
  if (typeof window === "undefined") return;
  ensureGtag();
  setConsentDefault();
  // Load GA tag on every page (like gtag snippet); consent stays denied until user accepts
  if (GA_ID) loadGAScript();
}
