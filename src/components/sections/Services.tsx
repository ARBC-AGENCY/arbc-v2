"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Image, { StaticImageData } from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import PageAnnotation from "@/components/layout/PageAnnotation";
import ArrowDecor from "@/components/ui/ArrowDecor";

// ── Desktop images ────────────────────────────────────────────────────────────
import sConseil from "@/assets/images/services/ComEtMarketing.webp";
import sGestion from "@/assets/images/services/Gestion2Projet.webp";
import sDigital from "@/assets/images/services/MarkDigi.webp";
import sStreet from "@/assets/images/services/StreetMarketing.webp";
import sGraphic from "@/assets/images/services/2D-3D-Design.webp";
import sVideo from "@/assets/images/services/AdvertisingSpot.webp";
import sUiux from "@/assets/images/services/GraphicDesign.webp";
import sWebdev from "@/assets/images/services/DevWeb.webp";

// ── Mobile images (dark = light-mode, white = dark-mode) ─────────────────────
import mConseilDark from "@/assets/images/services/mobile/marketing-communication-dark.webp";
import mConseilWhite from "@/assets/images/services/mobile/marketing-communication-white.webp";
import mGestionDark from "@/assets/images/services/mobile/project-management-dark.webp";
import mGestionWhite from "@/assets/images/services/mobile/project-management-white.webp";
import mDigitalDark from "@/assets/images/services/mobile/digital-marketing-dark.webp";
import mDigitalWhite from "@/assets/images/services/mobile/digital-marketing-white.webp";
import mStreetDark from "@/assets/images/services/mobile/street-marketing-dark.webp";
import mStreetWhite from "@/assets/images/services/mobile/street-marketing-white.webp";
import mGraphicDark from "@/assets/images/services/mobile/2d-3d-dark.webp";
import mGraphicWhite from "@/assets/images/services/mobile/2d-3d-white.webp";
import mVideoDark from "@/assets/images/services/mobile/video-prod-dark.webp";
import mVideoWhite from "@/assets/images/services/mobile/video-prod-white.webp";
import mUiuxDark from "@/assets/images/services/mobile/ui-ux-dark.webp";
import mUiuxWhite from "@/assets/images/services/mobile/ui-ux-white.webp";
import mWebdevDark from "@/assets/images/services/mobile/web-app-dark.webp";
import mWebdevWhite from "@/assets/images/services/mobile/web-app-white.webp";

// ── Constants ─────────────────────────────────────────────────────────────────
const ORANGE = "#e7501e";

// ── Text helpers ──────────────────────────────────────────────────────────────
function Html({
  as: Tag = "span",
  html,
  style,
}: {
  as?: React.ElementType;
  html: string;
  style?: React.CSSProperties;
}) {
  return <Tag dangerouslySetInnerHTML={{ __html: html }} style={style} />;
}

