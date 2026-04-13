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
import hcSite from "@/assets/images/heartchoice/site.webp";
import hcNotepad from "@/assets/images/heartchoice/Notepad-Branding-2.webp";
import hcHC00 from "@/assets/images/heartchoice/H-C00.webp";
import hc012 from "@/assets/images/heartchoice/012.webp";
import hc013 from "@/assets/images/heartchoice/013.webp";
import hc014 from "@/assets/images/heartchoice/014.webp";
import hc015 from "@/assets/images/heartchoice/015.webp";
import hcImg6418 from "@/assets/images/heartchoice/IMG_6418.webp";
import hcImg6421 from "@/assets/images/heartchoice/IMG_6421.webp";
import hcImg6422 from "@/assets/images/heartchoice/IMG_6422.webp";
import hcImg6423 from "@/assets/images/heartchoice/IMG_6423.webp";
import hcImg6424 from "@/assets/images/heartchoice/IMG_6424.webp";
import hcImg6425 from "@/assets/images/heartchoice/IMG_6425.webp";

const NUM_SECTIONS = 4;
const ORANGE = "#e7501e";

// ── Shared orange card ────────────────────────────────────────────────────────
function OrangeCard({
  title,
  body,
  style,
}: {
  title: string;
  body: string | string[];
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: ORANGE,
        padding: "2rem 2.25rem",
        zIndex: 4,
        ...style,
      }}
    >
      {/* Arrow + title row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "1rem",
          marginBottom: "1.25rem",
        }}
      >
        <Html
          as="h2"
          html={title}
          style={{
            fontFamily: "var(--font-title)",
            fontSize: "clamp(1.5rem, 2.2vw, 2rem)",
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: "#191919",
          }}
        />
      </div>
      {/* Body */}
      <BodyParagraphs
        content={body}
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-sm)",
          lineHeight: 1.3,
          color: "#191919",
          fontWeight: 500,
        }}
      />
    </div>
  );
}

// ── Section 1 — Brand Presentation ───────────────────────────────────────────
function Section1({
  t,
  isDark,
}: {
  t: ReturnType<typeof useTranslations<"HeartChoice">>;
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
      {/* Site screenshot — centred, ~68% wide */}
      <div
        style={{
          position: "relative",
          width: "70%",
          flexShrink: 0,
        }}
      >
        <Image
          src={hcSite}
          alt="Heart Choice website"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* Orange card — top right, overlapping image */}
      <OrangeCard
        title={t.raw("s1.title") as string}
        body={t.raw("s1.body") as string | string[]}
        style={{
          top: "8%",
          right: "7rem",
          width: "clamp(280px, 28vw, 400px)",
        }}
      />
    </section>
  );
}

// ── Section 2 — Agency Challenge ─────────────────────────────────────────────
function Section2({
  t,
  isDark,
}: {
  t: ReturnType<typeof useTranslations<"HeartChoice">>;
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
      }}
    >
      {/* Notepad — fills right ~75% of the section, full height */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={hcNotepad}
          alt="Heart Choice brand notepad"
          style={{
            objectFit: "contain",
            objectPosition: "center",
            height: "70%",
          }}
        />
        {/* left-edge scrim to blend with H-C00 */}
      </div>

      {/* H-C00 — left side, vertically centred, overlaps notepad edge */}
      <div
        style={{
          position: "absolute",
          left: "10rem",
          top: "50%",
          transform: "translateY(-50%)",
          width: "clamp(220px, 32vw, 440px)",
          zIndex: 2,
        }}
      >
        <Image
          src={hcHC00}
          alt="Heart Choice brand identity"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* Orange card — top right */}
      <OrangeCard
        title={t.raw("s2.title") as string}
        body={t.raw("s2.body") as string | string[]}
        style={{
          top: "6%",
          right: "15rem",
          width: "clamp(260px, 26vw, 400px)",
          zIndex: 5,
        }}
      />
    </section>
  );
}

