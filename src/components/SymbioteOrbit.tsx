import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function SymbioteOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Continuous slow rotation for each ring
      gsap.to(".orbit-ring-1", {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });
      gsap.to(".orbit-ring-2", {
        rotation: -360,
        duration: 60,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });
      gsap.to(".orbit-ring-3", {
        rotation: 360,
        duration: 90,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });

      // Pulsing core
      gsap.to(".orbit-core", {
        scale: 1.25,
        opacity: 0.85,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "50% 50%",
      });

      // Breathing glow
      gsap.to(".orbit-glow", {
        scale: 1.15,
        opacity: 0.5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "50% 50%",
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative aspect-square w-full overflow-hidden rounded-3xl border border-foreground/10 bg-gradient-to-br from-foreground/[0.04] to-transparent"
    >
      {/* Subtle grid bg */}
      <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(oklch(1_0_0)_1px,transparent_1px)] [background-size:18px_18px]" />

      {/* Orbit svg */}
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        {/* Glow halo */}
        <circle
          className="orbit-glow"
          cx="200"
          cy="200"
          r="40"
          fill="oklch(1 0 0 / 0.18)"
          style={{ filter: "blur(20px)" }}
        />

        {/* Rings */}
        <g className="orbit-ring-3">
          <circle
            cx="200"
            cy="200"
            r="170"
            stroke="oklch(1 0 0 / 0.12)"
            strokeWidth="1"
            strokeDasharray="2 6"
          />
        </g>
        <g className="orbit-ring-2">
          <circle
            cx="200"
            cy="200"
            r="115"
            stroke="oklch(1 0 0 / 0.18)"
            strokeWidth="1"
          />
          <circle cx="315" cy="200" r="2.5" fill="oklch(1 0 0 / 0.5)" />
        </g>
        <g className="orbit-ring-1">
          <circle
            cx="200"
            cy="200"
            r="65"
            stroke="oklch(1 0 0 / 0.25)"
            strokeWidth="1"
          />
          <circle cx="265" cy="200" r="3" fill="oklch(1 0 0 / 0.8)" />
        </g>

        {/* Core */}
        <circle
          className="orbit-core"
          cx="200"
          cy="200"
          r="6"
          fill="oklch(1 0 0)"
        />
      </svg>

      {/* Labels */}
      <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.3em] text-foreground/50">
        <span>Klyntar</span>
        <span>Symbiote Class-0</span>
      </div>
    </div>
  );
}
