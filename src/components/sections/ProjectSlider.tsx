"use client";

import { useEffect, useRef, useState, useContext } from "react";
import { flushSync } from "react-dom";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { gsap, SplitText, Draggable } from "@/lib/gsap";
import { PageReadyContext } from "@/context/page-ready";

// ── Types ──────────────────────────────────────────────────────────────────

/** Per-project position of the text card (CSS absolute values). */
interface CardPosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

/** Static (non-translatable) project data. All text lives in messages/*.json. */
interface ProjectStatic {
  id: string; // "01" … "06"
  image: string; // large background image URL
  thumb: string; // thumbnail URL
  accentColor: string; // thumbnail dark bg tint
  href: string;
  /** Where the text card is anchored on the image rectangle. */
  card: CardPosition;
}

// ── Static project data ────────────────────────────────────────────────────
// Text (title, category, descriptions[], taglines[]) lives in messages/*.json.
// Vary `card` to give each project a distinct layout personality.

const PROJECTS: ProjectStatic[] = [
  {
    id: "01",
    image: "https://picsum.photos/seed/arbc01/1600/900",
    thumb: "https://picsum.photos/seed/arbc01/400/260",
    accentColor: "#2d1a4a",
    href: "#",
    card: { top: "-1.5rem", left: "1.75rem" }, // overflows top-left
  },
  {
    id: "02",
    image: "https://picsum.photos/seed/arbc02/1600/900",
    thumb: "https://picsum.photos/seed/arbc02/400/260",
    accentColor: "#0e2233",
    href: "#",
    card: { top: "-1.5rem", right: "1.75rem" }, // overflows top-right
  },
  {
    id: "03",
    image: "https://picsum.photos/seed/arbc03/1600/900",
    thumb: "https://picsum.photos/seed/arbc03/400/260",
    accentColor: "#1a100a",
    href: "#",
    card: { top: "28%", left: "1.75rem" }, // mid-height left
  },
  {
    id: "04",
    image: "https://picsum.photos/seed/arbc04/1600/900",
    thumb: "https://picsum.photos/seed/arbc04/400/260",
    accentColor: "#0a1f12",
    href: "#",
    card: { bottom: "5.5rem", left: "1.75rem" }, // lower-left (above rail)
  },
  {
    id: "05",
    image: "https://picsum.photos/seed/arbc05/1600/900",
    thumb: "https://picsum.photos/seed/arbc05/400/260",
    accentColor: "#1e0f28",
    href: "#",
    card: { top: "18%", right: "1.75rem" }, // upper-right
  },
  {
    id: "06",
    image: "https://picsum.photos/seed/arbc06/1600/900",
    thumb: "https://picsum.photos/seed/arbc06/400/260",
    accentColor: "#0f1e12",
    href: "#",
    card: { bottom: "-1.5rem", left: "1.75rem" }, // overflows bottom-left
  },
];

// ── Thumbnail layout constants ─────────────────────────────────────────────

const N = PROJECTS.length;
const THUMB_W = 172;
const THUMB_H = 108;
const THUMB_GAP = 10;
const STEP = THUMB_W + THUMB_GAP;
const RAIL_W = 3 * THUMB_W + 2 * THUMB_GAP;
const CENTER_OFFSET = Math.floor((RAIL_W - THUMB_W) / 2);

const TRIPLE = [...PROJECTS, ...PROJECTS, ...PROJECTS];

function targetX(index: number): number {
  return CENTER_OFFSET - (N + index) * STEP;
}

// ── Component ──────────────────────────────────────────────────────────────

