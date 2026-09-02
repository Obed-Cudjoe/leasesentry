// ---------------------------------------------------------------------------
// POST /api/newsletter — adds a subscriber. Email is unique (one row per address).
// Validated with Zod; stored in Turso (edge SQLite) or a local file (demo).
// ---------------------------------------------------------------------------
import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validation";
import { insertNewsletter } from "@/lib/turso";
import { storeLocal } from "@/lib/local-store";

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

  // Turso's unique constraint + ON CONFLICT DO NOTHING keeps one row per email.
  const stored = await insertNewsletter({ email });
  if (!stored) {
    await storeLocal("newsletter", { email });
  }

  return NextResponse.json({ ok: true, message: "You're on the list!" });
}
