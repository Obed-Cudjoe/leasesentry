// ------------------------------------------------------------------
// LOCAL FALLBACK STORAGE
// Used only in local/demo mode (no Supabase keys). Writes form
// submissions to a JSON file so the demo genuinely records them.
// In production (Netlify + Supabase) submissions go to Postgres.
// ------------------------------------------------------------------

import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

interface StoredRow {
  kind: "contact" | "dietary" | "newsletter";
  data: unknown;
  createdAt: string;
}

export async function storeLocal(kind: StoredRow["kind"], data: unknown) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const file = path.join(DATA_DIR, "submissions.json");
  let rows: StoredRow[] = [];
  try {
    rows = JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    rows = [];
  }
  rows.push({ kind, data, createdAt: new Date().toISOString() });
  await fs.writeFile(file, JSON.stringify(rows, null, 2));
  return rows.length;
}
