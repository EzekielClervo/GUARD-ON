import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// In production, we'll ignore the database requirement
// This will allow the app to start on Render even without a database URL
try {
  if (!process.env.DATABASE_URL) {
    // In development, throw an error
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(
        "DATABASE_URL must be set in development. Did you forget to provision a database?"
      );
    }
    
    // In production, just log a warning
    console.warn("DATABASE_URL is not set. The application will try to continue, but database operations will fail.");
  }

  const connectionString = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/postgres";
  export const pool = new Pool({ connectionString });
  export const db = drizzle(pool, { schema });
} catch (error) {
  console.error("Database initialization error:", error);
  // Provide dummy objects that will fail gracefully if used
  export const pool = {} as Pool;
  export const db = {} as ReturnType<typeof drizzle>;
}