/**
 * WhatsApp Notification Service
 * 
 * Sends WhatsApp messages via Twilio WhatsApp Business API
 * (or any compatible WhatsApp Business API provider).
 * 
 * Environment Variables Required:
 * - WHATSAPP_API_URL: API endpoint URL
 * - WHATSAPP_API_TOKEN: Authentication token
 * - WHATSAPP_FROM_NUMBER: Sender's WhatsApp number
 * - WHATSAPP_ENABLED: Set to "true" to enable sending (default: false = dry run)
 * - WHATSAPP_TEAM_NUMBER: Team member who receives lead notifications
 * 
 * Future Integration:
 * - Set WHATSAPP_ENABLED="true" and configure credentials
 * - Messages will be sent automatically on form submission
 * - Currently runs in DRY RUN mode (logs to console)
 */

import { leadDecrypt } from './encryption';

interface WhatsAppConfig {
  enabled: boolean;
  apiUrl: string | null;
  apiToken: string | null;
  fromNumber: string | null;
  teamNumber: string | null;
}

function getConfig(): WhatsAppConfig {
  return {
    enabled: process.env.WHATSAPP_ENABLED === 'true',
    apiUrl: process.env.WHATSAPP_API_URL || null,
    apiToken: process.env.WHATSAPP_API_TOKEN || null,
    fromNumber: process.env.WHATSAPP_FROM_NUMBER || null,
    teamNumber: process.env.WHATSAPP_TEAM_NUMBER || null,
  };
}

export interface LeadWhatsAppData {
  id: string;
  nameEnc: string;
  phoneEnc: string;
  emailEnc: string | null;
  service: string;
  city: string;
  propertyType: string;
  preferredDate: string | null;
  source: string;
  messageEnc: string | null;
  createdAt: Date;
}

export interface WhatsAppResult {
  success: boolean;
  sid?: string;
  error?: string;
  dryRun?: boolean;
}

/**
 * Build a friendly customer welcome message.
 */
export function buildCustomerMessage(data: {
  name: string;
  service: string;
  city: string;
  leadId: string;
}): string {
  return `Hi ${data.name}! 👋

Thank you for your enquiry about *${data.service}* in *${data.city}*.

We've received your request and our team will call you within 30 minutes during business hours (Mon–Sat, 8 AM–8 PM).

Your reference: #${data.leadId.slice(-6).toUpperCase()}

For urgent matters, call us directly or reply to this WhatsApp.

— Team Siva Pest Control
🛡️ Licensed · Insured · 180-day warranty`;
}

/**
 * Build a team notification message.
 */
export function buildTeamNotificationMessage(data: {
  name: string;
  phone: string;
  email: string | null;
  service: string;
  city: string;
  propertyType: string;
  preferredDate: string | null;
  source: string;
  leadId: string;
}): string {
  return `🚨 *New Lead Received*

*${data.name}*
📞 ${data.phone}
${data.email ? `✉️ ${data.email}\n` : ''}
🏙️ ${data.city}
🐛 ${data.service}
🏠 ${data.propertyType}
${data.preferredDate ? `📅 Preferred: ${data.preferredDate}\n` : ''}
📍 Source: ${data.source}
🆔 ${data.leadId}

⚡ Callback within 30 min`;
}

/**
 * Send WhatsApp message to the customer.
 */
export async function sendCustomerWhatsApp(
  lead: LeadWhatsAppData,
  message?: string
): Promise<WhatsAppResult> {
  const name = leadDecrypt.name(lead.nameEnc);
  const phone = leadDecrypt.phone(lead.phoneEnc);
  
  const finalMessage = message || buildCustomerMessage({
    name,
    service: lead.service,
    city: lead.city,
    leadId: lead.id,
  });
  
  return sendWhatsAppMessage(phone, finalMessage, lead.id);
}

/**
 * Send WhatsApp message to the team.
 */
export async function sendTeamWhatsApp(
  lead: LeadWhatsAppData,
  teamNumber: string
): Promise<WhatsAppResult> {
  const name = leadDecrypt.name(lead.nameEnc);
  const phone = leadDecrypt.phone(lead.phoneEnc);
  const email = lead.emailEnc ? leadDecrypt.email(lead.emailEnc) : null;
  
  const finalMessage = buildTeamNotificationMessage({
    name,
    phone,
    email,
    service: lead.service,
    city: lead.city,
    propertyType: lead.propertyType,
    preferredDate: lead.preferredDate,
    source: lead.source,
    leadId: lead.id,
  });
  
  return sendWhatsAppMessage(teamNumber, finalMessage, lead.id);
}

/**
 * Internal: Send WhatsApp message via API (Twilio compatible).
 */
async function sendWhatsAppMessage(
  toNumber: string,
  message: string,
  leadId: string
): Promise<WhatsAppResult> {
  const config = getConfig();
  
  // DRY RUN MODE: Log to console if not configured.
  if (!config.enabled || !config.apiUrl || !config.apiToken || !config.fromNumber) {
    console.log(`[whatsapp] (DRY RUN) Would send to ${toNumber} for lead ${leadId}:`);
    console.log(message);
    console.log('---');
    return { success: true, dryRun: true, sid: `DRY_RUN_${Date.now()}` };
  }
  
  try {
    const isTwilio = config.apiUrl.includes('twilio.com');
    
    if (isTwilio) {
      const formData = new URLSearchParams();
      formData.append('From', `whatsapp:${config.fromNumber}`);
      formData.append('To', `whatsapp:${toNumber}`);
      formData.append('Body', message);
      
      const response = await fetch(config.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`${config.apiToken}:`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Twilio API error: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      return { success: true, sid: result.sid || `MSG_${Date.now()}` };
    } else {
      // Generic WhatsApp Business API
      const response = await fetch(config.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: config.fromNumber,
          to: toNumber,
          message,
          leadId,
        }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`WhatsApp API error: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      return { success: true, sid: result.messageId || result.sid || `MSG_${Date.now()}` };
    }
  } catch (err) {
    console.error('[whatsapp] Send failed:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

/**
 * Check if WhatsApp is configured and enabled.
 */
export function isWhatsAppConfigured(): boolean {
  const config = getConfig();
  return Boolean(config.enabled && config.apiUrl && config.apiToken && config.fromNumber);
}
