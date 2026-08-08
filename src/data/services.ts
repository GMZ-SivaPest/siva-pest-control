/**
 * services.ts — Single source of truth for all services.
 * Each service has a slug, icon, short/long descriptions, benefits, process, FAQs.
 */

import {
  Bug,
  ShieldCheck,
  Rat,
  Droplets,
  Bird,
  Sparkles,
  Factory,
  type LucideIcon,
} from "lucide-react";

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceProcessStep {
  title: string;
  description: string;
}

export type ServiceAccent = "orange" | "teal" | "brown" | "rust";

export interface Service {
  slug: string;
  name: string;
  short: string;
  long: string;
  icon: LucideIcon;
  image: string;
  accent: ServiceAccent;
  category: "residential" | "commercial" | "both";
  startsFrom: number;
  duration: string;
  warranty: string;
  treatment: "gel" | "spray" | "fumigation" | "baiting" | "thermal" | "trapping" | "exclusion";
  safety: string[];
  benefits: string[];
  treats: string[];
  process: ServiceProcessStep[];
  faqs: ServiceFaq[];
}

export const services: Service[] = [
  {
    slug: "cockroach-gel-treatment",
    name: "Cockroach & Ant Gel Treatment",
    short:
      "Odourless gel-bait technology that eliminates entire colonies — no spraying, no evacuation, no stains.",
    long:
      "Our signature gel-bait treatment targets German and American cockroaches at the nest level. Odourless, non-staining, and child-safe, the gel is applied in micro-dots behind appliances, inside hinges, and along pheromone trails. Foraging cockroaches consume the bait and carry it back to the colony, eliminating the entire population within 7 to 14 days. Includes a targeted crack-and-crevice ant barrier at no extra cost.",
    icon: Bug,
    image: "/images/services/cockroach.png",
    accent: "orange",
    category: "both",
    startsFrom: 799,
    duration: "45 to 60 min",
    warranty: "180 days",
    treatment: "gel",
    safety: [
      "Child-safe gel formulation",
      "No evacuation required",
      "No odour, no staining",
      "Pet-friendly once dry",
    ],
    benefits: [
      "Colony-level elimination, not just visible roaches",
      "Single-session results within 2 weeks",
      "No need to empty kitchen cabinets",
      "Backed by 180-day re-treatment warranty",
    ],
    treats: [
      "German cockroaches",
      "American cockroaches",
      "Pharaoh ants",
      "Sugar ants",
      "Carpenter ants",
    ],
    process: [
      {
        title: "Inspection & Mapping",
        description:
          "Technician maps harbourage sites, foraging trails, and moisture hotspots using a calibrated inspection protocol.",
      },
      {
        title: "Gel-Bait Application",
        description:
          "Micro-dot gel applied behind stoves, inside hinges, around water sources, and along trail paths. Average 80 to 120 placement points per kitchen.",
      },
      {
        title: "Crack & Crevice Seal Advisory",
        description:
          "We identify and document entry cracks for your handyman to seal — the single most effective long-term prevention step.",
      },
      {
        title: "14-Day Follow-Up",
        description:
          "Complimentary inspection visit on day 14 to verify colony collapse and replenish any depleted bait stations.",
      },
    ],
    faqs: [
      {
        q: "Do we need to leave the house during treatment?",
        a: "No. The gel-bait method is odourless and applied in tiny dots inside hidden areas. You can stay home and continue normal activity immediately.",
      },
      {
        q: "How soon will we see results?",
        a: "You'll notice reduced activity within 48 hours and complete colony collapse typically within 7 to 14 days as foragers carry the bait back to the nest.",
      },
      {
        q: "Is the gel safe for kids and pets?",
        a: "Yes. The active ingredient is applied in micro-quantities inside hidden crevices. Once dry, there is no surface residue accessible to children or pets.",
      },
      {
        q: "What does the 180-day warranty cover?",
        a: "If you see live cockroaches in treated areas within 180 days, we return free of charge to re-treat. Warranty requires that you follow crack-sealing advisories.",
      },
    ],
  },
  {
    slug: "termite-control",
    name: "Anti-Termite Treatment",
    short:
      "Drill-fill-seal barrier treatment with transferable termiticide — protects structures for up to 10 years.",
    long:
      "Subterranean termites cause irreversible structural damage before they're ever seen. Our anti-termite treatment creates a continuous chemical barrier around and beneath your property using the drill-fill-seal method, combined with a transferable termiticide that worker termites carry back to the colony. Each treatment is backed by a written 5-year warranty with annual inspection included.",
    icon: ShieldCheck,
    image: "/images/services/termite.png",
    accent: "brown",
    category: "both",
    startsFrom: 999,
    duration: "3 to 5 hours",
    warranty: "5 years",
    treatment: "spray",
    safety: [
      "CIB & RC registered termiticide",
      "Drill holes sealed with white cement",
      "Interior-safe formulation",
      "No furniture movement needed",
    ],
    benefits: [
      "Continuous chemical barrier around the entire structure",
      "Transferable active eliminates the source colony",
      "Written 5-year structural warranty",
      "Annual inspection included for warranty duration",
    ],
    treats: [
      "Subterranean termites",
      "Drywood termites",
      "Dampwood termites",
      "Flying termite swarms",
    ],
    process: [
      {
        title: "Structural Audit",
        description:
          "Free site audit identifies mud-tube networks, entry points, and damage severity. Detailed report with photo documentation.",
      },
      {
        title: "Drill-Fill-Seal Barrier",
        description:
          "12mm holes drilled at 1-foot intervals along walls, joints, and flooring. Termiticide injected under pressure, then holes sealed with white cement.",
      },
      {
        title: "Colony Transfer Dose",
        description:
          "Transferable termiticide applied at entry points — workers carry it back to the queen, eliminating the colony at source.",
      },
      {
        title: "Annual Inspection",
        description:
          "Complimentary annual inspection for the full warranty period with re-treatment at no charge if activity is detected.",
      },
    ],
    faqs: [
      {
        q: "Will drilling damage my flooring?",
        a: "Holes are 12mm and sealed with matching white or coloured cement. The pattern is along wall-floor joints and is virtually invisible once sealed.",
      },
      {
        q: "How long does the treatment last?",
        a: "The chemical barrier remains effective for 5 to 10 years depending on soil conditions. We provide a written 5-year warranty with annual inspection.",
      },
      {
        q: "Do I need to vacate during treatment?",
        a: "Only for 4 to 6 hours during application and drying. We'll coordinate timing around your schedule.",
      },
    ],
  },
  {
    slug: "bed-bugs-treatment",
    name: "Bed Bugs Elimination",
    short:
      "Two-cycle heat + spray protocol that targets adults, nymphs, and eggs. Total elimination in 21 days.",
    long:
      "Bed bugs are resistant to most over-the-counter chemicals. Our protocol combines a residual spray with a thermal steam pass on mattress seams, headboards, and baseboards, followed by a second cycle at day 14 to catch newly-hatched nymphs. Includes encasement advisory and a 90-day re-treatment warranty.",
    icon: Droplets,
    image: "/images/services/bed-bug.png",
    accent: "rust",
    category: "both",
    startsFrom: 1299,
    duration: "90 min per cycle",
    warranty: "90 days",
    treatment: "spray",
    safety: [
      "Mattress-safe residual spray",
      "Steam treatment for eggs",
      "Food-safe after 4 hours",
      "Non-staining on fabrics",
    ],
    benefits: [
      "Two-cycle protocol eliminates resistant strains",
      "Steam kills eggs chemicals can't reach",
      "90-day re-treatment warranty",
      "Discreet unmarked vehicles available",
    ],
    treats: [
      "Common bed bugs",
      "Tropical bed bugs",
      "Bat bugs",
      "Bird nest bugs",
    ],
    process: [
      {
        title: "Infestation Mapping",
        description:
          "Technician inspects mattress seams, headboards, baseboards, electrical outlets, and adjacent furniture. Severity graded on 4-point scale.",
      },
      {
        title: "Cycle 1 — Spray + Steam",
        description:
          "Residual spray on all harbourage points, followed by 180 degree Celsius steam pass on mattress seams and tufts to kill eggs.",
      },
      {
        title: "Cycle 2 — Day 14",
        description:
          "Second spray cycle targets newly-hatched nymphs that emerged from eggs surviving cycle 1. This is the cycle that locks in elimination.",
      },
      {
        title: "Encasement Advisory",
        description:
          "We recommend mattress and box-spring encasements and advise on luggage hygiene for frequent travellers.",
      },
    ],
    faqs: [
      {
        q: "Why are two cycles necessary?",
        a: "Bed bug eggs are chemical-resistant. The second cycle at day 14 catches nymphs that hatched after cycle 1, breaking the reproductive cycle completely.",
      },
      {
        q: "Do I need to throw out my mattress?",
        a: "Almost never. Our steam-and-spray protocol eliminates infestations in 95% of cases. Encasement extends the protective barrier.",
      },
      {
        q: "How do bed bugs spread?",
        a: "Most commonly via luggage, second-hand furniture, and adjacent units in apartment buildings. We'll brief you on prevention during the visit.",
      },
    ],
  },
  {
    slug: "rodent-control",
    name: "Rodent Control Programme",
    short:
      "Snap-trap + bait-station + exclusion protocol. We close the entry points, not just catch the rats.",
    long:
      "Rats and mice cause structural damage, fire risk, and disease. Our programme combines mechanical snap-trapping, tamper-proof bait stations, and structural exclusion — sealing the holes that let them in. Includes a 90-day monitoring window with weekly trap-checks during the first month.",
    icon: Rat,
    image: "/images/services/rodent.png",
    accent: "brown",
    category: "both",
    startsFrom: 899,
    duration: "2 hours initial + monitoring",
    warranty: "90 days",
    treatment: "trapping",
    safety: [
      "Tamper-proof bait stations",
      "Snap traps placed in locked boxes",
      "Pet and child-proof placement",
      "No second-hand poisoning risk",
    ],
    benefits: [
      "Exclusion-first approach — stops re-entry",
      "Weekly monitoring for the first month",
      "Tamper-proof stations for kitchens and gardens",
      "Detailed entry-point report for your plumber/handyman",
    ],
    treats: [
      "House rats",
      "Norway rats",
      "House mice",
      "Bandicoot rats",
    ],
    process: [
      {
        title: "Activity Survey",
        description:
          "Droppings, rub-marks, gnaw-marks, and runways mapped. Entry points photographed and measured for exclusion advisory.",
      },
      {
        title: "Trapping & Baiting",
        description:
          "Snap traps in lockable boxes along runways. Tamper-proof bait stations in attics, gardens, and utility areas.",
      },
      {
        title: "Exclusion Work Advisory",
        description:
          "Detailed report listing every entry point — pipe gaps, vent holes, drain covers — with sealant recommendations for your handyman.",
      },
      {
        title: "Weekly Monitoring",
        description:
          "First 4 weeks include weekly trap-checks. Re-treat free if activity continues past week 4.",
      },
    ],
    faqs: [
      {
        q: "Will rats die inside the walls?",
        a: "We prioritise snap traps in active runways to catch rats where they travel. Bait stations are placed strategically to minimise the risk of rodents dying in inaccessible spaces.",
      },
      {
        q: "Do you seal the entry points?",
        a: "We provide a detailed advisory report. Sealant work is typically handled by your plumber or handyman — we can recommend partners in your city if needed.",
      },
    ],
  },
  {
    slug: "mosquito-control",
    name: "Mosquito Mist & Larva Control",
    short:
      "Yard fogging + larvicidal treatment of breeding sites. Reduces adult population by 90% in 7 days.",
    long:
      "Dengue and malaria cases spike during monsoon across Hyderabad, Chennai and Bangalore. Our mosquito programme combines residual misting of resting sites (shrubs, eaves, walls) with larvicidal treatment of breeding spots (stagnant water, drains, gutters). Includes a 30-day residual effect and advisory on source reduction around your property.",
    icon: Droplets,
    image: "/images/services/mosquito.png",
    accent: "teal",
    category: "both",
    startsFrom: 599,
    duration: "60 min",
    warranty: "60 days",
    treatment: "spray",
    safety: [
      "Permethrin-based residual mist",
      "Safe for gardens once dry",
      "Bti larvicide in water bodies",
      "Fish and aquatic-life safe",
    ],
    benefits: [
      "Dual-action: adults + larvae",
      "30-day residual on shaded surfaces",
      "Bti larvicide is organic-certified",
      "Source-reduction advisory included",
    ],
    treats: [
      "Aedes aegypti (dengue)",
      "Anopheles (malaria)",
      "Culex (filaria)",
      "Mansonia",
    ],
    process: [
      {
        title: "Breeding-Site Audit",
        description:
          "We map every potential breeding site — drains, gutters, plant trays, discarded containers, open tanks — within your property line.",
      },
      {
        title: "Larvicidal Treatment",
        description:
          "Bti (Bacillus thuringiensis israelensis) larvicide applied to all standing water. Organic, fish-safe, target-specific to mosquito larvae.",
      },
      {
        title: "Residual Misting",
        description:
          "Permethrin mist applied to shrubs, eaves, fence lines, and shaded walls where adult mosquitoes rest during daylight.",
      },
      {
        title: "Source-Reduction Plan",
        description:
          "Custom 8-point advisory covering water storage, drain maintenance, plant care, and screening — the highest-leverage prevention steps.",
      },
    ],
    faqs: [
      {
        q: "Is the mist safe for my garden?",
        a: "Yes, once dry (about 30 minutes). Permethrin breaks down in sunlight within days and does not accumulate in soil.",
      },
      {
        q: "How often should we repeat treatment?",
        a: "For monsoon-season protection, monthly service is recommended. One-time treatments are ideal for events and outdoor gatherings.",
      },
    ],
  },
  {
    slug: "general-disinfection",
    name: "Surface Disinfection & Sanitisation",
    short:
      "Hospital-grade ULV fogging for move-in, post-illness, or outbreak response. 99.9% pathogen kill.",
    long:
      "Beyond pest control, we offer hospital-grade surface disinfection using ultra-low-volume (ULV) fogging with WHO-recommended actives. Ideal for move-in cleaning, post-illness recovery, daycare sanitisation, and outbreak response in offices. Includes high-touch surface wipe-down and air-circulation protocol.",
    icon: Sparkles,
    image: "/images/services/ant.png",
    accent: "teal",
    category: "both",
    startsFrom: 499,
    duration: "60 to 90 min",
    warranty: "Single service",
    treatment: "fumigation",
    safety: [
      "WHO-recommended actives",
      "Food-safe after 2-hour ventilation",
      "No residue on electronics",
      "Hospital-grade efficacy",
    ],
    benefits: [
      "99.9% pathogen kill on surfaces",
      "Reaches HVAC ducts and ceiling voids",
      "Ideal for move-in / post-illness",
      "Optional anti-viral additive available",
    ],
    treats: [
      "Bacterial contamination",
      "Viral surface load",
      "Fungal spores",
      "Allergen dust mites",
    ],
    process: [
      {
        title: "Site Walkthrough",
        description:
          "Identify high-touch surfaces, HVAC intake points, sensitive electronics, and food-prep areas requiring wipe-down vs fog.",
      },
      {
        title: "Pre-Fog Wipe-Down",
        description:
          "Manual wipe of high-touch surfaces — switches, handles, lift buttons, railings — with alcohol-based disinfectant.",
      },
      {
        title: "ULV Fogging",
        description:
          "Ultra-low-volume fogger disperses 5-micron droplets that reach every surface, duct, and void. 30-minute contact time.",
      },
      {
        title: "Ventilation Protocol",
        description:
          "We ventilate for the prescribed dwell time and verify with ATP swab testing on critical surfaces before handover.",
      },
    ],
    faqs: [
      {
        q: "Do we need to vacate the premises?",
        a: "Yes, for 2 to 4 hours including fog contact time and ventilation. We'll coordinate timing to minimise disruption.",
      },
      {
        q: "Is it safe for electronics?",
        a: "ULV droplets are non-corrosive and dry without residue. Sensitive equipment is covered during fogging as a precaution.",
      },
    ],
  },
  {
    slug: "bird-management",
    name: "Bird Spikes & Netting",
    short:
      "Humane exclusion systems that prevent pigeons and crows from roosting — no killing, no poison, guaranteed.",
    long:
      "Bird fouling damages paint, blocks gutters, and spreads respiratory disease. Our bird management programme uses humane exclusion only — stainless steel spikes on ledges, nylon netting on ducts and balconies, and acoustic deterrents where appropriate. Fully compliant with AWBI guidelines. Backed by a 3-year material warranty.",
    icon: Bird,
    image: "/images/services/bird.png",
    accent: "teal",
    category: "both",
    startsFrom: 1499,
    duration: "Half-day installation",
    warranty: "3 years material",
    treatment: "exclusion",
    safety: [
      "100% humane — no killing",
      "AWBI-compliant methods",
      "Stainless steel spikes",
      "UV-stabilised netting",
    ],
    benefits: [
      "Permanent exclusion, not repeated killing",
      "3-year material warranty",
      "Won't damage your building facade",
      "Improves air-quality around AC units",
    ],
    treats: [
      "Pigeons",
      "Crows",
      "Sparrows",
      "Mynas",
    ],
    process: [
      {
        title: "Roosting Survey",
        description:
          "Map all roosting and nesting sites, fouling patterns, and approach flight paths. Photograph and measure each area.",
      },
      {
        title: "Custom Exclusion Plan",
        description:
          "Per-site recommendation: spikes for ledges, netting for ducts/balconies, acoustic deterrents for open areas. Fixed quote provided.",
      },
      {
        title: "Installation",
        description:
          "Stainless steel spikes bonded with structural adhesive (no drilling). UV-stabilised netting on SS framework. Half-day typical install.",
      },
      {
        title: "Annual Inspection",
        description:
          "Free annual inspection for 3 years. Netting re-tensioned, spikes re-adhered if needed, no service charge.",
      },
    ],
    faqs: [
      {
        q: "Is bird netting visible from inside?",
        a: "Modern UV-stabilised netting in black is virtually invisible from 3 metres. White netting is available for visible areas if preferred.",
      },
      {
        q: "Will birds find another spot on my building?",
        a: "Our survey identifies all current and potential roosting sites. We recommend treating the full perimeter to prevent displacement within the building.",
      },
    ],
  },
  {
    slug: "commercial-ipm",
    name: "Commercial IPM Programme",
    short:
      "Annual integrated pest management for restaurants, warehouses, hotels and offices. Audit-ready documentation.",
    long:
      "Commercial clients need more than one-off treatments — they need a documented IPM programme that satisfies FSSAI, ISO 22000, and HACCP auditors. We assign a dedicated account manager, install tamper-proof monitor stations, conduct scheduled visits, and provide digital service reports with trend analytics. Ideal for food processing, hospitality, retail, healthcare, and warehousing.",
    icon: Factory,
    image: "/images/services/commercial.png",
    accent: "orange",
    category: "commercial",
    startsFrom: 1499,
    duration: "Bimonthly scheduled",
    warranty: "Contract-bound",
    treatment: "baiting",
    safety: [
      "FSSAI-compliant protocols",
      "Tamper-proof monitor stations",
      "HACCP audit-ready reports",
      "Dedicated account manager",
    ],
    benefits: [
      "Single-vendor coverage across all sites",
      "Digital service reports with trend analytics",
      "Audit-ready documentation always available",
      "Guaranteed response within 4 hours",
    ],
    treats: [
      "Cockroaches",
      "Rodents",
      "Flies",
      "Stored-product pests",
      "Birds",
      "Occasional invaders",
    ],
    process: [
      {
        title: "Facility Risk Assessment",
        description:
          "Full-site audit maps pest pressure, sanitation gaps, structural risks, and audit requirements. Detailed risk-scoring report.",
      },
      {
        title: "Custom IPM Design",
        description:
          "Site-specific protocol covering monitor station placement, treatment thresholds, visit frequency, and documentation workflow.",
      },
      {
        title: "Scheduled Service Visits",
        description:
          "Bi-weekly or monthly visits per contract. Each visit logged with photo evidence, station counts, and trending data.",
      },
      {
        title: "Audit Support",
        description:
          "We attend FSSAI, ISO, HACCP and internal audits to defend our programme. Documentation portal access for your QA team.",
      },
    ],
    faqs: [
      {
        q: "Can you handle multi-site contracts across cities?",
        a: "Yes. We service Hyderabad, Chennai and Bangalore with a single contract, single account manager, and consolidated reporting across sites.",
      },
      {
        q: "How quickly can you respond to an emergency?",
        a: "Commercial contracts include a guaranteed 4-hour response time within city limits. Out-of-hours emergency response is available.",
      },
    ],
  },
];

export const serviceCategories = [
  { id: "all", label: "All services" },
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
] as const;

export const servicesBySlug = (slug: string) =>
  services.find((s) => s.slug === slug);

export const servicesByCategory = (category: string) =>
  category === "all"
    ? services
    : services.filter((s) => s.category === category || s.category === "both");
