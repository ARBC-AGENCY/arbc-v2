"use client";

import { useTranslations } from "next-intl";
import { useTransitionContext } from "@/context/TransitionContext";
import type { TextSegment } from "./types";
import { PROJECTS } from "./data";
import { TRIPLE, THUMB_W, THUMB_H, THUMB_GAP, N } from "./constants";
import { useProjectSlider } from "./useProjectSlider";

export default function ProjectSlider() {
  const t = useTranslations("Projects");
  const { navigate } = useTransitionContext();
  const s = useProjectSlider();

  // Translated content for the active project
  const project = PROJECTS[s.activeIndex];
  const pid = `p${project.id}` as const;
  const descriptions = t.raw(`${pid}.descriptions`) as string[];
  const taglines = t.raw(`${pid}.taglines`) as string[];

  // ── Segment renderer ─────────────────────────────────────────────────────
  // headlineAssigned tracks whether headlineRef has been wired to a <h2> yet
  // (first "title" segment wins, so SplitText always has a target).
  let headlineAssigned = false;

  function renderSegment(seg: TextSegment, si: number): React.ReactNode {
    switch (seg.type) {
      // ── label — small uppercase category line ──────────────────────────
      case "label":
        return (
          <span
            key={si}
            style={{
              display: "block",
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-xs)",
              color: "inherit",
              opacity: 0.55,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "0.8rem",
              ...seg.style,
            }}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: project.id + " — " + t(`${pid}.category`),
            }}
          />
        );

      // ── title — main headline (SplitText target) ───────────────────────
      case "title": {
        const assignRef = !headlineAssigned;
        if (assignRef) headlineAssigned = true;
        return (
          <h2
            key={si}
            ref={assignRef ? s.headlineRef : undefined}
            style={{
              fontFamily: "var(--font-title)",
              fontSize: "clamp(1.05rem, 1.8vw, 1.65rem)",
              fontWeight: 700,
              fontStyle: "italic",
              lineHeight: 1,
              letterSpacing: "-0.01em",
              color: "inherit", // inherits block color; override via seg.style
              marginBottom: "1rem",
              ...seg.style,
            }}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: t(`${pid}.title`) }}
          />
        );
      }

      // ── desc — one or more description paragraphs ──────────────────────
      case "desc":
        return (
          <div key={si} style={{ marginBottom: "1.2rem" }}>
            {descriptions.map((para, i) => (
              <p
                key={i}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: para }}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  color: "inherit",
                  opacity: 0.75,
                  lineHeight: 1.65,
                  marginBottom: i < descriptions.length - 1 ? "0.65rem" : 0,
                  ...seg.style,
                }}
              />
            ))}
          </div>
        );

      // ── tagline — pill(s) ──────────────────────────────────────────────
      case "tagline":
        return (
          <div
            key={si}
            style={{ display: "flex", flexDirection: "column", gap: "0.22rem" }}
          >
            {taglines.map((line, i) => (
              <span
                key={i}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: line }}
                style={{
                  display: "inline-block",
                  alignSelf: "flex-start",
                  backgroundColor: seg.pillBg ?? "#e7501e",
                  color: seg.pillColor ?? "#fff",
                  fontFamily: "var(--font-title)",
                  fontSize: "var(--text-sm)",
                  fontStyle: "italic",
                  padding: "0.22rem 0.6rem",
                  ...seg.style,
                }}
              />
            ))}
          </div>
        );

      default:
        return null;
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────
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
      {/* Outer rectangle — overflow visible so blocks can overhang any edge */}
      <div
        className="h-[clamp(400px,62vh,760px)]"
        style={{
          position: "relative",
          width: "min(80vw, 1340px)",
        }}
      >
        {/* ── Background image (purely visual, no pointer events) ─────── */}
        <div
          ref={s.imageContainerRef}
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          {/* Theme-aware backdrop */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: s.wipeBg,
            }}
          />

          {/* Clip-path wipe wrapper */}
          <div
            ref={s.imageWipeRef}
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
                objectPosition: project.imagePosition ?? "center",
                display: "block",
              }}
            />
          </div>

          {/* Vignette */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: [
                "linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 55%)",
                "linear-gradient(to top,   rgba(0,0,0,0.5)  0%, transparent 45%)",
                "linear-gradient(to bottom,rgba(0,0,0,0.25) 0%, transparent 35%)",
              ].join(", "),
            }}
          />
        </div>

        {/* ── Interaction layer — owns mouse events + cursor circle ─────── */}
        {/* Single div so mouseleave only fires when truly leaving the card  */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            cursor: "pointer",
            zIndex: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={s.handleMouseEnter}
          onMouseLeave={s.handleMouseLeave}
          onMouseMove={s.handleMouseMove}
          onClick={() => navigate(`/projects/${project.slug}`, project.name)}
        >
          {/* Cursor circle — child of this layer, so never causes mouseleave */}
          <div
            ref={s.cursorBtnRef}
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
              pointerEvents: "none",
            }}
          >
            {t("viewProject")}
          </div>
        </div>

        {/* ── Text blocks — independently positioned per project ─────────── */}
        <div
          ref={s.blocksContainerRef}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 10,
          }}
          className="hidden md:block"
        >
          {project.blocks.map((block, bi) => (
            <div
              key={bi}
              data-text-block
              style={{
                position: "absolute",
                top: block.top,
                bottom: block.bottom,
                left: block.left,
                right: block.right,
                width: block.width ?? "min(360px, 40%)",
                backgroundColor: block.bg,
                color: block.color ?? "#ffffff",
                padding: block.padding ?? "1.6rem 1.4rem",
                borderRadius: block.borderRadius,
                backdropFilter: block.blur ? "blur(18px)" : undefined,
                WebkitBackdropFilter: block.blur ? "blur(18px)" : undefined,
                border: block.border,
              }}
            >
              {block.segments.map((seg, si) => renderSegment(seg, si))}
            </div>
          ))}
        </div>

        {/* ── Thumbnail rail + Next button ──────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            zIndex: 10,
          }}
          className="left-1/2 -translate-x-1/2 scale-55 xs:scale-70 sm:scale-85 md:left-auto md:translate-x-0 md:scale-100 -bottom-20 md:-right-15 md:-bottom-10 xl:-right-25"
        >
          {/* Previous button — mobile only */}
          <button
            className="flex items-center justify-center md:hidden"
            onClick={() => s.switchProject(s.activeIndex - 1)}
            aria-label={t("prev")}
            onMouseEnter={(e) =>
              gsap.to(e.currentTarget, { scale: 1.12, duration: 0.2, ease: "power2.out" })
            }
            onMouseLeave={(e) =>
              gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: "power2.out" })
            }
            style={{
              flexShrink: 0,
              width: "44px",
              height: "44px",
              borderRadius: "9999px",
              border: `1px solid ${s.nextBorder}`,
              background: s.nextBg,
              backdropFilter: "blur(6px)",
              cursor: "pointer",
              color: "#e7501e",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              aria-hidden="true"
              style={{ transform: "scaleX(-1)" }}
            >
              <path
                fill="currentColor"
                d="M15.4,9.88,10.81,5.29a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L14,11.29a1,1,0,0,1,0,1.42L9.4,17.29a1,1,0,0,0,1.41,1.42l4.59-4.59A3,3,0,0,0,15.4,9.88Z"
              />
            </svg>
          </button>

          {/* Visual shell — background + padding outside the clipping container */}
          <div
            style={{
              backgroundColor: s.railBg,
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              padding: "1rem",
            }}
          >
            {/* Rail window */}
            <div
              className=" w-134 h-28.5 overflow-hidden cursor-grab"
            >
              {/* Draggable track — triple-cloned */}
              <div
                ref={s.trackRef}
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
                  const isActive = realIndex === s.activeIndex;
                  return (
                    <div
                      key={`${p.id}-${i}`}
                      style={{
                        flexShrink: 0,
                        width: `${THUMB_W}px`,
                        display: "flex",
                        flexDirection: "column",
                        gap: "3px",
                      }}
                    >
                      <button
                        onClick={() => s.switchProject(realIndex)}
                        aria-label={`${p.id} — ${t(`p${p.id}.category`)}`}
                        style={{
                          width: "100%",
                          height: `${THUMB_H}px`,
                          border: "none",
                          padding: 0,
                          overflow: "hidden",
                          position: "relative",
                          cursor: "pointer",
                          background: p.accentColor,
                          flexShrink: 0,
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.logo}
                          alt={p.name}
                          draggable={false}
                          style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            padding: "16px",
                            boxSizing: "border-box",
                            opacity: isActive ? 1 : 0.55,
                            transition: "opacity 0.32s ease",
                            pointerEvents: "none",
                          }}
                        />
                      </button>

                      {/* Active indicator */}
                      <span
                        style={{
                          display: "block",
                          height: "3px",
                          backgroundColor: "#e7501e",
                          borderRadius: "2px",
                          opacity: isActive ? 1 : 0,
                          transition: "opacity 0.32s ease",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={() => s.switchProject(s.activeIndex + 1)}
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
              border: `1px solid ${s.nextBorder}`,
              background: s.nextBg,
              backdropFilter: "blur(6px)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#e7501e",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              aria-hidden="true"
            >
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

// Re-export gsap for the inline onMouseEnter/Leave handlers above
import { gsap } from "@/lib/gsap";
