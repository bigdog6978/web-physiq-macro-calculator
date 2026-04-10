"use client";

import { useEffect, useState } from "react";
import { AppConversionCTA } from "@/components/cta/AppConversionCTA";
import { AppScreenshotCarousel } from "@/components/get-the-app/AppScreenshotCarousel";

const LIGHT_HERO_BG = "/background/ltmdbckgd.png";

const FEATURES = [
  "Save macro targets from the web calculator and track against them daily",
  "Log meals in seconds with a fast, focused food flow",
  "See protein, carbs, and fat at a glance—stay aligned with your goal",
  "Built for consistency: simple enough to use every day",
] as const;

export default function GetTheAppPage() {
  const [darkHeroBackgroundImage, setDarkHeroBackgroundImage] = useState(
    "/background/bkgd1.png"
  );

  useEffect(() => {
    const backgrounds = ["/background/bkgd1.png", "/background/bkgd2.png"] as const;
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    const t = window.setTimeout(() => {
      setDarkHeroBackgroundImage(backgrounds[randomIndex]);
    }, 0);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-b from-muted to-background dark:from-[#2D2D2D] dark:to-black">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 dark:hidden"
        style={{ backgroundImage: `url('${LIGHT_HERO_BG}')` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden bg-cover bg-center bg-no-repeat opacity-25 dark:block"
        style={{ backgroundImage: `url('${darkHeroBackgroundImage}')` }}
      />
      <div className="relative z-10 mx-auto max-w-3xl px-4 py-8 pb-12">
        <header className="rounded-2xl border-2 border-primary/50 bg-card p-6 shadow-sm dark:shadow-none">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">
            Physiq Macro Tracker App
          </p>
          <h1 className="mt-1 text-2xl font-bold text-foreground leading-snug sm:text-3xl">
            Calculate here. Track daily in Physiq: Macro Tracker.
          </h1>
          <p className="mt-2 text-base text-muted-foreground leading-relaxed">
            Save your macro targets and track your food in seconds.
          </p>

          <AppScreenshotCarousel />
        </header>

        <div className="mt-10 space-y-6">
          <p className="text-base leading-relaxed text-muted-foreground">
            The free calculator on the web sets your calories and macros. Physiq Macro
            Tracker is where you execute—lightweight logging, clear progress, and targets
            that stay front and center.
          </p>
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              Why athletes and busy people use Physiq
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              {FEATURES.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <AppConversionCTA
          placement="bottom_page"
          pageType="marketing"
          showStoreButtons
          className="mt-10"
        />
      </div>
    </div>
  );
}
