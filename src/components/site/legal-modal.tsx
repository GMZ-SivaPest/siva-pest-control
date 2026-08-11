"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  X,
  Shield,
  Cookie,
  FileText,
  Lock,
  UserCheck,
  Eye,
  AlertTriangle,
  Building2,
  Phone,
  Mail,
  Clock,
  Scale,
} from "lucide-react";
import { company } from "@/data/company";
import { locations } from "@/data/locations";

/* ────────────────────────────── Types ────────────────────────────── */

export type LegalDocType =
  | "privacy-policy"
  | "cookie-policy"
  | "terms-conditions";

interface LegalModalProps {
  initialDoc?: LegalDocType;
}

/* ────────────────────────────── Constants ────────────────────────────── */

const SITE_URL = company.siteUrl;

// HQ registered address (Madhapur) — single source of truth in locations.ts
const hq = locations.find((l) => l.slug === "hyderabad");
const HQ_ADDRESS = hq
  ? `${hq.address.line1}, ${hq.address.line2} (${hq.address.landmark}) — ${hq.address.pincode}`
  : "Plot 14, Road 2, Madhapur, Hyderabad, Telangana 500081";

/* ────────────────────────────── Legal Content ────────────────────────────── */

const PRIVACY_POLICY = {
  title: "Privacy Policy",
  icon: Shield,
  lastUpdated: "January 15, 2025",
  sections: [
    {
      title: "1. Introduction",
      icon: Eye,
      content: `${company.name} ("we", "our", "us") is committed to protecting and respecting your privacy in compliance with the Digital Personal Data Protection Act, 2023 ("DPDP Act") and applicable Indian data protection laws.

This Privacy Policy explains how we collect, use, store, and protect your personal data when you use our website (${SITE_URL}), mobile applications, and services. It also outlines your rights as a Data Principal under Indian law.

By using our services, you consent to the data practices described in this policy. If you do not agree with this policy, please do not use our services.`,
    },
    {
      title: "2. Data Controller",
      icon: Building2,
      content: `Data Controller: ${company.name}
Registered Address: ${HQ_ADDRESS}
Email: ${company.email}
Phone: ${company.phonePrimary}

We are the "Data Fiduciary" as defined under the DPDP Act, 2023, and are responsible for determining the purposes and means of processing your personal data.`,
    },
    {
      title: "3. Data We Collect",
      icon: UserCheck,
      content: `We collect the following categories of personal data:

A. Data You Provide Directly:
• Name, phone number, and email address when you request a quote
• Property address and location details
• Pest problem description and property type (residential/commercial)
• Any messages or communications you send us
• Payment information for service bookings

B. Data Collected Automatically:
• Device information (browser type, operating system)
• IP address and approximate location
• Pages visited, time spent, and navigation patterns
• Referral source and search terms used
• Cookie identifiers (see our Cookie Policy)

C. Data from Third Parties:
• Google review information (if you leave a review)
• WhatsApp communication metadata
• Payment gateway confirmation (we do not store card details)`,
    },
    {
      title: "4. Purpose & Legal Basis for Processing",
      icon: Scale,
      content: `We process your personal data only for lawful purposes as defined under Section 7 of the DPDP Act:

A. Consent-Based Processing:
• Sending promotional offers and marketing communications
• Analytics to improve our website and services
• Storing cookie preferences

B. Legitimate Interest Processing:
• Providing pest control services you requested
• Scheduling inspections and follow-up visits
• Sending service reminders and warranty information
• Processing payments and preventing fraud

C. Legal Compliance:
• Maintaining treatment records as required by pest control regulations
• FSSAI compliance documentation for commercial clients
• Responding to legal requests from government authorities

D. Contractual Necessity:
• Fulfilling service agreements and annual maintenance contracts
• Providing warranty and guarantee services`,
    },
    {
      title: "5. Data Storage & Security",
      icon: Lock,
      content: `We implement industry-standard security measures to protect your personal data:

Technical Measures:
• SSL/TLS encryption for all data in transit (HTTPS)
• AES-256 encryption for sensitive data at rest
• Secure server infrastructure with firewalls and intrusion detection
• Regular security audits and vulnerability assessments
• Access controls with role-based permissions

Organizational Measures:
• Employee training on data protection and DPDP Act compliance
• Non-disclosure agreements with all staff and contractors
• Data minimization — we collect only what is necessary
• Regular review of data processing activities

Data Retention:
• Quote requests: 2 years from submission
• Service records: 5 years (regulatory requirement)
• Cookie consent: 1 year, then re-prompted
• Marketing data: Until consent is withdrawn
• You may request early deletion at any time (see Section 7)

Data Location:
Your data is stored on servers located in India (Mumbai region). We do not transfer personal data outside India except where explicitly consented to or required by law.`,
    },
    {
      title: "6. Data Sharing",
      icon: Eye,
      content: `We do NOT sell your personal data to third parties. We share data only with:

• Service Partners: Technicians and field staff who need your address and contact details for service delivery
• Payment Processors: Secure payment gateways for processing transactions (they handle card data under PCI-DSS compliance)
• Communication Platforms: WhatsApp Business API, SMS gateways for sending appointment confirmations
• Legal Authorities: When required by law, court order, or government regulation
• Business Transfers: In case of merger, acquisition, or sale of assets (you will be notified)

All third-party partners are bound by data processing agreements that comply with the DPDP Act.`,
    },
    {
      title: "7. Your Rights (Data Principal Rights)",
      icon: UserCheck,
      content: `Under the DPDP Act, 2023, you have the following rights as a Data Principal:

A. Right to Access (Section 10):
You can request a copy of all personal data we hold about you. We will provide this within 30 days.

B. Right to Correction (Section 11):
You can request correction of inaccurate or incomplete personal data.

C. Right to Erasure (Section 12):
You can request deletion of your personal data, subject to legal retention requirements. We will delete non-essential data within 15 business days.

D. Right to Nominate (Section 14):
You can nominate another person to exercise your data rights on your behalf in case of death or incapacity.

E. Right to Withdraw Consent (Section 6):
You can withdraw consent at any time. Withdrawal will not affect the lawfulness of processing prior to withdrawal.

F. Right to Grievance Redressal (Section 13):
You can file a grievance with our Grievance Officer (see Section 9).

How to Exercise Your Rights:
• Email: ${company.email}
• Phone: ${company.phonePrimary}
• Use the cookie consent manager on our website
• Send a written request to our registered address`,
    },
    {
      title: "8. Children's Data",
      icon: Shield,
      content: `We do not knowingly collect personal data from children under 18 years of age. If we become aware that we have collected data from a child without verifiable parental consent, we will take steps to delete that information promptly.

If you believe a child has provided personal data to us, please contact us at privacy@sivapestcontrol.com.`,
    },
    {
      title: "9. Grievance Officer",
      icon: Phone,
      content: `As required under Section 13 of the DPDP Act, we have appointed a Grievance Officer to address your data protection concerns:

Grievance Officer: ${company.name} Data Protection Team
Email: ${company.emailGrievance}
Phone: ${company.phonePrimary}
Address: ${HQ_ADDRESS}
Response Time: Within 30 business days of receiving a complaint

If you are not satisfied with our response, you may escalate your complaint to the Data Protection Board of India as established under the DPDP Act.`,
    },
    {
      title: "10. Changes to This Policy",
      icon: AlertTriangle,
      content: `We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. We will:

• Post the updated policy on this page with a revised "Last Updated" date
• Notify you via email for material changes (if we have your email)
• Display a prominent notice on our website for significant changes
• Re-obtain your consent if the changes require it under the DPDP Act

Continued use of our services after changes constitutes acceptance of the updated policy.`,
    },
  ],
};

