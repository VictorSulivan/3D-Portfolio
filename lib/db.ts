import { readdir, readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
import pg from "pg";

const databaseUrl = process.env.DATABASE_URL?.trim() ?? "";

/** True when a real Postgres URL is configured (Vercel Postgres, Neon, Cursor, etc.). */
export function hasDatabaseUrl(): boolean {
  return databaseUrl !== "";
}

/**
 * PGlite is for local/dev only. On Vercel (and similar serverless hosts) WASM/fs
 * startup fails without DATABASE_URL — callers must use seed fallbacks instead.
 */
function allowPglite(): boolean {
  if (hasDatabaseUrl()) return false;
  if (process.env.VERCEL) return false;
  if (process.env.AWS_LAMBDA_FUNCTION_NAME) return false;
  return true;
}

let pool: pg.Pool | undefined;
let local: Promise<PGlite> | undefined;

export class DatabaseUnavailableError extends Error {
  constructor(message = "DATABASE_URL is not configured on this host") {
    super(message);
    this.name = "DatabaseUnavailableError";
  }
}

export async function sql<T = Record<string, unknown>>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  if (hasDatabaseUrl()) {
    pool ??= new pg.Pool({ connectionString: databaseUrl, max: 5 });
    return (await pool.query(text, params)).rows as T[];
  }

  if (!allowPglite()) {
    throw new DatabaseUnavailableError();
  }

  local ??= startLocal().catch((error: unknown) => {
    local = undefined;
    throw error;
  });
  return (await (await local).query<T>(text, params)).rows;
}

async function startLocal(): Promise<PGlite> {
  const db = new PGlite();
  const files = (await readdir("migrations").catch(() => []))
    .filter((f) => f.endsWith(".sql"))
    .sort();
  for (const file of files) {
    await db.exec(await readFile(`migrations/${file}`, "utf8"));
  }
  return db;
}
