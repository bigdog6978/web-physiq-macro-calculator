"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "What are macros?",
    a: "Macros (macronutrients) are the three main nutrients that provide calories: protein, carbohydrates, and fat. Tracking macros helps you hit specific nutrition targets for goals like fat loss, muscle gain, or maintenance.",
  },
  {
    q: "How many macros should I eat to lose fat?",
    a: "For fat loss, a moderate calorie deficit (about 15% below your TDEE) with adequate protein (around 0.9–1.1g per lb body weight) helps preserve muscle. Carbs and fat can be split based on your preference—low carb, balanced, or low fat.",
  },
  {
    q: "What is TDEE?",
    a: "TDEE (Total Daily Energy Expenditure) is the total calories you burn per day, including your basal metabolic rate (BMR) and activity. It's used as the baseline to set calorie targets for cutting, maintaining, or building.",
  },
  {
    q: "How much protein per pound of body weight?",
    a: "General guidelines: 0.7–1.0g per lb for maintenance, 0.9–1.1g per lb for muscle gain or fat loss. If you know your lean body mass, 1.0g per lb of LBM is a solid target.",
  },
  {
    q: "Is keto good for fat loss?",
    a: "Keto can support fat loss by reducing appetite and keeping carbs very low (typically under 50g/day). It works for some people, but it's not required—a balanced deficit can be equally effective. Choose what you can sustain.",
  },
  {
    q: "What is body recomposition?",
    a: "Body recomposition means building muscle while losing fat at the same time. It typically works best with a slight calorie deficit or maintenance, adequate protein, and resistance training. It's more achievable for beginners or those returning to training.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[#F5F5F5]">
          Frequently Asked Questions
        </h2>
        <div className="space-y-2">
          {FAQ_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-4 py-3 text-left font-medium text-[#F5F5F5] flex justify-between items-center hover:bg-[#242424] transition-colors"
                aria-expanded={openIndex === idx}
                aria-controls={`faq-answer-${idx}`}
                id={`faq-question-${idx}`}
              >
                {item.q}
                <span
                  className={`text-[#737373] transition-transform ${
                    openIndex === idx ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>
              <div
                id={`faq-answer-${idx}`}
                role="region"
                aria-labelledby={`faq-question-${idx}`}
                className={`px-4 pb-3 text-sm text-[#A3A3A3] ${
                  openIndex === idx ? "block" : "hidden"
                }`}
              >
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
