"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MacroCalculator } from "@/components/MacroCalculator";
import { ResultsSummary } from "@/components/ResultsSummary";
import { MealPlan } from "@/components/MealPlan";
import { FoodSearch } from "@/components/FoodSearch";
import { FAQ } from "@/components/FAQ";
import { AdSlot } from "@/components/AdSlot";
import { AppConversionCTA } from "@/components/cta/AppConversionCTA";
import { PostResultsContinuation } from "@/components/cta/PostResultsContinuation";
import { trackEvent } from "@/lib/analytics/client";
import { STORE_LINKS } from "@/lib/config/storeLinks";
// AppCTA unused directly here — AppConversionCTA used instead
import type { MacroResult } from "@/types/macro";

const LIGHT_HERO_BG = "/background/ltmdbckgd.png";

const SIDEBAR_LEFT = [
  "/sidebar/sidebar1.png",
  "/sidebar/sidebar2.png",
  "/sidebar/sidebar3.png",
] as const;

const SIDEBAR_RIGHT = [
  "/sidebar/sidebar4.png",
  "/sidebar/sidebar5.png",
  "/sidebar/sidebar6.png",
] as const;

const SIDEBAR_IMAGE_WIDTH = 1242;
const SIDEBAR_IMAGE_HEIGHT = 2688;

const SIDEBAR_IMAGE_SIZES = "(max-width: 1023px) 0px, 135px";

function SidebarScreenshotStack({ paths }: { paths: readonly string[] }) {
  const handleAppStoreNav = () => {
    trackEvent("app_store_click", {
      page_type: "home",
      page_family: "core",
      placement: "calculator_sidebar",
    });
  };

  return paths.map((src) => (
    <a
      key={src}
      href={STORE_LINKS.ios}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleAppStoreNav}
      aria-label="Open Physiq on the App Store"
      className="group block rounded-xl outline-none transition duration-200 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0 active:scale-[0.99]"
    >
      <div className="overflow-hidden rounded-xl border-2 border-primary bg-card p-1.5 shadow-lg transition-shadow duration-200 group-hover:shadow-xl dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] dark:group-hover:shadow-[0_16px_48px_rgba(0,0,0,0.55)]">
        <Image
          src={src}
          alt=""
          width={SIDEBAR_IMAGE_WIDTH}
          height={SIDEBAR_IMAGE_HEIGHT}
          className="h-auto w-full rounded-lg shadow-md transition duration-200 ease-out group-hover:brightness-[1.06]"
          sizes={SIDEBAR_IMAGE_SIZES}
        />
      </div>
    </a>
  ));
}

