import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  verifyAdminCredentials,
  createSessionToken,
  isAdminConfigured,
} from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

/**
 * POST /api/auth — Login
 * Body: { username, password }
 * Sets a secure httpOnly cookie on success.
 */
export async function POST(req: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { ok: false, error: 'Admin panel is not configured. Set ADMIN_PASSWORD env var.' },
      { status: 503 }
    );
  }
  
  let body: { username?: unknown; password?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }
  
  const username = typeof body.username === 'string' ? body.username : '';
  const password = typeof body.password === 'string' ? body.password : '';
  
  if (!username || !password) {
    return NextResponse.json(
      { ok: false, error: 'Username and password are required' },
      { status: 400 }
    );
  }
  
  const result = verifyAdminCredentials(username, password);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: 'Invalid credentials' },
      { status: 401 }
    );
  }
  
  // Set session cookie (24 hour expiry)
  const token = createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });
  
  return NextResponse.json({ ok: true, message: 'Logged in successfully' });
}

/**
 * DELETE /api/auth — Logout
 */
export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  return NextResponse.json({ ok: true, message: 'Logged out' });
}
