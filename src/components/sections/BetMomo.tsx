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
          style={{ ...style, marginTop: i > 0 ? "0.85em" : 0 }}
        />
      ))}
    </>
  );
}

import bt00 from "@/assets/images/betmomo/BT00.webp";
import btHimra from "@/assets/images/betmomo/VideoSpot-Himra-CIV.webp";
import btLeague from "@/assets/images/betmomo/VideoSpot LeagueDesChampion.webp";
import btYeti from "@/assets/images/betmomo/yeti.webp";

const NUM_SECTIONS = 4;
const ORANGE = "#e7501e";

const bodyStyle = (color: string): React.CSSProperties => ({
  fontFamily: "var(--font-body)",
  fontSize: "var(--text-sm)",
  lineHeight: 1.75,
  color,
});

// ─────────────────────────────────────────────────────────────────────────────
// DESKTOP SECTIONS (unchanged — horizontal scroll layout)
// ─────────────────────────────────────────────────────────────────────────────

function Section1({
  t,
  isDark,
}: {
  t: ReturnType<typeof useTranslations<"BetMomo">>;
  isDark: boolean;
}) {
  const bg = isDark ? "#0f0f0f" : "#f0ede8";
  const textPrimary = isDark ? "#ffffff" : "#1a1a1a";
  const cardBg = isDark ? "rgba(20,20,20,0.85)" : "rgba(230,225,218,0.90)";
  const cardBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";

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
        position: "relative",
      }}
    >
      <div
        style={{
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "5rem 3rem 5rem 4rem",
          gap: "2rem",
          zIndex: 1,
        }}
        className="w-[45%] 2xl:w-[35%]"
      >
        <div style={{ display: "flex", alignItems: "start", gap: "1.5rem" }}>
          <ArrowDecor
            direction="down"
            size={14}
            style={{ marginTop: "1rem" }}
          />
          <Html
            as="h1"
            html={t("s1.title")}
            style={{
              fontFamily: "var(--font-title)",
              fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: textPrimary,
            }}
          />
        </div>
        <div
          style={{
            backgroundColor: cardBg,
            border: `1px solid ${cardBorder}`,
            padding: "1.5rem 1.75rem",
          }}
        >
          <BodyParagraphs
            content={t.raw("s1.body") as string | string[]}
            style={bodyStyle(
              isDark ? "rgba(255,255,255,0.70)" : "rgba(0,0,0,0.65)",
            )}
          />
        </div>
        <div
          style={{
            backgroundColor: cardBg,
            border: `1px solid ${cardBorder}`,
            padding: "1.5rem 1.75rem",
          }}
        >
          <BodyParagraphs
            content={t.raw("s1.body2") as string | string[]}
            style={bodyStyle(
              isDark ? "rgba(255,255,255,0.70)" : "rgba(0,0,0,0.65)",
            )}
          />
        </div>
      </div>
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        {!isDark && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "10%",
              bottom: 0,
              width: "65%",
              backgroundColor: ORANGE,
              zIndex: 0,
            }}
          />
        )}
        <Image
          src={bt00}
          alt="BetMomo billboard"
          fill
          style={{
            objectFit: "contain",
            objectPosition: "bottom right",
            zIndex: 1,
          }}
          sizes="58vw"
          priority
        />
      </div>
    </section>
  );
}

function Section2({
  t,
  isDark,
}: {
  t: ReturnType<typeof useTranslations<"BetMomo">>;
  isDark: boolean;
}) {
  const bg = isDark ? "#0f0f0f" : "#f0ede8";
  return (
    <section
      style={{
        width: "100vw",
        height: "100vh",
        flexShrink: 0,
        backgroundColor: bg,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        src={btHimra}
        alt="BetMomo campaign"
        style={{
          width: "auto",
          maxWidth: "100%",
          maxHeight: "80%",
          objectFit: "contain",
          display: "block",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "2%",
          left: "8%",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: "1.25rem",
        }}
      >
        <ArrowDecor
          direction="down"
          size={14}
          style={{ marginBottom: "2.25rem", flexShrink: 0 }}
        />
        <div
          style={{
            backgroundColor: ORANGE,
            padding: "2.25rem 2.5rem",
            maxWidth: "clamp(360px, 28vw, 500px)",
          }}
        >
          <Html
            as="h2"
            html={t("s2.title")}
            style={{
              fontFamily: "var(--font-title)",
              fontSize: "clamp(1.4rem, 2.6vw, 2.4rem)",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: "#191919",
              marginBottom: "1.25rem",
            }}
          />
          <BodyParagraphs
            content={t.raw("s2.body") as string | string[]}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              lineHeight: 1.3,
              fontWeight: 500,
              color: "#191919",
            }}
          />
        </div>
      </div>
    </section>
  );
}

