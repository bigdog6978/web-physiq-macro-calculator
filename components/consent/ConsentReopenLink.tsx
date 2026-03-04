"use client";

import { useConsent } from "./ConsentProvider";

export function ConsentReopenLink() {
  const { openModal } = useConsent();

  return (
    <button
      type="button"
      onClick={openModal}
      className="text-sm text-white/90 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF5F1F] focus:ring-offset-2 focus:ring-offset-transparent rounded px-1 bg-transparent border-0"
      aria-label="Open cookie preferences"
    >
      Cookie Preferences
    </button>
  );
}
