/**
 * industries.ts — Industries served by Siva Pest Control.
 */

import {
  Utensils,
  Hotel,
  Warehouse,
  ShoppingBag,
  HeartPulse,
  Building2,
  School,
  Factory,
  HardHat,
  TrainFront,
  type LucideIcon,
} from "lucide-react";

export interface Industry {
  slug: string;
  name: string;
  icon: LucideIcon;
  image: string;
  short: string;
  description: string;
  pests: string[];
  compliance: string[];
}

export const industries: Industry[] = [
  {
    slug: "restaurants",
    name: "Restaurants & Cloud Kitchens",
    icon: Utensils,
    image: "/images/industries/restaurant.jpg",
    short: "FSSAI-compliant pest control for QSRs, fine dining, and cloud kitchens.",
    description:
      "Restaurants and cloud kitchens face the strictest pest control scrutiny from FSSAI and food delivery aggregators. Our restaurant programme combines tamper-proof bait stations, drain fly treatment, fly-killing UV units, and digital service logs that satisfy any auditor. We work with single-outlet fine dining and 200+ outlet QSR chains alike.",
    pests: ["Cockroaches", "Drain flies", "Rodents", "Stored product pests"],
    compliance: ["FSSAI", "ISO 22000", "Swiggy/Zomato vendor norms"],
  },
  {
    slug: "hotels",
    name: "Hotels & Hospitality",
    icon: Hotel,
    image: "/images/industries/hotel.jpg",
    short: "Discreet, guest-friendly pest control for hotels, resorts, and serviced apartments.",
    description:
      "Hotels cannot afford a single guest sighting of any pest. Our hospitality programme uses unmarked vehicles, off-peak service windows, mattress-safe bed bug protocols, and discreet monitoring in guest rooms, kitchens, and pool areas. Trusted by 5-star properties and boutique resorts across South India.",
    pests: ["Bed bugs", "Cockroaches", "Rodents", "Flies", "Birds"],
    compliance: ["HACCP", "OTA reputation protection", "Brand standards"],
  },
  {
    slug: "warehouses",
    name: "Warehouses & Logistics",
    icon: Warehouse,
    image: "/images/industries/warehouse.jpg",
    short: "Stored-product pest protection for warehouses, cold storage, and 3PL facilities.",
    description:
      "Warehouses store high-value inventory vulnerable to rodent damage and stored-product pest contamination. Our warehouse programme uses perimeter bait stations, indoor monitoring traps, fumigation-on-arrival for inbound shipments, and detailed trending reports. Ideal for FMCG, pharma, e-commerce, and food distribution.",
    pests: ["Rodents", "Stored product pests", "Birds", "Silverfish"],
    compliance: ["ISO 9001", "BRC", "FSSAI storage norms"],
  },
  {
    slug: "retail",
    name: "Retail & Malls",
    icon: ShoppingBag,
    image: "/images/industries/retail.jpg",
    short: "Customer-friendly pest control for malls, supermarkets, and apparel chains.",
    description:
      "Retail environments cannot spray during operating hours and cannot risk customer sightings. Our retail programme uses after-hours gel-bait treatment, fly-killing UV units in food courts, rodent monitoring in stockrooms, and bird spikes on signage. Trusted by leading malls in Hyderabad, Chennai, and Bangalore.",
    pests: ["Cockroaches", "Flies", "Rodents", "Birds"],
    compliance: ["Mall operations norms", "Food court hygiene"],
  },
  {
    slug: "healthcare",
    name: "Hospitals & Clinics",
    icon: HeartPulse,
    image: "/images/industries/healthcare.jpg",
    short: "Hospital-grade pest control calibrated for sensitive healthcare environments.",
    description:
      "Healthcare facilities cannot use standard pest control chemicals near patients, ICUs, or sterile stores. Our healthcare programme uses pheromone traps, mechanical exclusion, hospital-grade disinfectants, and odour-free formulations only. We service multi-specialty hospitals, dialysis centres, and diagnostic labs.",
    pests: ["Cockroaches", "Rodents", "Flies", "Ants"],
    compliance: ["NABH", "ISO 9001", "Infection control protocols"],
  },
  {
    slug: "offices",
    name: "Offices & Tech Parks",
    icon: Building2,
    image: "/images/showcase/work-bird-spike.jpg",
    short: "After-hours pest control for IT parks, co-working spaces, and corporate offices.",
    description:
      "Modern offices face unique pest pressure — pantry cockroaches, server-room rodents, and bird fouling on glass facades. Our office programme uses after-hours service, pantry-focused gel-bait protocols, server-room mechanical trapping, and quarterly trend reports for facility managers.",
    pests: ["Cockroaches", "Rodents", "Flies", "Birds"],
    compliance: ["IGBC", "ISO 14001", "Facility SLAs"],
  },
  {
    slug: "education",
    name: "Schools & Institutions",
    icon: School,
    image: "/images/treatments/gel-bait-application.jpg",
    short: "Child-safe pest control for schools, colleges, hostels, and daycares.",
    description:
      "Educational institutions demand the strictest safety standards. Our schools programme uses non-toxic monitoring, gel-bait only (no sprays in classrooms), vacation-period deep treatments, and full documentation for parent communications. Compliant with all state education board safety norms.",
    pests: ["Cockroaches", "Mosquitoes", "Rodents", "Ants"],
    compliance: ["State board safety norms", "Child-safe formulations"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing & FMCG",
    icon: Factory,
    image: "/images/industries/manufacturing.jpg",
    short: "Audit-ready IPM for food manufacturing, packaging, and pharma production.",
    description:
      "Manufacturing units face the most demanding audit standards — BRC, AIB, ISO 22000, and customer-specific audits. Our manufacturing programme includes full IPM documentation, trend analysis, integrated rodent perimeter, flying insect control, and dedicated audit-attendance support. Trusted by Tier-1 FMCG and pharma manufacturers.",
    pests: ["Stored product pests", "Rodents", "Flies", "Birds"],
    compliance: ["BRC", "AIB", "ISO 22000", "HACCP"],
  },
  {
    slug: "pre-post-construction",
    name: "Pre & Post Construction",
    icon: HardHat,
    image: "/images/treatments/termite-drill-treatment.jpg",
    short:
      "Anti-termite soil treatment during foundation stage — protects new structures for 10+ years.",
    description:
      "The single most effective termite defence is a chemical soil barrier applied during the construction phase — before the foundation slab is poured. Our pre-construction anti-termite treatment creates a continuous termiticide barrier beneath and around the structure, protecting the building for 10+ years. Post-construction treatment uses the drill-fill-seal method for existing structures. Trusted by builders, developers, and architects across Hyderabad, Chennai, and Bangalore.",
    pests: ["Subterranean termites", "Drywood termites", "Wood borers"],
    compliance: ["IS 6313 (Part 2)", "NBC 2016", "Builder warranty norms"],
  },
  {
    slug: "transport-hubs",
    name: "Transport Hubs & Ports",
    icon: TrainFront,
    image: "/images/showcase/work-rodent-station.jpg",
    short:
      "High-traffic pest control for airports, seaports, railway stations, and metro depots.",
    description:
      "Transport hubs face unique pest pressure — high footfall, food courts, baggage holding areas, cargo storage, and 24/7 operations. Our transport-hub programme combines discreet 24/7 monitoring, fly management for food courts, rodent perimeter for cargo zones, and bird exclusion for hangars and platforms. Compliant with AAI, IPA, and IR audit norms. We service terminals, depots, and cargo facilities across South India.",
    pests: ["Rodents", "Flies", "Cockroaches", "Birds", "Stored product pests"],
    compliance: ["AAI", "IPA (port health)", "IR audit norms", "FSMS"],
  },
];

export const industryBySlug = (slug: string) =>
  industries.find((i) => i.slug === slug);
