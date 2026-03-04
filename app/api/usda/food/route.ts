import { NextRequest, NextResponse } from "next/server";

const USDA_BASE = "https://api.nal.usda.gov/fdc/v1";

function extractNutrient(
  nutrients: Array<{ nutrientId: number; value: number }>,
  id: number
): number {
  const n = nutrients.find((n) => n.nutrientId === id);
  return n ? Math.round(n.value * 10) / 10 : 0;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Food ID required" },
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
    const res = await fetch(
      `${USDA_BASE}/food/${id}?api_key=${apiKey}`
    );

    if (!res.ok) {
      if (res.status === 404) {
        return NextResponse.json(
          { error: "Food not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: "USDA API request failed" },
        { status: 502 }
      );
    }

    const data = (await res.json()) as {
      fdcId: number;
      description: string;
      dataType: string;
      brandOwner?: string;
      servingSize?: number;
      servingSizeUnit?: string;
      foodNutrients: Array<{ nutrientId: number; value: number }>;
    };

    const nutrients = data.foodNutrients ?? [];

    return NextResponse.json({
      fdcId: data.fdcId,
      description: data.description,
      dataType: data.dataType,
      brandOwner: data.brandOwner,
      servingSize: data.servingSize,
      servingSizeUnit: data.servingSizeUnit,
      nutrients: {
        calories: extractNutrient(nutrients, 1008),
        protein: extractNutrient(nutrients, 1003),
        carbs: extractNutrient(nutrients, 1005),
        fat: extractNutrient(nutrients, 1004),
        fiber: extractNutrient(nutrients, 1079),
        sugar: extractNutrient(nutrients, 2000),
        sodium: extractNutrient(nutrients, 1093),
      },
    });
  } catch (err) {
    console.error("[USDA] Food fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch food" },
      { status: 500 }
    );
  }
}
