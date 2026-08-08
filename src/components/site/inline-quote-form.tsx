"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Send,
  CheckCircle2,
  Loader2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { locations } from "@/data/locations";
import { company } from "@/data/company";
import { toast } from "sonner";
import { trackLead } from "@/lib/analytics";

/**
 * InlineQuoteForm — compact, collapsible inline lead form placed on service
 * detail pages. Captures the minimum viable fields (name + phone + city) with
 * phone validation, and POSTs to /api/contact with `source: "service-detail"`.
 *
 * Why collapsible: a 6-field form below the fold converts worse than a 1-CTA
 * "Get a quote for {service}" prompt that expands into the form on click.
 *
 * Validation mirrors /api/contact server-side regex.
 */

const INDIAN_PHONE_RE = /^(?:\+91[\s-]?|0)?([6-9]\d{9})$/;

interface FormState {
  name: string;
  phone: string;
  city: string;
}

interface FieldErrors {
  name?: string;
  phone?: string;
}

export function InlineQuoteForm({
  serviceName,
  serviceStartsFrom,
}: {
  serviceName: string;
  serviceStartsFrom: number;
}) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    city: locations[0]?.city ?? "Hyderabad",
  });
  const [errors, setErrors] = useState<FieldErrors>({});

  const update = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) {
      setErrors((e) => ({ ...e, [key]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    const newErrors: FieldErrors = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      newErrors.name = "Please share your name";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!INDIAN_PHONE_RE.test(form.phone.trim())) {
      newErrors.phone = "Enter a valid 10-digit Indian mobile";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the highlighted fields");
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
          city: form.city,
          service: serviceName,
          propertyType: "Residential",
          source: "service-detail",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        if (data.errors) {
          setErrors((e) => ({ ...e, ...data.errors }));
        } else {
          const msg = data.message ?? "Submission failed. Please call us.";
          setServerError(msg);
          toast.error(msg);
        }
        setSubmitting(false);
        return;
      }

      setSubmitting(false);
      setSubmitted(true);
      toast.success("Request received! We'll call you within 30 minutes.");
      trackLead({
        location: "service-detail-inline",
        service: serviceName,
        city: form.city,
        propertyType: "Residential",
      });
    } catch (err) {
      console.error("[inline-quote] submission failed:", err);
      setSubmitting(false);
      setServerError("Network error — please try again or call us.");
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <div
      id="inline-quote"
      className="overflow-hidden rounded-3xl border border-brown/10 bg-white shadow-premium"
    >
      {/* Header / toggle */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="inline-quote-body"
        className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
      >
        <div>
          <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-orange/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-orange">
            <Clock className="h-3 w-3" />
            30-min callback
          </div>
          <h3 className="font-display text-lg font-bold text-brown sm:text-xl">
            Get a quote for {serviceName}
          </h3>
          <p className="mt-1 text-sm text-brown/65">
            Starts from{" "}
            <span className="font-semibold text-orange">
              ₹{serviceStartsFrom.toLocaleString("en-IN")}
            </span>
            . Fixed-price, no upsell, certified technician.
          </p>
        </div>
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-orange/10 text-orange">
          {open ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>
      </button>

      {/* Body — collapses when closed */}
      <AnimatePresence initial={false}>
        {open && !submitted && (
          <motion.div
            id="inline-quote-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-4 border-t border-brown/10 p-5 sm:p-6"
              noValidate
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label
                    htmlFor={`iq-name-${serviceName.replace(/\s/g, "-")}`}
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brown/70"
                  >
                    Full name <span className="text-orange">*</span>
                  </label>
                  <input
                    id={`iq-name-${serviceName.replace(/\s/g, "-")}`}
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="e.g. Ananya Reddy"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={
                      errors.name ? `iq-name-error` : undefined
                    }
                    className={
                      "w-full rounded-xl border bg-ivory/50 px-4 py-2.5 text-sm text-brown placeholder:text-brown/40 focus:outline-none focus:ring-2 " +
                      (errors.name
                        ? "border-rust/60 focus:border-rust focus:ring-rust/20"
                        : "border-brown/15 focus:border-orange focus:ring-orange/20")
                    }
                  />
                  {errors.name && (
                    <p
                      id="iq-name-error"
                      className="mt-1 flex items-center gap-1 text-xs text-rust"
                    >
                      <AlertCircle className="h-3 w-3" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor={`iq-phone-${serviceName.replace(/\s/g, "-")}`}
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brown/70"
                  >
                    Phone <span className="text-orange">*</span>
                  </label>
                  <input
                    id={`iq-phone-${serviceName.replace(/\s/g, "-")}`}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="+91 90000 00000"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={
                      errors.phone ? `iq-phone-error` : undefined
                    }
                    className={
                      "w-full rounded-xl border bg-ivory/50 px-4 py-2.5 text-sm text-brown placeholder:text-brown/40 focus:outline-none focus:ring-2 " +
                      (errors.phone
                        ? "border-rust/60 focus:border-rust focus:ring-rust/20"
                        : "border-brown/15 focus:border-orange focus:ring-orange/20")
                    }
                  />
                  {errors.phone && (
                    <p
                      id="iq-phone-error"
                      className="mt-1 flex items-center gap-1 text-xs text-rust"
                    >
                      <AlertCircle className="h-3 w-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* City */}
              <div>
                <label
                  htmlFor={`iq-city-${serviceName.replace(/\s/g, "-")}`}
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brown/70"
                >
                  City
                </label>
                <select
                  id={`iq-city-${serviceName.replace(/\s/g, "-")}`}
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  className="w-full rounded-xl border border-brown/15 bg-ivory/50 px-3 py-2.5 text-sm text-brown focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20"
                >
                  {locations.map((l) => (
                    <option key={l.slug} value={l.city}>
                      {l.city}
                    </option>
                  ))}
                </select>
              </div>

              {serverError && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 rounded-xl border border-rust/30 bg-rust/5 p-3 text-sm text-rust"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-glow-orange transition-all hover:scale-[1.01] hover:brightness-110 active:scale-[0.99] disabled:opacity-70 gradient-orange"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Get my callback
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-brown/65">
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-teal" />
                  180-day warranty
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3 text-teal" />
                  30-min response
                </span>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success state */}
      {submitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center gap-3 border-t border-brown/10 p-8 text-center"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange/10 text-orange">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h3 className="font-display text-lg font-bold text-brown">
            Request received!
          </h3>
          <p className="max-w-sm text-sm text-brown/65">
            Thank you, {form.name}. Our team will call you on{" "}
            <span className="font-semibold text-brown">{form.phone}</span> within
            30 minutes during business hours. For urgent matters, please call us
            directly at{" "}
            <a
              href={`tel:${company.phonePrimaryHref}`}
              className="font-semibold text-orange hover:underline"
            >
              {company.phonePrimary}
            </a>
            .
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setOpen(false);
              setForm({ name: "", phone: "", city: locations[0].city });
            }}
            className="mt-2 rounded-full border border-brown/15 px-5 py-2.5 text-sm font-semibold text-brown transition-colors hover:bg-brown/5"
          >
            Close
          </button>
        </motion.div>
      )}

      {/* When closed & not submitted: show a quick phone CTA below the toggle */}
      {!open && !submitted && (
        <div className="flex items-center justify-between gap-3 border-t border-brown/10 bg-brown/[0.02] px-5 py-3 sm:px-6">
          <span className="text-xs text-brown/65">
            Prefer to talk? Call us directly.
          </span>
          <a
            href={`tel:${company.phonePrimaryHref}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange hover:underline"
          >
            <Phone className="h-3 w-3" />
            {company.phonePrimary}
          </a>
        </div>
      )}
    </div>
  );
}
