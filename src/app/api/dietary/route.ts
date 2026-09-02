import { NextResponse } from "next/server";
import { dietarySchema } from "@/lib/validation";
import { getSupabaseClient } from "@/lib/supabase";
import { storeLocal } from "@/lib/local-store";

// POST /api/dietary — stores a dietary / allergen enquiry.
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

  const supabase = getSupabaseClient();
  if (supabase) {
    const { error } = await supabase
      .from("dietary_enquiries")
      .insert({ name, email, allergens, question });
    if (error) {
      console.error("dietary insert failed:", error.message);
      return NextResponse.json({ ok: false, error: "Could not save your enquiry." }, { status: 500 });
    }
  } else {
    await storeLocal("dietary", { name, email, allergens, question });
  }

  return NextResponse.json({ ok: true, message: "Thanks — we'll reply within a day." });
}
