import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
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
 * POST /api/leads/[id]/whatsapp — Resend WhatsApp message to lead
 * Body: { message?: string } (optional custom message)
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifySession();
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }
  
  const { id } = await params;
  
  let body: { message?: string } = {};
  try {
    body = await req.json();
  } catch {
    // Empty body is fine
  }
  
  try {
    const lead = await db.lead.findUnique({ where: { id } });
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }
    
    const leadData: LeadWhatsAppData = {
      id: lead.id,
      nameEnc: lead.nameEnc,
      phoneEnc: lead.phoneEnc,
      emailEnc: lead.emailEnc,
      service: lead.service,
      city: lead.city,
      propertyType: lead.propertyType,
      preferredDate: lead.preferredDate,
      source: lead.source,
      messageEnc: lead.messageEnc,
      createdAt: lead.createdAt,
    };
    
    const result = await sendCustomerWhatsApp(leadData, body.message);
    
    if (result.success && result.sid && !result.dryRun) {
      await db.lead.update({
        where: { id },
        data: {
          whatsappSent: true,
          whatsappSid: result.sid,
        },
      });
    }
    
    return NextResponse.json({
      ok: result.success,
      sid: result.sid,
      dryRun: result.dryRun,
      error: result.error,
    });
  } catch (err) {
    console.error('[admin/leads/whatsapp] Failed to send WhatsApp:', err);
    return NextResponse.json({ error: 'Failed to send WhatsApp' }, { status: 500 });
  }
}
