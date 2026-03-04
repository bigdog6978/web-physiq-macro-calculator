import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { ConsentUI } from "@/components/consent/ConsentUI";

export const metadata: Metadata = {
  title: "Free Macro Calculator | Daily Calories & Macros",
  description:
    "Calculate your calories and macros instantly. Free macro calculator for fat loss, muscle gain, keto, carnivore, Mediterranean, and more. No signup required.",
  keywords:
    "macro calculator, calorie calculator, TDEE calculator, keto macros, carnivore macros, macro calculator free",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://example.com"
  ),
  openGraph: {
    title: "Free Macro Calculator | Daily Calories & Macros",
    description:
      "Calculate your calories and macros instantly. Free. No signup. No data saved.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Macro Calculator | Daily Calories & Macros",
    description:
      "Calculate your calories and macros instantly. Free. No signup. No data saved.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Macro Calculator",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scheme-dark" style={{ colorScheme: "dark" }}>
      <head>
        <meta name="color-scheme" content="dark" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] antialiased flex flex-col">
        <ConsentProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <ConsentUI />
        </ConsentProvider>
      </body>
    </html>
  );
}
