/**
 * brand.ts — Single source of truth for brand identity.
 * Change once, updates everywhere.
 */

export const brand = {
  name: "Siva Pest Control",
  shortName: "Siva",
  legalName: "Siva Pest Control Pvt. Ltd.",
  tagline: "Protection. Science. Trust.",
  description:
    "Premium pest control for homes and businesses across Hyderabad, Chennai and Bangalore. Science-led treatments, child-safe formulations, fully guaranteed results.",
  promise: "Child-safe · Pet-safe · Stain-free · Odour-controlled",
  foundedYear: 2009,
  yearsOfExperience: 16,
  responseTimeHours: 2,
  guaranteeLabel: "180-Day Service Warranty",
  certifications: [
    "ISO 9001:2015 Certified",
    "IPCW Licensed Operators",
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
