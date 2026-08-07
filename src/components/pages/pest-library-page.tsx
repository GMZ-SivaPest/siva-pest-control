"use client";

import { useState } from "react";
import { PageHero } from "@/components/site/page-hero";
import { CTASection } from "@/components/site/cta-section";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/site/reveal";
import { pests, pestCategories, pestBySlug } from "@/data/pests";
import { useNav } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Search,
  X,
  ArrowUpRight,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

const threatColors = {
  high: "bg-rust/10 text-rust ring-rust/20",
  medium: "bg-orange/10 text-orange ring-orange/20",
  low: "bg-teal/10 text-teal ring-teal/20",
};

export function PestLibraryPage() {
  const [category, setCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = pests.filter((p) => {
    const matchesCat = category === "all" || p.category === category;
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.scientificName.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const selectedPest = selected ? pestBySlug(selected) : null;

  return (
    <>
      <PageHero
        eyebrow="Pest library"
        title="Know your pest, choose your response"
        subtitle="An evidence-based guide to the pests most common in South Indian homes and businesses — identification, health risks, prevention, and the right Siva service to call."
        breadcrumb={[{ label: "Home", view: "home" }, { label: "Pest Library" }]}
      />

      {/* Filter + search bar */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {pestCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold transition-all",
                    category === cat.id
                      ? "bg-orange text-white shadow-glow-orange"
                      : "border border-brown/15 bg-white/60 text-brown/70 hover:text-brown hover:border-brown/30"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative lg:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brown/40" />
              <input
                type="text"
                placeholder="Search pests..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border border-brown/15 bg-white py-2.5 pl-10 pr-4 text-sm text-brown placeholder:text-brown/40 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pest grid */}
      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-brown/10 bg-white p-12 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brown/5 text-brown/40">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-brown">No pests found</h3>
              <p className="mt-1 text-sm text-brown/55">
                Try a different search or category filter.
              </p>
            </div>
          ) : (
            <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
              {filtered.map((pest) => (
                <StaggerItem key={pest.slug}>
                  <button
                    onClick={() => setSelected(pest.slug)}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brown/10 bg-white p-5 text-left shadow-premium transition-all hover:-translate-y-1 hover:shadow-lift"
                  >
                    <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-orange/5 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />

                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange/10 text-orange transition-colors group-hover:bg-orange group-hover:text-white">
                        <pest.icon className="h-6 w-6" strokeWidth={1.6} />
                      </div>
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1",
                          threatColors[pest.threat]
                        )}
                      >
                        {pest.threat} threat
                      </span>
                    </div>

                    <h3 className="font-display text-base font-bold leading-tight text-brown">
                      {pest.name}
                    </h3>
                    <p className="mt-0.5 text-xs italic text-brown/55">
                      {pest.scientificName}
                    </p>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-brown/65 line-clamp-3">
                      {pest.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between border-t border-brown/5 pt-3 text-xs">
                      <span className="text-brown/55">{pest.seasonality}</span>
                      <span className="inline-flex items-center gap-1 font-semibold text-orange">
                        View details
                        <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </div>
                  </button>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>

      {/* Pest detail modal */}
      <AnimatePresence>
        {selectedPest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center"
          >
            <div
              className="absolute inset-0 bg-brown/50 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 320 }}
              className="relative max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-t-3xl bg-ivory shadow-premium sm:rounded-3xl"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-br from-brown to-[#1a0f08] p-6 text-white sm:p-8">
                <div className="absolute inset-0 bg-dot-warm opacity-[0.05]" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="relative flex items-start gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-orange/15 text-orange ring-1 ring-orange/30">
                    <selectedPest.icon className="h-7 w-7" strokeWidth={1.6} />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold">{selectedPest.name}</h2>
                    <p className="mt-0.5 text-sm italic text-white/60">
                      {selectedPest.scientificName}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1",
                          threatColors[selectedPest.threat]
                        )}
                      >
                        {selectedPest.threat} threat
                      </span>
                      <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/70 ring-1 ring-white/20">
                        {selectedPest.seasonality}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body — scrollable */}
              <div className="thin-scroll max-h-[60vh] overflow-y-auto p-6 sm:p-8">
                {/* Description */}
                <div>
                  <h3 className="font-display text-base font-bold text-brown">Overview</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brown/75">
                    {selectedPest.description}
                  </p>
                </div>

                {/* Identification + Signs */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-brown/10 bg-white p-4">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-orange">
                      <Info className="h-3 w-3" />
                      Identification
                    </div>
                    <ul className="space-y-1.5">
                      {selectedPest.identification.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-brown/75">
                          <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-orange" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-brown/10 bg-white p-4">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-teal/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-teal">
                      <Search className="h-3 w-3" />
                      Signs of activity
                    </div>
                    <ul className="space-y-1.5">
                      {selectedPest.signs.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-brown/75">
                          <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-teal" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Health risk */}
                <div className="mt-4 rounded-2xl border border-rust/20 bg-rust/5 p-4">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-rust/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-rust">
                    <AlertTriangle className="h-3 w-3" />
                    Health risk
                  </div>
                  <p className="text-sm leading-relaxed text-brown/75">
                    {selectedPest.healthRisk}
                  </p>
                </div>

                {/* Prevention */}
                <div className="mt-4 rounded-2xl border border-brown/10 bg-white p-4">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-orange">
                    <CheckCircle2 className="h-3 w-3" />
                    Prevention tips
                  </div>
                  <ul className="space-y-2">
                    {selectedPest.prevention.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-brown/75">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-teal" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer — service CTA */}
              <div className="border-t border-brown/10 bg-white p-4 sm:p-6">
                <ServiceCtaBar serviceSlug={selectedPest.serviceSlug} onClose={() => setSelected(null)} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CTASection
        title="Not sure which pest you're dealing with?"
        subtitle="Send us a photo on WhatsApp and our team will identify it within 30 minutes during business hours — no charge."
      />
    </>
  );
}

function ServiceCtaBar({ serviceSlug, onClose }: { serviceSlug: string; onClose: () => void }) {
  const navigate = useNav((s) => s.navigate);
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-wider text-brown/55">
          Recommended service
        </div>
        <div className="font-display text-sm font-bold capitalize text-brown">
          {serviceSlug.replace(/-/g, " ")}
        </div>
      </div>
      <button
        onClick={() => {
          onClose();
          navigate(`service:${serviceSlug}`);
        }}
        className="inline-flex items-center gap-2 rounded-full bg-orange px-4 py-2 text-xs font-semibold text-white shadow-glow-orange"
        style={{ background: "linear-gradient(135deg, #E88521 0%, #B85C04 100%)" }}
      >
        View service
        <ArrowUpRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
