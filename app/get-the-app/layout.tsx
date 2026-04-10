import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://physiqmacros.com";

export const metadata: Metadata = {
  title: "Get the App | Physiq Macro Tracker",
  description:
    "Download Physiq Macro Tracker for iOS. Save macro targets from the free calculator, log food fast, and stay consistent with your goals.",
  alternates: { canonical: `${BASE_URL}/get-the-app` },
  openGraph: {
    title: "Get the App | Physiq Macro Tracker",
    description:
      "Track macros daily on your phone—built to pair with the free Physiq macro calculator.",
    url: `${BASE_URL}/get-the-app`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get the App | Physiq Macro Tracker",
    description:
      "Track macros daily on your phone—built to pair with the free Physiq macro calculator.",
  },
  robots: { index: true, follow: true },
};

export default function GetTheAppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