const COOKIE_POLICY = {
  title: "Cookie Policy",
  icon: Cookie,
  lastUpdated: "January 15, 2025",
  sections: [
    {
      title: "1. What Are Cookies",
      icon: Cookie,
      content: `Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites work more efficiently, provide a better browsing experience, and supply information to the website owners.

Similar technologies we use:
• Local Storage: Stores data persistently in your browser (e.g., cookie preferences)
• Session Storage: Temporary storage that clears when you close your browser
• Pixel Tags: Tiny transparent images used to track email opens and page views`,
    },
    {
      title: "2. How We Use Cookies",
      icon: Eye,
      content: `We use cookies for the following purposes:

Essential Cookies (Always Active):
These are strictly necessary for the website to function. You cannot opt out of these.
• siva_pest_control_consent — Stores your cookie consent preferences
• Next.js session — Maintains server-side session state
• csrf_token — Prevents cross-site request forgery attacks

Functional Cookies:
Enable enhanced functionality and personalization.
• chat_widget_prefs — Stores WhatsApp chat widget position/state
• form_data_cache — Saves partially filled form data temporarily

Analytics Cookies:
Help us understand how visitors use our website so we can improve it.
• _ga — Google Analytics unique visitor identifier (2 years)
• _ga_* — Google Analytics session state (2 years)
• _gid — Google Analytics 24-hour visitor identifier

Marketing Cookies:
Used for advertising and campaign tracking.
• _fbp — Meta Pixel for ad targeting (90 days)
• _gcl_au — Google Ads conversion tracking (90 days)`,
    },
    {
      title: "3. Your Cookie Choices",
      icon: UserCheck,
      content: `You have the right to decide whether to accept or reject non-essential cookies. You can:

A. Cookie Consent Banner:
When you first visit our website, you will see a cookie consent banner. You can:
• Accept All — Enable all cookie categories
• Reject Non-Essential — Only essential cookies will be active
• Customize — Choose specific categories to enable

B. Manage Anytime:
You can update your preferences at any time by:
• Clicking the "Cookie Settings" link in the footer
• Clearing your browser's localStorage for our domain
• The consent banner will reappear when your preferences expire (1 year)

C. Browser Settings:
You can also control cookies through your browser settings. Most browsers allow you to:
• View and delete existing cookies
• Block cookies from specific or all websites
• Set preferences for certain types of cookies

Note: Blocking essential cookies may affect the functionality of our website.`,
    },
    {
      title: "4. Third-Party Cookies",
      icon: Building2,
      content: `Some cookies on our website are set by third-party services:

Google Analytics: We use Google Analytics to understand website traffic and usage patterns. Google sets cookies (_ga, _gid) that help us analyze how visitors interact with our site. This data is aggregated and anonymized. Google's privacy policy: https://policies.google.com/privacy

Meta Pixel: We may use Meta Pixel to measure the effectiveness of our advertising on Facebook and Instagram. Meta sets the _fbp cookie. Meta's privacy policy: https://www.facebook.com/privacy/policy

WhatsApp Business API: We use WhatsApp for customer communication. WhatsApp may set cookies for their web widget functionality. WhatsApp's privacy policy: https://www.whatsapp.com/legal/privacy-policy

We do not control these third-party cookies and recommend reviewing their respective privacy policies.`,
    },
    {
      title: "5. Cookie Duration",
      icon: Clock,
      content: `Cookies have different lifespans:

Session Cookies: These are temporary and expire when you close your browser.
Persistent Cookies: These remain on your device for a set period:
• Essential: 1 year (consent preferences)
• Analytics: 24 hours to 2 years (varies by Google Analytics cookie)
• Marketing: 90 days (ad tracking cookies)
• Functional: Session to 30 days

When persistent cookies expire, they are automatically deleted from your device.`,
    },
    {
      title: "6. Contact Us",
      icon: Mail,
      content: `If you have questions about our use of cookies or this Cookie Policy, please contact us:

Email: privacy@sivapestcontrol.com
Phone: ${company.phonePrimary}
Address: ${HQ_ADDRESS}

For data protection concerns, contact our Grievance Officer at ${company.emailGrievance}.`,
    },
  ],
};

