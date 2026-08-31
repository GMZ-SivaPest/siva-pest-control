import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { company } from "@/data/company";
import { leadEncrypt } from "@/lib/encryption";
import {
  sendCustomerWhatsApp,
  sendTeamWhatsApp,
  isWhatsAppConfigured,
  type LeadWhatsAppData,
} from "@/lib/whatsapp";

/**
 * POST /api/contact
 *
 * Receives a lead submission from either:
 *   - the main /contact page form (`source: "contact-form"`)
 *   - an inline quote form on a /services/[slug] page (`source: "service-detail"`)
 *
 * Validates input server-side, persists the lead to the `Lead` table, and
 * (when configured) fires an email notification via the Resend API. The
 * response is always 200 with `{ ok: true }` on success — validation
 * errors return 400 with a structured `errors` object so the client can
 * render inline field-level messages.
 *
 * Privacy: this route is silent about whether a phone/email exists in our
 * DB already. We never leak existing records. All PII lives only in the
 * `Lead` table on our own SQLite/Postgres, never in logs.
 */

// ---------- Validation ----------

const INDIAN_PHONE_RE = /^(?:\+91[\s-]?|0)?([6-9]\d{9})$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Keep in sync with src/data/locations.ts — every city the site serves.
const ALLOWED_CITIES = ["Isukapalli", "Hyderabad", "Chennai", "Bangalore", "Other"];
const ALLOWED_PROPERTY_TYPES = ["Residential", "Commercial", "Industrial"];
const ALLOWED_SOURCES = ["contact-form", "service-detail", "inline-quote"];

interface ContactPayload {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  city?: unknown;
  service?: unknown;
  propertyType?: unknown;
  message?: unknown;
  preferredDate?: unknown;
  source?: unknown;
}

interface FieldErrors {
  [field: string]: string;
}

function validate(payload: ContactPayload): {
  ok: boolean;
  errors: FieldErrors;
  cleaned: {
    name: string;
    phone: string;
    email: string | null;
    city: string;
    service: string;
    propertyType: string;
    message: string | null;
    preferredDate: string | null;
    source: string;
  };
} {
  const errors: FieldErrors = {};

  // Name
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  if (!name) {
    errors.name = "Please share your name";
  } else if (name.length < 2) {
    errors.name = "Name looks too short";
  } else if (name.length > 80) {
    errors.name = "Name is too long";
  }

  // Phone — accept +91, 0, or bare 10-digit Indian mobile (starts 6-9)
  const phoneRaw =
    typeof payload.phone === "string" ? payload.phone.trim() : "";
  const phoneMatch = phoneRaw.match(INDIAN_PHONE_RE);
  if (!phoneRaw) {
    errors.phone = "Phone number is required";
  } else if (!phoneMatch) {
    errors.phone =
      "Enter a valid 10-digit Indian mobile (starts with 6, 7, 8, or 9)";
  }
  const phoneNormalized = phoneMatch ? `+91${phoneMatch[1]}` : phoneRaw;

  // Email — optional, but if provided must be valid
  const emailRaw =
    typeof payload.email === "string" ? payload.email.trim() : "";
  let email: string | null = null;
  if (emailRaw) {
    if (!EMAIL_RE.test(emailRaw)) {
      errors.email = "Enter a valid email or leave blank";
    } else {
      email = emailRaw;
    }
  }

  // City
  const city =
    typeof payload.city === "string" ? payload.city.trim() : "";
  if (!city) {
    errors.city = "Please select a city";
  } else if (!ALLOWED_CITIES.includes(city)) {
    errors.city = `Please choose from: ${ALLOWED_CITIES.join(", ")}`;
  }

  // Service
  const service =
    typeof payload.service === "string" ? payload.service.trim() : "";
  if (!service) {
    errors.service = "Please choose a service";
  } else if (service.length > 120) {
    errors.service = "Service name too long";
  }

  // Property type
  const propertyType =
    typeof payload.propertyType === "string"
      ? payload.propertyType.trim()
      : "Residential";
  if (!ALLOWED_PROPERTY_TYPES.includes(propertyType)) {
    errors.propertyType = `Please choose from: ${ALLOWED_PROPERTY_TYPES.join(", ")}`;
  }

  // Message — optional, cap length
  const messageRaw =
    typeof payload.message === "string" ? payload.message.trim() : "";
  const message =
    messageRaw.length > 0 && messageRaw.length <= 2000 ? messageRaw : null;

  // Preferred date — optional, must be YYYY-MM-DD and not in the past
  const dateRaw =
    typeof payload.preferredDate === "string"
      ? payload.preferredDate.trim()
      : "";
  let preferredDate: string | null = null;
  if (dateRaw) {
    const parsed = new Date(dateRaw);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(parsed.getTime())) {
      errors.preferredDate = "Enter a valid date";
    } else if (parsed < today) {
      errors.preferredDate = "Preferred date can't be in the past";
    } else {
      preferredDate = dateRaw;
    }
  }

  // Source
  const source =
    typeof payload.source === "string" ? payload.source : "contact-form";
  if (!ALLOWED_SOURCES.includes(source)) {
    // silently fall back rather than reject — UX over strictness
  }

  const cleaned = {
    name,
    phone: phoneNormalized,
    email,
    city,
    service,
    propertyType,
    message,
    preferredDate,
    source: ALLOWED_SOURCES.includes(source) ? source : "contact-form",
  };

  return { ok: Object.keys(errors).length === 0, errors, cleaned };
}

