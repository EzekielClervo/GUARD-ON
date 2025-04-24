import { db } from "../server/db";
import { users, fbAccounts } from "../shared/schema";
import { storage } from "../server/storage";
import { sql } from "drizzle-orm";

async function main() {
  console.log("Starting database migration...");
  
  try {
    // Create users table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        is_admin BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);
    console.log("Users table created or already exists");
    
    // Create fb_accounts table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS fb_accounts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        fb_id TEXT,
        token TEXT,
        is_guard_active BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);
    console.log("FB accounts table created or already exists");
    
    // Create admin user if it doesn't exist
    const existingAdmin = await storage.getUserByUsername('divon143');
    if (!existingAdmin) {
      // Hash the admin password
      const hashedPassword = await storage.hashPassword('divon1433');
      
      // Create the admin user
      await db.insert(users).values({
        username: 'divon143',
        password: hashedPassword,
        isAdmin: true,
      });
      
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }
    
    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Close the database connection
    await db.execute(sql`SELECT 1`).then(() => {
      console.log("Database connection closed");
      process.exit(0);
    });
  });