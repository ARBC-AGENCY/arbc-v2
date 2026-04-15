"use client";

import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import ProjectSectionNav from "@/components/layout/ProjectSectionNav";
import PageAnnotation from "@/components/layout/PageAnnotation";
import ArrowDecor from "@/components/ui/ArrowDecor";

// ── Image assets ──────────────────────────────────────────────────────────────
import evEV00 from "@/assets/images/eventify/EV00.webp";
import evEV0002 from "@/assets/images/eventify/EV0002.webp";
import evEV001 from "@/assets/images/eventify/EV001.webp";
import evEV01 from "@/assets/images/eventify/EV01.webp";
import evEV002 from "@/assets/images/eventify/EV002.webp";
import ev1 from "@/assets/images/eventify/1.webp";
import ev2 from "@/assets/images/eventify/2.webp";
import ev3 from "@/assets/images/eventify/3.webp";
import ev4 from "@/assets/images/eventify/4.webp";
import ev5 from "@/assets/images/eventify/5.webp";

// ── Text helpers ──────────────────────────────────────────────────────────────
function BodyParagraphs({
  content,
  style,
}: {
  content: string | string[];
  style?: React.CSSProperties;
}) {
  const paras = Array.isArray(content) ? content : [content];
  return (
    <>
      {paras.map((p, i) => (
        <p
          key={i}
          dangerouslySetInnerHTML={{ __html: p }}
          style={{ ...style, marginTop: i > 0 ? "0.9em" : 0 }}
        />
      ))}
    </>
  );
}

const NUM_SECTIONS = 4;
const ORANGE = "#e7501e";
const CARD_BG = "#1c1c1c";

// ── Section 1 — Brand Presentation ───────────────────────────────────────────
function Section1({
  t,
  isDark,
}: {
  t: ReturnType<typeof useTranslations<"Eventify">>;
  isDark: boolean;
}) {
  const bg = isDark ? "#0f0f0f" : "#f0ede8";

  return (
    <section
      style={{
        width: "100vw",
        height: "100vh",
        flexShrink: 0,
        position: "relative",
        overflow: "hidden",
        backgroundColor: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Hero image — centred 70% */}
      <div style={{ position: "relative", width: "70%", flexShrink: 0 }}>
        <Image
          src={evEV00}
          alt="Eventify"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* Orange text card — bottom right */}
      <div
        style={{
          position: "absolute",
          bottom: "6%",
          right: "7rem",
          width: "clamp(280px, 28vw, 420px)",
          backgroundColor: ORANGE,
          padding: "2rem 2.25rem",
          zIndex: 4,
        }}
      >
        <BodyParagraphs
          content={t.raw("s1.body") as string | string[]}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            lineHeight: 1.3,
            color: "#191919",
            fontWeight: 500,
          }}
        />
      </div>
    </section>
  );
}

