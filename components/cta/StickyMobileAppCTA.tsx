"use client";

import { useEffect, useState } from "react";
import { AppConversionCTA } from "@/components/cta/AppConversionCTA";
import { trackEvent } from "@/lib/analytics/client";

interface StickyMobileAppCTAProps {
  pageType: "home" | "seo" | "legal";
  /** Scroll depth in px before the sticky appears. Defaults to 600. */
  scrollThreshold?: number;
}

const DISMISS_KEY = "physiq_sticky_cta_dismissed";

export function StickyMobileAppCTA({
  pageType,
  scrollThreshold = 600,
}: StickyMobileAppCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(DISMISS_KEY) === "1") return;
    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    if (!isMobile) return;

    const onScroll = () => {
      if (window.scrollY >= scrollThreshold) {
        setVisible(true);
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollThreshold]);

  if (!visible) return null;

  const handleDismiss = () => {
    window.sessionStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  };

  return (
    /*
     * Use padding-bottom: env(safe-area-inset-bottom) to clear the iOS Safari
     * home-indicator bar. The outer wrapper holds the safe-area padding so the
     * inner card doesn't need to know about it.
     */
    <div
      className="fixed bottom-0 left-0 right-0 z-50 sm:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 12px)" }}
    >
      <div className="relative mx-3 mb-3">
        {/* Dismiss — minimum 44×44 touch target */}
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute -right-1 -top-4 flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground hover:text-white transition-colors"
          aria-label="Dismiss app suggestion"
        >
          <span aria-hidden="true" className="text-base leading-none">✕</span>
        </button>

        <AppConversionCTA
          placement="sticky_mobile"
          pageType={pageType}
          onPrimaryClick={() =>
            trackEvent("sticky_cta_clicked", {
              page_type: pageType,
              button_type: "primary",
            })
          }
        />
      </div>
    </div>
  );
}
