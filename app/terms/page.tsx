import type { Metadata } from "next";
import Link from "next/link";
import { TrackEventOnMount } from "@/components/analytics/TrackEventOnMount";

export const metadata: Metadata = {
  title: "Terms of Use | Free Macro Calculator",
  description: "Terms of use for Free Macro Calculator.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <TrackEventOnMount event="legal_page_viewed" payload={{ page: "terms" }} />
      <h1 className="text-2xl font-bold text-[#F5F5F5] mb-6">Terms of Use</h1>
      <div className="max-w-none text-[#A3A3A3] space-y-4">
        <p>
          By using Free Macro Calculator, you agree to these terms.
        </p>
        <p>
          <strong className="text-[#F5F5F5]">Informational purposes only.</strong> The calculator and meal
          plans are for general information only. They are not a substitute
          for professional medical, nutritional, or dietary advice.
        </p>
        <p>
          <strong className="text-[#F5F5F5]">Not medical advice.</strong> Consult a healthcare provider or
          registered dietitian before making significant changes to your diet,
          especially if you have health conditions.
        </p>
        <p>
          <strong className="text-[#F5F5F5]">No warranties.</strong> We provide the service &quot;as
          is&quot; without warranties of any kind. Results are estimates based
          on standard equations and may not apply to everyone.
        </p>
        <p>
          <strong className="text-[#F5F5F5]">Use at your own risk.</strong> You are responsible for how
          you use the information provided. We are not liable for any outcomes
          resulting from your use of this tool.
        </p>
        <p>
          <strong className="text-[#F5F5F5]">Limitation of liability.</strong> To the fullest extent
          permitted by law, we shall not be liable for any indirect, incidental,
          special, or consequential damages arising from your use of this
          service.
        </p>
        <p>
          <strong className="text-[#F5F5F5]">Governing law.</strong> These terms are governed by the laws
          of [jurisdiction placeholder].
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
