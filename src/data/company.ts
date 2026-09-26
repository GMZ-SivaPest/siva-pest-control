/**
 * company.ts — Single source of truth for company information.
 * Phone numbers, emails, addresses, hours, socials — all live here.
 */

import { brand } from "./brand";

export const company = {
  ...brand,
  /** Canonical site URL — used across SEO metadata, sitemap, robots, JSON-LD. */
  siteUrl: "https://sivapestcontrol.com",
  /** Proprietor / founder — microbiologist, M.Sc. Microbiology (2003) */
  founder: "S. Sai Prakash",
  founderCredential: "M.Sc. Microbiology",
  /** Short-form credential for tight spaces (badges, footers, cards). */
  founderCredentialShort: "M.Sc. Microbiology",
  /** Service descriptor from the original site. */
  descriptor: "Industrial & Household Pest Management · Fumigation Service",
  /** States / regions we operate in.
      Only states with a STAFFED office belong here — these are the states
      we can actually dispatch a technician into today. Future branches
      (Chennai, Bangalore, Kochi) live in `upcomingServiceAreas`. */
  serviceAreas: ["Andhra Pradesh", "Telangana"],
  /** Announced-but-not-yet-open branch states. Never used as a dispatch
      promise — only in "opening soon" copy. */
  upcomingServiceAreas: ["Tamil Nadu", "Karnataka", "Kerala"],
  /** Licenses / registrations carried over from the original site's
      "Other Details" section. "500 DDT" is legacy wording — kept as-is
      for reference, not displayed on the live site. */
  licenses: ["Licensed to Kill", "500 DDT"],
  /** GSTIN — required on invoices and on quotes for commercial clients.
      NOTE: original site (sivapestcontrol.com) listed 36BBP GPP6124G1KZ8 —
      the value below is the current verified one. If the old number is
      correct, change it here once and it updates everywhere. */
  gstin: "36BGPP6124G1KLZ8",
  /** Head-office (Andhra Pradesh) line — the default site-wide number. */
  phonePrimary: "+91 77024 87195",
  phonePrimaryHref: "+917702487195",
  /** Second Andhra Pradesh line. */
  phoneSales: "+91 93955 32359",
  phoneSalesHref: "+919395532359",
  /** Telangana branch lines. */
  phoneTelangana: "+91 98491 57510",
  phoneTelanganaHref: "+919849157510",
  phoneTelanganaAlt: "+91 78420 87195",
  phoneTelanganaAltHref: "+917842087195",
  /**
   * Per-state contact pairs, keyed by the exact `state` string used in
   * locations.ts. Every office card, call button and tel: link should read
   * from here so a number is changed in exactly one place.
   */
  phoneByState: {
    "Andhra Pradesh": {
      primary: "+91 77024 87195",
      primaryHref: "+917702487195",
      alt: "+91 93955 32359",
      altHref: "+919395532359",
    },
    Telangana: {
      primary: "+91 98491 57510",
      primaryHref: "+919849157510",
      alt: "+91 78420 87195",
      altHref: "+917842087195",
    },
  } as const,
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
