import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use - Macro Calculator | Free Macro Calculator",
  description: "Terms of use for the Macro Calculator.",
};

export default function TermsMacroCalculatorPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-bold text-white mb-2">Terms of Use</h1>
      <p className="text-[#A3A3A3] text-sm mb-6">Macro Calculator</p>
      <div className="max-w-none text-[#A3A3A3] space-y-4">
        <p>
          [Placeholder: Terms of use content for Macro Calculator will be uploaded here.]
        </p>
        <p>
          This page will contain the full terms of use specific to the Macro Calculator product.
        </p>
      </div>
      <p className="mt-8">
        <Link href="/" className="text-[#FF5F1F] hover:text-[#ff7a3d] transition-colors">
          ← Back to Macro Calculator
        </Link>
      </p>
    </div>
  );
}
