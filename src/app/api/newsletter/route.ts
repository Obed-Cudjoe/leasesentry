import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validation";
import { getSupabaseClient } from "@/lib/supabase";
import { storeLocal } from "@/lib/local-store";

// POST /api/newsletter — adds a subscriber. Email is unique (one row per address).
export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.errors[0]?.message ?? "Please add a valid email." },
      { status: 400 }
    );
  }
  const { email } = parsed.data;

  const supabase = getSupabaseClient();
  if (supabase) {
    // Upsert keeps one row per email (handles the unique constraint gracefully).
    const { error } = await supabase
      .from("newsletter_subscribers")
      .upsert({ email }, { onConflict: "email" });
    if (error) {
      console.error("newsletter insert failed:", error.message);
      return NextResponse.json({ ok: false, error: "Could not save your email." }, { status: 500 });
    }
  } else {
    await storeLocal("newsletter", { email });
  }

  return NextResponse.json({ ok: true, message: "You're on the list!" });
}
