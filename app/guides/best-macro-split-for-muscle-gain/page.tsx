import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://physiqmacros.com";

export const metadata: Metadata = {
  title: "Best Macro Split for Muscle Gain | Physiq",
  description:
    "A practical muscle-gain macro split framework: surplus sizing, protein targets, carb emphasis for training, and adjustment cadence.",
  alternates: { canonical: `${BASE_URL}/guides/best-macro-split-for-muscle-gain` },
};

export default function BestMacroSplitForMuscleGainPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">
        Best Macro Split for Muscle Gain
      </h1>
      <div className="mt-6 space-y-4 text-[#A3A3A3] leading-relaxed">
        <p>
          Lean bulking typically works best with a controlled calorie surplus (often around
          5-12%), high protein consistency, and enough carbohydrates to support training
          volume.
        </p>
        <p>
          Bigger surpluses do not necessarily accelerate muscle gain proportionally. They
          usually increase fat gain. Start conservative, then adjust with measured data.
        </p>
        <p>
          Review bodyweight trend and gym performance every 2-3 weeks and adjust calories in
          small steps rather than large jumps.
        </p>
      </div>
      <div className="mt-8">
        <Link href="/macros/bulking-macros" className="text-[#FF5F1F] hover:text-[#ff7a3d]">
          Continue to Bulking Macros Guide →
        </Link>
      </div>
    </main>
  );
}
