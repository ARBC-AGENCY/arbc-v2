"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import SplitText from "@/components/ui/SplitText";
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
}: Props) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pageReady = usePageReady();

  /**
   * Phases:
   *  0 — idle
   *  1 — block 1 animating
   *  2 — block 2 prefix+main (TextType) animating
   *  3 — block 2 sub animating
   *  4 — block 3 prefix animating
   *  5 — block 3 main ("Shift") animating
   *  6 — block 3 sub animating
   */
  const [phase, setPhase] = useState(0);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!pageReady) return;
    const t = setTimeout(() => setPhase(1), 700);
    return () => clearTimeout(t);
  }, [pageReady]);

  const pause = (next: number, ms = 1200) =>
    setTimeout(() => setPhase(next), ms);

  const isDark = !mounted || resolvedTheme === "dark";
  const muted = isDark ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.38)";
  const emphasis = isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.85)";
  const highlight = "#e7501e";

  const base: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    lineHeight: 1.45,
  };

  return (
    <section className="relative w-full min-h-screen">
      {/* ── Block 1 — upper left ─────────────────────── */}
      <div className="absolute top-[22%] left-6 lg:left-12 max-w-90">
        <SplitText
          text={b1p1}
          variant="chars"
          animate={phase >= 1}
          unitDelay={0.08}
          duration={1.5}
          className="mb-5"
          style={{
            ...base,
            fontSize: "var(--text-md)",
            color: muted,
            lineHeight: 1.1,
          }}
        />

        <SplitText
          text={b1p2}
          variant="chars"
          animate={phase >= 1}
          startDelay={1.7}
          unitDelay={0.08}
          duration={0.7}
          style={{
            ...base,
            fontSize: "var(--text-md)",
            color: muted,
            marginTop: "1em",
          }}
        />

        {/* last of block 1 — TextType with orange highlight, fires block 2 */}
        <TextType
          text={b1p3}
          animate={phase >= 1}
          startDelay={1.2}
          typingSpeed={48}
          showCursor
          cursorCharacter="_"
          style={{
            ...base,
            fontSize: "var(--text-lg)",
            color: "#ffffff",
            fontWeight: 700,
            lineHeight: 1.15,
            backgroundColor: highlight,
            padding: "0 6px",
          }}
          onComplete={() => pause(2)}
        />
      </div>

      {/* ── Block 2 — center ─────────────────────────── */}
      <div className="absolute top-[38%] left-[35%] max-w-105">
        <div
          className="mb-3"
          style={{
            ...base,
            fontSize: "var(--text-lg)",
            lineHeight: 1.2,
          }}
        >
          <SplitText
            text={b2prefix}
            tag="span"
            variant="chars"
            animate={phase >= 2}
            unitDelay={0.08}
            duration={0.6}
            style={{
              color: muted,
              marginRight: "0.3em",
              fontSize: "var(--text-md)",
            }}
          />
          {/* TextType phrase — types out after prefix fades in */}
          <TextType
            text={b2main}
            animate={phase >= 2}
            startDelay={0.4}
            typingSpeed={48}
            showCursor
            cursorCharacter="_"
            style={{
              color: emphasis,
              fontStyle: "normal",
              fontWeight: 700,
            }}
            onComplete={() => pause(3, 600)}
          />
          <SplitText
            text={b2sub}
            tag="span"
            variant="chars"
            animate={phase >= 3}
            unitDelay={0.045}
            duration={0.75}
            style={{
              ...base,
              fontSize: "var(--text-md)",
              color: muted,
              lineHeight: 1.1,
              marginLeft: "0.3em",
            }}
            onComplete={() => pause(4)}
          />
        </div>
      </div>

      {/* ── Block 3 — lower right ────────────────────── */}
      <div className="absolute bottom-[20%] right-6 lg:right-12 max-w-90 text-left">
        {/* Line 1: muted prefix + chars main ("Shift") */}
        <div
          className="mb-2"
          style={{
            ...base,
            fontSize: "var(--text-md)",
            lineHeight: 1.1,
          }}
        >
          <SplitText
            text={b3prefix}
            tag="span"
            variant="chars"
            animate={phase >= 4}
            unitDelay={0.055}
            duration={0.8}
            style={{ color: muted, marginRight: "0.3em" }}
            onComplete={() => pause(5, 50)}
          />
          {/* TextType phrase — types out after prefix fades in */}
          <TextType
            text={b3main}
            animate={phase >= 5}
            typingSpeed={120}
            showCursor
            cursorCharacter="_"
            style={{
              color: "#ffffff",
              fontStyle: "normal",
              backgroundColor: highlight,
              padding: "0 6px",
              fontWeight: 700,
            }}
            onComplete={() => pause(6, 50)}
          />
        </div>

        {/* Sub text */}
        <SplitText
          text={b3sub}
          variant="chars"
          animate={phase >= 6}
          unitDelay={0.04}
          duration={0.75}
          style={{
            ...base,
            fontSize: "var(--text-md)",
            color: muted,
            lineHeight: 1.55,
          }}
        />
      </div>
    </section>
  );
}
