"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { useTransitionContext } from "@/context/TransitionContext";
import { PORTFOLIO_ITEMS } from "@/data/portfolio";

// Each item links to its own portfolio inner page, not the projects page
const ITEMS = PORTFOLIO_ITEMS.map((p) => ({
  ...p,
  href: `/portfolio/${p.slug}` as string | null,
}));

// Alternating heights for visual rhythm — adjust WHEEL_SPEED / DRAG_SPEED below to tune scrolling
const ITEM_H = ["72vh", "58vh", "72vh", "58vh", "72vh", "58vh", "72vh"];

// ── Scroll speed knobs ────────────────────────────────────────────────────────
// Increase a value → faster scroll, decrease → slower / heavier
const WHEEL_SPEED = 0.1; // applied to wheel deltaY/X
const DRAG_SPEED = 0.25; // applied to pointer drag delta
// ─────────────────────────────────────────────────────────────────────────────

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function PortfolioGallery() {
  const t = useTranslations("Portfolio");
  const { resolvedTheme } = useTheme();
  const { navigate } = useTransitionContext();
  const isDark = resolvedTheme === "dark";

  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [hovered, setHovered] = useState<number | null>(null);

  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const scroll = useRef({
    x: 0,
    vx: 0,
    dragging: false,
    lastX: 0,
    didDrag: false,
  });

  useEffect(() => {
    setMounted(true);
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Desktop: custom inertia scroll ──────────────────────────────────────────
  useEffect(() => {
    if (!mounted || !isDesktop) return;

    scroll.current = { x: 0, vx: 0, dragging: false, lastX: 0, didDrag: false };
    if (trackRef.current) gsap.set(trackRef.current, { x: 0 });

    const maxScroll = () =>
      trackRef.current
        ? Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 80)
        : 0;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const d = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      scroll.current.vx -= d * WHEEL_SPEED;
    };
    const onDown = (e: PointerEvent) => {
      if (!e.isPrimary) return;
      scroll.current.dragging = true;
      scroll.current.didDrag = false;
      scroll.current.lastX = e.clientX;
      scroll.current.vx = 0;
    };
    const onMove = (e: PointerEvent) => {
      if (!scroll.current.dragging || !e.isPrimary) return;
      const dx = e.clientX - scroll.current.lastX;
      scroll.current.vx += dx * DRAG_SPEED;
      scroll.current.lastX = e.clientX;
      if (Math.abs(dx) > 3) scroll.current.didDrag = true;
    };
    const onUp = () => {
      scroll.current.dragging = false;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    const tick = () => {
      const s = scroll.current;
      const max = maxScroll();

      s.x += s.vx;
      s.vx *= 0.9;

      if (s.x > 0) {
        s.x += (0 - s.x) * 0.18;
        s.vx *= 0.75;
      }
      if (s.x < -max) {
        s.x += (-max - s.x) * 0.18;
        s.vx *= 0.75;
      }
      if (Math.abs(s.vx) < 0.05) s.vx = 0;

      if (trackRef.current) gsap.set(trackRef.current, { x: s.x });

      if (progressRef.current && max > 0) {
        const pct = Math.min(1, Math.max(0, -s.x / max));
        progressRef.current.style.transform = `scaleX(${pct})`;
      }
    };
    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      gsap.ticker.remove(tick);
    };
  }, [mounted, isDesktop]);

  const handleClick = useCallback(
    (item: (typeof ITEMS)[number]) => {
      if (scroll.current.didDrag || !item.href) return;
      navigate(item.href, item.name);
    },
    [navigate],
  );

  if (!mounted) return null;

  const nameColor = isDark ? "#ffffff" : "#1a1a1a";
  const barBg = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)";
  const ctrlBg = isDark ? "rgba(20,20,20,0.7)" : "rgba(230,230,230,0.75)";
  const ctrlText = isDark ? "#ffffff" : "#1a1a1a";

  const TagRow = ({ tags, light }: { tags: string[]; light?: boolean }) => (
    <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap" }}>
      {tags.map((tag) => (
        <span
          key={tag}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.62rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "0.16rem 0.5rem",
            borderRadius: 20,
            backgroundColor: light
              ? "rgba(231,80,30,0.18)"
              : "rgba(231,80,30,0.12)",
            color: "#e7501e",
            border: "1px solid rgba(231,80,30,0.35)",
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100svh",
        overflow: "hidden",
      }}
      className="once-in"
    >
      {/* ── Desktop slider ────────────────────────────────────────────────────── */}
      {isDesktop && (
        <div
          ref={trackRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            display: "flex",
            alignItems: "center",
            gap: "2vw",
            padding: "0 6vw",
            cursor: "grab",
            willChange: "transform",
          }}
        >
          {ITEMS.map((item, i) => (
            <div
              key={item.slug}
              style={{
                position: "relative",
                flexShrink: 0,
                width: "30vw",
                height: ITEM_H[i],
                overflow: "hidden",
                cursor: item.href ? "pointer" : "default",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleClick(item)}
            >
              {/* Full StaticImageData passed — Next.js generates a correct srcset */}
              <Image
                src={item.image}
                alt={item.name}
                fill
                style={{ objectFit: "cover" }}
                draggable={false}
              />

              {/* Gradient overlay — reveals on hover, dark at bottom for readability */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.38) 38%, transparent 65%)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "1.2rem",
                  opacity: hovered === i ? 1 : 0,
                  transition: "opacity 0.28s ease",
                  pointerEvents: "none",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-title)",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "#fff",
                    letterSpacing: "0.06em",
                    marginBottom: "0.45rem",
                  }}
                >
                  {item.name}
                </p>
                <TagRow tags={item.tags} light />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Mobile: native scroll-snap + text below each card ───────────────── */}
      {!isDesktop && (
        <div
          style={
            {
              display: "flex",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              height: "100%",
              alignItems: "center",
              gap: "4vw",
              padding: "0 6vw",
              scrollbarWidth: "none",
            } as React.CSSProperties
          }
        >
          {ITEMS.map((item) => (
            <div
              key={item.slug}
              style={{
                flexShrink: 0,
                width: "84vw",
                scrollSnapAlign: "center",
                cursor: item.href ? "pointer" : "default",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
              onClick={() => handleClick(item)}
            >
              {/* Image */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "58vh",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  quality={90}
                  style={{ objectFit: "cover" }}
                  sizes="90vw"
                  draggable={false}
                />
              </div>

              {/* Text + button below the image — always visible, no hover needed */}
              <div
                style={{
                  padding: "0 0.1rem",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  gap: "0.75rem",
                }}
              >
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-title)",
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: nameColor,
                      letterSpacing: "0.05em",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {item.name}
                  </p>
                  <TagRow tags={item.tags} />
                </div>

                {item.href && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(item.href!, item.name);
                    }}
                    style={{
                      flexShrink: 0,
                      padding: "0.5rem 1rem",
                      borderRadius: 20,
                      backgroundColor: "#e7501e",
                      color: "#fff",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      border: "none",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t("view_works")}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Progress bar (desktop) ───────────────────────────────────────────── */}
      {isDesktop && (
        <div
          style={{
            position: "absolute",
            bottom: 28,
            left: "6vw",
            right: "6vw",
            height: 1,
            backgroundColor: barBg,
            overflow: "hidden",
          }}
        >
          <div
            ref={progressRef}
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#e7501e",
              transformOrigin: "left center",
              transform: "scaleX(0)",
            }}
          />
        </div>
      )}

      {/* ── Hint pill (desktop) ──────────────────────────────────────────────── */}
      {isDesktop && (
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: "6vw",
            padding: "6px 16px",
            borderRadius: 20,
            backgroundColor: ctrlBg,
            backdropFilter: "blur(8px)",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.62rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: ctrlText,
              opacity: 0.65,
            }}
          >
            {t("hint")}
          </span>
        </div>
      )}
    </div>
  );
}
