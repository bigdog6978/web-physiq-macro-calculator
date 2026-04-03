import { ACADEMY_ARTICLES } from "./articles";
import type { AcademyArticle } from "./types";

export function getPublishedArticles(): AcademyArticle[] {
  return ACADEMY_ARTICLES.filter((a) => a.status === "published");
}

export function getPublishedArticleBySlug(
  slug: string
): AcademyArticle | undefined {
  const a = ACADEMY_ARTICLES.find((x) => x.slug === slug);
  if (!a || a.status !== "published") return undefined;
  return a;
}

export function getPublishedSlugs(): string[] {
  return getPublishedArticles().map((a) => a.slug);
}

export function getFeaturedArticles(): AcademyArticle[] {
  return getPublishedArticles().filter((a) => a.featured);
}

export function getArticlesByCategorySlug(
  categorySlug: string
): AcademyArticle[] {
  return getPublishedArticles().filter((a) => a.categoryId === categorySlug);
}

export function countPublishedByCategoryId(categoryId: string): number {
  return getPublishedArticles().filter((a) => a.categoryId === categoryId)
    .length;
}

export function resolveRelatedGuides(
  slugs: string[] | undefined
): AcademyArticle[] {
  if (!slugs?.length) return [];
  const pub = new Map(getPublishedArticles().map((a) => [a.slug, a]));
  return slugs.map((s) => pub.get(s)).filter(Boolean) as AcademyArticle[];
}
