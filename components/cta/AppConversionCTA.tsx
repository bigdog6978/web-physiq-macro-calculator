"use client";

import { trackEvent } from "@/lib/analytics/client";
import {
  getCTAContent,
  type CTAPlacement,
  type CTAPageType,
} from "@/lib/cta/config";

interface AppConversionCTAProps {
  placement: CTAPlacement;
  pageType: CTAPageType;
  className?: string;
  /** Optional extra handler after tracking fires */
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const containerStyles: Record<CTAPlacement, string> = {
  hero: "rounded-2xl border border-[#FF5F1F]/30 bg-[#FF5F1F]/8 p-5 sm:p-6",
  inline_article: "rounded-2xl border border-[#2A2A2A] bg-[#171717] p-5 sm:p-6",
  post_results:
    "rounded-2xl border border-[#FF5F1F]/30 bg-[#1A1A1A] p-5 sm:p-6",
  bottom_page: "rounded-2xl border border-[#2A2A2A] bg-[#151515] p-5 sm:p-6",
  sticky_mobile:
    "rounded-2xl border border-[#FF5F1F]/35 bg-[#111] px-4 py-3.5 shadow-xl",
};

export function AppConversionCTA({
  placement,
  pageType,
  className = "",
  onPrimaryClick,
  onSecondaryClick,
}: AppConversionCTAProps) {
  const content = getCTAContent(placement, pageType);
  const compact = placement === "sticky_mobile";

  const handlePrimaryClick = () => {
    trackEvent("app_cta_clicked", {
      placement,
      page_type: pageType,
      button_type: "primary",
      href: content.primaryHref,
    });
    onPrimaryClick?.();
  };

  const handleSecondaryClick = () => {
    trackEvent("app_cta_clicked", {
      placement,
      page_type: pageType,
      button_type: "secondary",
      href: content.secondaryHref ?? "",
    });
    onSecondaryClick?.();
  };

  return (
    <div
      className={`${containerStyles[placement]} ${className}`}
      role="complementary"
      aria-label="Download the Physiq app"
    >
      <div
        className={
          compact
            ? "flex items-center justify-between gap-3"
            : "flex flex-col sm:flex-row sm:items-start gap-5"
        }
      >
        {/* Text block */}
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#FF5F1F] mb-1">
            {content.eyebrow}
          </p>
          <h3
            className={
              compact
                ? "text-sm font-bold text-white leading-snug"
                : "text-lg font-bold text-white leading-snug"
            }
          >
            {content.headline}
          </h3>
          {!compact && content.copy && (
            <p className="mt-1.5 text-sm text-[#A3A3A3] leading-relaxed">
              {content.copy}
            </p>
          )}
        </div>

        {/* Button block */}
        <div
          className={
            compact
              ? "flex items-center gap-2 shrink-0"
              : "flex flex-col gap-2.5 shrink-0 sm:items-start"
          }
        >
          <a
            href={content.primaryHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handlePrimaryClick}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-xl bg-[#FF5F1F] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#ff7a3d] active:scale-[0.97] transition-all"
          >
            {content.primaryLabel}
          </a>

          {/* Trust line sits right below primary button */}
          {!compact && content.trust && (
            <p className="text-[11px] text-[#666] leading-none pl-0.5">
              {content.trust}
            </p>
          )}

          {content.secondaryHref && content.secondaryLabel && !compact && (
            <a
              href={content.secondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleSecondaryClick}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-[#2A2A2A] px-5 py-2.5 text-sm font-semibold text-[#A3A3A3] hover:border-[#FF5F1F]/40 hover:text-white transition-colors"
            >
              {content.secondaryLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
