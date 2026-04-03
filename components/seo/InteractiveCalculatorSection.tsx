"use client";

import { useState } from "react";
import { MacroCalculator } from "@/components/MacroCalculator";
import { ResultsSummary } from "@/components/ResultsSummary";
import { MealPlan } from "@/components/MealPlan";
import type { MacroResult } from "@/types/macro";
import type { SEOPageConfig } from "@/lib/seo/types";

interface InteractiveCalculatorSectionProps {
  initialValues: SEOPageConfig;
  analyticsContext?: {
    page_type: string;
    landing_slug?: string;
    seo_page_type?: string;
  };
}

export function InteractiveCalculatorSection({
  initialValues,
  analyticsContext,
}: InteractiveCalculatorSectionProps) {
  const [result, setResult] = useState<MacroResult | null>(null);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-card-border bg-card p-6">
        <MacroCalculator
          onResult={setResult}
          initialValues={initialValues}
          analyticsContext={analyticsContext}
        />
      </div>
      {result && (
        <div className="space-y-4">
          <ResultsSummary result={result} />
          <MealPlan result={result} />
        </div>
      )}
    </div>
  );
}