export default function Home() {
  const [result, setResult] = useState<MacroResult | null>(null);
  const [darkHeroBackgroundImage, setDarkHeroBackgroundImage] = useState(
    "/background/bkgd1.png"
  );
  const calculatorRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const backgrounds = ["/background/bkgd1.png", "/background/bkgd2.png"] as const;
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    const backgroundTimeout = window.setTimeout(() => {
      setDarkHeroBackgroundImage(backgrounds[randomIndex]);
    }, 0);

    return () => window.clearTimeout(backgroundTimeout);
  }, []);

  const scrollToResults = () => {
    resultsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleResult = (r: MacroResult) => {
    setResult(r);
    setTimeout(scrollToResults, 100);
  };

  return (
    <>
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-muted to-background dark:from-[#2D2D2D] dark:to-black">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 dark:hidden"
          style={{ backgroundImage: `url('${LIGHT_HERO_BG}')` }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden bg-cover bg-center bg-no-repeat opacity-25 dark:block"
          style={{ backgroundImage: `url('${darkHeroBackgroundImage}')` }}
        />
        <div className="relative z-10 mx-auto max-w-2xl px-4 pt-4 pb-8 lg:max-w-7xl">
      {/* Header: deliver the value proposition, let users get straight to the calculator */}
      <header className="mb-8 max-w-2xl text-left lg:ml-[calc(135px+1.5rem)]">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Calculate Your Perfect Macros — Free
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Get personalized calorie and macro targets based on your body stats, goal, activity level, and eating style.
        </p>
      </header>

      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-6">
        <aside
          className="hidden shrink-0 flex-col gap-4 lg:flex lg:w-[135px]"
          aria-label="App screenshots — links to App Store"
        >
          <SidebarScreenshotStack paths={SIDEBAR_LEFT} />
        </aside>
        <section
          id="calculator"
          ref={calculatorRef}
          className="w-full min-w-0 flex-1 rounded-2xl border-2 border-primary/50 bg-card p-6 shadow-sm dark:shadow-none lg:max-w-2xl"
        >
          <MacroCalculator onResult={handleResult} analyticsContext={{ page_type: "home" }} />
        </section>
        <aside
          className="hidden shrink-0 flex-col gap-4 lg:flex lg:w-[135px]"
          aria-label="App screenshots — links to App Store"
        >
          <SidebarScreenshotStack paths={SIDEBAR_RIGHT} />
        </aside>
      </div>

      <AppConversionCTA
        placement="hero"
        pageType="home"
        showStoreButtons
        className="mb-8 !bg-white border-card-border dark:!bg-card"
      />

      {/* Results + post-results CTA appear only after a calculation */}
      {result && (
        <section ref={resultsRef} className="space-y-10 mb-12">
          <ResultsSummary result={result} />
          <MealPlan result={result} />
          <PostResultsContinuation />
        </section>
      )}

          <section className="rounded-2xl border-2 border-primary/50 bg-card p-6 mb-10 shadow-sm dark:shadow-none">
            <FoodSearch />
          </section>
        </div>
      </div>

      <div className="bg-background">
        <div className="mx-auto max-w-2xl px-4 pb-8">
      <p className="text-center text-sm text-muted-foreground mb-10 pt-8">
        Based on Mifflin-St Jeor Equation and widely accepted macro guidelines.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          How Are Macros Calculated?
        </h2>
        <div className="max-w-none text-muted-foreground space-y-3">
          <p>
            We use the <strong className="text-foreground">Mifflin-St Jeor equation</strong> to estimate
            your basal metabolic rate (BMR)—the calories your body burns at
            rest. BMR depends on your weight, height, age, and gender.
          </p>
          <p>
            Your <strong className="text-foreground">TDEE</strong> (Total Daily Energy Expenditure) is BMR
            multiplied by an activity factor—sedentary (1.2), light activity (1.35),
            moderate training (1.5), strength training (1.65), or endurance
            training (1.75). This is your maintenance calories.
          </p>
          <p>
            <strong className="text-foreground">Goal adjustments</strong> are applied to TDEE: cut fat
            (-20%), build muscle (+10%), maintain (0%), or body recomp (maintenance or a
            small deficit based on body fat %). Protein is then set from body composition,
            goal, and activity level, fat is anchored to a minimum threshold, and carbs fill the remainder.
            Your chosen <strong className="text-foreground">eating style</strong> mostly affects meal suggestions,
            with keto and carnivore also capping carbs.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Macro Calculator for Different Goals
        </h2>
        <div className="space-y-6 text-muted-foreground">
          <div>
            <h3 className="font-medium text-foreground">Fat Loss Macros</h3>
            <p className="text-sm mt-1">
              A 20% calorie deficit with goal- and activity-based protein helps
              you lose fat while preserving muscle. Eating style changes the foods,
              while keto and carnivore also lower carb intake.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-foreground">Muscle Gain Macros</h3>
            <p className="text-sm mt-1">
              A 10% surplus supports muscle growth. Protein and carbs both rise
              with higher training demands, while eating style keeps meal suggestions
              aligned with how you prefer to eat.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-foreground">Body Recomposition Macros</h3>
            <p className="text-sm mt-1">
              Recomp stays around maintenance unless body fat is higher, in which case
              we use a small deficit. Body fat % makes this more accurate.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-foreground">Keto Macro Calculator</h3>
            <p className="text-sm mt-1">
              Keto caps carbs around 20-50 grams per day, keeps protein anchored,
              and shifts remaining calories into fat.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-foreground">Carnivore Macro Calculator</h3>
            <p className="text-sm mt-1">
              Carnivore keeps carbs near zero and builds meals around animal-based
              protein and fat sources.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-foreground">Mediterranean Eating Style</h3>
            <p className="text-sm mt-1">
              Mediterranean keeps the base algorithm intact while emphasizing
              olive oil, fish, legumes, whole grains, fruits, and vegetables.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <FAQ />
      </section>

      {/* Primary conversion — app download — before secondary (newsletter) */}
      <AppConversionCTA
        placement="bottom_page"
        pageType="home"
        showStoreButtons
        className="mb-8"
      />
      <AdSlot id="home-bottom-content" variant="bottom_content" className="mb-6" />
        </div>
      </div>
    </>
  );
}
