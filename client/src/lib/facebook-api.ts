import { apiRequest } from "./queryClient";

export interface FbAccount {
  id: number;
  userId: number;
  email: string;
  password: string;
  token?: string;
  fbId?: string;
  isGuardActive?: boolean;
  createdAt: Date;
}

export interface TokenResponse {
  token: string;
  id: string;
}

/**
 * Generates a Facebook access token from email and password
 */
export async function generateToken(email: string, password: string): Promise<TokenResponse> {
  const response = await apiRequest("POST", "/api/fb/token", { email, password });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to generate token");
  }
  return response.json();
}

/**
 * Creates a Facebook account in the database and tries to generate a token
 */
export async function createFbAccount(email: string, password: string): Promise<FbAccount> {
  const response = await apiRequest("POST", "/api/fb/accounts", { email, password });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create account");
  }
  return response.json();
}

/**
 * Activates the profile guard for a Facebook account
 */
export async function activateProfileGuard(token: string, id: string, accountId?: number): Promise<{ success: boolean, message: string }> {
  const response = await apiRequest("POST", "/api/fb/guard", { token, id, accountId });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to activate profile guard");
  }
  return response.json();
}

/**
 * Gets a Facebook user ID from a token
 */
export async function getUserId(token: string): Promise<string> {
  const response = await apiRequest("POST", "/api/fb/user-id", { token });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to get user ID");
  }
  const data = await response.json();
  return data.id;
}

/**
 * Gets all Facebook accounts for the current user
 */
export async function getFbAccounts(): Promise<FbAccount[]> {
  const response = await apiRequest("GET", "/api/fb/accounts");
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to get accounts");
  }
  return response.json();
}

/**
 * Gets all Facebook accounts (admin only)
 */
export async function getAllFbAccounts(): Promise<FbAccount[]> {
  const response = await apiRequest("GET", "/api/fb/accounts/all");
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to get all accounts");
  }
  return response.json();
}