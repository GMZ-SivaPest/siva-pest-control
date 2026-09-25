/**
 * process.ts — Our service process (single source of truth).
 */

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  duration: string;
  deliverable: string;
  /** Photo shown alongside the step (image-first redesign) */
  image: string;
  imageAlt: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Booking & Fixed-Price Quote",
    description:
      "Call us, WhatsApp us, or send the quote form. Based on your property type, area and pest, we give you a fixed price before anything is booked — over the phone for most residential services. One price, no upsell at the door.",
    duration: "Same day",
    deliverable: "Fixed-price quote, no obligation",
    image: "/images/carousel/termite-inspection.jpg",
    imageAlt:
      "Siva technician inspecting a wooden door frame with a flashlight for termite activity",
  },
  {
    step: "02",
    title: "Treatment Visit & Customised Protocol",
    description:
      "Your assigned technician arrives in uniform, in a GPS-tracked vehicle, with photo ID verified. On arrival they inspect the property, then design a site-specific protocol — product selection, placement map, re-entry time, and prevention advisory. You receive a written treatment plan and safety data sheet before any product is applied.",
    duration: "Same day",
    deliverable: "Written treatment plan + SDS",
    image: "/images/showcase/work-restaurant-kitchen.png",
    imageAlt:
      "Siva technician documenting a site-specific treatment plan at a commercial kitchen",
  },
  {
    step: "03",
    title: "Certified Technician Visit",
    description:
      "Your assigned technician arrives in uniform, in a GPS-tracked vehicle, with photo ID verified. He walks you through the treatment, applies products per protocol, documents every placement point, and briefs you on re-entry and prevention.",
    duration: "45 min – 5 hrs (service-dependent)",
    deliverable: "Digital service report with photo evidence",
    image: "/images/treatments/gel-bait-application.png",
    imageAlt:
      "Siva technician in PPE uniform applying gel-bait treatment with precision equipment",
  },
  {
    step: "04",
    title: "Monitoring & Follow-Up",
    description:
      "Most services include a scheduled follow-up visit (day 14 for cockroach gel, day 30 for rodent, etc.). Commercial IPM contracts include bi-weekly monitoring with trend reports. We log every visit and adjust protocol if needed.",
    duration: "Per service schedule",
    deliverable: "Trend report + protocol adjustments",
    image: "/images/treatments/commercial-ipm-monitor.png",
    imageAlt:
      "Siva technician inspecting a tamper-proof IPM monitoring station during a follow-up visit",
  },
  {
    step: "05",
    title: "Warranty & Lifetime Support",
    description:
      "Every service is backed by a written re-treatment warranty — 90 days for bed bugs and rodent, 180 days for cockroach gel, 5 years for termite, 3 years for bird netting. If pests return within warranty, we return free. No paperwork, no questions.",
    duration: "90 days – 5 years",
    deliverable: "Written warranty + priority support line",
    image: "/images/carousel/protected-home.jpg",
    imageAlt:
      "A protected, pest-free South Indian home at twilight — backed by a written warranty",
  },
];

export const processPrinciples = [
  {
    title: "Treat what we see, not what we assume",
    description:
      "Every treatment begins with an on-site assessment by the technician doing the work. There is no separate pre-visit call-out — we diagnose and treat in the same visit, and document everything with photos.",
  },
  {
    title: "Child-safe first, always",
    description:
      "If a product isn't safe for a crawling toddler, we don't use it in your home. Our residential protocols are gel-bait, mechanical, or exclusion only.",
  },
  {
    title: "Solve the cause, not the symptom",
    description:
      "Killing visible pests without fixing entry points, water sources, or sanitation guarantees recurrence. Every treatment includes prevention advisory.",
  },
  {
    title: "Document everything",
    description:
      "Every visit generates a digital service report with photo evidence. Commercial clients get trend analytics. Audit-ready, always.",
  },
  {
    title: "Stand behind our work",
    description:
      "If pests return within warranty, we return free. We don't argue, we don't make excuses — we re-treat. Our reputation is built on this promise.",
  },
];
