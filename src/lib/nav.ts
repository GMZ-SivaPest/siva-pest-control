/**
 * nav.ts — Multi-page navigation helpers.
 *
 * The site is now a true multi-page Next.js App Router site.
 * Each "view" identifier used historically maps to a real URL.
 *
 *   "home"                              -> "/"
 *   "about"                             -> "/about"
 *   "services"                          -> "/services"
 *   "service:cockroach-gel-treatment"   -> "/services/cockroach-gel-treatment"
 *   "locations"                         -> "/locations"
 *   "location:hyderabad"                -> "/locations/hyderabad"
 *   "process"                           -> "/process"
 *   "pests"                             -> "/pests"
 *   "industries"                        -> "/industries"
 *   "blog"                              -> "/blog"
 *   "blog:monsoon-pest-pressure"        -> "/blog/monsoon-pest-pressure"
 *   "faq"                               -> "/faq"
 *   "contact"                           -> "/contact"
 *
 * Components that used `useNav().navigate(view)` should now import
 * `viewToHref` and use `<Link>` or `useRouter().push(href)`.
 */

export function viewToHref(view: string): string {
  if (!view) return "/";
  if (view === "home") return "/";
  if (view.startsWith("service:")) return `/services/${view.slice("service:".length)}`;
  if (view.startsWith("location:")) return `/locations/${view.slice("location:".length)}`;
  if (view.startsWith("blog:")) return `/blog/${view.slice("blog:".length)}`;
  // Plain views: about, services, locations, process, pests, industries, blog, faq, contact
  return `/${view}`;
}

/**
 * Convert a route path to the legacy "view" string format.
 * Used for active-state matching in the navbar.
 */
export function pathToView(pathname: string): string {
  if (pathname === "/" || pathname === "") return "home";
  // /services/[slug]
  if (pathname.startsWith("/services/")) return `service:${pathname.slice("/services/".length)}`;
  if (pathname === "/services") return "services";
  if (pathname.startsWith("/locations/")) return `location:${pathname.slice("/locations/".length)}`;
  if (pathname === "/locations") return "locations";
  if (pathname.startsWith("/blog/")) return `blog:${pathname.slice("/blog/".length)}`;
  if (pathname === "/blog") return "blog";
  if (pathname === "/about") return "about";
  if (pathname === "/process") return "process";
  if (pathname === "/pests") return "pests";
  if (pathname === "/industries") return "industries";
  if (pathname === "/faq") return "faq";
  if (pathname === "/contact") return "contact";
  return pathname;
}

/**
 * Determine if a nav item is active based on current pathname.
 */
export function isNavActive(currentPath: string, itemView: string): boolean {
  const currentView = pathToView(currentPath);
  if (currentView === itemView) return true;
  // Service/Location detail should highlight parent Services/Locations
  if (itemView === "services" && currentView.startsWith("service:")) return true;
  if (itemView === "locations" && currentView.startsWith("location:")) return true;
  if (itemView === "blog" && currentView.startsWith("blog:")) return true;
  return false;
}
