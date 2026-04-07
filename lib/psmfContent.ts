/**
 * Shared PSMF (protein-sparing modified fast) educational copy for engine notes and UI.
 * Not clinical guidance; keep tone educational.
 */

/** Modal title on the Macro Calculator eating-style card (ⓘ). */
export const PSMF_EATING_STYLE_INFO_TITLE = "About PSMF (protein-sparing)";

/**
 * Markdown body for the calculator info modal: full context + disclaimer.
 * Keep in sync with PsmfEducationPanel themes where practical.
 */
export const PSMF_EATING_STYLE_INFO_BODY = `PSMF is a **short-term, very low-calorie** pattern relative to your estimated TDEE. It **prioritizes protein** to help spare lean mass while **carbohydrates and dietary fat are kept minimal**. It is intended for **aggressive fat loss**, not for maintenance or muscle-building surpluses.

### In this calculator

Selecting PSMF adjusts sample macro targets and meal suggestions toward that pattern. This is **educational only** and **not a substitute for medical advice**.

### Before you start

- Not appropriate for everyone (for example pregnancy, eating disorders, adolescents, or certain medications—the list is not exhaustive).
- **Short-term use**; pay attention to hydration, **electrolytes**, and micronutrients—often with professional guidance.
- Consult a **physician or registered dietitian** before starting a very-low-calorie or protein-sparing plan.

### Learn more

Read the full guide: [Protein Sparing Modified Fasting (PSMF)](/guides/protein-sparing-modified-fasting).`;

export const PSMF_ENGINE_NOTES: string[] = [
  "PSMF is not medical advice. Consult a physician or registered dietitian before starting a very-low-calorie or protein-sparing plan.",
  "PSMF is intended for short-term use. Pay attention to hydration, electrolytes, and micronutrients (often with professional guidance).",
  "Not appropriate for everyone—for example pregnancy, history of eating disorders, adolescents, or certain medications (list is not exhaustive).",
];

export interface PsmfSourceLink {
  label: string;
  href: string;
  description: string;
}

/** Educational references; verify links periodically. */
export const PSMF_SOURCE_LINKS: PsmfSourceLink[] = [
  {
    label: "Peer-reviewed literature (PubMed: protein-sparing modified fast)",
    href: "https://pubmed.ncbi.nlm.nih.gov/?term=protein+sparing+modified+fast",
    description:
      "Includes historical and modern studies on protein-sparing approaches in structured weight-loss settings (e.g. work building on Blackburn and colleagues).",
  },
  {
    label: "NIHLBI — Overweight & obesity",
    href: "https://www.nhlbi.nih.gov/health/overweight-and-obesity",
    description: "General evidence-based context on obesity treatment and lifestyle change from a U.S. NIH institute.",
  },
  {
    label: "The Obesity Society",
    href: "https://www.obesity.org/",
    description: "Professional society resources on obesity science, treatment, and patient-oriented information.",
  },
  {
    label: "Academy of Nutrition and Dietetics — healthy weight",
    href: "https://www.eatright.org/health/wellness/weight-and-body-positivity",
    description: "Registered dietitian perspectives on weight and nutrition (not a PSMF protocol, but a credible general nutrition source).",
  },
];
