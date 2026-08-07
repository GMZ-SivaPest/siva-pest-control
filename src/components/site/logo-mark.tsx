"use client";

import { cn } from "@/lib/utils";

interface LogoMarkProps {
  className?: string;
  size?: number;
  withWordmark?: boolean;
  variant?: "default" | "light";
}

/**
 * LogoMark — the Siva Pest Control brand seal.
 * A circular badge with a shield core, inspired by the original logo
 * but modernised: warm sand ring, orange inner ring, deep brown shield,
 * a subtle "no-pest" slash, and four corner stars.
 */
export function LogoMark({
  className,
  size = 44,
  withWordmark = true,
  variant = "default",
}: LogoMarkProps) {
  const textColor = variant === "light" ? "#FFFFFF" : "#332416";
  const subColor = variant === "light" ? "rgba(255,255,255,0.7)" : "rgba(51,36,22,0.6)";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id="logo-outer" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E8D2B5" />
            <stop offset="1" stopColor="#D8AE7F" />
          </linearGradient>
          <linearGradient id="logo-orange" x1="32" y1="6" x2="32" y2="58" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E88521" />
            <stop offset="1" stopColor="#B85C04" />
          </linearGradient>
          <linearGradient id="logo-shield" x1="32" y1="16" x2="32" y2="50" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4A3624" />
            <stop offset="1" stopColor="#221610" />
          </linearGradient>
        </defs>

        {/* Outer sand ring */}
        <circle cx="32" cy="32" r="30" fill="url(#logo-outer)" />
        <circle cx="32" cy="32" r="30" fill="none" stroke="#332416" strokeOpacity="0.12" strokeWidth="0.6" />

        {/* Orange inner ring */}
        <circle cx="32" cy="32" r="25" fill="none" stroke="url(#logo-orange)" strokeWidth="2.5" />

        {/* Teal hairline */}
        <circle cx="32" cy="32" r="22" fill="none" stroke="#719899" strokeOpacity="0.5" strokeWidth="0.8" />

        {/* Central shield */}
        <path
          d="M32 14 L46 19 V32 C46 41 39 47 32 50 C25 47 18 41 18 32 V19 Z"
          fill="url(#logo-shield)"
        />
        <path
          d="M32 14 L46 19 V32 C46 41 39 47 32 50 C25 47 18 41 18 32 V19 Z"
          fill="none"
          stroke="#D77005"
          strokeWidth="0.6"
          strokeOpacity="0.4"
        />

        {/* Stylised "S" inside shield */}
        <path
          d="M34 22 C30 22 28 24 28 27 C28 30 31 30.5 34 31.5 C37 32.5 38 34 38 36.5 C38 39.5 35 41 32 41"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Red slash - "no pests" */}
        <path
          d="M14 50 L50 14"
          stroke="#99341F"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Four corner stars */}
        {[
          { x: 32, y: 9 },
          { x: 55, y: 32 },
          { x: 32, y: 55 },
          { x: 9, y: 32 },
        ].map((star, i) => (
          <g key={i} transform={`translate(${star.x} ${star.y})`}>
            <path
              d="M0 -2.2 L0.65 -0.65 L2.2 0 L0.65 0.65 L0 2.2 L-0.65 0.65 L-2.2 0 L-0.65 -0.65 Z"
              fill="#719899"
              opacity="0.85"
            />
          </g>
        ))}
      </svg>

      {withWordmark && (
        <div className="flex flex-col leading-tight">
          <span
            className="font-display text-[15px] font-bold tracking-tight"
            style={{ color: textColor }}
          >
            SIVA PEST CONTROL
          </span>
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: subColor }}
          >
            Protection · Science · Trust
          </span>
        </div>
      )}
    </div>
  );
}
