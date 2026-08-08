"use client";

import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { HomePage } from "@/components/pages/home-page";
import { AboutPage } from "@/components/pages/about-page";
import { ServicesPage } from "@/components/pages/services-page";
import { ServiceDetailPage } from "@/components/pages/service-detail-page";
import { LocationsPage } from "@/components/pages/locations-page";
import { LocationDetailPage } from "@/components/pages/location-detail-page";
import { ProcessPage } from "@/components/pages/process-page";
import { PestLibraryPage } from "@/components/pages/pest-library-page";
import { IndustriesPage } from "@/components/pages/industries-page";
import { FaqPage } from "@/components/pages/faq-page";
import { ContactPage } from "@/components/pages/contact-page";
import { BlogPage } from "@/components/pages/blog-page";
import { BlogDetailPage } from "@/components/pages/blog-detail-page";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";
import { useNav } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";

/**
 * SiteShell — top-level layout that renders navbar, view router, and footer.
 * Implements client-side view switching within the single `/` route.
 */
export function SiteShell() {
  const view = useNav((s) => s.view);
  const params = useNav((s) => s.params);

  const renderView = () => {
    switch (view) {
      case "home":
        return <HomePage />;
      case "about":
        return <AboutPage />;
      case "services":
        return <ServicesPage />;
      case "service-detail":
        return <ServiceDetailPage slug={params.slug} />;
      case "locations":
        return <LocationsPage />;
      case "location-detail":
        return <LocationDetailPage slug={params.slug} />;
      case "process":
        return <ProcessPage />;
      case "pests":
        return <PestLibraryPage />;
      case "industries":
        return <IndustriesPage />;
      case "faq":
        return <FaqPage />;
      case "blog":
        return <BlogPage />;
      case "blog-detail":
        return <BlogDetailPage slug={params.slug} />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={view + (params.slug || "")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
