"use client";

import { PageHero } from "@/components/site/page-hero";
import { ContactForm } from "@/components/site/contact-form";
import { Reveal } from "@/components/site/reveal";
import { locations } from "@/data/locations";
import { company } from "@/data/company";
import { Phone, MapPin, Clock } from "lucide-react";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";

export function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Let's design your protection plan"
        subtitle="Free inspection, fixed-price quote, certified technician dispatch. Our team responds within 30 minutes during business hours — across all three cities."
        breadcrumb={[{ label: "Home", view: "home" }, { label: "Contact" }]}
      />

      <ContactForm />

      {/* City offices strip */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="font-display text-2xl font-bold text-brown sm:text-3xl">
              Our field offices
            </h2>
            <p className="mt-2 text-sm text-brown/65">
              Walk-ins welcome during business hours. Call ahead to ensure a technician is on-site.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {locations.map((loc, i) => (
              <Reveal key={loc.slug} delay={i * 0.08}>
                <div className="h-full overflow-hidden rounded-3xl border border-brown/10 bg-white shadow-premium">
                  <div className="relative bg-gradient-to-br from-brown to-[#1a0f08] p-6 text-white">
                    <div className="absolute inset-0 bg-dot-warm opacity-[0.05]" />
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-orange" />
                        <h3 className="font-display text-xl font-bold">{loc.city}</h3>
                      </div>
                      <span className="rounded-full bg-orange/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-orange">
                        {loc.state}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 p-6 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange" />
                      <div className="text-brown/75">
                        {loc.address.line1}
                        <br />
                        {loc.address.landmark}
                        <br />
                        {loc.address.line2} - {loc.address.pincode}
                      </div>
                    </div>

                    <a
                      href={`tel:${loc.phoneHref}`}
                      className="flex items-center gap-3 text-brown/75 transition-colors hover:text-orange"
                    >
                      <Phone className="h-4 w-4 flex-shrink-0 text-orange" />
                      {loc.phone}
                    </a>

                    <div className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange" />
                      <div className="text-brown/75">{loc.hours}</div>
                    </div>

                    <a
                      href={`${company.whatsappHref}?text=Hello%20Siva%20Pest%20Control!%20%F0%9F%91%8B%20I'm%20in%20Isukapalli%2FRepalle%20area%20and%20need%20pest%20control%20service.%20Please%20call%20me%20back%20with%20the%20next%20available%20slot.%20Thank%20you!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full border border-brown/15 bg-white px-4 py-2.5 text-xs font-semibold text-brown transition-colors hover:border-teal/40 hover:text-teal"
                    >
                      <WhatsAppIcon className="h-3.5 w-3.5" />
                      WhatsApp {loc.city} office
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
