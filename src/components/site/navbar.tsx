"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { LogoMark } from "./logo-mark";
import { mainNav } from "@/data/navigation";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";
import { isNavActive } from "@/lib/nav";
import { services } from "@/data/services";
import { locations } from "@/data/locations";
import { trackCTAClick, trackPhoneClick } from "@/lib/analytics";

/**
 * Navbar — sticky top navigation.
 *
 * Behaviour:
 * - Always solid (ivory glass + dark text) on every route.
 * - Sticky (in-flow) so a ServicesMarquee strip can stick directly below it.
 * - Mobile drawer for < lg screens.
 */
export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const pathname = usePathname();
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);

  // Navbar is now always solid (ivory glass) because a ServicesMarquee strip
  // sits directly below it on every page — a transparent navbar over the hero
  // would visually clash with the solid marquee strip below.
  // `light` is forced false; kept in code for future toggling.
  const light = false;

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile menu on Escape + restore focus to toggle
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        mobileToggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b border-brown/10 bg-ivory/85 backdrop-blur-xl shadow-premium transition-all duration-300"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center transition-opacity hover:opacity-80"
            aria-label="Siva Pest Control home"
          >
            <LogoMark size={42} variant={light ? "light" : "default"} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) => {
              const isActive = isNavActive(pathname, item.view || "");

              if (item.label === "Services") {
                return (
                  <div
                    key={item.view}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                    onFocus={() => setServicesOpen(true)}
                  >
                    <Link
                      href="/services"
                      className={cn(
                        "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "text-orange"
                          : light
                            ? "text-white/90 hover:text-white"
                            : "text-brown/75 hover:text-brown"
                      )}
                      aria-expanded={servicesOpen}
                      aria-haspopup="true"
                    >
                      Services
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform",
                          servicesOpen && "rotate-180"
                        )}
                      />
                    </Link>
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18 }}
                          className="absolute left-1/2 top-full -translate-x-1/2 pt-3"
                          style={{ maxWidth: "calc(100vw - 2rem)" }}
                        >
                          <div className="glass-card w-[640px] max-w-[calc(100vw-2rem)] rounded-2xl p-3 shadow-premium">
                            <div className="grid grid-cols-2 gap-1">
                              {services.map((service) => (
                                <Link
                                  key={service.slug}
                                  href={`/services/${service.slug}`}
                                  className="group flex items-start gap-3 rounded-xl p-3 text-left transition-colors hover:bg-orange/5"
                                >
                                  <div
                                    className={cn(
                                      "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg transition-colors",
                                      "bg-orange/10 text-orange group-hover:bg-orange group-hover:text-white"
                                    )}
                                  >
                                    <service.icon className="h-4 w-4" aria-hidden="true" />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="text-sm font-semibold text-brown">
                                      {service.name}
                                    </div>
                                    <div className="truncate text-xs text-brown/65">
                                      {service.short.split("—")[0].trim()}
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                            <div className="mt-2 flex items-center justify-between rounded-xl bg-brown/5 px-4 py-3">
                              <div className="text-xs text-brown/75">
                                Not sure which service you need?
                              </div>
                              <Link
                                href="/contact"
                                className="text-xs font-semibold text-orange hover:underline"
                              >
                                Get a free assessment →
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              if (item.label === "Locations") {
                return (
                  <div
                    key={item.view}
                    className="relative"
                    onMouseEnter={() => setLocationsOpen(true)}
                    onMouseLeave={() => setLocationsOpen(false)}
                    onFocus={() => setLocationsOpen(true)}
                  >
                    <Link
                      href="/locations"
                      className={cn(
                        "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "text-orange"
                          : light
                            ? "text-white/90 hover:text-white"
                            : "text-brown/75 hover:text-brown"
                      )}
                      aria-expanded={locationsOpen}
                      aria-haspopup="true"
                    >
                      Locations
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform",
                          locationsOpen && "rotate-180"
                        )}
                      />
                    </Link>
                    <AnimatePresence>
                      {locationsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18 }}
                          className="absolute left-1/2 top-full -translate-x-1/2 pt-3"
                          style={{ maxWidth: "calc(100vw - 2rem)" }}
                        >
                          <div className="glass-card w-[420px] max-w-[calc(100vw-2rem)] rounded-2xl p-3 shadow-premium">
                            {locations.map((loc) => (
                              <Link
                                key={loc.slug}
                                href={`/locations/${loc.slug}`}
                                className="group flex w-full items-center justify-between rounded-xl p-3 text-left transition-colors hover:bg-orange/5"
                              >
                                <div>
                                  <div className="text-sm font-semibold text-brown">
                                    {loc.city}
                                  </div>
                                  <div className="text-xs text-brown/65">
                                    {loc.technicians} technicians · {loc.responseTime}
                                  </div>
                                </div>
                                <div className="text-xs font-semibold text-orange opacity-0 transition-opacity group-hover:opacity-100">
                                  View →
                                </div>
                              </Link>
                            ))}
                            <div className="mt-2 rounded-xl bg-brown/5 px-4 py-3">
                              <Link
                                href="/locations"
                                className="text-xs font-semibold text-orange hover:underline"
                              >
                                See all coverage areas →
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.view}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-orange"
                      : light
                        ? "text-white/90 hover:text-white"
                        : "text-brown/75 hover:text-brown"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-2">
            <a
              href={`tel:${company.phonePrimaryHref}`}
              onClick={() => trackPhoneClick({ location: "navbar", phone: company.phonePrimary })}
              className={cn(
                "hidden items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors md:flex",
                light
                  ? "border-white/30 text-white hover:border-white/60 hover:bg-white/10"
                  : "border-brown/15 text-brown hover:border-orange/40 hover:text-orange"
              )}
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {company.phonePrimary}
            </a>
            <Link
              href="/contact"
              onClick={() => trackCTAClick({ location: "navbar", label: "Get Free Quote", href: "/contact" })}
              className="hidden rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-glow-orange transition-all hover:brightness-110 hover:scale-[1.02] sm:inline-flex gradient-orange"
            >
              Get Free Quote
            </Link>

            {/* Mobile toggle */}
            <button
              ref={mobileToggleRef}
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden",
                light
                  ? "bg-white/10 text-white hover:bg-white/20"
                  : "bg-brown/5 text-brown hover:bg-brown/10"
              )}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-brown/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="absolute right-0 top-0 h-full w-full max-w-sm bg-ivory shadow-premium overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            id="mobile-menu"
            ref={mobileDrawerRef}
          >
            <div className="flex h-16 items-center justify-between px-4 sm:px-6">
              <LogoMark size={36} />
              <button
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brown/5 text-brown"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

              <div className="px-4 pb-8 sm:px-6">
                <nav className="space-y-1">
                  {mainNav.map((item) => {
                    const isActive = isNavActive(pathname, item.view || "");
                    return (
                      <Link
                        key={item.view}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "block w-full rounded-xl px-4 py-3 text-left text-base font-semibold transition-colors",
                          isActive
                            ? "bg-orange/5 text-orange"
                            : "text-brown hover:bg-orange/5 hover:text-orange"
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-6 space-y-3">
                  <a
                    href={`tel:${company.phonePrimaryHref}`}
                    onClick={() => trackPhoneClick({ location: "mobile-menu", phone: company.phonePrimary })}
                    className="flex items-center justify-center gap-2 rounded-full border border-brown/15 px-4 py-3 text-sm font-semibold text-brown"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    {company.phonePrimary}
                  </a>
                  <Link
                    href="/contact"
                    onClick={() => {
                      setMobileOpen(false);
                      trackCTAClick({ location: "mobile-menu", label: "Get Free Quote", href: "/contact" });
                    }}
                    className="block w-full rounded-full px-5 py-3.5 text-center text-sm font-semibold text-white shadow-glow-orange gradient-orange"
                  >
                    Get Free Quote
                  </Link>
                </div>

                <div className="mt-8 rounded-2xl bg-brown/5 p-4 text-center">
                  <div className="text-xs font-semibold uppercase tracking-wider text-brown/60">
                    Serving
                  </div>
                  <div className="mt-1 text-sm font-semibold text-brown">
                    Hyderabad · Chennai · Bangalore
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
