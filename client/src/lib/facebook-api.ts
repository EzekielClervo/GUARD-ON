import { apiRequest } from './queryClient';

interface TokenResponse {
  access_token: string;
  id: string;
}

export async function generateToken(email: string, password: string): Promise<TokenResponse> {
  const response = await apiRequest('POST', '/api/fb/token', { email, password });
  return response.json();
}

export async function activateProfileGuard(token: string, id: string): Promise<void> {
  await apiRequest('POST', '/api/fb/guard', { token, id });
}

export async function getUserId(token: string): Promise<string> {
  const response = await apiRequest('POST', '/api/fb/user-id', { token });
  const data = await response.json();
  return data.id;
}
