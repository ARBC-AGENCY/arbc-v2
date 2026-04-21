"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ORANGE, BG } from "./_constants";
import MemberCard from "./MemberCard";
import ArrowBtn from "./ArrowBtn";

const TEXT = "#e5e2e1";
const MUTED = "rgba(255,255,255,0.4)";
const BORDER = "rgba(255,255,255,0.08)";
const CARD_W = 260;

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
        x: -(next * CARD_W),
        duration: 1,
        ease: "power1.inOut",
      });
  };

  return (
    <section
      ref={sectionRef}
      className="about-founders py-12 px-6 md:py-16 md:px-12 lg:py-24 lg:px-20"
      style={{ backgroundColor: BG }}
    >
      <div
        className="about-founders__inner mx-auto"
        style={{ maxWidth: "1400px" }}
      >
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
              fontWeight: 700,
              fontStyle: "italic",
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              margin: 0,
              color: TEXT,
            }}
            className="text-2xl! md:text-3xl!"
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

        {/* Mobile/tablet: single-item carousel — mirrors TeamSection layout */}
        <div className="founders-carousel" style={{ display: "none" }}>
          {/* Arrow + window + arrow row */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1.5rem",
            }}
            className="flex items-end md:items-center"
          >
            <ArrowBtn
              dir="left"
              onClick={() => goTo(activeIdx - 1)}
              label="Previous"
            />

            {/* Fixed-width window clips to one card */}
            <div
              style={{
                width: `${CARD_W}px`,
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <div
                ref={trackRef}
                style={{ display: "flex", willChange: "transform" }}
              >
                {founders.map((f) => (
                  <div
                    key={f.name}
                    style={{ width: `${CARD_W}px`, flexShrink: 0 }}
                  >
                    <MemberCard
                      src={f.src}
                      name={f.name}
                      role={f.role}
                      style={{ width: `${CARD_W}px` }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <ArrowBtn
              dir="right"
              onClick={() => goTo(activeIdx + 1)}
              label="Next"
            />
          </div>

          {/* Dot indicators */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "0.5rem",
              marginTop: "1.75rem",
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
        @media (max-width: 1023px) {
          .founders-grid     { display: none !important; }
          .founders-carousel { display: block !important; }
        }
      `}</style>
    </section>
  );
}
