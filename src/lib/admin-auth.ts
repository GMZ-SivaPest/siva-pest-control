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
 * Constant-time string comparison that is safe for inputs of unequal length.
 * (Node's timingSafeEqual throws when buffer lengths differ, so we compare
 * hashes instead — this keeps the comparison constant-time AND length-safe.)
 */
function safeEqual(a: string, b: string): boolean {
  const hashA = createHmac('sha256', 'cmp').update(a).digest();
  const hashB = createHmac('sha256', 'cmp').update(b).digest();
  return timingSafeEqual(hashA, hashB);
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

  const usernameMatch = safeEqual(username, creds.username);
  const passwordMatch = safeEqual(password, creds.password);

  if (usernameMatch && passwordMatch) {
    const token = createSessionToken();
    return { ok: true, token };
  }

  return { ok: false };
}

// Sessions expire after 24 hours, matching the cookie maxAge set in /api/auth.
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

/**
 * Verify a session token from cookies. Also enforces the 24h expiry —
 * the cookie expiring client-side alone is not sufficient.
 */
export function verifyAdminToken(token: string | undefined): boolean {
  if (!token) return false;

  const parts = token.split(':');
  if (parts.length !== 2) return false;

  const [signature, timestamp] = parts;
  const expectedSignature = signToken(timestamp);

  try {
    const signatureValid = timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
    if (!signatureValid) return false;

    const issuedAt = parseInt(timestamp, 10);
    if (!Number.isFinite(issuedAt)) return false;
    if (Date.now() - issuedAt > SESSION_TTL_MS) return false;

    return true;
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
