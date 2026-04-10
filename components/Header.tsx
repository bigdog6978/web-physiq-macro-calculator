"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const navLink =
  "text-sm font-medium text-neutral-400 hover:text-[#e7ff00] transition-colors whitespace-nowrap";

const themeToggleWrap =
  "[&>div]:border-white/15 [&>div]:bg-white/5 [&_button:not([aria-pressed=true])]:!text-neutral-400 [&_button:not([aria-pressed=true])]:hover:!text-neutral-200 [&_button[aria-pressed=true]]:!bg-white/10 [&_button[aria-pressed=true]]:!text-[#e7ff00] [&_button[aria-pressed=true]]:!shadow-none";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-[#e7ff00] bg-black shadow-lg shadow-black/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-3">
        <div className="flex w-full items-center justify-between md:w-auto md:justify-start">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-1.5 rounded focus:outline-none focus:ring-2 focus:ring-[#e7ff00] focus:ring-offset-2 focus:ring-offset-black"
          >
            <img
              src="/logo.svg"
              alt="Physiq Macro Calculator"
              className="block h-4 w-auto max-h-4 sm:h-[18px] sm:max-h-5"
              width={110}
              height={20}
              decoding="async"
            />
          </Link>
          <div className={`shrink-0 md:hidden ${themeToggleWrap}`}>
            <ThemeToggle />
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-3 md:w-auto md:flex-row md:items-center md:justify-end md:gap-4">
          <nav
            className="flex w-full flex-wrap justify-center gap-x-4 gap-y-2 text-sm md:w-auto md:justify-end"
            aria-label="Main"
          >
            <Link href="/get-the-app" className={navLink}>
              Get the App
            </Link>
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
          <div className={`hidden shrink-0 md:block ${themeToggleWrap}`}>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
