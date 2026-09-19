/**
 * locations.ts — Single source of truth for service locations.
 *
 * Network shape (one office per state — we do NOT claim statewide coverage):
 *   1. Repalle (Isukapalli), Andhra Pradesh — REGISTERED HEAD OFFICE  (open)
 *   2. Hyderabad, Telangana                 — 2nd branch             (open)
 *   3. Bangalore, Karnataka                 — 3rd branch             (open)
 *   4. Chennai, Tamil Nadu                  — opening soon
 *   5. Kochi, Kerala                        — opening soon
 *
 * Two rules this file enforces for every consumer:
 *   - Only `head-office` and `branch` offices are staffed. `opening-soon`
 *     entries have no address, no team and no metrics, so they must never be
 *     rendered as a live office, listed in a "book a city" picker, or emitted
 *     as a served city in JSON-LD. Use `activeLocations` for anything that
 *     implies we can dispatch today.
 *   - Each office only guarantees its `coverage` list. Coverage is a set of
 *     priority localities, not an exhaustive guarantee — pin codes are always
 *     confirmed before booking.
 */

import { company } from "./company";

export interface LocationFaq {
  q: string;
  a: string;
}

export interface LocationAddress {
  line1: string;
  line2: string;
  landmark: string;
  pincode: string;
}

/**
 * Where a branch stands today.
 *   - `head-office`  — the registered head location (Repalli / Isukapalli, AP)
 *   - `branch`       — a staffed, operating branch office
 *   - `opening-soon` — announced and being set up. We do NOT run a team here
 *                      yet, so it must never be presented as a live office.
 */
export type LocationStatus = "head-office" | "branch" | "opening-soon";

export interface Location {
  slug: string;
  /** Short geo name — used for map labels, slugs and compact UI. */
  city: string;
  /**
   * Human-facing name shown in forms, cards and menus. Kept separate from
   * `city` because the head office trades under two names — the town
   * (Repalli) and the locality (Isukapalli).
   */
  label: string;
  state: string;
  status: LocationStatus;
  /** 1 = head office, 2 = 2nd branch, 3 = 3rd branch … Drives display order. */
  branchOrder: number;
  /** Short chip text: "Head office" · "2nd branch" · "Opening soon". */
  branchLabel: string;
  tagline: string;
  shortIntro: string;
  /** Long-form intro — only staffed offices have one worth reading. */
  longIntro?: string;
  phone: string;
  phoneHref: string;
  email: string;
  /** Absent until the branch is actually staffed and open. */
  address?: LocationAddress;
  hours: string;
  /** Priority areas for active offices; planned areas for upcoming ones. */
  coverage: string[];
  landmarks: string[];
  /** Real lat/lng for the South India network map. */
  geo: { lat: number; lng: number };
  faqs: LocationFaq[];
  responseTime?: string;
  technicians?: number;
  rating?: number;
  reviewsCount?: number;
  /** Shown in place of office metrics while a branch is still coming up. */
  openingNote?: string;
}

