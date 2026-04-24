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

// ── Text rendering helpers ────────────────────────────────────────────────────

function Html({
  as: Tag = "span",
  html,
  style,
  className,
}: {
  as?: React.ElementType;
  html: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <Tag
      dangerouslySetInnerHTML={{ __html: html }}
      style={style}
      className={className}
    />
  );
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
          style={{ ...style, marginTop: i > 0 ? "0.85em" : 0 }}
        />
      ))}
    </>
  );
}

// ── Image assets ────────────────────────────────────────────────────────────
import acm00 from "@/assets/images/acm/ACM-00.webp";
import acm01 from "@/assets/images/acm/ACM-01.webp";
import acm02 from "@/assets/images/acm/ACM-02.webp";
import acm03 from "@/assets/images/acm/ACM-03.webp";
import acm04 from "@/assets/images/acm/ACM-04.webp";
import sem1 from "@/assets/images/acm/Sem1.webp";
import sem2 from "@/assets/images/acm/Sem2.webp";
import sem3 from "@/assets/images/acm/Sem3.webp";
import billboard from "@/assets/images/acm/Billboard.webp";

const NUM_SECTIONS = 4;
const ORANGE = "#e7501e";

// ── Shared text style helpers ────────────────────────────────────────────────
const labelStyle = (color = "rgba(255,255,255,0.55)"): React.CSSProperties => ({
  fontFamily: "var(--font-body)",
  fontSize: "0.68rem",
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color,
  marginBottom: "1.5rem",
});

const heading = (color = "#ffffff"): React.CSSProperties => ({
  fontFamily: "var(--font-title)",
  fontSize: "clamp(1.6rem, 3vw, 2.8rem)",
  fontWeight: 700,
  lineHeight: 1.1,
  letterSpacing: "-0.02em",
  color,
  marginBottom: "1.5rem",
});

const body = (color = "rgba(255,255,255,0.72)"): React.CSSProperties => ({
  fontFamily: "var(--font-body)",
  fontSize: "var(--text-sm)",
  lineHeight: 1.75,
  color,
});

