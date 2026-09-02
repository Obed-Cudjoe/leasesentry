// ------------------------------------------------------------------
// Supabase (free-tier PostgreSQL) client for form submissions.
// Uses the public "anon" key from env vars. In local/demo mode when
// no key is set, forms fall back to a local file so they still work
// and you can see submissions recorded.
// ------------------------------------------------------------------

import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_ANON_KEY;

/** True when real Supabase credentials are configured. */
export const supabaseConfigured = Boolean(url && key);

/**
 * Returns the server-side Supabase client, or null if not configured.
 * Callers should fall back to local storage when this returns null.
 */
export function getSupabaseClient() {
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}
