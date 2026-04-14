"use client";

import Link from "next/link";
import { ConsentReopenLink } from "@/components/consent/ConsentReopenLink";
import { STORE_LINKS } from "@/lib/config/storeLinks";

const linkClass =
  "text-sm text-primary hover:text-accent-bright transition-colors";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t-2 border-primary bg-black">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">

          {/* Brand block */}
          <div className="max-w-xs shrink-0">
            <p className="font-semibold text-primary">
              Physiq Macros
            </p>
            <p className="mt-1.5 text-sm text-primary leading-relaxed">
              Free macro calculator and nutrition guidance. Calculate here, track
              daily in the Physiq app.
            </p>
            <p className="mt-3 text-xs text-primary">
              © {currentYear} Physiq Macro Tracker. All rights reserved.
            </p>
          </div>

          {/* Nav links — two columns, consistent color */}
          <nav
            className="grid grid-cols-2 gap-x-10 gap-y-3 sm:gap-x-16"
            aria-label="Footer navigation"
          >
            <Link href="/#calculator" className={linkClass}>
              Macro Calculator
            </Link>
            <Link href="/macros" className={linkClass}>
              Macro Guides
            </Link>
            <Link href="/guides" className={linkClass}>
              Macro Academy
            </Link>
            <Link href="/privacy/macro-calculator" className={linkClass}>
              Calculator Privacy Policy
            </Link>
            <Link href="/privacy/macro-tracker" className={linkClass}>
              Tracker Privacy Policy
            </Link>
            <Link href="/terms/macro-calculator" className={linkClass}>
              Calculator Terms of Use
            </Link>
            <Link href="/terms/macro-tracker" className={linkClass}>
              Tracker Terms of Use
            </Link>
            <Link href="/do-not-sell" className={linkClass}>
              California Privacy Rights
            </Link>
            <div className={linkClass}>
              <ConsentReopenLink className="!text-primary hover:!text-accent-bright focus:ring-primary focus:ring-offset-2 focus:ring-offset-black" />
            </div>
            <a
              href={STORE_LINKS.ios}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:text-accent-bright transition-colors"
            >
              Download Physiq App
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
