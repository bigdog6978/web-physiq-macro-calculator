"use client";

import { useCallback, useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics/client";
import { STORE_LINKS } from "@/lib/config/storeLinks";
import { ComingSoonModal } from "@/components/ui/ComingSoonModal";

export type StoreButtonSize = "small" | "medium" | "large";
export type StoreButtonLayout = "horizontal" | "stacked";
export type StoreButtonContext = "hero" | "post_results" | "seo_footer";

interface StoreButtonsProps {
  size: StoreButtonSize;
  layout: StoreButtonLayout;
  context: StoreButtonContext;
  pageType: "home" | "seo" | "legal";
  pageFamily?: string;
  className?: string;
}

// Height classes — "large" is consistently the tallest on all breakpoints.
const sizeClasses: Record<StoreButtonSize, string> = {
  small: "h-11",
  medium: "h-12",
  large: "h-12 sm:h-14",
};

function layoutClasses(
  layout: StoreButtonLayout,
  context: StoreButtonContext
): string {
  // seo_footer: stacked on mobile, horizontal on desktop regardless of layout prop.
  if (context === "seo_footer") {
    return "flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4";
  }
  if (layout === "stacked") {
    return "flex flex-col items-start gap-3";
  }
  // Horizontal by default, but stack on very narrow screens to prevent clipping.
  return "flex flex-col min-[400px]:flex-row flex-wrap items-start min-[400px]:items-center gap-3 sm:gap-4";
}

export function StoreButtons({
  size,
  layout,
  context,
  pageType,
  pageFamily,
  className = "",
}: StoreButtonsProps) {
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

  // Stable handler — avoids re-creating inline arrow on every render,
  // which would destabilize ComingSoonModal's useEffect dependencies.
  const handleModalClose = useCallback(() => setIsComingSoonOpen(false), []);

  const family = pageFamily ?? (pageType === "seo" ? "seo" : "core");

  // Single memoised payload — both store events share the same base fields.
  // Keys use snake_case to match every other analytics event in the system.
  const basePayload = useMemo(
    () => ({
      page_type: pageType,
      page_family: family,
      placement: context,
    }),
    [context, family, pageType]
  );

  const handleIOSClick = () => {
    trackEvent("app_store_click", basePayload);
  };

  const handleGoogleClick = () => {
    if (!STORE_LINKS.android) {
      trackEvent("google_play_click", { ...basePayload, state: "coming_soon" });
      setIsComingSoonOpen(true);
      return;
    }
    trackEvent("google_play_click", { ...basePayload, state: "live" });
  };

  const badgeHeight = sizeClasses[size];
  const wrapperLayout = layoutClasses(layout, context);
  const androidLive = Boolean(STORE_LINKS.android);

  return (
    <>
      {/* role="group" is required for aria-label to be announced on a <div> */}
      <div
        role="group"
        aria-label="Choose your platform"
        className={`${wrapperLayout} ${className}`}
      >
        {/* ── App Store ── */}
        <a
          href={STORE_LINKS.ios}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleIOSClick}
          className={`inline-flex ${badgeHeight} items-center rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background`}
          aria-label="Download Physiq on the App Store"
        >
          <img
            src="/badges/app-store.svg"
            alt="Download on the App Store"
            width={180}
            height={54}
            className={`${badgeHeight} w-auto`}
          />
        </a>

        {/* ── Google Play — live link or coming-soon trigger ── */}
        {androidLive ? (
          <a
            href={STORE_LINKS.android!}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleGoogleClick}
            className={`inline-flex ${badgeHeight} items-center rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background`}
            aria-label="Download Physiq on Google Play"
          >
            <img
              src="/badges/google-play.svg"
              alt="Get it on Google Play"
              width={180}
              height={54}
              className={`${badgeHeight} w-auto`}
            />
          </a>
        ) : (
          /* Not yet live: visual indicator shows it's coming soon */
          <button
            type="button"
            onClick={handleGoogleClick}
            className={`relative inline-flex ${badgeHeight} items-center rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background`}
            aria-label="Google Play — coming soon, tap for details"
          >
            <img
              src="/badges/google-play.svg"
              alt="Get it on Google Play — coming soon"
              width={180}
              height={54}
              className={`${badgeHeight} w-auto opacity-55`}
            />
            {/* "Soon" chip — sits in the bottom-right corner of the badge */}
            <span
              aria-hidden="true"
              className="absolute bottom-1 right-1.5 rounded-full bg-card border border-[#3A3A3A] px-1.5 py-px text-[9px] font-bold uppercase tracking-widest text-muted-foreground leading-none"
            >
              Soon
            </span>
          </button>
        )}
      </div>

      <ComingSoonModal open={isComingSoonOpen} onClose={handleModalClose} />
    </>
  );
}
