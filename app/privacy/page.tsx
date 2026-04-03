import type { Metadata } from "next";
import Link from "next/link";
import { TrackEventOnMount } from "@/components/analytics/TrackEventOnMount";

export const metadata: Metadata = {
  title: "Privacy Policy | Free Macro Calculator",
  description: "Privacy policy for Free Macro Calculator. No data collection, no tracking.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <TrackEventOnMount event="legal_page_viewed" payload={{ page: "privacy" }} />
      <h1 className="text-2xl font-bold text-foreground mb-6">Privacy Policy</h1>
      <div className="max-w-none text-muted-foreground space-y-4">
        <p>
          Free Macro Calculator does not collect, store, or transmit personal
          user data beyond what is required to compute results in your current
          session.
        </p>
        <p>
          <strong className="text-foreground">No data collection.</strong> We do not collect your name,
          email, or any identifying information.
        </p>
        <p>
          <strong className="text-foreground">No account creation.</strong> You can use the calculator
          without signing up or creating an account.
        </p>
        <p>
          <strong className="text-foreground">No personal data stored.</strong> Your inputs (weight, height,
          age, etc.) are used only to calculate macros. Nothing is saved to a
          database or server.
        </p>
        <p>
          <strong className="text-foreground">USDA API.</strong> When you search for foods, we use the USDA
          FoodData Central API to fetch nutrition information. Your search
          queries are sent to the USDA API only for that purpose. We do not
          store or log your searches.
        </p>
        <p>
          <strong className="text-foreground">No tracking cookies.</strong> We do not use analytics,
          tracking pixels, or cookies for tracking purposes.
        </p>
        <p>
          For questions, contact us at{" "}
          <a href="mailto:support@physiqmacros.com" className="text-primary hover:text-primary/90">support@physiqmacros.com</a>.
        </p>
      </div>
      <p className="mt-8">
        <Link href="/" className="text-primary hover:text-primary/90 transition-colors">
          ← Back to Macro Calculator
        </Link>
      </p>
    </div>
  );
}
