import { normalizeUserProfile } from "@/lib/profile";
import type { UserProfile } from "@/types/macro";

const PROFILE_STORAGE_KEY = "physiq_macro_profile";

export function loadStoredProfile(): UserProfile | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return null;
    return normalizeUserProfile(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function saveStoredProfile(profile: UserProfile): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // Swallow storage failures so calculation continues even in restricted browsers.
  }
}
