import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://physiqmacros.com";

export const metadata: Metadata = {
  title: "Keto Macros Explained | Physiq",
  description:
    "Understand keto macro setup: carb ceilings, protein adequacy, fat allocation, and when to adjust based on adherence and results.",
  alternates: { canonical: `${BASE_URL}/guides/keto-macros-explained` },
};

export default function KetoMacrosExplainedPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">Keto Macros Explained</h1>
      <div className="mt-6 space-y-4 text-[#A3A3A3] leading-relaxed">
        <p>
          Keto macros typically cap carbs to very low levels while increasing fat intake.
          Protein remains adequate, not extreme, to support lean mass without crowding out
          fat calories.
        </p>
        <p>
          Most people need consistency for several weeks before evaluating whether keto
          improves adherence and energy for their routine. Electrolytes, hydration, and food
          quality matter as much as macro percentages.
        </p>
        <p>
          If progress stalls, adjust total calories first before changing the carb ceiling.
          Keep changes small and review trend data over 2-3 weeks.
        </p>
      </div>
      <div className="mt-8">
        <Link href="/macros/keto-macros" className="text-[#FF5F1F] hover:text-[#ff7a3d]">
          Continue to Keto Macros Guide →
        </Link>
      </div>
    </main>
  );
}
