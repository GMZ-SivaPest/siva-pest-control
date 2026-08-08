/**
 * store.ts — Client-side navigation store using Zustand.
 * Implements client-side view switching within the single `/` route
 * (per skill constraint: user can only see `/`).
 *
 * Views: home, about, services, service:<slug>, locations, location:<slug>,
 *        process, pests, industries, faq, contact, blog, blog:<slug>
 *
 * View format:
 *   - "home"
 *   - "services"
 *   - "service:cockroach-gel-treatment"  (service detail)
 *   - "location:hyderabad"                (location detail)
 *   - "blog:monsoon-pest-pressure-south-india"  (blog detail)
 */

import { create } from "zustand";

export interface ViewState {
  view: string;
  params: Record<string, string>;
  scrollY: number;
}

interface NavState extends ViewState {
  navigate: (view: string, params?: Record<string, string>) => void;
  goHome: () => void;
  goService: (slug: string) => void;
  goLocation: (slug: string) => void;
  goSection: (section: string) => void;
}

const parseView = (raw: string): { view: string; params: Record<string, string> } => {
  if (raw.includes(":")) {
    const [view, paramValue] = raw.split(":");
    if (view === "service") return { view: "service-detail", params: { slug: paramValue } };
    if (view === "location") return { view: "location-detail", params: { slug: paramValue } };
    if (view === "blog") return { view: "blog-detail", params: { slug: paramValue } };
  }
  return { view: raw, params: {} };
};

export const useNav = create<NavState>((set, get) => ({
  view: "home",
  params: {},
  scrollY: 0,

  navigate: (rawView: string, params?: Record<string, string>) => {
    const { view, params: parsedParams } = parseView(rawView);
    const mergedParams = { ...parsedParams, ...(params || {}) };
    set({ view, params: mergedParams, scrollY: 0 });
    // Scroll to top on view change (except section anchors)
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  },

  goHome: () => {
    set({ view: "home", params: {}, scrollY: 0 });
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  },

  goService: (slug: string) => {
    set({ view: "service-detail", params: { slug }, scrollY: 0 });
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  },

  goLocation: (slug: string) => {
    set({ view: "location-detail", params: { slug }, scrollY: 0 });
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  },

  goSection: (section: string) => {
    // Used to scroll to a section on the home page from any view
    set({ view: "home", params: { section }, scrollY: 0 });
    if (typeof window !== "undefined") {
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 100);
    }
  },
}));

export const useCurrentView = () => useNav((s) => s.view);
export const useParams = () => useNav((s) => s.params);
