import Link from "next/link";
import type { RelatedLink } from "@/lib/seo/content";

interface RelatedPagesProps {
  links: RelatedLink[];
}

export function RelatedPages({ links }: RelatedPagesProps) {
  if (links.length === 0) return null;

  return (
    <div className="rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-6">
      <h2 className="text-lg font-bold text-white mb-4">
        Related Calculators &amp; Guides
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {links.map((link) => (
          <li key={link.slug}>
            <Link
              href={`/macros/${link.slug}`}
              className="flex items-center gap-2 text-sm text-[#A3A3A3] hover:text-[#FF5F1F] transition-colors py-1"
            >
              <span className="text-[#FF5F1F] text-xs">→</span>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
