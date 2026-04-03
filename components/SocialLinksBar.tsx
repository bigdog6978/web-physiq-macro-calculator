/** Social links strip below the site header (not inside the black bar). */

import { Instagram } from "lucide-react";

function XLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const iconButton =
  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-card-border bg-card text-muted-foreground shadow-sm transition-colors hover:border-primary/50 hover:bg-primary-muted/40 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-muted dark:shadow-none";

export function SocialLinksBar() {
  return (
    <div
      className="bg-muted"
      role="region"
      aria-label="Social links"
    >
      <div className="mx-auto flex max-w-6xl justify-center px-4 pt-2 pb-1 sm:justify-end">
        <div className="flex items-center gap-2">
          <a
            href="https://x.com/PHYSIQMacros"
            target="_blank"
            rel="noopener noreferrer"
            className={iconButton}
            aria-label="Physiq on X"
          >
            <XLogo className="h-[18px] w-[18px]" />
          </a>
          <a
            href="https://www.instagram.com/physiqmacros/"
            target="_blank"
            rel="noopener noreferrer"
            className={iconButton}
            aria-label="Physiq on Instagram"
          >
            <Instagram className="h-[18px] w-[18px]" aria-hidden />
          </a>
        </div>
      </div>
    </div>
  );
}
