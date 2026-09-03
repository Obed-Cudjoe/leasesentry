// ---------------------------------------------------------------------------
// Turso (free-tier, edge SQLite / libSQL) — form submission storage.
// https://turso.tech — free plan: ~5 GB, hundreds of millions of row reads.
//
// IMPORTANT: we talk to Turso over its plain HTTP API (POST /v2/pipeline)
// using the global `fetch`. We deliberately do NOT use @libsql/client here:
// Netlify's function bundler could not load that package's Node entry (it pulls
// in a native libsql binary that crashes at runtime → empty HTTP 500). Plain
// fetch has zero native dependencies and runs identically on Netlify, Vercel,
// or any serverless runtime. `fetch` is globally available in Node 18+.
//
// When Turso credentials are missing (local/demo), callers fall back to the
// local JSON store so the forms still record data.
// ---------------------------------------------------------------------------

import type { ContactInput, DietaryInput, NewsletterInput } from "./validation";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

/** True when real Turso credentials are configured. */
export const tursoConfigured = Boolean(url && authToken);

// libsql://host → https://host, so we can hit the HTTP API on the same host.
function httpBase(): string | null {
  if (!url || !authToken) return null;
  return url.replace(/^libsql:\/\//i, "https://").replace(/\/+$/, "");
}

/**
 * Run one SQL statement against Turso via the HTTP pipeline endpoint.
 * Throws on a non-2xx response so the API route returns a clean 500.
 * Returns false when Turso isn't configured (caller falls back to local).
 */
async function execute(sql: string, values: (string | number | null)[] = []): Promise<boolean> {
  const base = httpBase();
  if (!base) return false;

  const args = values.map((v) =>
    typeof v === "number"
      ? { type: "integer", value: String(v) }
      : { type: "text", value: String(v ?? "") }
  );

  const res = await fetch(`${base}/v2/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Schema creation and the INSERT share the same pipeline, so the table
      // is guaranteed to exist (idempotent) without extra round-trips.
      requests: [
        { type: "execute", stmt: args.length ? { sql, args } : { sql } },
        { type: "close" },
      ],
    } as const),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Turso request failed (${res.status}): ${text.slice(0, 300)}`);
  }
  return true;
}

/** Store a contact message. Returns false when Turso isn't configured. */
export async function insertContact(data: ContactInput): Promise<boolean> {
  await execute(
    `CREATE TABLE IF NOT EXISTS contact_messages (
       id integer PRIMARY KEY AUTOINCREMENT,
       name text NOT NULL,
       email text NOT NULL,
       message text NOT NULL,
       created_at text NOT NULL DEFAULT (datetime('now')),
       status text NOT NULL DEFAULT 'new'
     )`
  );
  return execute(
    "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)",
    [data.name, data.email, data.message]
  );
}

/** Store a dietary enquiry (allergens kept as a JSON string). */
export async function insertDietary(data: DietaryInput): Promise<boolean> {
  await execute(
    `CREATE TABLE IF NOT EXISTS dietary_enquiries (
       id integer PRIMARY KEY AUTOINCREMENT,
       name text NOT NULL,
       email text NOT NULL,
       allergens text NOT NULL DEFAULT '[]',
       question text NOT NULL,
       created_at text NOT NULL DEFAULT (datetime('now')),
       status text NOT NULL DEFAULT 'new'
     )`
  );
  return execute(
    "INSERT INTO dietary_enquiries (name, email, allergens, question) VALUES (?, ?, ?, ?)",
    [data.name, data.email, JSON.stringify(data.allergens), data.question]
  );
}

/**
 * Subscribe an email. SQLite's UNIQUE + ON CONFLICT DO NOTHING lets a repeat
 * subscriber silently no-op rather than erroring.
 */
export async function insertNewsletter(data: NewsletterInput): Promise<boolean> {
  await execute(
    `CREATE TABLE IF NOT EXISTS newsletter_subscribers (
       id integer PRIMARY KEY AUTOINCREMENT,
       email text NOT NULL UNIQUE,
       created_at text NOT NULL DEFAULT (datetime('now'))
     )`
  );
  return execute(
    "INSERT INTO newsletter_subscribers (email) VALUES (?) ON CONFLICT(email) DO NOTHING",
    [data.email]
  );
}
