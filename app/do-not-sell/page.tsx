import type { Metadata } from "next";
import Link from "next/link";
import { DoNotSellClient } from "./DoNotSellClient";

export const metadata: Metadata = {
  title: "Do Not Sell or Share My Personal Information | Physiq Macro Calculator",
  description: "Opt out of the sale or sharing of your personal information for advertising purposes.",
};

export default function DoNotSellPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-bold text-white mb-2">
        Do Not Sell or Share My Personal Information
      </h1>
      <p className="text-[#737373] text-sm mb-8">Physiq Macro Calculator</p>

      <div className="max-w-none text-[#A3A3A3] space-y-6">
        <p>
          Under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA),
          the use of cookies for advertising purposes may be considered &quot;sale&quot; or
          &quot;sharing&quot; of personal information.
        </p>
        <p>
          We use Google Ads and Google AdSense to display advertisements. When you accept
          advertising cookies, information may be shared with these partners for personalized
          advertising.
        </p>
        <p>
          You can opt out of the sale or sharing of your personal information by disabling
          advertising cookies below. This will prevent personalized ads and stop further
          sharing of your data for advertising purposes.
        </p>
      </div>

      <DoNotSellClient />

      <p className="mt-8 text-[#A3A3A3]">
        <Link href="/privacy/macro-calculator" className="text-[#FF5F1F] hover:text-[#ff7a3d] transition-colors">
          Privacy Policy
        </Link>
      </p>

      <p className="mt-8">
        <Link href="/" className="text-[#FF5F1F] hover:text-[#ff7a3d] transition-colors">
          ← Back to Macro Calculator
        </Link>
      </p>
    </div>
  );
}