// ── Section 1 — Brand Presentation ──────────────────────────────────────────
function Section1({
  t,
  isDark,
}: {
  t: ReturnType<typeof useTranslations<"AccentMedia">>;
  isDark: boolean;
}) {
  const bg = isDark ? "#0f0f0f" : "#f5f0eb";
  const textPrimary = isDark ? "#ffffff" : "#1a1a1a";
  const textMuted = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.40)";
  const cardBorder = isDark ? "rgba(231, 80, 30,0.7)" : "rgba(0,0,0,0.07)";

  const entities = [
    {
      name: t("s1.e1_name"),
      desc: t("s1.e1_desc"),
      tag: "AMTech",
      logo: acm01,
    },
    { name: t("s1.e2_name"), desc: t("s1.e2_desc"), tag: "AMP", logo: acm02 },
  ];

  return (
    <section
      style={{
        width: "100vw",
        height: "100vh",
        flexShrink: 0,
        display: "flex",
        flexDirection: "row",
        backgroundColor: bg,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 1.25rem 0 1.75rem",
          marginLeft: "4rem",
          marginRight: "2rem",
          flexShrink: 0,
        }}
      >
        <ArrowDecor direction="down" size={14} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "35%",
          flexShrink: 0,
          padding: "10rem 0",
        }}
      >
        <div
          style={{
            backgroundColor: ORANGE,
            padding: "3rem 5rem",
            height: "72%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Html
            as="h1"
            html={t("s1.title")}
            style={{
              fontFamily: "var(--font-title)",
              fontSize: "clamp(1.4rem, 2.6vw, 2.6rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "rgba(0,0,0,0.92)",
              marginBottom: "1.5rem",
            }}
          />
          <BodyParagraphs
            content={t.raw("s1.body") as string | string[]}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              lineHeight: 1.55,
              fontWeight: 600,
              color: "rgba(0,0,0,0.75)",
            }}
          />
        </div>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "end",
          justifyContent: "center",
          overflow: "hidden",
          height: "100%",
          marginLeft: "-15rem",
        }}
      >
        <Image
          src={acm00}
          alt="Accent Media kiosk"
          style={{
            width: "auto",
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "contain",
            aspectRatio: 2449 / 3327,
          }}
        />
      </div>
      <div
        style={{
          width: "30%",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "4rem 4rem 4rem 0rem",
          gap: "1.5rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            lineHeight: 1.6,
            color: textMuted,
          }}
        >
          {t("s1.entities_intro")}
        </p>
        {entities.map((e) => (
          <div
            key={e.tag}
            style={{
              display: "flex",
              position: "relative",
              alignItems: "center",
              gap: "1.25rem",
              padding: "1.25rem 1.5rem",
              border: `1px solid ${cardBorder}`,
            }}
          >
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  color: textPrimary,
                  marginBottom: "0.35rem",
                }}
              >
                {e.name}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  lineHeight: 1.55,
                  color: textMuted,
                }}
              >
                {e.desc}
              </p>
            </div>
            <Image
              src={e.logo}
              alt={e.tag}
              width={100}
              style={{ objectFit: "contain", flexShrink: 0 }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Section 2 — The Challenge ────────────────────────────────────────────────
function Section2({
  t,
  isDark,
}: {
  t: ReturnType<typeof useTranslations<"AccentMedia">>;
  isDark: boolean;
}) {
  const bg = isDark ? "#0f0f0f" : "#f5f0eb";

  return (
    <section
      style={{
        width: "100vw",
        height: "100vh",
        flexShrink: 0,
        display: "grid",
        gridTemplateColumns: "1fr 0.6fr",
        backgroundColor: bg,
        overflow: "hidden",
        padding: "5rem",
      }}
    >
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={billboard}
          alt="Accent Media context"
          fill
          style={{ objectFit: "contain", objectPosition: "center" }}
          sizes="60vw"
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
          gap: "6rem",
        }}
      >
        <div
          style={{
            backgroundColor: ORANGE,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "3rem 3.5rem",
            width: "70%",
            marginLeft: "-4rem",
            zIndex: 1,
          }}
        >
          <Html
            as="h2"
            html={t("s2.title")}
            style={{
              ...heading("#ffffff"),
              fontSize: "clamp(1.2rem, 2.2vw, 2rem)",
            }}
          />
          <BodyParagraphs
            content={t.raw("s2.body") as string | string[]}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              lineHeight: 1.55,
              fontWeight: 600,
              color: "rgba(0,0,0,0.75)",
            }}
          />
        </div>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <Image
            src={acm03}
            alt="Accent Media team"
            style={{
              objectFit: "contain",
              objectPosition: "center",
              height: "25rem",
            }}
          />
        </div>
      </div>
    </section>
  );
}

