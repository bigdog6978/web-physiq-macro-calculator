"use client";

import Link from "next/link";
import { useConsent } from "./ConsentProvider";

const btnBase =
  "px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background";

export function ConsentBanner() {
  const { consent, acceptAll, rejectNonEssential, openModal } = useConsent();

  if (consent !== null) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] border-t-2 border-primary bg-card p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.12)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.5)] sm:p-5"
      role="dialog"
      aria-labelledby="consent-title"
      aria-describedby="consent-desc"
    >
      <div className="mx-auto max-w-2xl">
        <h2 id="consent-title" className="text-base font-semibold text-foreground mb-1">
          Your privacy choices
        </h2>
        <p id="consent-desc" className="text-sm text-muted-foreground mb-4">
          We use cookies for analytics and personalized ads. You can accept all, reject non-essential, or manage preferences.
        </p>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button
            type="button"
            onClick={acceptAll}
            className={`${btnBase} bg-primary text-primary-foreground hover:bg-primary-hover`}
            aria-label="Accept all cookies"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={rejectNonEssential}
            className={`${btnBase} border-2 border-card-border bg-muted text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground`}
            aria-label="Reject non-essential cookies"
          >
            Reject non-essential
          </button>
          <button
            type="button"
            onClick={openModal}
            className={`${btnBase} border-2 border-primary bg-primary-muted/60 text-foreground hover:bg-primary-muted`}
            aria-label="Manage cookie preferences"
          >
            Manage preferences
          </button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          <Link href="/privacy/macro-calculator" className="text-primary hover:text-primary/90 underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
