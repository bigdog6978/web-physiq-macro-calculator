/**
 * Maps programmatic SEO macro page slugs → related Macro Academy guide slugs.
 * Edit here instead of hardcoding strips on every macro page.
 */
export const MACRO_SLUG_TO_ACADEMY_GUIDES: Record<string, string[]> = {
  "cutting-macros": ["why-macros-matter", "macros-for-fat-loss", "how-to-calculate-macros"],
  "bulking-macros": ["why-macros-matter", "macros-for-muscle-gain", "best-macro-split-for-muscle-gain"],
  "maintenance-macros": ["why-macros-matter", "macros-for-body-recomposition", "how-to-calculate-macros"],
  "keto-macros": ["keto-macros-explained", "low-carb-diet-macros"],
  "carnivore-macros": ["carnivore-macros-guide", "high-protein-diet-macros"],
  "high-protein-macros": ["why-macros-matter", "high-protein-diet-macros", "protein-per-pound"],
  "macros-for-men": ["best-macros-for-men", "macros-for-muscle-gain"],
  "macros-for-women": ["best-macros-for-women", "macros-for-fat-loss"],
  "keto-macro-calculator": ["keto-macros-explained", "macro-calculator-vs-calorie-calculator"],
  "carnivore-macro-calculator": ["carnivore-macros-guide", "high-protein-diet-macros"],
  "cutting-macro-calculator": ["macros-for-fat-loss", "macro-calculator-vs-calorie-calculator"],
  "bulking-macro-calculator": ["macros-for-muscle-gain", "best-macro-split-for-muscle-gain"],
  "high-protein-macro-calculator": ["high-protein-diet-macros", "protein-per-pound"],
};

export function getAcademyGuideSlugsForMacro(macroSlug: string): string[] {
  return MACRO_SLUG_TO_ACADEMY_GUIDES[macroSlug] ?? [];
}
