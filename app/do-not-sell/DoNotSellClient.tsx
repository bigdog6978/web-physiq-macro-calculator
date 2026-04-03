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
    <div className="mt-6 p-6 rounded-xl border-2 border-card-border bg-card">
      <h2 className="text-lg font-semibold text-foreground mb-2">Opt out of sale/sharing</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Click below to opt out of the sale or sharing of your personal information for
        advertising purposes. This will disable advertising cookies.
      </p>
      <button
        type="button"
        onClick={handleOptOut}
        disabled={optedOut}
        className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${
          optedOut
            ? "bg-muted text-muted-foreground cursor-not-allowed"
            : "bg-primary text-primary-foreground hover:bg-primary-hover"
        }`}
        aria-label="Opt out of sale or sharing of personal information"
      >
        {optedOut ? "You have opted out" : "Opt out of sale/sharing"}
      </button>
      <p className="mt-4 text-sm text-muted-foreground">
        You can also manage your preferences at any time:{" "}
        <button
          type="button"
          onClick={openModal}
          className="text-primary hover:text-primary/90 underline"
        >
          Cookie Preferences
        </button>
      </p>
    </div>
  );
}
