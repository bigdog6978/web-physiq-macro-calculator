import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/academy/ArticleBody";
import { CalculatorCTA } from "@/components/academy/CalculatorCTA";
import { RelatedGuides } from "@/components/academy/RelatedGuides";
import { RelatedMacroPages } from "@/components/academy/RelatedMacroPages";
import { AppConversionCTA } from "@/components/cta/AppConversionCTA";
import { getCategoryById } from "@/lib/academy/categories";
import {
  getPublishedArticleBySlug,
  getPublishedSlugs,
  resolveRelatedGuides,
} from "@/lib/academy/queries";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://physiqmacros.com";

export function generateStaticParams() {
  return getPublishedSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getPublishedArticleBySlug(slug);
  if (!article) return {};

  const url = `${BASE_URL}/guides/${slug}`;
  const title = article.metaTitle ?? `${article.title} | Physiq`;
  const description = article.metaDescription ?? article.excerpt;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

function articleJsonLd(
  article: NonNullable<ReturnType<typeof getPublishedArticleBySlug>>,
  url: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription ?? article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: article.author
      ? { "@type": "Person", name: article.author }
      : { "@type": "Organization", name: "Physiq" },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

export default async function AcademyGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getPublishedArticleBySlug(slug);
  if (!article) notFound();

  const category = getCategoryById(article.categoryId);
  const url = `${BASE_URL}/guides/${slug}`;
  const relatedGuides = resolveRelatedGuides(article.relatedGuideSlugs);
  const relatedMacroSlugs = article.relatedMacroSlugs ?? [];

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: BASE_URL },
    { name: "Macro Academy", url: `${BASE_URL}/guides` },
    ...(category
      ? [
          {
            name: category.label,
            url: `${BASE_URL}/guides/category/${category.slug}`,
          },
        ]
      : []),
    { name: article.title, url },
  ]);

  const intro = article.heroIntro ?? article.excerpt;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd(article, url)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav
        className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[#737373]"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <span aria-hidden="true">›</span>
        <Link href="/guides" className="hover:text-white transition-colors">
          Macro Academy
        </Link>
        {category && (
          <>
            <span aria-hidden="true">›</span>
            <Link
              href={`/guides/category/${category.slug}`}
              className="hover:text-white transition-colors"
            >
              {category.label}
            </Link>
          </>
        )}
        <span aria-hidden="true">›</span>
        <span className="text-[#A3A3A3] truncate max-w-[12rem] sm:max-w-none">
          {article.title}
        </span>
      </nav>

      <article>
        <header className="mb-8">
          {category && (
            <p className="mb-2">
              <Link
                href={`/guides/category/${category.slug}`}
                className="text-xs font-semibold uppercase tracking-wide text-[#FF5F1F] hover:text-[#ff7a3d]"
              >
                {category.label}
              </Link>
            </p>
          )}
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-lg text-[#A3A3A3] leading-relaxed">{intro}</p>
          <p className="mt-3 text-xs text-[#737373]">
            Updated {article.updatedAt}
            {article.author ? ` · ${article.author}` : ""}
          </p>
        </header>

        <ArticleBody markdown={article.body} />

        <div className="mt-12 space-y-8">
          <CalculatorCTA />
          <AppConversionCTA placement="inline_article" pageType="seo" />
          <RelatedGuides articles={relatedGuides} />
          <RelatedMacroPages slugs={relatedMacroSlugs} />
          <AppConversionCTA
            placement="bottom_page"
            pageType="seo"
            showStoreButtons
          />
        </div>
      </article>
    </div>
  );
}
