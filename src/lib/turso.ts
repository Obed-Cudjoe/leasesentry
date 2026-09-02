// ---------------------------------------------------------------------------
// Turso (free-tier, edge SQLite / libSQL) client for form submissions.
// https://turso.tech — free plan: 5 GB storage, 100 databases, 500M row reads.
// Uses an HTTP driver (no connection pooling, no cold-start pauses), which
// makes it ideal for Netlify serverless functions.
//
// When Turso credentials are missing (e.g. running the demo locally), the
// callers fall back to the local JSON store so the forms still record data.
// ---------------------------------------------------------------------------

import { createClient, type Client } from "@libsql/client";
import type { ContactInput, DietaryInput, NewsletterInput } from "./validation";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

/** True when real Turso credentials are configured. */
export const tursoConfigured = Boolean(url && authToken);

// Lazy singleton — we only open a connection once we know we're configured.
let client: Client | null = null;

function db(): Client | null {
  if (!url || !authToken) return null;
  if (!client) {
    client = createClient({ url, authToken });
  }
  return client;
}

// The three form tables. Run idempotently so a new deployment doesn't need
// any manual SQL — tables are created on first use.
const TABLES = [
  `CREATE TABLE IF NOT EXISTS contact_messages (
     id integer PRIMARY KEY AUTOINCREMENT,
     name text NOT NULL,
     email text NOT NULL,
     message text NOT NULL,
     created_at text NOT NULL DEFAULT (datetime('now')),
     status text NOT NULL DEFAULT 'new'
   )`,
  `CREATE TABLE IF NOT EXISTS dietary_enquiries (
     id integer PRIMARY KEY AUTOINCREMENT,
     name text NOT NULL,
     email text NOT NULL,
     allergens text NOT NULL DEFAULT '[]',
     question text NOT NULL,
     created_at text NOT NULL DEFAULT (datetime('now')),
     status text NOT NULL DEFAULT 'new'
   )`,
  `CREATE TABLE IF NOT EXISTS newsletter_subscribers (
     id integer PRIMARY KEY AUTOINCREMENT,
     email text NOT NULL UNIQUE,
     created_at text NOT NULL DEFAULT (datetime('now'))
   )`,
];

let tablesReady = false;

async function ensureTables(c: Client) {
  if (tablesReady) return;
  for (const sql of TABLES) {
    await c.execute(sql);
  }
  tablesReady = true;
}

/**
 * Store a contact message. Returns false when Turso isn't configured so the
 * caller can fall back to local storage.
 */
export async function insertContact(data: ContactInput): Promise<boolean> {
  const c = db();
  if (!c) return false;
  await ensureTables(c);
  await c.execute({
    sql: "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)",
    args: [data.name, data.email, data.message],
  });
  return true;
}

/** Store a dietary enquiry. Allergens are kept as a JSON array string. */
export async function insertDietary(data: DietaryInput): Promise<boolean> {
  const c = db();
  if (!c) return false;
  await ensureTables(c);
  await c.execute({
    sql: "INSERT INTO dietary_enquiries (name, email, allergens, question) VALUES (?, ?, ?, ?)",
    args: [data.name, data.email, JSON.stringify(data.allergens), data.question],
  });
  return true;
}

/**
 * Subscribe an email. SQLite's unique constraint silently ignores a repeat
 * subscriber (ON CONFLICT DO NOTHING), so it never throws for this case.
 * Returns false when Turso isn't configured.
 */
export async function insertNewsletter(data: NewsletterInput): Promise<boolean> {
  const c = db();
  if (!c) return false;
  await ensureTables(c);
  await c.execute({
    sql: "INSERT INTO newsletter_subscribers (email) VALUES (?) ON CONFLICT(email) DO NOTHING",
    args: [data.email],
  });
  return true;
}