export default function ProjectSlider() {
  const t = useTranslations("Projects");
  const isPageReady = useContext(PageReadyContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const isTransitioning = useRef(false);

  // Theme — use mounted guard to avoid hydration mismatch
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : true;

  // Derived theme tokens
  const cardBg = isDark
    ? "rgba(14, 14, 14, 0.84)"
    : "rgba(204, 204, 204, 0.88)";
  const cardBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)";
  const labelClr = isDark ? "rgba(255,255,255,0.42)" : "rgba(0,0,0,0.45)";
  const headClr = isDark ? "#ffffff" : "#2B2A29";
  const descClr = isDark ? "rgba(255,255,255,0.54)" : "rgba(0,0,0,0.62)";
  const counterClr = isDark ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.38)";
  const railBg = isDark ? "rgba(25, 25, 25)" : "rgba(204, 204, 204, 0.88)";
  const nextBorder = isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.22)";
  const nextBg = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";

  // Refs
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageWipeRef = useRef<HTMLDivElement>(null);
  const textCardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descBlockRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const cursorBtnRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<Draggable | null>(null);
  // Pre-compiled quickTo functions for aesthetic cursor lag
  const xQuickRef = useRef<((v: number) => void) | null>(null);
  const yQuickRef = useRef<((v: number) => void) | null>(null);

  // ── Cursor button init ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!cursorBtnRef.current) return;
    gsap.set(cursorBtnRef.current, { opacity: 0, scale: 0.8 });
    xQuickRef.current = gsap.quickTo(cursorBtnRef.current, "x", { duration: 0.7, ease: "power3.out" });
    yQuickRef.current = gsap.quickTo(cursorBtnRef.current, "y", { duration: 0.7, ease: "power3.out" });
  }, []);

  // ── Draggable setup ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!trackRef.current) return;
    gsap.set(trackRef.current, { x: targetX(0) });

    const [d] = Draggable.create(trackRef.current, {
      type: "x",
      inertia: true,
      cursor: "grab",
      activeCursor: "grabbing",
      snap: (val: number) => Math.round(val / STEP) * STEP,
      onDrag: function (this: Draggable) {
        infiniteWrap(this);
      },
      onThrowUpdate: function (this: Draggable) {
        infiniteWrap(this);
      },
      onThrowComplete: function (this: Draggable) {
        const x = gsap.getProperty(trackRef.current!, "x") as number;
        const raw = Math.round((CENTER_OFFSET - x) / STEP);
        setActiveIndex(((raw % N) + N) % N);
      },
    });

    draggableRef.current = d;
    return () => {
      d.kill();
    };
  }, []);

  function infiniteWrap(d: Draggable) {
    const x = d.x;
    const setWidth = N * STEP;
    // origin = x that centres item 0 of the middle clone set
    const origin = CENTER_OFFSET - N * STEP;
    const rel = x - origin;
    // Map rel into [0, setWidth) then shift to (-setWidth, 0]
    // so the middle clone is always the "active" set no matter how far x travelled
    const wrapped = ((rel % setWidth) + setWidth) % setWidth;
    const newX = origin + (wrapped === 0 ? 0 : wrapped - setWidth);
    if (Math.abs(newX - x) > 0.5) {
      gsap.set(d.target, { x: newX });
      d.update();
    }
  }

  // ── Page-ready entrance ────────────────────────────────────────────────────
  useEffect(() => {
    if (!isPageReady || !headlineRef.current) return;
    animateTextIn(0.1);
  }, [isPageReady]);

  function animateTextIn(delay = 0) {
    if (!headlineRef.current) return;
    const split = new SplitText(headlineRef.current, { type: "words" });
    gsap.set(split.words, { y: 28, opacity: 0 });
    gsap.to(split.words, {
      y: 0,
      opacity: 1,
      stagger: 0.038,
      duration: 0.5,
      ease: "expo.out",
      delay,
      onComplete: () => split.revert(),
    });
    if (descBlockRef.current)
      gsap.fromTo(
        descBlockRef.current,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: "expo.out",
          delay: delay + 0.12,
        },
      );
    if (taglineRef.current)
      gsap.fromTo(
        taglineRef.current,
        { x: 14, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          ease: "expo.out",
          delay: delay + 0.24,
        },
      );
  }

  // ── Project switch ─────────────────────────────────────────────────────────
  const switchProject = (nextIndex: number) => {
    if (isTransitioning.current) return;
    const idx = ((nextIndex % N) + N) % N;
    if (idx === activeIndex) return;
    isTransitioning.current = true;

    gsap.to(trackRef.current, {
      x: targetX(idx),
      ease: "expo.out",
      duration: 0.58,
      onComplete: () => {
        draggableRef.current?.update();
      },
    });

    const tl = gsap.timeline({
      onComplete: () => {
        flushSync(() => setActiveIndex(idx));
        runEntrance();
      },
    });

    tl.to(textCardRef.current, {
      y: -12,
      opacity: 0,
      duration: 0.26,
      ease: "power2.in",
    });
    tl.to(
      imageWipeRef.current,
      { clipPath: "inset(0 100% 0 0%)", duration: 0.4, ease: "power2.inOut" },
      "<0.05",
    );
  };

  const runEntrance = () => {
    gsap.set(textCardRef.current, { y: 0, opacity: 1 });
    gsap.fromTo(
      imageWipeRef.current,
      { clipPath: "inset(0 0% 0 100%)" },
      { clipPath: "inset(0 0% 0 0%)", duration: 0.46, ease: "power2.inOut" },
    );
    if (headlineRef.current) {
      const split = new SplitText(headlineRef.current, { type: "words" });
      gsap.set(split.words, { y: 28, opacity: 0 });
      gsap.to(split.words, {
        y: 0,
        opacity: 1,
        stagger: 0.028,
        duration: 0.4,
        ease: "expo.out",
        delay: 0.06,
        onComplete: () => {
          split.revert();
          isTransitioning.current = false;
        },
      });
    } else {
      isTransitioning.current = false;
    }
    if (descBlockRef.current)
      gsap.fromTo(
        descBlockRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "expo.out", delay: 0.1 },
      );
    if (taglineRef.current)
      gsap.fromTo(
        taglineRef.current,
        { x: 14, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.38, ease: "expo.out", delay: 0.2 },
      );
  };

  // ── Cursor follower ────────────────────────────────────────────────────────
  const handleMouseEnter = () =>
    gsap.to(cursorBtnRef.current, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.7)" });

  const handleMouseLeave = () =>
    // Fade out at current position — no x/y reset so it doesn't snap to centre
    gsap.to(cursorBtnRef.current, { opacity: 0, scale: 0.85, duration: 0.4, ease: "power2.in" });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = imageContainerRef.current!.getBoundingClientRect();
    // quickTo fires a pre-compiled tween each frame — smoother aesthetic lag than gsap.to
    xQuickRef.current?.(e.clientX - r.left - r.width / 2);
    yQuickRef.current?.(e.clientY - r.top - r.height / 2);
  };

  // ── Translated content for active project ────────────────────────────────
  const project = PROJECTS[activeIndex];
  const pid = `p${project.id}` as const;
  const descriptions = t.raw(`${pid}.descriptions`) as string[];
  const taglines = t.raw(`${pid}.taglines`) as string[];

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <section
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100dvh",
        padding: "5rem 2rem 5rem",
      }}
    >
      {/* Outer rectangle — overflow visible so card can stick out at any edge */}
      <div
        style={{
          position: "relative",
          width: "min(88vw, 1340px)",
          height: "clamp(400px, 62vh, 760px)",
        }}
      >
        {/* ── Background image (full rectangle) ──────────────────────────── */}
        <div
          ref={imageContainerRef}
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            cursor: "pointer",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          {/* Clip-path wipe wrapper */}
          <div
            ref={imageWipeRef}
            style={{
              position: "absolute",
              inset: 0,
              clipPath: "inset(0 0% 0 0%)",
              willChange: "clip-path",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={t(`${pid}.title`)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          {/* Vignette overlay — subtle across all edges */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: [
                "linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 55%)",
                "linear-gradient(to top,   rgba(0,0,0,0.5)  0%, transparent 45%)",
                "linear-gradient(to bottom,rgba(0,0,0,0.25) 0%, transparent 35%)",
              ].join(", "),
              pointerEvents: "none",
            }}
          />
        </div>

        {/* ── Cursor-following "Voir le projet" button ─────────────────── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            zIndex: 8,
          }}
        >
          <div
            ref={cursorBtnRef}
            style={{
              width: "108px",
              height: "108px",
              borderRadius: "50%",
              backgroundColor: "#e7501e",
              color: "#fff",
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              willChange: "transform, opacity",
              userSelect: "none",
              lineHeight: 1.3,
              padding: "0 1rem",
            }}
          >
            {t("viewProject")}
          </div>
        </div>

        {/* ── Text card — position varies per project ───────────────────── */}
        <div
          ref={textCardRef}
          style={{
            position: "absolute",
            ...project.card, // ← per-project anchor
            width: "min(380px, 40%)",
            zIndex: 10,
            backgroundColor: cardBg,
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            borderRadius: "0.75rem",
            border: `1px solid ${cardBorder}`,
            padding: "1.6rem 1.4rem",
            pointerEvents: "none",
          }}
        >
          {/* Category label */}
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-xs)",
              color: labelClr,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "0.8rem",
            }}
          >
            {project.id} — {t(`${pid}.category`)}
          </span>

          {/* Headline (SplitText target) */}
          <h2
            ref={headlineRef}
            style={{
              fontFamily: "var(--font-title)",
              fontSize: "clamp(1.05rem, 1.8vw, 1.65rem)",
              fontWeight: 700,
              fontStyle: "italic",
              lineHeight: 1.22,
              letterSpacing: "-0.01em",
              color: headClr,
              marginBottom: "1rem",
            }}
          >
            {t(`${pid}.title`)}
          </h2>

          {/* Description block — one or more paragraphs, animated as a unit */}
          <div ref={descBlockRef} style={{ marginBottom: "1.2rem" }}>
            {descriptions.map((para, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  color: descClr,
                  lineHeight: 1.65,
                  marginBottom: i < descriptions.length - 1 ? "0.65rem" : 0,
                }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Taglines — one or more pills, animated as a unit */}
          <div
            ref={taglineRef}
            style={{ display: "flex", flexDirection: "column", gap: "0.22rem" }}
          >
            {taglines.map((line, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  alignSelf: "flex-start",
                  backgroundColor: "#e7501e",
                  color: "#fff",
                  fontFamily: "var(--font-title)",
                  fontSize: "var(--text-xs)",
                  fontStyle: "italic",
                  fontWeight: 600,
                  padding: "0.22rem 0.6rem",
                }}
              >
                {line}
              </span>
            ))}
          </div>
        </div>

        {/* ── Thumbnail rail + Next button (bottom-right) ───────────────── */}
        <div
          style={{
            position: "absolute",
            bottom: "-2.5rem",
            right: "-10rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            zIndex: 10,
          }}
        >
          {/* Visual shell — background + padding live here, outside the clipping container */}
          <div
            style={{
              backgroundColor: railBg,
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              padding: "1rem",
            }}
          >
            {/* Rail window — exact RAIL_W × THUMB_H, no padding, no background */}
            <div
              style={{
                width: `${RAIL_W}px`,
                height: `${THUMB_H}px`,
                overflow: "hidden",
                cursor: "grab",
              }}
            >
            {/* Draggable track — triple-cloned for infinite loop */}
            <div
              ref={trackRef}
              style={{
                display: "flex",
                gap: `${THUMB_GAP}px`,
                width: "max-content",
                willChange: "transform",
                userSelect: "none",
              }}
            >
              {TRIPLE.map((p, i) => {
                const realIndex = i % N;
                const isActive = realIndex === activeIndex;
                return (
                  <button
                    key={`${p.id}-${i}`}
                    onClick={() => switchProject(realIndex)}
                    aria-label={`${p.id} — ${t(`p${p.id}.category`)}`}
                    style={{
                      flexShrink: 0,
                      width: `${THUMB_W}px`,
                      height: `${THUMB_H}px`,
                      border: "none",
                      padding: 0,
                      overflow: "hidden",
                      position: "relative",
                      cursor: "pointer",
                      background: p.accentColor,
                    }}
                  >
                    {/* Thumbnail image */}
                    <img
                      src={p.thumb}
                      alt=""
                      draggable={false}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: isActive ? 0.88 : 0.48,
                        transition: "opacity 0.32s ease",
                        pointerEvents: "none",
                      }}
                    />

                    {/* Active indicator — bottom underline only (no border) */}
                    <span
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: "50%",
                        height: "3px",
                        backgroundColor: "#e7501e",
                        opacity: isActive ? 1 : 0,
                        transition: "opacity 0.32s ease",
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
          </div>

          {/* Next button */}
          <button
            onClick={() => switchProject(activeIndex + 1)}
            aria-label={t("next")}
            onMouseEnter={(e) =>
              gsap.to(e.currentTarget, {
                scale: 1.12,
                duration: 0.2,
                ease: "power2.out",
              })
            }
            onMouseLeave={(e) =>
              gsap.to(e.currentTarget, {
                scale: 1,
                duration: 0.2,
                ease: "power2.out",
              })
            }
            style={{
              flexShrink: 0,
              width: "44px",
              height: "44px",
              borderRadius: "9999px",
              border: `1px solid ${nextBorder}`,
              background: nextBg,
              backdropFilter: "blur(6px)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#e7501e",
            }}
          >
            {/* angle-small-right.svg — fill inherits button color */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                fill="currentColor"
                d="M15.4,9.88,10.81,5.29a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L14,11.29a1,1,0,0,1,0,1.42L9.4,17.29a1,1,0,0,0,1.41,1.42l4.59-4.59A3,3,0,0,0,15.4,9.88Z"
              />
            </svg>
          </button>
        </div>


      </div>
    </section>
  );
}
