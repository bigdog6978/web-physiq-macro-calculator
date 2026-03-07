"use client";

import Link from "next/link";

/**
 * Header component matching Physiq branding from rork-abz-macro-tracker.
 * Design: "Physiq:" (bold orange) + "Macro Calculator" (regular orange)
 * @see https://github.com/bigdog6978/rork-abz-macro-tracker
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#2A2A2A]/50 bg-[#130804]">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="flex items-center gap-1.5 rounded focus:outline-none focus:ring-2 focus:ring-[#FF5F1F] focus:ring-offset-2 focus:ring-offset-[#130804]"
        >
          <span className="text-xl font-bold tracking-wide text-[#FF5F1F] sm:text-2xl">
            Physiq: Macro Calculator
          </span>
        </Link>
      </div>
    </header>
  );
}
