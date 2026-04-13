"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Image, { StaticImageData } from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import PageAnnotation from "@/components/layout/PageAnnotation";
import ArrowDecor from "@/components/ui/ArrowDecor";

// ── Images ────────────────────────────────────────────────────────────────────
import sConseil from "@/assets/images/services/ComEtMarketing.webp";
import sGestion from "@/assets/images/services/Gestion2Projet.webp";
import sDigital from "@/assets/images/services/MarkDigi.webp";
import sStreet from "@/assets/images/services/StreetMarketing.webp";
import sGraphic from "@/assets/images/services/2D-3D-Design.webp";
import sVideo from "@/assets/images/services/AdvertisingSpot.webp";
import sUiux from "@/assets/images/services/GraphicDesign.webp";
import sWebdev from "@/assets/images/services/DevWeb.webp";

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
}

const STRATEGIC: ServiceDef[] = [
  { id: "conseil", imagePos: "right", image: sConseil },
  { id: "gestion", imagePos: "right", image: sGestion },
  { id: "digital", imagePos: "right", image: sDigital },
  { id: "street", imagePos: "right", image: sStreet },
];

const CREATIVE: ServiceDef[] = [
  { id: "graphic", imagePos: "right", image: sGraphic },
  { id: "video", imagePos: "left", image: sVideo },
  { id: "uiux", imagePos: "right", image: sUiux },
  { id: "webdev", imagePos: "right", image: sWebdev },
];

// ── ServiceSection ─────────────────────────────────────────────────────────────
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
          padding: "4rem clamp(2.5rem, 5vw, 6rem) 4rem clamp(3.5rem, 6vw, 8rem)",
        }}
      >
        <div style={{ maxWidth: 560 }}>
          {/* Arrow + Title */}
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

          {/* Orange left-bar + body */}
          <div
            style={{
              borderLeft: `2px solid ${ORANGE}`,
              paddingLeft: "1.5rem",
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

// ── Service section nav ───────────────────────────────────────────────────────
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
        top: "1.5rem",
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
      {/* Sliding orange indicator */}
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
  const [activeTab, setActiveTab] = useState<Tab>("strategic");
  const [displayTab, setDisplayTab] = useState<Tab>("strategic");
  const [fading, setFading] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  useEffect(() => {
    setMounted(true);
  }, []);

  const services = displayTab === "strategic" ? STRATEGIC : CREATIVE;
  const NUM = services.length;

  // GSAP horizontal scroll — recreated whenever displayTab changes
  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;

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
  }, [displayTab, NUM]);

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
        window.scrollTo(0, 0);
        setDisplayTab(tab);
        setActiveTab(tab);
        setActiveSection(0);
        // small delay to let React re-render before fade-in
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

  return (
    <main data-page-name="services">
      {/* Portalled overlays */}
      {mounted &&
        createPortal(
          <>
            <TabSwitcher active={activeTab} onSwitch={handleTabSwitch} t={t} />
            <ServiceSectionNav
              labels={navLabels}
              active={activeSection}
              onSelect={handleNavSelect}
            />
            <PageAnnotation line1={t("annotation1")} line2={t("annotation2")} />
          </>,
          document.body,
        )}

      {/* Outer pin container */}
      <div ref={outerRef}>
        {/* Horizontal track */}
        <div
          key={displayTab}
          ref={trackRef}
          style={{
            display: "flex",
            width: `${NUM * 100}vw`,
            height: "100vh",
            opacity: fading ? 0 : 1,
            transition: fading ? "opacity 0.32s ease" : "opacity 0.28s ease",
          }}
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
    </main>
  );
}
