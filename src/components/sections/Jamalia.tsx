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

// ── Text helpers ──────────────────────────────────────────────────────────────
function Html({
  as: Tag = "span",
  html,
  style,
}: {
  as?: React.ElementType;
  html: string;
  style?: React.CSSProperties;
}) {
  return <Tag dangerouslySetInnerHTML={{ __html: html }} style={style} />;
}

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

// ── Image assets ──────────────────────────────────────────────────────────────
import jJ00 from "@/assets/images/jamalia/J00.webp";
import jJ000 from "@/assets/images/jamalia/J000.webp";
import jTShirts from "@/assets/images/jamalia/T-Shirts.webp";
import jCaraMelo from "@/assets/images/jamalia/CaraMelo.webp";
import jCrunchyMelo from "@/assets/images/jamalia/CrunchyMelo.webp";
import jMeloFamily from "@/assets/images/jamalia/MeloFamily.webp";

const NUM_SECTIONS = 4;
const ORANGE = "#e7501e";

// ── Section 1 — Brand Presentation ───────────────────────────────────────────
function Section1({
  t,
  isDark,
}: {
  t: ReturnType<typeof useTranslations<"Jamalia">>;
  isDark: boolean;
}) {
  const bg = isDark ? "#0f0f0f" : "#f0ede8";
  return (
    <section style={{ width: "100vw", height: "100vh", flexShrink: 0, position: "relative", overflow: "hidden", backgroundColor: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "relative", width: "70%", flexShrink: 0 }}>
        <Image src={jJ00} alt="Jamalia Group" style={{ width: "100%", height: "auto", display: "block" }} />
      </div>
      <div style={{ position: "absolute", bottom: "6%", right: "7rem", width: "clamp(280px, 30vw, 440px)", backgroundColor: "#1c1c1c", padding: "2rem 2.25rem", zIndex: 4 }}>
        <BodyParagraphs content={t.raw("s1.body") as string | string[]} style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", lineHeight: 1.55, color: "rgba(255,255,255,0.75)", fontWeight: 400 }} />
      </div>
    </section>
  );
}

// ── Section 2 — Agency Mandate ────────────────────────────────────────────────
function Section2({
  t,
  isDark,
}: {
  t: ReturnType<typeof useTranslations<"Jamalia">>;
  isDark: boolean;
}) {
  const bg = isDark ? "#0f0f0f" : "#f0ede8";
  return (
    <section style={{ width: "100vw", height: "100vh", flexShrink: 0, position: "relative", overflow: "hidden", backgroundColor: bg, display: "flex", alignItems: "center" }}>
      <div style={{ width: "30%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem 3rem 4rem 5rem" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "4rem" }}>
          <ArrowDecor direction="down" size={15} style={{ flexShrink: 0, marginTop: "0.4rem" }} />
          <div style={{ backgroundColor: ORANGE, padding: "2.25rem 2rem" }}>
            <BodyParagraphs content={t.raw("s2.body") as string | string[]} style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", lineHeight: 1.6, color: "#191919", fontWeight: 500 }} />
          </div>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem 5rem 4rem 2rem" }}>
        <Image src={jTShirts} alt="Jamalia T-Shirts" style={{ width: "90%", height: "auto", display: "block" }} />
      </div>
    </section>
  );
}

// ── Section 3 ─────────────────────────────────────────────────────────────────
function Section3({
  t,
  isDark,
}: {
  t: ReturnType<typeof useTranslations<"Jamalia">>;
  isDark: boolean;
}) {
  const CARD_BG = "#1c1c1c";
  const bg = isDark ? "#0f0f0f" : "#f0ede8";
  const textMuted = "rgba(255,255,255,0.60)";

  function TextCard({ title, sub, body }: { title: string; sub?: string; body: string }) {
    return (
      <div style={{ backgroundColor: CARD_BG, padding: "1.25rem 1.5rem" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", marginBottom: "0.6rem" }}>
          <ArrowDecor direction="right" size={9} style={{ flexShrink: 0, marginTop: "0.6rem" }} />
          <p style={{ margin: 0 }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: 700, color: "#ffffff", lineHeight: 1.2 }}>{title}</span>
            {sub && <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: 400, fontStyle: "italic", color: textMuted, marginLeft: "0.3rem" }}>{sub}</span>}
          </p>
        </div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", lineHeight: 1.6, color: textMuted, margin: 0 }}>{body}</p>
      </div>
    );
  }

  return (
    <section style={{ width: "100vw", height: "100vh", flexShrink: 0, position: "relative", overflow: "hidden", backgroundColor: bg, display: "flex", alignItems: "stretch" }}>
      <div style={{ width: "42%", flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "4rem 2rem 4rem 5rem", gap: "1rem" }}>
        <TextCard title={t("s3.p1_title")} body={t("s3.p1_body")} />
        <TextCard title={t("s3.p2_title")} body={t("s3.p2_body")} />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "4rem 5rem 4rem 2rem", gap: "1rem" }}>
        <TextCard title={t("s3.p3_title")} body={t("s3.p3_body")} />
        <TextCard title={t("s3.p4_title")} sub={t("s3.p4_sub")} body={t("s3.p4_body")} />
        <TextCard title={t("s3.p5_title")} sub={t("s3.p5_sub")} body={t("s3.p5_body")} />
      </div>
    </section>
  );
}

