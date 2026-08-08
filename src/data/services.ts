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
  Wind,
  Cat,
  CloudFog,
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
  {
    slug: "lizard-control",
    name: "Lizard Control",
    short:
      "Egg-repellent spray + mechanical exclusion that drives lizards out without killing them. Child-safe, pet-safe.",
    long:
      "Lizards are harmless but their droppings stain walls, contaminate food surfaces, and signal an underlying insect problem (lizards follow their prey). Our lizard control programme combines a botanical egg-repellent spray on walls, corners, and light fixtures with mechanical exclusion — sealing the gaps where geckos enter. We also treat the underlying insect population that attracts them. Backed by a 90-day re-treatment warranty.",
    icon: Cat,
    image: "/images/pests/spider.png",
    accent: "teal",
    category: "both",
    startsFrom: 699,
    duration: "45 min",
    warranty: "90 days",
    treatment: "spray",
    safety: [
      "Botanical egg-repellent formulation",
      "Non-toxic to children and pets",
      "No harm to lizards — repels only",
      "Stainless on painted walls",
    ],
    benefits: [
      "Drives lizards out without killing",
      "Treats the underlying insect food source",
      "Seals entry points to prevent re-entry",
      "90-day re-treatment warranty",
    ],
    treats: [
      "Common house gecko",
      "Garden lizards",
      "Wall lizards",
    ],
    process: [
      {
        title: "Population Survey",
        description:
          "Map lizard sightings, egg clusters, droppings, and prey-insect hotspots. Identify the species (gecko vs garden lizard) to calibrate treatment.",
      },
      {
        title: "Repellent Spray Application",
        description:
          "Botanical egg-repellent applied to walls, light fixtures, AC units, and ceiling corners. Lizards avoid treated surfaces for 60–90 days.",
      },
      {
        title: "Insect Source Treatment",
        description:
          "Underlying insect prey (flies, moths, ants) treated with gel-bait and residual spray — removes the food source that attracted lizards.",
      },
      {
        title: "Exclusion Advisory",
        description:
          "Detailed report listing gaps around windows, pipes, and vents where geckos enter. Sealant recommendations for your handyman.",
      },
    ],
    faqs: [
      {
        q: "Will the treatment kill the lizards?",
        a: "No. We use a botanical repellent that drives lizards away from treated surfaces without killing them. The formulation is non-toxic to children, pets, and the lizards themselves.",
      },
      {
        q: "How long until lizards stop appearing?",
        a: "Lizards typically avoid treated surfaces within 24–48 hours and fully vacate within a week. Combining repellent with insect-source treatment accelerates the result.",
      },
      {
        q: "Why do lizards keep coming back?",
        a: "Lizards follow their prey — flies, moths, ants. If you only repel lizards without treating the insect population, they return once the repellent wears off. Our dual approach addresses both.",
      },
    ],
  },
  {
    slug: "snake-control",
    name: "Snake Control & Removal",
    short:
      "Emergency snake removal + perimeter exclusion for properties near open land, lakes, and gardens. 24/7 hotline.",
    long:
      "Snakes entering residential or commercial premises is a serious safety hazard — particularly in properties adjacent to open land, lakes, or agricultural areas. Our snake control programme combines 24/7 emergency removal by trained handlers, perimeter exclusion (mesh barriers and entry-point sealing), and rodent population control (snakes follow rodents). All handlers are trained in safe capture and release protocols. Snake identification and first-aid advisory included.",
    icon: Wind,
    image: "/images/pests/rodent.png",
    accent: "rust",
    category: "both",
    startsFrom: 1499,
    duration: "60–90 min initial + perimeter",
    warranty: "90 days exclusion",
    treatment: "exclusion",
    safety: [
      "Trained snake handlers only",
      "Non-lethal capture and release",
      "Forest-department guidelines followed",
      "24/7 emergency hotline",
    ],
    benefits: [
      "24/7 emergency response within city limits",
      "Trained handlers — safe for family and pets",
      "Perimeter exclusion prevents re-entry",
      "Rodent source control removes attractant",
    ],
    treats: [
      "Common rat snake",
      "Spectacled cobra",
      "Russell's viper",
      "Saw-scaled viper",
      "Common krait",
    ],
    process: [
      {
        title: "Emergency Dispatch",
        description:
          "On call, our handler reaches your location within 30–60 minutes (city limits). Snake identified and safely captured using professional tongs and bags.",
      },
      {
        title: "Relocation",
        description:
          "Captured snake released into nearby forest or scrubland as per Forest Department guidelines. Photo documentation provided for insurance and records.",
      },
      {
        title: "Perimeter Survey",
        description:
          "Property inspected for entry points — gaps in compound walls, drain covers, open vents, garden debris. Exclusion plan prepared.",
      },
      {
        title: "Exclusion & Source Control",
        description:
          "Mesh barriers installed at entry points. Rodent control programme deployed (snakes follow rats). 90-day follow-up included.",
      },
    ],
    faqs: [
      {
        q: "What should I do if I see a snake on my property?",
        a: "Stay calm, keep children and pets at a safe distance (3+ metres), do not attempt to kill or capture the snake. Note its colour and pattern from a distance. Call our 24/7 hotline — our handler will guide you on safe-distance protocols while dispatching.",
      },
      {
        q: "Are your handlers licensed?",
        a: "Our snake handlers are trained in safe-capture protocols and follow Forest Department relocation guidelines. We carry professional equipment — snake tongs, hooks, sealed bags, and bite-proof gloves.",
      },
      {
        q: "How can I prevent snakes from entering my property?",
        a: "Three steps: (1) eliminate rodent populations — snakes follow rats, (2) seal gaps in compound walls and drain covers, (3) clear garden debris and tall grass where snakes hide. Our perimeter exclusion programme covers all three.",
      },
      {
        q: "Do you handle venomous snakes?",
        a: "Yes — our handlers are equipped to safely capture both venomous (cobra, viper, krait) and non-venomous species. All captured snakes are released unharmed per Forest Department norms.",
      },
    ],
  },
  {
    slug: "honey-bee-removal",
    name: "Honey Bee Hive Removal",
    short:
      "Live-removal of honey bee colonies from walls, chimneys, and trees. No extermination — bees relocated to apiaries.",
    long:
      "Honey bee colonies inside residential walls, chimneys, or false ceilings are a stinging hazard and a honey-damage risk — but bees are also protected pollinators essential to agriculture. Our hive removal service uses live-capture techniques (smoker calming + vacuum extraction) to relocate the entire colony to a partner apiary. Includes honey and wax cleanup from wall cavities to prevent re-colonisation and structural damage. 90-day re-treatment warranty.",
    icon: Bug,
    image: "/images/pests/fly.png",
    accent: "orange",
    category: "both",
    startsFrom: 1999,
    duration: "2–4 hours (hive dependent)",
    warranty: "90 days",
    treatment: "exclusion",
    safety: [
      "Live-capture, no extermination",
      "Professional bee suits and smoker",
      "Colony relocated to partner apiary",
      "Honey and wax residue cleaned",
    ],
    benefits: [
      "Colony relocated, not exterminated",
      "Prevents honey damage to wall cavities",
      "Seals entry to prevent re-colonisation",
      "90-day re-treatment warranty",
    ],
    treats: [
      "Indian honey bee (Apis cerana)",
      "Rock bee (Apis dorsata)",
      "Stingless bee (Trigona)",
      "Wasp nests (secondary service)",
    ],
    process: [
      {
        title: "Hive Assessment",
        description:
          "Locate hive entrance, estimate colony size, and identify species. Bee suits and smoker prepared. Plan extraction route to minimise bee stress.",
      },
      {
        title: "Colony Calming",
        description:
          "Smoker applied at hive entrance — calms bees and prevents swarming attack. Technician in full bee suit begins careful extraction.",
      },
      {
        title: "Vacuum Extraction",
        description:
          "Gentle bee-vacuum removes bees (including queen) into a transport box. Comb removed intact when accessible. Brood preserved for re-establishment at apiary.",
      },
      {
        title: "Cavity Cleanup + Sealing",
        description:
          "Honey and wax residue cleaned from wall cavity (prevents re-colonisation and structural damage). Entry point sealed with mesh or structural repair.",
      },
    ],
    faqs: [
      {
        q: "Do you kill the bees?",
        a: "No. Honey bees are protected pollinators essential to agriculture. We use live-capture techniques — smoker calming + gentle vacuum extraction — and relocate the entire colony (including queen) to a partner apiary.",
      },
      {
        q: "Why is the wall cavity cleaned after removal?",
        a: "Residual honey and wax inside the wall attracts new swarms (bees can smell old hive pheromones for years) and ferments, causing structural damage, stains, and odour. Thorough cleanup is essential to prevent re-colonisation.",
      },
      {
        q: "How long does the removal take?",
        a: "1–4 hours depending on colony size, hive accessibility, and cavity depth. Wall-cavity hives take longer than exposed tree or chimney hives.",
      },
      {
        q: "Can you remove wasp nests too?",
        a: "Yes — wasp nest removal is offered as a related service. Wasps are aggressive defenders, so we use a separate protocol with residual spray at night when the colony is dormant.",
      },
    ],
  },
  {
    slug: "spider-control",
    name: "Spider Control",
    short:
      "Web removal + residual spray that eliminates spiders and the insects they hunt. Stain-free indoor formulation.",
    long:
      "Most Indian household spiders are harmless, but their webs collect dust, their droppings stain walls and ceilings, and heavy infestations signal an underlying insect problem (spiders follow their prey). Our spider control programme combines web removal with a residual spray on corners, light fixtures, and baseboards. We also treat the insect population that attracted them in the first place — without addressing the food source, spiders return within weeks.",
    icon: Bug,
    image: "/images/pests/spider.png",
    accent: "teal",
    category: "both",
    startsFrom: 599,
    duration: "45 min",
    warranty: "90 days",
    treatment: "spray",
    safety: [
      "Stain-free indoor formulation",
      "Pet-safe once dry (30 min)",
      "No odour",
      "Targets web-spinning and hunting spiders",
    ],
    benefits: [
      "Eliminates spiders and egg sacs",
      "Removes existing webs from corners",
      "Treats the insect food source",
      "90-day re-treatment warranty",
    ],
    treats: [
      "Common house spider",
      "Cellar spider",
      "Wolf spider",
      "Jumping spider",
      "Brown recluse (caution — venomous)",
    ],
    process: [
      {
        title: "Web Survey",
        description:
          "Map all web locations, egg sacs, and hunting spider hotspots. Identify species (most are harmless; brown recluse requires caution).",
      },
      {
        title: "Web Removal",
        description:
          "Existing webs and egg sacs vacuumed from corners, ceilings, light fixtures, and behind furniture. This alone removes 60–70% of the visible population.",
      },
      {
        title: "Residual Spray",
        description:
          "Stain-free residual spray applied to corners, baseboards, behind furniture, and around light fixtures (spiders hunt where insects gather).",
      },
      {
        title: "Insect Source Treatment",
        description:
          "Underlying insect population (flies, moths, ants) treated with gel-bait — removes the food source that attracted spiders.",
      },
    ],
    faqs: [
      {
        q: "Are house spiders dangerous?",
        a: "Most Indian household spiders (cellar, wolf, jumping) are harmless and actually beneficial — they prey on flies and mosquitoes. The brown recluse, identified by a violin-shaped mark, is venomous and requires caution. Our technician will flag any recluse sightings.",
      },
      {
        q: "Will the spray stain my walls?",
        a: "No. We use a stain-free indoor formulation that dries clear on painted walls, wood, and fabric. Safe for all standard interior surfaces.",
      },
      {
        q: "Why do spiders keep coming back?",
        a: "Spiders follow their prey — if you only kill spiders without addressing the underlying insect population, they return once the residual wears off. Our dual approach treats both layers.",
      },
    ],
  },
  {
    slug: "fly-control",
    name: "Housefly & Fruit Fly Control",
    short:
      "UV light traps + residual spray + drain treatment that breaks the fly breeding cycle at source. FSSAI-audit-ready.",
    long:
      "Flies are more than a nuisance — they carry 100+ pathogens including salmonella, E. coli, and cholera, transferring them by walking on food after visiting garbage or faeces. Our fly control programme combines UV light traps (commercial kitchens, restaurants), residual spray on fly resting surfaces, drain treatment for fruit-fly breeding sites, and source-reduction advisory. Particularly critical for FSSAI/HACCP-compliant food businesses — a single fly sighting during audit can fail your certification.",
    icon: Bug,
    image: "/images/pests/fly.png",
    accent: "orange",
    category: "both",
    startsFrom: 799,
    duration: "60–90 min",
    warranty: "60 days",
    treatment: "spray",
    safety: [
      "Food-safe residual once dry",
      "UV traps rated for food areas",
      "Drain treatment biodegradable",
      "FSSAI-compliant protocol",
    ],
    benefits: [
      "Breaks breeding cycle at source",
      "UV traps catch adult flies 24/7",
      "Drain treatment eliminates fruit-fly larvae",
      "FSSAI audit-ready documentation",
    ],
    treats: [
      "Housefly (Musca domestica)",
      "Fruit fly (Drosophila)",
      "Drain fly (Psychodidae)",
      "Blowfly (Calliphoridae)",
    ],
    process: [
      {
        title: "Breeding Site Audit",
        description:
          "Identify all fly breeding sites — garbage bins, drains, food waste, compost, pet areas. Source-reduction advisory prepared for each.",
      },
      {
        title: "UV Light Trap Installation",
        description:
          "Wall-mounted UV light traps installed at strategic fly-entry points (commercial kitchens, dining areas). Traps operate 24/7, catching adults before they reach food.",
      },
      {
        title: "Residual Spray",
        description:
          "Residual spray applied to fly resting surfaces — walls, ceilings, near windows. Flies rest on treated surfaces and die within hours.",
      },
      {
        title: "Drain Treatment",
        description:
          "Biodegradable drain foam applied to kitchen and bathroom drains — eliminates fruit-fly and drain-fly larvae that breed in drain biofilm.",
      },
    ],
    faqs: [
      {
        q: "Are UV light traps safe for food areas?",
        a: "Yes. We use only FSSAI-compliant UV traps with shatterproof tubes and a catch tray (no zapping grid that aerosolises insect particles). These are the same models used in commercial kitchens and food manufacturing units.",
      },
      {
        q: "Why do fruit flies keep coming back in my kitchen?",
        a: "Fruit flies breed in moist organic matter — drain biofilm, garbage disposals, overripe fruit, and empty bottles. Eggs hatch in 8 hours at Indian room temperature. Unless you eliminate the breeding site (not just the visible adults), they will return. Our drain treatment addresses the most common hidden breeding source.",
      },
      {
        q: "How is this different from general disinfection?",
        a: "General disinfection targets pathogens on surfaces using ULV fogging. Fly control specifically targets fly populations using UV traps, residual on fly resting surfaces, and drain treatment for larvae. They are complementary, not substitutes.",
      },
    ],
  },
  {
    slug: "fogging-service",
    name: "Outdoor Mosquito Fogging",
    short:
      "Thermal fogging for campuses, gated communities, and event venues. Visible mosquito drop within 30 minutes.",
    long:
      "Outdoor thermal fogging is the fastest way to suppress adult mosquito populations across large open areas — gated communities, apartment complexes, parks, wedding venues, construction sites, and factory campuses. Our thermal fogger disperses a fine oil-based insecticide fog that penetrates shrubs, hedges, drains, and shaded areas where mosquitoes rest. Visible drop in mosquito activity within 30 minutes. Single-event fogging for events or monthly contracts for monsoon-season protection.",
    icon: CloudFog,
    image: "/images/services/mosquito.png",
    accent: "teal",
    category: "both",
    startsFrom: 1999,
    duration: "60 min per acre",
    warranty: "Single event or monthly contract",
    treatment: "fumigation",
    safety: [
      "Oil-based fog — penetrates foliage",
      "Pyrethroid active (low mammalian toxicity)",
      "Re-entry 30 minutes after fogging",
      "Fish-pond cover advisory provided",
    ],
    benefits: [
      "Visible mosquito drop in 30 minutes",
      "Covers up to 2 acres per session",
      "Penetrates shrubs, hedges, drains",
      "Ideal for events, campuses, complexes",
    ],
    treats: [
      "Aedes (dengue) adult mosquitoes",
      "Anopheles (malaria) adult mosquitoes",
      "Culex (filaria) adult mosquitoes",
      "Outdoor resting flies",
    ],
    process: [
      {
        title: "Site Walkthrough",
        description:
          "Map the fogging route covering all mosquito resting sites — shrubs, hedges, drains, eaves, shaded walls, and tree canopies. Identify fish ponds and pet areas requiring cover.",
      },
      {
        title: "Pre-Fog Advisory",
        description:
          "Inform residents/guests 24 hours in advance. Cover fish ponds, pet food, and open water. Close windows during fogging and for 30 minutes after.",
      },
      {
        title: "Thermal Fogging",
        description:
          "Thermal fogger disperses 0.5–5 micron oil-based fog at dawn or dusk (peak mosquito activity). Fog penetrates all vegetation and shaded resting sites.",
      },
      {
        title: "Re-Entry & Source Advisory",
        description:
          "Re-entry 30 minutes after fogging. Source-reduction advisory covering standing water, drains, and overhead tanks — fogging kills adults, source control prevents re-emergence.",
      },
    ],
    faqs: [
      {
        q: "Is the fog safe for children and pets?",
        a: "The active ingredient (pyrethroid) has low mammalian toxicity, but we recommend keeping children and pets indoors during fogging and for 30 minutes after — until the fog has fully dispersed. Cover fish ponds and pet food before treatment.",
      },
      {
        q: "How long does the effect last?",
        a: "Fogging kills adult mosquitoes present at time of treatment — visible drop within 30 minutes. However, new adults emerge from standing water within 7–10 days. For sustained control, monthly fogging during monsoon combined with larvicidal source treatment is recommended.",
      },
      {
        q: "When is the best time to fog?",
        a: "Dawn (5–7 AM) or dusk (5–7 PM) when mosquitoes are most active and the air is calm — fog drifts evenly through vegetation. Mid-day fogging is less effective because heat currents disperse the fog before it reaches mosquito resting sites.",
      },
      {
        q: "Can you fog for a wedding or outdoor event?",
        a: "Yes — single-event fogging is one of our most popular services. We fog the venue at dawn on the event day, with re-fogging available at dusk if needed. Includes pre-event source-reduction advisory for the surrounding area.",
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