// ── Section 3 — Agency Response ──────────────────────────────────────────────
function Section3({
  t,
  isDark,
}: {
  t: ReturnType<typeof useTranslations<"AccentMedia">>;
  isDark: boolean;
}) {
  const bg = isDark ? "#0f0f0f" : "#f5f0eb";
  const textPrimary = isDark ? "#ffffff" : "#1a1a1a";
  const bodyColor = isDark ? "rgba(255,255,255,0.58)" : "rgba(0,0,0,0.55)";

  const cols = [
    {
      title: t("s3.col1_title"),
      body: t.raw("s3.col1_body") as string | string[],
    },
    {
      title: t("s3.col2_title"),
      body: t.raw("s3.col2_body") as string | string[],
    },
    {
      title: t("s3.col3_title"),
      body: t.raw("s3.col3_body") as string | string[],
    },
  ];

  return (
    <section
      style={{
        width: "100vw",
        height: "100vh",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        backgroundColor: bg,
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "4rem 5rem 2.5rem" }}>
        <div
          style={{
            ...labelStyle(
              isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.40)",
            ),
            marginBottom: "3rem",
          }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 0,
          }}
        >
          {cols.map((col, i) => (
            <div
              key={i}
              style={{
                paddingLeft: i > 0 ? "2.5rem" : 0,
                paddingRight: i < 2 ? "2.5rem" : 0,
                borderLeft:
                  i > 0
                    ? `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`
                    : undefined,
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "row", gap: "1rem" }}
              >
                <ArrowDecor
                  direction="right"
                  size={15}
                  style={{ marginBottom: "0.75rem" }}
                />
                <Html
                  as="h3"
                  html={col.title}
                  style={{
                    ...heading(textPrimary),
                    fontSize: "clamp(0.95rem, 1.6vw, 1.4rem)",
                    marginBottom: "1rem",
                  }}
                />
              </div>
              <div
                style={{
                  borderLeft: `2px solid ${ORANGE}`,
                  paddingLeft: "0.9rem",
                }}
              >
                <BodyParagraphs content={col.body} style={body(bodyColor)} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <Image
          src={acm04}
          alt="Accent Media kiosks"
          fill
          style={{ objectFit: "contain", objectPosition: "bottom center" }}
          sizes="100vw"
        />
      </div>
    </section>
  );
}

// ── Section 4 — Results ──────────────────────────────────────────────────────
function ResultCard({
  title,
  bodyContent,
}: {
  title: string;
  bodyContent: string | string[];
}) {
  return (
    <div
      style={{
        backgroundColor: "#242424",
        padding: "1.5rem 1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
      >
        <ArrowDecor
          direction="right"
          size={14}
          style={{ marginTop: "0.2rem", flexShrink: 0 }}
        />
        <Html
          as="h3"
          html={title}
          style={{
            fontFamily: "var(--font-title)",
            fontSize: "clamp(0.95rem, 1.5vw, 1.25rem)",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.2,
            fontStyle: "italic",
          }}
        />
      </div>
      <div style={{ borderLeft: `2px solid ${ORANGE}`, paddingLeft: "0.9rem" }}>
        <BodyParagraphs
          content={bodyContent}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.58)",
          }}
        />
      </div>
    </div>
  );
}

