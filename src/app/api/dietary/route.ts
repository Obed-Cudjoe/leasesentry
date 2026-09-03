// ---------------------------------------------------------------------------
// POST /api/dietary — stores a dietary / allergen enquiry.
// Validated with Zod; stored in Turso (edge SQLite) or a local file (demo).
// ---------------------------------------------------------------------------
import { NextResponse } from "next/server";
import { dietarySchema } from "@/lib/validation";
import { insertDietary, tursoConfigured } from "@/lib/turso";
import { storeLocal } from "@/lib/local-store";

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = dietarySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.errors[0]?.message ?? "Please check the form." },
      { status: 400 }
    );
  }
  const { name, email, allergens, question } = parsed.data;

  if (tursoConfigured) {
    try {
      await insertDietary({ name, email, allergens, question });
    } catch (e) {
      console.error("dietary/turso store failed:", e);
      return NextResponse.json(
        { ok: false, error: "We couldn't save your enquiry right now. Please try again." },
        { status: 500 }
      );
    }
  } else {
    await storeLocal("dietary", { name, email, allergens, question });
  }

  return NextResponse.json({ ok: true, message: "Thanks — we'll reply within a day." });
}
