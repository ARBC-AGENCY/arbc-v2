"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { gsap } from "@/lib/gsap";

const RADIUS = 450;
const LERP = 0.05;

// RGB channel strings for each theme — used inside rgba() stops
const DARK_RGB = "25, 25, 25";
const LIGHT_RGB = "204, 204, 204";

const buildGradient = (x: number, y: number, rgb: string) =>
  `radial-gradient(
    circle ${RADIUS}px at ${x}px ${y}px,
    rgba(${rgb}, 0.05) 0%,
    rgba(${rgb}, 0.25) 20%,
    rgba(${rgb}, 0.55) 40%,
    rgba(${rgb}, 0.82) 60%,
    rgba(${rgb}, 1)    100%
  )`;

export default function BackgroundSpotlight() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  // Keep current rgb in a ref so the rAF loop always reads the latest theme
  const rgbRef = useRef(DARK_RGB);

  useEffect(() => setMounted(true), []);

  // Sync rgbRef whenever theme changes
  useEffect(() => {
    rgbRef.current =
      !mounted || resolvedTheme === "dark" ? DARK_RGB : LIGHT_RGB;
  }, [mounted, resolvedTheme]);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { x: target.x, y: target.y };

    // Draw the initial gradient centered on screen
    overlay.style.background = buildGradient(
      current.x,
      current.y,
      rgbRef.current,
    );

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const tick = () => {
      current.x += (target.x - current.x) * LERP;
      current.y += (target.y - current.y) * LERP;
      overlay.style.background = buildGradient(
        current.x,
        current.y,
        rgbRef.current,
      );
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      gsap.ticker.remove(tick);
    };
  }, []);

  const isDark = !mounted || resolvedTheme === "dark";
  const bgImage = isDark
    ? "/images/Background-dark.webp"
    : "/images/Background-white.webp";

  return (
    <>
      {/* Background pattern image */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -2,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Gradient overlay — spotlight punched through via background, not mask */}
      <div
        ref={overlayRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: -1 }}
      />
    </>
  );
}
