"use client";

import Link from "next/link";
import { ConsentReopenLink } from "@/components/consent/ConsentReopenLink";

const APP_STORE_URL =
  process.env.NEXT_PUBLIC_APP_STORE_URL ??
  "https://apps.apple.com/app/physiq-macro-tracker/id6743434787";

const linkClass =
  "text-sm text-muted-foreground hover:text-foreground transition-colors";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-card-border bg-muted/40 dark:bg-primary-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">

          {/* Brand block */}
          <div className="max-w-xs shrink-0">
            <p className="font-semibold text-foreground">Physiq Macros</p>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
              Free macro calculator and nutrition guidance. Calculate here, track
              daily in the Physiq app.
            </p>
            <p className="mt-3 text-xs text-muted-foreground/80">
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
              <ConsentReopenLink />
            </div>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary font-medium hover:opacity-90 transition-opacity"
            >
              Download Physiq App
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
