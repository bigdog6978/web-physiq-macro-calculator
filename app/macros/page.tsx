import type { Metadata } from "next";
import Link from "next/link";
import { ALL_SEO_PAGES } from "@/lib/seo/pages";
import { GOAL_NOUN, STRATEGY_LABEL } from "@/lib/seo/content";
import { AppConversionCTA } from "@/components/cta/AppConversionCTA";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import type { Goal, MacroStrategy } from "@/types/macro";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://physiqmacros.com";

export const metadata: Metadata = {
  title: "Macro Guides & Calculators | Physiq",
  description:
    "Free macro guides for cutting, bulking, keto, carnivore, high protein, and more. Personalized calorie and macro calculators for any goal.",
  alternates: { canonical: `${BASE_URL}/macros` },
};

const PILLAR_SLUGS = ALL_SEO_PAGES.filter((p) => p.tier === "pillar").map(
  (p) => p.slug
);
const CLUSTER_SLUGS = ALL_SEO_PAGES.filter((p) => p.tier === "cluster").map(
  (p) => p.slug
);

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

const GOAL_ORDER: Goal[] = ["cut", "build", "maintain"];
const STRAT_ORDER: MacroStrategy[] = ["high_protein", "keto", "carnivore"];

interface MicroGroup {
  label: string;
  slugs: string[];
}

function getMicroGroups(): MicroGroup[] {
  const groups: MicroGroup[] = [];
  for (const goal of GOAL_ORDER) {
    for (const strategy of STRAT_ORDER) {
      const pages = ALL_SEO_PAGES.filter(
        (p) =>
          p.tier === "micro" &&
          p.goal === goal &&
          p.strategy === strategy &&
          p.gender === "male"
      );
      if (pages.length === 0) continue;
      groups.push({
        label: `${GOAL_NOUN[goal]} — ${STRATEGY_LABEL[strategy]} (Male)`,
        slugs: pages.map((p) => p.slug),
      });
    }
  }
  return groups;
}

function buildMicroLabel(slug: string): string {
  // e.g. "180-pound-male-cutting-high-protein-macros" → "180 lb Male Cutting"
  const match = slug.match(/^(\d+)-pound-(male|female)-(\w+)-/);
  if (!match) return slug;
  const [, weight, gender, goalSlug] = match;
  const goalLabel =
    Object.entries({ cut: "cutting", build: "bulking", maintain: "maintenance" }).find(
      ([, v]) => v === goalSlug
    )?.[0] ?? goalSlug;
  const goalNoun: Record<string, string> = {
    cut: "Cutting",
    build: "Bulking",
    maintain: "Maintenance",
  };
  return `${weight} lb ${gender === "male" ? "Male" : "Female"} ${goalNoun[goalLabel] ?? goalSlug}`;
}

export default function MacrosIndexPage() {
  const microGroups = getMicroGroups();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <nav className="mb-6 flex items-center gap-2 text-sm text-[#737373]" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-[#A3A3A3]">Macro Guides</span>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Macro Guides &amp; Calculators
        </h1>
        <p className="mt-3 text-[#A3A3A3]">
          Free personalized macro guides for every goal, diet strategy, body
          weight, and gender. Each page includes a pre-filled calculator, sample
          meal plan, and data-driven FAQ.
        </p>
        <AppConversionCTA placement="inline_article" pageType="seo" className="mt-5" />
      </header>

      {/* Pillar calculators */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">
          Specialty Calculators
        </h2>
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

      {/* Cluster guides */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Macro Guides</h2>
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

      {/* Micro page groups */}
      {microGroups.map((group) => (
        <section key={group.label} className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-3">
            {group.label}
          </h2>
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
      <NewsletterSignup source="macros_hub_bottom" className="mb-8" />
      <AppConversionCTA placement="bottom_page" pageType="seo" />
    </div>
  );
}
