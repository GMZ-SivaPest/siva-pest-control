"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, Loader2 } from "lucide-react";
import { Reveal } from "./reveal";
import { company } from "@/data/company";
import { locations } from "@/data/locations";
import { services } from "@/data/services";
import { toast } from "sonner";

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "Hyderabad",
    service: services[0].name,
    propertyType: "Residential",
    message: "",
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("Please share your name and phone number");
      return;
    }
    setSubmitting(true);

    // Simulate submission (no backend in this demo)
    await new Promise((r) => setTimeout(r, 1100));

    setSubmitting(false);
    setSubmitted(true);
    toast.success("Request received! Our team will call you within 2 hours.");
  };

  return (
    <section id="contact" className="relative py-20 md:py-24">
      <div className="absolute inset-0 -z-10 gradient-warm-soft" />
      <div className="absolute inset-0 -z-10 bg-grid-warm opacity-30" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          {/* LEFT — Contact info */}
          <Reveal>
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-orange ring-1 ring-orange/20">
                <span className="h-1 w-1 rounded-full bg-current" />
                Get in touch
              </div>
              <h2 className="font-display text-3xl font-bold leading-tight text-brown sm:text-4xl md:leading-[1.1]">
                Let's design your protection plan
              </h2>
              <p className="mt-4 text-base leading-relaxed text-brown/70 text-pretty">
                Share a few details and our team will call you back within 2 hours
                (during business hours) with a fixed-price quote. No obligation, no
                upsell — just a clear, expert recommendation.
              </p>

              {/* Contact methods */}
              <div className="mt-8 space-y-3">
                <a
                  href={`tel:${company.phonePrimaryHref}`}
                  className="group flex items-center gap-4 rounded-2xl border border-brown/10 bg-white p-4 shadow-premium transition-all hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange/10 text-orange transition-colors group-hover:bg-orange group-hover:text-white">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-brown/55">
                      Call us
                    </div>
                    <div className="font-display text-base font-semibold text-brown">
                      {company.phonePrimary}
                    </div>
                  </div>
                </a>

                <a
                  href={`mailto:${company.email}`}
                  className="group flex items-center gap-4 rounded-2xl border border-brown/10 bg-white p-4 shadow-premium transition-all hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal transition-colors group-hover:bg-teal group-hover:text-white">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-brown/55">
                      Email us
                    </div>
                    <div className="font-display text-base font-semibold text-brown">
                      {company.email}
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-4 rounded-2xl border border-brown/10 bg-white p-4 shadow-premium">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brown/10 text-brown">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-brown/55">
                      Working hours
                    </div>
                    <div className="font-display text-base font-semibold text-brown">
                      {company.hours}
                    </div>
                    <div className="text-xs text-brown/55">{company.emergencyNote}</div>
                  </div>
                </div>
              </div>

              {/* City offices */}
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {locations.map((loc) => (
                  <div
                    key={loc.slug}
                    className="rounded-2xl border border-brown/10 bg-white/60 p-3 backdrop-blur"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-brown">
                      <MapPin className="h-3 w-3 text-orange" />
                      {loc.city}
                    </div>
                    <div className="mt-1 text-[11px] leading-relaxed text-brown/60">
                      {loc.address.line1}
                    </div>
                    <div className="mt-1 text-[11px] font-medium text-orange">
                      {loc.phone}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* RIGHT — Form */}
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-brown/10 bg-white p-6 shadow-premium sm:p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex h-full min-h-[400px] flex-col items-center justify-center text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange/10 text-orange">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold text-brown">
                    Request received!
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-brown/65">
                    Thank you, {form.name}. Our team will call you on {form.phone} within
                    2 hours during business hours. For urgent matters, please call us directly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        phone: "",
                        email: "",
                        city: "Hyderabad",
                        service: services[0].name,
                        propertyType: "Residential",
                        message: "",
                      });
                    }}
                    className="mt-6 rounded-full border border-brown/15 px-5 py-2.5 text-sm font-semibold text-brown transition-colors hover:bg-brown/5"
                  >
                    Submit another request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Full name"
                      required
                      value={form.name}
                      onChange={(v) => update("name", v)}
                      placeholder="e.g. Ananya Reddy"
                    />
                    <Field
                      label="Phone number"
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(v) => update("phone", v)}
                      placeholder="+91 90000 00000"
                    />
                  </div>

                  <Field
                    label="Email (optional)"
                    type="email"
                    value={form.email}
                    onChange={(v) => update("email", v)}
                    placeholder="you@example.com"
                  />

                  <div className="grid gap-4 sm:grid-cols-3">
                    <SelectField
                      label="City"
                      value={form.city}
                      onChange={(v) => update("city", v)}
                      options={locations.map((l) => l.city)}
                    />
                    <SelectField
                      label="Property"
                      value={form.propertyType}
                      onChange={(v) => update("propertyType", v)}
                      options={["Residential", "Commercial", "Industrial"]}
                    />
                    <SelectField
                      label="Service"
                      value={form.service}
                      onChange={(v) => update("service", v)}
                      options={services.map((s) => s.name)}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brown/70">
                      Tell us about the issue (optional)
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      rows={3}
                      placeholder="e.g. Seeing cockroaches in kitchen for the past week..."
                      className="w-full resize-none rounded-xl border border-brown/15 bg-ivory/50 px-4 py-2.5 text-sm text-brown placeholder:text-brown/40 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-glow-orange transition-all hover:scale-[1.01] disabled:opacity-70"
                    style={{ background: "linear-gradient(135deg, #E88521 0%, #B85C04 100%)" }}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending request...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Request Free Quote
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-brown/55">
                    By submitting, you agree to be contacted about your request. We never
                    share your details. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brown/70">
        {label} {required && <span className="text-orange">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-brown/15 bg-ivory/50 px-4 py-2.5 text-sm text-brown placeholder:text-brown/40 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brown/70">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-brown/15 bg-ivory/50 px-3 py-2.5 text-sm text-brown focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
