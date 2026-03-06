"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics/client";

type AdSlotVariant = "top_content" | "mid_content" | "bottom_content" | "sidebar";

const variantStyles: Record<AdSlotVariant, string> = {
  top_content: "min-h-[90px]",
  mid_content: "min-h-[120px]",
  bottom_content: "min-h-[90px]",
  sidebar: "min-h-[250px] sticky top-24",
};

/**
 * Optional ad slot placeholder for ad network integration.
 *
 * Set NEXT_PUBLIC_ADSENSE_CLIENT_ID in your environment to activate.
 * When the env var is absent the component renders nothing and fires no events.
 *
 * To connect an ad network:
 *   - Replace the <span>Ad</span> placeholder below with your network snippet.
 *   - Example AdSense: <ins className="adsbygoogle" data-ad-client="..." data-ad-slot="..." />
 */
export function AdSlot({
  id,
  variant = "mid_content",
  className = "",
}: {
  id: string;
  variant?: AdSlotVariant;
  className?: string;
}) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const enabled = Boolean(adsenseClient);

  // Only track when the slot is actually rendered to the DOM.
  useEffect(() => {
    if (!enabled) return;
    trackEvent("ad_slot_rendered", { slot_id: id, variant });
  }, [id, variant, enabled]);

  if (!enabled) return null;

  return (
    <aside
      className={`${variantStyles[variant]} w-full flex items-center justify-center rounded-xl border border-dashed border-[#2A2A2A] bg-[#111] text-xs text-[#555] ${className}`}
      data-ad-slot={id}
      data-ad-variant={variant}
      aria-label="Advertisement"
    >
      <span>Ad</span>
    </aside>
  );
}