const TERMS_CONDITIONS = {
  title: "Terms & Conditions",
  icon: FileText,
  lastUpdated: "January 15, 2025",
  sections: [
    {
      title: "1. Agreement to Terms",
      icon: Scale,
      content: `By accessing and using the ${company.name} website (${SITE_URL}) and engaging our pest control services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our website or services.

These terms constitute a legally binding agreement between you ("Customer") and ${company.name} ("Company", "we", "us"), governed by the laws of India.`,
    },
    {
      title: "2. Services Description",
      icon: Building2,
      content: `${company.name} provides professional pest control services including but not limited to:

• Termite Control (Pre-construction & Post-construction treatment)
• Cockroach Control (Gel bait and residual spray treatment)
• Mosquito Control (Fogging and larvicidal treatment)
• Bed Bug Treatment (Heat treatment and chemical application)
• Rodent Control (Bait stations, trapping, and exclusion proofing)
• Ant Control (Bait and barrier treatments)
• Bird Control (Spikes, netting, and deterrent systems)
• Commercial Pest Management (Annual Maintenance Contracts)

Service Areas: Hyderabad, Secunderabad, and surrounding areas within 50 km radius.

All services are performed by trained, certified technicians using government-approved chemicals.`,
    },
    {
      title: "3. Booking & Scheduling",
      icon: Clock,
      content: `Booking Process:
• Free inspection can be requested via phone, WhatsApp, or our website form
• We will call you within 30 minutes during business hours (Mon–Sat, 8AM–8PM)
• Service appointments are subject to availability

Scheduling:
• Same-day service available for requests made before 12 PM (subject to availability)
• We will confirm the appointment time via phone or WhatsApp
• Service windows are approximate; delays may occur due to prior appointments

Rescheduling & Cancellation:
• Free rescheduling up to 2 hours before the appointment
• Cancellations made less than 2 hours before may incur a convenience fee
• No-shows may be charged the applicable inspection fee`,
    },
    {
      title: "4. Pricing & Payment",
      icon: Scale,
      content: `Pricing:
• All quotes are indicative and may vary based on inspection findings
• Final pricing is communicated after the free inspection
• All quotes are inclusive of GST unless stated otherwise

Payment Terms:
• Payment is due upon completion of service
• We accept: Cash, UPI, Bank Transfer, Credit/Debit Cards
• For AMC clients: Payment as per contract schedule
• EMI options available on request for eligible treatments

Refund Policy:
• If you are not satisfied with the treatment, we offer a free re-treatment within the warranty period
• Refunds are considered on a case-by-case basis
• Refund requests must be made within 7 days of service
• Processing time: 7–10 business days`,
    },
    {
      title: "5. Warranty & Guarantee",
      icon: Shield,
      content: `We stand behind our services with the following warranties:

One-Time Treatment:
• Cockroach/Gel Bait: 6-month warranty
• Termite Treatment: 5-year warranty (post-construction)
• Mosquito Fogging: No warranty (repeat treatment recommended monthly)
• Bed Bug: 3-month warranty
• Rodent: 3-month warranty
• General Pest: 3-month warranty

Annual Maintenance Contract (AMC):
• Monthly/quarterly service visits as per contract
• Free emergency visits between scheduled services
• Covers all common pests specified in the contract

Warranty Conditions:
• Warranty applies only to the treated property and pest type
• Customer must not use other pest control services during the warranty period
• Structural modifications or renovations may void the termite warranty
• Warranty is non-transferable`,
    },
    {
      title: "6. Customer Responsibilities",
      icon: UserCheck,
      content: `To ensure effective service, the Customer agrees to:

• Provide accurate information about the pest problem and property
• Grant technicians reasonable access to all affected areas
• Remove or protect food items, utensils, and pet belongings before treatment
• Follow pre-treatment instructions provided by our team (e.g., vacating areas during fogging)
• Keep children and pets away from treated surfaces for the recommended period
• Not interfere with bait stations or pest control equipment
• Report any adverse reactions immediately to our team
• Make timely payment as agreed`,
    },
    {
      title: "7. Limitation of Liability",
      icon: AlertTriangle,
      content: `To the maximum extent permitted by Indian law:

• Our liability for any claim arising from pest control services shall not exceed the amount paid for the specific service in question
• We are not liable for pest infestations that occur due to structural issues, poor sanitation, or conditions beyond our control
• We are not liable for damage to property caused by pre-existing conditions
• We are not liable for indirect, incidental, or consequential damages
• Our warranties are limited to re-treatment as described in Section 5

Nothing in these terms excludes liability for death or personal injury caused by our negligence, or for fraud.`,
    },
    {
      title: "8. Intellectual Property",
      icon: Eye,
      content: `All content on our website, including but not limited to text, images, logos, graphics, and service descriptions, is the intellectual property of ${company.name} or its licensors and is protected by Indian copyright and trademark laws.

You may not:
• Copy, reproduce, or distribute any content from our website
• Use our trademarks, logos, or brand materials without written permission
• Create derivative works based on our website content
• Use automated systems (bots, scrapers) to collect data from our website`,
    },
    {
      title: "9. Dispute Resolution",
      icon: Scale,
      content: `Governing Law: These terms are governed by the laws of India, specifically the laws of the State of Telangana.

Dispute Resolution Process:
1. First, contact us at ${company.emailGrievance} to attempt amicable resolution
2. If unresolved within 30 days, either party may initiate mediation through a mutually agreed mediator
3. If mediation fails, disputes shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana

Consumer Protection: Customers retain all rights under the Consumer Protection Act, 2019 and may approach the appropriate Consumer Disputes Redressal Commission.`,
    },
    {
      title: "10. Data Protection",
      icon: Lock,
      content: `Our collection and use of personal data is governed by our Privacy Policy, which is compliant with the Digital Personal Data Protection Act, 2023 (DPDP Act).

Key commitments:
• We process your data only with valid consent or legitimate purpose
• You can access, correct, or delete your data at any time
• We implement robust security measures to protect your information
• We have a designated Grievance Officer for data protection concerns

Please read our complete Privacy Policy for detailed information on how we handle your personal data.`,
    },
    {
      title: "11. Modifications to Terms",
      icon: AlertTriangle,
      content: `We reserve the right to modify these Terms and Conditions at any time. Changes will be effective when posted on our website. Continued use of our services after changes constitutes acceptance of the modified terms.

For material changes, we will:
• Update the "Last Updated" date on this page
• Notify existing customers via email or WhatsApp
• Display a notice on our website homepage for 30 days`,
    },
    {
      title: "12. Contact Information",
      icon: Phone,
      content: `For questions about these Terms and Conditions, please contact us:

${company.name}
Address: ${HQ_ADDRESS}
Phone: ${company.phonePrimary}
Email: ${company.email}
Website: ${SITE_URL}

For data protection concerns: ${company.emailGrievance}
For billing inquiries: billing@sivapestcontrol.com

Business Hours: Monday–Saturday, 8:00 AM – 8:00 PM IST`,
    },
  ],
};

