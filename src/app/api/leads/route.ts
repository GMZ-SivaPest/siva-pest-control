import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { leadDecrypt } from '@/lib/encryption';
import { verifyAdminToken, isAdminConfigured } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

/**
 * Auth middleware — verify admin session cookie.
 */
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
 * GET /api/leads — List all leads with decrypted data
 * Query params:
 *   - status: filter by status
 *   - city: filter by city
 *   - service: filter by service
 *   - search: search in decrypted name/phone/email
 *   - page: page number (default: 1)
 *   - limit: items per page (default: 20)
 *   - sort: sort field (default: createdAt)
 *   - order: asc or desc (default: desc)
 */
export async function GET(req: NextRequest) {
  const auth = await verifySession();
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }
  
  const { searchParams } = req.nextUrl;
  
  const status = searchParams.get('status') || undefined;
  const city = searchParams.get('city') || undefined;
  const service = searchParams.get('service') || undefined;
  const search = searchParams.get('search') || undefined;
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
  const sort = (searchParams.get('sort') || 'createdAt') as 'createdAt' | 'updatedAt' | 'city' | 'service' | 'status';
  const order = searchParams.get('order') === 'asc' ? 'asc' : 'desc';
  
  // Build where clause
  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (city) where.city = city;
  if (service) where.service = service;
  
  try {
    // When no search term is provided we can paginate + count entirely in SQL.
    // When searching, the searchable fields are encrypted at rest so we must
    // decrypt, filter, and paginate in memory — the DB cannot match ciphertext.
    if (search) {
      const allLeads = await db.lead.findMany({
        where,
        orderBy: { [sort]: order },
      });

      const searchLower = search.toLowerCase();
      const filtered = allLeads
        .map((lead) => ({
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
        }))
        .filter((lead) =>
          lead.name.toLowerCase().includes(searchLower) ||
          lead.phone.includes(search) ||
          (lead.email?.toLowerCase().includes(searchLower) ?? false)
        );

      return NextResponse.json({
        leads: filtered.slice((page - 1) * limit, page * limit),
        pagination: {
          page,
          limit,
          total: filtered.length,
          totalPages: Math.ceil(filtered.length / limit),
        },
      });
    }

    // Get total count
    const total = await db.lead.count({ where });
    
    // Get paginated leads
    const leads = await db.lead.findMany({
      where,
      orderBy: { [sort]: order },
      skip: (page - 1) * limit,
      take: limit,
    });
    
    // Decrypt PII fields for display
    const decryptedLeads = leads.map((lead) => ({
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
    }));
    
    return NextResponse.json({
      leads: decryptedLeads,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error('[admin/leads] Failed to fetch leads:', err);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}
