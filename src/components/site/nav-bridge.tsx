"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { setRouter } from "@/lib/nav-bridge";

/**
 * NavBridge — captures the Next.js App Router instance at mount
 * and stores it in the nav-bridge module so the legacy Zustand
 * useNav().navigate(view) API can push real URLs.
 *
 * Render once inside SiteChrome (top-level only).
 */
export function NavBridge() {
  const router = useRouter();
  useEffect(() => {
    setRouter(router);
    return () => setRouter(null);
  }, [router]);
  return null;
}
