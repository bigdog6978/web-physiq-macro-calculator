export type ArticleStatus = "draft" | "published";

export interface AcademyCategory {
  id: string;
  label: string;
  slug: string;
  description: string;
}

export interface AcademyArticle {
  slug: string;
  title: string;
  categoryId: string;
  tags?: string[];
  excerpt: string;
  metaTitle?: string;
  metaDescription?: string;
  publishedAt: string;
  updatedAt: string;
  author?: string;
  /** Shown under the title; falls back to excerpt */
  heroIntro?: string;
  body: string;
  relatedGuideSlugs?: string[];
  relatedMacroSlugs?: string[];
  featured?: boolean;
  status: ArticleStatus;
}
