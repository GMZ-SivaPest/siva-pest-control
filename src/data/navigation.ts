/**
 * navigation.ts — Site navigation structure (single source of truth).
 * Used by navbar, footer, sitemap, breadcrumbs.
 */

export interface NavItem {
  label: string;
  view: string;
  description?: string;
  children?: NavItem[];
}

export const mainNav: NavItem[] = [
  { label: "Home", view: "home" },
  { label: "About", view: "about" },
  {
    label: "Services",
    view: "services",
    children: [],
  },
  {
    label: "Locations",
    view: "locations",
  },
  { label: "Process", view: "process" },
  { label: "Pest Library", view: "pests" },
  { label: "Blog", view: "blog" },
  { label: "FAQ", view: "faq" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Company",
    items: [
      { label: "About Us", view: "about" },
      { label: "Our Process", view: "process" },
      { label: "Pest Library", view: "pests" },
      { label: "Insights Blog", view: "blog" },
      { label: "FAQ", view: "faq" },
      { label: "Contact", view: "contact" },
    ],
  },
  {
    title: "Residential Services",
    items: [
      { label: "Cockroach & Ant Gel", view: "service:cockroach-gel-treatment" },
      { label: "Anti-Termite Treatment", view: "service:termite-control" },
      { label: "Bed Bugs Elimination", view: "service:bed-bugs-treatment" },
      { label: "Rodent Control", view: "service:rodent-control" },
      { label: "Mosquito Control", view: "service:mosquito-control" },
      { label: "Bird Spikes & Netting", view: "service:bird-management" },
    ],
  },
  {
    title: "Commercial",
    items: [
      { label: "Commercial IPM", view: "service:commercial-ipm" },
      { label: "Restaurants", view: "industries" },
      { label: "Hotels", view: "industries" },
      { label: "Warehouses", view: "industries" },
      { label: "Healthcare", view: "industries" },
      { label: "Manufacturing", view: "industries" },
    ],
  },
  {
    title: "Locations",
    items: [
      { label: "Hyderabad", view: "location:hyderabad" },
      { label: "Chennai", view: "location:chennai" },
      { label: "Bangalore", view: "location:bangalore" },
    ],
  },
];

export const ctaButtons = {
  primary: { label: "Get Free Quote", view: "contact" },
  secondary: { label: "Call Now", view: "tel" },
};
