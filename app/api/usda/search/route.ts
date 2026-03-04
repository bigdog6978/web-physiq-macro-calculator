import { NextRequest, NextResponse } from "next/server";
import { scoreAndRankFoods } from "@/lib/usdaRanker";

const USDA_BASE = "https://api.nal.usda.gov/fdc/v1";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();

  if (!q || q.length < 2) {
    return NextResponse.json(
      { error: "Query must be at least 2 characters" },
      { status: 400 }
    );
  }

  const apiKey = process.env.USDA_FDC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "USDA API key not configured" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(`${USDA_BASE}/foods/search?api_key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: q,
        pageSize: 50,
        pageNumber: 1,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[USDA] API error:", res.status, text);
      return NextResponse.json(
        { error: "USDA API request failed" },
        { status: 502 }
      );
    }

    const data = (await res.json()) as {
      foods?: Array<{
        fdcId: number;
        description: string;
        dataType: string;
        brandOwner?: string;
        servingSize?: number;
        servingSizeUnit?: string;
        foodNutrients: Array<{ nutrientId: number; value: number }>;
      }>;
    };

    const rawFoods = data.foods ?? [];
    const { generic, branded } = scoreAndRankFoods(rawFoods, q);

    return NextResponse.json({
      foods: generic,
      branded,
      brandedCount: branded.length,
    });
  } catch (err) {
    console.error("[USDA] Search error:", err);
    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 }
    );
  }
}
