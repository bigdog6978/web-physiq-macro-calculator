import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use - Physiq Macro Tracker | Free Macro Calculator",
  description: "Terms of use for the Physiq Macro Tracker mobile application.",
};

export default function TermsMacroTrackerPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-bold text-white mb-2">Terms of Use</h1>
      <p className="text-muted-foreground text-sm mb-2">Physiq: Macro Tracker</p>
      <p className="text-muted-foreground text-sm mb-8">Last Updated: February 24, 2026</p>

      <div className="max-w-none text-muted-foreground space-y-6">
        <section>
          <h2 className="text-lg font-semibold text-white mb-2">1. ACCEPTANCE OF TERMS</h2>
          <p>
            These Terms of Use (&quot;Terms&quot;) govern your access to and use of the Physiq: Macro Tracker mobile application (the &quot;App&quot;).
          </p>
          <p className="mt-2">
            By downloading, installing, or using the App, you agree to be bound by these Terms. If you do not agree, do not use the App.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">2. DESCRIPTION OF SERVICE</h2>
          <p>
            Physiq: Macro Tracker is a nutrition and macronutrient tracking application designed for informational and educational purposes only.
          </p>
          <p className="mt-2">
            The App allows users to calculate and track macronutrient intake and weight-related goals.
          </p>
          <p className="mt-2">
            The App does not provide medical advice.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">3. MEDICAL DISCLAIMER (IMPORTANT)</h2>
          <p>
            The App is NOT a medical device.
          </p>
          <p className="mt-2">
            The App does NOT provide medical advice, diagnosis, or treatment.
          </p>
          <p className="mt-2">
            The App does NOT replace consultation with a licensed healthcare provider.
          </p>
          <p className="mt-2">
            All content, macro calculations, nutrition data, and meal suggestions are provided for informational purposes only.
          </p>
          <p className="mt-2">You should consult a physician or qualified healthcare provider before:</p>
          <ul className="mt-2 list-disc list-inside space-y-1 ml-2">
            <li>Beginning any diet program</li>
            <li>Making significant nutritional changes</li>
            <li>Beginning any exercise routine</li>
            <li>If you have a medical condition</li>
            <li>If you are pregnant or nursing</li>
          </ul>
          <p className="mt-2">
            Your use of the App is at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">4. NO GUARANTEE OF RESULTS</h2>
          <p>
            We do not guarantee:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1 ml-2">
            <li>Weight loss</li>
            <li>Fat loss</li>
            <li>Muscle gain</li>
            <li>Body recomposition</li>
            <li>Health improvements</li>
            <li>Performance improvements</li>
          </ul>
          <p className="mt-2">
            Results vary significantly based on individual factors including genetics, adherence, health conditions, activity level, and metabolic differences.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">5. ASSUMPTION OF RISK</h2>
          <p>
            You acknowledge that:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1 ml-2">
            <li>Diet and exercise involve inherent risks.</li>
            <li>Changes in caloric intake or macronutrient balance may impact health.</li>
            <li>Use of the App is voluntary.</li>
            <li>You assume full responsibility for any decisions made based on App content.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">6. DATA STORAGE</h2>
          <p>
            The App stores data locally on your device.
          </p>
          <p className="mt-2">
            We do not collect or store your personal nutrition or health data on our servers.
          </p>
          <p className="mt-2">
            You are solely responsible for maintaining backups of your data.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">7. THIRD-PARTY DATA AND SERVICES</h2>
          <p>
            The App retrieves nutritional data from the USDA FoodData Central API.
          </p>
          <p className="mt-2">
            USDA data are public domain under the CC0 1.0 Universal (CC0 1.0) license.
          </p>
          <p className="mt-2">
            We do not guarantee the accuracy, completeness, or reliability of USDA data.
          </p>
          <p className="mt-2">
            We are not responsible for third-party services, APIs, operating systems, or app stores.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">8. APP STORE COMPLIANCE (APPLE &amp; GOOGLE REQUIREMENTS)</h2>
          <p>
            This App is licensed, not sold, to you.
          </p>
          <p className="mt-2">
            You acknowledge that:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1 ml-2">
            <li>These Terms are between you and Physiq Macro Tracker only.</li>
            <li>Apple Inc. and Google LLC are not parties to these Terms.</li>
            <li>Apple and Google are not responsible for the App or its content.</li>
            <li>Apple and Google have no obligation to provide maintenance or support services.</li>
            <li>Apple and Google are third-party beneficiaries of these Terms and may enforce them.</li>
          </ul>
          <p className="mt-2">
            In the event of a claim related to the App:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1 ml-2">
            <li>Apple and Google bear no responsibility for addressing claims relating to product liability, legal compliance, or intellectual property infringement.</li>
            <li>Any claims must be directed solely to Physiq Macro Tracker.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">9. INTELLECTUAL PROPERTY</h2>
          <p>
            All App content, branding, design, interface elements, graphics, and software (excluding public-domain USDA data) are owned by Physiq Macro Tracker and protected by intellectual property laws.
          </p>
          <p className="mt-2">You may not:</p>
          <ul className="mt-2 list-disc list-inside space-y-1 ml-2">
            <li>Copy</li>
            <li>Modify</li>
            <li>Reverse engineer</li>
            <li>Decompile</li>
            <li>Distribute</li>
            <li>Create derivative works</li>
          </ul>
          <p className="mt-2">
            without prior written consent.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">10. PROHIBITED USE</h2>
          <p>
            You agree not to:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1 ml-2">
            <li>Use the App for unlawful purposes</li>
            <li>Attempt to reverse engineer the App</li>
            <li>Attempt to extract source code</li>
            <li>Interfere with App functionality</li>
            <li>Use automated scripts or exploits</li>
          </ul>
          <p className="mt-2">
            We reserve the right to terminate access for violations.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">11. DISCLAIMER OF WARRANTIES</h2>
          <p>
            The App is provided &quot;AS IS&quot; and &quot;AS AVAILABLE.&quot;
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
            Use of the App is at your sole risk.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">12. LIMITATION OF LIABILITY</h2>
          <p>
            To the maximum extent permitted by law, Physiq Macro Tracker shall not be liable for:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1 ml-2">
            <li>Indirect, incidental, special, or consequential damages</li>
            <li>Loss of profits</li>
            <li>Loss of data</li>
            <li>Personal injury</li>
            <li>Health-related outcomes</li>
            <li>Decisions made based on App information</li>
          </ul>
          <p className="mt-2">
            Our total liability shall not exceed the amount you paid for the App.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">13. INDEMNIFICATION</h2>
          <p>
            You agree to indemnify and hold harmless Physiq Macro Tracker from any claims, liabilities, damages, losses, or expenses arising from:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1 ml-2">
            <li>Your use of the App</li>
            <li>Your reliance on App information</li>
            <li>Your violation of these Terms</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">14. TERMINATION</h2>
          <p>
            We reserve the right to terminate or suspend access to the App at any time without notice for violations of these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">15. ARBITRATION &amp; CLASS ACTION WAIVER</h2>
          <p>
            Any dispute arising out of or relating to these Terms shall be resolved by binding arbitration in the State of Massachusetts.
          </p>
          <p className="mt-2">
            You agree:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1 ml-2">
            <li>To resolve disputes individually</li>
            <li>To waive the right to a jury trial</li>
            <li>To waive participation in class actions</li>
          </ul>
          <p className="mt-2">
            This arbitration provision survives termination of these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">16. GOVERNING LAW</h2>
          <p>
            These Terms shall be governed by the laws of the State of Massachusetts, without regard to conflict of law principles.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">17. MODIFICATIONS</h2>
          <p>
            We may update these Terms from time to time.
          </p>
          <p className="mt-2">
            Continued use of the App after changes constitutes acceptance of revised Terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">18. CONTACT INFORMATION</h2>
          <p>
            Physiq: Macro Tracker<br />
            Email: <a href="mailto:support@physiqmacros.com" className="text-primary hover:text-primary/90">support@physiqmacros.com</a>
          </p>
        </section>
      </div>

      <p className="mt-8">
        <Link href="/" className="text-primary hover:text-primary/90 transition-colors">
          ← Back to Macro Calculator
        </Link>
      </p>
    </div>
  );
}
