"use client";

import Image from "next/image";
import { useCallback, useRef, type KeyboardEvent } from "react";
import { trackEvent } from "@/lib/analytics/client";
import { STORE_LINKS } from "@/lib/config/storeLinks";

const SLIDES = [
  "/sidebar/sidebar1.png",
  "/sidebar/sidebar2.png",
  "/sidebar/sidebar3.png",
  "/sidebar/sidebar4.png",
  "/sidebar/sidebar5.png",
  "/sidebar/sidebar6.png",
] as const;

const IMG_W = 1242;
const IMG_H = 2688;

const SCROLLER_ID = "get-app-carousel-scroller";

export function AppScreenshotCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBySlide = useCallback((direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>("[data-carousel-slide]");
    const step = slide ? slide.offsetWidth + 16 : 280;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  const onCarouselKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollBySlide(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollBySlide(1);
      }
    },
    [scrollBySlide]
  );

  const handleStoreClick = () => {
    trackEvent("app_store_click", {
      page_type: "marketing",
      page_family: "core",
      placement: "get_the_app_carousel",
    });
  };

  return (
    <section
      className="mt-6"
      aria-roledescription="carousel"
      aria-labelledby="get-app-carousel-heading"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 id="get-app-carousel-heading" className="text-sm font-semibold text-foreground">
          App screenshots
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            className="inline-flex h-10 min-w-10 items-center justify-center rounded-lg border border-card-border bg-muted text-lg font-semibold text-foreground hover:border-primary/50 hover:bg-primary-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Show previous screenshots"
            aria-controls={SCROLLER_ID}
            onClick={() => scrollBySlide(-1)}
          >
            ‹
          </button>
          <button
            type="button"
            className="inline-flex h-10 min-w-10 items-center justify-center rounded-lg border border-card-border bg-muted text-lg font-semibold text-foreground hover:border-primary/50 hover:bg-primary-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Show next screenshots"
            aria-controls={SCROLLER_ID}
            onClick={() => scrollBySlide(1)}
          >
            ›
          </button>
        </div>
      </div>

      <div
        id={SCROLLER_ID}
        ref={scrollerRef}
        tabIndex={0}
        role="group"
        aria-label="Swipe or use arrow keys to browse screenshots. Each opens the App Store."
        onKeyDown={onCarouselKeyDown}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background [&::-webkit-scrollbar]:hidden"
      >
        {SLIDES.map((src) => (
          <a
            key={src}
            data-carousel-slide
            href={STORE_LINKS.ios}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleStoreClick}
            aria-label="Open Physiq on the App Store"
            className="group snap-start shrink-0 overflow-hidden rounded-xl border-2 border-primary bg-card p-1.5 shadow-lg transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-xl dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] w-[min(85vw,220px)] sm:w-[min(42vw,240px)] lg:w-[calc((100%-2rem)/3)]"
          >
            <Image
              src={src}
              alt=""
              width={IMG_W}
              height={IMG_H}
              className="h-auto w-full rounded-lg shadow-md transition duration-200 group-hover:brightness-[1.05]"
              sizes="(max-width: 1023px) 85vw, (max-width: 1280px) 30vw, 260px"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
