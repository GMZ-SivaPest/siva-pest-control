/**
 * navigation.ts — Site navigation structure (single source of truth).
 * Used by navbar, footer, sitemap, breadcrumbs.
 *
 * Multi-page App Router version: each item carries a `href` (URL path)
 * plus a legacy `view` (for active-state matching via lib/nav.ts).
 */

import { company } from "./company";

export interface NavItem {
  label: string;
  href: string;
  view?: string;
  description?: string;
  children?: NavItem[];
}

export const mainNav: NavItem[] = [
  { label: "Home", href: "/", view: "home" },
  { label: "About", href: "/about", view: "about" },
  { label: "Services", href: "/services", view: "services" },
  { label: "Contact", href: "/contact", view: "contact" },
  { label: "Process", href: "/process", view: "process" },
  { label: "Pest Library", href: "/pests", view: "pests" },
  { label: "Blog", href: "/blog", view: "blog" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Company",
    items: [
      { label: "About Us", href: "/about", view: "about" },
      { label: "Our Process", href: "/process", view: "process" },
      { label: "Pest Library", href: "/pests", view: "pests" },
      { label: "Insights Blog", href: "/blog", view: "blog" },
      { label: "Contact", href: "/contact", view: "contact" },
    ],
  },
  {
    title: "Residential Services",
    items: [
      { label: "Cockroach & Ant Gel", href: "/services/cockroach-gel-treatment", view: "service:cockroach-gel-treatment" },
      { label: "Anti-Termite Treatment", href: "/services/termite-control", view: "service:termite-control" },
      { label: "Bed Bugs Elimination", href: "/services/bed-bugs-treatment", view: "service:bed-bugs-treatment" },
      { label: "Rodent Control", href: "/services/rodent-control", view: "service:rodent-control" },
      { label: "Mosquito Control", href: "/services/mosquito-control", view: "service:mosquito-control" },
      { label: "Bird Spikes & Netting", href: "/services/bird-management", view: "service:bird-management" },
    ],
  },
  {
    title: "Commercial",
    items: [
      { label: "Commercial IPM", href: "/services/commercial-ipm", view: "service:commercial-ipm" },
      { label: "Restaurants", href: "/industries", view: "industries" },
      { label: "Hotels", href: "/industries", view: "industries" },
      { label: "Warehouses", href: "/industries", view: "industries" },
      { label: "Healthcare", href: "/industries", view: "industries" },
      { label: "Manufacturing", href: "/industries", view: "industries" },
    ],
  },
  {
    title: "Contact",
    items: [
      { label: "Contact Us", href: "/contact", view: "contact" },
      { label: "Hyderabad Office", href: "/contact", view: "contact" },
      { label: "Chennai Office", href: "/contact", view: "contact" },
      { label: "Bangalore Office", href: "/contact", view: "contact" },
    ],
  },
];

export const ctaButtons = {
  primary: { label: "Get Free Quote", href: "/contact", view: "contact" },
  secondary: { label: "Call Now", href: `tel:${company.phonePrimaryHref}` },
};
