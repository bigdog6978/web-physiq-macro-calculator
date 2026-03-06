import type { MetadataRoute } from "next";
import { ALL_SEO_PAGES } from "@/lib/seo/pages";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://physiqmacros.com";

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
  { url: `${BASE}/macros`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
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
