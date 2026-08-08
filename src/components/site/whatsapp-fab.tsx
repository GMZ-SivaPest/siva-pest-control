"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { company } from "@/data/company";
import { trackWhatsAppClick, trackPhoneClick, trackCTAClick } from "@/lib/analytics";

/**
 * Floating action buttons for mobile + sticky bottom CTA.
 *
 * Desktop (≥768px): single floating WhatsApp button bottom-right.
 * Mobile (<768px): sticky bottom bar with Call + WhatsApp + Get Quote.
 *
 * The bar hides when the user is on the contact page (no need to duplicate CTA).
 */
export function WhatsAppFab() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide on contact page — duplicate CTA not needed
  const onContact = pathname === "/contact";

  const message = encodeURIComponent(
    "Hi Siva Pest Control, I'd like to book a free pest inspection. Please call me back."
  );

  return (
    <>
      {/* Desktop floating WhatsApp button */}
      <AnimatePresence>
        {visible && !onContact && (
          <motion.a
            href={`${company.whatsappHref}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick({ location: "fab-desktop" })}
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-premium hover:scale-105 md:flex"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="h-6 w-6" fill="currentColor" />
            <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-whatsapp opacity-30" />
          </motion.a>
        )}
      </AnimatePresence>

      {/* Mobile sticky bottom CTA bar */}
      <AnimatePresence>
        {visible && !onContact && (
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ type: "spring", damping: 26, stiffness: 260 }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-brown/10 bg-ivory/95 px-3 py-2.5 backdrop-blur-xl md:hidden"
            style={{ paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom))" }}
          >
            <div className="flex items-center gap-2">
              <a
                href={`tel:${company.phonePrimaryHref}`}
                onClick={() => trackPhoneClick({ location: "mobile-cta-bar", phone: company.phonePrimary })}
                className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full border border-brown/15 bg-white px-3 text-xs font-bold text-brown"
                aria-label="Call us"
              >
                <Phone className="h-3.5 w-3.5" />
                Call
              </a>
              <a
                href={`${company.whatsappHref}?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick({ location: "mobile-cta-bar" })}
                className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full bg-whatsapp px-3 text-xs font-bold text-white"
                aria-label="WhatsApp us"
              >
                <MessageCircle className="h-3.5 w-3.5" fill="currentColor" />
                WhatsApp
              </a>
              <Link
                href="/contact"
                onClick={() => trackCTAClick({ location: "mobile-cta-bar", label: "Free Quote", href: "/contact" })}
                className="flex h-11 flex-[1.4] items-center justify-center rounded-full px-3 text-xs font-bold text-white shadow-glow-orange gradient-orange"
              >
                Free Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
