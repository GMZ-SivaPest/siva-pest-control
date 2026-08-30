"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Star, Clock, X, Users, Network, Radio } from "lucide-react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import { geoMercator, geoCentroid } from "d3-geo";
import { locations } from "@/data/locations";
import { cn } from "@/lib/utils";

/**
 * SouthIndiaMap — Premium geographic map of South India.
 * Uses react-simple-maps with a real India GeoJSON, projected to the
 * South Indian bounding box. Each South Indian state is colour-coded
 * with a distinct fill, labelled in-canvas, and the operational network
 * is rendered as a fully connected mesh radiating from HQ (Hyderabad).
 */

const BRAND = "#B85C04";
const BRAND_DEEP = "#7A3A02";

// Reliable India States GeoJSON
const GEO_URL = "https://raw.githubusercontent.com/geohacker/india/master/state/india_telengana.geojson";

// Bounding box for South India (deg)
const SOUTH_BBOX = {
  west: 74.0,
  south: 7.5,
  east: 85.0,
  north: 18.5,
};

// Internal SVG canvas. Landscape aspect (16:9) so the card fits within
// a typical device viewport without requiring the user to scroll.
const MAP_W = 1000;
const MAP_H = 560;

// Initialize projection
const projection = geoMercator().fitExtent(
  [
    [30, 30],
    [MAP_W - 30, MAP_H - 30],
  ],
  {
    type: "Polygon",
    coordinates: [
      [
        [SOUTH_BBOX.west, SOUTH_BBOX.north],
        [SOUTH_BBOX.east, SOUTH_BBOX.north],
        [SOUTH_BBOX.east, SOUTH_BBOX.south],
        [SOUTH_BBOX.west, SOUTH_BBOX.south],
        [SOUTH_BBOX.west, SOUTH_BBOX.north],
      ],
    ],
  }
);

// South Indian states — each gets its own subtle fill so a viewer can
// instantly tell which region a city sits in.
const STATE_STYLES: Record<
  string,
  { fill: string; ring: string; soft: string; label: string }
> = {
  Telangana: {
    fill: "#FDE7CC",
    ring: BRAND,
    soft: "#F8C98A",
    label: "TELANGANA",
  },
  "Andhra Pradesh": {
    fill: "#E8F1FB",
    ring: "#3A6FB0",
    soft: "#B6D2EE",
    label: "ANDHRA PRADESH",
  },
  "Tamil Nadu": {
    fill: "#E6F4EC",
    ring: "#2F8C5A",
    soft: "#A8D6BC",
    label: "TAMIL NADU",
  },
  Karnataka: {
    fill: "#FBEAEA",
    ring: "#B43A3A",
    soft: "#E6B5B5",
    label: "KARNATAKA",
  },
  Kerala: {
    fill: "#EEF7E6",
    ring: "#5C8A2A",
    soft: "#BFD9A1",
    label: "KERALA",
  },
  Puducherry: {
    fill: "#F1ECF8",
    ring: "#6A4FA0",
    soft: "#C4B6DD",
    label: "PUDUCHERRY",
  },
};

const SOUTH_INDIA_STATES = Object.keys(STATE_STYLES);

// City Data (Exact lat/lng mapped from locations.ts)
const CITIES = [
  { slug: "hyderabad", label: "Hyderabad", state: "Telangana", isHQ: true, coordinates: [78.4867, 17.385] as [number, number] },
  { slug: "isukapalli", label: "Isukapalli", state: "Andhra Pradesh", coordinates: [80.85, 16.1] as [number, number] },
  { slug: "chennai", label: "Chennai", state: "Tamil Nadu", coordinates: [80.2707, 13.0827] as [number, number] },
  { slug: "bangalore", label: "Bangalore", state: "Karnataka", coordinates: [77.5946, 12.9716] as [number, number] },
];

