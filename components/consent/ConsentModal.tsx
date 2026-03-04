"use client";

import { useEffect, useRef, useState } from "react";
import { useConsent } from "./ConsentProvider";
import type { ConsentState } from "@/lib/consent/consentTypes";
import { DEFAULT_CONSENT } from "@/lib/consent/consentTypes";

const btnBase =
  "px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF5F1F] focus:ring-offset-2 focus:ring-offset-[#0D0D0D]";

export function ConsentModal() {
  const { consent, isModalOpen, closeModal, acceptAll, rejectNonEssential, savePreferences } =
    useConsent();
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveRef = useRef<HTMLElement | null>(null);

  const current = consent ?? DEFAULT_CONSENT;

  useEffect(() => {
    if (isModalOpen) {
      setAnalytics(current.analytics);
      setAdvertising(current.advertising);
      previousActiveRef.current = document.activeElement as HTMLElement | null;
    } else {
      previousActiveRef.current?.focus?.();
    }
  }, [isModalOpen, current.analytics, current.advertising]);

  useEffect(() => {
    if (!isModalOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isModalOpen, closeModal]);

  useEffect(() => {
    if (!isModalOpen || !modalRef.current) return;
    const focusables = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    first?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    modalRef.current.addEventListener("keydown", handleKeyDown);
    return () => modalRef.current?.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  const handleSave = () => {
    savePreferences({ analytics, advertising });
  };

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      <div
        ref={modalRef}
        className="w-full max-w-md rounded-2xl border-2 border-[#2A2A2A] bg-[#1A1A1A] p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="modal-title" className="text-lg font-semibold text-white mb-4">
          Manage preferences
        </h2>

        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-white">Strictly Necessary</p>
              <p className="text-xs text-[#737373]">Required for the site to function</p>
            </div>
            <input
              type="checkbox"
              checked
              disabled
              className="h-4 w-4 rounded border-[#2A2A2A] bg-[#0D0D0D]"
              aria-label="Strictly necessary cookies (always on)"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-white">Analytics</p>
              <p className="text-xs text-[#737373]">Google Analytics</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={analytics}
              onClick={() => setAnalytics(!analytics)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                analytics ? "bg-[#FF5F1F]" : "bg-[#2A2A2A]"
              }`}
            >
              <span
                className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform ${
                  analytics ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-white">Advertising</p>
              <p className="text-xs text-[#737373]">Google Ads / AdSense</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={advertising}
              onClick={() => setAdvertising(!advertising)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                advertising ? "bg-[#FF5F1F]" : "bg-[#2A2A2A]"
              }`}
            >
              <span
                className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform ${
                  advertising ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        <p className="text-xs text-[#737373] mb-4">
          You can change your choices anytime in Cookie Preferences.
        </p>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleSave}
            className={`${btnBase} bg-[#FF5F1F] text-white hover:bg-[#ff7a3d]`}
            aria-label="Save preferences"
          >
            Save preferences
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className={`${btnBase} border-2 border-[#2A2A2A] text-[#A3A3A3] hover:border-[#3A3A3A] hover:text-white`}
            aria-label="Accept all cookies"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={rejectNonEssential}
            className={`${btnBase} border-2 border-[#2A2A2A] text-[#A3A3A3] hover:border-[#3A3A3A] hover:text-white`}
            aria-label="Reject non-essential cookies"
          >
            Reject non-essential
          </button>
        </div>
      </div>
    </div>
  );
}
