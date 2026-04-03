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
      className={`rounded-2xl border border-card-border bg-card p-6 ${className}`}
      aria-labelledby="related-guides-heading"
    >
      <h2 id="related-guides-heading" className="text-lg font-bold text-foreground mb-3">
        Related guides
      </h2>
      <ul className="space-y-2">
        {articles.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/guides/${a.slug}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {a.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
