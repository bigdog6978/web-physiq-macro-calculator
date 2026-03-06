import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://physiqmacros.com";

export const metadata: Metadata = {
  title: "Protein Intake per Pound Explained | Physiq",
  description:
    "How much protein per pound should you eat for fat loss, maintenance, and muscle gain? Practical intake ranges with implementation guidance.",
  alternates: { canonical: `${BASE_URL}/guides/protein-per-pound` },
};

export default function ProteinPerPoundGuidePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">
        Protein Intake per Pound Explained
      </h1>
      <div className="mt-6 space-y-4 text-[#A3A3A3] leading-relaxed">
        <p>
          Protein recommendations are often easiest to apply on a per-pound basis. A common
          practical range for active adults is roughly 0.8-1.1g/lb, with higher intake often
          helpful during calorie deficits.
        </p>
        <p>
          Distribution matters too: spreading protein across 3-5 meals improves consistency
          and can support recovery and appetite control better than one large serving.
        </p>
        <p>
          The best target is one you can hit daily. Use the calculator to set grams, then
          build simple repeatable meals around that anchor.
        </p>
      </div>
      <div className="mt-8">
        <Link
          href="/macros/protein-intake-for-180-pound-male"
          className="text-[#FF5F1F] hover:text-[#ff7a3d]"
        >
          View protein intake pages →
        </Link>
      </div>
    </main>
  );
}
