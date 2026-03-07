"use client";

import { trackEvent } from "@/lib/analytics/client";
import { StoreButtons } from "@/components/cta/StoreButtons";
import {
  getCTAContent,
  type CTAPlacement,
  type CTAPageType,
} from "@/lib/cta/config";

interface AppConversionCTAProps {
  placement: CTAPlacement;
  pageType: CTAPageType;
  className?: string;
  /** Render store badge pair below the main CTA row */
  showStoreButtons?: boolean;
  /** Optional extra handler after tracking fires */
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const containerStyles: Record<CTAPlacement, string> = {
  hero: "rounded-2xl border border-[#FF5F1F]/30 bg-[#1f1410] p-5 sm:p-6",
  inline_article: "rounded-2xl border border-[#2A2A2A] bg-[#171717] p-5 sm:p-6",
  post_results: "rounded-2xl border border-[#FF5F1F]/30 bg-[#1A1A1A] p-5 sm:p-6",
  bottom_page: "rounded-2xl border border-[#FF5F1F]/60 bg-[#FF5F1F]/8 p-5 sm:p-6",
  sticky_mobile: "rounded-2xl border border-[#FF5F1F]/35 bg-[#111] px-4 py-3.5 shadow-xl",
};

// Map CTA placement → StoreButtons props. Size "large" is the tallest on all
// breakpoints (h-12 sm:h-14), "medium" is the default (h-12).
const storeButtonsProps: Partial<
  Record<
    CTAPlacement,
    {
      context: "hero" | "post_results" | "seo_footer";
      size: "small" | "medium" | "large";
    }
  >
> = {
  hero: { context: "hero", size: "medium" },
  post_results: { context: "post_results", size: "large" },
  bottom_page: { context: "seo_footer", size: "small" },
  inline_article: { context: "seo_footer", size: "medium" },
};

// Differentiated aria-labels so multiple CTAs on the same page produce
// distinct landmark entries in screen-reader navigation.
const landmarkLabels: Record<CTAPlacement, string> = {
  hero: "Download the Physiq app",
  post_results: "Download the Physiq app — after your results",
  bottom_page: "Download the Physiq app — bottom of page",
  inline_article: "Download the Physiq app — in article",
  sticky_mobile: "Download the Physiq app",
};

export function AppConversionCTA({
  placement,
  pageType,
  className = "",
  showStoreButtons = false,
  onPrimaryClick,
  onSecondaryClick,
}: AppConversionCTAProps) {
  const content = getCTAContent(placement, pageType);
  const compact = placement === "sticky_mobile";
  const storeBtnProps = storeButtonsProps[placement];
  const canShowStore = showStoreButtons && !compact && Boolean(storeBtnProps);
  const conciseHeadline = "Calculate here. Track daily in Physiq: Macro Tracker.";
  const supportingLine = "Save your macro targets and track your food in seconds.";
  const isBottomStoreCard = canShowStore && placement === "bottom_page";
  const bottomHeadline =
    "Consistency wins. Track it with the Physiq Macro Tracker.";
  const bottomSupportingLine =
    "Calculate your macros here, then track them daily in the Physiq app.";
  const bottomBenefitChips = [
    "Fast food logging",
    "Macro target tracking",
    "Meal Planning",
    "Stay consistent",
  ] as const;

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
      className={`${containerStyles[placement]} ${canShowStore ? "p-4 sm:p-4" : ""} ${className}`}
      role="complementary"
      aria-label={landmarkLabels[placement]}
    >
      {isBottomStoreCard && storeBtnProps ? (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#FF5F1F]">
            PHYSIQ MACRO TRACKER APP
          </p>
          <h3 className="mt-1 text-base sm:text-lg font-bold text-white leading-snug">
            {bottomHeadline}
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-[#A3A3A3] leading-snug">
            {bottomSupportingLine}
          </p>

          <ul
            className="mt-3 flex flex-wrap gap-2"
            aria-label="App benefits"
          >
            {bottomBenefitChips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-[#2E2E2E] bg-[#1C1C1C] px-2.5 py-1 text-[11px] sm:text-xs text-[#B7B7B7]"
              >
                {chip}
              </li>
            ))}
          </ul>

          <div className="mt-3.5">
            <StoreButtons
              size={storeBtnProps.size}
              layout="horizontal"
              context={storeBtnProps.context}
              pageType={pageType}
            />
          </div>
        </div>
      ) : canShowStore && storeBtnProps ? (
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#FF5F1F]">
            Physiq Macro Tracker App
          </p>
          <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
            {conciseHeadline}
          </h3>
          <p className="text-xs sm:text-sm text-[#A3A3A3] leading-snug">
            {supportingLine}
          </p>
          <StoreButtons
            size={storeBtnProps.size}
            layout="horizontal"
            context={storeBtnProps.context}
            pageType={pageType}
          />
        </div>
      ) : (
        <>
          {/* ── Main row: text block + primary action ── */}
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

              {!compact && content.trust && (
                <p className="text-[11px] text-[#666] leading-none pl-0.5">
                  {content.trust}
                </p>
              )}

              {/* Fall-back text secondary button only when store badges are off */}
              {content.secondaryHref &&
                content.secondaryLabel &&
                !compact &&
                !canShowStore && (
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
        </>
      )}
    </div>
  );
}