function BodyParagraphs({
  content,
  style,
}: {
  content: string | string[];
  style?: React.CSSProperties;
}) {
  const items = Array.isArray(content) ? content : [content];
  return (
    <>
      {items.map((p, i) => (
        <p
          key={i}
          dangerouslySetInnerHTML={{ __html: p }}
          style={{ ...style, marginBottom: i < items.length - 1 ? "1em" : 0 }}
        />
      ))}
    </>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────
type Tab = "strategic" | "creative";

interface ServiceDef {
  id: string;
  imagePos: "left" | "right";
  image: StaticImageData;
  mobileDark: StaticImageData;
  mobileWhite: StaticImageData;
}

const STRATEGIC: ServiceDef[] = [
  {
    id: "conseil",
    imagePos: "right",
    image: sConseil,
    mobileDark: mConseilDark,
    mobileWhite: mConseilWhite,
  },
  {
    id: "gestion",
    imagePos: "right",
    image: sGestion,
    mobileDark: mGestionDark,
    mobileWhite: mGestionWhite,
  },
  {
    id: "digital",
    imagePos: "right",
    image: sDigital,
    mobileDark: mDigitalDark,
    mobileWhite: mDigitalWhite,
  },
  {
    id: "street",
    imagePos: "right",
    image: sStreet,
    mobileDark: mStreetDark,
    mobileWhite: mStreetWhite,
  },
];

const CREATIVE: ServiceDef[] = [
  {
    id: "graphic",
    imagePos: "right",
    image: sGraphic,
    mobileDark: mGraphicDark,
    mobileWhite: mGraphicWhite,
  },
  {
    id: "video",
    imagePos: "left",
    image: sVideo,
    mobileDark: mVideoDark,
    mobileWhite: mVideoWhite,
  },
  {
    id: "uiux",
    imagePos: "right",
    image: sUiux,
    mobileDark: mUiuxDark,
    mobileWhite: mUiuxWhite,
  },
  {
    id: "webdev",
    imagePos: "right",
    image: sWebdev,
    mobileDark: mWebdevDark,
    mobileWhite: mWebdevWhite,
  },
];

// ── Desktop ServiceSection ────────────────────────────────────────────────────
function ServiceSection({
  service,
  index,
  t,
  isDark,
}: {
  service: ServiceDef;
  index: number;
  t: ReturnType<typeof useTranslations<"Services">>;
  isDark: boolean;
}) {
  const isLeft = service.imagePos === "left";
  const textColor = isDark ? "rgba(255,255,255,0.88)" : "rgba(0,0,0,0.88)";
  const bodyColor = isDark ? "rgba(255,255,255,0.60)" : "rgba(0,0,0,0.58)";
  const bg = isDark ? "#111111" : "#f0ede8";

  return (
    <section
      style={{
        width: "100vw",
        height: "100vh",
        flexShrink: 0,
        display: "flex",
        flexDirection: isLeft ? "row" : "row-reverse",
        backgroundColor: bg,
        overflow: "hidden",
      }}
    >
      {/* Image column — natural dimensions, anchored to bottom */}
      <div
        style={{
          width: "55%",
          height: "100%",
          flexShrink: 0,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Image
          src={service.image}
          alt=""
          style={{
            width: "auto",
            height: "auto",
            maxWidth: "100%",
            maxHeight: "100%",
            display: "block",
            objectFit: "contain",
            objectPosition: "bottom center",
          }}
        />
      </div>

      {/* Text column */}
      <div
        style={{
          flex: 1,
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding:
            "4rem clamp(2.5rem, 5vw, 6rem) 4rem clamp(3.5rem, 6vw, 8rem)",
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              marginBottom: "2rem",
            }}
          >
            <ArrowDecor
              direction="right"
              size={14}
              style={{ flexShrink: 0, marginTop: "0.35rem" }}
            />
            <Html
              as="h2"
              html={
                t.raw(
                  `${service.id}.title` as Parameters<typeof t>[0],
                ) as string
              }
              style={{
                fontFamily: "var(--font-title)",
                fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                color: textColor,
                letterSpacing: "-0.02em",
              }}
            />
          </div>
          <div
            style={{ borderLeft: `2px solid ${ORANGE}`, paddingLeft: "1.5rem" }}
          >
            <BodyParagraphs
              content={
                t.raw(`${service.id}.body` as Parameters<typeof t>[0]) as
                  | string
                  | string[]
              }
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
                lineHeight: 1.8,
                color: bodyColor,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Mobile ServiceSection ─────────────────────────────────────────────────────
// DOM order: [image, text] always.
// Mobile (<sm):  flex-col → image on top, text below.
// Tablet (sm–lg): even index → flex-row-reverse (image right, text left)
//                  odd index  → flex-row         (image left, text right)
function MobileServiceSection({
  service,
  index,
  t,
  isDark,
}: {
  service: ServiceDef;
  index: number;
  t: ReturnType<typeof useTranslations<"Services">>;
  isDark: boolean;
}) {
  const isOdd = index % 2 === 1;
  const mobileImg = isDark ? service.mobileWhite : service.mobileDark;
  const textColor = isDark ? "rgba(255,255,255,0.88)" : "rgba(0,0,0,0.88)";
  const bodyColor = isDark ? "rgba(255,255,255,0.60)" : "rgba(0,0,0,0.58)";
  const bg = isDark ? "#111111" : "#f0ede8";

  return (
    <section
      style={{ backgroundColor: bg }}
      className={`flex h-dvh justify-center gap-y-10
        ${
          isOdd
            ? "flex flex-col sm:flex-row "
            : "flex flex-col sm:flex-row-reverse"
        }
      `}
    >
      {/* Image */}
      <div className="w-full sm:w-[45%] shrink-0 flex items-end sm:items-center justify-center overflow-hidden">
        {/* On sm+: inner wrapper constrains image to ~62% of column so it reads as smaller and centered */}
        <div className="flex items-end sm:items-center justify-center w-[30%] sm:h-[62%] sm:w-[72%]">
          <Image
            src={mobileImg}
            alt=""
            style={{
              width: "auto",
              height: "auto",
              maxWidth: "100%",
              maxHeight: "100%",
              display: "block",
              objectFit: "contain",
              objectPosition: "bottom center",
            }}
          />
        </div>
      </div>

      {/* Text */}
      <div className="md:flex-1 flex items-center px-6 py-8 sm:px-10 sm:py-6 md:px-14">
        <div style={{ maxWidth: 520 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.25rem",
              marginBottom: "1.5rem",
            }}
          >
            <ArrowDecor
              direction="right"
              size={12}
              style={{ flexShrink: 0, marginTop: "0.3rem" }}
            />
            <Html
              as="h2"
              html={
                t.raw(
                  `${service.id}.title` as Parameters<typeof t>[0],
                ) as string
              }
              style={{
                fontFamily: "var(--font-title)",
                fontSize: "clamp(1.4rem, 4vw, 2.25rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                color: textColor,
                letterSpacing: "-0.02em",
              }}
            />
          </div>
          <div
            style={{
              borderLeft: `2px solid ${ORANGE}`,
              paddingLeft: "1.25rem",
            }}
          >
            <BodyParagraphs
              content={
                t.raw(`${service.id}.body` as Parameters<typeof t>[0]) as
                  | string
                  | string[]
              }
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.85rem, 2.2vw, 0.975rem)",
                lineHeight: 1.8,
                color: bodyColor,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Tab switcher ──────────────────────────────────────────────────────────────
function TabSwitcher({
  active,
  onSwitch,
  t,
}: {
  active: Tab;
  onSwitch: (tab: Tab) => void;
  t: ReturnType<typeof useTranslations<"Services">>;
}) {
  const tabs: { key: Tab; label: string }[] = [
    { key: "strategic", label: t("tab_strategic") },
    { key: "creative", label: t("tab_creative") },
  ];

  return (
    <div
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "1.75rem",
        zIndex: 2100,
        display: "flex",
        background: "rgba(20,20,20,0.55)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: "3rem",
        padding: "4px",
        gap: "2px",
      }}
    >
      {tabs.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onSwitch(key)}
          style={{
            background: active === key ? ORANGE : "transparent",
            borderRadius: "3rem",
            padding: "0.4rem 1.25rem",
            color: active === key ? "#fff" : "rgba(255,255,255,0.55)",
            fontFamily: "var(--font-body)",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            border: "none",
            cursor: "pointer",
            transition: "background 0.3s ease, color 0.3s ease",
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

// ── Mobile tab switcher — hamburger + dropdown (< md) ────────────────────────
function MobileTabSwitcher({
  active,
  onSwitch,
  isDark,
  t,
}: {
  active: Tab;
  onSwitch: (tab: Tab) => void;
  isDark: boolean;
  t: ReturnType<typeof useTranslations<"Services">>;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const tabs: { key: Tab; label: string }[] = [
    { key: "strategic", label: t("tab_strategic") },
    { key: "creative",  label: t("tab_creative")  },
  ];

  // Match the Nav pill tokens exactly
  const pillBg     = isDark ? "rgba(25, 25, 25, 0.72)"  : "rgba(204, 204, 204, 0.72)";
  const pillBorder = isDark ? "rgba(255,255,255,0.10)"   : "rgba(0,0,0,0.12)";
  const iconColor  = isDark ? "rgba(255,255,255,0.75)"   : "rgba(0,0,0,0.65)";

  return (
    <div
      ref={wrapperRef}
      style={{ position: "fixed", bottom: "2rem", right: "1.75rem", zIndex: 2100 }}
    >
      {/* Dropdown — slides up above the trigger */}
      <div
        style={{
          position: "absolute",
          bottom: "calc(100% + 0.5rem)",
          right: 0,
          background: "rgba(20,20,20,0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRadius: "1rem",
          padding: "4px",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          minWidth: "148px",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.2s ease, transform 0.2s ease",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => { onSwitch(key); setOpen(false); }}
            style={{
              background: active === key ? ORANGE : "transparent",
              borderRadius: "0.75rem",
              padding: "0.55rem 1.1rem",
              color: active === key ? "#fff" : "rgba(255,255,255,0.6)",
              fontFamily: "var(--font-body)",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              transition: "background 0.2s ease, color 0.2s ease",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Trigger — styled to match the Nav pill */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Switch service category"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "44px",
          height: "44px",
          borderRadius: "9999px",
          backgroundColor: pillBg,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: `1px solid ${pillBorder}`,
          boxShadow: "0 4px 32px rgba(0,0,0,0.18)",
          cursor: "pointer",
          color: iconColor,
        }}
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <line x1="3" y1="7" x2="21" y2="7" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="17" x2="21" y2="17" />
          </svg>
        )}
      </button>
    </div>
  );
}

// ── Service section nav (desktop only) ───────────────────────────────────────
function ServiceSectionNav({
  labels,
  active,
  onSelect,
}: {
  labels: string[];
  active: number;
  onSelect: (i: number) => void;
}) {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const btn = itemsRef.current[active];
    const indicator = indicatorRef.current;
    if (!btn || !indicator) return;
    indicator.style.width = `${btn.offsetWidth}px`;
    indicator.style.transform = `translateX(${btn.offsetLeft}px)`;
  }, [active, labels]);

  return (
    <div
      style={{
        position: "fixed",
        top: "3.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 2100,
        display: "flex",
        alignItems: "center",
        background: "rgba(20,20,20,0.55)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: "3rem",
        padding: "4px",
        gap: "2px",
      }}
    >
      <div
        ref={indicatorRef}
        style={{
          position: "absolute",
          top: 4,
          left: 4,
          height: "calc(100% - 8px)",
          backgroundColor: ORANGE,
          borderRadius: "3rem",
          transition:
            "transform 0.35s cubic-bezier(0.4,0,0.2,1), width 0.35s cubic-bezier(0.4,0,0.2,1)",
          pointerEvents: "none",
        }}
      />
      {labels.map((label, i) => (
        <button
          key={label}
          ref={(el) => {
            itemsRef.current[i] = el;
          }}
          onClick={() => onSelect(i)}
          style={{
            position: "relative",
            zIndex: 1,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "0.4rem 1.1rem",
            fontFamily: "var(--font-body)",
            fontSize: "0.72rem",
            fontWeight: 600,
            letterSpacing: "0.05em",
            color: active === i ? "#fff" : "rgba(255,255,255,0.50)",
            textTransform: "uppercase",
            transition: "color 0.3s ease",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function Services() {
  const t = useTranslations("Services");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isMdUp, setIsMdUp] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("strategic");
  const [displayTab, setDisplayTab] = useState<Tab>("strategic");
  const [fading, setFading] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  useEffect(() => {
    setMounted(true);
    const check = () => {
      setIsDesktop(window.innerWidth >= 1024);
      setIsMdUp(window.innerWidth >= 768);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const services = displayTab === "strategic" ? STRATEGIC : CREATIVE;
  const NUM = services.length;

  // GSAP horizontal scroll — desktop only, recreated when tab or desktop state changes
  useEffect(() => {
    if (!isDesktop) return;
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;

    // Reset scroll position on tab switch (replaces key-based remount)
    gsap.set(track, { x: 0 });
    window.scrollTo(0, 0);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: outer,
        pin: true,
        scrub: 0.5,
        start: "top top",
        end: () => `+=${(NUM - 1) * window.innerWidth}`,
        onUpdate: (self) => {
          const idx = Math.min(Math.floor(self.progress * NUM), NUM - 1);
          setActiveSection(idx);
        },
      },
    });

    tl.to(track, {
      x: () => -((NUM - 1) * window.innerWidth),
      ease: "none",
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      ScrollTrigger.refresh();
    };
  }, [displayTab, NUM, isDesktop]);

  // Nav section click
  const handleNavSelect = useCallback(
    (index: number) => {
      const outer = outerRef.current;
      if (!outer) return;
      const triggers = ScrollTrigger.getAll().filter(
        (st) => st.vars.trigger === outer,
      );
      const st = triggers[0];
      if (!st) return;
      const targetProgress = index / Math.max(NUM - 1, 1);
      const targetScroll = st.start + (st.end - st.start) * targetProgress;
      window.scrollTo(0, targetScroll);
    },
    [NUM],
  );

  // Tab switching with fade
  const handleTabSwitch = useCallback(
    (tab: Tab) => {
      if (tab === activeTab || fading) return;
      setFading(true);
      setTimeout(() => {
        setDisplayTab(tab);
        setActiveTab(tab);
        setActiveSection(0);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setFading(false));
        });
      }, 320);
    },
    [activeTab, fading],
  );

  const navLabels = services.map(
    (s) => t.raw(`${s.id}.nav` as Parameters<typeof t>[0]) as string,
  );

  const fadeStyle = {
    opacity: fading ? 0 : 1,
    transition: fading ? "opacity 0.32s ease" : "opacity 0.28s ease",
  };

  return (
    <main data-page-name="services">
      {/* Portalled overlays */}
      {mounted &&
        createPortal(
          <>
            {isMdUp ? (
              <TabSwitcher active={activeTab} onSwitch={handleTabSwitch} t={t} />
            ) : (
              <MobileTabSwitcher active={activeTab} onSwitch={handleTabSwitch} isDark={isDark} t={t} />
            )}
            {isDesktop && (
              <ServiceSectionNav
                labels={navLabels}
                active={activeSection}
                onSelect={handleNavSelect}
              />
            )}
            <div className="hidden sm:block">
              <PageAnnotation
                line1={t("annotation1")}
                line2={t("annotation2")}
              />
            </div>
          </>,
          document.body,
        )}

      {/* ── Desktop: pinned horizontal scroll — always in DOM, GSAP needs a stable node ── */}
      <div ref={outerRef} className={`once-in${isDesktop ? "" : " hidden"}`}>
        <div
          ref={trackRef}
          style={{
            display: "flex",
            width: `${NUM * 100}vw`,
            height: "100vh",
            ...fadeStyle,
          }}
          className="once-in"
        >
          {services.map((s, i) => (
            <ServiceSection
              key={s.id}
              service={s}
              index={i}
              t={t}
              isDark={isDark}
            />
          ))}
        </div>
      </div>

      {/* ── Mobile / tablet: vertical stack — always in DOM, hidden on desktop ── */}
      <div style={fadeStyle} className={`once-in${isDesktop ? " hidden" : ""}`}>
        {services.map((s, i) => (
          <MobileServiceSection
            key={s.id}
            service={s}
            index={i}
            t={t}
            isDark={isDark}
          />
        ))}
      </div>
    </main>
  );
}
