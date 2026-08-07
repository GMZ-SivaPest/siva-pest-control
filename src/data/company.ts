/**
 * company.ts — Single source of truth for company information.
 * Phone numbers, emails, addresses, hours, socials — all live here.
 */

import { brand } from "./brand";

export const company = {
  ...brand,
  phonePrimary: "+91 90000 24680",
  phonePrimaryHref: "+919000024680",
  phoneSales: "+91 90000 24681",
  phoneSalesHref: "+919000024681",
  email: "hello@sivapestcontrol.com",
  emailSales: "sales@sivapestcontrol.com",
  whatsapp: "+91 90000 24680",
  whatsappHref: "https://wa.me/919000024680",
  hours: "Mon–Sat · 8:00 AM – 8:00 PM",
  hoursShort: "Mon–Sat · 8 AM – 8 PM",
  emergencyNote: "Emergency same-day available on request",
  socials: {
    instagram: "https://instagram.com/sivapestcontrol",
    facebook: "https://facebook.com/sivapestcontrol",
    linkedin: "https://linkedin.com/company/sivapestcontrol",
    youtube: "https://youtube.com/@sivapestcontrol",
  },
  stats: {
    homesProtected: 18500,
    commercialSites: 1240,
    technicians: 78,
    avgResponseMins: 95,
    satisfactionPct: 98,
    warrantyDays: 180,
  },
  trustSignals: [
    { label: "Homes protected", value: 18500, suffix: "+" },
    { label: "Commercial sites", value: 1240, suffix: "+" },
    { label: "Avg. response time", value: 95, suffix: " min" },
    { label: "Service warranty", value: 180, suffix: " days" },
  ],
} as const;

export type Company = typeof company;
