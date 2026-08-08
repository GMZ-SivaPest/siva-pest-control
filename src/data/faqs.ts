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
    q: "Which cities does Siva Pest Control serve?",
    a: "We currently serve Hyderabad, Chennai, and Bangalore with full field teams in each city. We're expanding to Pune and Coimbatore in late 2026. If you're outside our service area, please call us — we may be able to recommend a vetted partner.",
  },
  {
    category: "general",
    q: "What makes Siva Pest Control different from other pest control companies?",
    a: "Three things: first, we use only child-safe and pet-safe formulations calibrated for South Indian homes. Second, every treatment comes with a written re-treatment warranty — if pests return within the warranty period, we return free. Third, our technicians are full-time employees (not contractors) trained at our internal academy, so quality is consistent across visits.",
  },
  {
    category: "general",
    q: "Do you offer same-day or emergency service?",
    a: "Yes. We maintain a 30-minute average response window in most pin codes across Hyderabad, Chennai, and Bangalore, with same-day service available. For genuine emergencies (rodent in a nursery, swarm of bees, etc.), call our priority line and we'll dispatch the nearest technician. Emergency surcharge applies only for after-hours (8 PM – 8 AM) callouts.",
  },
  {
    category: "general",
    q: "How long has Siva Pest Control been in business?",
    a: "We were founded in Hyderabad in 2012 and have grown to three cities over 14+ years. We've protected over 12,000 homes and 480 commercial sites. We're ISO 9001:2015 certified, FSSAI compliant, CIB & RC registered, and a Green Pro Service Provider.",
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
    category: "booking",
    q: "How do I book a service?",
    a: "Three ways: call our priority line, WhatsApp us, or use the Get Quote form on this site. We'll confirm the visit slot, share the technician's name and photo before arrival, and provide a fixed-price quote upfront. No hidden charges, no upsell at the door.",
  },
  {
    category: "booking",
    q: "Do you provide free quotes and inspections?",
    a: "Yes — all quotes are free. For most residential services, we provide a fixed price over the phone based on your apartment size and pest type. For termite treatments, rodent programmes, and commercial IPM, we conduct a free on-site inspection before quoting.",
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
