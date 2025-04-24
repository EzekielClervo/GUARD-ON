import { users, fbAccounts, type User, type InsertUser, type FbAccount, type InsertFbAccount } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import session from "express-session";
import { pool } from "./db";
import connectPg from "connect-pg-simple";

const PostgresSessionStore = connectPg(session);
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
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
    
    // Create admin user if it doesn't exist
    this.createAdminUser();
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
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const hashedPassword = await this.hashPassword(insertUser.password);
    
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        password: hashedPassword,
      })
      .returning();
    
    return user;
  }

  async validateUserPassword(username: string, password: string): Promise<User | null> {
    const user = await this.getUserByUsername(username);
    if (!user || !(await this.comparePasswords(password, user.password))) {
      return null;
    }
    return user;
  }

  async getFbAccounts(userId?: number): Promise<FbAccount[]> {
    if (userId) {
      return db.select().from(fbAccounts).where(eq(fbAccounts.userId, userId));
    }
    return db.select().from(fbAccounts);
  }

  async getFbAccount(id: number): Promise<FbAccount | undefined> {
    const [account] = await db.select().from(fbAccounts).where(eq(fbAccounts.id, id));
    return account;
  }

  async createFbAccount(account: InsertFbAccount): Promise<FbAccount> {
    const [newAccount] = await db
      .insert(fbAccounts)
      .values(account)
      .returning();
    
    return newAccount;
  }

  async updateFbAccount(id: number, data: Partial<FbAccount>): Promise<FbAccount | undefined> {
    const [updatedAccount] = await db
      .update(fbAccounts)
      .set(data)
      .where(eq(fbAccounts.id, id))
      .returning();
    
    return updatedAccount;
  }
}

export const storage = new DatabaseStorage();
