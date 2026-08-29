"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import { MapPin, Phone, Star, Users, Clock, X } from "lucide-react";
import { locations } from "@/data/locations";
import { cn } from "@/lib/utils";
import southIndiaTopo from "@/data/south-india.topo.json";

/**
 * SouthIndiaMap — real geographic map of South India rendered with d3-geo.
 * Uses actual state boundary data (TopoJSON) projected with Mercator.
 * States: Karnataka, Telangana, Andhra Pradesh, Tamil Nadu, Kerala,
 * Goa, Maharashtra, Odisha, Chhattisgarh, Puducherry.
 */

// ─── City positions (real lat/lng) ───
// All pins share one accent colour (brand teal) for a consistent, modern
// data layer. The active pin is differentiated by size + glow, not hue.
const cityPins = [
  {
    slug: "hyderabad",
    label: "Hyderabad",
    state: "Telangana",
    coords: [78.4867, 17.385],
    color: "#719899",
  },
  {
    slug: "chennai",
    label: "Chennai",
    state: "Tamil Nadu",
    coords: [80.2707, 13.0827],
    color: "#719899",
  },
  {
    slug: "bangalore",
    label: "Bangalore",
    state: "Karnataka",
    coords: [77.5946, 12.9716],
    color: "#719899",
  },
  {
    slug: "isukapalli",
    label: "Isukapalli",
    state: "Andhra Pradesh",
    coords: [80.85, 16.1],
    color: "#719899",
  },
];

// States we actively serve (highlighted)
const SERVED_STATES = [
  "KARNATAKA",
  "TELANGANA",
  "ANDHRA PRADESH",
  "TAMIL NADU",
  "KERALA",
];

interface SouthIndiaMapProps {
  className?: string;
  showDetail?: boolean;
}

