"use client";

import { ConsentBanner } from "./ConsentBanner";
import { ConsentModal } from "./ConsentModal";

export function ConsentUI() {
  return (
    <>
      <ConsentBanner />
      <ConsentModal />
    </>
  );
}
