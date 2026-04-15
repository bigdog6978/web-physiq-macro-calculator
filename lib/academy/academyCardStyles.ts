/**
 * Shared Macro Academy card / list-row styles so hub topic tiles match category article lists.
 * Source pattern: `app/guides/category/[category]/page.tsx` article `<Link>` rows.
 */
export const ACADEMY_CARD_SHELL =
  "rounded-xl border border-card-border bg-card transition-colors hover:border-primary/40 hover:bg-primary-muted/40";

/** Category page article list + hub “All guides” row links */
export const ACADEMY_ARTICLE_ROW_LINK = `block ${ACADEMY_CARD_SHELL} px-4 py-4`;

/** Hub “Browse by topic” grid cards (optional image + title + description + footer) */
export const ACADEMY_TOPIC_CARD_LINK = `group flex aspect-square flex-col justify-between ${ACADEMY_CARD_SHELL} p-4 sm:p-5`;

/** Category label on topic cards; color from `--guide-accent` → `text-guide-accent` in `@theme inline`. */
export const ACADEMY_TOPIC_CARD_TITLE =
  "font-medium text-guide-accent leading-tight transition-colors group-hover:text-guide-accent-hover";
