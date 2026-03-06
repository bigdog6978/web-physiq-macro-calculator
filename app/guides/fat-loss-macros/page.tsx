import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://physiqmacros.com";

export const metadata: Metadata = {
  title: "How to Calculate Macros for Fat Loss | Physiq",
  description:
    "A practical framework for fat-loss macros: calorie deficit sizing, protein targets, carb/fat tradeoffs, and adjustment timing.",
  alternates: { canonical: `${BASE_URL}/guides/fat-loss-macros` },
};

export default function FatLossMacrosGuidePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">
        How to Calculate Macros for Fat Loss
      </h1>
      <div className="mt-6 space-y-4 text-[#A3A3A3] leading-relaxed">
        <p>
          Start with maintenance calories (TDEE), then apply a 10-20% deficit. Most people
          do best around 15% because it is aggressive enough to progress but still
          sustainable for training and adherence.
        </p>
        <p>
          Keep protein high (commonly around 0.8-1.1g per lb bodyweight), then allocate
          remaining calories between carbs and fat based on preference and training quality.
        </p>
        <p>
          Track weekly trends, not daily fluctuations. If scale trend stalls for 2-3
          weeks, adjust by ~100-150 calories and reassess before making another change.
        </p>
      </div>
      <div className="mt-8">
        <Link href="/macros/cutting-macros" className="text-[#FF5F1F] hover:text-[#ff7a3d]">
          Continue to Cutting Macros Guide →
        </Link>
      </div>
    </main>
  );
}
