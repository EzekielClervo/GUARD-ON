import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
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

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type FacebookToken = z.infer<typeof facebookTokenSchema>;
export type ActivateGuard = z.infer<typeof activateGuardSchema>;
