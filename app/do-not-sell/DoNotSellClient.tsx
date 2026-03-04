"use client";

import { useConsent } from "@/components/consent/ConsentProvider";
import { getConsent } from "@/lib/consent/consentStorage";
import { DEFAULT_CONSENT } from "@/lib/consent/consentTypes";
import { setConsent } from "@/lib/consent/consentStorage";
import { applyConsentToGoogle } from "@/lib/consent/consentGoogle";
import { useState, useEffect } from "react";

export function DoNotSellClient() {
  const { openModal } = useConsent();
  const [optedOut, setOptedOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const stored = getConsent();
    setOptedOut(stored ? !stored.advertising : true);
  }, [mounted]);

  const handleOptOut = () => {
    const current = getConsent() ?? DEFAULT_CONSENT;
    const updated = {
      ...current,
      analytics: current.analytics,
      advertising: false,
    };
    setConsent(updated);
    applyConsentToGoogle(updated);
    setOptedOut(true);
  };

  if (!mounted) return null;

  return (
    <div className="mt-6 p-6 rounded-xl border-2 border-[#2A2A2A] bg-[#1A1A1A]">
      <h2 className="text-lg font-semibold text-white mb-2">Opt out of sale/sharing</h2>
      <p className="text-sm text-[#A3A3A3] mb-4">
        Click below to opt out of the sale or sharing of your personal information for
        advertising purposes. This will disable advertising cookies.
      </p>
      <button
        type="button"
        onClick={handleOptOut}
        disabled={optedOut}
        className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF5F1F] focus:ring-offset-2 focus:ring-offset-[#0D0D0D] ${
          optedOut
            ? "bg-[#2A2A2A] text-[#737373] cursor-not-allowed"
            : "bg-[#FF5F1F] text-white hover:bg-[#ff7a3d]"
        }`}
        aria-label="Opt out of sale or sharing of personal information"
      >
        {optedOut ? "You have opted out" : "Opt out of sale/sharing"}
      </button>
      <p className="mt-4 text-sm text-[#737373]">
        You can also manage your preferences at any time:{" "}
        <button
          type="button"
          onClick={openModal}
          className="text-[#FF5F1F] hover:text-[#ff7a3d] underline"
        >
          Cookie Preferences
        </button>
      </p>
    </div>
  );
}
