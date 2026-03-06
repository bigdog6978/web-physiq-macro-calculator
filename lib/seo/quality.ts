import { ALL_SEO_PAGES, SEO_COUNTS } from "./pages";
import { buildPageContent } from "./content";
import { generateMealPlan } from "@/lib/mealPlanEngine";

export interface SEOQualityIssue {
  type: string;
  message: string;
  slugs?: string[];
}

export interface SEOQualityReport {
  counts: typeof SEO_COUNTS;
  errors: SEOQualityIssue[];
  warnings: SEOQualityIssue[];
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/\d+/g, "#")
    .replace(/[^a-z#\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function pushMap(map: Map<string, string[]>, key: string, slug: string): void {
  const arr = map.get(key) ?? [];
  arr.push(slug);
  map.set(key, arr);
}

export function generateSEOQualityReport(): SEOQualityReport {
  const errors: SEOQualityIssue[] = [];
  const warnings: SEOQualityIssue[] = [];

  const titleMap = new Map<string, string[]>();
  const descriptionMap = new Map<string, string[]>();
  const introMap = new Map<string, string[]>();
  const faqMap = new Map<string, string[]>();
  const mealFingerprintMap = new Map<string, string[]>();

  for (const page of ALL_SEO_PAGES) {
    const content = buildPageContent(page);
    pushMap(titleMap, content.title, page.slug);
    pushMap(descriptionMap, content.description, page.slug);
    pushMap(introMap, normalize(content.intro), page.slug);
    pushMap(
      faqMap,
      content.faqs
        .slice(0, 3)
        .map((faq) => normalize(faq.q))
        .join("|"),
      page.slug
    );

    const meal = generateMealPlan(content.targets, [], page.strategy ?? "balanced");
    const fingerprint = `${page.strategy ?? "balanced"}:${meal.meals
      .map((m) => m.items.map((i) => i.name).join(","))
      .join("|")}`;
    pushMap(mealFingerprintMap, fingerprint, page.slug);

    // Thin-answer check: each FAQ answer should be substantive (>120 chars)
    const thinAnswers = content.faqs.filter((f) => f.a.length < 120);
    if (thinAnswers.length > 1) {
      warnings.push({
        type: "thin_faq_answers",
        message: `Page ${page.slug} has ${thinAnswers.length} FAQ answers shorter than 120 chars. Expand for usefulness.`,
        slugs: [page.slug],
      });
    }

    const score =
      (content.intro.length > 300 ? 25 : content.intro.length > 200 ? 18 : 10) +
      (content.adjustmentNotes.length >= 4 ? 20 : 8) +
      (content.faqs.length >= 5 ? 20 : 10) +
      (content.relatedLinks.length >= 6 ? 20 : 8) +
      (content.supportingGuides.length >= 2 ? 15 : 5);
    if (score < 70) {
      warnings.push({
        type: "low_quality_score",
        message: `Page ${page.slug} scored ${score}/100. Review uniqueness and depth.`,
        slugs: [page.slug],
      });
    }
  }

  for (const [title, slugs] of titleMap.entries()) {
    if (slugs.length > 1) {
      errors.push({
        type: "duplicate_title",
        message: `Duplicate title detected: "${title}"`,
        slugs,
      });
    }
  }
  for (const [description, slugs] of descriptionMap.entries()) {
    if (slugs.length > 1) {
      errors.push({
        type: "duplicate_description",
        message: `Duplicate description detected: "${description}"`,
        slugs,
      });
    }
  }
  for (const [introSignature, slugs] of introMap.entries()) {
    if (slugs.length > 2) {
      warnings.push({
        type: "near_duplicate_intro",
        message: `Near-duplicate intro signature repeated ${slugs.length} times (${introSignature.slice(
          0,
          120
        )}...)`,
        slugs,
      });
    }
  }
  for (const [faqSignature, slugs] of faqMap.entries()) {
    if (slugs.length > 2) {
      warnings.push({
        type: "faq_signature_overlap",
        message: `FAQ signature overlap across ${slugs.length} pages (${faqSignature.slice(0, 100)}...).`,
        slugs,
      });
    }
  }
  for (const [fingerprint, slugs] of mealFingerprintMap.entries()) {
    if (slugs.length > 24) {
      warnings.push({
        type: "meal_plan_overlap",
        message: `Meal fingerprint repeated ${slugs.length} times (${fingerprint.slice(
          0,
          80
        )}...). Consider expanding food rotation.`,
        slugs,
      });
    }
  }

  return { counts: SEO_COUNTS, errors, warnings };
}

export function assertSEOQuality(report = generateSEOQualityReport()): SEOQualityReport {
  if (report.errors.length > 0) {
    const first = report.errors[0];
    throw new Error(`[seo-quality] ${first.type}: ${first.message}`);
  }
  return report;
}
