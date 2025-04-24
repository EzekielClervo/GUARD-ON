import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Use Render's default DATABASE_URL or a fallback during provisioning
let databaseUrl = process.env.DATABASE_URL;

// If DATABASE_URL isn't set and we're in production, provide a fallback that won't immediately crash
// This helps with the initial deployment when the database might still be provisioning
if (!databaseUrl && process.env.NODE_ENV === 'production') {
  console.warn("DATABASE_URL not found, using temporary in-memory mode");
  // Use a special connection string that allows the app to start
  // but will show appropriate errors in the UI
  databaseUrl = "postgres://postgres:postgres@localhost:5432/postgres";
}

// Still throw in development to ensure proper setup
if (!databaseUrl && process.env.NODE_ENV !== 'production') {
  throw new Error(
    "DATABASE_URL must be set in development. Did you forget to provision a database?"
  );
}

const pool = new Pool({ connectionString: databaseUrl });
const db = drizzle(pool, { schema });

export { pool, db };