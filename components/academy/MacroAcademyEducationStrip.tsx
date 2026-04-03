import Link from "next/link";
import { resolveRelatedGuides } from "@/lib/academy/queries";
import { getAcademyGuideSlugsForMacro } from "@/lib/academy/macroLinks";

interface MacroAcademyEducationStripProps {
  macroSlug: string;
  className?: string;
}

/**
 * “Learn more in Macro Academy” — links from programmatic macro pages into guides.
 */
export function MacroAcademyEducationStrip({
  macroSlug,
  className = "",
}: MacroAcademyEducationStripProps) {
  const guideSlugs = getAcademyGuideSlugsForMacro(macroSlug);
  const guides = resolveRelatedGuides(guideSlugs);
  if (guides.length === 0) return null;

  return (
    <section
      className={`rounded-2xl border border-card-border bg-card p-6 ${className}`}
      aria-labelledby="macro-academy-strip-heading"
    >
      <h2 id="macro-academy-strip-heading" className="text-lg font-bold text-foreground mb-2">
        Learn more in Macro Academy
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        Deeper explainers on macros, strategies, and how to use the calculator.
      </p>
      <ul className="space-y-2 mb-4">
        {guides.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/guides/${g.slug}`}
              className="text-sm text-primary hover:text-primary/90 transition-colors"
            >
              {g.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/guides"
        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        Browse Macro Academy →
      </Link>
    </section>
  );
}
