import Link from "next/link";
import { SiteChrome } from "@/components/site/site-chrome";
import { Home, Search, Bug, ArrowRight, Phone } from "lucide-react";
import { company } from "@/data/company";
import { services } from "@/data/services";

export default function NotFound() {
  return (
    <SiteChrome>
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10 gradient-warm-soft" />
        <div className="absolute inset-0 -z-10 bg-grid-warm opacity-20" />
        <div
          className="absolute -top-32 left-1/2 -z-10 h-64 w-[640px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{
            background: "radial-gradient(circle, #D77005 0%, transparent 70%)",
          }}
        />

        <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
          <div className="text-center">
            {/* Big 404 with pest theme */}
            <div className="relative inline-flex items-center justify-center">
              <Bug
                className="absolute -left-16 top-2 h-12 w-12 text-orange/30 animate-spin-slow"
                aria-hidden="true"
              />
              <h1 className="font-display text-[7rem] font-extrabold leading-none tracking-tighter text-brown sm:text-[10rem]">
                4
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #E88521 0%, #D77005 50%, #99341F 100%)",
                  }}
                >
                  0
                </span>
                4
              </h1>
              <Bug
                className="absolute -right-16 top-2 h-12 w-12 text-teal/30 animate-spin-rev-slow"
                aria-hidden="true"
              />
            </div>

            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-orange">
              Page not found
            </p>

            <h2 className="mt-6 font-display text-3xl font-bold text-brown sm:text-4xl text-balance">
              This page seems to have crawled away.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-brown/65 text-pretty">
              The page you're looking for might have been moved, renamed, or
              never existed. But our pest control experts are still here —
              let's get you back on track.
            </p>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-glow-orange transition-all hover:scale-[1.02] gradient-orange"
              >
                <Home className="h-4 w-4" />
                Back to Home
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href={`tel:${company.phonePrimaryHref}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-brown/15 bg-white px-6 py-3.5 text-sm font-semibold text-brown shadow-premium transition-colors hover:border-orange/40 hover:text-orange"
              >
                <Phone className="h-4 w-4" />
                Call {company.phonePrimary}
              </a>
            </div>
          </div>

          {/* Popular services */}
          <div className="mt-20">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-brown/70">
              Or explore our most popular services
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {services.slice(0, 6).map((service) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group flex items-center gap-3 rounded-2xl border border-brown/10 bg-white p-4 shadow-premium transition-all hover:-translate-y-0.5 hover:shadow-lift"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-orange/10 text-orange transition-colors group-hover:bg-orange group-hover:text-white">
                      <Icon className="h-5 w-5" strokeWidth={1.6} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold text-brown">
                        {service.name}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 flex-shrink-0 text-brown/40 transition-all group-hover:translate-x-0.5 group-hover:text-orange" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Helpful links */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <Link
              href="/services"
              className="font-medium text-brown/65 transition-colors hover:text-orange"
            >
              All services
            </Link>
            <Link
              href="/contact"
              className="font-medium text-brown/65 transition-colors hover:text-orange"
            >
              Contact
            </Link>
            <Link
              href="/blog"
              className="font-medium text-brown/65 transition-colors hover:text-orange"
            >
              Blog
            </Link>
            <Link
              href="/pests"
              className="font-medium text-brown/65 transition-colors hover:text-orange"
            >
              Pest Library
            </Link>
            <Link
              href="/contact"
              className="font-medium text-brown/65 transition-colors hover:text-orange"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
