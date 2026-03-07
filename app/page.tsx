"use client";

import { useEffect, useRef, useState } from "react";
import { MacroCalculator } from "@/components/MacroCalculator";
import { ResultsSummary } from "@/components/ResultsSummary";
import { MealPlan } from "@/components/MealPlan";
import { FoodSearch } from "@/components/FoodSearch";
import { FAQ } from "@/components/FAQ";
import { AdSlot } from "@/components/AdSlot";
import { AppConversionCTA } from "@/components/cta/AppConversionCTA";
import { PostResultsContinuation } from "@/components/cta/PostResultsContinuation";
// AppCTA unused directly here — AppConversionCTA used instead
import type { MacroResult } from "@/types/macro";

export default function Home() {
  const [result, setResult] = useState<MacroResult | null>(null);
  const [heroBackgroundImage, setHeroBackgroundImage] = useState(
    "/background/bkgd1.png"
  );
  const calculatorRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const backgrounds = ["/background/bkgd1.png", "/background/bkgd2.png"] as const;
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    setHeroBackgroundImage(backgrounds[randomIndex]);
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
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-[#2D2D2D] to-[#000000]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
          style={{ backgroundImage: `url('${heroBackgroundImage}')` }}
        />
        <div className="relative z-10 mx-auto max-w-2xl px-4 py-8">
      {/* Header: deliver the value proposition, let users get straight to the calculator */}
      <header className="mb-8 text-left">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Calculate Your Daily Macros
        </h1>
        <p className="mt-2 text-lg text-[#A3A3A3]">
          Get personalized calorie and macro targets based on your body, goal, and diet strategy.
        </p>
      </header>

      <AppConversionCTA placement="hero" pageType="home" showStoreButtons className="mb-8" />

      <section
        id="calculator"
        ref={calculatorRef}
        className="rounded-2xl border-2 border-[#FF5F1F]/60 bg-[#1A1A1A] p-6 mb-8"
      >
        <MacroCalculator onResult={handleResult} analyticsContext={{ page_type: "home" }} />
      </section>

      {/* Results + post-results CTA appear only after a calculation */}
      {result && (
        <section ref={resultsRef} className="space-y-10 mb-12">
          <ResultsSummary result={result} />
          <MealPlan result={result} />
          <PostResultsContinuation />
        </section>
      )}

          <section className="rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-6 mb-10">
            <FoodSearch />
          </section>
        </div>
      </div>

      <div className="bg-[#000000]">
        <div className="mx-auto max-w-2xl px-4 pb-8">
      <p className="text-center text-sm text-[#737373] mb-10 pt-8">
        Based on Mifflin-St Jeor Equation and widely accepted macro guidelines.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-[#F5F5F5] mb-4">
          How Are Macros Calculated?
        </h2>
        <div className="max-w-none text-[#A3A3A3] space-y-3">
          <p>
            We use the <strong className="text-[#F5F5F5]">Mifflin-St Jeor equation</strong> to estimate
            your basal metabolic rate (BMR)—the calories your body burns at
            rest. BMR depends on your weight, height, age, and gender.
          </p>
          <p>
            Your <strong className="text-[#F5F5F5]">TDEE</strong> (Total Daily Energy Expenditure) is BMR
            multiplied by an activity factor—sedentary (1.2), light (1.375),
            moderate (1.55), or very active (1.725). This is your maintenance
            calories.
          </p>
          <p>
            <strong className="text-[#F5F5F5]">Goal adjustments</strong> are applied to TDEE: cut fat
            (-15%), build muscle (+10%), maintain (0%), or body recomp (-5% or
            maintenance if body fat is low). Your chosen <strong className="text-[#F5F5F5]">macro
            strategy</strong> (high protein, keto, carnivore, etc.) then splits
            the remaining calories between protein, carbs, and fat.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-[#F5F5F5] mb-4">
          Macro Calculator for Different Goals
        </h2>
        <div className="space-y-6 text-[#A3A3A3]">
          <div>
            <h3 className="font-medium text-[#F5F5F5]">Fat Loss Macros</h3>
            <p className="text-sm mt-1">
              A 15% calorie deficit with adequate protein (0.9–1.1g per lb)
              helps you lose fat while preserving muscle. Choose a strategy like
              high protein or low carb based on preference.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-[#F5F5F5]">Muscle Gain Macros</h3>
            <p className="text-sm mt-1">
              A 10% surplus supports muscle growth. Prioritize protein (1.0–1.1g
              per lb) and enough carbs for training. Performance or high protein
              strategies work well.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-[#F5F5F5]">Body Recomposition Macros</h3>
            <p className="text-sm mt-1">
              A slight deficit (-5%) or maintenance lets you build muscle and lose
              fat. Best for beginners. If body fat is very low (under 15% male /
              23% female), we use maintenance.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-[#F5F5F5]">Keto Macro Calculator</h3>
            <p className="text-sm mt-1">
              Keto keeps carbs under 5% of remaining calories and fat high (65%).
              Protein is moderate. Use the Keto strategy for this split.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-[#F5F5F5]">Carnivore Macro Calculator</h3>
            <p className="text-sm mt-1">
              Carnivore sets carbs to zero and allocates 70% of remaining
              calories to fat. Protein comes from animal foods only.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-[#F5F5F5]">Mediterranean Macros</h3>
            <p className="text-sm mt-1">
              Mediterranean uses 35% fat and 40% carbs of remaining calories,
              with moderate protein. Emphasizes olive oil, fish, and whole
              grains.
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
