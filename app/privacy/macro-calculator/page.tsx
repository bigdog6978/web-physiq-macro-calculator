import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - Physiq Macro Calculator",
  description: "Privacy policy for Physiq Macro Calculator website. Information on data collection, cookies, analytics, and advertising.",
};

export default function PrivacyMacroCalculatorPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-bold text-white mb-2">Privacy Policy</h1>
      <p className="text-[#A3A3A3] text-sm mb-2">Physiq Macro Calculator (Website)</p>
      <p className="text-[#737373] text-sm mb-8">Last Updated: February 24, 2026</p>

      <div className="max-w-none text-[#A3A3A3] space-y-6">
        <section>
          <h2 className="text-lg font-semibold text-white mb-2">1. INTRODUCTION</h2>
          <p>
            Physiq Macro Calculator (&quot;Website,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is a free, web-based application designed to calculate daily macronutrient targets and provide sample meal plans.
          </p>
          <p className="mt-2">
            This Website is informational only and does not provide medical advice, diagnosis, or treatment.
          </p>
          <p className="mt-2">
            This Privacy Policy explains how information is collected, used, and disclosed when you access or use the Website.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">2. INFORMATION YOU PROVIDE</h2>
          <p>
            The Website does not require account registration.
          </p>
          <p className="mt-2">
            We do not collect names, email addresses, phone numbers, or account credentials.
          </p>
          <p className="mt-2">
            Information you enter into the macro calculator (such as weight, height, age, goals, and dietary preferences) is processed for calculation purposes and is not stored on our servers unless otherwise stated.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">3. AUTOMATICALLY COLLECTED INFORMATION</h2>
          <p>
            When you access the Website, certain information may automatically be collected through server logs and third-party tools. This may include:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1 ml-2">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Device type</li>
            <li>Operating system</li>
            <li>Pages viewed</li>
            <li>Time spent on pages</li>
            <li>Referring website URLs</li>
            <li>Interaction data</li>
          </ul>
          <p className="mt-2">
            This information may be collected directly by our hosting provider or through third-party services described below.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">4. COOKIES AND TRACKING TECHNOLOGIES</h2>
          <p>
            The Website uses cookies and similar technologies for:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1 ml-2">
            <li>Website functionality</li>
            <li>Analytics</li>
            <li>Advertising</li>
            <li>Performance measurement</li>
          </ul>
          <p className="mt-2">
            Cookies are small data files stored on your device.
          </p>
          <p className="mt-2">
            You may disable cookies through your browser settings; however, certain features of the Website may not function properly.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">5. GOOGLE ANALYTICS</h2>
          <p>
            We use Google Analytics to understand how visitors use the Website.
          </p>
          <p className="mt-2">Google Analytics may collect:</p>
          <ul className="mt-2 list-disc list-inside space-y-1 ml-2">
            <li>IP address</li>
            <li>Device identifiers</li>
            <li>Usage patterns</li>
            <li>Behavioral metrics</li>
          </ul>
          <p className="mt-2">
            This information is used to analyze traffic and improve the Website.
          </p>
          <p className="mt-2">
            You can opt out of Google Analytics by visiting:{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#FF5F1F] hover:text-[#ff7a3d] break-all">
              https://tools.google.com/dlpage/gaoptout
            </a>
          </p>
          <p className="mt-2">
            Google&apos;s Privacy Policy:{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#FF5F1F] hover:text-[#ff7a3d] break-all">
              https://policies.google.com/privacy
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">6. GOOGLE ADS / GOOGLE ADSENSE</h2>
          <p>
            We use Google Ads and/or Google AdSense to display advertisements.
          </p>
          <p className="mt-2">
            Google may use cookies, web beacons, and other tracking technologies to:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1 ml-2">
            <li>Serve personalized ads</li>
            <li>Measure ad performance</li>
            <li>Build advertising profiles</li>
          </ul>
          <p className="mt-2">
            Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this Website or other websites.
          </p>
          <p className="mt-2">
            Users may opt out of personalized advertising by visiting:{" "}
            <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-[#FF5F1F] hover:text-[#ff7a3d] break-all">
              https://adssettings.google.com
            </a>
          </p>
          <p className="mt-2">
            For more information:{" "}
            <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-[#FF5F1F] hover:text-[#ff7a3d] break-all">
              https://policies.google.com/technologies/ads
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">7. DATA SHARING</h2>
          <p>
            We do not sell personal information directly.
          </p>
          <p className="mt-2">
            However, advertising and analytics providers may process information for advertising and analytics purposes.
          </p>
          <p className="mt-2">
            Under certain privacy laws (such as California law), this may be considered &quot;sharing&quot; for cross-context behavioral advertising.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">8. CALIFORNIA PRIVACY RIGHTS</h2>
          <p>
            If you are a California resident, you may have the right to:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1 ml-2">
            <li>Request access to personal information collected</li>
            <li>Request deletion of personal information</li>
            <li>Opt out of the sale or sharing of personal information</li>
          </ul>
          <p className="mt-2">
            To make a request, contact us at the email listed below.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">9. INTERNATIONAL USERS (GDPR)</h2>
          <p>
            If you are located in the European Economic Area (EEA), the United Kingdom, or similar jurisdictions, you have rights including:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1 ml-2">
            <li>Access to your data</li>
            <li>Correction of inaccurate data</li>
            <li>Deletion of data</li>
            <li>Restriction of processing</li>
            <li>Objection to processing</li>
          </ul>
          <p className="mt-2">
            Where required by law, we rely on user consent for analytics and advertising cookies.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">10. USDA FOODDATA CENTRAL</h2>
          <p>
            The Website uses the USDA FoodData Central API to retrieve publicly available nutritional information.
          </p>
          <p className="mt-2">When you perform a food search:</p>
          <ul className="mt-2 list-disc list-inside space-y-1 ml-2">
            <li>The search text may be transmitted to the USDA API.</li>
            <li>No personal identifiers are intentionally transmitted by us.</li>
          </ul>
          <p className="mt-2">
            USDA FoodData Central data are public domain under the CC0 1.0 Universal (CC0 1.0) license.
          </p>
          <p className="mt-2">
            Suggested citation: U.S. Department of Agriculture, Agricultural Research Service. FoodData Central. fdc.nal.usda.gov.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">11. DATA SECURITY</h2>
          <p>
            We use reasonable administrative and technical safeguards to protect information processed through the Website. However, no internet transmission is completely secure.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">12. CHILDREN&apos;S PRIVACY</h2>
          <p>
            The Website is not directed toward children under 13 years of age. We do not knowingly collect personal information from children.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">13. CHANGES TO THIS POLICY</h2>
          <p>
            We may update this Privacy Policy from time to time. The &quot;Last Updated&quot; date will reflect the most recent revision.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">14. CONTACT INFORMATION</h2>
          <p>
            If you have questions regarding this Privacy Policy, contact:
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
