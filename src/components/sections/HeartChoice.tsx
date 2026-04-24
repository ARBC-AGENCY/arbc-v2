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
      <div style={{ position: "relative", width: "70%", flexShrink: 0 }}>
        <Image
          src={hcSite}
          alt="Heart Choice website"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
      <OrangeCard
        title={t.raw("s1.title") as string}
        body={t.raw("s1.body") as string | string[]}
        style={{ top: "8%", right: "7rem", width: "clamp(280px, 28vw, 400px)" }}
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
      </div>
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
      <div
        style={{
          width: "75vw",
          height: "70vh",
          display: "flex",
          gap: "1rem",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: "50%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
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
          <div style={{ flex: 1.15, overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hc012.src}
              alt=""
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </div>
        <div style={{ width: "50%", height: "100%", overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={hc015.src}
            alt=""
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </div>
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
const IMG_MOSAIC = [
  hcImg6418,
  hcImg6421,
  hcImg6422,
  hcImg6423,
  hcImg6424,
  hcImg6425,
];

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
    {
      label: t("s4.stat1_label"),
      from: t("s4.stat1_from"),
      to: t("s4.stat1_to"),
    },
    {
      label: t("s4.stat2_label"),
      from: t("s4.stat2_from"),
      to: t("s4.stat2_to"),
    },
    {
      label: t("s4.stat3_label"),
      from: t("s4.stat3_from"),
      to: t("s4.stat3_to"),
    },
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
        <div style={{ backgroundColor: CARD_BG, padding: "1.75rem 2rem" }}>
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
            }}
          >
            {stats.map((s, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column" }}>
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
                <ZigzagLine />
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
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE LAYOUT
// ─────────────────────────────────────────────────────────────────────────────

type SectionRef = (el: HTMLElement | null) => void;
type T = ReturnType<typeof useTranslations<"HeartChoice">>;

function MobileSection1({
  t,
  isDark,
  sectionRef,
}: {
  t: T;
  isDark: boolean;
  sectionRef: SectionRef;
}) {
  const bg = isDark ? "#0f0f0f" : "#f0ede8";

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: bg,
        overflow: "hidden",
      }}
      className="max-lg:justify-center "
    >
      {/* Site screenshot */}
      <div
        style={{
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
        }}
        className="max-sm:h-[40vh] sm:h-[45vh]"
      >
        <Image
          src={hcSite}
          alt="Heart Choice website"
          fill
          style={{ objectFit: "contain", objectPosition: "center" }}
          sizes="100vw"
          priority
        />
      </div>

      {/* Orange card */}
      <div
        style={{
          padding: "2rem 1.25rem 3rem",
          display: "flex",
          flexDirection: "column",
          gap: "0",
        }}
      >
        <div style={{ backgroundColor: ORANGE, padding: "1.75rem 1.75rem" }}>
          <Html
            as="h2"
            html={t.raw("s1.title") as string}
            style={{
              fontFamily: "var(--font-title)",
              fontSize: "clamp(1.35rem, 5vw, 2rem)",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: "#191919",
              marginBottom: "1rem",
            }}
          />
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
      </div>
    </section>
  );
}

function MobileSection2({
  t,
  isDark,
  sectionRef,
}: {
  t: T;
  isDark: boolean;
  sectionRef: SectionRef;
}) {
  const bg = isDark ? "#0f0f0f" : "#f0ede8";

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: bg,
        overflow: "hidden",
      }}
    >
      {/* Brand identity image */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "4.5rem 2rem 1.5rem",
        }}
      >
        <Image
          src={hcHC00}
          alt="Heart Choice brand identity"
          style={{ width: "70%", height: "auto", display: "block" }}
        />
      </div>

      {/* Notepad image (small) */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "0 2rem 1.5rem",
        }}
      >
        <Image
          src={hcNotepad}
          alt="Heart Choice notepad"
          style={{ width: "55%", height: "auto", display: "block" }}
        />
      </div>

      {/* Orange card */}
      <div style={{ padding: "0 1.25rem 3rem" }}>
        <div style={{ backgroundColor: ORANGE, padding: "1.75rem 1.75rem" }}>
          <Html
            as="h2"
            html={t.raw("s2.title") as string}
            style={{
              fontFamily: "var(--font-title)",
              fontSize: "clamp(1.35rem, 5vw, 2rem)",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: "#191919",
              marginBottom: "1rem",
            }}
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
      </div>
    </section>
  );
}

