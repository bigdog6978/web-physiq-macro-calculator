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

/** Server-rendered accordion. Uses native <details> — zero client JS required. */
export function FAQ() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          Frequently Asked Questions
        </h2>
        <div className="space-y-2">
          {FAQ_ITEMS.map((item, idx) => (
            <details
              key={idx}
              className="group rounded-lg border border-card-border bg-card transition-colors hover:border-primary/60 open:border-primary/60 open:bg-primary-muted/50"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 font-medium text-foreground transition-colors select-none hover:bg-primary-muted/40">
                {item.q}
                <span
                  className="text-muted-foreground ml-4 shrink-0 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                >
                  ▼
                </span>
              </summary>
              <p className="px-4 pb-4 pt-1 text-sm text-muted-foreground leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </>
  );
}