export function SouthIndiaMap({ className, showDetail = true }: SouthIndiaMapProps) {
  const [activeCity, setActiveCity] = useState<string | null>(null);

  const activeLocation = locations.find((l) => l.slug === activeCity);
  const activePin = cityPins.find((p) => p.slug === activeCity);

  // Build the projected map geometry once
  const { paths, pinPositions } = useMemo(() => {
    const topo = southIndiaTopo as unknown as {
      type: string;
      objects: { states: { type: string; geometries: unknown[] } };
      arcs: unknown[];
    };
    const states = feature(
      topo as never,
      topo.objects.states as never
    ) as unknown as {
      type: "FeatureCollection";
      features: Array<{
        type: "Feature";
        properties: { STNAME: string };
        geometry: { type: string; coordinates: unknown };
      }>;
    };

    // Projection fitted to the South India region
    const projection = geoMercator()
      .center([78.5, 15.5])
      .scale(2200)
      .translate([250, 250]);

    const pathGen = geoPath(projection);

    const paths = states.features.map((f) => ({
      name: f.properties.STNAME,
      d: pathGen(f as never) || "",
      served: SERVED_STATES.includes(f.properties.STNAME),
    }));

    const pinPositions = cityPins.map((pin) => {
      const [x, y] = projection(pin.coords as [number, number]) || [0, 0];
      return { ...pin, x, y };
    });

    return { paths, pinPositions };
  }, []);

  return (
    <div className={cn("relative", className)}>
      <div className="relative mx-auto w-full max-w-xl">
        <svg
          viewBox="0 0 500 500"
          className="h-auto w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Transparent fills for clear border visibility */}
            <linearGradient id="served-grad" x1="0" y1="0" x2="500" y2="500">
              <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* Transparent fills for context states */}
            <linearGradient id="context-grad" x1="0" y1="0" x2="500" y2="500">
              <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* Glow filter for active pins */}
            <filter id="pin-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Soft shadow for states */}
            <filter id="state-shadow" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#332416" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* Background grid — barely-there blueprint texture */}
          <pattern id="map-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#332416" strokeWidth="0.3" strokeOpacity="0.02" />
          </pattern>
          <rect width="500" height="500" fill="url(#map-grid)" />

          {/* Ocean / water background — soft teal tint */}
          <rect
            x="0" y="0" width="500" height="500"
            fill="#719899"
            fillOpacity="0.03"
          />

          {/* ─── State polygons (real boundaries) ─── */}
          {paths.map((p, i) => (
            <motion.path
              key={p.name}
              d={p.d}
              fill="none"
              stroke="#332416"
              strokeWidth={p.served ? 1.5 : 1}
              strokeOpacity={p.served ? 0.6 : 0.4}
              filter="url(#state-shadow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            />
          ))}

          {/* ─── State labels ─── */}
          <g
            fill="#332416"
            fillOpacity="0.95"
            fontSize="8"
            fontWeight="700"
            fontFamily="var(--font-display), sans-serif"
            textAnchor="middle"
          >
            {paths.map((p) => {
              // Approximate label position from the path's bounding box
              const bbox = getPathBBox(p.d);
              if (!bbox) return null;
              return (
                <text
                  key={p.name}
                  x={bbox.cx}
                  y={bbox.cy}
                  className="pointer-events-none select-none"
                  dominant-baseline="middle"
                >
                  {formatStateName(p.name)}
                </text>
              );
            })}
          </g>

          {/* ─── Connecting lines between cities ─── */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            {pinPositions.map((pin, i) =>
              pinPositions.slice(i + 1).map((other) => (
                <line
                  key={`${pin.slug}-${other.slug}`}
                  x1={pin.x}
                  y1={pin.y}
                  x2={other.x}
                  y2={other.y}
                  stroke="#719899"
                  strokeWidth="0.6"
                  strokeDasharray="3 2"
                  opacity="0.35"
                />
              ))
            )}
          </motion.g>

          {/* ─── City pins ─── */}
          {pinPositions.map((pin, i) => {
            const isActive = activeCity === pin.slug;
            return (
              <g key={pin.slug}>
                {/* Pulse ring */}
                <motion.circle
                  cx={pin.x}
                  cy={pin.y}
                  r="6"
                  fill="none"
                  stroke={pin.color}
                  strokeWidth="1"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: [0.6, 0],
                    scale: [1, 2.5],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.6,
                    ease: "easeOut",
                  }}
                />

                {/* Outer glow (visible on hover/active) */}
                <motion.circle
                  cx={pin.x}
                  cy={pin.y}
                  r="8"
                  fill={pin.color}
                  fillOpacity={isActive ? 0.2 : 0}
                  initial={{ scale: 0 }}
                  animate={{ scale: isActive ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Pin dot */}
                <motion.circle
                  cx={pin.x}
                  cy={pin.y}
                  r="3.5"
                  fill="white"
                  stroke={pin.color}
                  strokeWidth="1.5"
                  className="cursor-pointer"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.15 }}
                  onClick={() => setActiveCity(isActive ? null : pin.slug)}
                  style={{ filter: isActive ? "url(#pin-glow)" : undefined }}
                />

                {/* City label */}
                <motion.text
                  x={pin.x}
                  y={pin.y - 8}
                  textAnchor="middle"
                  className="pointer-events-none select-none"
                  fill="#332416"
                  fontSize="8"
                  fontWeight="700"
                  fontFamily="var(--font-display), sans-serif"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 + i * 0.15 }}
                >
                  {pin.label}
                </motion.text>
              </g>
            );
          })}

          {/* ─── Compass rose ─── */}
          <g transform="translate(40, 40)" opacity="0.4">
            <circle cx="0" cy="0" r="10" fill="none" stroke="#332416" strokeWidth="0.8" />
            <text x="0" y="-13" textAnchor="middle" fontSize="6" fill="#332416" fontWeight="700">N</text>
            <line x1="0" y1="-8" x2="0" y2="8" stroke="#332416" strokeWidth="0.5" />
            <line x1="-8" y1="0" x2="8" y2="0" stroke="#332416" strokeWidth="0.5" />
          </g>

          {/* ─── Legend ─── */}
          <g transform="translate(330, 30)">
            <text fontSize="6" fill="#332416" fontWeight="700" fontFamily="var(--font-display), sans-serif" opacity="0.5">
              Service Area
            </text>
            <rect x="0" y="8" width="10" height="5" rx="1" fill="#719899" fillOpacity="0.35" stroke="#719899" strokeWidth="0.5" strokeOpacity="0.5" />
            <text x="14" y="12" fontSize="5" fill="#332416" opacity="0.4">
              South India Network
            </text>
          </g>
        </svg>
      </div>

      {/* ─── City detail card (shown when a pin is clicked) ─── */}
      {showDetail && (
        <AnimatePresence>
          {activeLocation && activePin && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-4 bottom-4 z-20 sm:inset-x-auto sm:bottom-6 sm:right-0 sm:left-auto sm:w-80"
            >
              <div className="overflow-hidden rounded-2xl border border-brown/10 bg-white shadow-lift">
                {/* Card header */}
                <div
                  className="relative p-4 text-white"
                  style={{
                    background: `linear-gradient(135deg, ${activePin.color}dd, ${activePin.color}99)`,
                  }}
                >
                  <div className="absolute inset-0 bg-dot-warm opacity-[0.06]" />
                  <div className="relative flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        <h3 className="font-display text-lg font-bold">
                          {activeLocation.city}
                        </h3>
                      </div>
                      <p className="mt-0.5 text-xs text-white/70">
                        {activeLocation.state}
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveCity(null)}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Stats row */}
                  <div className="mt-3 flex items-center gap-3 text-[11px] text-white/80">
                    <span className="inline-flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {activeLocation.technicians} techs
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      {activeLocation.rating}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {activeLocation.responseTime}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-4">
                  <p className="text-xs font-medium text-brown/60">
                    {activeLocation.tagline}
                  </p>

                  <div className="mt-3">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-brown/50">
                      Priority areas
                    </div>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {activeLocation.coverage.map((area) => (
                        <span
                          key={area}
                          className="rounded-full bg-brown/5 px-2 py-0.5 text-[10px] font-medium text-brown/65"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 rounded-lg bg-brown/3 p-2.5">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-brown/50">
                      Field office
                    </div>
                    <div className="mt-1 text-[11px] leading-snug text-brown/70">
                      {activeLocation.address.line1}
                      <br />
                      {activeLocation.address.landmark}
                    </div>
                    <a
                      href={`tel:${activeLocation.phoneHref}`}
                      className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-orange hover:underline"
                    >
                      <Phone className="h-3 w-3" />
                      {activeLocation.phone}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

/** Compute the center of an SVG path string for label placement */
function getPathBBox(d: string): { cx: number; cy: number } | null {
  // Parse all coordinate pairs from the path
  const nums = d.match(/-?\d+\.?\d*/g);
  if (!nums || nums.length < 2) return null;
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (let i = 0; i + 1 < nums.length; i += 2) {
    const x = parseFloat(nums[i]);
    const y = parseFloat(nums[i + 1]);
    if (isNaN(x) || isNaN(y)) continue;
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  if (minX === Infinity) return null;
  return { cx: (minX + maxX) / 2, cy: (minY + maxY) / 2 };
}

/** Format state names for display */
function formatStateName(name: string): string {
  const map: Record<string, string> = {
    "ANDHRA PRADESH": "ANDHRA PRADESH",
    TELANGANA: "TELANGANA",
    KARNATAKA: "KARNATAKA",
    "TAMIL NADU": "TAMIL NADU",
    KERALA: "KERALA",
    GOA: "GOA",
    MAHARASHTRA: "MAHARASHTRA",
    ODISHA: "ODISHA",
    CHHATTISGARH: "CHHATTISGARH",
    PUDUCHERRY: "PUDUCHERRY",
  };
  return map[name] || name;
}