// ── Section 3 — Our Response ─────────────────────────────────────────────────
function Section3({
  t,
  isDark,
}: {
  t: ReturnType<typeof useTranslations<"HeartChoice">>;
  isDark: boolean;
}) {
  const CARD_BG = "#1c1c1c";
  const bg = isDark ? "#0f0f0f" : "#f0ede8";
  const textMuted = "rgba(255,255,255,0.65)";
  const col1Points = t.raw("s3.col1_points") as string[];
  const col2Points = t.raw("s3.col2_points") as string[];

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
      {/* ── Mosaic — 75vw wide, 70vh tall, natural aspect ratios ─── */}
      <div
        style={{
          width: "75vw",
          height: "70vh",
          display: "flex",
          gap: "1rem",
          flexShrink: 0,
        }}
      >
        {/* Left column — 50% */}
        <div
          style={{
            width: "50%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {/* Top row: two side-by-side images */}
          <div
            style={{
              flex: 1,
              display: "flex",
              gap: "1rem",
              overflow: "hidden",
              alignItems: "flex-end",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hc013.src}
              alt=""
              style={{ width: "50%", height: "auto", display: "block" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hc014.src}
              alt=""
              style={{ width: "50%", height: "auto", display: "block" }}
            />
          </div>
          {/* Bottom row: wide image */}
          <div style={{ flex: 1.15, overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hc012.src}
              alt=""
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </div>

        {/* Right column — 50% */}
        <div style={{ width: "50%", height: "100%", overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={hc015.src}
            alt=""
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </div>

      {/* Dark text card — absolute bottom-centre, overlays mosaic */}
      <div
        style={{
          position: "absolute",
          bottom: "8rem",
          left: "70%",
          transform: "translateX(-50%)",
          zIndex: 3,
          backgroundColor: CARD_BG,
          padding: "2.5rem 4.25rem",
          width: "clamp(560px, 66vw, 960px)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2.5rem",
        }}
      >
        {/* Column 1 — ArrowDecor before each point */}
        <div>
          <Html
            as="h4"
            html={t.raw("s3.col1_title") as string}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: ORANGE,
              marginBottom: "1rem",
            }}
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {col1Points.map((point, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.6rem",
                }}
              >
                <ArrowDecor
                  direction="right"
                  size={9}
                  style={{ flexShrink: 0, marginTop: "0.25rem" }}
                />
                <p
                  dangerouslySetInnerHTML={{ __html: point }}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-sm)",
                    lineHeight: 1.65,
                    color: textMuted,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Column 2 — plain text, no decoration */}
        <div>
          <Html
            as="h4"
            html={t.raw("s3.col2_title") as string}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: ORANGE,
              marginBottom: "1rem",
            }}
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {col2Points.map((point, i) => (
              <p
                key={i}
                dangerouslySetInnerHTML={{ __html: point }}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-sm)",
                  lineHeight: 1.65,
                  color: textMuted,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Zigzag trend line ─────────────────────────────────────────────────────────
function ZigzagLine() {
  return (
    <svg
      viewBox="0 0 72 14"
      width="72"
      height="14"
      style={{ display: "block", flexShrink: 0, margin: "0.5rem 0" }}
    >
      <polyline
        points="0,10 12,4 24,10 36,4 48,10 60,4 72,10"
        stroke={ORANGE}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Section 4 — Results ───────────────────────────────────────────────────────
const IMG_MOSAIC = [hcImg6418, hcImg6421, hcImg6422, hcImg6423, hcImg6424, hcImg6425];

function Section4({
  t,
  isDark,
}: {
  t: ReturnType<typeof useTranslations<"HeartChoice">>;
  isDark: boolean;
}) {
  const CARD_BG = "#1c1c1c";
  const bg = isDark ? "#0f0f0f" : "#f0ede8";
  const textMuted = "rgba(255,255,255,0.55)";
  const labelColor = "rgba(255,255,255,0.45)";

  const stats = [
    { label: t("s4.stat1_label"), from: t("s4.stat1_from"), to: t("s4.stat1_to") },
    { label: t("s4.stat2_label"), from: t("s4.stat2_from"), to: t("s4.stat2_to") },
    { label: t("s4.stat3_label"), from: t("s4.stat3_from"), to: t("s4.stat3_to") },
  ];

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
      {/* ── Left panel ── */}
      <div
        style={{
          width: "44%",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "4rem 3rem 4rem 5rem",
          gap: "1.75rem",
          zIndex: 2,
        }}
      >


        {/* Stats card */}
        <div style={{ backgroundColor: CARD_BG, padding: "1.75rem 2rem" }}>
          {/* Intro line */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              fontWeight: 500,
              color: labelColor,
              letterSpacing: "0.03em",
              marginBottom: "1.5rem",
            }}
          >
            {t("s4.stats_intro")}
          </p>

          {/* Stats row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
            }}
          >
            {stats.map((s, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column" }}>
                {/* Label — muted, not orange */}
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-xs)",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: labelColor,
                    marginBottom: "0.4rem",
                  }}
                >
                  {s.label}
                </span>

                {/* From value — white */}
                <span
                  style={{
                    fontFamily: "var(--font-title)",
                    fontSize: "clamp(0.9rem, 1.2vw, 1rem)",
                    fontWeight: 700,
                    lineHeight: 1,
                    color: "#ffffff",
                  }}
                >
                  {s.from}
                </span>

                {/* Zigzag line */}
                <ZigzagLine />

                {/* To value — orange */}
                <span
                  style={{
                    fontFamily: "var(--font-title)",
                    fontSize: "clamp(1.2rem, 1.8vw, 1.7rem)",
                    fontWeight: 700,
                    lineHeight: 1,
                    color: ORANGE,
                  }}
                >
                  {s.to}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            lineHeight: 1.75,
            color: textMuted,
            maxWidth: "40ch",
          }}
        >
          {t("s4.description")}
        </p>
      </div>

      {/* ── Right panel — image grid, not full height ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          padding: "4rem 4rem 4rem 2rem",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(2, 1fr)",
            gap: "1rem",
          }}
        >
          {IMG_MOSAIC.map((img, i) => (
            <div key={i} style={{ overflow: "hidden", borderRadius: "2px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function HeartChoice() {
  const t = useTranslations("HeartChoice");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  useEffect(() => {
    setMounted(true);
  }, []);

  // GSAP horizontal scroll
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

  // Nav click → instant scroll jump
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
    <main data-page-name="heart-choice">
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

      {/* Outer pin container */}
      <div ref={outerRef}>
        {/* Horizontal track */}
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
