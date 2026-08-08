"use client";

import { useState } from "react";
import { PageHero } from "@/components/site/page-hero";
import { CTASection } from "@/components/site/cta-section";
import { FAQAccordion } from "@/components/site/faq-accordion";
import { Reveal } from "@/components/site/reveal";
import { faqs, type Faq } from "@/data/faqs";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";
import { HelpCircle } from "lucide-react";

const categories: { id: Faq["category"]; label: string; description: string }[] = [
  { id: "general", label: "General", description: "About us, coverage, what makes us different" },
  { id: "safety", label: "Safety", description: "Child-safe, pet-safe, formulations, evacuation" },
  { id: "booking", label: "Booking & payment", description: "Scheduling, quotes, payment methods" },
  { id: "warranty", label: "Warranty", description: "Coverage, claims, transferability" },
];

export function FaqPage() {
  const [activeCat, setActiveCat] = useState<Faq["category"] | "all">("all");

  const filtered = activeCat === "all" ? faqs : faqs.filter((f) => f.category === activeCat);

  return (
    <>
      <PageHero
        eyebrow="Help centre"
        title="Frequently asked questions"
        subtitle="Everything most customers ask before booking. Can't find your question? Call us or use the contact form — we reply within 30 minutes during business hours."
        breadcrumb={[{ label: "Home", view: "home" }, { label: "FAQ" }]}
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCat("all")}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-all",
                activeCat === "all"
                  ? "bg-orange text-white shadow-glow-orange"
                  : "border border-brown/15 bg-white/60 text-brown/70 hover:text-brown hover:border-brown/30"
              )}
            >
              All questions
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-all",
                  activeCat === cat.id
                    ? "bg-orange text-white shadow-glow-orange"
                    : "border border-brown/15 bg-white/60 text-brown/70 hover:text-brown hover:border-brown/30"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Category cards (visible only when "all" is selected) */}
          {activeCat === "all" && (
            <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((cat, i) => (
                <Reveal key={cat.id} delay={i * 0.06}>
                  <button
                    onClick={() => setActiveCat(cat.id)}
                    className="group h-full w-full rounded-2xl border border-brown/10 bg-white p-5 text-left shadow-premium transition-all hover:-translate-y-1 hover:shadow-lift"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange/10 text-orange transition-colors group-hover:bg-orange group-hover:text-white">
                      <HelpCircle className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-sm font-bold text-brown">{cat.label}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-brown/60">
                      {cat.description}
                    </p>
                  </button>
                </Reveal>
              ))}
            </div>
          )}

          {/* FAQs */}
          <Reveal>
            <FAQAccordion
              items={filtered.map((f) => ({ q: f.q, a: f.a }))}
              defaultOpen={0}
            />
          </Reveal>

          {/* Still have questions callout */}
          <Reveal delay={0.1}>
            <div className="mt-12 overflow-hidden rounded-3xl border border-brown/10 bg-white p-8 shadow-premium">
              <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <h3 className="font-display text-lg font-bold text-brown">
                    Still have questions?
                  </h3>
                  <p className="mt-1 text-sm text-brown/65">
                    Our team is available {company.hoursShort}. Call us, WhatsApp us, or
                    send a message through the contact form — we reply within 30 minutes during
                    business hours.
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <a
                    href={`tel:${company.phonePrimaryHref}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-glow-orange gradient-orange"
                  >
                    Call {company.phonePrimary}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Ready to book your service?"
        subtitle="Free inspection, fixed-price quote, certified technicians. Same-day service across all three cities."
      />
    </>
  );
}
