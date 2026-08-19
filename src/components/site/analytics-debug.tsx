"use client";

import React from "react";
import { GA_MEASUREMENT_ID, TRACKING_ENABLED } from "@/lib/analytics";

export default function AnalyticsDebug() {
  // Show only when NEXT_PUBLIC_DEBUG_ANALYTICS is truthy
  if (process.env.NEXT_PUBLIC_DEBUG_ANALYTICS !== "1") return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        right: 12,
        bottom: 12,
        zIndex: 9999,
        background: "rgba(0,0,0,0.75)",
        color: "white",
        padding: "8px 12px",
        borderRadius: 8,
        fontSize: 12,
        boxShadow: "0 6px 18px rgba(0,0,0,0.5)",
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 6 }}>Analytics (debug)</div>
      <div>GA4 enabled: {String(TRACKING_ENABLED)}</div>
      <div style={{ wordBreak: "break-all" }}>GA_MEASUREMENT_ID: {GA_MEASUREMENT_ID || "(not set)"}</div>
      <div style={{ marginTop: 6, opacity: 0.85 }}>
        - Open devtools console: check `window.dataLayer` and `window.gtag`
      </div>
    </div>
  );
}
