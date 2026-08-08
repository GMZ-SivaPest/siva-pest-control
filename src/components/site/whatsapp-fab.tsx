"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { company } from "@/data/company";
import { trackWhatsAppClick, trackPhoneClick } from "@/lib/analytics";

/**
 * Floating action buttons — premium chat-first design.
 *
 * Desktop (≥768px):
 *   Single floating WhatsApp button bottom-right with an expanding
 *   "Chat with us" pill label on hover + subtle pulse ring + tiny
 *   unread-style notification dot to invite a conversation.
 *
 * Mobile (<768px):
 *   Bottom-fixed bar with TWO equally prominent icon buttons —
 *   Call (orange) + WhatsApp (green). Both icons are circular,
 *   labeled, and sit in a frosted-glass strip with safe-area padding.
 *
 * Hidden on /contact (no need to duplicate the page's own CTAs).
 */
export function WhatsAppFab() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
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
      {/* ──────────────────────────────────────────────────────────
          DESKTOP — floating WhatsApp chat button with hover label
         ────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {visible && !onContact && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            className="fixed bottom-6 right-6 z-40 hidden items-center md:flex"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* Expanding "Chat with us" pill label */}
            <motion.a
              href={`${company.whatsappHref}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick({ location: "fab-desktop" })}
              aria-label="Chat with us on WhatsApp"
              className="group relative flex h-14 items-center justify-center overflow-hidden rounded-full bg-whatsapp text-white shadow-premium-lg transition-shadow hover:shadow-glow-orange"
              animate={{ width: hovered ? 200 : 56 }}
              transition={{ type: "spring", damping: 24, stiffness: 280 }}
            >
              {/* Pulse ring */}
              <span
                aria-hidden
                className="absolute inset-0 -z-10 animate-ping rounded-full bg-whatsapp opacity-25"
              />

              {/* Notification dot — subtle invitation to chat */}
              {!hovered && (
                <span
                  aria-hidden
                  className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500"
                />
              )}

              {/* Icon (always visible, shifts left when label expands) */}
              <motion.span
                className="flex items-center"
                animate={{ x: hovered ? -70 : 0 }}
                transition={{ type: "spring", damping: 24, stiffness: 280 }}
              >
                <MessageCircle className="h-6 w-6" fill="currentColor" />
              </motion.span>

              {/* Label — fades in on hover */}
              <motion.span
                className="absolute right-5 whitespace-nowrap text-sm font-semibold tracking-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.15 }}
              >
                Chat with us
              </motion.span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ──────────────────────────────────────────────────────────
          MOBILE — bottom bar with two icon buttons: Call + WhatsApp
         ────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {visible && !onContact && (
          <motion.div
            initial={{ y: 90 }}
            animate={{ y: 0 }}
            exit={{ y: 90 }}
            transition={{ type: "spring", damping: 26, stiffness: 260 }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-brown/10 bg-ivory/95 backdrop-blur-xl md:hidden"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            role="region"
            aria-label="Quick contact"
          >
            <div className="flex items-stretch gap-2.5 px-3 py-2.5">
              {/* PHONE — left, orange brand */}
              <a
                href={`tel:${company.phonePrimaryHref}`}
                onClick={() =>
                  trackPhoneClick({
                    location: "mobile-fab-bar",
                    phone: company.phonePrimary,
                  })
                }
                className="group relative flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl border border-orange/20 bg-white py-2.5 active:scale-[0.97]"
                aria-label={`Call ${company.phonePrimary}`}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-orange to-orange-deep text-white shadow-glow-orange">
                  <Phone className="h-4 w-4" fill="currentColor" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wide text-brown">
                  Call
                </span>
                {/* Subtle hover wash */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl bg-orange/0 transition-colors group-active:bg-orange/5"
                />
              </a>

              {/* WHATSAPP — right, green brand */}
              <a
                href={`${company.whatsappHref}?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick({ location: "mobile-fab-bar" })}
                className="group relative flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl bg-whatsapp py-2.5 shadow-premium active:scale-[0.97]"
                aria-label="Chat on WhatsApp"
              >
                {/* Pulse ring on WhatsApp only — signals "online, chat now" */}
                <span
                  aria-hidden
                  className="absolute top-1.5 right-2 h-2 w-2 rounded-full border border-white bg-red-500"
                />
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white">
                  <MessageCircle className="h-4 w-4" fill="currentColor" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wide text-white">
                  WhatsApp
                </span>
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl bg-white/0 transition-colors group-active:bg-white/10"
                />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
