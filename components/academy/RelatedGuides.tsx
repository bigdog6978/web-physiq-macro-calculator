import Link from "next/link";
import type { AcademyArticle } from "@/lib/academy/types";

interface RelatedGuidesProps {
  articles: AcademyArticle[];
  className?: string;
}

export function RelatedGuides({ articles, className = "" }: RelatedGuidesProps) {
  if (articles.length === 0) return null;

  return (
    <section
      className={`rounded-2xl border border-[#2A2A2A] bg-[#171717] p-6 ${className}`}
      aria-labelledby="related-guides-heading"
    >
      <h2 id="related-guides-heading" className="text-lg font-bold text-white mb-3">
        Related guides
      </h2>
      <ul className="space-y-2">
        {articles.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/guides/${a.slug}`}
              className="text-sm text-[#A3A3A3] hover:text-[#FF5F1F] transition-colors"
            >
              {a.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