export function SouthIndiaMap({ className, showDetail = true }: { className?: string; showDetail?: boolean }) {
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const activeLocation = locations.find((l) => l.slug === activeCity);
  const activeState = activeLocation?.state ?? hoveredState;

  // Pre-compute city projected coordinates (stable across renders)
  const projectedCities = useMemo(
    () =>
      CITIES.map((c) => {
        const [x, y] = projection(c.coordinates)!;
        return { ...c, x, y };
      }),
    []
  );

  // Network mesh — every active city connected to HQ + inter-city ring.
  const links = useMemo(() => {
    const out: { from: typeof projectedCities[number]; to: typeof projectedCities[number]; key: string }[] = [];
    const hq = projectedCities[0];
    for (let i = 1; i < projectedCities.length; i++) {
      out.push({ from: hq, to: projectedCities[i], key: `hq-${projectedCities[i].slug}` });
    }
    // Inter-city ring for visual mesh (Chennai <-> Bangalore etc.)
    for (let i = 1; i < projectedCities.length; i++) {
      for (let j = i + 1; j < projectedCities.length; j++) {
        out.push({
          from: projectedCities[i],
          to: projectedCities[j],
          key: `${projectedCities[i].slug}-${projectedCities[j].slug}`,
        });
      }
    }
    return out;
  }, [projectedCities]);

  return (
    <div className={cn("relative", className)}>
      <div className="relative mx-auto w-full">
        {/* Height cap — fits any device viewport without scrolling */}
        <div className="relative max-h-[70vh] overflow-hidden rounded-2xl border border-brown/10 bg-white/70 shadow-premium">
          <div className="relative w-full" style={{ aspectRatio: `${MAP_W} / ${MAP_H}` }}>
            <ComposableMap
              projection={projection}
              width={MAP_W}
              height={MAP_H}
              style={{ width: "100%", height: "100%" }}
            >
              <defs>
                {/* Aceternity-style Dotted Pattern */}
                <pattern id="southIndiaDots" width="10" height="10" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill={BRAND} fillOpacity="0.35" />
                </pattern>

                {/* Subtle Background Dots */}
                <pattern id="bgDots" width="14" height="14" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#332416" fillOpacity="0.05" />
                </pattern>

                {/* Per-state soft fill pattern */}
                {Object.entries(STATE_STYLES).map(([state, s]) => (
                  <pattern
                    key={`p-${state}`}
                    id={`p-${state.replace(/\s+/g, "_")}`}
                    width="8"
                    height="8"
                    patternUnits="userSpaceOnUse"
                  >
                    <rect width="8" height="8" fill={s.fill} />
                    <circle cx="2" cy="2" r="1" fill={s.ring} fillOpacity="0.18" />
                  </pattern>
                ))}

                {/* Active state glow */}
                <filter id="stateGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background Grid */}
              <rect width={MAP_W} height={MAP_H} fill="url(#bgDots)" />

              {/* ───── State Polygons (colour-coded, hover-aware) ───── */}
              <Geographies geography={GEO_URL}>
                {({ geographies }) => {
                  const present: { name: string; geo: (typeof geographies)[number] }[] = [];
                  geographies.forEach((geo) => {
                    const stateName = geo.properties.STNAME || geo.properties.NAME_1 || geo.properties.name;
                    if (SOUTH_INDIA_STATES.some((s) => s.toLowerCase() === stateName?.toLowerCase())) {
                      present.push({ name: stateName!, geo });
                    }
                  });

                  return (
                    <>
                      {present.map(({ name, geo }) => {
                        const style = STATE_STYLES[name];
                        const isActive = activeState?.toLowerCase() === name.toLowerCase();
                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={`url(#p-${name.replace(/\s+/g, "_")})`}
                            stroke={style.ring}
                            strokeOpacity={isActive ? 0.95 : 0.6}
                            strokeWidth={isActive ? 2 : 1.1}
                            style={{
                              default: { outline: "none", transition: "all 0.3s ease" },
                              hover: { outline: "none", cursor: "pointer" },
                              pressed: { outline: "none" },
                            }}
                            onMouseEnter={() => setHoveredState(name)}
                            onMouseLeave={() => setHoveredState(null)}
                            filter={isActive ? "url(#stateGlow)" : undefined}
                          />
                        );
                      })}

                      {/* ───── State Name Labels (centroid) ───── */}
                      {present.map(({ name, geo }) => {
                        const centroid = geoCentroid(geo);
                        const [lx, ly] = projection(centroid)!;
                        const style = STATE_STYLES[name];
                        if (lx == null || ly == null) return null;
                        return (
                          <g key={`label-${geo.rsmKey}`} pointerEvents="none">
                            <text
                              x={lx}
                              y={ly}
                              textAnchor="middle"
                              fontSize={13}
                              fontWeight={800}
                              fill={style.ring}
                              fillOpacity={0.55}
                              fontFamily="var(--font-display), sans-serif"
                              letterSpacing="2"
                            >
                              {style.label}
                            </text>
                          </g>
                        );
                      })}
                    </>
                  );
                }}
              </Geographies>

              {/* ───── Service Network Mesh (HQ + inter-city ring) ───── */}
              {links.map((link) => {
                const midX = (link.from.x + link.to.x) / 2;
                const midY = (link.from.y + link.to.y) / 2 - 24; // gentle arc
                const pathD = `M ${link.from.x} ${link.from.y} Q ${midX} ${midY} ${link.to.x} ${link.to.y}`;
                const isHQLink = link.from.slug === "hyderabad" || link.to.slug === "hyderabad";
                return (
                  <g key={link.key}>
                    {/* Soft glow underlay */}
                    <motion.path
                      d={pathD}
                      fill="none"
                      stroke={BRAND}
                      strokeWidth={isHQLink ? 4 : 2.5}
                      strokeOpacity={0.08}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.6, ease: "easeInOut" }}
                    />
                    {/* Dashed animated line */}
                    <motion.path
                      d={pathD}
                      fill="none"
                      stroke={isHQLink ? BRAND : "#6E8AB0"}
                      strokeWidth={isHQLink ? 1.8 : 1.2}
                      strokeDasharray="5 5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: isHQLink ? 0.85 : 0.55 }}
                      transition={{ duration: 1.6, ease: "easeInOut", delay: 0.4 }}
                    />
                    {/* Travelling packet */}
                    <circle r={isHQLink ? 3.2 : 2.4} fill={isHQLink ? BRAND : "#3A6FB0"}>
                      <animateMotion
                        dur={isHQLink ? "3.2s" : "5s"}
                        repeatCount="indefinite"
                        path={pathD}
                        begin={`${(link.from.x + link.to.x) % 3}s`}
                      />
                    </circle>
                  </g>
                );
              })}

              {/* ───── City Markers ───── */}
              {projectedCities.map((city) => {
                const isActive = activeCity === city.slug;
                const stateStyle = STATE_STYLES[city.state];
                return (
                  <g
                    key={city.slug}
                    transform={`translate(${city.x}, ${city.y})`}
                    style={{ cursor: "pointer" }}
                    onClick={() => setActiveCity(isActive ? null : city.slug)}
                    onMouseEnter={() => setHoveredState(city.state)}
                    onMouseLeave={() => setHoveredState(null)}
                  >
                    {/* Pulsing Outer Ring */}
                    <motion.circle
                      r={6}
                      fill={city.isHQ ? BRAND : stateStyle.ring}
                      fillOpacity={0.35}
                      animate={{ r: [6, 16], opacity: [0.4, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    />
                    {/* Mid ring (HQ) */}
                    {city.isHQ && (
                      <circle r={10} fill="none" stroke={BRAND} strokeWidth="1" strokeOpacity="0.5" />
                    )}
                    {/* Solid Pin Core */}
                    <circle
                      r={isActive ? 7 : city.isHQ ? 6 : 5}
                      fill={city.isHQ ? BRAND : "#fff"}
                      stroke={city.isHQ ? "#fff" : stateStyle.ring}
                      strokeWidth={city.isHQ ? 3 : 2.5}
                    />
                    {/* HQ star */}
                    {city.isHQ && (
                      <text
                        x={0}
                        y={3}
                        textAnchor="middle"
                        fontSize={7}
                        fontWeight={900}
                        fill="#fff"
                        pointerEvents="none"
                      >
                        ★
                      </text>
                    )}

                    {/* City Label pill */}
                    <g transform="translate(12, -10)">
                      <rect
                        x={-2}
                        y={-12}
                        rx={5}
                        ry={5}
                        width={Math.max(city.label.length * 7 + 8, 56)}
                        height={28}
                        fill="#fff"
                        fillOpacity={0.95}
                        stroke={stateStyle.ring}
                        strokeOpacity={0.35}
                        strokeWidth={0.8}
                      />
                      <text
                        x={4}
                        y={-1}
                        fontSize={11.5}
                        fontWeight={800}
                        fill={BRAND_DEEP}
                        fontFamily="var(--font-display), sans-serif"
                        pointerEvents="none"
                      >
                        {city.label}
                      </text>
                      <text
                        x={4}
                        y={11}
                        fontSize={8}
                        fontWeight={700}
                        fill={stateStyle.ring}
                        fontFamily="var(--font-inter), sans-serif"
                        letterSpacing="1"
                        pointerEvents="none"
                      >
                        {city.state.toUpperCase()}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Compass (top-right) */}
              <g transform={`translate(${MAP_W - 70}, 50)`} pointerEvents="none">
                <circle r={22} fill="#fff" fillOpacity="0.9" stroke={BRAND} strokeOpacity="0.4" strokeWidth="0.8" />
                <text textAnchor="middle" y={-10} fontSize={7} fontWeight={700} fill={BRAND_DEEP}>N</text>
                <line x1={0} y1={-6} x2={0} y2={8} stroke={BRAND} strokeWidth="1.2" />
                <polygon points="0,-9 -3,-3 3,-3" fill={BRAND} />
                <text textAnchor="middle" y={18} fontSize={6} fill={BRAND_DEEP} fontWeight={700} letterSpacing="1">COMPASS</text>
              </g>

              {/* Scale bar (bottom-left of canvas) */}
              <g transform={`translate(40, ${MAP_H - 30})`} pointerEvents="none">
                <line x1={0} y1={0} x2={80} y2={0} stroke={BRAND_DEEP} strokeWidth="1.5" />
                <line x1={0} y1={-3} x2={0} y2={3} stroke={BRAND_DEEP} strokeWidth="1.5" />
                <line x1={40} y1={-2} x2={40} y2={2} stroke={BRAND_DEEP} strokeWidth="1" />
                <line x1={80} y1={-3} x2={80} y2={3} stroke={BRAND_DEEP} strokeWidth="1.5" />
                <text x={0} y={-7} fontSize={8} fill={BRAND_DEEP} fontWeight={700}>0</text>
                <text x={40} y={-7} fontSize={8} fill={BRAND_DEEP} fontWeight={700} textAnchor="middle">~150</text>
                <text x={80} y={-7} fontSize={8} fill={BRAND_DEEP} fontWeight={700} textAnchor="middle">~300 km</text>
              </g>
            </ComposableMap>
          </div>
          {/* ───── Floating Header (over the map, top-left) ───── */}
          <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-brown/80 shadow-sm ring-1 ring-brown/10 backdrop-blur sm:left-4 sm:top-4">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange" />
            </span>
            Live · 4 states · {CITIES.length} hubs
          </div>

          {/* ───── Floating HQ chip (top-right) ───── */}
          <div className="pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-brown/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-md backdrop-blur sm:right-4 sm:top-4">
            <Network className="h-3 w-3" />
            HQ · Hyderabad
          </div>

          {/* ───── State Legend (bottom floating) ───── */}
          <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 rounded-2xl bg-white/90 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-brown/75 shadow-md ring-1 ring-brown/10 backdrop-blur sm:bottom-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2">
            {Object.entries(STATE_STYLES).map(([state, s]) => {
              const isActive = activeState?.toLowerCase() === state.toLowerCase();
              const isFaded = activeState && !isActive;
              return (
                <span
                  key={state}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-1.5 py-0.5 transition-all",
                    isActive && "bg-brown/10 ring-1 ring-brown/20"
                  )}
                  style={{ opacity: isFaded ? 0.35 : 1 }}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full ring-1 ring-black/10"
                    style={{ background: s.ring }}
                  />
                  {s.label}
                </span>
              );
            })}
          </div>
        </div>

        {/* ───── State / City quick-glance strip below the map ───── */}
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {CITIES.map((city) => {
            const isActive = activeCity === city.slug;
            const stateStyle = STATE_STYLES[city.state];
            return (
              <button
                key={city.slug}
                type="button"
                onClick={() => setActiveCity(isActive ? null : city.slug)}
                onMouseEnter={() => setHoveredState(city.state)}
                onMouseLeave={() => setHoveredState(null)}
                className={cn(
                  "group relative flex items-center gap-2.5 rounded-xl border bg-white px-3 py-2.5 text-left transition-all",
                  isActive
                    ? "border-orange/40 shadow-lift ring-2 ring-orange/20"
                    : "border-brown/10 hover:border-brown/25 hover:shadow-premium"
                )}
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    background: stateStyle.fill,
                    border: `1.5px solid ${stateStyle.ring}`,
                  }}
                >
                  <MapPin className="h-3.5 w-3.5" style={{ color: stateStyle.ring }} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5">
                    <span className="truncate text-[12px] font-bold text-brown">
                      {city.label}
                    </span>
                    {city.isHQ && (
                      <span className="rounded-full bg-orange px-1.5 py-0.5 text-[8px] font-extrabold uppercase tracking-wider text-white">
                        HQ
                      </span>
                    )}
                  </span>
                  <span className="block truncate text-[10px] font-medium text-brown/55">
                    {stateStyle.label}
                  </span>
                </span>
                <Radio
                  className={cn(
                    "h-3.5 w-3.5 shrink-0 transition-opacity",
                    isActive ? "opacity-100 text-orange" : "opacity-30 text-brown"
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── City detail card (shown when a pin is clicked) ─── */}
      {showDetail && (
        <AnimatePresence>
          {activeLocation && (
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
                    background: `linear-gradient(135deg, ${BRAND}dd, #D7700599)`,
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