function MobileSection3({
  t,
  isDark,
  sectionRef,
}: {
  t: T;
  isDark: boolean;
  sectionRef: SectionRef;
}) {
  const CARD_BG = "#1c1c1c";
  const bg = isDark ? "#0f0f0f" : "#f0ede8";
  const textMuted = "rgba(255,255,255,0.65)";
  const col1Points = t.raw("s3.col1_points") as string[];
  const col2Points = t.raw("s3.col2_points") as string[];

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: bg,
        overflow: "hidden",
      }}
    >
      {/* 2-col image mosaic (small) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.5rem",
          padding: "4.5rem 1.25rem 1.5rem",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <div style={{ display: "flex", gap: "0.5rem" }}>
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={hc012.src}
            alt=""
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={hc015.src}
          alt=""
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* Dark text card */}
      <div
        style={{
          flex: 1,
          padding: "0 1.25rem 3rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <div style={{ backgroundColor: CARD_BG, padding: "1.75rem 1.5rem" }}>
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
        <div style={{ backgroundColor: CARD_BG, padding: "1.75rem 1.5rem" }}>
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

function MobileSection4({
  t,
  isDark,
  sectionRef,
}: {
  t: T;
  isDark: boolean;
  sectionRef: SectionRef;
}) {
  const CARD_BG = "#1c1c1c";
  const bg = isDark ? "#0f0f0f" : "#f0ede8";
  const textMuted = "rgba(255,255,255,0.55)";
  const labelColor = "rgba(255,255,255,0.45)";

  const stats = [
    {
      label: t("s4.stat1_label"),
      from: t("s4.stat1_from"),
      to: t("s4.stat1_to"),
    },
    {
      label: t("s4.stat2_label"),
      from: t("s4.stat2_from"),
      to: t("s4.stat2_to"),
    },
    {
      label: t("s4.stat3_label"),
      from: t("s4.stat3_from"),
      to: t("s4.stat3_to"),
    },
  ];

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: bg,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          padding: "4.5rem 1.25rem 3rem",
        }}
      >
        {/* Stats card */}
        <div style={{ backgroundColor: CARD_BG, padding: "1.5rem" }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              fontWeight: 500,
              color: labelColor,
              marginBottom: "1.25rem",
            }}
          >
            {t("s4.stats_intro")}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "0.75rem",
            }}
          >
            {stats.map((s, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.6rem",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: labelColor,
                    marginBottom: "0.4rem",
                  }}
                >
                  {s.label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-title)",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    lineHeight: 1,
                    color: "#ffffff",
                  }}
                >
                  {s.from}
                </span>
                <ZigzagLine />
                <span
                  style={{
                    fontFamily: "var(--font-title)",
                    fontSize: "1.1rem",
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
          }}
        >
          {t("s4.description")}
        </p>

        {/* Image grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(2, 1fr)",
            gap: "0.5rem",
            height: "42vh",
          }}
        >
          {IMG_MOSAIC.map((img, i) => (
            <div key={i} style={{ overflow: "hidden", borderRadius: "2px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
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
  const [isDesktop, setIsDesktop] = useState(true);
  const [activeSection, setActiveSection] = useState(0);

  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileSectionRefs = useRef<(HTMLElement | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  const isDark = mounted ? resolvedTheme === "dark" : true;
  const sectionLabels = [t("nav.s1"), t("nav.s2"), t("nav.s3"), t("nav.s4")];

  // Mount + responsive detection
  useEffect(() => {
    setMounted(true);
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Desktop: GSAP horizontal scroll
  useEffect(() => {
    if (!isDesktop) return;
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
  }, [isDesktop]);

  // Mobile: IntersectionObserver
  useEffect(() => {
    if (isDesktop) return;
    const observers: IntersectionObserver[] = [];
    mobileSectionRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(i);
        },
        { threshold: 0.5 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [isDesktop]);

  const handleNavSelect = (index: number) => {
    if (!isDesktop) {
      mobileSectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    const outer = outerRef.current;
    if (!outer) return;
    const triggers = ScrollTrigger.getAll().filter(
      (st) => st.vars.trigger === outer,
    );
    const st = triggers[0];
    if (!st) return;
    const targetProgress = index / Math.max(NUM_SECTIONS - 1, 1);
    window.scrollTo(0, st.start + (st.end - st.start) * targetProgress);
  };

  return (
    <main data-page-name="heart-choice">
      {/* Desktop layout — always in DOM */}
      <div ref={outerRef} className={isDesktop ? "" : "hidden"}>
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

      {/* Mobile layout — always in DOM */}
      <div className={isDesktop ? "hidden" : ""}>
        <MobileSection1
          t={t}
          isDark={isDark}
          sectionRef={(el) => {
            mobileSectionRefs.current[0] = el;
          }}
        />
        <MobileSection2
          t={t}
          isDark={isDark}
          sectionRef={(el) => {
            mobileSectionRefs.current[1] = el;
          }}
        />
        <MobileSection3
          t={t}
          isDark={isDark}
          sectionRef={(el) => {
            mobileSectionRefs.current[2] = el;
          }}
        />
        <MobileSection4
          t={t}
          isDark={isDark}
          sectionRef={(el) => {
            mobileSectionRefs.current[3] = el;
          }}
        />
      </div>

      {mounted &&
        createPortal(
          <>
            <ProjectSectionNav
              sections={sectionLabels}
              activeIndex={activeSection}
              onSelect={handleNavSelect}
              mobileMode={!isDesktop}
            />
            <PageAnnotation line1={t("annotation1")} line2={t("annotation2")} />
          </>,
          document.body,
        )}
    </main>
  );
}
