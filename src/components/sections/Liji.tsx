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
import lL00 from "@/assets/images/liji/L00.webp";
import lL000 from "@/assets/images/liji/L000.webp";
import lL1 from "@/assets/images/liji/L1.webp";
import lL2 from "@/assets/images/liji/L2.webp";
import lL3 from "@/assets/images/liji/L3.webp";
import lL4 from "@/assets/images/liji/L4.webp";
import lL5 from "@/assets/images/liji/L5.webp";
import lL6 from "@/assets/images/liji/L6.webp";
import lBabyBoxeur from "@/assets/images/liji/Post-Liji-Bébé-Boxeur.webp";
import lBabyEspion from "@/assets/images/liji/Bébé-Espion-2.webp";
import lCrushCrush from "@/assets/images/liji/Crush-Crush-X-LIJI.webp";
import lCoverFb from "@/assets/images/liji/Cover-Facebook.webp";

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
  t: ReturnType<typeof useTranslations<"Liji">>;
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
      {/* Hero image — centred, ~70% wide */}
      <div style={{ position: "relative", width: "70%", flexShrink: 0 }}>
        <Image
          src={lL00}
          alt="Liji"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* Dark text card — bottom right */}
      <div
        style={{
          position: "absolute",
          bottom: "6%",
          right: "7rem",
          width: "clamp(280px, 30vw, 440px)",
          backgroundColor: CARD_BG,
          padding: "2rem 2.25rem",
          zIndex: 4,
        }}
      >
        <BodyParagraphs
          content={t.raw("s1.body") as string | string[]}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            lineHeight: 1.55,
            color: "rgba(255,255,255,0.75)",
            fontWeight: 400,
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
  t: ReturnType<typeof useTranslations<"Liji">>;
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
      {/* Main image — 70% wide, shifted slightly left via right margin */}
      <div
        style={{
          position: "relative",
          width: "70%",
          flexShrink: 0,
          marginRight: "1%",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={lL000.src}
          alt="Liji Campaign"
          style={{ width: "70%", height: "auto", display: "block" }}
        />
      </div>

      {/* Orange text div — top right, overlapping */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          right: "25rem",
          width: "clamp(260px, 28vw, 400px)",
          backgroundColor: ORANGE,
          padding: "2rem 2.25rem",
          zIndex: 4,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-title)",
            fontSize: "var(--text-md)",
            fontWeight: 700,
            fontStyle: "normal",
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
    </section>
  );
}

// ── Section 3 — Our Response (4 columns) ─────────────────────────────────────
function Section3({
  t,
  isDark,
}: {
  t: ReturnType<typeof useTranslations<"Liji">>;
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
          width: "100vw",
          height: "70%",
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
          backgroundColor: bg,
          display: "flex",
          alignItems: "flex-end",
          gap: "1rem",
        }}
      >
        {/* ── Col 1 (40%) — two titled items ── */}
        <div
          style={{
            width: "30%",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "4rem 2rem 4rem 5rem",
            gap: "1.5rem",
          }}
        >
          {(["p1", "p2"] as const).map((key) => (
            <div
              key={key}
              style={{ backgroundColor: CARD_BG, padding: "1.25rem 1.5rem" }}
            >
              {/* Arrow + title */}
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
                    fontFamily: "var(--font-title)",
                    fontSize: "var(--text-sm)",
                    fontWeight: 700,
                    color: "#ffffff",
                    lineHeight: 1.2,
                  }}
                >
                  {t(`s3.${key}_title`)}
                </span>
              </div>
              {/* Description */}
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

        {/* ── Col 2 (30%) — L4.webp natural aspect ratio ── */}
        <div
          style={{
            width: "20%",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lL4.src}
            alt="Liji Look 4"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        {/* ── Col 3 (15%) — L2 top, L1+L6 bottom ── */}
        <div
          style={{
            width: "15%",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          {/* L2 top */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lL2.src}
            alt="Liji Look 2"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          {/* L1 + L6 bottom side by side */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lL1.src}
              alt="Liji Look 1"
              style={{ width: "50%", height: "auto", display: "block" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lL6.src}
              alt="Liji Look 6"
              style={{ width: "50%", height: "auto", display: "block" }}
            />
          </div>
        </div>

        {/* ── Col 4 (15%) — L3 top, L5 bottom ── */}
        <div
          style={{
            width: "25%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lL3.src}
            alt="Liji Look 3"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </div>
    </section>
  );
}

// ── Section 4 — Results (3 columns) ──────────────────────────────────────────
function Section4({
  t,
  isDark,
}: {
  t: ReturnType<typeof useTranslations<"Liji">>;
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
          width: "100vw",
          height: "60%",
          flexShrink: 0,
          position: "relative",
          overflow: "visible",
          backgroundColor: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        {/* ── Col 1 (40%) — Post-Liji-Bébé-Boxeur natural ratio ── */}
        <div
          style={{
            width: "30%",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            overflow: "visible",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lBabyBoxeur.src}
            alt="Post Liji Bébé Boxeur"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        {/* ── Col 2 (20%) — Bébé-Espion-2 top, Crush-Crush bottom ── */}
        <div
          style={{
            width: "15%",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lBabyEspion.src}
            alt="Bébé Espion 2"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lCrushCrush.src}
            alt="Crush Crush X LIJI"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        {/* ── Col 3 (40%) — Cover-Facebook + dark text block ── */}
        <div
          style={{
            width: "35%",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {/* Cover-Facebook image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lCoverFb.src}
            alt="Cover Facebook Liji"
            style={{ width: "100%", height: "auto", display: "block" }}
          />

          {/* Dark text block */}
          <div style={{ backgroundColor: CARD_BG, padding: "1.5rem 1.75rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.6rem",
                marginBottom: "0.6rem",
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
                {t("s4.r1_title")}
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                lineHeight: 1.65,
                color: textMuted,
                margin: 0,
              }}
            >
              {t("s4.r1_body")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function Liji() {
  const t = useTranslations("Liji");
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
    <main data-page-name="liji">
      {mounted &&
        createPortal(
          <>
            <ProjectSectionNav
              sections={sectionLabels}
              activeIndex={activeSection}
              onSelect={handleNavSelect}
            />
            <PageAnnotation line1={t("annotation1")}  />
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
