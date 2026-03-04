import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - Macro Tracker | Free Macro Calculator",
  description: "Privacy policy for the Macro Tracker. No data collection, no tracking.",
};

export default function PrivacyMacroTrackerPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-bold text-white mb-2">Privacy Policy</h1>
      <p className="text-[#A3A3A3] text-sm mb-6">Macro Tracker</p>
      <div className="max-w-none text-[#A3A3A3] space-y-4">
        <p>
          [Placeholder: Privacy policy content for Macro Tracker will be uploaded here.]
        </p>
        <p>
          This page will contain the full privacy policy specific to the Macro Tracker product.
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
