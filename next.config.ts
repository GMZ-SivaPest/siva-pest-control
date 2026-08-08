import type { NextConfig } from "next";

/**
 * Security headers — applied to every response.
 * These protect against XSS, clickjacking, MIME-sniffing, and force HTTPS.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  // Production safety — TypeScript errors fail the build, React strict mode
  // surfaces more bugs in development. Both were disabled earlier; the
  // audit flagged them as P1 risks.
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
  allowedDevOrigins: ["*.space-z.ai", "*.chatglm.cn"],

  images: {
    // Negotiate modern formats when the browser supports them.
    formats: ["image/avif", "image/webp"],
    // All site images live under /public/images — no remote hosts needed.
    // If you later move images to a CDN, add its hostname here explicitly.
    // Do NOT use hostname: "**" — it disables next/image's safety check.
    remotePatterns: [],
  },

  // Trailing-slash normalization + legacy URL redirects.
  async redirects() {
    return [
      // Legacy single-page hash routes → real multi-page routes.
      // These fire when a user's old bookmark or Google's index still points
      // at the SPA-style URLs.
      { source: "/home", destination: "/", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/pest-library", destination: "/pests", permanent: true },
      { source: "/faqs", destination: "/faq", permanent: true },
      { source: "/services-list", destination: "/services", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