export const locations: Location[] = [
  {
    slug: "isukapalli",
    city: "Isukapalli",
    label: "Repalle (Isukapalli)",
    state: "Andhra Pradesh",
    status: "head-office",
    branchOrder: 1,
    branchLabel: "Head office",
    tagline: "Our registered head office. Local team, local knowledge.",
    shortIntro:
      "Serving Isukapalli, Repalle and nearby pin codes by appointment. Local team based in Isukapalli.",
    longIntro:
      "Siva Pest Control is proud to serve Isukapalli and the Repalle region with comprehensive pest management solutions. Our local team understands the unique pest challenges of this coastal Andhra Pradesh area — from termite infestations in traditional homes to mosquito surges during monsoon season and rodent issues in agricultural surroundings. We cover priority local areas first and confirm nearby pin-code availability before scheduling.",
    phone: company.phonePrimary,
    phoneHref: company.phonePrimaryHref,
    email: "repalle@sivapestcontrol.com",
    address: {
      line1: "6-10-98/10A MANDAVA, Kasturi Vari St",
      line2: "Isukapalle, Repalle, Andhra Pradesh",
      landmark: "Near Kasturi Vari Street Junction",
      pincode: "522265",
    },
    hours: "Mon–Sat · 8:00 AM – 8:00 PM",
    coverage: [
      "Isukapalli",
      "Repalle",
      "Penumudi",
      "Kavuru",
      "Nizampatnam",
    ],
    landmarks: [
      "Kasturi Vari Street Junction",
      "Repalle Bus Stand",
      "Repalle Railway Station",
      "Krishna River Bank",
      "Mandal Revenue Office, Repalle",
    ],
    geo: { lat: 16.0191, lng: 80.8323 },
    responseTime: "60 min average",
    technicians: 3,
    rating: 4.9,
    reviewsCount: 120,
    faqs: [
      {
        q: "Which areas around Isukapalli and Repalle do you cover?",
        a: "Our priority service areas are Isukapalli, Repalle, Penumudi, Kavuru and Nizampatnam. Nearby villages may be available by appointment; call us with your pin code and we will confirm before booking.",
      },
      {
        q: "Do you handle termite issues common in traditional Andhra homes?",
        a: "Yes — traditional homes in this region often have wood-heavy construction and are at high risk for subterranean termites. Our drill-fill-seal barrier treatment is specifically calibrated for these structures and backed by a 5-year warranty.",
      },
      {
        q: "How do you handle mosquito problems during monsoon near the Krishna River?",
        a: "Areas near the Krishna River and low-lying regions see high mosquito pressure during monsoon. We offer a 6-month mosquito contract with monthly service calls combining residual misting with Bti larvicidal treatment of standing water.",
      },
      {
        q: "Are your treatments safe for homes with children and pets?",
        a: "Absolutely. Our gel-bait method for cockroaches and ants is odourless, non-staining, and applied in hidden crevices. For other treatments, we use child-safe and pet-friendly formulations with clear re-entry guidelines.",
      },
      {
        q: "Do you provide services for agricultural storage and warehouses in the region?",
        a: "Yes. We service grain storage facilities, warehouses, and agricultural processing units with FSSAI-compliant protocols and stored-product pest management programmes.",
      },
    ],
  },
  {
    slug: "hyderabad",
    city: "Hyderabad",
    label: "Hyderabad",
    state: "Telangana",
    status: "branch",
    branchOrder: 2,
    branchLabel: "2nd branch",
    tagline: "Our largest branch. Strongest metro coverage.",
    shortIntro:
      "Serving core Hyderabad and Secunderabad areas with same-day response in most cases. Field team based in Madhapur.",
    longIntro:
      "Hyderabad is where Siva Pest Control was founded in 2012, and it remains our largest operation. Our Madhapur field office dispatches technicians across core service areas — from HITEC City and Gachibowli to Kukatpally, Banjara Hills, Jubilee Hills and Secunderabad. We know the local pest pressure: termite swarms in older independent houses, rodent surges in mature neighbourhoods, and mosquito spikes around low-lying areas. Nearby pin codes are confirmed before booking so expectations stay clear.",
    phone: company.phonePrimary,
    phoneHref: company.phonePrimaryHref,
    email: "hyd@sivapestcontrol.com",
    address: {
      line1: "Plot 14, Road 2, Madhapur",
      line2: "Hyderabad, Telangana",
      landmark: "Above Airtel Store, near Image Hospital",
      pincode: "500081",
    },
    hours: "Mon–Sat · 8:00 AM – 8:00 PM",
    coverage: [
      "Madhapur",
      "HITEC City",
      "Gachibowli",
      "Kondapur",
      "Kukatpally",
      "KPHB",
      "Miyapur",
      "Banjara Hills",
      "Jubilee Hills",
      "Secunderabad",
    ],
    landmarks: [
      "HITEC City metro station",
      "Image Hospital, Madhapur",
      "Inorbit Mall, Cyberabad",
      "KBR Park, Jubilee Hills",
      "Hussain Sagar lake front",
    ],
    geo: { lat: 17.4483, lng: 78.3915 },
    responseTime: "30 min average",
    technicians: 14,
    rating: 4.9,
    reviewsCount: 500,
    faqs: [
      {
        q: "Which areas of Hyderabad do you cover?",
        a: "Our priority Hyderabad areas include Madhapur, HITEC City, Gachibowli, Kondapur, Kukatpally, KPHB, Miyapur, Banjara Hills, Jubilee Hills and Secunderabad. Nearby pin codes may be available by appointment; call us before booking.",
      },
      {
        q: "Do you serve the IT corridors around Gachibowli and Financial District?",
        a: "Yes — we service most IT campuses, gated communities, and apartment complexes in the Financial District, Nanakramguda, and Wipro Circle. Same-day evening slots are available for working professionals.",
      },
      {
        q: "Are your treatments safe for the typical Hyderabad apartment layout?",
        a: "Absolutely. Most Hyderabad flats have open kitchens and adjacent dining areas — our gel-bait method is designed for exactly this layout. No evacuation needed, no staining on marble or granite.",
      },
      {
        q: "How do you handle termite issues in independent houses in Jubilee Hills and Banjara Hills?",
        a: "Older independent houses in these areas often have wood-heavy construction and mature gardens — high termite risk. Our drill-fill-seal barrier treatment is calibrated for these structures and backed by a 5-year warranty.",
      },
      {
        q: "Do you offer monsoon mosquito contracts near Hussain Sagar and other lake-side areas?",
        a: "Yes. Lakeside and low-lying areas see higher mosquito pressure during monsoon. We confirm your pin code first, then recommend a one-time service or monthly mosquito programme.",
      },
    ],
  },
  {
    slug: "chennai",
    city: "Chennai",
    label: "Chennai",
    state: "Tamil Nadu",
    status: "opening-soon",
    branchOrder: 4,
    branchLabel: "Opening soon",
    tagline: "Branch opening soon in T. Nagar — coastal-climate expertise on the way.",
    shortIntro:
      "Our Chennai branch is being set up. T. Nagar will be the first service hub, with bookings opening once the field team is in place.",
    longIntro:
      "Chennai's coastal humidity, aging drainage in central areas, and rapid IT corridor expansion along OMR create a unique pest pressure profile. We are setting up our Tamil Nadu branch in T. Nagar to serve it — prioritising a focused set of city areas once we open, and confirming nearby pin codes before scheduling. The team will specialise in high-humidity challenges: silverfish in book collections, coastal roach strains in older properties, and mosquito surges during the northeast monsoon.",
    phone: company.phonePrimary,
    phoneHref: company.phonePrimaryHref,
    email: "chn@sivapestcontrol.com",
    hours: "Mon–Sat · 8:00 AM – 8:00 PM",
    openingNote:
      "Opening soon. The T. Nagar office and field team are being set up — enquire now and we will confirm a start date.",
    coverage: [
      "T. Nagar",
      "Anna Nagar",
      "Adyar",
      "Velachery",
      "Sholinganallur",
    ],
    landmarks: [
      "Panagal Park, T. Nagar",
      "Anna Nagar Tower",
      "IIT Madras gate",
      "Phoenix MarketCity, Velachery",
      "ECR beach resorts",
    ],
    geo: { lat: 13.0827, lng: 80.2707 },
    // Deliberately no responseTime / technicians / rating / reviewsCount —
    // the branch is not staffed yet, so publishing office metrics or a
    // rating here would be a fabricated claim.
    faqs: [
      {
        q: "Do you cover the OMR IT corridor up to Sholinganallur and beyond?",
        a: "Sholinganallur is a priority area. Other OMR pin codes are handled by appointment depending on technician availability, so please call before booking.",
      },
      {
        q: "How do you handle the coastal humidity issue in Adyar and Besant Nagar?",
        a: "Coastal Chennai has higher silverfish, booklice, and roach pressure due to ambient humidity. Our protocols use humidity-stable gel formulations and include dehumidification advisory for storage areas.",
      },
      {
        q: "Are you equipped for older independent houses in Mylapore and Triplicane?",
        a: "Yes — these areas have unique challenges: wooden rafters, aging plumbing, and proximity to temples with food offerings. We use low-evaporation sprays that won't damage heritage woodwork.",
      },
      {
        q: "Do you provide mosquito control for beach houses and resorts?",
        a: "Yes, by prior scheduling. We confirm the exact Chennai or nearby coastal pin code before accepting the booking, then recommend fogging, larvicide, or a monsoon programme based on the site.",
      },
      {
        q: "What about Anna Nagar's apartment complexes?",
        a: "Anna Nagar has dense apartment clusters with shared plumbing stacks — ideal for coordinated roach treatment. We offer building-wide contracts with apartment-level reporting for resident associations.",
      },
    ],
  },
  {
    slug: "bangalore",
    city: "Bangalore",
    label: "Bangalore",
    state: "Karnataka",
    status: "branch",
    branchOrder: 3,
    branchLabel: "3rd branch",
    tagline: "Tech-city precision. Whitefield to Indiranagar.",
    shortIntro:
      "Serving Bangalore's tech corridors and gated communities with calibrate-to-altitude treatments. Field team in Koramangala.",
    longIntro:
      "Bangalore's moderate climate, dense gated communities, and high turnover tenant base create a different pest profile than other South Indian metros. Our Koramangala field office prioritises a focused set of city areas and confirms nearby pin codes before scheduling. We specialise in Bangalore's signature challenges: rodent pressure in tech parks, pigeon fouling on glass facades, and bed bug surges in PG accommodations near tech corridors.",
    phone: company.phonePrimary,
    phoneHref: company.phonePrimaryHref,
    email: "blr@sivapestcontrol.com",
    address: {
      line1: "80 Feet Road, Koramangala 4th Block",
      line2: "Bengaluru, Karnataka",
      landmark: "Above Sony World signal, near Sony Centre",
      pincode: "560034",
    },
    hours: "Mon–Sat · 8:00 AM – 8:00 PM",
    coverage: [
      "Koramangala",
      "Indiranagar",
      "HSR Layout",
      "Whitefield",
      "Sarjapur Road",
    ],
    landmarks: [
      "Sony World signal, Koramangala",
      "Phoenix Marketcity, Whitefield",
      "Indiranagar 100 Feet Road",
      "Manyata Tech Park, Hebbal",
      "Electronic City phase 1",
    ],
    geo: { lat: 12.9352, lng: 77.6245 },
    responseTime: "45 min average",
    technicians: 4,
    rating: 4.9,
    reviewsCount: 220,
    faqs: [
      {
        q: "Do you service the Whitefield–Sarjapur tech corridor?",
        a: "Whitefield and Sarjapur Road are priority areas. Nearby tech-corridor pin codes are handled by appointment depending on technician availability, so please call before booking.",
      },
      {
        q: "We live in a gated community on Sarjapur Road. Can you do a building-wide treatment?",
        a: "Absolutely. We offer association-wide contracts with shared-wall coordinated treatment — critical for effective roach and rodent control in modern gated communities.",
      },
      {
        q: "Do you handle pigeon netting for high-rise apartments in Bangalore?",
        a: "Yes — bird netting on balcony ducts and AC units is one of our most requested services in Bangalore. We use UV-stabilised nylon netting on SS framework with a 3-year warranty.",
      },
      {
        q: "Are your treatments calibrated for Bangalore's cooler climate?",
        a: "Yes. Bangalore's lower average temperature affects pest breeding cycles — cockroaches breed slower but bed bugs thrive in cooler indoor temps. Our treatment schedules reflect this.",
      },
      {
        q: "Do you serve PG accommodations and co-living spaces near tech parks?",
        a: "Yes. We have specific protocols for high-turnover shared housing, particularly for bed bug elimination. We confirm the exact Bangalore pin code and service slot before dispatch.",
      },
    ],
  },
  {
    slug: "kochi",
    city: "Kochi",
    label: "Kochi",
    state: "Kerala",
    status: "opening-soon",
    branchOrder: 5,
    branchLabel: "Opening soon",
    tagline: "Branch opening soon in Kochi — backwater-grade humidity expertise on the way.",
    shortIntro:
      "Our Kerala branch is being set up. Kochi will be the first service hub, with bookings opening once the field team is in place.",
    longIntro:
      "Kerala's year-round humidity, dense coastal vegetation and heavy monsoon cycles produce one of the most persistent pest profiles in South India — year-round mosquito breeding, damp-wood termite pressure, and ant and silverfish activity that never fully stops. We are setting up our Kerala branch in Kochi to serve it, prioritising a focused set of city areas once we open and confirming nearby pin codes before scheduling.",
    phone: company.phonePrimary,
    phoneHref: company.phonePrimaryHref,
    email: "kerala@sivapestcontrol.com",
    hours: "Mon–Sat · 8:00 AM – 8:00 PM",
    openingNote:
      "Opening soon. The Kochi office and field team are being set up — enquire now and we will confirm a start date.",
    coverage: [
      "Kakkanad",
      "Edappally",
      "Vyttila",
      "Fort Kochi",
      "Aluva",
    ],
    landmarks: [
      "Infopark, Kakkanad",
      "Lulu Mall, Edappally",
      "Vyttila Mobility Hub",
      "Marine Drive, Kochi",
      "Fort Kochi beach",
    ],
    geo: { lat: 9.9312, lng: 76.2673 },
    // Deliberately no responseTime / technicians / rating / reviewsCount —
    // the branch is not staffed yet, so office metrics would be invented.
    faqs: [
      {
        q: "When will the Kochi branch open?",
        a: "We are setting up the Kochi office and field team. Share your requirement now and we will confirm a start date — you will be contacted first once the team is in place.",
      },
      {
        q: "Can you service Kerala homes before the branch opens?",
        a: "Not on a routine basis yet. Kerala bookings start once the Kochi team is staffed, because every job needs a technician who can return for the free day-7 re-inspection.",
      },
      {
        q: "Which areas will the Kochi branch cover first?",
        a: "Kakkanad, Edappally, Vyttila, Fort Kochi and Aluva are planned as priority areas. Nearby pin codes will be confirmed before booking once the team is operational.",
      },
      {
        q: "How do you handle Kerala's year-round humidity?",
        a: "Our formulations and schedules are built for high-humidity environments — humidity-stable gels, damp-wood termite protocols and larvicide cycles that do not depend on a dry season.",
      },
    ],
  },
];

