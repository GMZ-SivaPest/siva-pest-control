"use client";

import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { WhatsAppFab } from "./whatsapp-fab";
import { NavBridge } from "./nav-bridge";
import { ServicesMarquee } from "./services-marquee";
import { ScrollProgress } from "./scroll-progress";

/**
 * SiteChrome — shared layout wrapper for every page.
 * Renders ScrollProgress (fixed), Navbar, ServicesMarquee on every page
 * (including the homepage), main content, Footer, and WhatsApp FAB.
 *
 * Used by every App Router route file:
 *   <SiteChrome>
 *     <HomePage />
 *   </SiteChrome>
 */

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ScrollProgress />
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