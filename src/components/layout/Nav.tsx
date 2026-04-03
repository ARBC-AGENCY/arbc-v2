"use client";

import { useRef, useEffect, useContext, useState } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { gsap } from "@/lib/gsap";
import { usePathname } from "@/i18n/navigation";
import { useTransitionContext } from "@/context/TransitionContext";
import { PageReadyContext } from "@/context/page-ready";

// ── Inline SVG icons ───────────────────────────────────────────────────────

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M23.121,9.069,15.536,1.483a5.008,5.008,0,0,0-7.072,0L.879,9.069A2.978,2.978,0,0,0,0,11.19v9.817a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V11.19A2.978,2.978,0,0,0,23.121,9.069ZM15,22.007H9V18.073a3,3,0,0,1,6,0Zm7-1a1,1,0,0,1-1,1H17V18.073a5,5,0,0,0-10,0v3.934H3a1,1,0,0,1-1-1V11.19a1.008,1.008,0,0,1,.293-.707L9.878,2.9a3.008,3.008,0,0,1,4.244,0l7.585,7.586A1.008,1.008,0,0,1,22,11.19Z" />
  </svg>
);

const ServicesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M20,18.184V8.5c0-.085-.108-8.5-9.438-8.5H9.781L9.593.758C8.9,3.546,7.76,4.481,5.91,5.232A3.014,3.014,0,0,0,4,8.025V10h6.221a5.911,5.911,0,0,1-4.086,3.753A2.978,2.978,0,0,0,4,16.623v1.561A3,3,0,0,0,2,21v3H22V21A3,3,0,0,0,20,18.184ZM6.709,15.669a7.91,7.91,0,0,0,5.777-6.505L12.681,8H6a1.027,1.027,0,0,1,.661-.914,7.213,7.213,0,0,0,4.652-5.063C17.877,2.436,18,8.247,18,8.5V18H6V16.623A.99.99,0,0,1,6.709,15.669ZM20,22H4V21a1,1,0,0,1,1-1H19a1,1,0,0,1,1,1Z" />
  </svg>
);

const PortfolioIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M19,3H12.472a1.019,1.019,0,0,1-.447-.1L8.869,1.316A3.014,3.014,0,0,0,7.528,1H5A5.006,5.006,0,0,0,0,6V18a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V8A5.006,5.006,0,0,0,19,3ZM5,3H7.528a1.019,1.019,0,0,1,.447.1l3.156,1.579A3.014,3.014,0,0,0,12.472,5H19a3,3,0,0,1,2.779,1.882L2,6.994V6A3,3,0,0,1,5,3ZM19,21H5a3,3,0,0,1-3-3V8.994l20-.113V18A3,3,0,0,1,19,21Z" />
  </svg>
);

// ── Nav items ──────────────────────────────────────────────────────────────

interface NavItem {
  key: string;
  href: string;
  labelKey: string; // key inside the Nav namespace
  icon: React.ReactNode;
}

// ── Component ──────────────────────────────────────────────────────────────

