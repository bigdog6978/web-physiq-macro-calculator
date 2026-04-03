"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { X } from "lucide-react";
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
  const hasResults = query.trim().length > 0;

  const handleCloseResults = useCallback(() => {
    setQuery("");
    setFoods([]);
    setBranded([]);
    setBrandedCount(0);
    setShowBranded(false);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            USDA Food Database
          </h2>
          <p className="text-sm text-muted-foreground">
            Search any food to see macros per 100g. Generic foods are prioritized.
          </p>
        </div>
        {hasResults && (
          <button
            type="button"
            onClick={handleCloseResults}
            className="flex shrink-0 items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-white transition-colors"
            aria-label="Close search results"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="e.g. eggs, chicken breast, strip steak"
        className="w-full rounded-lg border border-card-border bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
        aria-label="Search foods"
      />

      {loading && (
        <p className="text-sm text-muted-foreground">Searching...</p>
      )}

      {!loading && query && (
        <>
          <ul className="space-y-2">
            {displayFoods.length === 0 ? (
              <li className="text-sm text-muted-foreground">No results found.</li>
            ) : (
              displayFoods.map((food) => (
                <li
                  key={food.fdcId}
                  className="rounded-lg border border-card-border bg-card p-3 text-sm"
                >
                  <div className="font-medium text-foreground">{food.description}</div>
                  <div className="mt-1 text-muted-foreground">
                    Per 100g: {food.nutrients.calories} cal · P
                    {food.nutrients.protein}g · C{food.nutrients.carbs}g · F
                    {food.nutrients.fat}g
                  </div>
                  {food.servingSize && food.servingSizeUnit && (
                    <div className="mt-0.5 text-muted-foreground text-xs">
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
              className="text-sm text-primary hover:text-primary/90 font-medium"
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
