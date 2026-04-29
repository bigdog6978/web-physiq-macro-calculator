import { PSMF_SOURCE_LINKS } from "@/lib/psmfContent";

const LEAD =
  "Protein-sparing modified fast (PSMF) is a short-term, aggressive deficit pattern. This calculator is for education and planning only.";

/**
 * Medical disclaimer + citations for PSMF. Shown when the user selects PSMF or views PSMF results.
 */
export function PsmfEducationPanel() {
  return (
    <div
      className="psmf-education-panel rounded-lg px-4 py-3 text-sm space-y-3"
      role="region"
      aria-label="PSMF medical notice and sources"
    >
      <p className="psmf-education-panel__heading">PSMF — read before you start</p>
      <p className="psmf-education-panel__body leading-relaxed">{LEAD}</p>
      <ul className="psmf-education-panel__muted list-disc pl-5 space-y-1">
        <li>Not medical advice. Consult a physician or registered dietitian before a very-low-calorie plan.</li>
        <li>Short-term use; monitor hydration, electrolytes, and micronutrients (often with professional guidance).</li>
        <li>
          Not appropriate for everyone—for example pregnancy, eating disorders, adolescents, or certain medications
          (list is not exhaustive).
        </li>
      </ul>
      <div>
        <p className="psmf-education-panel__section-title mb-2">Sources &amp; further reading</p>
        <ul className="space-y-2">
          {PSMF_SOURCE_LINKS.map((s) => (
            <li key={s.href} className="psmf-education-panel__muted">
              <a href={s.href} target="_blank" rel="noopener noreferrer">
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
