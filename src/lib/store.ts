/**
 * store.ts — Legacy navigation store, now backed by Next.js App Router.
 *
 * The site is multi-page now. Each "view" maps to a real URL via lib/nav.ts.
 * Components that used `useNav().navigate(view)` continue to work — the call
 * is transparently routed through the Next.js router (captured by <NavBridge />).
 *
 * For new components, prefer `next/link` `<Link>` and `useRouter().push(href)`.
 */

import { create } from "zustand";
import { viewToHref } from "./nav";
import { getRouter } from "./nav-bridge";

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

const scrollToTop = () => {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const pushHref = (rawView: string) => {
  if (typeof window === "undefined") return;
  const href = viewToHref(rawView);
  const router = getRouter();
  if (router) {
    router.push(href);
  } else {
    window.location.assign(href);
  }
};

export const useNav = create<NavState>((set) => ({
  view: "home",
  params: {},
  scrollY: 0,

  navigate: (rawView: string, params?: Record<string, string>) => {
    const { view, params: parsedParams } = parseView(rawView);
    const mergedParams = { ...parsedParams, ...(params || {}) };
    set({ view, params: mergedParams, scrollY: 0 });
    pushHref(rawView);
    scrollToTop();
  },

  goHome: () => {
    set({ view: "home", params: {}, scrollY: 0 });
    pushHref("home");
    scrollToTop();
  },

  goService: (slug: string) => {
    set({ view: "service-detail", params: { slug }, scrollY: 0 });
    pushHref(`service:${slug}`);
    scrollToTop();
  },

  goLocation: (slug: string) => {
    set({ view: "location-detail", params: { slug }, scrollY: 0 });
    pushHref(`location:${slug}`);
    scrollToTop();
  },

  goSection: (section: string) => {
    // Used to scroll to a section on the home page from any view
    set({ view: "home", params: { section }, scrollY: 0 });
    if (typeof window !== "undefined") {
      pushHref("home");
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 300);
    }
  },
}));

export const useCurrentView = () => useNav((s) => s.view);
export const useParams = () => useNav((s) => s.params);
