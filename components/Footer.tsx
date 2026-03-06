"use client";

import Link from "next/link";
import { ConsentReopenLink } from "@/components/consent/ConsentReopenLink";

const dropdownMenu =
  "absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50";
const dropdownPanel =
  "min-w-[180px] rounded-lg border-2 border-[#FF5F1F] bg-[#1A1A1A] py-2 shadow-xl";
const dropdownLink =
  "block px-4 py-2 text-sm text-white hover:bg-[rgba(255,95,31,0.2)] transition-colors";

export function Footer() {
  return (
    <footer className="mt-16 border-t-2 border-[#FF5F1F] bg-[rgba(255,95,31,0.15)]">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-white">Free Macro Calculator</p>
            <p className="text-sm text-white/70">
              Free. No signup. No data saved.
            </p>
          </div>
          <nav
            className="grid grid-cols-2 grid-rows-3 gap-x-8 gap-y-3 items-center"
            aria-label="Footer navigation"
          >
            <Link
              href="/#calculator"
              className="text-sm text-white/90 hover:text-white transition-colors"
            >
              Macro Calculator
            </Link>
            <div className="flex items-center">
              <ConsentReopenLink />
            </div>
            <Link
              href="#"
              className="text-sm text-white/90 hover:text-white transition-colors"
            >
              Macro Tracker
            </Link>
            <div className="relative group flex items-center min-h-[1.5rem]">
              <span
                className="text-sm text-white/90 hover:text-white transition-colors cursor-default inline-block"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Privacy Policy
              </span>
              <div className={dropdownMenu} role="menu">
                <div className={dropdownPanel}>
                  <Link
                    href="/privacy/macro-calculator"
                    className={dropdownLink}
                    role="menuitem"
                  >
                    Macro Calculator
                  </Link>
                  <Link
                    href="/privacy/macro-tracker"
                    className={dropdownLink}
                    role="menuitem"
                  >
                    Macro Tracker
                  </Link>
                </div>
              </div>
            </div>
            <Link
              href="/do-not-sell"
              className="text-sm text-white/90 hover:text-white transition-colors"
            >
              California Privacy Rights
            </Link>
            <div className="relative group flex items-center min-h-[1.5rem]">
              <span
                className="text-sm text-white/90 hover:text-white transition-colors cursor-default inline-block"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Terms of Use
              </span>
              <div className={dropdownMenu} role="menu">
                <div className={dropdownPanel}>
                  <Link
                    href="/terms/macro-calculator"
                    className={dropdownLink}
                    role="menuitem"
                  >
                    Macro Calculator
                  </Link>
                  <Link
                    href="/terms/macro-tracker"
                    className={dropdownLink}
                    role="menuitem"
                  >
                    Macro Tracker
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
}
