"use client";

import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { WhatsAppFab } from "./whatsapp-fab";
import { NavBridge } from "./nav-bridge";

/**
 * SiteChrome — shared layout wrapper for every page.
 * Renders Navbar (sticky) + main content + Footer + WhatsApp FAB.
 *
 * Used by every App Router route file:
 *   <SiteChrome>
 *     <HomePage />
 *   </SiteChrome>
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <NavBridge />
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
