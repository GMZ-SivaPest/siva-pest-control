/**
 * Simple admin authentication using environment-based credentials.
 * 
 * For production, consider implementing NextAuth or a more robust solution.
 * 
 * Environment Variables:
 * - ADMIN_USERNAME: Admin username (default: "admin")
 * - ADMIN_PASSWORD: Admin password (REQUIRED in production)
 */

import { createHmac, timingSafeEqual } from 'crypto';

export function getAdminCredentials(): { username: string; password: string } {
  return {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || '',
  };
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

/**
 * Sign a token for session validation.
 */
function signToken(payload: string): string {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ENCRYPTION_KEY || 'default-dev-secret';
  const hmac = createHmac('sha256', secret);
  hmac.update(payload);
  return hmac.digest('hex');
}

/**
 * Verify admin credentials and return a signed token.
 */
export function verifyAdminCredentials(username: string, password: string): { ok: boolean; token?: string } {
  const creds = getAdminCredentials();
  
  if (!creds.password) {
    console.error('[admin] ADMIN_PASSWORD not set. Admin panel is disabled.');
    return { ok: false };
  }
  
  const usernameMatch = timingSafeEqual(Buffer.from(username), Buffer.from(creds.username));
  const passwordMatch = timingSafeEqual(Buffer.from(password), Buffer.from(creds.password));
  
  if (usernameMatch && passwordMatch) {
    const token = signToken(`${username}:${Date.now()}`);
    return { ok: true, token };
  }
  
  return { ok: false };
}

/**
 * Verify a session token from cookies.
 */
export function verifyAdminToken(token: string | undefined): boolean {
  if (!token) return false;
  
  const parts = token.split(':');
  if (parts.length !== 2) return false;
  
  const [signature, timestamp] = parts;
  const expectedSignature = signToken(timestamp);
  
  try {
    return timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
}

/**
 * Create a session cookie value.
 */
export function createSessionToken(): string {
  const timestamp = Date.now().toString();
  const signature = signToken(timestamp);
  return `${signature}:${timestamp}`;
}
