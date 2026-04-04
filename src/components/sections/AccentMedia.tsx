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

/** Renders any single string field with full HTML support (<span>, <br>, etc.) */
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

/**
 * Renders a body field as one or more paragraphs.
 * Pass `t.raw("key") as string[]` — each array element becomes a <p> with HTML support.
 * A plain string is also accepted and treated as a single paragraph.
 */
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
const label = (color = "rgba(255,255,255,0.55)"): React.CSSProperties => ({
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
  const cardBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";

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
      {/* ① Arrow decor — far left edge */}
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

      {/* Orange text card */}
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

      {/* Central kiosk image — portrait, centred, bleeds top & bottom */}
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

      {/* ④ Right — intro text + entity cards */}
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
        {/* Intro sentence */}
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

        {/* Entity rows */}
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
            {/* Text */}
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
            {/* Logo image */}
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
  const textPrimary = isDark ? "#ffffff" : "#1a1a1a";
  const textMuted = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)";

  const stats = [
    { value: t("s2.stat1_value"), lbl: t("s2.stat1_label") },
    { value: t("s2.stat2_value"), lbl: t("s2.stat2_label") },
    { value: t("s2.stat3_value"), lbl: t("s2.stat3_label") },
  ];

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
      {/* Left — large image */}
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

      {/* Right — two stacked cards */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
          gap: "6rem",
        }}
      >
        {/* Top — orange challenge card */}
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

        {/* Bottom — image */}
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
  const textMuted = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.40)";
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
      {/* ── Top: label + 3 columns ── */}
      <div style={{ padding: "4rem 5rem 2.5rem" }}>
        <div
          style={{ ...label(textMuted), marginBottom: "3rem" }}
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
              <div style={{
                display: "flex",
                flexDirection:"row",
                gap:"1rem"
              }}>
                {/* Arrow + title */}
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

              {/* Body — orange left bar */}
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

      {/* ── Bottom: full-width acm04 image, flush to screen bottom ── */}
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
function Section4({
  t,
  isDark,
}: {
  t: ReturnType<typeof useTranslations<"AccentMedia">>;
  isDark: boolean;
}) {
  const bg = isDark ? "#111111" : "#f7f5f2";
  const textPrimary = isDark ? "#ffffff" : "#1a1a1a";
  const textMuted = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)";

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
      style={{
        width: "100vw",
        height: "100vh",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        backgroundColor: bg,
        overflow: "hidden",
        padding: "5rem",
      }}
    >
      <Html
        as="p"
        html={t("s4.label")}
        style={{ ...label(textMuted), marginBottom: "3rem" }}
      />

      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "2rem",
          alignItems: "stretch",
        }}
      >
        {results.map((r, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              borderRadius: "1rem",
              overflow: "hidden",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
              backgroundColor: isDark
                ? "rgba(255,255,255,0.03)"
                : "rgba(0,0,0,0.02)",
            }}
          >
            {/* Image */}
            <div
              style={{
                position: "relative",
                height: "55%",
                overflow: "hidden",
              }}
            >
              <Image
                src={r.img}
                alt={r.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="30vw"
              />
              {/* Orange top bar */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  backgroundColor: ORANGE,
                }}
              />
            </div>
            {/* Text */}
            <div
              style={{
                padding: "1.75rem",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <Html
                as="h3"
                html={r.title}
                style={{
                  fontFamily: "var(--font-title)",
                  fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
                  fontWeight: 700,
                  color: textPrimary,
                  lineHeight: 1.2,
                }}
              />
              <BodyParagraphs
                content={r.body}
                style={body(
                  isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)",
                )}
              />
            </div>
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

  // Scroll to section when nav item is clicked
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
    // Instant scroll jump — scrub handles the smooth visual catch-up
    window.scrollTo(0, targetScroll);
  };

  return (
    <main data-page-name="accent-media">
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

      {/* Section nav + page annotation — portalled to body so position:fixed
          isn't broken by ScrollSmoother's transform on #smooth-content.
          Only rendered after hydration (mounted) to avoid SSR/client mismatch. */}
      {mounted &&
        createPortal(
          <>
            <ProjectSectionNav
              sections={sectionLabels}
              activeIndex={activeSection}
              onSelect={handleNavSelect}
            />
            <PageAnnotation line1="Accent" line2="Media" />
          </>,
          document.body,
        )}
    </main>
  );
}
