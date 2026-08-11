"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Linkedin, Youtube, ShieldCheck, ChevronRight, Shield, Cookie, FileText } from "lucide-react";
import { LogoMark } from "./logo-mark";
import { company } from "@/data/company";
import { footerNav } from "@/data/navigation";
import { locations } from "@/data/locations";
import { brand } from "@/data/brand";
import { CONSENT_KEY } from "./cookie-consent";
import type { LegalDocType } from "./legal-modal";

// Opens the DPDP-compliant legal documents modal (mounted in the root layout)
const openLegalModal = (doc: LegalDocType) => {
  window.dispatchEvent(new CustomEvent("open-legal-modal", { detail: doc }));
};

const legalLinks: { label: string; doc: LegalDocType; icon: typeof Shield }[] = [
  { label: "Privacy Policy", doc: "privacy-policy", icon: Shield },
  { label: "Cookie Policy", doc: "cookie-policy", icon: Cookie },
  { label: "Terms & Conditions", doc: "terms-conditions", icon: FileText },
];

export function Footer() {

  return (
    <footer className="mt-auto relative overflow-hidden gradient-brown text-white/80">
      {/* Decorative top edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange/60 to-transparent" />
      <div className="absolute inset-0 bg-dot-warm opacity-[0.04]" />
      <div
        className="absolute -top-32 left-1/2 h-64 w-[640px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #D77005 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top CTA strip */}
        <div className="grid gap-6 border-b border-white/10 py-10 md:grid-cols-[1fr_auto] md:items-center md:gap-12">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange ring-1 ring-orange/30">
              <ShieldCheck className="h-3 w-3" />
              {brand.guaranteeLabel}
            </div>
            <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Ready to protect your space?
            </h3>
            <p className="mt-2 max-w-xl text-sm text-white/75">
              Free inspection, fixed-price quote, certified technicians. Same-day service available across Hyderabad, Chennai and Bangalore.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-glow-orange transition-all hover:scale-[1.02] gradient-orange"
            >
              Get Free Quote
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={`tel:${company.phonePrimaryHref}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              <Phone className="h-4 w-4" />
              {company.phonePrimary}
            </a>
          </div>
        </div>

        {/* Main footer grid
            — Brand col + 4 nav cols on lg+
            — Brand col + 1 nav col on md (prevents ultra-tall tablet footer)
            — Stacked on mobile */}
        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div className="lg:pr-6">
            <LogoMark size={44} variant="light" />
            <p className="mt-5 text-sm leading-relaxed text-white/75">
              {brand.description}
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <a
                href={`tel:${company.phonePrimaryHref}`}
                className="flex items-center gap-3 text-white/80 transition-colors hover:text-orange"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                {company.phonePrimary}
              </a>
              <a
                href={`mailto:${company.email}`}
                className="flex items-center gap-3 text-white/80 transition-colors hover:text-orange"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                {company.email}
              </a>
              <div className="flex items-start gap-3 text-white/80">
                <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span>
                  {company.hours}
                  <br />
                  <span className="text-xs text-white/75">{company.emergencyNote}</span>
                </span>
              </div>
            </div>

            {/* Socials */}
            <div className="mt-6 flex gap-2">
              {[
                { Icon: Instagram, href: company.socials.instagram },
                { Icon: Facebook, href: company.socials.facebook },
                { Icon: Linkedin, href: company.socials.linkedin },
                { Icon: Youtube, href: company.socials.youtube },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-white/80 ring-1 ring-white/10 transition-all hover:bg-orange hover:text-white hover:ring-orange"
                  aria-label="Social media link"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer nav columns */}
          {footerNav.map((column) => (
            <div key={column.title}>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-orange">
                {column.title}
              </h4>
              <ul className="space-y-2.5">
                {column.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/80 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Locations strip */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-white/75">
            <span className="font-semibold uppercase tracking-wider text-white/85">
              Coverage:
            </span>
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-orange"
              >
                <MapPin className="h-3 w-3" aria-hidden="true" />
                {loc.city}
                <span className="text-white/40" aria-hidden="true">·</span>
                <span className="text-white/80">{loc.coverage.length} zones</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-white/75 lg:flex-row">
          <div>
            © {new Date().getFullYear()} {company.legalName}. All rights reserved.
          </div>

          {/* Legal links — open the DPDP-compliant legal modal */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            {legalLinks.map((link, i) => {
              const LinkIcon = link.icon;
              return (
                <span key={link.label} className="flex items-center gap-1">
                  {i > 0 && <span className="text-white/20">|</span>}
                  <button
                    onClick={() => openLegalModal(link.doc)}
                    className="inline-flex items-center gap-1 transition-colors hover:text-white/70"
                  >
                    <LinkIcon className="h-3 w-3" />
                    {link.label}
                  </button>
                </span>
              );
            })}
            <span className="text-white/20">|</span>
            <button
              onClick={() => {
                try {
                  localStorage.removeItem(CONSENT_KEY);
                } catch {
                  /* ignore */
                }
                window.location.reload();
              }}
              className="inline-flex items-center gap-1 transition-colors hover:text-white/70"
            >
              <Cookie className="h-3 w-3" />
              Cookie Settings
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {brand.certifications.map((cert) => (
              <span key={cert} className="flex items-center gap-1.5">
                <ShieldCheck className="h-3 w-3 text-orange/70" />
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
