"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics/client";

interface NewsletterSignupProps {
  source: string;
  className?: string;
}

export function NewsletterSignup({ source, className = "" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = (await res.json()) as { ok: boolean; message?: string };
      if (!data.ok) {
        setError(data.message ?? "Unable to subscribe. Please try again.");
        return;
      }

      setSubmitted(true);
      setEmail("");
      trackEvent("newsletter_submitted", { source });
    } catch {
      setError("Unable to subscribe right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className={`rounded-2xl border border-card-border bg-[#171717] p-5 sm:p-6 ${className}`}
      aria-label="Newsletter signup"
    >
      <p className="text-[11px] font-semibold uppercase tracking-widest text-primary mb-1">
        Free Macro Tips
      </p>
      <h3 className="text-lg font-bold text-white leading-snug">
        High-protein meal ideas and fat-loss strategies — weekly.
      </h3>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Practical macro coaching, nutrition tips, and meal ideas sent straight to
        your inbox. No fluff.
      </p>

      {submitted ? (
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#1f4c2e] bg-[#0d2a19] px-4 py-3.5">
          <span className="text-[#10B981] text-lg leading-none mt-0.5" aria-hidden="true">
            ✓
          </span>
          <div>
            <p className="text-sm font-semibold text-[#10B981]">You&apos;re in.</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Check your inbox — first tips coming soon.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* type="email" + required handle browser-native validation */}
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-card-border bg-input-bg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              placeholder="your@email.com"
              aria-label="Email address"
              required
              autoComplete="email"
            />
            <button
              type="submit"
              disabled={loading}
              className="shrink-0 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover active:scale-[0.97] transition-all disabled:opacity-60"
            >
              {loading ? "Subscribing…" : "Subscribe"}
            </button>
          </form>

          <p className="mt-2 text-[11px] text-[#555]">
            No spam. Unsubscribe anytime.
          </p>

          {error && (
            <p role="alert" className="mt-2 text-sm text-[#EF4444]">
              {error}
            </p>
          )}
        </>
      )}
    </section>
  );
}
