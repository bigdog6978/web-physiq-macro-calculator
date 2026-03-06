import { NextResponse } from "next/server";
import { z } from "zod";
import { getNewsletterProvider } from "@/lib/newsletter/provider";

const payloadSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  source: z.string().min(1).max(80),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = payloadSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          message: parsed.error.issues[0]?.message ?? "Invalid request payload.",
        },
        { status: 400 }
      );
    }

    const provider = getNewsletterProvider();
    const result = await provider.subscribe(parsed.data);
    return NextResponse.json(result, { status: result.ok ? 200 : 500 });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Unable to process newsletter signup right now." },
      { status: 500 }
    );
  }
}
