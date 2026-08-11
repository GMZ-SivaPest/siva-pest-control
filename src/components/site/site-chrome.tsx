"use client";

import { useEffect, useState } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { WhatsAppFab } from "./whatsapp-fab";
import { NavBridge } from "./nav-bridge";
import { ServicesMarquee } from "./services-marquee";
import { ScrollProgress } from "./scroll-progress";
import { AnnouncementBar } from "./announcement-bar";

/**
 * SiteChrome — shared layout wrapper for every page.
 * Renders ScrollProgress (fixed) + AnnouncementBar + Navbar (sticky) +
 * ServicesMarquee (sticky below navbar) + main content + Footer + WhatsApp FAB.
 *
 * Used by every App Router route file:
 *   <SiteChrome>
 *     <HomePage />
 *   </SiteChrome>
 */

// localStorage key so a dismissed promo stays hidden for the visitor
const ANNOUNCEMENT_KEY = "siva-pest-announcement-dismissed";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const [announcementOpen, setAnnouncementOpen] = useState(true);

  // Hide the promo bar for returning visitors who dismissed it once.
  // Runs after mount so server HTML (bar visible) always matches —
  // avoids hydration mismatch.
  useEffect(() => {
    try {
      if (localStorage.getItem(ANNOUNCEMENT_KEY) === "1") {
        setAnnouncementOpen(false);
      }
    } catch {
      /* localStorage unavailable — keep the bar visible */
    }
  }, []);

  const dismissAnnouncement = () => {
    setAnnouncementOpen(false);
    try {
      localStorage.setItem(ANNOUNCEMENT_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ScrollProgress />
      {announcementOpen && <AnnouncementBar onClose={dismissAnnouncement} />}
      <NavBridge />
      <Navbar />
      <ServicesMarquee />
      <main
        id="main"
        className="flex-1 pb-20 md:pb-0"
      >
        {children}
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