/* ────────────────────────────── Legal Doc Renderer ────────────────────────────── */

function LegalDocContent({ doc }: { doc: typeof PRIVACY_POLICY }) {
  const DocIcon = doc.icon;
  return (
    <div>
      {/* Doc header */}
      <div className="mb-6 flex items-center gap-3 border-b border-slate-200 pb-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
          <DocIcon className="h-5 w-5 text-emerald-700" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-brown">
            {doc.title}
          </h2>
          <p className="text-xs text-slate-500">Last Updated: {doc.lastUpdated}</p>
        </div>
      </div>

      {/* Sections */}
      <div className="max-h-[60vh] space-y-5 overflow-y-auto pr-2 custom-scrollbar">
        {doc.sections.map((section) => {
          const SectionIcon = section.icon;
          return (
            <div
              key={section.title}
              className="rounded-xl border border-slate-100 bg-slate-50/50 p-4"
            >
              <div className="flex items-center gap-2">
                <SectionIcon className="h-4 w-4 shrink-0 text-emerald-600" />
                <h3 className="font-display text-sm font-semibold text-brown">
                  {section.title}
                </h3>
              </div>
              <div className="mt-2 whitespace-pre-line text-xs leading-relaxed text-slate-600">
                {section.content}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ────────────────────────────── Main Modal Component ────────────────────────────── */

export function LegalModal({ initialDoc }: LegalModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDoc, setActiveDoc] = useState<LegalDocType>(
    initialDoc || "privacy-policy"
  );

  // Listen for custom events dispatched from Footer links, cookie banner,
  // or the contact form's DPDP consent link.
  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<LegalDocType>;
      setActiveDoc(customEvent.detail);
      setIsOpen(true);
    };
    window.addEventListener("open-legal-modal", handler);
    return () => window.removeEventListener("open-legal-modal", handler);
  }, []);

  const getDocData = useCallback((type: LegalDocType) => {
    switch (type) {
      case "privacy-policy":
        return PRIVACY_POLICY;
      case "cookie-policy":
        return COOKIE_POLICY;
      case "terms-conditions":
        return TERMS_CONDITIONS;
    }
  }, []);

  const docTabs: { key: LegalDocType; label: string; icon: LucideIcon }[] = [
    { key: "privacy-policy", label: "Privacy Policy", icon: Shield },
    { key: "cookie-policy", label: "Cookie Policy", icon: Cookie },
    { key: "terms-conditions", label: "Terms & Conditions", icon: FileText },
  ];

  // Close on Escape key + lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Modal — opened via the `open-legal-modal` window event */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Tab navigation */}
              <div className="border-b border-slate-200 bg-slate-50 px-4 pt-4">
                <div className="flex gap-1">
                  {docTabs.map((tab) => {
                    const TabIcon = tab.icon;
                    const isActive = activeDoc === tab.key;
                    return (
                      <button
                        key={tab.key}
                        onClick={() => setActiveDoc(tab.key)}
                        className={`flex items-center gap-1.5 rounded-t-lg px-3 py-2.5 text-xs font-semibold transition-all ${
                          isActive
                            ? "bg-white text-emerald-700 shadow-sm"
                            : "text-slate-500 hover:bg-white/50 hover:text-slate-700"
                        }`}
                      >
                        <TabIcon className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDoc}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <LegalDocContent doc={getDocData(activeDoc)} />
                  </motion.div>
                </AnimatePresence>

                {/* Footer actions */}
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <p className="text-[10px] text-slate-400">
                    Compliant with DPDP Act, 2023 (India)
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-full bg-emerald-800 px-5 py-2 text-xs font-semibold text-white transition-all hover:bg-emerald-700"
                  >
                    I Understand
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
