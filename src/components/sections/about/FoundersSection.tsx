"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ORANGE, BG } from "./_constants";
import MemberCard from "./MemberCard";

const TEXT = "#e5e2e1";
const MUTED = "rgba(255,255,255,0.4)";
const BORDER = "rgba(255,255,255,0.08)";

export default function FoundersSection({
  title,
  subtitle,
  founders,
}: {
  title: string;
  subtitle: string;
  founders: { src: string; name: string; role: string }[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

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
          delay: i * 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );
    });
  }, []);

  const goTo = (idx: number) => {
    const next = (idx + founders.length) % founders.length;
    setActiveIdx(next);
    if (trackRef.current)
      gsap.to(trackRef.current, {
        x: `-${next * 100}%`,
        duration: 0.55,
        ease: "expo.out",
      });
  };

  return (
    <section
      ref={sectionRef}
      style={{ padding: "6rem 0", backgroundColor: BG }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 5rem" }}>
        {/* Header */}
        <div
          className="fade-up"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            borderBottom: `1px solid ${BORDER}`,
            paddingBottom: "1rem",
            marginBottom: "3.5rem",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-title)",
              fontSize: "var(--text-4xl)",
              fontWeight: 700,
              fontStyle: "italic",
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              margin: 0,
              color: TEXT,
            }}
          >
            <span style={{ color: ORANGE }}>.</span>
            {title}
          </h2>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-xs)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            {subtitle}
          </span>
        </div>

        {/* Desktop: 4-column grid */}
        <div
          className="founders-grid fade-up"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2rem",
          }}
        >
          {founders.map((f) => (
            <MemberCard key={f.name} src={f.src} name={f.name} role={f.role} />
          ))}
        </div>

        {/* Mobile: single-item carousel */}
        <div className="founders-carousel" style={{ display: "none" }}>
          <div style={{ overflow: "hidden" }}>
            <div
              ref={trackRef}
              style={{ display: "flex", willChange: "transform" }}
            >
              {founders.map((f) => (
                <div
                  key={f.name}
                  style={{
                    minWidth: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <MemberCard src={f.src} name={f.name} role={f.role} />
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "0.5rem",
              marginTop: "2rem",
            }}
          >
            {founders.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  border: "none",
                  padding: 0,
                  backgroundColor:
                    i === activeIdx ? ORANGE : "rgba(255,255,255,0.3)",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .founders-grid     { display: none !important; }
          .founders-carousel { display: block !important; }
        }
      `}</style>
    </section>
  );
}
