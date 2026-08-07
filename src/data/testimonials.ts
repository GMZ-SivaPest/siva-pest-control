/**
 * testimonials.ts — Customer testimonials and case studies.
 */

import { Star } from "lucide-react";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  city: "Hyderabad" | "Chennai" | "Bangalore";
  rating: number;
  text: string;
  service: string;
  date: string;
  highlight?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Ananya Reddy",
    role: "Homeowner",
    location: "Jubilee Hills",
    city: "Hyderabad",
    rating: 5,
    text: "We had a stubborn German cockroach problem in our open kitchen that three other companies couldn't solve. Siva's gel-bait treatment eliminated them in 10 days — no spraying, no smell, no need to empty cabinets. The technician explained every step. Genuinely premium service.",
    service: "Cockroach Gel Treatment",
    date: "Mar 2026",
    highlight: "Eliminated in 10 days",
  },
  {
    id: "t2",
    name: "Rajesh Krishnan",
    role: "Facility Manager",
    location: "HITEC City IT Park",
    city: "Hyderabad",
    rating: 5,
    text: "We manage a 14-floor tech park with 9 anchor tenants. Siva handles the entire IPM programme across all floors with monthly service reports, trend analytics, and audit-ready documentation. They've attended three FSSAI audits with us — zero observations on pest control.",
    service: "Commercial IPM Programme",
    date: "Feb 2026",
    highlight: "Zero audit observations",
  },
  {
    id: "t3",
    name: "Lakshmi Venkat",
    role: "Apartment Secretary",
    location: "Adyar",
    city: "Chennai",
    rating: 5,
    text: "Our 84-apartment complex was battling coastal roach pressure for years. Siva designed a coordinated building-wide protocol — every flat treated the same week, shared plumbing stacks addressed, monthly monitoring. We've been roach-free for 14 months now.",
    service: "Apartment-wide IPM",
    date: "Jan 2026",
    highlight: "14 months roach-free",
  },
  {
    id: "t4",
    name: "Dr. Karthik Subramaniam",
    role: "Hospital Administrator",
    location: "T. Nagar",
    city: "Chennai",
    rating: 5,
    text: "Healthcare pest control has zero margin for error. Siva uses odour-free formulations, pheromone monitoring, and works around our ICU and sterile stores without disrupting operations. Their documentation satisfies every NABH audit. They're an extension of our infection-control team.",
    service: "Healthcare IPM",
    date: "Feb 2026",
    highlight: "NABH audit-ready",
  },
  {
    id: "t5",
    name: "Priya Iyer",
    role: "Homeowner",
    location: "Indiranagar",
    city: "Bangalore",
    rating: 5,
    text: "After a trip to Goa, we brought back bed bugs — the worst 3 weeks of our lives. Siva's two-cycle heat and spray protocol worked exactly as promised. The day-14 follow-up caught the nymphs. They even advised us on luggage hygiene. Genuinely caring team.",
    service: "Bed Bugs Elimination",
    date: "Apr 2026",
    highlight: "Two-cycle protocol worked",
  },
  {
    id: "t6",
    name: "Vikram Rao",
    role: "Restaurant Owner",
    location: "Koramangala",
    city: "Bangalore",
    rating: 5,
    text: "Three cloud kitchens, one vendor, zero pest incidents in 18 months. Siva's digital service reports are ready for any Swiggy or Zomato audit. They installed UV fly units in kitchens, drain fly treatment at every sink, and tamper-proof bait stations. Worth every rupee.",
    service: "Restaurant IPM",
    date: "Mar 2026",
    highlight: "Zero pest incidents",
  },
  {
    id: "t7",
    name: "Meena Nair",
    role: "Homeowner",
    location: "Banjara Hills",
    city: "Hyderabad",
    rating: 5,
    text: "Our 25-year-old independent house had termite mud tubes in three rooms. Siva's drill-fill-seal treatment was meticulous — they covered every piece of furniture, sealed holes with matching cement, and provided a written 5-year warranty. Six months later, no signs of any activity.",
    service: "Anti-Termite Treatment",
    date: "Dec 2025",
    highlight: "5-year warranty honoured",
  },
  {
    id: "t8",
    name: "Suresh Pillai",
    role: "Warehouse Operations Head",
    location: "Whitefield",
    city: "Bangalore",
    rating: 5,
    text: "We store FMCG inventory worth crores. Siva's perimeter rodent programme, indoor monitoring traps, and inbound fumigation protocol have reduced our pest-related rejection rate to zero. Their monthly trend reports are the first thing our quality team reviews.",
    service: "Warehouse IPM",
    date: "Feb 2026",
    highlight: "Zero pest rejections",
  },
  {
    id: "t9",
    name: "Deepika Reddy",
    role: "Mother of two",
    location: "Gachibowli",
    city: "Hyderabad",
    rating: 5,
    text: "With two toddlers at home, I was nervous about pest control chemicals. Siva's gel-bait method needs no evacuation, leaves no residue, and the technicians explained the safety profile of every product they used. The kids napped through the treatment. Premium in every sense.",
    service: "Cockroach Gel Treatment",
    date: "Mar 2026",
    highlight: "Child-safe, no evacuation",
  },
];

export const testimonialsByCity = (city: string) =>
  testimonials.filter((t) => t.city === city);

export const featuredTestimonials = testimonials.slice(0, 6);
