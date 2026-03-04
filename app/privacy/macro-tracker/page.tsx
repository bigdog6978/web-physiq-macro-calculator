import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - Physiq: Macro Tracker",
  description: "Privacy policy for Physiq: Macro Tracker. No data collection, no tracking. All data stored locally on your device.",
};

export default function PrivacyMacroTrackerPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-bold text-white mb-2">Privacy Policy</h1>
      <p className="text-[#A3A3A3] text-sm mb-8">Physiq: Macro Tracker</p>
      <p className="text-[#737373] text-sm mb-8">Last Updated: February 24, 2026</p>

      <div className="max-w-none text-[#A3A3A3] space-y-6">
        <section>
          <h2 className="text-lg font-semibold text-white mb-2">1. INTRODUCTION</h2>
          <p>
            Physiq: Macro Tracker (&quot;Physiq,&quot; &quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is a mobile application designed to help users track nutrition and macronutrient goals.
          </p>
          <p className="mt-2">
            Physiq is not a medical service and does not provide medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional before making changes to your diet or exercise program.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">2. INFORMATION COLLECTION</h2>
          <p>
            Physiq does not collect personal data directly through the App.
          </p>
          <p className="mt-2">The App:</p>
          <ul className="mt-2 list-disc list-inside space-y-1 ml-2">
            <li>Does not require account creation</li>
            <li>Does not request names, emails, or phone numbers</li>
            <li>Does not collect health records</li>
            <li>Does not collect food logs, macro logs, or weight entries</li>
            <li>Does not collect device identifiers</li>
            <li>Does not collect advertising identifiers</li>
            <li>Does not track location</li>
            <li>Does not access contacts or photos</li>
            <li>Does not use third-party analytics</li>
            <li>Does not transmit user data to Company servers</li>
          </ul>
          <p className="mt-2">
            All user-entered data remains stored locally on the user&apos;s device.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">3. LOCAL DATA STORAGE</h2>
          <p>
            All food logs, macro data, weight entries, and meal plans are stored exclusively on your device.
          </p>
          <ul className="mt-2 space-y-1 ml-2">
            <li>• Data is not transmitted to Physiq servers.</li>
            <li>• We do not have access to your data.</li>
            <li>• If you delete the App, locally stored data may be permanently removed unless backed up through your device&apos;s operating system (e.g., iCloud or Android backup services).</li>
            <li>• Backup services are controlled by Apple or Google, not Physiq.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">4. THIRD-PARTY SERVICES</h2>
          <p>
            The App uses the USDA FoodData Central API to retrieve publicly available nutritional information when users perform food searches.
          </p>
          <p className="mt-2">When you search for a food:</p>
          <ul className="mt-2 list-disc list-inside space-y-1 ml-2">
            <li>The food search text you enter is transmitted to the USDA FoodData Central API.</li>
            <li>No personal identifiers are transmitted by Physiq.</li>
            <li>Physiq does not link food searches to any individual user.</li>
          </ul>
          <p className="mt-2">
            USDA FoodData Central data are public domain and published under the CC0 1.0 Universal (CC0 1.0) license.
          </p>
          <p className="mt-2">
            Suggested citation: U.S. Department of Agriculture, Agricultural Research Service. FoodData Central. fdc.nal.usda.gov.
          </p>
          <p className="mt-2">
            The USDA operates independently and maintains its own privacy practices.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">5. PLATFORM-LEVEL DATA</h2>
          <p>
            Although Physiq does not collect personal information, app distribution platforms (such as Apple App Store or Google Play) may collect anonymized analytics, crash diagnostics, or device information in accordance with their own privacy policies.
          </p>
          <p className="mt-2">
            Physiq does not control and does not receive this data.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">6. DATA SHARING</h2>
          <p>
            Because Physiq does not collect personal data, we do not sell, rent, trade, or share user information.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">7. CHILDREN&apos;S PRIVACY</h2>
          <p>
            Physiq is not directed to children under 13 years of age (or the applicable minimum age in your jurisdiction). The App does not knowingly collect personal information from children.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">8. DATA SECURITY</h2>
          <p>
            Since data is stored locally and not transmitted to us, security depends on your device&apos;s operating system and security settings. We recommend enabling device-level protections such as passcodes and biometric authentication.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">9. INTERNATIONAL USERS</h2>
          <p>
            Physiq does not collect or process personal data. Therefore, cross-border data transfer regulations generally do not apply to the Company.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">10. CHANGES TO THIS POLICY</h2>
          <p>
            We may update this Privacy Policy from time to time. Updates will be reflected by the &quot;Last Updated&quot; date above.
          </p>
          <p className="mt-2">
            Continued use of the App after changes indicates acceptance of the revised policy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">11. CONTACT INFORMATION</h2>
          <p>
            If you have questions about this Privacy Policy, you may contact:
          </p>
          <p className="mt-2 text-white">
            Physiq: Macro Tracker<br />
            Email: <a href="mailto:physiqmacrotracker@yahoo.com" className="text-[#FF5F1F] hover:text-[#ff7a3d]">physiqmacrotracker@yahoo.com</a>
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
