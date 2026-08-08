"use client";

import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

/**
 * nav-bridge.ts — Captures the Next.js App Router instance at runtime
 * so that the legacy Zustand `useNav().navigate(view)` API can transparently
 * push real URLs without refactoring every component.
 *
 * The router instance is set by <NavBridge /> (rendered inside SiteChrome)
 * on mount.
 */

let routerInstance: AppRouterInstance | null = null;

export function setRouter(r: AppRouterInstance | null) {
  routerInstance = r;
}

export function getRouter(): AppRouterInstance | null {
  return routerInstance;
}
