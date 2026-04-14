import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ACADEMY_CATEGORIES } from "@/lib/academy/categories";
import {
  countPublishedByCategoryId,
  getFeaturedArticles,
  getPublishedArticles,
} from "@/lib/academy/queries";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";
import { CalculatorCTA } from "@/components/academy/CalculatorCTA";
import { AppConversionCTA } from "@/components/cta/AppConversionCTA";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://physiqmacros.com";

const CATEGORY_CARD_IMAGES: Partial<Record<string, string>> = {
  basics: "/images/guides/cards/bascis1.png",
  "fat-loss": "/images/guides/cards/fatloss.png",
  "muscle-gain": "/images/guides/cards/musclegain.png",
  "body-recomposition": "/images/guides/cards/recomp.png",
  "diet-strategies": "/images/guides/cards/dietstrategies.png",
  men: "/images/guides/cards/men.png",
  women: "/images/guides/cards/women.png",
  comparisons: "/images/guides/cards/comparisson.png",
};

export const metadata: Metadata = {
  title: "Macro Academy | Physiq Macros",
  description:
    "Learn macros, nutrition strategies, fat loss, muscle gain, and body recomposition—plus how to use the free calculator. Educational guides from Physiq.",
  alternates: { canonical: `${BASE_URL}/guides` },
  openGraph: {
    title: "Macro Academy | Physiq Macros",
    description:
      "Educational guides on macros, goals, and diet strategies—built to pair with the free calculator.",
    url: `${BASE_URL}/guides`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Macro Academy | Physiq Macros",
    description:
      "Educational guides on macros, goals, and diet strategies—built to pair with the free calculator.",
  },
  robots: { index: true, follow: true },
};

export default function MacroAcademyHubPage() {
  const featured = getFeaturedArticles();
  const all = getPublishedArticles().sort((a, b) =>
    b.updatedAt.localeCompare(a.updatedAt)
  );
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: BASE_URL },
    { name: "Macro Academy", url: `${BASE_URL}/guides` },
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 pt-4 pb-10 sm:pt-6 sm:pb-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav
        className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[#8a9e00] dark:text-muted-foreground"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:text-[#768800] dark:hover:text-foreground transition-colors">
          Home
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-[#8a9e00] dark:text-muted-foreground">
          Macro Academy
        </span>
      </nav>
      <header className="mb-12 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#b3cf00] dark:text-primary mb-3">
          Education
        </p>
        <h1 className="text-3xl font-bold text-foreground sm:text-5xl sm:leading-tight">
          Macro Academy
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Clear, practical guides on macros, nutrition strategies, fat loss, muscle gain,
          body recomposition, and how to use the calculator—so you can decide with
          confidence and track with Physiq.
        </p>
      </header>

      <section className="mb-14" aria-labelledby="categories-heading">
        <h2 id="categories-heading" className="text-xl font-bold text-foreground mb-4">
          Browse by topic
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {ACADEMY_CATEGORIES.map((c) => {
            const n = countPublishedByCategoryId(c.id);
            const imagePath = CATEGORY_CARD_IMAGES[c.id];
            return (
              <Link
                key={c.id}
                href={`/guides/category/${c.slug}`}
                className="group flex aspect-square flex-col justify-between rounded-2xl border border-card-border bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:p-6 dark:bg-card dark:shadow-none dark:hover:translate-y-0 dark:hover:shadow-none"
              >
                <div>
                  {imagePath ? (
                    <div className="mb-3 overflow-hidden rounded-lg border border-card-border bg-card">
                      <Image
                        src={imagePath}
                        alt={`${c.label} category card`}
                        width={320}
                        height={180}
                        className="h-24 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                  ) : null}
                  <h3 className="text-sm font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                    {c.label}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-snug line-clamp-3">
                    {c.description}
                  </p>
                </div>
                <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  {n > 0 ? `${n} guide${n === 1 ? "" : "s"}` : "Coming soon"}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mb-14" aria-labelledby="featured-heading">
          <h2 id="featured-heading" className="text-xl font-bold text-foreground mb-4">
            Featured guides
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((a) => (
              <Link
                key={a.slug}
                href={`/guides/${a.slug}`}
                className="group flex flex-col rounded-2xl border border-card-border bg-card p-5 shadow-sm transition-all hover:border-primary/45 hover:bg-primary-muted/40 hover:shadow-[0_0_0_1px_rgba(201,232,0,0.28)] dark:shadow-none"
              >
                <span className="text-xs font-medium text-[#b3cf00] dark:text-primary/90 group-hover:text-[#9db500] dark:group-hover:text-primary">
                  Featured
                </span>
                <span className="mt-2 font-semibold text-foreground">
                  {a.title}
                </span>
                <span className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {a.excerpt}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mb-14" aria-labelledby="all-guides-heading">
        <h2 id="all-guides-heading" className="text-xl font-bold text-foreground mb-4">
          All guides
        </h2>
        <ul className="space-y-3 max-w-3xl">
          {all.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/guides/${a.slug}`}
                className="block rounded-xl border border-card-border bg-card px-4 py-3 transition-colors hover:border-primary/40 hover:bg-primary-muted/40"
              >
                <span className="font-medium text-foreground">{a.title}</span>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{a.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-8 lg:grid-cols-2 max-w-4xl">
        <CalculatorCTA />
        <AppConversionCTA placement="inline_article" pageType="seo" showStoreButtons />
      </div>
    </div>
  );
}