function Section3({
  t,
  isDark,
}: {
  t: ReturnType<typeof useTranslations<"BetMomo">>;
  isDark: boolean;
}) {
  const CARD_BG = "#242424";
  const TEXT_PRIMARY = "rgba(255,255,255,0.90)";
  const TEXT_MUTED = "rgba(255,255,255,0.60)";
  const bg = isDark ? "#0f0f0f" : "#f0ede8";
  const cards = [
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
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor: bg,
      }}
    >
      <Image
        src={btLeague}
        alt="BetMomo campaign"
        style={{
          width: "auto",
          maxWidth: "100%",
          maxHeight: "80%",
          objectFit: "contain",
          display: "block",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "0",
          zIndex: 2,
          width: "35%",
          paddingRight: "4rem",
          paddingLeft: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            style={{ backgroundColor: CARD_BG, padding: "1.5rem 1.75rem" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.875rem",
                marginBottom: "0.875rem",
              }}
            >
              <ArrowDecor
                direction="right"
                size={11}
                style={{ flexShrink: 0, marginTop: "0.2rem" }}
              />
              <Html
                as="h3"
                html={card.title}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  fontStyle: "italic",
                  lineHeight: 1.3,
                  color: TEXT_PRIMARY,
                }}
              />
            </div>
            <div
              style={{ borderLeft: `2px solid ${ORANGE}`, paddingLeft: "1rem" }}
            >
              <BodyParagraphs
                content={card.body}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-sm, 0.78rem)",
                  lineHeight: 1.3,
                  color: TEXT_MUTED,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Section4({
  t,
  isDark,
}: {
  t: ReturnType<typeof useTranslations<"BetMomo">>;
  isDark: boolean;
}) {
  const bg = isDark ? "#0f0f0f" : "#f0ede8";
  const CARD_BG = "#242424";
  const TEXT_PRIMARY = "rgba(255,255,255,0.90)";
  const TEXT_MUTED = "rgba(255,255,255,0.60)";

  const ResultCard = ({
    title,
    body,
    style,
  }: {
    title: string;
    body: string | string[];
    style?: React.CSSProperties;
  }) => (
    <div
      style={{
        position: "absolute",
        backgroundColor: CARD_BG,
        padding: "1.25rem 1.5rem",
        width: "clamp(240px, 30vw, 400px)",
        zIndex: 3,
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "0.75rem",
          marginBottom: "0.75rem",
        }}
      >
        <ArrowDecor
          direction="right"
          size={11}
          style={{ flexShrink: 0, marginTop: "0.2rem" }}
        />
        <Html
          as="h3"
          html={title}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-md)",
            fontWeight: 600,
            fontStyle: "italic",
            lineHeight: 1.3,
            color: TEXT_PRIMARY,
          }}
        />
      </div>
      <div
        style={{ borderLeft: `2px solid ${ORANGE}`, paddingLeft: "0.875rem" }}
      >
        <BodyParagraphs
          content={body}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm, 0.78rem)",
            lineHeight: 1.65,
            color: TEXT_MUTED,
          }}
        />
      </div>
    </div>
  );

  return (
    <section
      style={{
        width: "100vw",
        height: "100vh",
        flexShrink: 0,
        backgroundColor: bg,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "5rem",
          left: "12rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          zIndex: 3,
        }}
      >
        <ArrowDecor direction="down" size={12} />
        <div
          style={{
            backgroundColor: ORANGE,
            borderRadius: "2rem",
            padding: "0.35rem 1.25rem",
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-md)",
            fontWeight: 500,
            color: "#191919",
            letterSpacing: "0.01em",
          }}
        >
          {t("s4.label")}
        </div>
      </div>
      <ResultCard
        title={t("s4.r1_title")}
        body={t.raw("s4.r1_body") as string | string[]}
        style={{ top: "18%", left: "12rem" }}
      />
      <ResultCard
        title={t("s4.r2_title")}
        body={t.raw("s4.r2_body") as string | string[]}
        style={{ top: "18%", right: "20rem" }}
      />
      <ResultCard
        title={t("s4.r3_title")}
        body={t.raw("s4.r3_body") as string | string[]}
        style={{ bottom: "8%", right: "14rem" }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          height: "80%",
          zIndex: 2,
        }}
      >
        <Image
          src={btYeti}
          alt="BetMomo Yeti mascot"
          style={{
            height: "100%",
            width: "auto",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE LAYOUT — vertical stack, single column, no absolute text blocks
// ─────────────────────────────────────────────────────────────────────────────

type SectionRef = (el: HTMLElement | null) => void;
type T = ReturnType<typeof useTranslations<"BetMomo">>;

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
  const textPrimary = isDark ? "#ffffff" : "#1a1a1a";
  const cardBg = isDark ? "rgba(20,20,20,0.85)" : "rgba(230,225,218,0.90)";
  const cardBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
  const bodyColor = isDark ? "rgba(255,255,255,0.70)" : "rgba(0,0,0,0.65)";

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: bg,
        overflow: "hidden",
        paddingTop: "1.5rem",
      }}
    >
      {/* Image — top half, relative container with fixed height */}
      <div
        style={{
          position: "relative",
          height: "48vh",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        {!isDark && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "10%",
              bottom: 0,
              width: "65%",
              backgroundColor: ORANGE,
              zIndex: 0,
            }}
          />
        )}
        <Image
          src={bt00}
          alt="BetMomo billboard"
          fill
          style={{
            objectFit: "contain",
            objectPosition: "bottom center",
            zIndex: 1,
          }}
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
          padding: "2rem 1.25rem 3rem",
        }}
      >
        <div
          style={{
            backgroundColor: cardBg,
            border: `1px solid ${cardBorder}`,
            padding: "1.25rem 1.5rem",
          }}
        >
          <BodyParagraphs
            content={t.raw("s1.body") as string | string[]}
            style={bodyStyle(bodyColor)}
          />
        </div>
        <div
          style={{
            backgroundColor: cardBg,
            border: `1px solid ${cardBorder}`,
            padding: "1.25rem 1.5rem",
          }}
        >
          <BodyParagraphs
            content={t.raw("s1.body2") as string | string[]}
            style={bodyStyle(bodyColor)}
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
        display: "flex",
        flexDirection: "column",
        backgroundColor: bg,
        overflow: "hidden",
      }}
      className="max-sm:h-fit sm:min-h-dvh"
    >
      {/* Orange card — section title + body */}
      <div
        style={{
          padding: "4.5rem 1.25rem 2rem",
          display: "flex",
          alignItems: "flex-start",
          gap: "1rem",
        }}
      >
        <ArrowDecor
          direction="down"
          size={12}
          style={{ flexShrink: 0, marginTop: "0.3rem" }}
        />
        <div
          style={{
            backgroundColor: ORANGE,
            padding: "1.75rem 1.75rem",
            flex: 1,
          }}
        >
          <Html
            as="h2"
            html={t("s2.title")}
            style={{
              fontFamily: "var(--font-title)",
              fontSize: "clamp(1.35rem, 5vw, 2.1rem)",
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
              lineHeight: 1.45,
              fontWeight: 500,
              color: "#191919",
            }}
          />
        </div>
      </div>

      {/* Campaign image — centered, takes remaining space */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem 1.25rem 3rem",
          overflow: "hidden",
        }}
        className="max-sm:flex-0 flex-1"
      >
        <Image
          src={btHimra}
          alt="BetMomo campaign"
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "50vh",
            objectFit: "contain",
            display: "block",
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
  const bg = isDark ? "#0f0f0f" : "#f0ede8";
  const TEXT_MUTED = isDark ? "rgba(255,255,255,0.70)" : "rgba(0,0,0,0.65)";

  const cards = [
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
      {/* Campaign image first (optional - can be moved before or after cards) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem 1.25rem 1rem",
          overflow: "hidden",
        }}
      >
        <Image
          src={btLeague}
          alt="BetMomo campaign"
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "40vh",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>

      {/* 3 stacked cards with orange styling */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "1.5rem 1.25rem 3rem",
        }}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            style={{
              backgroundColor: isDark ? "#242424" : "rgba(230,225,218,0.90)",
              border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.08)",
              padding: "1.25rem 1.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
                marginBottom: "0.75rem",
              }}
            >
              <ArrowDecor
                direction="right"
                size={10}
                style={{ flexShrink: 0, marginTop: "0.2rem", color: ORANGE }}
              />
              <Html
                as="h3"
                html={card.title}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  fontStyle: "italic",
                  lineHeight: 1.3,
                  color: isDark ? "rgba(255,255,255,0.90)" : "#1a1a1a",
                }}
              />
            </div>
            <div
              style={{
                borderLeft: `2px solid ${ORANGE}`,
                paddingLeft: "0.875rem",
              }}
            >
              <BodyParagraphs
                content={card.body}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-sm)",
                  lineHeight: 1.3,
                  color: TEXT_MUTED,
                }}
              />
            </div>
          </div>
        ))}
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
  const bg = isDark ? "#0f0f0f" : "#f0ede8";
  const CARD_BG = "#242424";
  const TEXT_PRIMARY = "rgba(255,255,255,0.90)";
  const TEXT_MUTED = "rgba(255,255,255,0.60)";

  const resultCards = [
    { title: t("s4.r1_title"), body: t.raw("s4.r1_body") as string | string[] },
    { title: t("s4.r2_title"), body: t.raw("s4.r2_body") as string | string[] },
    { title: t("s4.r3_title"), body: t.raw("s4.r3_body") as string | string[] },
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
        paddingBottom: "3rem",  
      }}
    >
      {/* Label row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          padding: "4.5rem 1.25rem 1.5rem",
        }}
      >
        <ArrowDecor direction="down" size={12} />
        <div
          style={{
            backgroundColor: ORANGE,
            borderRadius: "2rem",
            padding: "0.35rem 1.25rem",
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-md)",
            fontWeight: 500,
            color: "#191919",
          }}
        >
          {t("s4.label")}
        </div>
      </div>

      {/* Yeti mascot */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "38vh",
          flexShrink: 0,
        }}
      >
        <Image
          src={btYeti}
          alt="BetMomo Yeti mascot"
          style={{
            height: "100%",
            width: "auto",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>

      {/* 3 result cards */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "1.5rem 1.25rem 3rem",
        }}
      >
        {resultCards.map((card, i) => (
          <div
            key={i}
            style={{ backgroundColor: CARD_BG, padding: "1.25rem 1.5rem" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
                marginBottom: "0.75rem",
              }}
            >
              <ArrowDecor
                direction="right"
                size={10}
                style={{ flexShrink: 0, marginTop: "0.2rem" }}
              />
              <Html
                as="h3"
                html={card.title}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-md)",
                  fontWeight: 600,
                  fontStyle: "italic",
                  lineHeight: 1.3,
                  color: TEXT_PRIMARY,
                }}
              />
            </div>
            <div
              style={{
                borderLeft: `2px solid ${ORANGE}`,
                paddingLeft: "0.875rem",
              }}
            >
              <BodyParagraphs
                content={card.body}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-sm)",
                  lineHeight: 1.65,
                  color: TEXT_MUTED,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function BetMomo() {
  const t = useTranslations("BetMomo");
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

  // Desktop: GSAP horizontal scroll — kept stable in DOM (removeChild-safe)
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

  // Mobile: IntersectionObserver to track which section is in view
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
    <main data-page-name="betmomo">
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
            <PageAnnotation line1="Bet" line2="Momo" />
          </>,
          document.body,
        )}
    </main>
  );
}
