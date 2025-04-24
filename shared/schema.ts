import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const fbAccounts = pgTable("fb_accounts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  fbId: text("fb_id"),
  token: text("token"),
  isGuardActive: boolean("is_guard_active").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Facebook token response schema
export const facebookTokenSchema = z.object({
  access_token: z.string(),
  id: z.string()
});

// Facebook profile guard activation schema
export const activateGuardSchema = z.object({
  token: z.string(),
  id: z.string()
});

// User schemas
export const insertUserSchema = createInsertSchema(users, {
  password: z.string().min(6, "Password must be at least 6 characters")
}).pick({
  username: true,
  password: true,
});

export const loginUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

// Facebook account schema
export const insertFbAccountSchema = createInsertSchema(fbAccounts).pick({
  email: true,
  password: true,
  userId: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertFbAccount = z.infer<typeof insertFbAccountSchema>;
export type FbAccount = typeof fbAccounts.$inferSelect;
export type FacebookToken = z.infer<typeof facebookTokenSchema>;
export type ActivateGuard = z.infer<typeof activateGuardSchema>;