function Section4({
  t,
  isDark,
}: {
  t: ReturnType<typeof useTranslations<"AccentMedia">>;
  isDark: boolean;
}) {
  const bg = isDark ? "#0f0f0f" : "#f5f0eb";
  const results = [
    {
      title: t("s4.r1_title"),
      body: t.raw("s4.r1_body") as string | string[],
      img: sem1,
      textPos: "top",
    },
    {
      title: t("s4.r2_title"),
      body: t.raw("s4.r2_body") as string | string[],
      img: sem2,
      textPos: "bottom",
    },
    {
      title: t("s4.r3_title"),
      body: t.raw("s4.r3_body") as string | string[],
      img: sem3,
      textPos: "top",
    },
  ];

  return (
    <section
      style={{
        width: "100vw",
        height: "100vh",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        backgroundColor: bg,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          padding: "5rem 5rem 2.5rem",
          flexShrink: 0,
        }}
      />
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "3rem",
          padding: "0 5rem 3.5rem",
          minHeight: 0,
        }}
      >
        {results.map((r, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent:
                r.textPos === "bottom" ? "flex-end" : "flex-start",
              gap: 0,
              height: "100%",
              overflow: "hidden",
            }}
          >
            {r.textPos === "top" && (
              <ResultCard title={r.title} bodyContent={r.body} />
            )}
            <div
              style={{
                position: "relative",
                flex: 1,
                minHeight: 0,
                overflow: "hidden",
              }}
            >
              <Image
                src={r.img}
                alt={r.title}
                fill
                style={{
                  objectFit: "contain",
                  objectPosition: r.textPos === "top" ? "bottom" : "top",
                }}
                sizes="30vw"
              />
            </div>
            {r.textPos === "bottom" && (
              <ResultCard title={r.title} bodyContent={r.body} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE LAYOUT
// ─────────────────────────────────────────────────────────────────────────────

type SectionRef = (el: HTMLElement | null) => void;
type T = ReturnType<typeof useTranslations<"AccentMedia">>;

function MobileSection1({
  t,
  isDark,
  sectionRef,
}: {
  t: T;
  isDark: boolean;
  sectionRef: SectionRef;
}) {
  const bg = isDark ? "#0f0f0f" : "#f5f0eb";
  const textPrimary = isDark ? "#ffffff" : "#1a1a1a";
  const textMuted = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.40)";
  const cardBorder = isDark ? "rgba(231,80,30,0.7)" : "rgba(0,0,0,0.07)";
  const entities = [
    {
      name: t("s1.e1_name"),
      desc: t("s1.e1_desc"),
      tag: "AMTech",
      logo: acm01,
    },
    { name: t("s1.e2_name"), desc: t("s1.e2_desc"), tag: "AMP", logo: acm02 },
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
      className="max-lg:pt-16"
    >
      {/* Kiosk image */}
      <div
        style={{
          position: "relative",
          height: "45vh",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        <Image
          src={acm00}
          alt="Accent Media kiosk"
          fill
          style={{ objectFit: "contain", objectPosition: "bottom center" }}
          sizes="100vw"
          priority
        />
      </div>

      {/* Text content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          padding: "0rem 1.25rem 3rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
          <ArrowDecor
            direction="down"
            size={12}
            style={{ marginTop: "0.5rem", flexShrink: 0 }}
            className="max-[425px]:hidden!"
          />
          <div style={{ backgroundColor: ORANGE, padding: "1.75rem", flex: 1 }}>
            <Html
              as="h1"
              html={t("s1.title")}
              style={{
                fontFamily: "var(--font-title)",
                fontSize: "clamp(1.35rem, 5vw, 2rem)",
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: "rgba(0,0,0,0.92)",
                marginBottom: "1rem",
              }}
            />
            <BodyParagraphs
              content={t.raw("s1.body") as string | string[]}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                lineHeight: 1.55,
                fontWeight: 600,
                color: "rgba(0,0,0,0.75)",
              }}
            />
          </div>
        </div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            lineHeight: 1.6,
            color: textMuted,
          }}
        >
          {t("s1.entities_intro")}
        </p>
        {entities.map((e) => (
          <div
            key={e.tag}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.25rem",
              padding: "1.25rem 1.5rem",
              border: `1px solid ${cardBorder}`,
            }}
            className="max-[425px]:flex-col"
          >
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  color: textPrimary,
                  marginBottom: "0.35rem",
                }}
              >
                {e.name}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  lineHeight: 1.55,
                  color: textMuted,
                }}
              >
                {e.desc}
              </p>
            </div>
            <Image
              src={e.logo}
              alt={e.tag}
              width={80}
              style={{ objectFit: "contain", flexShrink: 0 }}
            />
          </div>
        ))}
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
  const bg = isDark ? "#0f0f0f" : "#f5f0eb";

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
      {/* Billboard image */}
      <div
        style={{
          position: "relative",
          height: "42vh",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        <Image
          src={billboard}
          alt="Accent Media billboard"
          fill
          style={{ objectFit: "contain", objectPosition: "center" }}
          sizes="100vw"
        />
      </div>

      {/* Orange challenge card */}
      <div
        style={{
          padding: "2rem 1.25rem 1.5rem",
          display: "flex",
          alignItems: "flex-start",
          gap: "1rem",
        }}
      >
        <div style={{ backgroundColor: ORANGE, padding: "1.75rem", flex: 1 }}>
          <Html
            as="h2"
            html={t("s2.title")}
            style={{
              fontFamily: "var(--font-title)",
              fontSize: "clamp(1.3rem, 5vw, 2rem)",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              marginBottom: "1rem",
            }}
          />
          <BodyParagraphs
            content={t.raw("s2.body") as string | string[]}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              lineHeight: 1.55,
              fontWeight: 600,
              color: "rgba(0,0,0,0.75)",
            }}
          />
        </div>
      </div>

      {/* Team image */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0.5rem 1.25rem 3rem",
        }}
      >
        <Image
          src={acm03}
          alt="Accent Media team"
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "30vh",
            objectFit: "contain",
          }}
        />
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
  const bg = isDark ? "#0f0f0f" : "#f5f0eb";
  const textPrimary = isDark ? "#ffffff" : "#1a1a1a";
  const bodyColor = isDark ? "rgba(255,255,255,0.58)" : "rgba(0,0,0,0.55)";

  const cols = [
    {
      title: t("s3.col1_title"),
      body: t.raw("s3.col1_body") as string | string[],
    },
    {
      title: t("s3.col2_title"),
      body: t.raw("s3.col2_body") as string | string[],
    },
    {
      title: t("s3.col3_title"),
      body: t.raw("s3.col3_body") as string | string[],
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
      {/* 3 response cards */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "4.5rem 1.25rem 1.5rem",
        }}
      >
        {cols.map((col, i) => (
          <div key={i}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
                marginBottom: "0.5rem",
              }}
            >
              <ArrowDecor
                direction="right"
                size={11}
                style={{ flexShrink: 0, marginTop: "0.25rem" }}
              />
              <Html
                as="h3"
                html={col.title}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  lineHeight: 1.3,
                  color: textPrimary,
                }}
              />
            </div>
            <div
              style={{
                borderLeft: `2px solid ${ORANGE}`,
                paddingLeft: "0.9rem",
                marginLeft: "1.5rem",
              }}
            >
              <BodyParagraphs content={col.body} style={body(bodyColor)} />
            </div>
          </div>
        ))}
      </div>

      {/* Kiosks image */}
      <div
        style={{
          height: "42vh",
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Image
          src={acm04}
          alt="Accent Media kiosks"
          fill
          style={{ objectFit: "contain", objectPosition: "bottom center" }}
          sizes="100vw"
        />
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
  const bg = isDark ? "#0f0f0f" : "#f5f0eb";
  const results = [
    {
      title: t("s4.r1_title"),
      body: t.raw("s4.r1_body") as string | string[],
      img: sem1,
    },
    {
      title: t("s4.r2_title"),
      body: t.raw("s4.r2_body") as string | string[],
      img: sem2,
    },
    {
      title: t("s4.r3_title"),
      body: t.raw("s4.r3_body") as string | string[],
      img: sem3,
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
          gap: "2rem",
          padding: "4.5rem 1.25rem 3rem",
        }}
      >
        {results.map((r, i) => (
          <div
            key={i}
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            <div
              style={{
                height: "28vh",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Image
                src={r.img}
                alt={r.title}
                fill
                style={{ objectFit: "contain", objectPosition: "center" }}
                sizes="100vw"
              />
            </div>
            <ResultCard title={r.title} bodyContent={r.body} />
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Root component ───────────────────────────────────────────────────────────
export default function AccentMedia() {
  const t = useTranslations("AccentMedia");
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

  // Mobile: IntersectionObserver to track section in view
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
    if (!triggers.length) return;
    const st = triggers[0];
    const targetProgress = index / Math.max(NUM_SECTIONS - 1, 1);
    window.scrollTo(0, st.start + (st.end - st.start) * targetProgress);
  };

  return (
    <main data-page-name="accent-media">
      {/* Desktop layout — always in DOM so GSAP pin never loses its node */}
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

      {/* Mobile layout — vertical stack, always in DOM */}
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
            <PageAnnotation line1="Accent" line2="Media" />
          </>,
          document.body,
        )}
    </main>
  );
}
