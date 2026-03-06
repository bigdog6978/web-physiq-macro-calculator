"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics/client";

interface ComingSoonModalProps {
  open: boolean;
  onClose: () => void;
}

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ComingSoonModal({ open, onClose }: ComingSoonModalProps) {
  const [notified, setNotified] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const primaryButtonRef = useRef<HTMLButtonElement>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  // Keep a stable ref to onClose so the keydown/focus effects don't need
  // it as a dependency — avoids re-running on every render when an inline
  // arrow is passed as onClose.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Focus management: capture returning focus point on open,
  // restore it on close, focus primary action immediately.
  useEffect(() => {
    if (!open) return;
    lastActiveRef.current = document.activeElement as HTMLElement | null;
    primaryButtonRef.current?.focus();
    return () => {
      lastActiveRef.current?.focus();
    };
  }, [open]);

  // ESC close + focus trap — stable because onClose accessed via ref.
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        fireClose("esc");
        return;
      }

      if (e.key === "Tab") {
        const focusable = Array.from(
          modalRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const fireClose = (trigger: "button" | "backdrop" | "esc") => {
    trackEvent("coming_soon_modal_dismissed", { trigger });
    onCloseRef.current();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="coming-soon-title"
      aria-describedby="coming-soon-description"
    >
      {/* Backdrop — aria-hidden so screen readers skip it; keyboard handled by ESC */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/55 backdrop-blur-[1px] motion-safe:animate-in motion-safe:fade-in motion-safe:duration-150"
        onClick={() => fireClose("backdrop")}
      />

      <div
        ref={modalRef}
        className="relative z-[81] w-full max-w-md rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6 shadow-2xl motion-safe:animate-in motion-safe:zoom-in-95 motion-safe:fade-in motion-safe:duration-150"
      >
        <h3 id="coming-soon-title" className="text-xl font-bold text-white">
          Android App Coming Soon
        </h3>

        <p
          id="coming-soon-description"
          className="mt-3 text-sm leading-relaxed text-[#B5B5B5]"
        >
          The Physiq Android app is currently under review in the Google Play
          Store.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[#B5B5B5]">
          Sign up below to be notified when it launches, or check back soon.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          {notified ? (
            <p className="flex items-center gap-1.5 text-sm text-[#FF5F1F] sm:mr-auto">
              <span aria-hidden="true">✓</span> We'll let you know when it's
              live!
            </p>
          ) : (
            <button
              type="button"
              onClick={() => setNotified(true)}
              className="inline-flex items-center justify-center rounded-xl border border-[#2A2A2A] px-4 py-2.5 text-sm font-semibold text-[#B5B5B5] hover:border-[#3A3A3A] hover:text-white transition-colors"
            >
              Notify Me
            </button>
          )}

          <button
            ref={primaryButtonRef}
            type="button"
            onClick={() => fireClose("button")}
            className="inline-flex items-center justify-center rounded-xl bg-[#FF5F1F] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#ff7a3d] transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
