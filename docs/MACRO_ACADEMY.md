# Macro Academy — content workflow

Public label: **Macro Academy**. URL base: **`/guides`** (no `/blog`).

## Where content lives

- **Article registry:** `lib/academy/articles.ts` — export `ACADEMY_ARTICLES` (array of records).
- **Categories:** `lib/academy/categories.ts` — `ACADEMY_CATEGORIES` (8 fixed categories).
- **Macro page → guide links:** `lib/academy/macroLinks.ts` — `MACRO_SLUG_TO_ACADEMY_GUIDES` maps each programmatic `/macros/[slug]` to 1–2 guide slugs.

## Add a new article

1. Open `lib/academy/articles.ts`.
2. Add an object to `ACADEMY_ARTICLES` with:
   - `slug` — URL segment (`/guides/[slug]`).
   - `title`, `excerpt`, `body` (Markdown string).
   - `categoryId` — must match a category `id` in `categories.ts` (e.g. `fat-loss`, `basics`).
   - `tags` — optional string array.
   - `metaTitle`, `metaDescription` — optional; fall back to title/excerpt.
   - `publishedAt`, `updatedAt` — ISO date strings (`YYYY-MM-DD`).
   - `author` — optional.
   - `heroIntro` — optional; shown under title (defaults to `excerpt`).
   - `relatedGuideSlugs` — optional; slugs of **published** guides only (drafts are omitted at render time).
   - `relatedMacroSlugs` — optional; SEO macro page slugs (must exist in `lib/seo/pages`).
   - `featured` — optional boolean for hub “Featured guides”.
   - `status` — `"published"` | `"draft"` (drafts are excluded from hub list, sitemap, and static generation).

3. Run `npm run build` to confirm the new slug is picked up.

## Category / taxonomy

- Set `categoryId` to one of: `basics`, `fat-loss`, `muscle-gain`, `body-recomposition`, `diet-strategies`, `men`, `women`, `comparisons`.
- Category landing URLs: `/guides/category/[slug]` (e.g. `/guides/category/fat-loss`).

## Featured articles

- On any **published** article, set `featured: true`.
- Hub (`/guides`) lists all items where `featured === true`.

## Related guides

- Controlled per article via `relatedGuideSlugs: string[]`.
- Only **published** slugs are resolved; unknown or draft slugs are skipped.

## Related macro pages

- Controlled per article via `relatedMacroSlugs: string[]` (macro **slug** only, e.g. `cutting-macros`).
- Titles resolve via the existing SEO content layer (`getPageConfig` / `buildPageContent`).
- There is no single cluster page named “body recomposition macros”; guides may use a representative programmatic URL such as `180-pound-male-recomp-standard-macros` (exported as `RECOMP_MACRO_SLUG` in `articles.ts` for reuse).

## Programmatic macro pages (“Learn more in Macro Academy”)

- Edit `lib/academy/macroLinks.ts`: add or change `MACRO_SLUG_TO_ACADEMY_GUIDES[macroSlug]`.
- Resolved guides must be **published** to appear.

## Dependencies

- Article bodies use **Markdown** via `react-markdown` (`components/academy/ArticleBody.tsx`).
