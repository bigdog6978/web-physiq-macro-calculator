import type { MetadataRoute } from "next";
import { ACADEMY_CATEGORIES } from "@/lib/academy/categories";
import { getPublishedSlugs } from "@/lib/academy/queries";
import { ALL_SEO_PAGES } from "@/lib/seo/pages";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://physiqmacros.com";

const ACADEMY_GUIDE_ROUTES: MetadataRoute.Sitemap = getPublishedSlugs().map(
  (slug) => ({
    url: `${BASE}/guides/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  })
);

const ACADEMY_CATEGORY_ROUTES: MetadataRoute.Sitemap = ACADEMY_CATEGORIES.map(
  (c) => ({
    url: `${BASE}/guides/category/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.72,
  })
);

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
  { url: `${BASE}/macros`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  { url: `${BASE}/guides`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ...ACADEMY_GUIDE_ROUTES,
  ...ACADEMY_CATEGORY_ROUTES,
  // Legal / compliance
  { url: `${BASE}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  { url: `${BASE}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  { url: `${BASE}/privacy/macro-calculator`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  { url: `${BASE}/privacy/macro-tracker`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  { url: `${BASE}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  { url: `${BASE}/terms-of-use`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  { url: `${BASE}/terms/macro-calculator`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  { url: `${BASE}/terms/macro-tracker`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  { url: `${BASE}/do-not-sell`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
];

function tierPriority(tier: string): number {
  if (tier === "pillar") return 0.85;
  if (tier === "cluster") return 0.75;
  return 0.6;
}

function tierFrequency(tier: string): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (tier === "pillar" || tier === "cluster") return "monthly";
  return "monthly";
}

const SEO_ROUTES: MetadataRoute.Sitemap = ALL_SEO_PAGES.map((page) => ({
  url: `${BASE}/macros/${page.slug}`,
  lastModified: new Date(),
  changeFrequency: tierFrequency(page.tier),
  priority: tierPriority(page.tier),
}));

export default function sitemap(): MetadataRoute.Sitemap {
  return [...STATIC_ROUTES, ...SEO_ROUTES];
}
