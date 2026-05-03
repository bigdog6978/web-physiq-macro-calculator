# Agent notes

## Macro Academy Article Template

Academy articles **must** follow the rule in [`.cursor/rules/macro-academy-article-template.mdc`](.cursor/rules/macro-academy-article-template.mdc) (Cursor SEO template: briefing, keyword brief, structure prompt, meta block, checklist, topic table). Published guides still map into `lib/academy/articles.ts` (`slug`, `title`, `metaTitle`, `metaDescription`, `excerpt`, `heroIntro`, `body`, related slugs, dates, etc.).

The rule auto-attaches via globs when editing under `lib/academy/`, `**/articles.ts`, `app/guides/`, and `components/academy/`.

## Hydration warnings and Cursor’s embedded browser

In **dev**, Next.js may report a hydration mismatch on guide headings (for example an `<h1>`) where the diff shows **`data-cursor-ref="…"`**. That attribute is **added by Cursor’s in-editor browser / inspection tooling** for automation, not by this repository. If the warning **does not appear** in Chrome or Safari **outside** Cursor (or in a clean incognito profile), treat it as **tooling noise**—do **not** add `suppressHydrationWarning` workarounds or try to strip `data-cursor-ref` in app code.

If the same mismatch **reproduces in a normal browser**, debug the usual causes: non-deterministic render (`Date.now()`, `Math.random()`, locale-only formatting), client-only branches that change the first paint, browser extensions mutating the DOM, or invalid HTML from Markdown. Guide pages are **Server Components** by default (`app/guides/[slug]/page.tsx` + `ArticleBody`); fix the underlying mismatch rather than masking symptoms.
