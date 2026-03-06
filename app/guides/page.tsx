import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://physiqmacros.com";

export const metadata: Metadata = {
  title: "Macro Nutrition Guides | Physiq",
  description:
    "Authority guides on fat-loss macros, protein intake per pound, keto macros, carnivore macros, and muscle-gain macro splits.",
  alternates: { canonical: `${BASE_URL}/guides` },
};

const GUIDES = [
  { href: "/guides/fat-loss-macros", label: "How to Calculate Macros for Fat Loss" },
  { href: "/guides/protein-per-pound", label: "Protein Intake per Pound Explained" },
  { href: "/guides/keto-macros-explained", label: "Keto Macros Explained" },
  { href: "/guides/carnivore-macros-guide", label: "Carnivore Macros Guide" },
  {
    href: "/guides/best-macro-split-for-muscle-gain",
    label: "Best Macro Split for Muscle Gain",
  },
];

export default function GuidesIndexPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">Macro Nutrition Guides</h1>
      <p className="mt-3 text-[#A3A3A3]">
        Evidence-aligned explainers that support the calculator and micro pages.
      </p>

      <ul className="mt-8 space-y-3">
        {GUIDES.map((guide) => (
          <li key={guide.href}>
            <Link
              href={guide.href}
              className="block rounded-xl border border-[#2A2A2A] bg-[#171717] px-4 py-3 text-sm text-[#F5F5F5] hover:border-[#FF5F1F]/40 hover:bg-[#FF5F1F]/5 transition-colors"
            >
              {guide.label}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
