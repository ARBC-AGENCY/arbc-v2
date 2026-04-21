"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ORANGE, BG } from "./_constants";

const TEXT = "#e5e2e1";
const MUTED = "rgba(229,226,225,0.6)";

export default function HistorySection({
  tag,
  title,
  p1,
  p2,
  timeline,
}: {
  tag: string;
  title: string;
  p1: string;
  p2: string;
  timeline: { year: string; label: string }[];
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const els = sectionRef.current.querySelectorAll<HTMLElement>(".fade-up");
    els.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: i * 0.08,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex justify-center py-12 px-6 md:py-16 md:px-12 lg:py-24 lg:px-20"
      style={{ backgroundColor: BG }}
    >
      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-center"
        style={{ maxWidth: "1400px" }}
      >
        {/* Left — vertical timeline (tablet+) */}
        <div
          className="fade-up hidden md:block"
          style={{ position: "relative" }}
        >
          <div
            style={{
              position: "absolute",
              top: "-2.5rem",
              left: "-2.5rem",
              width: "10rem",
              height: "10rem",
              backgroundColor: ORANGE,
              borderRadius: "50%",
              filter: "blur(100px)",
              opacity: 0.2,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "relative",
              borderLeft: `3px solid ${ORANGE}`,
              paddingLeft: "2.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            {timeline.map(({ year, label }) => (
              <div key={year} style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    left: "-3rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "10px",
                    height: "10px",
                    backgroundColor: ORANGE,
                    borderRadius: "50%",
                  }}
                />
                <p
                  style={{
                    fontFamily: "var(--font-title)",
                    fontSize: "var(--text-lg)",
                    fontWeight: 700,
                    fontStyle: "italic",
                    color: ORANGE,
                    margin: 0,
                    lineHeight: 1,
                  }}
                >
                  {year}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-sm)",
                    color: MUTED,
                    margin: 0,
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Left — horizontal timeline (mobile only) */}
        <div
          className="fade-up block md:hidden"
          style={{ position: "relative" }}
        >
          {/* Connecting line */}
          <div
            style={{
              position: "absolute",
              top: "4px",
              left: "5px",
              right: "5px",
              height: "2px",
              backgroundColor: ORANGE,
              opacity: 0.4,
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            {timeline.map(({ year, label }) => (
              <div
                key={year}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 1,
                  paddingTop: 0,
                }}
              >
                {/* Dot */}
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: ORANGE,
                    flexShrink: 0,
                    marginBottom: "0.6rem",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
                <p
                  style={{
                    fontFamily: "var(--font-title)",
                    fontSize: "var(--text-sm)",
                    fontWeight: 700,
                    fontStyle: "italic",
                    color: ORANGE,
                    margin: 0,
                    lineHeight: 1,
                    textAlign: "center",
                  }}
                >
                  {year}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.65rem",
                    color: MUTED,
                    margin: "0.3rem 0 0",
                    textAlign: "center",
                    lineHeight: 1.3,
                    padding: "0 2px",
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — text */}
        <div className="fade-up">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
            className="mb-2 md:mb-6"
          >
            <div
              style={{ width: "1rem", height: "1rem", backgroundColor: ORANGE }}
            />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-xs)",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: ORANGE,
              }}
            >
              {tag}
            </span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-title)",
              fontWeight: 700,
              fontStyle: "italic",
              letterSpacing: "-0.03em",
              color: TEXT,
            }}
            className="text-xl! mb-2 md:mb-4 md:text-3xl! "
          >
            {title}
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-xs)",
              lineHeight: 1.8,
              color: MUTED,
            }}
          >
            <p style={{ margin: 0, fontSize: "var(--text-sm)" }}>{p1}</p>
            <p style={{ margin: 0, fontSize: "var(--text-sm)" }}>{p2}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
