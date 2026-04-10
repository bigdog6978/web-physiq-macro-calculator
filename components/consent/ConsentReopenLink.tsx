"use client";

import { useConsent } from "./ConsentProvider";

export function ConsentReopenLink({
  className = "",
}: {
  className?: string;
}) {
  const { openModal } = useConsent();

  return (
    <button
      type="button"
      onClick={openModal}
      className={`text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent rounded px-1 bg-transparent border-0 ${className}`}
      aria-label="Open cookie preferences"
    >
      Cookie Preferences
    </button>
  );
}