export default function Nav() {
  const t = useTranslations("Nav");
  const { navigate } = useTransitionContext();
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const isPageReady = useContext(PageReadyContext);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const NAV_ITEMS: NavItem[] = [
    { key: "home",      labelKey: "home",      href: "/",          icon: <HomeIcon /> },
    { key: "services",  labelKey: "services",  href: "/services",  icon: <ServicesIcon /> },
    { key: "portfolio", labelKey: "portfolio", href: "/portfolio", icon: <PortfolioIcon /> },
  ];

  // Nav is hidden on the homepage — the hero handles navigation from there.
  const isHomePage = pathname === "/";

  // Derive active index from pathname.
  // Home is active on "/" AND "/projects" — because after the intro gate fires,
  // navigating to "/" automatically redirects to "/projects", making them the
  // same effective destination from the user's perspective.
  const activeIdx = NAV_ITEMS.findIndex((item) => {
    if (item.key === "home") return pathname === "/" || pathname.startsWith("/projects");
    return pathname.startsWith(item.href);
  });
  const safeActiveIdx = activeIdx === -1 ? 0 : activeIdx;

  // Refs
  const pillRef      = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const itemRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs     = useRef<(HTMLDivElement | null)[]>([]);

  // ── Entrance: wait for page ready, then slide up ─────────────────────────
  useEffect(() => {
    if (!isPageReady || !pillRef.current) return;

    // Set initial state (hidden below)
    gsap.set(pillRef.current, { y: 24, opacity: 0 });

    gsap.to(pillRef.current, {
      y: 0,
      opacity: 1,
      duration: 1.1,
      ease: "expo.out",
      delay: 0.2,
      onComplete: () => {
        // Set indicator position immediately after pill is visible (no animation)
        const activeEl = itemRefs.current[safeActiveIdx];
        if (activeEl && indicatorRef.current) {
          gsap.set(indicatorRef.current, {
            x: activeEl.offsetLeft,
            width: activeEl.offsetWidth,
          });
        }
      },
    });
  }, [isPageReady]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Slide indicator to active item on route change ───────────────────────
  useEffect(() => {
    const activeEl = itemRefs.current[safeActiveIdx];
    const indicator = indicatorRef.current;
    if (!activeEl || !indicator) return;

    gsap.to(indicator, {
      x: activeEl.offsetLeft,
      width: activeEl.offsetWidth,
      duration: 0.55,
      ease: "expo.out",
    });
  }, [safeActiveIdx]);

  // ── Per-item magnetic effect ──────────────────────────────────────────────
  useEffect(() => {
    const STRENGTH      = 14;
    const ICON_STRENGTH = 6;
    const cleanups: (() => void)[] = [];

    itemRefs.current.forEach((el, i) => {
      const iconEl = iconRefs.current[i];
      if (!el) return;

      const onMove = (e: MouseEvent) => {
        const { left, top, width, height } = el.getBoundingClientRect();
        const x = ((e.clientX - left) / width  - 0.5) * STRENGTH;
        const y = ((e.clientY - top)  / height - 0.5) * STRENGTH;
        gsap.to(el, { x, y, duration: 1.5, ease: "power4.out" });
        if (iconEl) {
          gsap.to(iconEl, {
            x: (x / STRENGTH) * ICON_STRENGTH,
            y: (y / STRENGTH) * ICON_STRENGTH,
            duration: 1.5,
            ease: "power4.out",
          });
        }
      };

      const onLeave = () => {
        gsap.to(el,     { x: 0, y: 0, duration: 1.5, ease: "elastic.out(1, 0.3)" });
        gsap.to(iconEl, { x: 0, y: 0, duration: 1.5, ease: "elastic.out(1, 0.3)" });
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Theme tokens — mounted guard avoids SSR/client mismatch ──────────────
  const isDark      = mounted ? resolvedTheme === "dark" : true;
  const pillBg      = isDark ? "rgba(25, 25, 25, 0.72)"  : "rgba(204, 204, 204, 0.72)";
  const pillBorder  = isDark ? "rgba(255,255,255,0.10)"  : "rgba(0,0,0,0.12)";
  const activeIconC = "#e7501e";
  const inactiveC   = isDark ? "rgba(255,255,255,0.45)"  : "rgba(0,0,0,0.40)";
  const indicatorBg = isDark ? "rgba(255,255,255,0.09)"  : "rgba(0,0,0,0.08)";
  const tooltipBg   = isDark ? "rgba(30,30,30,0.90)"     : "rgba(220,220,220,0.92)";
  const tooltipC    = isDark ? "#ffffff"                  : "#2B2A29";

  if (isHomePage) return null;

  return (
    <nav
      style={{
        position: "fixed",
        bottom: "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 2000,
        pointerEvents: "none", // let children opt-in
      }}
    >
      {/* Outer pill */}
      <div
        ref={pillRef}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
          padding: "0.6rem 0.75rem",
          backgroundColor: pillBg,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: `1px solid ${pillBorder}`,
          borderRadius: "9999px",
          boxShadow: "0 4px 32px rgba(0,0,0,0.18)",
          pointerEvents: "auto",
          // Start hidden (GSAP sets opacity: 0 y: 24 on mount)
          opacity: 0,
        }}
      >
        {/* Sliding active indicator — absolutely positioned behind items */}
        <div
          ref={indicatorRef}
          style={{
            position: "absolute",
            top: "0.45rem",
            bottom: "0.45rem",
            left: 0,
            borderRadius: "9999px",
            backgroundColor: indicatorBg,
            pointerEvents: "none",
            willChange: "transform, width",
          }}
        />

        {/* Nav items */}
        {NAV_ITEMS.map((item, i) => {
          const isActive = i === safeActiveIdx;
          return (
            <div
              key={item.key}
              ref={(el) => { itemRefs.current[i] = el; }}
              onClick={() => navigate(item.href, item.key)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && navigate(item.href, item.key)}
              aria-label={t(item.labelKey as any)}
              aria-current={isActive ? "page" : undefined}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.25rem",
                padding: "0.55rem 1.1rem",
                borderRadius: "9999px",
                cursor: "pointer",
                willChange: "transform",
                zIndex: 1,
              }}
            >
              {/* Tooltip */}
              <span
                style={{
                  position: "absolute",
                  bottom: "calc(100% + 0.5rem)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: tooltipBg,
                  color: tooltipC,
                  fontFamily: "var(--font-body)",
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  padding: "0.28rem 0.7rem",
                  borderRadius: "9999px",
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  opacity: 0,
                  transition: "opacity 0.2s ease",
                }}
                className="nav-tooltip"
              >
                {t(item.labelKey as any)}
              </span>

              {/* Icon */}
              <div
                ref={(el) => { iconRefs.current[i] = el; }}
                style={{
                  color: isActive ? activeIconC : inactiveC,
                  transition: "color 0.25s ease",
                  willChange: "transform",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </div>

              {/* Active orange dot */}
              <span
                style={{
                  display: "block",
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  backgroundColor: "#e7501e",
                  opacity: isActive ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Tooltip hover CSS — scoped via style tag (no Tailwind needed) */}
      <style>{`
        [role="button"]:hover .nav-tooltip { opacity: 1 !important; }
      `}</style>
    </nav>
  );
}
