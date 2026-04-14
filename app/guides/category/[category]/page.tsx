import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ACADEMY_CATEGORIES, getCategoryBySlug } from "@/lib/academy/categories";
import { getArticlesByCategorySlug } from "@/lib/academy/queries";
import { CalculatorCTA } from "@/components/academy/CalculatorCTA";
import { AppConversionCTA } from "@/components/cta/AppConversionCTA";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://physiqmacros.com";

export function generateStaticParams() {
  return ACADEMY_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const cat = getCategoryBySlug(categorySlug);
  if (!cat) return {};

  const url = `${BASE_URL}/guides/category/${cat.slug}`;
  const title = `${cat.label} | Macro Academy | Physiq`;
  const description = `${cat.description} Browse guides in Macro Academy.`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
    twitter: { card: "summary", title, description },
    robots: { index: true, follow: true },
  };
}

export default async function AcademyCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const cat = getCategoryBySlug(categorySlug);
  if (!cat) notFound();

  const articles = getArticlesByCategorySlug(cat.slug);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <nav
        className="mb-6 flex items-center gap-2 text-sm text-[#8a9e00] dark:text-muted-foreground"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:text-[#768800] dark:hover:text-foreground transition-colors">
          Home
        </Link>
        <span aria-hidden="true">›</span>
        <Link href="/guides" className="hover:text-[#768800] dark:hover:text-foreground transition-colors">
          Macro Academy
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-[#8a9e00] dark:text-muted-foreground">{cat.label}</span>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{cat.label}</h1>
        <p className="mt-3 text-muted-foreground leading-relaxed max-w-2xl">
          {cat.description}
        </p>
      </header>

      {articles.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Guides in this category are coming soon.{" "}
          <Link href="/guides" className="text-primary hover:text-primary/90">
            Back to Macro Academy
          </Link>
        </p>
      ) : (
        <ul className="space-y-3">
          {articles.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/guides/${a.slug}`}
                className="block rounded-xl border border-card-border bg-card px-4 py-4 transition-colors hover:border-primary/40 hover:bg-primary-muted/40"
              >
                <span className="font-medium text-foreground">{a.title}</span>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {a.excerpt}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-12 space-y-8">
        <CalculatorCTA />
        <AppConversionCTA placement="bottom_page" pageType="seo" showStoreButtons />
      </div>
    </div>
  );
}
