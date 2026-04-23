"use client";

import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import ProjectSectionNav from "@/components/layout/ProjectSectionNav";
import PageAnnotation from "@/components/layout/PageAnnotation";
import ArrowDecor from "@/components/ui/ArrowDecor";

// ── Image assets ──────────────────────────────────────────────────────────────
import evEV00 from "@/assets/images/eventify/EV00.webp";
import evEV0002 from "@/assets/images/eventify/EV0002.webp";
import evEV001 from "@/assets/images/eventify/EV001.webp";
import evEV01 from "@/assets/images/eventify/EV01.webp";
import evEV002 from "@/assets/images/eventify/EV002.webp";
import ev1 from "@/assets/images/eventify/1.webp";
import ev2 from "@/assets/images/eventify/2.webp";
import ev3 from "@/assets/images/eventify/3.webp";
import ev4 from "@/assets/images/eventify/4.webp";
import ev5 from "@/assets/images/eventify/5.webp";

// ── Text helpers ──────────────────────────────────────────────────────────────
function BodyParagraphs({
  content,
  style,
}: {
  content: string | string[];
  style?: React.CSSProperties;
}) {
  const paras = Array.isArray(content) ? content : [content];
  return (
    <>
      {paras.map((p, i) => (
        <p key={i} dangerouslySetInnerHTML={{ __html: p }} style={{ ...style, marginTop: i > 0 ? "0.9em" : 0 }} />
      ))}
    </>
  );
}

const NUM_SECTIONS = 4;
const ORANGE = "#e7501e";
const CARD_BG = "#1c1c1c";

// ── Section 1 — Brand Presentation ───────────────────────────────────────────
function Section1({
  t,
  isDark,
}: {
  t: ReturnType<typeof useTranslations<"Eventify">>;
  isDark: boolean;
}) {
  const bg = isDark ? "#0f0f0f" : "#f0ede8";
  return (
    <section style={{ width: "100vw", height: "100vh", flexShrink: 0, position: "relative", overflow: "hidden", backgroundColor: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "relative", width: "70%", flexShrink: 0 }}>
        <Image src={evEV00} alt="Eventify" style={{ width: "100%", height: "auto", display: "block" }} />
      </div>
      <div style={{ position: "absolute", bottom: "6%", right: "7rem", width: "clamp(280px, 28vw, 420px)", backgroundColor: ORANGE, padding: "2rem 2.25rem", zIndex: 4 }}>
        <BodyParagraphs content={t.raw("s1.body") as string | string[]} style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", lineHeight: 1.3, color: "#191919", fontWeight: 500 }} />
      </div>
    </section>
  );
}

