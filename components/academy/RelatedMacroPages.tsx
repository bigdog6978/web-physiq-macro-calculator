import Link from "next/link";
import { getPageConfig } from "@/lib/seo/pages";
import { buildPageContent } from "@/lib/seo/content";

interface RelatedMacroPagesProps {
  slugs: string[];
  className?: string;
}

export function RelatedMacroPages({ slugs, className = "" }: RelatedMacroPagesProps) {
  const items = slugs
    .map((slug) => {
      const config = getPageConfig(slug);
      if (!config) return null;
      const content = buildPageContent(config);
      return { slug, title: content.h1 };
    })
    .filter((x): x is { slug: string; title: string } => x !== null);

  if (items.length === 0) return null;

  return (
    <section
      className={`rounded-2xl border border-[#2A2A2A] bg-[#171717] p-6 ${className}`}
      aria-labelledby="related-macro-pages-heading"
    >
      <h2 id="related-macro-pages-heading" className="text-lg font-bold text-white mb-3">
        Related macro pages
      </h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/macros/${item.slug}`}
              className="text-sm text-[#A3A3A3] hover:text-[#FF5F1F] transition-colors"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
