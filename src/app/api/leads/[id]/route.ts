import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { leadDecrypt } from '@/lib/encryption';
import { verifyAdminToken, isAdminConfigured } from '@/lib/admin-auth';
import { sendCustomerWhatsApp, type LeadWhatsAppData } from '@/lib/whatsapp';

export const dynamic = 'force-dynamic';

async function verifySession(): Promise<{ ok: boolean; error?: string }> {
  if (!isAdminConfigured()) {
    return { ok: false, error: 'Admin panel not configured' };
  }
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;
  if (!verifyAdminToken(token)) {
    return { ok: false, error: 'Unauthorized' };
  }
  return { ok: true };
}

/**
 * GET /api/leads/[id] — Get single lead with decrypted data
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifySession();
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }
  
  const { id } = await params;
  
  try {
    const lead = await db.lead.findUnique({ where: { id } });
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }
    
    return NextResponse.json({
      id: lead.id,
      name: leadDecrypt.name(lead.nameEnc),
      phone: leadDecrypt.phone(lead.phoneEnc),
      email: leadDecrypt.email(lead.emailEnc),
      message: leadDecrypt.message(lead.messageEnc),
      city: lead.city,
      service: lead.service,
      propertyType: lead.propertyType,
      preferredDate: lead.preferredDate,
      source: lead.source,
      status: lead.status,
      whatsappSent: lead.whatsappSent,
      whatsappSid: lead.whatsappSid,
      createdAt: lead.createdAt.toISOString(),
      updatedAt: lead.updatedAt.toISOString(),
      lastContactedAt: lead.lastContactedAt?.toISOString() || null,
      notes: lead.notes,
    });
  } catch (err) {
    console.error('[admin/leads] Failed to fetch lead:', err);
    return NextResponse.json({ error: 'Failed to fetch lead' }, { status: 500 });
  }
}

/**
 * PATCH /api/leads/[id] — Update lead (status, notes, etc.)
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifySession();
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }
  
  const { id } = await params;
  
  let body: {
    status?: string;
    notes?: string;
    lastContactedAt?: string;
  };
  
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  
  const ALLOWED_STATUSES = ['new', 'contacted', 'quoted', 'won', 'lost', 'whatsapp_sent'];
  
  try {
    const updateData: Record<string, unknown> = {};
    if (body.status) {
      if (!ALLOWED_STATUSES.includes(body.status)) {
        return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
      }
      updateData.status = body.status;
    }
    if (typeof body.notes === 'string') {
      updateData.notes = body.notes;
    }
    if (body.lastContactedAt) {
      updateData.lastContactedAt = new Date(body.lastContactedAt);
    }
    
    const lead = await db.lead.update({
      where: { id },
      data: updateData,
    });
    
    return NextResponse.json({ ok: true, id: lead.id });
  } catch (err) {
    console.error('[admin/leads] Failed to update lead:', err);
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}

/**
 * DELETE /api/leads/[id] — Delete a lead
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifySession();
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }
  
  const { id } = await params;
  
  try {
    await db.lead.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[admin/leads] Failed to delete lead:', err);
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
  }
}
