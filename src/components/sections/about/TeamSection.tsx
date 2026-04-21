"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ORANGE, BG } from "./_constants";
import MemberCard from "./MemberCard";
import ArrowBtn from "./ArrowBtn";

import imgChristian from "@/assets/images/team/Christian.webp";
import imgDuval     from "@/assets/images/team/Duval.webp";
import imgFranck    from "@/assets/images/team/Franck.webp";
import imgHarold    from "@/assets/images/team/Harold.webp";
import imgIness     from "@/assets/images/team/Iness.webp";
import imgJeanne    from "@/assets/images/team/Jeanne.webp";
import imgJuly      from "@/assets/images/team/July.webp";
import imgKarel     from "@/assets/images/team/Karel.webp";
import imgKlad      from "@/assets/images/team/Klad.webp";
import imgLoic      from "@/assets/images/team/Loic.webp";
import imgOphelie   from "@/assets/images/team/Ophelie.webp";
import imgPatrick   from "@/assets/images/team/Patrick.webp";
import imgRogers    from "@/assets/images/team/Rogers.webp";

const TEXT   = "#e5e2e1";
const MUTED  = "rgba(255,255,255,0.4)";
const BORDER = "rgba(255,255,255,0.08)";

const TEAM_MEMBERS = [
  { src: imgChristian.src, name: "Christian Nessack", role: "Digital Manager" },
  { src: imgDuval.src,     name: "Duval Georges",     role: "Directeur Artistique" },
  { src: imgFranck.src,    name: "Franc Ymele",    role: "Infographiste" },
  { src: imgHarold.src,    name: "Harold Ngueda",    role: "Dev Master" },
  { src: imgIness.src,     name: "Inesse Siankam",     role: "Assistante Digital Manager" },
  { src: imgJeanne.src,    name: "Jeanne Nnoubobong",    role: "Project Manager" },
  { src: imgJuly.src,      name: "Juliana Ndjap",      role: "Chef de Marque" },
  { src: imgKarel.src,     name: "Carelle Djiottio",     role: "Infographiste" },
  { src: imgKlad.src,      name: "Armel Kuete",      role: "Infographiste" },
  { src: imgLoic.src,      name: "Loïc Tayo",      role: "Directeur Artistique" },
  { src: imgOphelie.src,   name: "Ophélie Ongolo",   role: "Project Manager" },
  { src: imgPatrick.src,   name: "John Patrick",   role: "Infographiste" },
  { src: imgRogers.src,    name: "Roger Efala",    role: "Assistant Project Manager" },
];

const CARD_W = 260;
const GAP    = 24;
const UNIT   = CARD_W + GAP;
const N      = TEAM_MEMBERS.length;

const tripled = [...TEAM_MEMBERS, ...TEAM_MEMBERS, ...TEAM_MEMBERS];

export default function TeamSection({
  title,
  subtitle,
  prevLabel,
  nextLabel,
}: {
  title: string;
  subtitle: string;
  prevLabel: string;
  nextLabel: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const posRef     = useRef(N);
  const animRef    = useRef(false);
  const [visible, setVisible] = useState(4);
  const windowW = visible * CARD_W + (visible - 1) * GAP;

  const slide = (dir: 1 | -1) => {
    if (animRef.current || !trackRef.current) return;
    animRef.current = true;
    posRef.current += dir;

    gsap.to(trackRef.current, {
      x: -posRef.current * UNIT,
      duration: 1.5,
      ease: "power1.inOut",
      onComplete: () => {
        animRef.current = false;
        if (posRef.current >= N * 2) {
          posRef.current = N;
          gsap.set(trackRef.current!, { x: -posRef.current * UNIT });
        } else if (posRef.current < N) {
          posRef.current = N * 2 - 1;
          gsap.set(trackRef.current!, { x: -posRef.current * UNIT });
        }
      },
    });
  };

  // Responsive visible-card count: 1 on mobile, 2 on tablet, 4 on desktop
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setVisible(w < 640 ? 1 : w < 1024 ? 2 : 4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Reset track position + autoplay only on desktop (visible === 4)
  useEffect(() => {
    if (!trackRef.current) return;
    posRef.current = N;
    gsap.set(trackRef.current, { x: -N * UNIT });

    if (visible < 4) return; // no autoplay on mobile / tablet
    const interval = setInterval(() => {
      if (!animRef.current) slide(1);
    }, 3000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

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

  return (
    <section
      ref={sectionRef}
      className="about-team py-12 px-6 md:py-16 md:px-12 lg:py-24 lg:px-20"
      style={{ backgroundColor: BG }}
    >
      <div
        className="about-team__header mx-auto mb-10 md:mb-14"
        style={{ maxWidth: "1400px" }}
      >
        <div
          className="fade-up"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            borderBottom: `1px solid ${BORDER}`,
            paddingBottom: "1rem",
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
          <span style={{ color: ORANGE }}>.</span>  {title} 
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
      </div>

      {/* Centered row: arrow + window + arrow */}
      <div
        className="fade-up"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        <ArrowBtn dir="left" onClick={() => slide(-1)} label={prevLabel} />

        <div style={{ width: `${windowW}px`, overflow: "hidden", flexShrink: 0 }}>
          <div
            ref={trackRef}
            style={{ display: "flex", gap: `${GAP}px`, willChange: "transform" }}
          >
            {tripled.map((m, i) => (
              <MemberCard
                key={`${m.name}-${i}`}
                src={m.src}
                name={m.name}
                role={m.role}
                style={{ width: `${CARD_W}px`, flexShrink: 0 }}
              />
            ))}
          </div>
        </div>

        <ArrowBtn dir="right" onClick={() => slide(1)} label={nextLabel} />
      </div>

    </section>
  );
}
