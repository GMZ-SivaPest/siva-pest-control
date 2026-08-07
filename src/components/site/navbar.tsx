"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { LogoMark } from "./logo-mark";
import { useNav } from "@/lib/store";
import { mainNav } from "@/data/navigation";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";
import { services } from "@/data/services";
import { locations } from "@/data/locations";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const navigate = useNav((s) => s.navigate);
  const currentView = useNav((s) => s.view);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const handleNav = (view: string) => {
    navigate(view);
    setMobileOpen(false);
    setServicesOpen(false);
    setLocationsOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-brown/10 bg-ivory/85 backdrop-blur-xl shadow-premium"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 md:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNav("home")}
            className="flex items-center transition-opacity hover:opacity-80"
            aria-label="Siva Pest Control home"
          >
            <LogoMark size={42} />
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) => {
              const isActive =
                currentView === item.view ||
                (item.view === "services" && currentView === "service-detail") ||
                (item.view === "locations" && currentView === "location-detail");

              if (item.label === "Services") {
                return (
                  <div
                    key={item.view}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <button
                      onClick={() => handleNav("services")}
                      className={cn(
                        "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "text-orange"
                          : "text-brown/75 hover:text-brown"
                      )}
                    >
                      Services
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform",
                          servicesOpen && "rotate-180"
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18 }}
                          className="absolute left-1/2 top-full -translate-x-1/2 pt-3"
                        >
                          <div className="glass-card w-[640px] rounded-2xl p-3 shadow-premium">
                            <div className="grid grid-cols-2 gap-1">
                              {services.map((service) => (
                                <button
                                  key={service.slug}
                                  onClick={() => {
                                    navigate(`service:${service.slug}`);
                                    setServicesOpen(false);
                                  }}
                                  className="group flex items-start gap-3 rounded-xl p-3 text-left transition-colors hover:bg-orange/5"
                                >
                                  <div
                                    className={cn(
                                      "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg transition-colors",
                                      "bg-orange/10 text-orange group-hover:bg-orange group-hover:text-white"
                                    )}
                                  >
                                    <service.icon className="h-4 w-4" />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="text-sm font-semibold text-brown">
                                      {service.name}
                                    </div>
                                    <div className="truncate text-xs text-brown/60">
                                      {service.short.split("—")[0].trim()}
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </div>
                            <div className="mt-2 flex items-center justify-between rounded-xl bg-brown/5 px-4 py-3">
                              <div className="text-xs text-brown/70">
                                Not sure which service you need?
                              </div>
                              <button
                                onClick={() => handleNav("contact")}
                                className="text-xs font-semibold text-orange hover:underline"
                              >
                                Get a free assessment →
                              </button>
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
                  >
                    <button
                      onClick={() => handleNav("locations")}
                      className={cn(
                        "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "text-orange"
                          : "text-brown/75 hover:text-brown"
                      )}
                    >
                      Locations
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform",
                          locationsOpen && "rotate-180"
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {locationsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18 }}
                          className="absolute left-1/2 top-full -translate-x-1/2 pt-3"
                        >
                          <div className="glass-card w-[420px] rounded-2xl p-3 shadow-premium">
                            {locations.map((loc) => (
                              <button
                                key={loc.slug}
                                onClick={() => {
                                  navigate(`location:${loc.slug}`);
                                  setLocationsOpen(false);
                                }}
                                className="group flex w-full items-center justify-between rounded-xl p-3 text-left transition-colors hover:bg-orange/5"
                              >
                                <div>
                                  <div className="text-sm font-semibold text-brown">
                                    {loc.city}
                                  </div>
                                  <div className="text-xs text-brown/60">
                                    {loc.technicians} technicians · {loc.responseTime}
                                  </div>
                                </div>
                                <div className="text-xs font-semibold text-orange opacity-0 transition-opacity group-hover:opacity-100">
                                  View →
                                </div>
                              </button>
                            ))}
                            <div className="mt-2 rounded-xl bg-brown/5 px-4 py-3">
                              <button
                                onClick={() => handleNav("locations")}
                                className="text-xs font-semibold text-orange hover:underline"
                              >
                                See all coverage areas →
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <button
                  key={item.view}
                  onClick={() => handleNav(item.view)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-orange"
                      : "text-brown/75 hover:text-brown"
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-2">
            <a
              href={`tel:${company.phonePrimaryHref}`}
              className="hidden items-center gap-2 rounded-full border border-brown/15 px-4 py-2 text-sm font-semibold text-brown transition-colors hover:border-orange/40 hover:text-orange md:flex"
            >
              <Phone className="h-3.5 w-3.5" />
              {company.phonePrimary}
            </a>
            <button
              onClick={() => handleNav("contact")}
              className="hidden rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-white shadow-glow-orange transition-all hover:bg-orange-deep hover:shadow-glow-orange sm:inline-flex"
              style={{ background: "linear-gradient(135deg, #E88521 0%, #B85C04 100%)" }}
            >
              Get Free Quote
            </button>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brown/5 text-brown lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
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
            className="fixed inset-0 z-40 lg:hidden"
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
            >
              <div className="flex h-16 items-center justify-between px-4 sm:px-6">
                <LogoMark size={36} />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brown/5 text-brown"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="px-4 pb-8 sm:px-6">
                <nav className="space-y-1">
                  {mainNav.map((item) => (
                    <button
                      key={item.view}
                      onClick={() => handleNav(item.view)}
                      className="block w-full rounded-xl px-4 py-3 text-left text-base font-semibold text-brown transition-colors hover:bg-orange/5 hover:text-orange"
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>

                <div className="mt-6 space-y-3">
                  <a
                    href={`tel:${company.phonePrimaryHref}`}
                    className="flex items-center justify-center gap-2 rounded-full border border-brown/15 px-4 py-3 text-sm font-semibold text-brown"
                  >
                    <Phone className="h-4 w-4" />
                    {company.phonePrimary}
                  </a>
                  <button
                    onClick={() => handleNav("contact")}
                    className="block w-full rounded-full bg-orange px-5 py-3.5 text-center text-sm font-semibold text-white shadow-glow-orange"
                    style={{ background: "linear-gradient(135deg, #E88521 0%, #B85C04 100%)" }}
                  >
                    Get Free Quote
                  </button>
                </div>

                <div className="mt-8 rounded-2xl bg-brown/5 p-4 text-center">
                  <div className="text-xs font-semibold uppercase tracking-wider text-brown/50">
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
