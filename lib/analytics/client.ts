"use client";

import type { AnalyticsEventName, AnalyticsPayload } from "@/lib/analytics/events";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(
  event: AnalyticsEventName,
  payload: AnalyticsPayload = {}
): void {
  if (typeof window === "undefined") return;

  // GA event call (works once gtag is available after consent).
  if (window.gtag) {
    window.gtag("event", event, payload);
  }

  // Keep a local event log in dataLayer even before GA script loads.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...payload,
    ts: Date.now(),
  });
}
