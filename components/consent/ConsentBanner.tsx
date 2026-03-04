"use client";

import Link from "next/link";
import { useConsent } from "./ConsentProvider";

const btnBase =
  "px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF5F1F] focus:ring-offset-2 focus:ring-offset-[#0D0D0D]";

export function ConsentBanner() {
  const { consent, acceptAll, rejectNonEssential, openModal } = useConsent();

  if (consent !== null) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] border-t-2 border-[#FF5F1F] bg-[#1A1A1A] p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] sm:p-5"
      role="dialog"
      aria-labelledby="consent-title"
      aria-describedby="consent-desc"
    >
      <div className="mx-auto max-w-2xl">
        <h2 id="consent-title" className="text-base font-semibold text-white mb-1">
          Your privacy choices
        </h2>
        <p id="consent-desc" className="text-sm text-[#A3A3A3] mb-4">
          We use cookies for analytics and personalized ads. You can accept all, reject non-essential, or manage preferences.
        </p>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button
            type="button"
            onClick={acceptAll}
            className={`${btnBase} bg-[#FF5F1F] text-white hover:bg-[#ff7a3d]`}
            aria-label="Accept all cookies"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={rejectNonEssential}
            className={`${btnBase} border-2 border-[#2A2A2A] bg-[#0D0D0D] text-[#A3A3A3] hover:border-[#3A3A3A] hover:text-white`}
            aria-label="Reject non-essential cookies"
          >
            Reject non-essential
          </button>
          <button
            type="button"
            onClick={openModal}
            className={`${btnBase} border-2 border-[#FF5F1F] bg-[rgba(255,95,31,0.15)] text-[#FF5F1F] hover:bg-[rgba(255,95,31,0.25)]`}
            aria-label="Manage cookie preferences"
          >
            Manage preferences
          </button>
        </div>
        <p className="mt-3 text-xs text-[#737373]">
          <Link href="/privacy/macro-calculator" className="text-[#FF5F1F] hover:text-[#ff7a3d] underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
