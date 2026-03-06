"use client";

import Link from "next/link";
import { ConsentReopenLink } from "@/components/consent/ConsentReopenLink";

const APP_STORE_URL =
  process.env.NEXT_PUBLIC_APP_STORE_URL ??
  "https://apps.apple.com/app/physiq-macro-tracker/id6743434787";

const linkClass =
  "text-sm text-white/75 hover:text-white transition-colors";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-[#FF5F1F]/40 bg-[#0D0D0D]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">

          {/* Brand block */}
          <div className="max-w-xs shrink-0">
            <p className="font-semibold text-white">Physiq Macros</p>
            <p className="mt-1.5 text-sm text-white/60 leading-relaxed">
              Free macro calculator and nutrition guidance. Calculate here, track
              daily in the Physiq app.
            </p>
            <p className="mt-3 text-xs text-white/40">
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
              Nutrition Guides
            </Link>
            <Link href="/privacy-policy" className={linkClass}>
              Privacy Policy
            </Link>
            <Link href="/terms-of-use" className={linkClass}>
              Terms of Use
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
              className="text-sm text-[#FF5F1F] hover:text-[#ff7a3d] transition-colors font-medium"
            >
              Download Physiq App
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
