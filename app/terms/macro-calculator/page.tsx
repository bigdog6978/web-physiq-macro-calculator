import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use - Physiq Macro Calculator",
  description: "Terms of use for the Physiq Macro Calculator website.",
};

export default function TermsMacroCalculatorPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-bold text-white mb-2">Terms of Use</h1>
      <p className="text-[#A3A3A3] text-sm mb-2">Physiq Macro Calculator (Website)</p>
      <p className="text-[#737373] text-sm mb-8">Last Updated: February 24, 2026</p>

      <div className="max-w-none text-[#A3A3A3] space-y-6">
        <section>
          <h2 className="text-lg font-semibold text-white mb-2">1. ACCEPTANCE OF TERMS</h2>
          <p>
            By accessing or using the Physiq Macro Calculator website (the &quot;Website&quot;), you agree to be bound by these Terms of Use (&quot;Terms&quot;).
          </p>
          <p className="mt-2">
            If you do not agree to these Terms, you must not use the Website.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">2. DESCRIPTION OF SERVICE</h2>
          <p>
            Physiq Macro Calculator provides a free, web-based macronutrient calculation tool and sample meal planning information for informational purposes only.
          </p>
          <p className="mt-2">
            The Website does not provide medical advice, diagnosis, or treatment.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">3. MEDICAL DISCLAIMER</h2>
          <p>
            The information provided on this Website is for general informational and educational purposes only.
          </p>
          <p className="mt-2">The Website:</p>
          <ul className="mt-2 list-disc list-inside space-y-1 ml-2">
            <li>Is not a medical service</li>
            <li>Does not provide medical advice</li>
            <li>Does not replace professional medical consultation</li>
          </ul>
          <p className="mt-2">
            You should consult a licensed physician or qualified healthcare provider before making changes to your diet, exercise routine, or nutrition plan.
          </p>
          <p className="mt-2">
            Your use of the Website is at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">4. NO GUARANTEES OR RESULTS</h2>
          <p>
            We do not guarantee:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1 ml-2">
            <li>Weight loss</li>
            <li>Muscle gain</li>
            <li>Health improvements</li>
            <li>Specific fitness results</li>
          </ul>
          <p className="mt-2">
            Results vary based on individual factors including age, genetics, activity level, adherence, and health conditions.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">5. THIRD-PARTY SERVICES</h2>
          <p>
            The Website uses third-party services including:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1 ml-2">
            <li>Google Analytics</li>
            <li>Google Ads / Google AdSense</li>
            <li>USDA FoodData Central API</li>
          </ul>
          <p className="mt-2">
            We are not responsible for the content, privacy practices, or data handling of third-party services.
          </p>
          <p className="mt-2">
            Use of third-party services is subject to their respective terms and policies.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">6. USDA DATA</h2>
          <p>
            Nutritional data displayed on the Website is sourced from USDA FoodData Central.
          </p>
          <p className="mt-2">
            USDA data are public domain under the CC0 1.0 Universal (CC0 1.0) license.
          </p>
          <p className="mt-2">
            Suggested citation: U.S. Department of Agriculture, Agricultural Research Service. FoodData Central. fdc.nal.usda.gov.
          </p>
          <p className="mt-2">
            We do not guarantee the accuracy, completeness, or reliability of nutritional data provided.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">7. USER RESPONSIBILITIES</h2>
          <p>
            You agree not to:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1 ml-2">
            <li>Use the Website for unlawful purposes</li>
            <li>Attempt to disrupt or interfere with Website functionality</li>
            <li>Attempt to reverse engineer or scrape the Website</li>
            <li>Attempt to access non-public portions of the Website</li>
            <li>Use automated bots or scripts to overload the system</li>
          </ul>
          <p className="mt-2">
            We reserve the right to restrict access if misuse is detected.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">8. INTELLECTUAL PROPERTY</h2>
          <p>
            All Website content, including text, branding, design, layout, and code (excluding public-domain USDA data), is owned by Physiq Macro Calculator and is protected by intellectual property laws.
          </p>
          <p className="mt-2">
            You may not reproduce, distribute, modify, or create derivative works without prior written consent.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">9. ADVERTISING DISCLOSURE</h2>
          <p>
            The Website displays advertisements through Google Ads or other advertising partners.
          </p>
          <p className="mt-2">
            We may receive compensation for advertisements displayed.
          </p>
          <p className="mt-2">
            Advertisements do not constitute endorsement.
          </p>
          <p className="mt-2">
            We are not responsible for products or services advertised.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">10. DISCLAIMER OF WARRANTIES</h2>
          <p>
            The Website is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis.
          </p>
          <p className="mt-2">
            We make no warranties, express or implied, including:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1 ml-2">
            <li>Accuracy</li>
            <li>Reliability</li>
            <li>Fitness for a particular purpose</li>
            <li>Availability</li>
            <li>Non-infringement</li>
          </ul>
          <p className="mt-2">
            Use of the Website is at your sole risk.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">11. LIMITATION OF LIABILITY</h2>
          <p>
            To the maximum extent permitted by law, Physiq Macro Calculator shall not be liable for:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1 ml-2">
            <li>Indirect, incidental, or consequential damages</li>
            <li>Loss of data</li>
            <li>Loss of profits</li>
            <li>Health-related outcomes</li>
            <li>Decisions made based on Website information</li>
          </ul>
          <p className="mt-2">
            Your sole remedy for dissatisfaction is to stop using the Website.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">12. INDEMNIFICATION</h2>
          <p>
            You agree to indemnify and hold harmless Physiq Macro Calculator from any claims, damages, liabilities, or expenses arising from:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1 ml-2">
            <li>Your use of the Website</li>
            <li>Your violation of these Terms</li>
            <li>Your reliance on information provided</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">13. MODIFICATIONS</h2>
          <p>
            We reserve the right to modify these Terms at any time.
          </p>
          <p className="mt-2">
            Continued use of the Website after changes constitutes acceptance of the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">14. TERMINATION</h2>
          <p>
            We reserve the right to restrict or terminate access to the Website at our sole discretion, without notice.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">15. GOVERNING LAW</h2>
          <p>
            These Terms shall be governed by the laws of the State of Massachusetts, United States, without regard to conflict of law principles.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">16. CONTACT INFORMATION</h2>
          <p>
            For questions regarding these Terms, contact:
          </p>
          <p className="mt-2 text-white">
            Physiq Macro Calculator<br />
            Email: <a href="mailto:support@physiqmacros.com" className="text-[#FF5F1F] hover:text-[#ff7a3d]">support@physiqmacros.com</a>
          </p>
        </section>
      </div>

      <p className="mt-8">
        <Link href="/" className="text-[#FF5F1F] hover:text-[#ff7a3d] transition-colors">
          ← Back to Macro Calculator
        </Link>
      </p>
    </div>
  );
}
