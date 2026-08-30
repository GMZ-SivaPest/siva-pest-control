import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { verifyAdminToken, isAdminConfigured } from '@/lib/admin-auth';

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
 * GET /api/leads/stats — Get lead statistics
 */
export async function GET(req: NextRequest) {
  const auth = await verifySession();
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }
  
  const { searchParams } = req.nextUrl;
  const days = Math.min(90, Math.max(1, parseInt(searchParams.get('days') || '30', 10)));
  const since = new Date();
  since.setDate(since.getDate() - days);
  
  try {
    // Total leads
    const total = await db.lead.count();
    
    // Leads in period
    const leadsInPeriod = await db.lead.count({
      where: { createdAt: { gte: since } },
    });
    
    // By status
    const byStatus = await db.lead.groupBy({
      by: ['status'],
      _count: { status: true },
    });
    
    // By city
    const byCity = await db.lead.groupBy({
      by: ['city'],
      _count: { city: true },
      orderBy: { _count: { city: 'desc' } },
    });
    
    // By service
    const byService = await db.lead.groupBy({
      by: ['service'],
      _count: { service: true },
      orderBy: { _count: { service: 'desc' } },
      take: 10,
    });
    
    // By source
    const bySource = await db.lead.groupBy({
      by: ['source'],
      _count: { source: true },
    });
    
    // Recent trend (leads per day for the period)
    const leadsRaw = await db.lead.findMany({
      where: { createdAt: { gte: since } },
      select: { createdAt: true },
      orderBy: { createdAt: 'asc' },
    });
    
    // Group by day
    const byDay: Record<string, number> = {};
    for (const lead of leadsRaw) {
      const day = lead.createdAt.toISOString().split('T')[0];
      byDay[day] = (byDay[day] || 0) + 1;
    }
    
    // WhatsApp stats
    const whatsappSent = await db.lead.count({
      where: { whatsappSent: true },
    });
    
    // Convert to array format
    const statusCounts: Record<string, number> = {};
    for (const item of byStatus) {
      statusCounts[item.status] = item._count.status;
    }
    
    const cityCounts: Record<string, number> = {};
    for (const item of byCity) {
      cityCounts[item.city] = item._count.city;
    }
    
    const serviceCounts: Record<string, number> = {};
    for (const item of byService) {
      serviceCounts[item.service] = item._count.service;
    }
    
    const sourceCounts: Record<string, number> = {};
    for (const item of bySource) {
      sourceCounts[item.source] = item._count.source;
    }
    
    return NextResponse.json({
      total,
      leadsInPeriod,
      periodDays: days,
      whatsappSent,
      byStatus: statusCounts,
      byCity: cityCounts,
      byService: serviceCounts,
      bySource: sourceCounts,
      byDay,
    });
  } catch (err) {
    console.error('[admin/leads/stats] Failed to fetch stats:', err);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
