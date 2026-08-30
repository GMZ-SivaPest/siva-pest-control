/**
 * AES-256-GCM Encryption Utilities
 * 
 * Uses Node.js built-in crypto module for field-level encryption of PII data.
 * Each encrypted value includes an IV (Initialization Vector) and auth tag
 * stored as base64-encoded strings.
 * 
 * Environment Variables Required:
 * - ENCRYPTION_KEY: 32-byte hex-encoded key (64 hex characters)
 * 
 * Usage:
 *   const encrypted = encrypt('sensitive data');
 *   const decrypted = decrypt(encrypted);
 */

import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12; // 96 bits for GCM
const AUTH_TAG_LENGTH = 16;
const SALT_LENGTH = 16;

// Get encryption key from environment
function getEncryptionKey(): Buffer {
  const keyHex = process.env.ENCRYPTION_KEY;
  
  if (!keyHex) {
    // In development, generate a deterministic key from a default
    // WARNING: Never use this default in production!
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        '[encryption] ENCRYPTION_KEY not set. Using development default. ' +
        'Set ENCRYPTION_KEY in production!'
      );
      return scryptSync('dev-only-encryption-key-do-not-use-in-prod', 'salt', 32);
    }
    throw new Error(
      'ENCRYPTION_KEY environment variable is required. ' +
      'Generate one with: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"'
    );
  }
  
  // Validate key length
  if (keyHex.length !== 64) {
    throw new Error(
      `ENCRYPTION_KEY must be 64 hex characters (32 bytes). Got ${keyHex.length} characters.`
    );
  }
  
  return Buffer.from(keyHex, 'hex');
}

/**
 * Encrypt plaintext using AES-256-GCM
 * Returns a base64-encoded string containing: IV (12 bytes) + ciphertext + auth tag (16 bytes)
 * 
 * @param plaintext - The sensitive data to encrypt
 * @returns Base64-encoded encrypted string
 */
export function encrypt(plaintext: string): string {
  if (!plaintext || plaintext.trim() === '') {
    return '';
  }
  
  const key = getEncryptionKey();
  const iv = randomBytes(IV_LENGTH);
  
  const cipher = createCipheriv(ALGORITHM, key, iv, {
    authTagLength: AUTH_TAG_LENGTH,
  });
  
  let ciphertext = cipher.update(plaintext, 'utf8');
  ciphertext = Buffer.concat([ciphertext, cipher.final()]);
  
  const authTag = cipher.getAuthTag();
  
  // Combine IV + ciphertext + auth tag
  const combined = Buffer.concat([iv, ciphertext, authTag]);
  
  return combined.toString('base64');
}

/**
 * Decrypt AES-256-GCM encrypted data
 * 
 * @param encryptedData - Base64-encoded encrypted string
 * @returns Decrypted plaintext
 */
export function decrypt(encryptedData: string): string {
  if (!encryptedData || encryptedData.trim() === '') {
    return '';
  }
  
  const key = getEncryptionKey();
  const combined = Buffer.from(encryptedData, 'base64');
  
  // Extract IV, ciphertext, and auth tag
  const iv = combined.subarray(0, IV_LENGTH);
  const authTag = combined.subarray(combined.length - AUTH_TAG_LENGTH);
  const ciphertext = combined.subarray(IV_LENGTH, combined.length - AUTH_TAG_LENGTH);
  
  const decipher = createDecipheriv(ALGORITHM, key, iv, {
    authTagLength: AUTH_TAG_LENGTH,
  });
  
  decipher.setAuthTag(authTag);
  
  let plaintext = decipher.update(ciphertext);
  plaintext = Buffer.concat([plaintext, decipher.final()]);
  
  return plaintext.toString('utf8');
}

/**
 * Type-safe encryption helpers for Lead model fields
 */
export const leadEncrypt = {
  name: (name: string): string => encrypt(name),
  phone: (phone: string): string => encrypt(phone),
  email: (email: string | null): string | null => email ? encrypt(email) : null,
  message: (message: string | null): string | null => message ? encrypt(message) : null,
};

export const leadDecrypt = {
  name: (encrypted: string): string => decrypt(encrypted),
  phone: (encrypted: string): string => decrypt(encrypted),
  email: (encrypted: string | null): string | null => encrypted ? decrypt(encrypted) : null,
  message: (encrypted: string | null): string | null => encrypted ? decrypt(encrypted) : null,
};

/**
 * Generate a new encryption key for initial setup
 */
export function generateEncryptionKey(): string {
  return randomBytes(32).toString('hex');
}

/**
 * Utility to verify if a string looks like an encrypted value
 * (base64-encoded with expected length for AES-256-GCM)
 */
export function isEncrypted(value: string): boolean {
  if (!value) return false;
  try {
    const decoded = Buffer.from(value, 'base64');
    // IV (12) + at least 1 byte ciphertext + auth tag (16) = minimum 29 bytes
    return decoded.length >= 29;
  } catch {
    return false;
  }
}
