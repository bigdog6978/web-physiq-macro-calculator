import { PSMF_SOURCE_LINKS } from "@/lib/psmfContent";

const LEAD =
  "Protein-sparing modified fast (PSMF) is a short-term, aggressive deficit pattern. This calculator is for education and planning only.";

/**
 * Medical disclaimer + citations for PSMF. Shown when the user selects PSMF or views PSMF results.
 */
export function PsmfEducationPanel() {
  return (
    <div
      className="rounded-lg border border-primary/45 bg-primary-muted px-4 py-3 text-sm text-foreground space-y-3"
      role="region"
      aria-label="PSMF medical notice and sources"
    >
      <p className="font-semibold text-foreground">PSMF — read before you start</p>
      <p className="text-muted-foreground leading-relaxed">{LEAD}</p>
      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
        <li>Not medical advice. Consult a physician or registered dietitian before a very-low-calorie plan.</li>
        <li>Short-term use; monitor hydration, electrolytes, and micronutrients (often with professional guidance).</li>
        <li>
          Not appropriate for everyone—for example pregnancy, eating disorders, adolescents, or certain medications
          (list is not exhaustive).
        </li>
      </ul>
      <div>
        <p className="font-medium text-foreground mb-2">Sources &amp; further reading</p>
        <ul className="space-y-2">
          {PSMF_SOURCE_LINKS.map((s) => (
            <li key={s.href} className="text-muted-foreground">
              <a
                href={s.href}
                className="rounded-sm text-foreground underline decoration-2 decoration-primary underline-offset-2 hover:decoration-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.label}
              </a>
              <span> — {s.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
