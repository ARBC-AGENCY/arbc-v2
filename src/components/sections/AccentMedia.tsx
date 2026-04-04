"use client";

import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import ProjectSectionNav from "@/components/layout/ProjectSectionNav";
import PageAnnotation from "@/components/layout/PageAnnotation";

// ── Image assets ────────────────────────────────────────────────────────────
import acm00 from "@/assets/images/acm/ACM-00.webp";
import acm01 from "@/assets/images/acm/ACM-01.webp";
import acm02 from "@/assets/images/acm/ACM-02.webp";
import acm03 from "@/assets/images/acm/ACM-03.webp";
import acm04 from "@/assets/images/acm/ACM-04.webp";
import billboard from "@/assets/images/acm/Billboard.webp";
import sem1 from "@/assets/images/acm/Sem1.webp";
import sem2 from "@/assets/images/acm/Sem2.webp";
import sem3 from "@/assets/images/acm/Sem3.webp";

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
function Section1({ t, isDark }: { t: ReturnType<typeof useTranslations<"AccentMedia">>; isDark: boolean }) {
  const bg = isDark ? "#0f0f0f" : "#f5f0eb";
  const textPrimary = isDark ? "#ffffff" : "#1a1a1a";
  const textMuted   = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)";

  return (
    <section
      style={{
        width: "100vw",
        height: "100vh",
        flexShrink: 0,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr",
        backgroundColor: bg,
        overflow: "hidden",
      }}
    >
      {/* Left — text card */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "8rem 5rem 6rem",
        }}
      >
        <p style={label(textMuted)}>{t("s1.label")}</p>
        <h1 style={{ ...heading(textPrimary), fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)", marginBottom: "2rem" }}>
          {t("s1.title")}
        </h1>
        <p style={body(isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.6)")}>{t("s1.body")}</p>
        <p
          style={{
            ...body(isDark ? "rgba(255,255,255,0.40)" : "rgba(0,0,0,0.38)"),
            marginTop: "1.5rem",
            fontSize: "0.78rem",
            borderLeft: `2px solid ${ORANGE}`,
            paddingLeft: "1rem",
          }}
        >
          {t("s1.sub")}
        </p>

        {/* Entity tags */}
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "2.5rem" }}>
          {["AMTech", "AMP"].map((name) => (
            <span
              key={name}
              style={{
                display: "inline-block",
                padding: "0.35rem 1rem",
                borderRadius: "9999px",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"}`,
                fontFamily: "var(--font-body)",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                color: textPrimary,
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Right — billboard hero image */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <Image
          src={billboard}
          alt="Accent Media billboard"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          sizes="50vw"
          priority
        />
        {/* Orange tint overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(231,80,30,0.18) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
        {/* ACM-00 inset photo — bottom left corner */}
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "2rem",
            width: "28%",
            aspectRatio: "1 / 1",
            borderRadius: "0.75rem",
            overflow: "hidden",
            boxShadow: "0 8px 40px rgba(0,0,0,0.40)",
            border: "2px solid rgba(255,255,255,0.12)",
          }}
        >
          <Image
            src={acm00}
            alt="Accent Media brand"
            fill
            style={{ objectFit: "cover" }}
            sizes="14vw"
          />
        </div>
      </div>
    </section>
  );
}

// ── Section 2 — The Challenge ────────────────────────────────────────────────
function Section2({ t, isDark }: { t: ReturnType<typeof useTranslations<"AccentMedia">>; isDark: boolean }) {
  const bg = isDark ? "#141414" : "#faf8f6";
  const textPrimary = isDark ? "#ffffff" : "#1a1a1a";
  const textMuted   = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)";

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
        gridTemplateColumns: "1fr 1fr",
        backgroundColor: bg,
        overflow: "hidden",
      }}
    >
      {/* Left — large image */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <Image
          src={acm01}
          alt="Accent Media context"
          fill
          style={{ objectFit: "cover", objectPosition: "center top" }}
          sizes="50vw"
        />
      </div>

      {/* Right — two stacked cards */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: "1fr 1fr",
          gap: 0,
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
          }}
        >
          <p style={label("rgba(255,255,255,0.65)")}>{t("s2.label")}</p>
          <h2 style={{ ...heading("#ffffff"), fontSize: "clamp(1.2rem, 2.2vw, 2rem)" }}>
            {t("s2.title")}
          </h2>
          {/* Stats row */}
          <div style={{ display: "flex", gap: "2.5rem", marginTop: "1.5rem" }}>
            {stats.map((s) => (
              <div key={s.lbl}>
                <p
                  style={{
                    fontFamily: "var(--font-title)",
                    fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
                    fontWeight: 700,
                    color: "#ffffff",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </p>
                <p style={{ ...label("rgba(255,255,255,0.70)"), marginBottom: 0, marginTop: "0.3rem" }}>
                  {s.lbl}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom — image */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <Image
            src={acm02}
            alt="Accent Media team"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            sizes="50vw"
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: isDark
                ? "linear-gradient(to top, rgba(20,20,20,0.5) 0%, transparent 50%)"
                : "linear-gradient(to top, rgba(250,248,246,0.4) 0%, transparent 50%)",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </section>
  );
}

// ── Section 3 — Agency Response ──────────────────────────────────────────────
function Section3({ t, isDark }: { t: ReturnType<typeof useTranslations<"AccentMedia">>; isDark: boolean }) {
  const bg = isDark ? "#0a0a0a" : "#f0ede8";
  const textPrimary = isDark ? "#ffffff" : "#1a1a1a";
  const textMuted   = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)";

  const cols = [
    { title: t("s3.col1_title"), body: t("s3.col1_body"), img: acm03 },
    { title: t("s3.col2_title"), body: t("s3.col2_body"), img: acm04 },
    { title: t("s3.col3_title"), body: t("s3.col3_body"), img: sem1  },
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
      {/* Top label */}
      <div style={{ padding: "5rem 5rem 0" }}>
        <p style={label(textMuted)}>{t("s3.label")}</p>
      </div>

      {/* 3-column grid */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 0,
          padding: "2rem 5rem 5rem",
          alignItems: "stretch",
        }}
      >
        {cols.map((col, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              borderLeft: i > 0 ? `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}` : undefined,
              paddingLeft: i > 0 ? "2.5rem" : 0,
              paddingRight: i < 2 ? "2.5rem" : 0,
            }}
          >
            {/* Arrow + title */}
            <div style={{ marginBottom: "1.5rem" }}>
              <svg
                viewBox="0 0 24 24"
                width="28"
                height="28"
                fill="none"
                stroke={ORANGE}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginBottom: "1rem" }}
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
              <h3 style={{ ...heading(textPrimary), fontSize: "clamp(1rem, 1.8vw, 1.5rem)", marginBottom: "0.75rem" }}>
                {col.title}
              </h3>
              <p style={body(isDark ? "rgba(255,255,255,0.58)" : "rgba(0,0,0,0.55)")}>
                {col.body}
              </p>
            </div>

            {/* Column image */}
            <div
              style={{
                flex: 1,
                position: "relative",
                borderRadius: "0.75rem",
                overflow: "hidden",
                minHeight: "160px",
              }}
            >
              <Image
                src={col.img}
                alt={col.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="33vw"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Section 4 — Results ──────────────────────────────────────────────────────
function Section4({ t, isDark }: { t: ReturnType<typeof useTranslations<"AccentMedia">>; isDark: boolean }) {
  const bg = isDark ? "#111111" : "#f7f5f2";
  const textPrimary = isDark ? "#ffffff" : "#1a1a1a";
  const textMuted   = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)";

  const results = [
    { title: t("s4.r1_title"), body: t("s4.r1_body"), img: sem1 },
    { title: t("s4.r2_title"), body: t("s4.r2_body"), img: sem2 },
    { title: t("s4.r3_title"), body: t("s4.r3_body"), img: sem3 },
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
      <p style={{ ...label(textMuted), marginBottom: "3rem" }}>{t("s4.label")}</p>

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
              backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
            }}
          >
            {/* Image */}
            <div style={{ position: "relative", height: "55%", overflow: "hidden" }}>
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
            <div style={{ padding: "1.75rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <h3
                style={{
                  fontFamily: "var(--font-title)",
                  fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
                  fontWeight: 700,
                  color: textPrimary,
                  lineHeight: 1.2,
                }}
              >
                {r.title}
              </h3>
              <p style={body(isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)")}>
                {r.body}
              </p>
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

  const sectionLabels = [
    t("nav.s1"),
    t("nav.s2"),
    t("nav.s3"),
    t("nav.s4"),
  ];

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
            NUM_SECTIONS - 1
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
    const triggers = ScrollTrigger.getAll().filter((st) => st.vars.trigger === outer);
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
          isn't broken by ScrollSmoother's transform on #smooth-content */}
      {typeof document !== "undefined" && createPortal(
        <>
          <ProjectSectionNav
            sections={sectionLabels}
            activeIndex={activeSection}
            onSelect={handleNavSelect}
          />
          <PageAnnotation line1="Accent" line2="Media" />
        </>,
        document.body
      )}
    </main>
  );
}
