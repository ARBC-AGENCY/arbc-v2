"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { gsap } from "@/lib/gsap";
import { useTransitionContext } from "@/context/TransitionContext";
import TextType from "@/components/ui/TextType";
import { usePageReady } from "@/context/page-ready";

interface Props {
  b1p1: string;
  b1p2: string;
  b1p3: string;
  b2prefix: string;
  b2main: string;
  b2sub: string;
  b3prefix: string;
  b3main: string;
  b3sub: string;
  ctaLabel: string;
}

function HighlightTextType({
  text,
  highlightWords,
  animate,
  typingSpeed = 48,
  showCursor = false,
  cursorCharacter = "_",
  style,
  highlightStyle,
  onComplete,
}: {
  text: string;
  highlightWords: string[];
  animate: boolean;
  typingSpeed?: number;
  showCursor?: boolean;
  cursorCharacter?: string;
  style?: React.CSSProperties;
  highlightStyle?: React.CSSProperties;
  onComplete?: () => void;
}) {
  let found: { before: string; word: string; after: string } | null = null;
  for (const w of highlightWords) {
    const idx = text.toLowerCase().indexOf(w.toLowerCase());
    if (idx !== -1) {
      found = {
        before: text.slice(0, idx),
        word: text.slice(idx, idx + w.length),
        after: text.slice(idx + w.length),
      };
      break;
    }
  }

  const [seg, setSeg] = useState(0);

  useEffect(() => {
    if (!animate) return;
    setSeg(found?.before ? 1 : 2);
  }, [animate]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!found) {
    return (
      <TextType
        text={text}
        animate={animate}
        typingSpeed={typingSpeed}
        showCursor={showCursor}
        cursorCharacter={cursorCharacter}
        style={style}
        onComplete={onComplete}
      />
    );
  }

  const { before, word, after } = found;

  return (
    <>
      {before && (
        <TextType
          text={before}
          animate={seg >= 1}
          typingSpeed={typingSpeed}
          showCursor={false}
          style={style}
          onComplete={() => setSeg(2)}
        />
      )}
      <TextType
        text={word}
        animate={seg >= 2}
        typingSpeed={typingSpeed}
        showCursor={false}
        style={{ ...style, ...highlightStyle }}
        onComplete={() => (after ? setSeg(3) : onComplete?.())}
      />
      {after && (
        <TextType
          text={after}
          animate={seg >= 3}
          typingSpeed={typingSpeed}
          showCursor={showCursor}
          cursorCharacter={cursorCharacter}
          style={style}
          onComplete={onComplete}
        />
      )}
    </>
  );
}

function MagneticCTA({
  label,
  animate,
  textColor,
  small,
}: {
  label: string;
  animate: boolean;
  textColor: string;
  small?: boolean;
}) {
  const { navigate } = useTransitionContext();
  const outerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const textColorRef = useRef(textColor);
  textColorRef.current = textColor;

  const STRENGTH = 40;
  const TEXT_STRENGTH = 16;

  useEffect(() => {
    if (!animate || !outerRef.current) return;
    gsap.fromTo(
      outerRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
    );
  }, [animate]);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = ((e.clientX - left) / width - 0.5) * STRENGTH;
      const y = ((e.clientY - top) / height - 0.5) * STRENGTH;
      gsap.to(el, { x, y, duration: 1.5, ease: "power4.out" });
      gsap.to(textRef.current, {
        x: (x / STRENGTH) * TEXT_STRENGTH,
        y: (y / STRENGTH) * TEXT_STRENGTH,
        duration: 1.5,
        ease: "power4.out",
      });
    };

    const onEnter = () => {
      gsap.fromTo(
        fillRef.current,
        { y: "76%" },
        { y: "0%", duration: 0.6, ease: "power2.inOut" },
      );
      gsap.to(textRef.current, {
        color: "#ffffff",
        duration: 0.3,
        ease: "power3.in",
      });
    };

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 1.5, ease: "elastic.out(1, 0.3)" });
      gsap.to(textRef.current, {
        x: 0,
        y: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.3)",
      });
      gsap.to(fillRef.current, {
        y: "-76%",
        duration: 0.6,
        ease: "power2.inOut",
      });
      gsap.to(textRef.current, {
        color: textColorRef.current,
        duration: 0.3,
        ease: "power3.out",
        delay: 0.3,
      });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={outerRef}
      style={{
        display: "inline-block",
        opacity: 0,
        cursor: "pointer",
        boxShadow: `inset 0 0 0 1.5px ${textColor}`,
        borderRadius: "2.125em",
        height: small ? "3.5em" : "4.25em",
        overflow: "hidden",
        position: "relative",
        willChange: "transform",
        fontSize: small ? "0.82rem" : undefined,
      }}
    >
      <button
        onClick={() => navigate("/projects", "projects")}
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
      >
        <div
          ref={fillRef}
          style={{
            background: "#e7501e",
            position: "absolute",
            width: "150%",
            height: "200%",
            borderRadius: "50%",
            top: "-50%",
            left: "-25%",
            transform: "translate3d(0, -76%, 0)",
            willChange: "transform",
            pointerEvents: "none",
          }}
        />
        <span
          ref={textRef}
          style={{
            display: "block",
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            fontSize: small ? "0.82rem" : "var(--text-md)",
            color: textColor,
            whiteSpace: "nowrap",
            padding: small ? "0 2em" : "0 2.5em",
            zIndex: 2,
            position: "relative",
            pointerEvents: "none",
          }}
        >
          {label}
        </span>
      </button>
    </div>
  );
}

