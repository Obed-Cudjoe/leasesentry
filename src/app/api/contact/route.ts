// ---------------------------------------------------------------------------
// POST /api/contact — stores a contact form submission.
//
// SECURITY NOTES (read if you're hardening this for production handoff)
//  1. Every body is validated with Zod before it reaches the database — no
//     raw user input is ever trusted. Invalid input is rejected with a 400.
//  2. Storage backend: Turso (edge SQLite) when TURSO_DATABASE_URL +
//     TURSO_AUTH_TOKEN are set; otherwise a local JSON file (demo mode).
//     Both run on free tiers — nothing here is a paid service.
//  3. Turso connects over HTTP with a scoped auth token (never expose the
//     token to the browser — this route is server-only). Scope the token to
//     the single database, and rotate it if leaked.
//  4. Add rate limiting at your CDN (Netlify) if spam becomes an issue.
// ---------------------------------------------------------------------------
import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { insertContact, tursoConfigured } from "@/lib/turso";
import { storeLocal } from "@/lib/local-store";

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

  if (tursoConfigured) {
    // Real database configured. A failure here is an actual error — surface a
    // readable message (and log the cause) rather than an empty 500.
    try {
      await insertContact({ name, email, message });
    } catch (e) {
      console.error("contact/turso store failed:", e);
      return NextResponse.json(
        { ok: false, error: "We couldn't save your message right now. Please try again." },
        { status: 500 }
      );
    }
  } else {
    // Demo mode (no Turso creds) — write to a local file so submissions record.
    await storeLocal("contact", { name, email, message });
  }

  return NextResponse.json({ ok: true, message: "Thanks — we've got it. We'll be in touch." });
}
