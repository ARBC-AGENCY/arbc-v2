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

// ── Text rendering helpers (same pattern as AccentMedia) ─────────────────────

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

// ── Image assets ─────────────────────────────────────────────────────────────
import bt00 from "@/assets/images/betmomo/BT00.webp";
import btHimra from "@/assets/images/betmomo/VideoSpot-Himra-CIV.webp";
import btLeague from "@/assets/images/betmomo/VideoSpot LeagueDesChampion.webp";
import btYeti from "@/assets/images/betmomo/yeti.webp";

const NUM_SECTIONS = 4;
const ORANGE = "#e7501e";

// ── Shared style helpers ─────────────────────────────────────────────────────
const bodyStyle = (color: string): React.CSSProperties => ({
  fontFamily: "var(--font-body)",
  fontSize: "var(--text-sm)",
  lineHeight: 1.75,
  color,
});

// ── Section 1 — Brand Presentation ───────────────────────────────────────────
function Section1({
  t,
  isDark,
}: {
  t: ReturnType<typeof useTranslations<"BetMomo">>;
  isDark: boolean;
}) {
  const bg = isDark ? "#0f0f0f" : "#f0ede8";
  const textPrimary = isDark ? "#ffffff" : "#1a1a1a";
  const textMuted = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.40)";
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
      {/* ── Left column: arrow + label + title + two body cards ── */}
      <div
        style={{
          width: "35%",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "5rem 3rem 5rem 4rem",
          gap: "2rem",
          zIndex: 1,
        }}
      >
        {/* Arrow + label row */}
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

        {/* Body card 1 */}
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

        {/* Body card 2 */}
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

      {/* ── Right: BT00 billboard image — flush to bottom ── */}
      <div
        style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Orange background accent — visible in light mode */}
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

// ── Section 2 — The Challenge ────────────────────────────────────────────────
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
      {/* Centred image — natural aspect ratio, constrained to viewport */}
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

      {/* Arrow + orange text block — overlaid lower-left of image area */}
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

        {/* Orange card */}
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

// ── Section 3 — Our Response ─────────────────────────────────────────────────
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
      {/* Full-bleed background image */}

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

      {/* Right column — 3 stacked cards */}
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
            style={{
              backgroundColor: CARD_BG,
              padding: "1.5rem 1.75rem",
            }}
          >
            {/* Arrow + italic title row */}
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

            {/* Orange left-bar + body */}
            <div
              style={{
                borderLeft: `2px solid ${ORANGE}`,
                paddingLeft: "1rem",
              }}
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

// ── Section 4 — Results ───────────────────────────────────────────────────────
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
      {/* Arrow + italic title */}
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
      {/* Orange left-bar + body */}
      <div style={{ borderLeft: `2px solid ${ORANGE}`, paddingLeft: "0.875rem" }}>
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
      {/* Label row — ArrowDecor + orange pill */}
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

      {/* Card 1 — top left */}
      <ResultCard
        title={t("s4.r1_title")}
        body={t.raw("s4.r1_body") as string | string[]}
        style={{ top: "18%", left: "12rem" }}
      />

      {/* Card 2 — top right */}
      <ResultCard
        title={t("s4.r2_title")}
        body={t.raw("s4.r2_body") as string | string[]}
        style={{ top: "18%", right: "20rem" }}
      />

      {/* Card 3 — bottom left */}
      <ResultCard
        title={t("s4.r3_title")}
        body={t.raw("s4.r3_body") as string | string[]}
        style={{ bottom: "8%", right: "14rem" }}
      />

      {/* Yeti — centered horizontally, anchored to bottom */}
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

// ── Root component ────────────────────────────────────────────────────────────
export default function BetMomo() {
  const t = useTranslations("BetMomo");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => setMounted(true), []);

  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  const sectionLabels = [t("nav.s1"), t("nav.s2"), t("nav.s3"), t("nav.s4")];

  // Horizontal scroll via GSAP ScrollTrigger pin
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
    if (!triggers.length) return;
    const st = triggers[0];
    const targetProgress = index / Math.max(NUM_SECTIONS - 1, 1);
    const targetScroll = st.start + (st.end - st.start) * targetProgress;
    window.scrollTo(0, targetScroll);
  };

  return (
    <main data-page-name="betmomo">
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

      {mounted &&
        createPortal(
          <>
            <ProjectSectionNav
              sections={sectionLabels}
              activeIndex={activeSection}
              onSelect={handleNavSelect}
            />
            <PageAnnotation line1="Bet" line2="Momo" />
          </>,
          document.body,
        )}
    </main>
  );
}
