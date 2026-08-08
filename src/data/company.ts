/**
 * company.ts — Single source of truth for company information.
 * Phone numbers, emails, addresses, hours, socials — all live here.
 */

import { brand } from "./brand";

export const company = {
  ...brand,
  /** Proprietor / founder — entomologist-trained, M.Sc. (Ag) Entomology */
  founder: "S. Sai Prakash",
  founderCredential: "M.Sc. (Ag) Entomology",
  /** GSTIN — required on invoices and on quotes for commercial clients */
  gstin: "36BGPP6124G1KLZ8",
  phonePrimary: "+91 77024 87195",
  phonePrimaryHref: "+917702487195",
  phoneSales: "+91 93955 32359",
  phoneSalesHref: "+919395532359",
  email: "info@sivapestcontrol.com",
  emailSales: "sales@sivapestcontrol.com",
  emailGrievance: "grievance@sivapestcontrol.com",
  whatsapp: "+91 77024 87195",
  whatsappHref: "https://wa.me/917702487195",
  hours: "Mon–Sat · 8:00 AM – 8:00 PM",
  hoursShort: "Mon–Sat · 8 AM – 8 PM",
  emergencyNote: "Same-day service available · Response within 30 minutes",
  socials: {
    instagram: "https://instagram.com/sivapestcontrol",
    facebook: "https://facebook.com/sivapestcontrol",
    linkedin: "https://linkedin.com/company/sivapestcontrol",
    youtube: "https://youtube.com/@sivapestcontrol",
  },
  stats: {
    homesProtected: 12000,
    commercialSites: 480,
    technicians: 24,
    avgResponseMins: 30,
    satisfactionPct: 98,
    warrantyDays: 180,
    googleRating: 4.9,
    googleReviews: 500,
  },
  trustSignals: [
    { label: "Homes protected", value: 12000, suffix: "+" },
    { label: "Commercial sites", value: 480, suffix: "+" },
    { label: "Avg. response time", value: 30, suffix: " min" },
    { label: "Service warranty", value: 180, suffix: " days" },
  ],
} as const;

export type Company = typeof company;
