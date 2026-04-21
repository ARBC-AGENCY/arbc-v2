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
      style={{ padding: "6rem 5rem", backgroundColor: BG }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "center",
        }}
      >
        {/* Left — timeline */}
        <div className="fade-up" style={{ position: "relative" }}>
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

        {/* Right — text */}
        <div className="fade-up">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
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
              fontSize: "var(--text-3xl)",
              fontWeight: 700,
              fontStyle: "italic",
              letterSpacing: "-0.03em",
              marginBottom: "1rem",
              color: TEXT,
            }}
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
