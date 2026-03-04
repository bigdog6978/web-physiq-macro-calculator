"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ConsentState } from "@/lib/consent/consentTypes";
import { DEFAULT_CONSENT } from "@/lib/consent/consentTypes";
import { getConsent, setConsent } from "@/lib/consent/consentStorage";
import { applyConsentToGoogle, initConsentDefault } from "@/lib/consent/consentGoogle";

interface ConsentContextValue {
  consent: ConsentState | null;
  hasConsented: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (partial: Partial<Pick<ConsentState, "analytics" | "advertising">>) => void;
  openModal: () => void;
  closeModal: () => void;
  isModalOpen: boolean;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent must be used within ConsentProvider");
  }
  return ctx;
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsentState] = useState<ConsentState | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const sync = () => {
      const stored = getConsent();
      setConsentState(stored);
      if (stored) {
        applyConsentToGoogle(stored);
      } else {
        initConsentDefault();
      }
    };
    sync();
    window.addEventListener("consentChanged", sync);
    return () => window.removeEventListener("consentChanged", sync);
  }, [mounted]);

  const persistAndApply = useCallback((state: ConsentState) => {
    setConsent(state);
    setConsentState(state);
    applyConsentToGoogle(state);
  }, []);

  const acceptAll = useCallback(() => {
    persistAndApply({
      ...DEFAULT_CONSENT,
      analytics: true,
      advertising: true,
    });
    setIsModalOpen(false);
  }, [persistAndApply]);

  const rejectNonEssential = useCallback(() => {
    persistAndApply({
      ...DEFAULT_CONSENT,
      analytics: false,
      advertising: false,
    });
    setIsModalOpen(false);
  }, [persistAndApply]);

  const savePreferences = useCallback(
    (partial: Partial<Pick<ConsentState, "analytics" | "advertising">>) => {
      const current = consent ?? DEFAULT_CONSENT;
      persistAndApply({
        ...current,
        analytics: partial.analytics ?? current.analytics,
        advertising: partial.advertising ?? current.advertising,
      });
      setIsModalOpen(false);
    },
    [consent, persistAndApply]
  );

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const value: ConsentContextValue = {
    consent,
    hasConsented: consent !== null,
    acceptAll,
    rejectNonEssential,
    savePreferences,
    openModal,
    closeModal,
    isModalOpen,
  };

  return (
    <ConsentContext.Provider value={value}>
      {children}
    </ConsentContext.Provider>
  );
}
