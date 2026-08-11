"use client";

import { useState, useId } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Reveal } from "./reveal";
import { company } from "@/data/company";
import { locations } from "@/data/locations";
import { services } from "@/data/services";
import { toast } from "sonner";
import { trackLead, trackPhoneClick, trackCTAClick } from "@/lib/analytics";

interface FieldErrors {
  [field: string]: string;
}

interface FormState {
  name: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  propertyType: string;
  message: string;
  preferredDate: string;
  /** honeypot — must stay empty */
  company: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  phone: "",
  email: "",
  city: "Hyderabad",
  service: services[0].name,
  propertyType: "Residential",
  message: "",
  preferredDate: "",
  company: "",
};

/**
 * Validate one field client-side. Mirrors the server regex for instant
 * feedback before the user submits. Returns "" when valid.
 */
function validateField(field: keyof FormState, value: string): string {
  switch (field) {
    case "name":
      if (!value.trim()) return "Please share your name";
      if (value.trim().length < 2) return "Name looks too short";
      return "";
    case "phone": {
      if (!value.trim()) return "Phone number is required";
      const re = /^(?:\+91[\s-]?|0)?([6-9]\d{9})$/;
      if (!re.test(value.trim()))
        return "Enter a 10-digit Indian mobile (starts 6/7/8/9)";
      return "";
    }
    case "email": {
      if (!value.trim()) return "";
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(value.trim()) ? "" : "Enter a valid email or leave blank";
    }
    case "preferredDate": {
      if (!value) return "";
      const parsed = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (isNaN(parsed.getTime())) return "Enter a valid date";
      if (parsed < today) return "Date can't be in the past";
      return "";
    }
    default:
      return "";
  }
}

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  // DPDP Act 2023 consent — required before submitting personal data
  const [consentGiven, setConsentGiven] = useState(false);

  const update = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    // Live-clear the field error as the user types after first blur
    if (touched[key]) {
      const err = validateField(key, value);
      setErrors((e) => ({ ...e, [key]: err }));
    }
  };

  const handleBlur = (key: keyof FormState) => {
    setTouched((t) => ({ ...t, [key]: true }));
    const err = validateField(key, form[key]);
    setErrors((e) => ({ ...e, [key]: err }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all required fields
    const newErrors: FieldErrors = {};
    (["name", "phone", "email", "preferredDate"] as (keyof FormState)[]).forEach(
      (field) => {
        const err = validateField(field, form[field]);
        if (err) newErrors[field] = err;
      }
    );
    setErrors(newErrors);
    setTouched({
      name: true,
      phone: true,
      email: true,
      preferredDate: true,
    });

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the highlighted fields");
      // focus first error field
      const firstErrorField = Object.keys(newErrors)[0];
      const el = document.getElementById(`field-${firstErrorField}`);
      el?.focus();
      return;
    }

    // DPDP Act 2023 — explicit consent required to process personal data
    if (!consentGiven) {
      toast.error("Please accept the privacy consent to continue");
      document.getElementById("field-consent")?.focus();
      return;
    }

    setSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email || undefined,
          city: form.city,
          service: form.service,
          propertyType: form.propertyType,
          message: form.message || undefined,
          preferredDate: form.preferredDate || undefined,
          source: "contact-form",
          company: form.company, // honeypot
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        if (data.errors) {
          // server returned field-level errors — surface them
          setErrors((e) => ({ ...e, ...data.errors }));
          toast.error("Please fix the highlighted fields");
        } else {
          const msg =
            data.message ??
            "We couldn't submit your request. Please call us directly.";
          setServerError(msg);
          toast.error(msg);
        }
        setSubmitting(false);
        return;
      }

      // Success
      setSubmitting(false);
      setSubmitted(true);
      toast.success(
        "Request received! Our team will call you within 30 minutes."
      );

      // Fire GA4 conversion event client-side
      trackLead({
        location: "contact-form",
        service: form.service,
        city: form.city,
        propertyType: form.propertyType,
      });
    } catch (err) {
      console.error("[contact] submission failed:", err);
      setSubmitting(false);
      setServerError(
        "Network error — please check your connection or call us directly."
      );
      toast.error("Network error. Please try again or call us.");
    }
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
                Let&apos;s design your protection plan
              </h2>
              <p className="mt-4 text-base leading-relaxed text-brown/70 text-pretty">
                Share a few details and our team will call you back within 30
                minutes (during business hours) with a fixed-price quote. No
                obligation, no upsell — just a clear, expert recommendation.
              </p>

              {/* Contact methods */}
              <div className="mt-8 space-y-3">
                <a
                  href={`tel:${company.phonePrimaryHref}`}
                  onClick={() =>
                    trackPhoneClick({
                      location: "contact-form",
                      phone: company.phonePrimary,
                    })
                  }
                  className="group flex items-center gap-4 rounded-2xl border border-brown/10 bg-white p-4 shadow-premium transition-all hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange/10 text-orange transition-colors group-hover:bg-orange group-hover:text-white">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-brown/65">
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
                    <div className="text-xs font-medium uppercase tracking-wider text-brown/65">
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
                    <div className="text-xs font-medium uppercase tracking-wider text-brown/65">
                      Working hours
                    </div>
                    <div className="font-display text-base font-semibold text-brown">
                      {company.hours}
                    </div>
                    <div className="text-xs text-brown/65">
                      {company.emergencyNote}
                    </div>
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
                    <div className="mt-1 text-[11px] leading-relaxed text-brown/65">
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
                    Thank you, {form.name}. Our team will call you on{" "}
                    <span className="font-semibold text-brown">{form.phone}</span>{" "}
                    within 30 minutes during business hours. For urgent matters,
                    please call us directly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm(EMPTY_FORM);
                      setErrors({});
                      setTouched({});
                      setConsentGiven(false);
                    }}
                    className="mt-6 rounded-full border border-brown/15 px-5 py-2.5 text-sm font-semibold text-brown transition-colors hover:bg-brown/5"
                  >
                    Submit another request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Honeypot — visually hidden, but accessible to bots */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: "-9999px",
                      width: 1,
                      height: 1,
                      overflow: "hidden",
                    }}
                  >
                    <label>
                      Company (leave blank)
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.company}
                        onChange={(e) => update("company", e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      id="field-name"
                      label="Full name"
                      required
                      value={form.name}
                      onChange={(v) => update("name", v)}
                      onBlur={() => handleBlur("name")}
                      error={errors.name}
                      placeholder="e.g. Ananya Reddy"
                    />
                    <Field
                      id="field-phone"
                      label="Phone number"
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(v) => update("phone", v)}
                      onBlur={() => handleBlur("phone")}
                      error={errors.phone}
                      placeholder="+91 90000 00000"
                      inputMode="tel"
                      autoComplete="tel"
                    />
                  </div>

                  <Field
                    id="field-email"
                    label="Email (optional)"
                    type="email"
                    value={form.email}
                    onChange={(v) => update("email", v)}
                    onBlur={() => handleBlur("email")}
                    error={errors.email}
                    placeholder="you@example.com"
                    autoComplete="email"
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

                  {/* Preferred date — new, helps pre-qualify leads */}
                  <Field
                    id="field-preferredDate"
                    label="Preferred date (optional)"
                    type="date"
                    value={form.preferredDate}
                    onChange={(v) => update("preferredDate", v)}
                    onBlur={() => handleBlur("preferredDate")}
                    error={errors.preferredDate}
                    placeholder=""
                    min={new Date().toISOString().split("T")[0]}
                  />

                  <div>
                    <label
                      htmlFor="field-message"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brown/70"
                    >
                      Tell us about the issue (optional)
                    </label>
                    <textarea
                      id="field-message"
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      rows={3}
                      placeholder="e.g. Seeing cockroaches in kitchen for the past week..."
                      className="w-full resize-none rounded-xl border border-brown/15 bg-ivory/50 px-4 py-2.5 text-sm text-brown placeholder:text-brown/40 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20"
                    />
                  </div>

                  {/* Server-level error banner (only shown when set) */}
                  {serverError && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 rounded-xl border border-rust/30 bg-rust/5 p-3 text-sm text-rust"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  {/* DPDP Act 2023 consent checkbox — opens the legal modal */}
                  <label className="flex cursor-pointer items-start gap-2.5">
                    <input
                      id="field-consent"
                      type="checkbox"
                      checked={consentGiven}
                      onChange={(e) => setConsentGiven(e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-brown/25 text-orange accent-orange focus:ring-orange/40"
                    />
                    <span className="text-[11px] leading-snug text-brown/65">
                      I consent to {company.name} collecting and processing my
                      personal data as per the{" "}
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          window.dispatchEvent(
                            new CustomEvent("open-legal-modal", {
                              detail: "privacy-policy",
                            })
                          );
                        }}
                        className="font-medium text-orange underline decoration-orange/40 underline-offset-2 hover:text-orange/80"
                      >
                        Privacy Policy
                      </a>{" "}
                      under the Digital Personal Data Protection Act, 2023. I
                      understand my data will be used to process my service
                      request.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={submitting}
                    onClick={() =>
                      trackCTAClick({
                        location: "contact-form-submit",
                        label: "Request Free Quote",
                        href: "/contact",
                      })
                    }
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-glow-orange transition-all hover:scale-[1.01] hover:brightness-110 active:scale-[0.99] disabled:opacity-70 gradient-orange"
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
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Field primitives with inline error display                         */
/* ------------------------------------------------------------------ */

function Field({
  id,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  required,
  error,
  inputMode,
  autoComplete,
  min,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
  inputMode?: "text" | "tel" | "email" | "numeric" | "decimal" | "search" | "url";
  autoComplete?: string;
  min?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brown/70"
      >
        {label} {required && <span className="text-orange">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        inputMode={inputMode}
        autoComplete={autoComplete}
        min={min}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={
          "w-full rounded-xl border bg-ivory/50 px-4 py-2.5 text-sm text-brown placeholder:text-brown/40 focus:outline-none focus:ring-2 " +
          (error
            ? "border-rust/60 focus:border-rust focus:ring-rust/20"
            : "border-brown/15 focus:border-orange focus:ring-orange/20")
        }
      />
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1 flex items-center gap-1 text-xs text-rust"
        >
          <AlertCircle className="h-3 w-3 flex-shrink-0" />
          {error}
        </p>
      )}
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
  const reactId = useId();
  const selectId = `select-${reactId}`;
  return (
    <div>
      <label
        htmlFor={selectId}
        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brown/70"
      >
        {label}
      </label>
      <select
        id={selectId}
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