// ── Section 2 — Agency Challenge ─────────────────────────────────────────────
function Section2({
  t,
  isDark,
}: {
  t: ReturnType<typeof useTranslations<"Eventify">>;
  isDark: boolean;
}) {
  const bg = isDark ? "#0f0f0f" : "#f0ede8";

  return (
    <section
      style={{
        width: "100vw",
        height: "100vh",
        flexShrink: 0,
        position: "relative",
        overflow: "hidden",
        backgroundColor: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Main image — centred 70% */}
      <div style={{ position: "relative", width: "70%", flexShrink: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={evEV0002.src}
          alt="Eventify Challenge"
          style={{ width: "80%", height: "auto", display: "block" }}
        />
      </div>

      {/* Orange text div — left, arrow on its right, both absolutely placed */}
      <div
        style={{
          position: "absolute",
          right: "15rem",
          top: "30%",
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "flex-start",
          gap: "1.25rem",
          zIndex: 4,
        }}
      >
        <div
          style={{
            width: "clamp(240px, 22vw, 360px)",
            backgroundColor: ORANGE,
            padding: "2rem 2.25rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-title)",
              fontSize: "var(--text-md)",
              fontWeight: 700,
              fontStyle: "italic",
              lineHeight: 1,
              color: "#191919",
              marginBottom: "1rem",
            }}
            dangerouslySetInnerHTML={{ __html: t.raw("s2.title") as string }}
          />
          <BodyParagraphs
            content={t.raw("s2.body") as string | string[]}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              lineHeight: 1.3,
              color: "#191919",
              fontWeight: 500,
            }}
          />
        </div>
        {/* Arrow pointing down — outside, to the right of the orange div */}
        <ArrowDecor
          direction="down"
          size={15}
          style={{ flexShrink: 0, marginTop: "0.4rem" }}
        />
      </div>
    </section>
  );
}

// ── Section 3 — Our Response ──────────────────────────────────────────────────
function Section3({
  t,
  isDark,
}: {
  t: ReturnType<typeof useTranslations<"Eventify">>;
  isDark: boolean;
}) {
  const bg = isDark ? "#0f0f0f" : "#f0ede8";
  const textMuted = "rgba(255,255,255,0.60)";

  return (
    <section
      style={{
        width: "100vw",
        height: "100vh",
        flexShrink: 0,
        position: "relative",
        overflow: "hidden",
        backgroundColor: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "90%",
          height: "100%",
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
          backgroundColor: bg,
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* ── Left col (40%) — orange title + 2 dark cards ── */}
        <div
          style={{
            width: "40%",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "4rem 2rem 4rem 5rem",
            gap: "1.25rem",
          }}
        >
          {/* Orange section title */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.75rem",
            }}
          >
            <ArrowDecor
              direction="right"
              size={9}
              style={{ flexShrink: 0, marginTop: "0.4rem" }}
            />
            <p
              style={{
                fontFamily: "var(--font-title)",
                fontSize: "var(--text-md)",
                fontWeight: 700,
                fontStyle: "italic",
                lineHeight: 1.15,
                color: ORANGE,
                margin: 0,
              }}
              dangerouslySetInnerHTML={{
                __html: t.raw("s3.section_title") as string,
              }}
            />
          </div>

          {/* Two text points */}
          {(["p1", "p2"] as const).map((key) => (
            <div
              key={key}
              style={{ backgroundColor: CARD_BG, padding: "1.25rem 1.5rem" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.6rem",
                  marginBottom: "0.5rem",
                }}
              >
                <ArrowDecor
                  direction="right"
                  size={9}
                  style={{ flexShrink: 0, marginTop: "0.2rem" }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-sm)",
                    fontWeight: 700,
                    color: "#ffffff",
                    lineHeight: 1.2,
                  }}
                >
                  {t(`s3.${key}_title`)}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-sm)",
                  lineHeight: 1.6,
                  color: textMuted,
                  margin: 0,
                }}
              >
                {t(`s3.${key}_body`)}
              </p>
            </div>
          ))}
        </div>

        {/* ── Right col (60%) — masonry: EV001 left, EV01+EV002 right ── */}
        <div
          style={{
            flex: 1,
            display: "flex",
            gap: "0.5rem",
            padding: "3rem 4rem 3rem 1rem",
            alignItems: "center",
          }}
        >
          {/* EV001 — taller left sub-col */}
          <div style={{ flex: 1 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={evEV001.src}
              alt="Eventify project 1"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
          {/* EV01 + EV002 — right sub-col stacked */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={evEV01.src}
              alt="Eventify project 2"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={evEV002.src}
              alt="Eventify project 3"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section 4 — Results ───────────────────────────────────────────────────────
function Section4({
  t,
  isDark,
}: {
  t: ReturnType<typeof useTranslations<"Eventify">>;
  isDark: boolean;
}) {
  const bg = isDark ? "#0f0f0f" : "#f0ede8";
  const textMuted = "rgba(255,255,255,0.60)";

  return (
    <section
      style={{
        width: "100vw",
        height: "100vh",
        flexShrink: 0,
        position: "relative",
        overflow: "hidden",
        backgroundColor: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "90%",
          height: "100vh",
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
          backgroundColor: bg,
          display: "flex",
          alignItems: "stretch",
        }}
      >
        {/* ── Col 1 — 3 images stacked (1, 2, 3) ── */}
        <div
          style={{
            width: "33%",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem 0.5rem 2rem 3rem",
            gap: "0.5rem",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ev1.src}
            alt="Eventify 1"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ev2.src}
            alt="Eventify 2"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ev3.src}
            alt="Eventify 3"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        {/* ── Col 2 — 2 images stacked (5, 4) ── */}
        <div
          style={{
            width: "30%",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem 0.5rem",
            gap: "0.5rem",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ev5.src}
            alt="Eventify 5"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ev4.src}
            alt="Eventify 4"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        {/* ── Col 3 — dark text block with results ── */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "4rem 4rem 4rem 2rem",
            gap: "1.25rem",
          }}
        >
          {/* "Résultats" orange pill */}
          <div>
            <span
              style={{
                display: "inline-block",
                backgroundColor: ORANGE,
                color: "#fff",
                fontFamily: "var(--font-title)",
                fontSize: "var(--text-sm)",
                fontStyle: "italic",
                fontWeight: 700,
                padding: "0.25rem 0.85rem",
              }}
            >
              {t("s4.label")}
            </span>
          </div>

          {/* Two result points */}
          {(["r1", "r2"] as const).map((key) => (
            <div
              key={key}
              style={{ backgroundColor: CARD_BG, padding: "1.25rem 1.5rem" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.6rem",
                  marginBottom: "0.5rem",
                }}
              >
                <ArrowDecor
                  direction="right"
                  size={9}
                  style={{ flexShrink: 0, marginTop: "0.2rem" }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-sm)",
                    fontWeight: 700,
                    color: "#ffffff",
                    lineHeight: 1.2,
                  }}
                >
                  {t(`s4.${key}_title`)}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-sm)",
                  lineHeight: 1.6,
                  color: textMuted,
                  margin: 0,
                }}
              >
                {t(`s4.${key}_body`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function Eventify() {
  const t = useTranslations("Eventify");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  useEffect(() => {
    setMounted(true);
  }, []);

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
        end: () => `+=${(NUM_SECTIONS - 1) * window.innerWidth}`,
        onUpdate: (self) => {
          const idx = Math.min(
            Math.floor(self.progress * NUM_SECTIONS),
            NUM_SECTIONS - 1,
          );
          setActiveSection(idx);
        },
      },
    });

    tl.to(track, {
      x: () => -((NUM_SECTIONS - 1) * window.innerWidth),
      ease: "none",
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      ScrollTrigger.refresh();
    };
  }, []);

  const handleNavSelect = (index: number) => {
    const outer = outerRef.current;
    if (!outer) return;
    const triggers = ScrollTrigger.getAll().filter(
      (st) => st.vars.trigger === outer,
    );
    const st = triggers[0];
    if (!st) return;
    const targetProgress = index / Math.max(NUM_SECTIONS - 1, 1);
    const targetScroll = st.start + (st.end - st.start) * targetProgress;
    window.scrollTo(0, targetScroll);
  };

  const sectionLabels = [t("nav.s1"), t("nav.s2"), t("nav.s3"), t("nav.s4")];

  return (
    <main data-page-name="eventify">
      {mounted &&
        createPortal(
          <>
            <ProjectSectionNav
              sections={sectionLabels}
              activeIndex={activeSection}
              onSelect={handleNavSelect}
            />
            <PageAnnotation line1={t("annotation1")} line2={t("annotation2")} />
          </>,
          document.body,
        )}

      <div ref={outerRef}>
        <div
          ref={trackRef}
          style={{
            display: "flex",
            width: `${NUM_SECTIONS * 100}vw`,
            height: "100vh",
          }}
        >
          <Section1 t={t} isDark={isDark} />
          <Section2 t={t} isDark={isDark} />
          <Section3 t={t} isDark={isDark} />
          <Section4 t={t} isDark={isDark} />
        </div>
      </div>
    </main>
  );
}
