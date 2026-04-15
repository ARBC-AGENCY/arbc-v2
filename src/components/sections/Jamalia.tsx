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

// ── Image assets ──────────────────────────────────────────────────────────────
import jJ00 from "@/assets/images/jamalia/J00.webp";
import jJ000 from "@/assets/images/jamalia/J000.webp";
import jTShirts from "@/assets/images/jamalia/T-Shirts.webp";
import jCaraMelo from "@/assets/images/jamalia/CaraMelo.webp";
import jCrunchyMelo from "@/assets/images/jamalia/CrunchyMelo.webp";
import jMeloFamily from "@/assets/images/jamalia/MeloFamily.webp";

const NUM_SECTIONS = 4;
const ORANGE = "#e7501e";

// ── Section 1 — Brand Presentation ───────────────────────────────────────────
function Section1({
  t,
  isDark,
}: {
  t: ReturnType<typeof useTranslations<"Jamalia">>;
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
          src={jJ00}
          alt="Jamalia Group"
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
          backgroundColor: "#1c1c1c",
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

// ── Section 2 — Agency Mandate ────────────────────────────────────────────────
function Section2({
  t,
  isDark,
}: {
  t: ReturnType<typeof useTranslations<"Jamalia">>;
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
      }}
    >
      {/* Left column — orange text block (~40%) */}
      <div
        style={{
          width: "30%",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "4rem 3rem 4rem 5rem",
        }}
      >
        {/* Arrow sits outside, above-left of the orange block */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "4rem" }}>
          <ArrowDecor
            direction="down"
            size={15}
            style={{ flexShrink: 0, marginTop: "0.4rem" }}
          />
          <div
            style={{
              backgroundColor: ORANGE,
              padding: "2.25rem 2rem",
            }}
          >
            <BodyParagraphs
              content={t.raw("s2.body") as string | string[]}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                lineHeight: 1.6,
                color: "#191919",
                fontWeight: 500,
              }}
            />
          </div>
        </div>
      </div>

      {/* Right column — T-Shirts image (~60%) */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "4rem 5rem 4rem 2rem",
        }}
      >
        <Image
          src={jTShirts}
          alt="Jamalia T-Shirts"
          style={{ width: "90%", height: "auto", display: "block" }}
        />
      </div>
    </section>
  );
}

// ── Section 3 — stub ──────────────────────────────────────────────────────────
function Section3({
  t,
  isDark,
}: {
  t: ReturnType<typeof useTranslations<"Jamalia">>;
  isDark: boolean;
}) {
  const CARD_BG = "#1c1c1c";
  const bg = isDark ? "#0f0f0f" : "#f0ede8";

  const textMuted = "rgba(255,255,255,0.60)";

  function TextCard({
    title,
    sub,
    body,
  }: {
    title: string;
    sub?: string;
    body: string;
  }) {
    return (
      <div style={{ backgroundColor: CARD_BG, padding: "1.25rem 1.5rem" }}>
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
            style={{ flexShrink: 0, marginTop: "0.6rem" }}
          />
          <p style={{ margin: 0 }}>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.2,
              }}
            >
              {title}
            </span>
            {sub && (
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-sm)",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: textMuted,
                  marginLeft: "0.3rem",
                }}
              >
                {sub}
              </span>
            )}
          </p>
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
          {body}
        </p>
      </div>
    );
  }

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
        alignItems: "stretch",
      }}
    >
      {/* ── Left column — orange label + 2 text cards ── */}
      <div
        style={{
          width: "42%",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "4rem 2rem 4rem 5rem",
          gap: "1rem",
        }}
      >

        <TextCard title={t("s3.p1_title")} body={t("s3.p1_body")} />
        <TextCard title={t("s3.p2_title")} body={t("s3.p2_body")} />
      </div>

      {/* ── Right column — 3 text cards ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "4rem 5rem 4rem 2rem",
          gap: "1rem",
        }}
      >
        <TextCard title={t("s3.p3_title")} body={t("s3.p3_body")} />
        <TextCard
          title={t("s3.p4_title")}
          sub={t("s3.p4_sub")}
          body={t("s3.p4_body")}
        />
        <TextCard
          title={t("s3.p5_title")}
          sub={t("s3.p5_sub")}
          body={t("s3.p5_body")}
        />
      </div>
    </section>
  );
}

// ── Section 4 — Results ───────────────────────────────────────────────────────
function Section4({
  t,
  isDark,
}: {
  t: ReturnType<typeof useTranslations<"Jamalia">>;
  isDark: boolean;
}) {
  const CARD_BG = "#1c1c1c";
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
        alignItems: "stretch",
      }}
    >
      {/* ── Column 1 — J000 centred (40%) ── */}
      <div
        style={{
          width: "40%",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={jJ000.src}
          alt="Jamalia products"
          style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto", display: "block" }}
        />
      </div>

      {/* ── Column 2 — CrunchyMelo + CaraMelo stacked (20%) ── */}
      <div
        style={{
          width: "20%",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "3rem 1rem",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={jCrunchyMelo.src}
          alt="CrunchyMelo"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={jCaraMelo.src}
          alt="CaraMelo"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* ── Column 3 — MeloFamily + dark text card (40%) ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "3rem 4rem 3rem 1rem",
          gap: "1rem",
        }}
      >


        {/* MeloFamily image */}
        <div style={{ flex: 1, overflow: "hidden" }}>
          <Image
            src={jMeloFamily}
            alt="Melo Family"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
          />
        </div>

        {/* Dark text card */}
        <div style={{ backgroundColor: CARD_BG, padding: "1.5rem 1.75rem" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", marginBottom: "0.6rem" }}>
            <ArrowDecor direction="right" size={9} style={{ flexShrink: 0, marginTop: "0.2rem" }} />
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
    </section>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function Jamalia() {
  const t = useTranslations("Jamalia");
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
    <main data-page-name="jamalia">
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

// suppress unused import warnings for future sections
void jJ000;
void jCaraMelo;
void jCrunchyMelo;
void jMeloFamily;
