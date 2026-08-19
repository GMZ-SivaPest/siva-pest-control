'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Settings, BarChart3, Cookie, ChevronDown, Check } from 'lucide-react';

/* ────────────────────────────── Types ────────────────────────────── */

export interface ConsentPreferences {
  essential: boolean;    // Always true — required for site to function
  analytics: boolean;    // Google Analytics, etc.
  marketing: boolean;    // Ads, remarketing
  functional: boolean;   // Chat, preferences
}

const DEFAULT_PREFS: ConsentPreferences = {
  essential: true,
  analytics: false,
  marketing: false,
  functional: false,
};

export const CONSENT_STORAGE_KEY = 'siva_pest_control_consent';
const CONSENT_VERSION = '1.0';

interface StoredConsent {
  version: string;
  preferences: ConsentPreferences;
  timestamp: string;
}

/* ────────────────────────────── Cookie Categories ────────────────────────────── */

const cookieCategories = [
  {
    key: 'essential' as const,
    label: 'Essential',
    icon: Shield,
    description: 'Required for the website to function properly. These cannot be disabled.',
    required: true,
    cookies: [
      { name: 'siva_pest_control_consent', purpose: 'Stores your cookie preferences', duration: '1 year' },
      { name: 'Next.js session', purpose: 'Maintains server-side session state', duration: 'Session' },
      { name: 'csrf_token', purpose: 'Prevents cross-site request forgery attacks', duration: 'Session' },
    ],
  },
  {
    key: 'functional' as const,
    label: 'Functional',
    icon: Settings,
    description: 'Enable enhanced functionality like WhatsApp chat and form preferences.',
    required: false,
    cookies: [
      { name: 'chat_widget_prefs', purpose: 'Stores WhatsApp chat widget position/state', duration: '30 days' },
      { name: 'form_data_cache', purpose: 'Saves partially filled form data temporarily', duration: 'Session' },
    ],
  },
  {
    key: 'analytics' as const,
    label: 'Analytics',
    icon: BarChart3,
    description: 'Help us understand how visitors interact with our website so we can improve.',
    required: false,
    cookies: [
      { name: '_ga', purpose: 'Google Analytics — distinguishes unique visitors', duration: '2 years' },
      { name: '_ga_*', purpose: 'Google Analytics — maintains session state', duration: '2 years' },
      { name: '_gid', purpose: 'Google Analytics — distinguishes unique visitors (24h)', duration: '24 hours' },
    ],
  },
  {
    key: 'marketing' as const,
    label: 'Marketing',
    icon: Cookie,
    description: 'Used to deliver relevant advertisements and track campaign effectiveness.',
    required: false,
    cookies: [
      { name: '_fbp', purpose: 'Meta Pixel — tracks page views for ad targeting', duration: '90 days' },
      { name: '_gcl_au', purpose: 'Google Ads — tracks conversions from ad clicks', duration: '90 days' },
    ],
  },
];

/* ────────────────────────────── Main Component ────────────────────────────── */

