/**
 * faqs.ts — General FAQs (not service-specific).
 * Service-specific FAQs live in services.ts.
 * Location-specific FAQs live in locations.ts.
 */

export interface Faq {
  q: string;
  a: string;
  category: "general" | "safety" | "booking" | "warranty";
}

export const faqs: Faq[] = [
  // General
  {
    category: "general",
    q: "Which cities and states does Siva Pest Control serve?",
    a: "We have staffed field offices in Andhra Pradesh (our registered head office at Isukapalli, Repalle) and Telangana (Hyderabad). Chennai, Bangalore and Kochi branches are announced future branches — bookings there open once the local field team is staffed. If you're outside these areas, please call us and we may be able to help.",
  },
  {
    category: "general",
    q: "What makes Siva Pest Control different from other pest control companies?",
    a: "Four things: first, we use eco-friendly household pest chemicals that are safe for pregnant women, children and the elderly. Second, we carry high-quality products in both odour-controlled and completely odourless variants, so you choose the level of odour you're comfortable with. Third, we are a certified and licensed pest service provider — every product is CIB & RC registered. Fourth, every treatment comes with a written re-treatment warranty.",
  },
  {
    category: "general",
    q: "Do you offer same-day or emergency service?",
    a: "Yes. We maintain a 30-minute average response window in most pin codes across Andhra Pradesh and Telangana, with same-day service available. For genuine emergencies (rodent in a nursery, swarm of bees, etc.), call our priority line and we'll dispatch the nearest technician. Emergency surcharge applies only for after-hours (8 PM – 8 AM) callouts.",
  },
  {
    category: "general",
    q: "How long has Siva Pest Control been in business?",
    a: "We were founded in September 2012 in Repalle, Andhra Pradesh and have grown to two states over 14+ years, with Hyderabad, Telangana as our second branch since 2025. We've protected over 12,000 homes and 480 commercial sites. We're ISO 9001:2015 certified, FSSAI compliant, CIB & RC registered, and a Green Pro Service Provider.",
  },

  // Safety
  {
    category: "safety",
    q: "Are your treatments safe for children and pets?",
    a: "Yes — this is non-negotiable for us. Our standard residential protocols use gel-bait (applied in hidden micro-dots), mechanical trapping, and exclusion. Sprays are reserved for outdoor perimeter and unoccupied areas only. We brief you on re-entry time before every treatment and provide a safety data sheet on request.",
  },
  {
    category: "safety",
    q: "Do we need to leave the house during treatment?",
    a: "For most residential treatments (cockroach gel, rodent control, ant barrier) — no, you can stay home. For sprays (termite, bed bugs, mosquito, disinfection), we recommend 2 to 6 hours of vacancy depending on the treatment. Your technician will confirm re-entry time before starting work.",
  },
  {
    category: "safety",
    q: "Are your products safe for kitchens and food-contact surfaces?",
    a: "Our gel-bait is applied in hidden crevices, not on surfaces, so food-contact areas are never treated. For commercial kitchens, we use FSSAI-compliant protocols with tamper-proof bait stations only. We provide full safety documentation for food-industry clients.",
  },
  {
    category: "safety",
    q: "What if someone in the household has respiratory issues or allergies?",
    a: "Please tell our booking team in advance. We have low-odour and odour-free formulations for sensitive occupants, and we can schedule sprays during your absence. For severe respiratory conditions, we'll recommend gel-only or mechanical-only protocols.",
  },

  // Booking
  {
    category: "safety",
    q: "Are your household pest chemicals safe for pregnant women, children and elderly people?",
    a: "Yes — that is the standard we hold ourselves to for every residential job. Our household pest chemical services use eco-friendly, CIB & RC registered products selected for their safety profile, not just their kill rate. We choose gel-bait, mechanical and exclusion methods wherever possible, and where a spray is genuinely needed we use low-toxicity formulations that are safe for pregnant women, infants and senior citizens when applied per protocol. Tell us who is in the house and we will select the safest effective option for that household.",
  },
  {
    category: "safety",
    q: "Do you offer odourless and low-odour treatments?",
    a: "Yes. We carry high-quality chemicals in both odour-controlled and completely odourless variants. If you have asthma, allergies, a newborn, or simply don't want a smell in your home, ask for the odourless option and we will quote and treat accordingly. Gel-bait and mechanical methods are naturally odourless and are our default for kitchens, bedrooms and occupied living areas.",
  },
  {
    category: "safety",
    q: "Are you a certified and licensed pest service provider?",
    a: "Yes. We are a certified, licensed pest service provider — ISO 9001:2015 certified, FSSAI compliant, CIB & RC registered for every product we use, an IPCA member, and a recognised Green Pro Service Provider. Our technicians are full-time employees, not contractors, and every job is documented with a photo service report.",
  },
  {
    category: "booking",
    q: "How do I book a service?",
    a: "Three ways: call our priority line, WhatsApp us, or use the Get Quote form on this site. We'll confirm the visit slot, share the technician's name and photo before arrival, and provide a fixed-price quote upfront. No hidden charges, no upsell at the door.",
  },
  {
    category: "booking",
    q: "Do I need a separate inspection visit before booking?",
    a: "No. There is no pre-visit or free-visit call-out. For most residential services we give you a fixed price over the phone or on WhatsApp based on your property size and pest type, and the technician assesses the site on the day of the treatment itself — assess and treat in one visit. No extra visit, no extra charge.",
  },
  {
    category: "booking",
    q: "What are your contact numbers?",
    a: "Andhra Pradesh (head office, Isukapalli/Repalle): 77024 87195 and 93955 32359. Telangana (Hyderabad branch): 98491 57510 and 78420 87195. You can also WhatsApp us on any of these numbers during business hours.",
  },
  {
    category: "booking",
    q: "What payment methods do you accept?",
    a: "UPI, all major credit and debit cards, net banking, and cash. For commercial contracts, we issue monthly invoices with 15-day payment terms. GST invoice with every transaction.",
  },
  {
    category: "booking",
    q: "Can I reschedule or cancel a booking?",
    a: "Yes, free of charge up to 4 hours before your slot. Within 4 hours, a nominal fee may apply. Emergency cancellations (family emergency, medical) are always waived — just call us.",
  },

  // Warranty
  {
    category: "warranty",
    q: "What does your service warranty cover?",
    a: "Each service has a written re-treatment warranty (180 days for cockroach gel, 90 days for bed bugs and rodent, 5 years for termite, etc.). If you see the treated pest in the treated area within the warranty period, we return free of charge to re-treat. Warranty requires that you follow prevention advisories provided by your technician.",
  },
  {
    category: "warranty",
    q: "How do I claim the warranty if pests return?",
    a: "Call our priority line or WhatsApp us with your booking ID. We'll dispatch a technician within 48 hours (same-day in most cases). No paperwork, no questions, no service charge. We log every warranty visit and use the data to improve our protocols.",
  },
  {
    category: "warranty",
    q: "Is the termite warranty transferable to a new owner?",
    a: "Yes — our 5-year termite warranty is fully transferable to the new owner if you sell your property. We'll issue a fresh warranty certificate in the new owner's name on request. This is a valuable selling point for termite-treated properties.",
  },
];

export const faqsByCategory = (category: Faq["category"]) =>
  faqs.filter((f) => f.category === category);
