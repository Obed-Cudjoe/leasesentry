// ---------------------------------------------------------------------------
// SECURITY NOTES (read if you're hardening this for production handoff)
//  1. Every body is validated with Zod before it reaches the database — no
//     raw user input is ever trusted. Invalid input is rejected with a 400.
//  2. The Supabase client here uses the public/anon key with row-level
//     security (RLS) enabled on the form tables. See the "Database" section of
//     the README for the CREATE TABLE statements (RNL policies).
//  3. To restrict inserts to the server only, enable RLS on each table and add
//     a policy: "allow public inserts" (or, best, keep the anon key server-side
//     only and never expose it to the browser — this route never does).
//  4. Add Supabase anti-abuse (rate limiting) at your CDN if spam becomes an
//     issue. For a local demo the local-file fallback below is enough.
// ---------------------------------------------------------------------------
import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { getSupabaseClient } from "@/lib/supabase";
import { storeLocal } from "@/lib/local-store";

// POST /api/contact — stores a contact form submission.
export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.errors[0]?.message ?? "Please check the form." },
      { status: 400 }
    );
  }
  const { name, email, message } = parsed.data;

  // Save to Supabase Postgres when configured, otherwise to a local file (demo).
  const supabase = getSupabaseClient();
  if (supabase) {
    const { error } = await supabase.from("contact_messages").insert({ name, email, message });
    if (error) {
      console.error("contact insert failed:", error.message);
      return NextResponse.json({ ok: false, error: "Could not save your message." }, { status: 500 });
    }
  } else {
    await storeLocal("contact", { name, email, message });
  }

  return NextResponse.json({ ok: true, message: "Thanks — we've got it. We'll be in touch." });
}
