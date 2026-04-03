import Link from "next/link";

interface CalculatorCTAProps {
  className?: string;
}

export function CalculatorCTA({ className = "" }: CalculatorCTAProps) {
  return (
    <section
      className={`rounded-2xl border border-primary/35 bg-primary-muted/50 p-6 shadow-sm dark:bg-primary-muted/30 ${className}`}
      aria-labelledby="calculator-cta-heading"
    >
      <h2 id="calculator-cta-heading" className="text-lg font-bold text-foreground mb-2">
        Try the free macro calculator
      </h2>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Set calories and macros for your goal in seconds—no signup required.
      </p>
      <Link
        href="/#calculator"
        className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-hover transition-colors"
      >
        Open calculator
      </Link>
    </section>
  );
}
