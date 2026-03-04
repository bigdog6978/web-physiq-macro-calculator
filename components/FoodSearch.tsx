"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { USDAFood } from "@/types/macro";

export function FoodSearch() {
  const [query, setQuery] = useState("");
  const [foods, setFoods] = useState<USDAFood[]>([]);
  const [branded, setBranded] = useState<USDAFood[]>([]);
  const [brandedCount, setBrandedCount] = useState(0);
  const [showBranded, setShowBranded] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const search = useCallback(async (q: string) => {
    if (!q.trim()) {
      setFoods([]);
      setBranded([]);
      setBrandedCount(0);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/usda/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      if (res.ok) {
        setFoods(data.foods ?? []);
        setBranded(data.branded ?? []);
        setBrandedCount(data.brandedCount ?? 0);
      } else {
        setFoods([]);
        setBranded([]);
        setBrandedCount(0);
      }
    } catch {
      setFoods([]);
      setBranded([]);
      setBrandedCount(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      search(query);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, search]);

  const displayFoods = showBranded ? [...foods, ...branded] : foods;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-[#F5F5F5]">
        USDA Food Database
      </h2>
      <p className="text-sm text-[#A3A3A3]">
        Search any food to see macros per 100g. Generic foods are prioritized.
      </p>

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="e.g. eggs, chicken breast, strip steak"
        className="w-full rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-3 text-base text-[#F5F5F5] placeholder-[#525252] focus:border-[#FF5F1F] focus:ring-1 focus:ring-[#FF5F1F] focus:outline-none"
        aria-label="Search foods"
      />

      {loading && (
        <p className="text-sm text-[#737373]">Searching...</p>
      )}

      {!loading && query && (
        <>
          <ul className="space-y-2">
            {displayFoods.length === 0 ? (
              <li className="text-sm text-[#737373]">No results found.</li>
            ) : (
              displayFoods.map((food) => (
                <li
                  key={food.fdcId}
                  className="rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] p-3 text-sm"
                >
                  <div className="font-medium text-[#F5F5F5]">{food.description}</div>
                  <div className="mt-1 text-[#A3A3A3]">
                    Per 100g: {food.nutrients.calories} cal · P
                    {food.nutrients.protein}g · C{food.nutrients.carbs}g · F
                    {food.nutrients.fat}g
                  </div>
                  {food.servingSize && food.servingSizeUnit && (
                    <div className="mt-0.5 text-[#737373] text-xs">
                      Serving: {food.servingSize} {food.servingSizeUnit}
                    </div>
                  )}
                  <span className="inline-block mt-1 text-xs text-[#525252]">
                    {food.dataType}
                  </span>
                </li>
              ))
            )}
          </ul>

          {brandedCount > 0 && !showBranded && (
            <button
              type="button"
              onClick={() => setShowBranded(true)}
              className="text-sm text-[#FF5F1F] hover:text-[#ff7a3d] font-medium"
              aria-expanded={showBranded}
            >
              Show {brandedCount} branded result{brandedCount !== 1 ? "s" : ""}
            </button>
          )}
        </>
      )}
    </div>
  );
}