// ── Section 2 — Agency Challenge ─────────────────────────────────────────────
function Section2({
  t,
  isDark,
}: {
  t: ReturnType<typeof useTranslations<"Eventify">>;
  isDark: boolean;
}) {
  const bg = isDark ? "#0f0f0f" : "#f0ede8";
  return (
    <section style={{ width: "100vw", height: "100vh", flexShrink: 0, position: "relative", overflow: "hidden", backgroundColor: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "relative", width: "70%", flexShrink: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={evEV0002.src} alt="Eventify Challenge" style={{ width: "80%", height: "auto", display: "block" }} />
      </div>
      <div style={{ position: "absolute", right: "15rem", top: "30%", transform: "translateY(-50%)", display: "flex", alignItems: "flex-start", gap: "1.25rem", zIndex: 4 }}>
        <div style={{ width: "clamp(240px, 22vw, 360px)", backgroundColor: ORANGE, padding: "2rem 2.25rem" }}>
          <p style={{ fontFamily: "var(--font-title)", fontSize: "var(--text-md)", fontWeight: 700, fontStyle: "italic", lineHeight: 1, color: "#191919", marginBottom: "1rem" }} dangerouslySetInnerHTML={{ __html: t.raw("s2.title") as string }} />
          <BodyParagraphs content={t.raw("s2.body") as string | string[]} style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", lineHeight: 1.3, color: "#191919", fontWeight: 500 }} />
        </div>
        <ArrowDecor direction="down" size={15} style={{ flexShrink: 0, marginTop: "0.4rem" }} />
      </div>
    </section>
  );
}

// ── Section 3 — Our Response ──────────────────────────────────────────────────
function Section3({
  t,
  isDark,
}: {
  t: ReturnType<typeof useTranslations<"Eventify">>;
  isDark: boolean;
}) {
  const bg = isDark ? "#0f0f0f" : "#f0ede8";
  const textMuted = "rgba(255,255,255,0.60)";

  return (
    <section style={{ width: "100vw", height: "100vh", flexShrink: 0, position: "relative", overflow: "hidden", backgroundColor: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "90%", height: "100%", flexShrink: 0, position: "relative", overflow: "hidden", backgroundColor: bg, display: "flex", alignItems: "center" }}>
        <div style={{ width: "40%", flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "4rem 2rem 4rem 5rem", gap: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
            <ArrowDecor direction="right" size={9} style={{ flexShrink: 0, marginTop: "0.4rem" }} />
            <p style={{ fontFamily: "var(--font-title)", fontSize: "var(--text-md)", fontWeight: 700, fontStyle: "italic", lineHeight: 1.15, color: ORANGE, margin: 0 }} dangerouslySetInnerHTML={{ __html: t.raw("s3.section_title") as string }} />
          </div>
          {(["p1", "p2"] as const).map((key) => (
            <div key={key} style={{ backgroundColor: CARD_BG, padding: "1.25rem 1.5rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", marginBottom: "0.5rem" }}>
                <ArrowDecor direction="right" size={9} style={{ flexShrink: 0, marginTop: "0.2rem" }} />
                <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: 700, color: "#ffffff", lineHeight: 1.2 }}>{t(`s3.${key}_title`)}</span>
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", lineHeight: 1.6, color: textMuted, margin: 0 }}>{t(`s3.${key}_body`)}</p>
            </div>
          ))}
        </div>
        <div style={{ flex: 1, display: "flex", gap: "0.5rem", padding: "3rem 4rem 3rem 1rem", alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={evEV001.src} alt="Eventify project 1" style={{ width: "100%", height: "auto", display: "block" }} />
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={evEV01.src} alt="Eventify project 2" style={{ width: "100%", height: "auto", display: "block" }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={evEV002.src} alt="Eventify project 3" style={{ width: "100%", height: "auto", display: "block" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section 4 — Results ───────────────────────────────────────────────────────
function Section4({
  t,
  isDark,
}: {
  t: ReturnType<typeof useTranslations<"Eventify">>;
  isDark: boolean;
}) {
  const bg = isDark ? "#0f0f0f" : "#f0ede8";
  const textMuted = "rgba(255,255,255,0.60)";

  return (
    <section style={{ width: "100vw", height: "100vh", flexShrink: 0, position: "relative", overflow: "hidden", backgroundColor: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "90%", height: "100vh", flexShrink: 0, position: "relative", overflow: "hidden", backgroundColor: bg, display: "flex", alignItems: "stretch" }}>
        <div style={{ width: "33%", flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem 0.5rem 2rem 3rem", gap: "0.5rem" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ev1.src} alt="Eventify 1" style={{ width: "100%", height: "auto", display: "block" }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ev2.src} alt="Eventify 2" style={{ width: "100%", height: "auto", display: "block" }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ev3.src} alt="Eventify 3" style={{ width: "100%", height: "auto", display: "block" }} />
        </div>
        <div style={{ width: "30%", flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem 0.5rem", gap: "0.5rem" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ev5.src} alt="Eventify 5" style={{ width: "100%", height: "auto", display: "block" }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ev4.src} alt="Eventify 4" style={{ width: "100%", height: "auto", display: "block" }} />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "4rem 4rem 4rem 2rem", gap: "1.25rem" }}>
          <div>
            <span style={{ display: "inline-block", backgroundColor: ORANGE, color: "#fff", fontFamily: "var(--font-title)", fontSize: "var(--text-sm)", fontStyle: "italic", fontWeight: 700, padding: "0.25rem 0.85rem" }}>{t("s4.label")}</span>
          </div>
          {(["r1", "r2"] as const).map((key) => (
            <div key={key} style={{ backgroundColor: CARD_BG, padding: "1.25rem 1.5rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", marginBottom: "0.5rem" }}>
                <ArrowDecor direction="right" size={9} style={{ flexShrink: 0, marginTop: "0.2rem" }} />
                <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: 700, color: "#ffffff", lineHeight: 1.2 }}>{t(`s4.${key}_title`)}</span>
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", lineHeight: 1.6, color: textMuted, margin: 0 }}>{t(`s4.${key}_body`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE LAYOUT
// ─────────────────────────────────────────────────────────────────────────────

type SectionRef = (el: HTMLElement | null) => void;
type T = ReturnType<typeof useTranslations<"Eventify">>;

function MobileSection1({ t, isDark, sectionRef }: { t: T; isDark: boolean; sectionRef: SectionRef }) {
  const bg = isDark ? "#0f0f0f" : "#f0ede8";

  return (
    <section ref={sectionRef} style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", backgroundColor: bg, overflow: "hidden" }}>
      {/* Hero image */}
      <div style={{ height: "48vh", flexShrink: 0, position: "relative", overflow: "hidden" }}>
        <Image src={evEV00} alt="Eventify" fill style={{ objectFit: "contain", objectPosition: "center" }} sizes="100vw" priority />
      </div>

      {/* Orange card */}
      <div style={{ padding: "2rem 1.25rem 3rem" }}>
        <div style={{ backgroundColor: ORANGE, padding: "1.75rem 1.75rem" }}>
          <BodyParagraphs content={t.raw("s1.body") as string | string[]} style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", lineHeight: 1.3, color: "#191919", fontWeight: 500 }} />
        </div>
      </div>
    </section>
  );
}

function MobileSection2({ t, isDark, sectionRef }: { t: T; isDark: boolean; sectionRef: SectionRef }) {
  const bg = isDark ? "#0f0f0f" : "#f0ede8";

  return (
    <section ref={sectionRef} style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", backgroundColor: bg, overflow: "hidden" }}>
      {/* Challenge image */}
      <div style={{ height: "42vh", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "flex-start", padding: "4.5rem 1.25rem 1rem", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={evEV0002.src} alt="Eventify Challenge" style={{ maxWidth: "85%", height: "auto", display: "block" }} />
      </div>

      {/* Orange card */}
      <div style={{ padding: "0 1.25rem 3rem", display: "flex", alignItems: "flex-start", gap: "1rem" }}>
        <div style={{ backgroundColor: ORANGE, padding: "1.75rem", flex: 1 }}>
          <p style={{ fontFamily: "var(--font-title)", fontSize: "clamp(1.1rem, 4vw, 1.5rem)", fontWeight: 700, fontStyle: "italic", lineHeight: 1, color: "#191919", marginBottom: "1rem" }} dangerouslySetInnerHTML={{ __html: t.raw("s2.title") as string }} />
          <BodyParagraphs content={t.raw("s2.body") as string | string[]} style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", lineHeight: 1.3, color: "#191919", fontWeight: 500 }} />
        </div>
        <ArrowDecor direction="down" size={14} style={{ flexShrink: 0, marginTop: "0.4rem" }} />
      </div>
    </section>
  );
}

function MobileSection3({ t, isDark, sectionRef }: { t: T; isDark: boolean; sectionRef: SectionRef }) {
  const bg = isDark ? "#0f0f0f" : "#f0ede8";
  const textMuted = "rgba(255,255,255,0.60)";

  return (
    <section ref={sectionRef} style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", backgroundColor: bg, overflow: "hidden" }}>
      {/* Section title + 2 cards */}
      <div style={{ padding: "4.5rem 1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
          <ArrowDecor direction="right" size={9} style={{ flexShrink: 0, marginTop: "0.4rem" }} />
          <p style={{ fontFamily: "var(--font-title)", fontSize: "var(--text-md)", fontWeight: 700, fontStyle: "italic", lineHeight: 1.15, color: ORANGE, margin: 0 }} dangerouslySetInnerHTML={{ __html: t.raw("s3.section_title") as string }} />
        </div>
        {(["p1", "p2"] as const).map((key) => (
          <div key={key} style={{ backgroundColor: CARD_BG, padding: "1.25rem 1.5rem" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", marginBottom: "0.5rem" }}>
              <ArrowDecor direction="right" size={9} style={{ flexShrink: 0, marginTop: "0.2rem" }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: 700, color: "#ffffff", lineHeight: 1.2 }}>{t(`s3.${key}_title`)}</span>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", lineHeight: 1.6, color: textMuted, margin: 0 }}>{t(`s3.${key}_body`)}</p>
          </div>
        ))}
      </div>

      {/* Masonry images */}
      <div style={{ flex: 1, display: "flex", gap: "0.5rem", padding: "0 1.25rem 3rem", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={evEV001.src} alt="Eventify project 1" style={{ width: "100%", height: "auto", display: "block" }} />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={evEV01.src} alt="Eventify project 2" style={{ width: "100%", height: "auto", display: "block" }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={evEV002.src} alt="Eventify project 3" style={{ width: "100%", height: "auto", display: "block" }} />
        </div>
      </div>
    </section>
  );
}

function MobileSection4({ t, isDark, sectionRef }: { t: T; isDark: boolean; sectionRef: SectionRef }) {
  const bg = isDark ? "#0f0f0f" : "#f0ede8";
  const textMuted = "rgba(255,255,255,0.60)";

  return (
    <section ref={sectionRef} style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", backgroundColor: bg, overflow: "hidden" }}>
      {/* 3 stacked images row */}
      <div style={{ display: "flex", gap: "0.5rem", padding: "4.5rem 1.25rem 0.5rem", alignItems: "flex-end" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ev1.src} alt="Eventify 1" style={{ width: "33%", height: "auto", display: "block" }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ev2.src} alt="Eventify 2" style={{ width: "33%", height: "auto", display: "block" }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ev3.src} alt="Eventify 3" style={{ width: "33%", height: "auto", display: "block" }} />
      </div>

      {/* ev5 + ev4 side by side */}
      <div style={{ display: "flex", gap: "0.5rem", padding: "0.5rem 1.25rem 1.5rem" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ev5.src} alt="Eventify 5" style={{ width: "50%", height: "auto", display: "block" }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ev4.src} alt="Eventify 4" style={{ width: "50%", height: "auto", display: "block" }} />
      </div>

      {/* Orange label + 2 result cards */}
      <div style={{ flex: 1, padding: "0 1.25rem 3rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <span style={{ display: "inline-block", backgroundColor: ORANGE, color: "#fff", fontFamily: "var(--font-title)", fontSize: "var(--text-sm)", fontStyle: "italic", fontWeight: 700, padding: "0.25rem 0.85rem" }}>{t("s4.label")}</span>
        </div>
        {(["r1", "r2"] as const).map((key) => (
          <div key={key} style={{ backgroundColor: CARD_BG, padding: "1.25rem 1.5rem" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", marginBottom: "0.5rem" }}>
              <ArrowDecor direction="right" size={9} style={{ flexShrink: 0, marginTop: "0.2rem" }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: 700, color: "#ffffff", lineHeight: 1.2 }}>{t(`s4.${key}_title`)}</span>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", lineHeight: 1.6, color: textMuted, margin: 0 }}>{t(`s4.${key}_body`)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function Eventify() {
  const t = useTranslations("Eventify");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [activeSection, setActiveSection] = useState(0);

  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileSectionRefs = useRef<(HTMLElement | null)[]>([null, null, null, null]);

  const isDark = mounted ? resolvedTheme === "dark" : true;
  const sectionLabels = [t("nav.s1"), t("nav.s2"), t("nav.s3"), t("nav.s4")];

  // Mount + responsive detection
  useEffect(() => {
    setMounted(true);
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Desktop: GSAP horizontal scroll
  useEffect(() => {
    if (!isDesktop) return;
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: outer,
        pin: true,
        scrub: 0.5,
        start: "top top",
        end: () => `+=${(NUM_SECTIONS - 1) * window.innerWidth}`,
        onUpdate: (self) => {
          const idx = Math.min(Math.floor(self.progress * NUM_SECTIONS), NUM_SECTIONS - 1);
          setActiveSection(idx);
        },
      },
    });

    tl.to(track, { x: () => -((NUM_SECTIONS - 1) * window.innerWidth), ease: "none" });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      ScrollTrigger.refresh();
    };
  }, [isDesktop]);

  // Mobile: IntersectionObserver
  useEffect(() => {
    if (isDesktop) return;
    const observers: IntersectionObserver[] = [];
    mobileSectionRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(i); },
        { threshold: 0.5 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [isDesktop]);

  const handleNavSelect = (index: number) => {
    if (!isDesktop) {
      mobileSectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    const outer = outerRef.current;
    if (!outer) return;
    const triggers = ScrollTrigger.getAll().filter((st) => st.vars.trigger === outer);
    const st = triggers[0];
    if (!st) return;
    const targetProgress = index / Math.max(NUM_SECTIONS - 1, 1);
    window.scrollTo(0, st.start + (st.end - st.start) * targetProgress);
  };

  return (
    <main data-page-name="eventify">
      {/* Desktop layout — always in DOM */}
      <div ref={outerRef} className={isDesktop ? "" : "hidden"}>
        <div ref={trackRef} style={{ display: "flex", width: `${NUM_SECTIONS * 100}vw`, height: "100vh" }}>
          <Section1 t={t} isDark={isDark} />
          <Section2 t={t} isDark={isDark} />
          <Section3 t={t} isDark={isDark} />
          <Section4 t={t} isDark={isDark} />
        </div>
      </div>

      {/* Mobile layout — always in DOM */}
      <div className={isDesktop ? "hidden" : ""}>
        <MobileSection1 t={t} isDark={isDark} sectionRef={(el) => { mobileSectionRefs.current[0] = el; }} />
        <MobileSection2 t={t} isDark={isDark} sectionRef={(el) => { mobileSectionRefs.current[1] = el; }} />
        <MobileSection3 t={t} isDark={isDark} sectionRef={(el) => { mobileSectionRefs.current[2] = el; }} />
        <MobileSection4 t={t} isDark={isDark} sectionRef={(el) => { mobileSectionRefs.current[3] = el; }} />
      </div>

      {mounted &&
        createPortal(
          <>
            <ProjectSectionNav
              sections={sectionLabels}
              activeIndex={activeSection}
              onSelect={handleNavSelect}
              mobileMode={!isDesktop}
            />
            <PageAnnotation line1={t("annotation1")} line2={t("annotation2")} />
          </>,
          document.body,
        )}
    </main>
  );
}
