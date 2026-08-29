/**
 * locations.ts — Single source of truth for service locations.
 * Coverage lists are priority service areas, not exhaustive guarantees.
 */

import { company } from "./company";

export interface LocationFaq {
  q: string;
  a: string;
}

export interface Location {
  slug: string;
  city: string;
  state: string;
  tagline: string;
  shortIntro: string;
  longIntro: string;
  phone: string;
  phoneHref: string;
  email: string;
  address: {
    line1: string;
    line2: string;
    landmark: string;
    pincode: string;
  };
  hours: string;
  coverage: string[];
  landmarks: string[];
  // Approximate normalised map coords for our SVG (0–100 range, India context)
  mapCoords: { x: number; y: number };
  faqs: LocationFaq[];
  responseTime: string;
  technicians: number;
  rating: number;
  reviewsCount: number;
}

export const locations: Location[] = [
  {
    slug: "isukapalli",
    city: "Isukapalli",
    state: "Andhra Pradesh",
    tagline: "Your trusted local pest control experts in Repalle.",
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
    mapCoords: { x: 65, y: 72 },
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
    state: "Telangana",
    tagline: "Our home city. Our strongest local coverage.",
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
    mapCoords: { x: 40, y: 58 },
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
    state: "Tamil Nadu",
    tagline: "Coastal-climate expertise. OMR to Anna Nagar.",
    shortIntro:
      "Serving Chennai's coastal and IT corridors with humidity-calibrated treatments. Field team based in T. Nagar.",
    longIntro:
      "Chennai's coastal humidity, aging drainage in central areas, and rapid IT corridor expansion along OMR create a unique pest pressure profile. Our T. Nagar field office prioritises a focused set of city areas and confirms nearby pin codes before scheduling. We specialise in high-humidity challenges: silverfish in book collections, coastal roach strains in older properties, and mosquito surges during the northeast monsoon.",
    phone: "+91 77024 87195",
    phoneHref: "+917702487195",
    email: "chn@sivapestcontrol.com",
    address: {
      line1: "12, 1st Avenue, T. Nagar",
      line2: "Chennai, Tamil Nadu",
      landmark: "Near Panagal Park, opposite Saravana Stores",
      pincode: "600017",
    },
    hours: "Mon–Sat · 8:00 AM – 8:00 PM",
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
    mapCoords: { x: 60, y: 78 },
    responseTime: "45 min average",
    technicians: 6,
    rating: 4.8,
    reviewsCount: 180,
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
    state: "Karnataka",
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
    mapCoords: { x: 50, y: 75 },
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
];
