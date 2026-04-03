import Link from "next/link";

interface CalculatorCTAProps {
  className?: string;
}

export function CalculatorCTA({ className = "" }: CalculatorCTAProps) {
  return (
    <section
      className={`rounded-2xl border border-[#FF5F1F]/35 bg-[#1f1410] p-6 ${className}`}
      aria-labelledby="calculator-cta-heading"
    >
      <h2 id="calculator-cta-heading" className="text-lg font-bold text-white mb-2">
        Try the free macro calculator
      </h2>
      <p className="text-sm text-[#A3A3A3] mb-4 leading-relaxed">
        Set calories and macros for your goal in seconds—no signup required.
      </p>
      <Link
        href="/#calculator"
        className="inline-flex items-center justify-center rounded-xl bg-[#FF5F1F] px-5 py-2.5 text-sm font-semibold text-black hover:bg-[#ff7a3d] transition-colors"
      >
        Open calculator
      </Link>
    </section>
  );
}
