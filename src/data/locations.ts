/**
 * locations.ts — Single source of truth for service locations.
 * Each city has full local SEO content: address, phone, coverage, testimonials, FAQs, map coords.
 */

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
    slug: "hyderabad",
    city: "Hyderabad",
    state: "Telangana",
    tagline: "Our home city. Our deepest coverage.",
    shortIntro:
      "Serving 28 zones across Hyderabad and Secunderabad with same-day response in most areas. Field team based in Madhapur.",
    longIntro:
      "Hyderabad is where Siva Pest Control was founded in 2009, and it remains our largest operation. Our Madhapur field office dispatches technicians across 28 zones — from HITEC City and Gachibowli to Kukatpally, Banjara Hills, and Old City. With 34 certified technicians on the ground and a guaranteed 2-hour response window in most pin codes, we're the city's most responsive premium pest control service. We know the local pest pressure: termite swarms in Banjara Hills, rodent surges in Secunderabad's older housing, mosquito spikes around Hussain Sagar. Our treatments are calibrated for Hyderabad's climate and construction patterns.",
    phone: "+91 90000 24680",
    phoneHref: "+919000024680",
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
      "Begumpet",
      "Ameerpet",
      "Secunderabad",
      "Tarnaka",
      "Habsiguda",
      "Uppal",
      "LB Nagar",
      "Dilsukhnagar",
      "Hafeezpet",
      "Nallagandla",
      "Tellapur",
      "Mokila",
      "Shamshabad",
      "Attapur",
      "Mehdipatnam",
      "Manikonda",
      "Narsingi",
      "Kollur",
      "Patancheru",
    ],
    landmarks: [
      "HITEC City metro station",
      "Image Hospital, Madhapur",
      "Inorbit Mall, Cyberabad",
      "KBR Park, Jubilee Hills",
      "Hussain Sagar lake front",
    ],
    mapCoords: { x: 40, y: 58 },
    responseTime: "95 min average",
    technicians: 34,
    rating: 4.9,
    reviewsCount: 2140,
    faqs: [
      {
        q: "Which areas of Hyderabad do you cover?",
        a: "We cover 28 zones across Hyderabad and Secunderabad, including HITEC City, Gachibowli, Kukatpally, Banjara Hills, Jubilee Hills, and Old City. If your pin code is within 25km of Madhapur, we can typically reach you the same day.",
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
        a: "Yes. Lakeside and low-lying areas see 3-4x mosquito pressure during monsoon. We offer a 6-month mosquito contract with monthly service calls specifically for these zones.",
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
      "Chennai's coastal humidity, aging drainage in central areas, and rapid IT corridor expansion along OMR create a unique pest pressure profile. Our T. Nagar field office operates 24 technicians covering 22 zones — from Anna Nagar and Adyar to Sholinganallur and ECR. We specialise in the high-humidity challenges that Chennai homes face: silverfish in book collections, coastal roach strains in older properties, and mosquito surges during the northeast monsoon. Every treatment is calibrated for Chennai's salt-tinged air and high water table.",
    phone: "+91 90000 24681",
    phoneHref: "+919000024681",
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
      "Besant Nagar",
      "Mylapore",
      "Velachery",
      "Guindy",
      "Nungambakkam",
      "Egmore",
      "Teynampet",
      "Royapettah",
      "Thiruvanmiyur",
      "Perungudi",
      "Sholinganallur",
      "Navalur",
      "Semmenchery",
      "Karapakkam",
      "Shastri Nagar",
      "Porur",
      "Mogappair",
      "Ambattur",
      "ECR stretch",
    ],
    landmarks: [
      "Panagal Park, T. Nagar",
      "Anna Nagar Tower",
      "IIT Madras gate",
      "Phoenix MarketCity, Velachery",
      "ECR beach resorts",
    ],
    mapCoords: { x: 60, y: 78 },
    responseTime: "105 min average",
    technicians: 24,
    rating: 4.8,
    reviewsCount: 1680,
    faqs: [
      {
        q: "Do you cover the OMR IT corridor up to Sholinganallur and beyond?",
        a: "Yes — full coverage from Madhya Kailash to Kelambakkam on OMR, including Sholinganallur, Navalur, Semmenchery, and Siruseri. Evening slots available for IT professionals.",
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
        q: "Do you provide mosquito control for ECR beach houses and resorts?",
        a: "Absolutely. We service multiple resorts along ECR with our monsoon mosquito programme, combining residual misting with Bti larvicidal treatment of standing water features.",
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
      "Bangalore's moderate climate, dense gated communities, and high turnover tenant base create a different pest profile than other South Indian metros. Our Koramangala field office deploys 20 technicians across 24 zones — from Whitefield and Sarjapur to Indiranagar and Yelahanka. We specialise in Bangalore's signature challenges: rodent pressure in tech parks, pigeon fouling on glass facades, and bed bug surges in PG accommodations near tech corridors. Every technician is trained for the city's modern apartment layouts and shared-wall construction.",
    phone: "+91 90000 24682",
    phoneHref: "+919000024682",
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
      "BTM Layout",
      "Jayanagar",
      "JP Nagar",
      "Banashankari",
      "Whitefield",
      "Marathahalli",
      "Sarjapur Road",
      "Bellandur",
      "Kadubeesanahalli",
      "Electronic City",
      "Bommanahalli",
      "Hebbal",
      "Yelahanka",
      "Malleswaram",
      "Rajajinagar",
      "Vijayanagar",
      "RR Nagar",
      "Kengeri",
      "Hennur",
      "Thanisandra",
      "Yeshwanthpur",
    ],
    landmarks: [
      "Sony World signal, Koramangala",
      "Phoenix Marketcity, Whitefield",
      "Indiranagar 100 Feet Road",
      "Manyata Tech Park, Hebbal",
      "Electronic City phase 1",
    ],
    mapCoords: { x: 50, y: 75 },
    responseTime: "110 min average",
    technicians: 20,
    rating: 4.9,
    reviewsCount: 1920,
    faqs: [
      {
        q: "Do you service the Whitefield–Sarjapur tech corridor?",
        a: "Yes — full coverage from Whitefield to Sarjapur Road, including Bellandur, Kadubeesanahalli, Carmeleram, and Hadosiddapura. Evening and weekend slots for IT professionals.",
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
        a: "Yes. We have specific protocols for high-turnover shared housing — particularly for bed bug elimination, which is a recurring issue in PGs near Marathahalli and Bellandur.",
      },
    ],
  },
];

export const locationBySlug = (slug: string) =>
  locations.find((l) => l.slug === slug);
