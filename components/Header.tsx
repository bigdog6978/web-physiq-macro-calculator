"use client";

import Link from "next/link";

/**
 * Header component matching Physiq branding from rork-abz-macro-tracker.
 * Design: "Physiq:" (bold orange) + "Macro Calculator" (regular orange)
 * @see https://github.com/bigdog6978/rork-abz-macro-tracker
 */
const navLink =
  "text-sm font-medium text-[#A3A3A3] hover:text-[#FF5F1F] transition-colors whitespace-nowrap";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#2A2A2A]/50 bg-[#130804]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-1.5 rounded focus:outline-none focus:ring-2 focus:ring-[#FF5F1F] focus:ring-offset-2 focus:ring-offset-[#130804]"
        >
          <span className="text-lg font-bold tracking-wide text-[#FF5F1F] sm:text-2xl">
            Physiq: Macro Calculator
          </span>
        </Link>
        <nav
          className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm"
          aria-label="Main"
        >
          <Link href="/guides" className={navLink}>
            Macro Academy
          </Link>
          <Link href="/macros" className={navLink}>
            Macro Guides
          </Link>
          <Link href="/#calculator" className={navLink}>
            Calculator
          </Link>
        </nav>
      </div>
    </header>
  );
}