// ---------- Email notification (best-effort, optional) ----------

async function notifyTeam(
  leadId: string,
  city: string,
  service: string,
  propertyType: string,
  preferredDate: string | null,
  source: string
): Promise<void> {
  const token = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_EMAIL_TO || process.env.COMPANY_EMAIL;
  const from =
    process.env.LEADS_EMAIL_FROM || "leads@sivapestcontrol.com";

  // If no Resend key or destination configured, log locally + exit silently.
  if (!token || !to) {
    console.log(
      `[leads] New lead ${leadId} from ${source} — (encrypted) — (${city}, ${service})`
    );
    return;
  }

  const subject = `New lead: ${service} — ${city} — [ID: ${leadId.slice(-6)}]`;
  const text = `New lead received.

Lead ID:        ${leadId}
City:           ${city}
Service:        ${service}
Property:       ${propertyType}
Preferred date: ${preferredDate ?? "(none)"}
Source:         ${source}

NOTE: PII (name, phone, email, message) is encrypted at rest.
View full details in the admin panel: /leads

— Auto-generated from ${company.siteUrl}`;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        text,
      }),
    });
  } catch (err) {
    // Email is best-effort — never fail the lead because email failed.
    console.error("[leads] Resend notification failed:", err);
  }
}

// ---------- Route handler ----------

export async function POST(req: NextRequest) {
  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  // Honeypot — if a hidden bot-trap field is filled, silently accept and
  // discard. Real humans never see or fill these fields; spam bots fill
  // every input they find. `company` is kept for backward compatibility.
  const honeypotBody = body as Record<string, unknown>;
  const honeypotTripped =
    (typeof honeypotBody.botVerification === "string" && honeypotBody.botVerification !== "") ||
    (typeof honeypotBody.company === "string" && honeypotBody.company !== "");
  if (honeypotTripped) {
    return NextResponse.json({ ok: true, leadId: "spam-discarded" });
  }

  const { ok, errors, cleaned } = validate(body);
  if (!ok) {
    return NextResponse.json(
      { ok: false, error: "validation_failed", errors },
      { status: 400 }
    );
  }

  // Persist the lead with encrypted PII fields
  let leadId: string;
  
  try {
    const lead = await db.lead.create({
      data: {
        // Encrypt sensitive PII fields before storing
        nameEnc: leadEncrypt.name(cleaned.name),
        phoneEnc: leadEncrypt.phone(cleaned.phone),
        emailEnc: leadEncrypt.email(cleaned.email),
        messageEnc: leadEncrypt.message(cleaned.message),
        // Non-sensitive fields stored as-is
        city: cleaned.city,
        service: cleaned.service,
        propertyType: cleaned.propertyType,
        preferredDate: cleaned.preferredDate,
        source: cleaned.source,
        status: "new",
        whatsappSent: false,
      },
    });
    leadId = lead.id;
  } catch (err) {
    console.error("[leads] DB insert failed:", err);
    return NextResponse.json(
      {
        ok: false,
        error: "server_error",
        message:
          "We couldn't save your request. Please call us directly — we're here to help.",
      },
      { status: 500 }
    );
  }

  // Fire email notification (best-effort, do not block the response)
  void notifyTeam(leadId, cleaned.city, cleaned.service, cleaned.propertyType, cleaned.preferredDate, cleaned.source);

  // Attempt WhatsApp notification (best-effort, runs async)
  if (isWhatsAppConfigured()) {
    const leadData: LeadWhatsAppData = {
      id: leadId,
      nameEnc: leadEncrypt.name(cleaned.name),
      phoneEnc: leadEncrypt.phone(cleaned.phone),
      emailEnc: leadEncrypt.email(cleaned.email),
      service: cleaned.service,
      city: cleaned.city,
      propertyType: cleaned.propertyType,
      preferredDate: cleaned.preferredDate,
      source: cleaned.source,
      messageEnc: leadEncrypt.message(cleaned.message),
      createdAt: new Date(),
    };
    
    // Send to customer
    void sendCustomerWhatsApp(leadData).then(async (result) => {
      if (result.success && result.sid) {
        await db.lead.update({
          where: { id: leadId },
          data: { whatsappSent: true, whatsappSid: result.sid },
        }).catch(err => console.error("[leads] Failed to update WhatsApp status:", err));
      }
    });
    
    // Send to team if configured
    const teamNumber = process.env.WHATSAPP_TEAM_NUMBER;
    if (teamNumber) {
      void sendTeamWhatsApp(leadData, teamNumber);
    }
  } else {
    // DRY RUN: Log what would have been sent
    console.log(`[whatsapp] DRY RUN: Would have sent WhatsApp for lead ${leadId}`);
  }

  return NextResponse.json({
    ok: true,
    leadId,
    message:
      "Request received. Our team will call you within 30 minutes during business hours.",
  });
}

// Aggressive no-store — leads are sensitive PII
export const dynamic = "force-dynamic";