// ── Section 4 — Results ───────────────────────────────────────────────────────
function Section4({
  t,
  isDark,
}: {
  t: ReturnType<typeof useTranslations<"Jamalia">>;
  isDark: boolean;
}) {
  const CARD_BG = "#1c1c1c";
  const bg = isDark ? "#0f0f0f" : "#f0ede8";
  const textMuted = "rgba(255,255,255,0.60)";

  return (
    <section style={{ width: "100vw", height: "100vh", flexShrink: 0, position: "relative", overflow: "hidden", backgroundColor: bg, display: "flex", alignItems: "stretch" }}>
      <div style={{ width: "40%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={jJ000.src} alt="Jamalia products" style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto", display: "block" }} />
      </div>
      <div style={{ width: "20%", flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem", padding: "3rem 1rem" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={jCrunchyMelo.src} alt="CrunchyMelo" style={{ width: "100%", height: "auto", display: "block" }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={jCaraMelo.src} alt="CaraMelo" style={{ width: "100%", height: "auto", display: "block" }} />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "3rem 4rem 3rem 1rem", gap: "1rem" }}>
        <div style={{ flex: 1, overflow: "hidden" }}>
          <Image src={jMeloFamily} alt="Melo Family" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
        </div>
        <div style={{ backgroundColor: CARD_BG, padding: "1.5rem 1.75rem" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", marginBottom: "0.6rem" }}>
            <ArrowDecor direction="right" size={9} style={{ flexShrink: 0, marginTop: "0.2rem" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: 700, color: "#ffffff", lineHeight: 1.2 }}>{t("s4.r1_title")}</span>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", lineHeight: 1.65, color: textMuted, margin: 0 }}>{t("s4.r1_body")}</p>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE LAYOUT
// ─────────────────────────────────────────────────────────────────────────────

type SectionRef = (el: HTMLElement | null) => void;
type T = ReturnType<typeof useTranslations<"Jamalia">>;

function MobileSection1({ t, isDark, sectionRef }: { t: T; isDark: boolean; sectionRef: SectionRef }) {
  const bg = isDark ? "#0f0f0f" : "#f0ede8";

  return (
    <section ref={sectionRef} style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", backgroundColor: bg, overflow: "hidden" }}>
      {/* Hero image */}
      <div style={{ height: "48vh", flexShrink: 0, position: "relative", overflow: "hidden" }}>
        <Image src={jJ00} alt="Jamalia Group" fill style={{ objectFit: "contain", objectPosition: "center" }} sizes="100vw" priority />
      </div>

      {/* Dark text card */}
      <div style={{ padding: "2rem 1.25rem 3rem" }}>
        <div style={{ backgroundColor: "#1c1c1c", padding: "1.75rem 1.5rem" }}>
          <BodyParagraphs content={t.raw("s1.body") as string | string[]} style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", lineHeight: 1.55, color: "rgba(255,255,255,0.75)", fontWeight: 400 }} />
        </div>
      </div>
    </section>
  );
}

function MobileSection2({ t, isDark, sectionRef }: { t: T; isDark: boolean; sectionRef: SectionRef }) {
  const bg = isDark ? "#0f0f0f" : "#f0ede8";

  return (
    <section ref={sectionRef} style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", backgroundColor: bg, overflow: "hidden" }}>
      {/* Orange text block */}
      <div style={{ padding: "4.5rem 1.25rem 1.5rem", display: "flex", alignItems: "flex-start", gap: "1rem" }}>
        <ArrowDecor direction="down" size={12} style={{ flexShrink: 0, marginTop: "0.3rem" }} />
        <div style={{ backgroundColor: ORANGE, padding: "1.75rem", flex: 1 }}>
          <BodyParagraphs content={t.raw("s2.body") as string | string[]} style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", lineHeight: 1.6, color: "#191919", fontWeight: 500 }} />
        </div>
      </div>

      {/* T-Shirts image */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem 1.25rem 3rem" }}>
        <Image src={jTShirts} alt="Jamalia T-Shirts" style={{ width: "100%", height: "auto", maxHeight: "50vh", objectFit: "contain" }} />
      </div>
    </section>
  );
}

function MobileSection3({ t, isDark, sectionRef }: { t: T; isDark: boolean; sectionRef: SectionRef }) {
  const CARD_BG = "#1c1c1c";
  const bg = isDark ? "#0f0f0f" : "#f0ede8";
  const textMuted = "rgba(255,255,255,0.60)";

  const cards = [
    { title: t("s3.p1_title"), sub: undefined, body: t("s3.p1_body") },
    { title: t("s3.p2_title"), sub: undefined, body: t("s3.p2_body") },
    { title: t("s3.p3_title"), sub: undefined, body: t("s3.p3_body") },
    { title: t("s3.p4_title"), sub: t("s3.p4_sub"), body: t("s3.p4_body") },
    { title: t("s3.p5_title"), sub: t("s3.p5_sub"), body: t("s3.p5_body") },
  ];

  return (
    <section ref={sectionRef} style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", backgroundColor: bg, overflow: "hidden" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.75rem", padding: "4.5rem 1.25rem 3rem" }}>
        {cards.map((card, i) => (
          <div key={i} style={{ backgroundColor: CARD_BG, padding: "1.25rem 1.5rem" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", marginBottom: "0.5rem" }}>
              <ArrowDecor direction="right" size={9} style={{ flexShrink: 0, marginTop: "0.6rem" }} />
              <p style={{ margin: 0 }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: 700, color: "#ffffff", lineHeight: 1.2 }}>{card.title}</span>
                {card.sub && <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: 400, fontStyle: "italic", color: textMuted, marginLeft: "0.3rem" }}>{card.sub}</span>}
              </p>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", lineHeight: 1.6, color: textMuted, margin: 0 }}>{card.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function MobileSection4({ t, isDark, sectionRef }: { t: T; isDark: boolean; sectionRef: SectionRef }) {
  const CARD_BG = "#1c1c1c";
  const bg = isDark ? "#0f0f0f" : "#f0ede8";
  const textMuted = "rgba(255,255,255,0.60)";

  return (
    <section ref={sectionRef} style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", backgroundColor: bg, overflow: "hidden" }}>
      {/* J000 products */}
      <div style={{ height: "38vh", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "4.5rem 1.25rem 1rem" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={jJ000.src} alt="Jamalia products" style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto", display: "block" }} />
      </div>

      {/* CrunchyMelo + CaraMelo side by side */}
      <div style={{ display: "flex", gap: "1rem", padding: "0 1.25rem 1rem", justifyContent: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={jCrunchyMelo.src} alt="CrunchyMelo" style={{ width: "30%", height: "auto", display: "block" }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={jCaraMelo.src} alt="CaraMelo" style={{ width: "30%", height: "auto", display: "block" }} />
      </div>

      {/* MeloFamily */}
      <div style={{ height: "30vh", flexShrink: 0, overflow: "hidden", margin: "0 1.25rem" }}>
        <Image src={jMeloFamily} alt="Melo Family" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
      </div>

      {/* Dark text card */}
      <div style={{ padding: "1.25rem 1.25rem 3rem" }}>
        <div style={{ backgroundColor: CARD_BG, padding: "1.5rem 1.5rem" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", marginBottom: "0.6rem" }}>
            <ArrowDecor direction="right" size={9} style={{ flexShrink: 0, marginTop: "0.2rem" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: 700, color: "#ffffff", lineHeight: 1.2 }}>{t("s4.r1_title")}</span>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", lineHeight: 1.65, color: textMuted, margin: 0 }}>{t("s4.r1_body")}</p>
        </div>
      </div>
    </section>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function Jamalia() {
  const t = useTranslations("Jamalia");
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
    <main data-page-name="jamalia">
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
