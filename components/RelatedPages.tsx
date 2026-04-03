import Link from "next/link";
import type { RelatedLink } from "@/lib/seo/content";

interface RelatedPagesProps {
  links: RelatedLink[];
}

export function RelatedPages({ links }: RelatedPagesProps) {
  if (links.length === 0) return null;

  return (
    <div className="rounded-2xl border border-card-border bg-card p-6">
      <h2 className="text-lg font-bold text-white mb-4">
        Related Calculators &amp; Guides
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {links.map((link) => (
          <li key={link.slug}>
            <Link
              href={`/macros/${link.slug}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1"
            >
              <span className="text-primary text-xs">→</span>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