export default function HomeHero({
  b1p1,
  b1p2,
  b1p3,
  b2prefix,
  b2main,
  b2sub,
  b3prefix,
  b3main,
  b3sub,
  ctaLabel,
}: Props) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const pageReady = usePageReady();

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!pageReady) return;
    const t = setTimeout(() => setPhase(1), 700);
    return () => clearTimeout(t);
  }, [pageReady]);

  const pause = (next: number, ms = 0) => setTimeout(() => setPhase(next), ms);

  const isDark = !mounted || resolvedTheme === "dark";
  const muted = isDark ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.38)";
  const emphasis = isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.85)";
  const highlight = "#e7501e";

  const base: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    lineHeight: 1.45,
  };
  const wordHighlight: React.CSSProperties = {
    backgroundColor: highlight,
    color: "#ffffff",
    padding: "0 6px",
  };

  // Shared style for a mobile block wrapper — fades in when `visible` becomes true
  const mobileBlock = (visible: boolean): React.CSSProperties => ({
    width: "85%",
    textAlign: "center",
    opacity: visible ? 1 : 0,
    transition: "opacity 0.3s ease",
  });

  return (
    <section
      className="relative w-full"
      style={{
        height: "100dvh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5em",
      }}
    >
      {mounted && !isDesktop ? (
        // ── Mobile: three centered paragraphs that fade in sequentially ──────
        <>
          {/* Block 1 — appears first, upper area */}
          <div style={{ ...mobileBlock(phase >= 1), top: "22%" }}>
            <div>
              <TextType
                text={b1p1}
                animate={phase >= 1}
                typingSpeed={45}
                showCursor
                cursorCharacter="_"
                style={{
                  ...base,
                  fontSize: "0.9rem",
                  color: muted,
                  lineHeight: 1.2,
                }}
                onComplete={() => pause(2, 700)}
              />
            </div>
            <div>
              <TextType
                text={b1p2}
                animate={phase >= 2}
                typingSpeed={45}
                showCursor={false}
                style={{
                  ...base,
                  fontSize: "0.9rem",
                  color: muted,
                  lineHeight: 1.2,
                }}
                onComplete={() => pause(3, 250)}
              />
            </div>
            <div style={{ marginTop: "0.55em" }}>
              <HighlightTextType
                text={b1p3}
                highlightWords={["Strategic", "stratégique"]}
                animate={phase >= 3}
                typingSpeed={45}
                showCursor
                cursorCharacter="_"
                style={{
                  ...base,
                  fontSize: "0.94rem",
                  color: isDark ? "rgba(204,204,204)" : "rgba(0,0,0,0.38)",
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
                highlightStyle={wordHighlight}
                onComplete={() => pause(4, 700)}
              />
            </div>
          </div>

          {/* Block 2 — middle area */}
          <div style={{ ...mobileBlock(phase >= 4), top: "40%" }}>
            <div style={{ ...base, fontSize: "0.9rem", lineHeight: 1.2 }}>
              <TextType
                text={b2prefix}
                animate={phase >= 4}
                typingSpeed={45}
                showCursor={false}
                style={{
                  color: muted,
                  marginRight: "0.3em",
                  fontSize: "0.9rem",
                }}
                onComplete={() => pause(5, 100)}
              />
              <HighlightTextType
                text={b2main}
                highlightWords={["lines", "lignes"]}
                animate={phase >= 5}
                typingSpeed={45}
                showCursor
                cursorCharacter="_"
                style={{
                  color: isDark ? "rgba(204,204,204)" : "rgba(0,0,0,0.38)",
                  fontStyle: "normal",
                  fontWeight: 700,
                }}
                highlightStyle={wordHighlight}
                onComplete={() => pause(6, 300)}
              />
              <TextType
                text={b2sub}
                animate={phase >= 6}
                typingSpeed={45}
                showCursor={false}
                style={{
                  ...base,
                  fontSize: "0.9rem",
                  color: muted,
                  marginLeft: "0.3em",
                }}
                onComplete={() => pause(7, 700)}
              />
            </div>
          </div>

          {/* Block 3 — lower area */}
          <div style={{ ...mobileBlock(phase >= 7), top: "50%" }}>
            <div style={{ ...base, fontSize: "0.8rem", lineHeight: 1.2 }}>
              <TextType
                text={b3prefix}
                animate={phase >= 7}
                typingSpeed={45}
                showCursor={false}
                style={{ color: muted, marginRight: "0.3em" }}
                onComplete={() => pause(8, 50)}
              />
              <TextType
                text={b3main}
                animate={phase >= 8}
                typingSpeed={45}
                showCursor
                cursorCharacter="_"
                style={{
                  color: "#ffffff",
                  fontStyle: "normal",
                  backgroundColor: highlight,
                  padding: "0 6px",
                  fontWeight: 700,
                }}
                onComplete={() => pause(9, 50)}
              />
              <TextType
                text={b3sub}
                animate={phase >= 9}
                typingSpeed={45}
                showCursor={false}
                style={{
                  ...base,
                  fontSize: "0.9rem",
                  color: muted,
                  marginLeft: "0.3em",
                }}
                onComplete={() => pause(10, 400)}
              />
            </div>
          </div>

          {/* CTA */}
          <div
            style={{
              position: "absolute",
              bottom: "10%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "max-content",
            }}
          >
            <MagneticCTA
              label={ctaLabel}
              animate={phase >= 10}
              textColor={emphasis}
              small
            />
          </div>
        </>
      ) : (
        // ── Desktop: original diagonal layout ────────────────────────────────
        <>
          {/* Block 1 — upper left */}
          <div className="absolute top-[22%] left-6 lg:left-12 max-w-90">
            <TextType
              text={b1p1}
              animate={phase >= 1}
              typingSpeed={45}
              showCursor
              cursorCharacter="_"
              className="mb-5"
              style={{
                ...base,
                fontSize: "var(--text-md)",
                color: muted,
                lineHeight: 1.1,
              }}
              onComplete={() => pause(2, 700)}
            />
            <div style={{ marginTop: "1em" }}>
              <TextType
                text={b1p2}
                animate={phase >= 2}
                typingSpeed={45}
                showCursor={false}
                style={{ ...base, fontSize: "var(--text-md)", color: muted }}
                onComplete={() => pause(3, 250)}
              />
            </div>
            <HighlightTextType
              text={b1p3}
              highlightWords={["Strategic", "stratégique"]}
              animate={phase >= 3}
              typingSpeed={45}
              showCursor
              cursorCharacter="_"
              style={{
                ...base,
                fontSize: "var(--text-lg)",
                color: isDark ? "rgba(204, 204, 204)" : "rgba(0,0,0,0.38)",
                fontWeight: 700,
                lineHeight: 1.15,
              }}
              highlightStyle={wordHighlight}
              onComplete={() => pause(4, 1000)}
            />
          </div>

          {/* Block 2 — center */}
          <div className="absolute top-[45%] left-[40%] max-w-105">
            <div
              className="mb-3"
              style={{ ...base, fontSize: "var(--text-lg)", lineHeight: 1.2 }}
            >
              <TextType
                text={b2prefix}
                animate={phase >= 4}
                typingSpeed={45}
                showCursor={false}
                style={{
                  color: muted,
                  marginRight: "0.3em",
                  fontSize: "var(--text-md)",
                }}
                onComplete={() => pause(5, 100)}
              />
              <HighlightTextType
                text={b2main}
                highlightWords={["lines", "lignes"]}
                animate={phase >= 5}
                typingSpeed={45}
                showCursor
                cursorCharacter="_"
                style={{
                  color: isDark ? "rgba(204, 204, 204)" : "rgba(0,0,0,0.38)",
                  fontStyle: "normal",
                  fontWeight: 700,
                }}
                highlightStyle={wordHighlight}
                onComplete={() => pause(6, 300)}
              />
              <TextType
                text={b2sub}
                animate={phase >= 6}
                typingSpeed={45}
                showCursor={false}
                style={{
                  ...base,
                  fontSize: "var(--text-md)",
                  color: muted,
                  lineHeight: 1.1,
                  marginLeft: "0.3em",
                }}
                onComplete={() => pause(7, 1000)}
              />
            </div>
          </div>

          {/* Block 3 — lower right */}
          <div className="absolute bottom-[20%] right-6 lg:right-12 w-90 text-left">
            <div
              className="mb-2"
              style={{ ...base, fontSize: "var(--text-md)", lineHeight: 1.1 }}
            >
              <TextType
                text={b3prefix}
                animate={phase >= 7}
                typingSpeed={45}
                showCursor={false}
                style={{ color: muted, marginRight: "0.3em" }}
                onComplete={() => pause(8, 50)}
              />
              <TextType
                text={b3main}
                animate={phase >= 8}
                typingSpeed={45}
                showCursor
                cursorCharacter="_"
                style={{
                  color: "#ffffff",
                  fontStyle: "normal",
                  backgroundColor: highlight,
                  padding: "0 6px",
                  fontWeight: 700,
                }}
                onComplete={() => pause(9, 50)}
              />
              <TextType
                text={b3sub}
                animate={phase >= 9}
                typingSpeed={45}
                showCursor={false}
                style={{
                  ...base,
                  fontSize: "var(--text-md)",
                  color: muted,
                  lineHeight: 1.55,
                  marginLeft: "0.3em",
                }}
                onComplete={() => pause(10, 600)}
              />
            </div>
          </div>

          {/* CTA — centered at bottom */}
          <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2">
            <MagneticCTA
              label={ctaLabel}
              animate={phase >= 10}
              textColor={emphasis}
            />
          </div>
        </>
      )}
    </section>
  );
}