/* ───────────────────────────── Derived helpers ───────────────────────────── */
/*
 * IMPORTANT: prefer these over inventing ad-hoc filters at call sites.
 * The distinction between "we have an office here" and "we will soon have an
 * office here" is the whole point of the `status` field — a consumer that
 * ignores it will advertise coverage we cannot actually dispatch.
 */

/** Offices that are staffed and bookable today (head office + open branches). */
export const activeLocations: Location[] = locations.filter(
  (l) => l.status === "head-office" || l.status === "branch"
);

/** Announced but not yet staffed — never render these as live offices. */
export const upcomingLocations: Location[] = locations.filter(
  (l) => l.status === "opening-soon"
);

/** The registered head office (Repalle / Isukapalli, Andhra Pradesh). */
export const headOffice: Location =
  locations.find((l) => l.status === "head-office") ?? locations[0];

/** States where we can dispatch today — one office per state, not statewide. */
export const servedStates: string[] = Array.from(
  new Set(activeLocations.map((l) => l.state))
);

/**
 * Short city names used as the *value* of every "which city are you in?"
 * picker (contact form, inline quote form). Derived from `activeLocations`, so
 * an unopened branch can never become selectable — and because the contact
 * API validates against this same list, the picker and the server can never
 * drift apart again. Append "Other" at the call site when the form offers it.
 *
 * NOTE: this is the short `city`, not the `label` — "Isukapalli" books, while
 * "Repalle (Isukapalli)" is only ever shown as display text.
 */
export const bookableCities: string[] = activeLocations.map((l) => l.city);

/** Compact network summary for headings and badges. */
export const networkSummary = {
  totalOffices: locations.length,
  openOffices: activeLocations.length,
  openingSoonOffices: upcomingLocations.length,
  states: servedStates,
  /** "3 offices" — for badges where the count alone reads oddly. */
  openOfficesLabel: `${activeLocations.length} offices`,
  /** "Chennai & Kochi" — for "opening soon" notes. */
  upcomingLocationsLabel: upcomingLocations.map((l) => l.label).join(" & "),
};
