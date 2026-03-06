import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://physiqmacros.com";

export const metadata: Metadata = {
  title: "Carnivore Macros Guide | Physiq",
  description:
    "Carnivore macro framework: protein/fat balance, calorie control, adherence considerations, and practical adjustment checkpoints.",
  alternates: { canonical: `${BASE_URL}/guides/carnivore-macros-guide` },
};

export default function CarnivoreMacrosGuidePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">Carnivore Macros Guide</h1>
      <div className="mt-6 space-y-4 text-[#A3A3A3] leading-relaxed">
        <p>
          Carnivore macros remove carbohydrate-heavy plant sources and focus intake on animal
          protein and fat. This can simplify decision-making for some users.
        </p>
        <p>
          Macro success still depends on calories, protein sufficiency, and long-term
          adherence. Use objective metrics (weight trend, training output, appetite) to
          evaluate effectiveness.
        </p>
        <p>
          If progress is inconsistent, check total calories and food consistency before making
          major strategy changes.
        </p>
      </div>
      <div className="mt-8">
        <Link
          href="/macros/carnivore-macros"
          className="text-[#FF5F1F] hover:text-[#ff7a3d]"
        >
          Continue to Carnivore Macros Guide →
        </Link>
      </div>
    </main>
  );
}
