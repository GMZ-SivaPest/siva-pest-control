"use client";

/**
 * WaveDivider — organic SVG wave separator between sections.
 *
 * Per playbook #11: "Curved sections, blob masks, wave separators,
 * circular crops, leaf-like curves. Avoid making every section wavy —
 * use them selectively."
 *
 * Usage: drop between two sections for visual rhythm.
 * The `flip` prop mirrors the wave so two adjacent dividers look symmetrical.
 *
 * Color convention: set `bg` to match the UPPER section's background so the
 * wave appears to "roll down" into the lower section.
 */
interface WaveDividerProps {
  bg?: string; // background color of the UPPER section (defaults to ivory)
  flip?: boolean;
  className?: string;
}

export function WaveDivider({
  bg = "var(--color-ivory, #FBF6EE)",
  flip = false,
  className = "",
}: WaveDividerProps) {
  return (
    <div
      className={`pointer-events-none relative -mt-px h-12 w-full overflow-hidden md:h-16 ${className}`}
      style={{ background: bg }}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 80"
        className="absolute bottom-0 left-0 h-full w-full"
        preserveAspectRatio="none"
        style={{ transform: flip ? "scaleY(-1)" : undefined }}
      >
        <path
          d="M0,32 C240,72 480,8 720,32 C960,56 1200,16 1440,40 L1440,80 L0,80 Z"
          fill="var(--color-ivory-deep, #F0E6D2)"
          opacity="0.5"
        />
        <path
          d="M0,48 C240,16 480,64 720,40 C960,16 1200,56 1440,32 L1440,80 L0,80 Z"
          fill="var(--color-ivory-deep, #F0E6D2)"
        />
      </svg>
    </div>
  );
}
