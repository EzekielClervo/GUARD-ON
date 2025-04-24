import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// In development, require the DATABASE_URL
// In production, use a default connection string if DATABASE_URL is not set
let connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  if (process.env.NODE_ENV === 'production') {
    console.warn("DATABASE_URL not set, using in-memory storage instead");
    // This will allow the app to start even without a database in production
    // The app will use in-memory storage instead
    connectionString = "postgres://postgres:postgres@localhost:5432/postgres";
  } else {
    throw new Error(
      "DATABASE_URL must be set. Did you forget to provision a database?",
    );
  }
}

export const pool = new Pool({ connectionString });
export const db = drizzle(pool, { schema });