function getStoredConsent(): { prefs: ConsentPreferences; hasConsent: boolean } {
  if (typeof window === 'undefined') return { prefs: DEFAULT_PREFS, hasConsent: false };
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored) {
      const parsed: StoredConsent = JSON.parse(stored);
      if (parsed.version === CONSENT_VERSION) {
        return { prefs: parsed.preferences, hasConsent: true };
      }
    }
  } catch {
    // Invalid stored data — show banner
  }
  return { prefs: DEFAULT_PREFS, hasConsent: false };
}

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>(() => getStoredConsent().prefs);

  // Show banner with delay if consent not yet given
  useEffect(() => {
    const { hasConsent } = getStoredConsent();
    if (!hasConsent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = useCallback((prefs: ConsentPreferences, consentAction: string = 'custom') => {
    const consent: StoredConsent = {
      version: CONSENT_VERSION,
      preferences: prefs,
      timestamp: new Date().toISOString(),
    };
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
    } catch {
      // localStorage might be full or disabled
    }
    setPreferences(prefs);
    setVisible(false);

    // Log consent to API for DPDP Act audit trail
    try {
      fetch('/api', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          essential: prefs.essential,
          analytics: prefs.analytics,
          marketing: prefs.marketing,
          functional: prefs.functional,
          consentAction,
        }),
      }).catch(() => {
        // Non-blocking — consent is still saved locally even if API fails
      });
    } catch {
      // Non-blocking
    }
  }, []);

  const handleAcceptAll = useCallback(() => {
    saveConsent({
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
    }, 'accept-all');
  }, [saveConsent]);

  const handleRejectAll = useCallback(() => {
    saveConsent({
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
    }, 'reject-non-essential');
  }, [saveConsent]);

  const handleSavePreferences = useCallback(() => {
    saveConsent(preferences, 'save-preferences');
  }, [preferences, saveConsent]);

  const togglePreference = useCallback((key: keyof ConsentPreferences) => {
    if (key === 'essential') return; // Can't disable essential
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed bottom-0 left-0 right-0 z-90 p-4 sm:p-6"
      >
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
          {/* Main banner view */}
          <AnimatePresence mode="wait">
            {!showDetails ? (
              <motion.div
                key="banner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-5 sm:p-6"
              >
                {/* Header */}
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
                    <Cookie className="h-5 w-5 text-emerald-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-base font-semibold text-slate-900">
                      We value your privacy
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">
                      We use cookies to enhance your browsing experience, serve personalized content,
                      and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies
                      as per our{' '}
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          window.dispatchEvent(new CustomEvent('open-legal-modal', { detail: 'cookie-policy' }));
                        }}
                        className="font-medium text-emerald-700 underline decoration-emerald-300 underline-offset-2 hover:text-emerald-800"
                      >
                        Cookie Policy
                      </a>
                      . Read our{' '}
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          window.dispatchEvent(new CustomEvent('open-legal-modal', { detail: 'privacy-policy' }));
                        }}
                        className="font-medium text-emerald-700 underline decoration-emerald-300 underline-offset-2 hover:text-emerald-800"
                      >
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </div>
                </div>

                {/* DPDP Act notice */}
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2">
                  <Shield className="h-3.5 w-3.5 shrink-0 text-amber-600" />
                  <p className="text-[11px] leading-snug text-amber-700">
                    Compliant with the <strong>Digital Personal Data Protection Act, 2023</strong> (DPDP Act, India). Your data is processed only with valid consent.
                  </p>
                </div>

                {/* Action buttons */}
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleAcceptAll}
                    className="rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-800/20"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={handleRejectAll}
                    className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300"
                  >
                    Reject Non-Essential
                  </button>
                  <button
                    onClick={() => setShowDetails(true)}
                    className="rounded-full px-5 py-2.5 text-sm font-semibold text-emerald-700 transition-all hover:bg-emerald-50"
                  >
                    Customize Preferences
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Detailed preferences view */
              <motion.div
                key="details"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-5 sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-base font-semibold text-slate-900">
                    Cookie Preferences
                  </h3>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                    aria-label="Back to summary"
                  >
                    <ChevronDown className="h-4 w-4 rotate-180" />
                  </button>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Manage your cookie preferences. Essential cookies cannot be disabled as they are necessary for the website to function.
                </p>

                {/* Category toggles */}
                <div className="mt-4 space-y-3">
                  {cookieCategories.map((category) => {
                    const Icon = category.icon;
                    const isEnabled = preferences[category.key];
                    return (
                      <div key={category.key} className="rounded-xl border border-slate-200 bg-white p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                              isEnabled ? 'bg-emerald-100' : 'bg-slate-100'
                            }`}>
                              <Icon className={`h-4 w-4 ${
                                isEnabled ? 'text-emerald-700' : 'text-slate-400'
                              }`} />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-800">
                                {category.label}
                                {category.required && (
                                  <span className="ml-2 text-[10px] font-medium text-emerald-600">
                                    Always Active
                                  </span>
                                )}
                              </p>
                              <p className="mt-0.5 text-xs text-slate-500">{category.description}</p>
                            </div>
                          </div>

                          {/* Toggle */}
                          <button
                            onClick={() => togglePreference(category.key)}
                            disabled={category.required}
                            className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
                              isEnabled
                                ? 'bg-emerald-600'
                                : 'bg-slate-200'
                            } ${category.required ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                            role="switch"
                            aria-checked={isEnabled}
                            aria-label={`${category.label} cookies`}
                          >
                            <span
                              className={`absolute top-0.5 left-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-200 ${
                                isEnabled ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            >
                              {isEnabled && <Check className="h-3 w-3 text-emerald-600" />}
                            </span>
                          </button>
                        </div>

                        {/* Cookie list */}
                        {isEnabled && (
                          <div className="mt-3 space-y-2 border-t border-slate-100 pt-3">
                            {category.cookies.map((cookie) => (
                              <div key={cookie.name} className="flex items-start justify-between gap-4 text-[11px]">
                                <div>
                                  <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-slate-700">
                                    {cookie.name}
                                  </code>
                                  <p className="mt-0.5 text-slate-500">{cookie.purpose}</p>
                                </div>
                                <span className="shrink-0 text-slate-400">{cookie.duration}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Save button */}
                <div className="mt-5 flex items-center gap-3">
                  <button
                    onClick={handleSavePreferences}
                    className="rounded-full bg-emerald-800 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-700 hover:shadow-lg"
                  >
                    Save My Preferences
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="rounded-full border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50"
                  >
                    Accept All
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
