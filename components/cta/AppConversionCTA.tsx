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
  hero: "rounded-2xl border border-primary/30 bg-primary-muted/50 p-5 sm:p-6 shadow-sm dark:shadow-none",
  inline_article:
    "rounded-2xl border border-card-border bg-card p-5 sm:p-6 shadow-sm dark:shadow-none",
  post_results:
    "rounded-2xl border border-primary/30 bg-card p-5 sm:p-6 shadow-sm dark:shadow-none",
  bottom_page:
    "rounded-2xl border border-primary/50 bg-primary-muted/60 p-5 sm:p-6 shadow-sm dark:shadow-none",
  sticky_mobile:
    "rounded-2xl border border-primary/35 bg-card px-4 py-3.5 shadow-xl dark:bg-muted",
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
      className={`@container ${containerStyles[placement]} ${canShowStore ? "p-4 sm:p-4" : ""} ${className}`}
      role="complementary"
      aria-label={landmarkLabels[placement]}
    >
      {isBottomStoreCard && storeBtnProps ? (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">
            PHYSIQ MACRO TRACKER APP
          </p>
          <h3 className="mt-1 text-base sm:text-lg font-bold text-foreground leading-snug">
            {bottomHeadline}
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-snug">
            {bottomSupportingLine}
          </p>

          <ul
            className="mt-3 flex flex-wrap justify-center gap-2"
            aria-label="App benefits"
          >
            {bottomBenefitChips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-card-border bg-muted px-2.5 py-1 text-[11px] sm:text-xs text-muted-foreground"
              >
                {chip}
              </li>
            ))}
          </ul>

          <div className="mt-3.5 flex justify-center">
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
          <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">
            Physiq Macro Tracker App
          </p>
          <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">
            {conciseHeadline}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-snug">
            {supportingLine}
          </p>
          <div className="flex justify-center">
            <StoreButtons
              size={storeBtnProps.size}
              layout="horizontal"
              context={storeBtnProps.context}
              pageType={pageType}
            />
          </div>
        </div>
      ) : (
        <>
          {/* ── Main row: text block + primary action ── */}
          <div
            className={
              compact
                ? "flex items-center justify-between gap-3"
                : "flex flex-col gap-5 @md:flex-row @md:items-start"
            }
          >
            {/* Text block: stack in narrow sidebars; row when container width reaches @md */}
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-primary mb-1">
                {content.eyebrow}
              </p>
              <h3
                className={
                  compact
                    ? "text-sm font-bold text-foreground leading-snug"
                    : "text-lg font-bold text-foreground leading-snug"
                }
              >
                {content.headline}
              </h3>
              {!compact && content.copy && (
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                  {content.copy}
                </p>
              )}
            </div>

            <div
              className={
                compact
                  ? "flex items-center gap-2 shrink-0"
                  : "flex w-full shrink-0 flex-col gap-2.5 @md:w-auto @md:items-start"
              }
            >
              <a
                href={content.primaryHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handlePrimaryClick}
                className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-hover active:scale-[0.97] transition-all @md:w-auto"
              >
                {content.primaryLabel}
              </a>

              {!compact && content.trust && (
                <p className="text-[11px] text-muted-foreground leading-none pl-0.5">
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
                    className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-xl border border-card-border px-5 py-2.5 text-sm font-semibold text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors @md:w-auto"
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
