"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
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

/**
 * Renders text with one inline highlighted word, using three chained TextType
 * instances (before → highlighted → after) so the typing animation flows through.
 */
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
   * Phases — strict sequential chain:
   *  0 — idle
   *  1 — b1p1 (TextType)
   *  2 — b1p2 (TextType)
   *  3 — b1p3 (TextType, "Strategic"/"stratégique" highlighted)
   *  4 — b2prefix (TextType)
   *  5 — b2main (TextType, "lines"/"lignes" highlighted)
   *  6 — b2sub (TextType)
   *  7 — b3prefix (TextType)
   *  8 — b3main (TextType, orange highlight)
   *  9 — b3sub (TextType) — end of sequence
   */
  const [phase, setPhase] = useState(0);

  useEffect(() => setMounted(true), []);

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

  return (
    <section className="relative w-full min-h-screen">
      {/* ── Block 1 — upper left ─────────────────────── */}
      <div className="absolute top-[22%] left-6 lg:left-12 max-w-90">
        {/* Phase 1 */}
        <TextType
          text={b1p1}
          animate={phase >= 1}
          typingSpeed={75}
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

        {/* Phase 2 */}
        <div style={{ marginTop: "1em" }}>
          <TextType
            text={b1p2}
            animate={phase >= 2}
            typingSpeed={75}
            showCursor={false}
            style={{
              ...base,
              fontSize: "var(--text-md)",
              color: muted,
            }}
            onComplete={() => pause(3, 250)}
          />
        </div>

        {/* Phase 3 — "Strategic" / "stratégique" highlighted */}
        <HighlightTextType
          text={b1p3}
          highlightWords={["Strategic", "stratégique"]}
          animate={phase >= 3}
          typingSpeed={75}
          showCursor
          cursorCharacter="_"
          style={{
            ...base,
            fontSize: "var(--text-lg)",
            color: "#cccccc",
            fontWeight: 700,
            lineHeight: 1.15,
          }}
          highlightStyle={wordHighlight}
          onComplete={() => pause(4, 1000)}
        />
      </div>

      {/* ── Block 2 — center ─────────────────────────── */}
      <div className="absolute top-[45%] left-[40%] max-w-105">
        <div
          className="mb-3"
          style={{
            ...base,
            fontSize: "var(--text-lg)",
            lineHeight: 1.2,
          }}
        >
          {/* Phase 4 */}
          <TextType
            text={b2prefix}
            animate={phase >= 4}
            typingSpeed={75}
            showCursor={false}
            style={{
              color: muted,
              marginRight: "0.3em",
              fontSize: "var(--text-md)",
            }}
            onComplete={() => pause(5, 100)}
          />

          {/* Phase 5 — "lines" / "lignes" highlighted */}
          <HighlightTextType
            text={b2main}
            highlightWords={["lines", "lignes"]}
            animate={phase >= 5}
            typingSpeed={75}
            showCursor
            cursorCharacter="_"
            style={{
              color: "#cccccc",
              fontStyle: "normal",
              fontWeight: 700,
            }}
            highlightStyle={wordHighlight}
            onComplete={() => pause(6, 300)}
          />

          {/* Phase 6 */}
          <TextType
            text={b2sub}
            animate={phase >= 6}
            typingSpeed={75}
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

      {/* ── Block 3 — lower right ────────────────────── */}
      <div className="absolute bottom-[20%] right-6 lg:right-12 w-90 text-left">
        <div
          className="mb-2"
          style={{
            ...base,
            fontSize: "var(--text-md)",
            lineHeight: 1.1,
          }}
        >
          {/* Phase 7 */}
          <TextType
            text={b3prefix}
            animate={phase >= 7}
            typingSpeed={75}
            showCursor={false}
            style={{ color: muted, marginRight: "0.3em" }}
            onComplete={() => pause(8, 50)}
          />

          {/* Phase 8 — TextType with full orange highlight */}
          <TextType
            text={b3main}
            animate={phase >= 8}
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
            onComplete={() => pause(9, 50)}
          />

          <TextType
            text={b3sub}
            animate={phase >= 9}
            typingSpeed={75}
            showCursor={false}
            style={{
              ...base,
              fontSize: "var(--text-md)",
              color: muted,
              lineHeight: 1.55,
              marginLeft: "0.3em",
            }}
          />
        </div>
      </div>
    </section>
  );
}
