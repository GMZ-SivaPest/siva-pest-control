/**
 * process.ts — Our service process (single source of truth).
 */

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  duration: string;
  deliverable: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Free Inspection & Quote",
    description:
      "A certified technician visits your property, conducts a calibrated inspection of pest pressure and entry points, and provides a fixed-price quote. For most residential services, we can quote over the phone and skip straight to scheduling.",
    duration: "30–60 min",
    deliverable: "Fixed-price quote, no obligation",
  },
  {
    step: "02",
    title: "Customised Treatment Plan",
    description:
      "Based on the inspection, we design a site-specific protocol — product selection, placement map, re-entry time, and prevention advisory. You receive a written treatment plan and safety data sheet before any work begins.",
    duration: "Same day",
    deliverable: "Written treatment plan + SDS",
  },
  {
    step: "03",
    title: "Certified Technician Visit",
    description:
      "Your assigned technician arrives in uniform, in a GPS-tracked vehicle, with photo ID verified. He walks you through the treatment, applies products per protocol, documents every placement point, and briefs you on re-entry and prevention.",
    duration: "45 min – 5 hrs (service-dependent)",
    deliverable: "Digital service report with photo evidence",
  },
  {
    step: "04",
    title: "Monitoring & Follow-Up",
    description:
      "Most services include a scheduled follow-up visit (day 14 for cockroach gel, day 30 for rodent, etc.). Commercial IPM contracts include bi-weekly monitoring with trend reports. We log every visit and adjust protocol if needed.",
    duration: "Per service schedule",
    deliverable: "Trend report + protocol adjustments",
  },
  {
    step: "05",
    title: "Warranty & Lifetime Support",
    description:
      "Every service is backed by a written re-treatment warranty — 90 days for bed bugs and rodent, 180 days for cockroach gel, 5 years for termite, 3 years for bird netting. If pests return within warranty, we return free. No paperwork, no questions.",
    duration: "90 days – 5 years",
    deliverable: "Written warranty + priority support line",
  },
];

export const processPrinciples = [
  {
    title: "Inspect before we treat",
    description:
      "Every treatment begins with a calibrated inspection. We treat what we see, not what we assume — and we document everything with photos.",
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
