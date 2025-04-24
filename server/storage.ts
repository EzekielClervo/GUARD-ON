import { users, fbAccounts, type User, type InsertUser, type FbAccount, type InsertFbAccount } from "@shared/schema";
import { db, pool } from "./db";
import { eq } from "drizzle-orm";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import session from "express-session";
import connectPg from "connect-pg-simple";
import createMemoryStore from "memorystore";

const PostgresSessionStore = connectPg(session);
const MemoryStore = createMemoryStore(session);
const scryptAsync = promisify(scrypt);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  validateUserPassword(username: string, password: string): Promise<User | null>;
  
  getFbAccounts(userId?: number): Promise<FbAccount[]>;
  getFbAccount(id: number): Promise<FbAccount | undefined>;
  createFbAccount(account: InsertFbAccount): Promise<FbAccount>;
  updateFbAccount(id: number, data: Partial<FbAccount>): Promise<FbAccount | undefined>;
  
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;
  
  constructor() {
    try {
      this.sessionStore = new PostgresSessionStore({ 
        pool, 
        createTableIfMissing: true 
      });
      
      // Create admin user if it doesn't exist
      this.createAdminUser();
    } catch (error) {
      console.error("Error initializing database storage:", error);
      // Create a memory store as fallback
      console.warn("Using memory store as fallback - data will not persist between restarts");
      const MemoryStore = require('memorystore')(session);
      this.sessionStore = new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
      });
    }
  }

  private async createAdminUser() {
    try {
      const existingAdmin = await this.getUserByUsername('divon143');
      if (!existingAdmin) {
        // Hash the admin password
        const hashedPassword = await this.hashPassword('divon1433');
        
        // Create the admin user
        await db.insert(users).values({
          username: 'divon143',
          password: hashedPassword,
          isAdmin: true,
        });
        
        console.log('Admin user created successfully');
      }
    } catch (error) {
      console.error('Error creating admin user:', error);
    }
  }

  async hashPassword(password: string) {
    const salt = randomBytes(16).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString("hex")}.${salt}`;
  }

  async comparePasswords(supplied: string, stored: string) {
    const [hashed, salt] = stored.split(".");
    const hashedBuf = Buffer.from(hashed, "hex");
    const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
    return timingSafeEqual(hashedBuf, suppliedBuf);
  }

  async getUser(id: number): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      return user;
    } catch (error) {
      console.error("Database error in getUser:", error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.username, username));
      return user;
    } catch (error) {
      console.error("Database error in getUserByUsername:", error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const hashedPassword = await this.hashPassword(insertUser.password);
      
      const [user] = await db
        .insert(users)
        .values({
          ...insertUser,
          password: hashedPassword,
        })
        .returning();
      
      return user;
    } catch (error) {
      console.error("Database error in createUser:", error);
      // Return a placeholder user object so the application doesn't crash
      // This is only for deployment/connection issues
      return {
        id: 0,
        username: "temporary-user",
        password: "",
        isAdmin: false,
        createdAt: new Date()
      };
    }
  }

  async validateUserPassword(username: string, password: string): Promise<User | null> {
    try {
      const user = await this.getUserByUsername(username);
      if (!user || !(await this.comparePasswords(password, user.password))) {
        return null;
      }
      return user;
    } catch (error) {
      console.error("Database error in validateUserPassword:", error);
      return null;
    }
  }

  async getFbAccounts(userId?: number): Promise<FbAccount[]> {
    try {
      if (userId) {
        return await db.select().from(fbAccounts).where(eq(fbAccounts.userId, userId));
      }
      return await db.select().from(fbAccounts);
    } catch (error) {
      console.error("Database error in getFbAccounts:", error);
      return []; // Return empty array on error
    }
  }

  async getFbAccount(id: number): Promise<FbAccount | undefined> {
    try {
      const [account] = await db.select().from(fbAccounts).where(eq(fbAccounts.id, id));
      return account;
    } catch (error) {
      console.error("Database error in getFbAccount:", error);
      return undefined;
    }
  }

  async createFbAccount(account: InsertFbAccount): Promise<FbAccount> {
    try {
      const [newAccount] = await db
        .insert(fbAccounts)
        .values(account)
        .returning();
      
      return newAccount;
    } catch (error) {
      console.error("Database error in createFbAccount:", error);
      // Return a placeholder account so the application doesn't crash
      return {
        id: 0,
        userId: account.userId || 0,
        email: account.email || "",
        password: account.password || "",
        createdAt: new Date(),
        // These are optional in the schema
        fbId: undefined,
        token: undefined,
        isGuardActive: false
      };
    }
  }

  async updateFbAccount(id: number, data: Partial<FbAccount>): Promise<FbAccount | undefined> {
    try {
      const [updatedAccount] = await db
        .update(fbAccounts)
        .set(data)
        .where(eq(fbAccounts.id, id))
        .returning();
      
      return updatedAccount;
    } catch (error) {
      console.error("Database error in updateFbAccount:", error);
      return undefined;
    }
  }
}

export const storage = new DatabaseStorage();
