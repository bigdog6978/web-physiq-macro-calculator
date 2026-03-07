import type { Metadata } from "next";
import Link from "next/link";
import { ALL_SEO_PAGES, SEO_COUNTS } from "@/lib/seo/pages";
import { GOAL_NOUN, STRATEGY_LABEL } from "@/lib/seo/content";
import { AppConversionCTA } from "@/components/cta/AppConversionCTA";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import type { Goal, MacroStrategy } from "@/types/macro";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://physiqmacros.com";

export const metadata: Metadata = {
  title: "Macro Guides, Protein Targets & Meal Plans | Physiq",
  description:
    "Explore macro calculators, weight-based protein targets, and calorie-based meal-plan pages with adjustable presets.",
  alternates: { canonical: `${BASE_URL}/macros` },
};

const PILLAR_SLUGS = ALL_SEO_PAGES.filter((p) => p.tier === "pillar").map((p) => p.slug);
const CLUSTER_SLUGS = ALL_SEO_PAGES.filter((p) => p.tier === "cluster").map((p) => p.slug);

const PILLAR_LABELS: Record<string, string> = {
  "keto-macro-calculator": "Keto Macro Calculator",
  "carnivore-macro-calculator": "Carnivore Macro Calculator",
  "cutting-macro-calculator": "Cutting Macro Calculator",
  "bulking-macro-calculator": "Bulking Macro Calculator",
  "high-protein-macro-calculator": "High Protein Macro Calculator",
};

const CLUSTER_LABELS: Record<string, string> = {
  "macros-for-men": "Macros for Men",
  "macros-for-women": "Macros for Women",
  "cutting-macros": "Cutting Macros Guide",
  "bulking-macros": "Bulking Macros Guide",
  "maintenance-macros": "Maintenance Macros Guide",
  "keto-macros": "Keto Macros Guide",
  "carnivore-macros": "Carnivore Macros Guide",
  "high-protein-macros": "High Protein Macros Guide",
};

const GOAL_ORDER: Goal[] = ["cut", "build", "maintain", "recomp"];
const STRAT_ORDER: MacroStrategy[] = [
  "high_protein",
  "balanced",
  "performance",
  "keto",
  "carnivore",
];

interface Group {
  label: string;
  slugs: string[];
}

function getMacroMicroGroups(): Group[] {
  const groups: Group[] = [];
  for (const gender of ["male", "female"] as const) {
    for (const goal of GOAL_ORDER) {
      for (const strategy of STRAT_ORDER) {
        const pages = ALL_SEO_PAGES.filter(
          (p) =>
            p.tier === "micro" &&
            p.pageType === "macro" &&
            p.gender === gender &&
            p.goal === goal &&
            p.strategy === strategy
        );
        if (pages.length === 0) continue;
        groups.push({
          label: `${gender === "male" ? "Male" : "Female"} · ${GOAL_NOUN[goal]} · ${STRATEGY_LABEL[strategy]}`,
          slugs: pages
            .sort((a, b) => (a.weightLb ?? 0) - (b.weightLb ?? 0))
            .map((p) => p.slug),
        });
      }
    }
  }
  return groups;
}

function getProteinPages(): string[] {
  return ALL_SEO_PAGES.filter((p) => p.pageType === "protein_intake")
    .sort((a, b) => (a.weightLb ?? 0) - (b.weightLb ?? 0))
    .map((p) => p.slug);
}

function getMealPlanPages(): string[] {
  return ALL_SEO_PAGES.filter((p) => p.pageType === "meal_plan")
    .sort((a, b) => (a.calorieTarget ?? 0) - (b.calorieTarget ?? 0))
    .map((p) => p.slug);
}

function buildMicroLabel(slug: string): string {
  const macroMatch = slug.match(/^(\d+)-pound-(male|female)-(\w+)-([\w-]+)-macros$/);
  if (macroMatch) {
    const [, weight, gender, goalSlug, strategySlug] = macroMatch;
    return `${weight} lb ${gender === "male" ? "Male" : "Female"} · ${goalSlug} · ${strategySlug}`;
  }
  const proteinMatch = slug.match(/^protein-intake-for-(\d+)-pound-(male|female)$/);
  if (proteinMatch) {
    const [, weight, gender] = proteinMatch;
    return `Protein for ${weight} lb ${gender === "male" ? "Male" : "Female"}`;
  }
  const mealMatch = slug.match(/^meal-plan-for-(\d+)-calories-([\w-]+)$/);
  if (mealMatch) {
    const [, calories, strategy] = mealMatch;
    return `${calories} calories · ${strategy}`;
  }
  return slug;
}

export default function MacrosIndexPage() {
  const macroMicroGroups = getMacroMicroGroups();
  const proteinPages = getProteinPages();
  const mealPlanPages = getMealPlanPages();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <nav className="mb-6 flex items-center gap-2 text-sm text-[#737373]" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-[#A3A3A3]">Macro Guides</span>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Macro Guides, Protein Targets &amp; Meal Plans
        </h1>
        <p className="mt-3 text-[#A3A3A3]">
          Curated first-wave SEO system: {SEO_COUNTS.total} pages across pillars, clusters,
          weight-based macro targets, protein-intake pages, and calorie meal-plan pages.
        </p>
        <AppConversionCTA placement="inline_article" pageType="seo" className="mt-5" />
      </header>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Specialty Calculators</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {PILLAR_SLUGS.map((slug) => (
            <li key={slug}>
              <Link
                href={`/macros/${slug}`}
                className="flex items-center gap-2 rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-3 text-sm text-[#F5F5F5] hover:border-[#FF5F1F]/40 hover:bg-[#FF5F1F]/5 transition-colors"
              >
                <span className="text-[#FF5F1F]">→</span>
                {PILLAR_LABELS[slug] ?? slug}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Core Macro Guides</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {CLUSTER_SLUGS.map((slug) => (
            <li key={slug}>
              <Link
                href={`/macros/${slug}`}
                className="flex items-center gap-2 rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-3 text-sm text-[#F5F5F5] hover:border-[#FF5F1F]/40 hover:bg-[#FF5F1F]/5 transition-colors"
              >
                <span className="text-[#FF5F1F]">→</span>
                {CLUSTER_LABELS[slug] ?? slug}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {macroMicroGroups.map((group) => (
        <section key={group.label} className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-3">{group.label}</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {group.slugs.map((slug) => (
              <li key={slug}>
                <Link
                  href={`/macros/${slug}`}
                  className="block text-sm text-[#A3A3A3] hover:text-[#FF5F1F] transition-colors py-1"
                >
                  {buildMicroLabel(slug)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Protein Intake Pages</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {proteinPages.map((slug) => (
            <li key={slug}>
              <Link
                href={`/macros/${slug}`}
                className="block text-sm text-[#A3A3A3] hover:text-[#FF5F1F] transition-colors py-1"
              >
                {buildMicroLabel(slug)}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-white mb-3">Calorie Meal-Plan Pages</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {mealPlanPages.map((slug) => (
            <li key={slug}>
              <Link
                href={`/macros/${slug}`}
                className="block text-sm text-[#A3A3A3] hover:text-[#FF5F1F] transition-colors py-1"
              >
                {buildMicroLabel(slug)}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <NewsletterSignup source="macros_hub_bottom" className="mb-8" />
      <AppConversionCTA placement="bottom_page" pageType="seo" showStoreButtons />
    </div>
  );
}
