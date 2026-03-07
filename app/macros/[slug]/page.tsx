import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ALL_SEO_PAGES, getPageConfig } from "@/lib/seo/pages";
import { buildPageContent, configToProfile } from "@/lib/seo/content";
import { buildFAQSchema, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { assertSEOQuality } from "@/lib/seo/quality";
import { generateMealPlan } from "@/lib/mealPlanEngine";
import { ResultsSummary } from "@/components/ResultsSummary";
import { MealPlan } from "@/components/MealPlan";
import { AdSlot } from "@/components/AdSlot";
import { RelatedPages } from "@/components/RelatedPages";
import { InteractiveCalculatorSection } from "@/components/seo/InteractiveCalculatorSection";
import { AppConversionCTA } from "@/components/cta/AppConversionCTA";
import type { MacroResult } from "@/types/macro";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://physiqmacros.com";

export async function generateStaticParams() {
  const report = assertSEOQuality();
  if (report.warnings.length > 0 && process.env.NODE_ENV !== "production") {
    console.warn(
      `[seo-quality] ${report.warnings.length} warning(s). Example: ${report.warnings[0]?.message}`
    );
  }
  return ALL_SEO_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const config = getPageConfig(slug);
  if (!config) return {};

  const content = buildPageContent(config);
  const url = `${BASE_URL}/macros/${slug}`;

  return {
    title: content.title,
    description: content.description,
    alternates: { canonical: url },
    openGraph: {
      title: content.title,
      description: content.description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: content.title,
      description: content.description,
    },
  };
}

export default async function MacroPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = getPageConfig(slug);
  if (!config) notFound();

  const content = buildPageContent(config);
  const profile = configToProfile(config);
  const { meals, conflictWarning } = generateMealPlan(
    content.targets,
    [],
    config.strategy ?? "balanced"
  );

  const macroResult: MacroResult = {
    tdee: content.tdee,
    targets: content.targets,
    meals,
    profile,
    explanation: content.explanation,
    ...(conflictWarning && { conflictWarning }),
  };

  const faqSchema = buildFAQSchema(content.faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: BASE_URL },
    { name: "Macro Guides", url: `${BASE_URL}/macros` },
    { name: content.h1, url: `${BASE_URL}/macros/${slug}` },
  ]);

  const introParagraphs = content.intro.split("\n\n");

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb */}
      <nav
        className="mb-6 flex items-center gap-2 text-sm text-[#737373]"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <span aria-hidden="true">›</span>
        <Link href="/macros" className="hover:text-white transition-colors">
          Guides
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-[#A3A3A3] truncate">{content.h1}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-8 items-start">
        <div className="max-w-2xl">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              {content.h1}
            </h1>
            <div className="mt-4 space-y-3">
              {introParagraphs.map((para, i) => (
                <p
                  key={i}
                  className={
                    i === 1
                      ? "text-xl font-semibold text-[#FF5F1F] tabular-nums"
                      : "text-[#A3A3A3]"
                  }
                >
                  {para}
                </p>
              ))}
            </div>
          </header>

          <section className="mb-8 rounded-2xl border border-[#2A2A2A] bg-[#171717] p-5">
            <h2 className="text-lg font-bold text-white mb-2">Who This Is For</h2>
            <p className="text-sm text-[#A3A3A3]">{content.whoThisIsFor}</p>
          </section>

          <section className="mb-8 rounded-2xl border border-[#2A2A2A] bg-[#171717] p-5">
            <h2 className="text-lg font-bold text-white mb-2">Macro Rationale</h2>
            <p className="text-sm text-[#A3A3A3] leading-relaxed">{content.macroRationale}</p>
            <p className="mt-3 text-sm text-[#A3A3A3] leading-relaxed">{content.strategyExplanation}</p>
          </section>

          {/* Pre-computed, server-rendered macro targets */}
          <section className="mb-10" aria-label="Macro targets">
            <ResultsSummary result={macroResult} />
          </section>

          <section className="mb-10" aria-label="Sample meal plan">
            <MealPlan result={macroResult} />
          </section>

          <AdSlot id="mid-article" variant="mid_content" className="mb-8" />

          {/* Interactive calculator — client island, prefilled with page params */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-2">
              Adjust Your Macros
            </h2>
            <p className="text-sm text-[#A3A3A3] mb-4">
              Pre-filled for this profile. Change any value and recalculate.
            </p>
            <InteractiveCalculatorSection
              initialValues={config}
              analyticsContext={{
                page_type: "seo",
                landing_slug: slug,
                seo_page_type: content.pageType,
              }}
            />
          </section>

          {/* CTA placed after value delivery, not before */}
          <AppConversionCTA placement="post_results" pageType="seo" className="mb-10" />

          <section className="mb-10 rounded-2xl border border-[#2A2A2A] bg-[#171717] p-5">
            <h2 className="text-lg font-bold text-white mb-3">Adjustment Notes</h2>
            <ul className="space-y-2">
              {content.adjustmentNotes.map((note) => (
                <li key={note} className="text-sm text-[#A3A3A3] leading-relaxed">
                  • {note}
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ — server-rendered with per-page unique content, no JS required */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-2">
              {content.faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] group"
                >
                  <summary className="px-4 py-3 font-medium text-[#F5F5F5] cursor-pointer list-none flex justify-between items-center hover:bg-[#242424] transition-colors select-none">
                    {faq.q}
                    <span
                      className="text-[#737373] ml-4 shrink-0 transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    >
                      ▼
                    </span>
                  </summary>
                  <p className="px-4 pb-4 pt-1 text-sm text-[#A3A3A3] leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Internal linking */}
          {content.relatedLinks.length > 0 && (
            <section className="mb-10">
              <RelatedPages links={content.relatedLinks} />
            </section>
          )}

          {content.supportingGuides.length > 0 && (
            <section className="mb-10 rounded-2xl border border-[#2A2A2A] bg-[#171717] p-6">
              <h2 className="text-lg font-bold text-white mb-3">Supporting Guides</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {content.supportingGuides.map((guide) => (
                  <li key={guide.href}>
                    <Link
                      href={guide.href}
                      className="text-sm text-[#A3A3A3] hover:text-[#FF5F1F] transition-colors"
                    >
                      {guide.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <AppConversionCTA
            placement="bottom_page"
            pageType="seo"
            showStoreButtons
            className="mb-10"
          />

          <AdSlot id="bottom-content" variant="bottom_content" className="mb-4" />
        </div>

        <aside className="hidden lg:block space-y-4">
          <AdSlot id="desktop-sidebar" variant="sidebar" />
          {/* Sidebar CTA only shown when no ad is active, providing value in the space */}
          <AppConversionCTA placement="inline_article" pageType="seo" />
        </aside>
      </div>
    </div>
  );
}
