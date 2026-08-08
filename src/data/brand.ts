/**
 * brand.ts — Single source of truth for brand identity.
 * Change once, updates everywhere.
 */

export const brand = {
  name: "Siva Pest Control",
  shortName: "Siva",
  legalName: "Siva Pest Control",
  tagline: "Protection. Science. Trust.",
  description:
    "Licensed pest control for homes and businesses across Hyderabad, Chennai and Bangalore. Science-led treatments, child-safe formulations, fully guaranteed results.",
  promise: "Child-safe · Pet-safe · Eco-certified · Odour-controlled",
  foundedYear: 2012,
  yearsOfExperience: 14,
  responseTimeHours: 0.5,
  /** ISO date — when the marketing copy / service descriptions were last
      reviewed. Used by sitemap.ts as the lastModified date for static
      routes and service/location detail routes. Update this when you
      ship meaningful content changes (audit P2). */
  contentLastUpdated: "2026-08-08",
  guaranteeLabel: "180-Day Service Warranty",
  certifications: [
    "ISO 9001:2015 Certified",
    "FSSAI Compliant",
    "CIB & RC Registered Products",
    "Green Pro Service Provider",
  ],
  palette: {
    sand: "#D8AE7F",
    ivory: "#F7F1E8",
    teal: "#719899",
    orange: "#D77005",
    brown: "#332416",
    rust: "#99341F",
  },
  fonts: {
    display: "Manrope",
    body: "Inter",
  },
} as const;

export type Brand = typeof brand;
