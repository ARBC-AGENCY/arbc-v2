"use client";

import { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { gsap } from "@/lib/gsap";

interface Props {
  sections: string[];
  activeIndex: number;
  onSelect?: (index: number) => void;
}

/**
 * Fixed bottom-center pill nav for project detail pages.
 * Displays one label per section; the active item is tracked by a
 * GSAP-animated sliding indicator (same iOS-style pattern as Nav.tsx).
 * The parent controls `activeIndex` by watching scroll position.
 */
export default function ProjectSectionNav({ sections, activeIndex, onSelect }: Props) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const pillRef      = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const itemRefs     = useRef<(HTMLSpanElement | null)[]>([]);

  // Entrance: slide up from below on mount
  useEffect(() => {
    if (!pillRef.current) return;
    gsap.fromTo(
      pillRef.current,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: "expo.out", delay: 0.4 }
    );
  }, []);

  // Slide indicator to the active item on activeIndex change
  useEffect(() => {
    const activeEl  = itemRefs.current[activeIndex];
    const indicator = indicatorRef.current;
    if (!activeEl || !indicator) return;

    gsap.to(indicator, {
      x: activeEl.offsetLeft,
      width: activeEl.offsetWidth,
      duration: 0.55,
      ease: "expo.out",
    });
  }, [activeIndex]);

  // Set indicator position immediately after first render (no animation)
  useEffect(() => {
    const activeEl  = itemRefs.current[activeIndex];
    const indicator = indicatorRef.current;
    if (!activeEl || !indicator) return;
    gsap.set(indicator, {
      x: activeEl.offsetLeft,
      width: activeEl.offsetWidth,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isDark      = mounted ? resolvedTheme === "dark" : true;
  const pillBg      = isDark ? "rgba(25, 25, 25, 0.80)"  : "rgba(204, 204, 204, 0.80)";
  const pillBorder  = isDark ? "rgba(255,255,255,0.10)"  : "rgba(0,0,0,0.12)";
  const activeC     = isDark ? "#ffffff"                  : "#1a1a1a";
  const inactiveC   = isDark ? "rgba(255,255,255,0.40)"  : "rgba(0,0,0,0.38)";
  const indicatorBg = isDark ? "#e7501e"  : "#e7501e";

  return (
    <nav
      style={{
        position: "fixed",
        bottom: "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 2000,
        pointerEvents: "none",
      }}
    >
      <div
        ref={pillRef}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: "0.1rem",
          padding: "0.5rem 0.6rem",
          backgroundColor: pillBg,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: `1px solid ${pillBorder}`,
          borderRadius: "9999px",
          boxShadow: "0 4px 32px rgba(0,0,0,0.18)",
          pointerEvents: "auto",
          opacity: 0,
        }}
      >
        {/* Sliding active indicator */}
        <div
          ref={indicatorRef}
          style={{
            position: "absolute",
            top: "0.4rem",
            bottom: "0.4rem",
            left: 0,
            borderRadius: "9999px",
            backgroundColor: indicatorBg,
            pointerEvents: "none",
            willChange: "transform, width",
          }}
        />

        {sections.map((label, i) => {
          const isActive = i === activeIndex;
          return (
            <span
              key={i}
              ref={(el) => { itemRefs.current[i] = el; }}
              onClick={() => onSelect?.(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && onSelect?.(i)}
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                alignItems: "center",
                padding: "0.45rem 1rem",
                borderRadius: "9999px",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                fontSize: "0.68rem",
                fontWeight: isActive ? 700 : 500,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: isActive ? activeC : inactiveC,
                transition: "color 0.25s ease",
                whiteSpace: "nowrap",
                userSelect: "none",
              }}
            >
              {label}
            </span>
          );
        })}
      </div>
    </nav>
  );
}
