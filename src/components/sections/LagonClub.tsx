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
import llLL00 from "@/assets/images/lagon/LL00.webp";
import llLL000 from "@/assets/images/lagon/LL000.webp";
import llLL01 from "@/assets/images/lagon/LL01.webp";
import llLL011 from "@/assets/images/lagon/LL011.webp";
import llLL002 from "@/assets/images/lagon/LL002.webp";
import llLLC from "@/assets/images/lagon/LLC.webp";
import llLLP from "@/assets/images/lagon/LLP.webp";
import llLLW from "@/assets/images/lagon/LLW.webp";
import llLLB from "@/assets/images/lagon/LLB.webp";

const NUM_SECTIONS = 4;
const ORANGE = "#e7501e";

// ── Section 1 — Brand Presentation ───────────────────────────────────────────
function Section1({
  t,
  isDark,
}: {
  t: ReturnType<typeof useTranslations<"LagonClub">>;
  isDark: boolean;
}) {
  const bg = isDark ? "#0f0f0f" : "#f0ede8";
  return (
    <section style={{ width: "100vw", height: "100vh", flexShrink: 0, position: "relative", overflow: "hidden", backgroundColor: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "relative", width: "70%", flexShrink: 0 }}>
        <Image src={llLL00} alt="Le Lagon Club" style={{ width: "100%", height: "auto", display: "block" }} />
      </div>
      <div style={{ position: "absolute", bottom: "16%", left: "7rem", width: "clamp(280px, 30vw, 420px)", backgroundColor: ORANGE, padding: "2rem 2.25rem", zIndex: 4 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.25rem" }}>
          <Html as="h2" html={t.raw("s1.title") as string} style={{ fontFamily: "var(--font-title)", fontSize: "clamp(1.5rem, 2.2vw, 2rem)", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em", color: "#191919" }} />
        </div>
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
  t: ReturnType<typeof useTranslations<"LagonClub">>;
  isDark: boolean;
}) {
  const bg = isDark ? "#0f0f0f" : "#f0ede8";
  const CARD_LEFT = "8rem";
  const CARD_WIDTH = "clamp(260px, 28vw, 400px)";

  return (
    <section style={{ width: "100vw", height: "100vh", flexShrink: 0, position: "relative", overflow: "hidden", backgroundColor: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "relative", width: "70%", flexShrink: 0 }}>
        <Image src={llLL01} alt="Le Lagon Club billboard" style={{ width: "100%", height: "auto", display: "block" }} />
      </div>
      <div style={{ position: "absolute", top: "8%", left: CARD_LEFT, width: CARD_WIDTH, zIndex: 3 }}>
        <Image src={llLL002} alt="Le Lagon Club brand" style={{ width: "100%", height: "auto", display: "block" }} />
      </div>
      <div style={{ position: "absolute", bottom: "10%", left: CARD_LEFT, width: CARD_WIDTH, backgroundColor: ORANGE, padding: "2rem 2.25rem", zIndex: 4 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.25rem" }}>
          <Html as="h2" html={t.raw("s2.title") as string} style={{ fontFamily: "var(--font-title)", fontSize: "clamp(1.5rem, 2.2vw, 2rem)", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em", color: "#191919" }} />
        </div>
        <BodyParagraphs content={t.raw("s2.body") as string | string[]} style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", lineHeight: 1.3, color: "#191919", fontWeight: 500 }} />
      </div>
    </section>
  );
}

// ── Section 3 — Our Response ─────────────────────────────────────────────────
function Section3({ t }: { t: ReturnType<typeof useTranslations<"LagonClub">> }) {
  const CARD_BG = "#1c1c1c";
  const textMuted = "rgba(255,255,255,0.65)";
  const points = [
    { title: t("s3.p1_title"), sub: t("s3.p1_sub"), body: t("s3.p1_body") },
    { title: t("s3.p2_title"), sub: t("s3.p2_sub"), body: t("s3.p2_body") },
    { title: t("s3.p3_title"), sub: t("s3.p3_sub"), body: t("s3.p3_body") },
  ];

  return (
    <section style={{ width: "100vw", height: "100vh", flexShrink: 0, position: "relative", overflow: "hidden", backgroundColor: "#0d0d0d" }}>
      <div style={{ position: "absolute", top: "50%", left: "3rem", transform: "translateY(-50%)", width: "38%", zIndex: 2 }}>
        <img src={llLL000.src} alt="" style={{ width: "100%", height: "auto", display: "block" }} />
      </div>
      <div style={{ position: "absolute", top: "50%", left: "30%", transform: "translateY(-50%)", width: "38%", zIndex: 1 }}>
        <Image src={llLL011} alt="" style={{ width: "100%", height: "auto", display: "block" }} />
      </div>
      <div style={{ position: "absolute", top: "50%", right: "10rem", transform: "translateY(-50%)", width: "clamp(320px, 44vw, 560px)", zIndex: 4 }}>
        <div style={{ backgroundColor: CARD_BG, padding: "2.5rem 2.75rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {points.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <ArrowDecor direction="right" size={10} style={{ flexShrink: 0, marginTop: "0.6rem" }} />
                <div>
                  <p style={{ margin: 0 }}>
                    <span style={{ fontFamily: "var(--font-title)", fontSize: "var(--text-sm)", fontWeight: 700, color: "#ffffff", lineHeight: 1 }}>{p.title}{" "}</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: 400, color: textMuted, lineHeight: 1.3 }}>{p.sub}</span>
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", lineHeight: 1.65, color: textMuted, marginTop: "0.15rem" }}>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section 4 — Results ───────────────────────────────────────────────────────
function Section4({ t }: { t: ReturnType<typeof useTranslations<"LagonClub">> }) {
  const CARD_BG = "#1c1c1c";
  const textMuted = "rgba(255,255,255,0.60)";

  return (
    <section style={{ width: "100vw", height: "100vh", flexShrink: 0, position: "relative", overflow: "hidden", backgroundColor: "#0d0d0d", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "30%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem 1.5rem 3rem 4rem" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={llLLC.src} alt="Le Lagon Club card" style={{ width: "70%", height: "auto", display: "block" }} />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "3rem 4rem 3rem 2rem", gap: "1rem" }}>
        <div style={{ flex: 1, display: "flex", gap: "1.25rem", overflow: "visible", minHeight: 0, backgroundColor: "#cccccc", paddingLeft: "2rem" }}>
          <div style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={llLLP.src} alt="Le Lagon Club mobile" style={{ maxHeight: "80%", width: "auto", display: "block" }} />
          </div>
          <div style={{ flex: 1, position: "relative", overflow: "visible" }}>
            <Image src={llLLW} alt="Le Lagon Club website" style={{ width: "100%", height: "auto", display: "block" }} />
            <div style={{ position: "absolute", bottom: "-4rem", right: "-4rem", width: "clamp(8rem, 8vw, 10rem)", zIndex: 2 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={llLLB.src} alt="" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: CARD_BG, padding: "1.75rem 2.25rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", marginBottom: "0.75rem" }}>
              <ArrowDecor direction="right" size={9} style={{ flexShrink: 0, marginTop: "0.4rem" }} />
              <span style={{ fontFamily: "var(--font-title)", fontSize: "var(--text-md)", fontWeight: 700, color: "#ffffff", lineHeight: 1 }}>{t("s4.r1_title")}</span>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", lineHeight: 1.3, color: textMuted }}>{t("s4.r1_body")}</p>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", marginBottom: "0.75rem" }}>
              <ArrowDecor direction="right" size={9} style={{ flexShrink: 0, marginTop: "0.4rem" }} />
              <span style={{ fontFamily: "var(--font-title)", fontSize: "var(--text-md)", fontWeight: 700, color: "#ffffff", lineHeight: 1 }}>{t("s4.r2_title")}</span>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", lineHeight: 1.3, color: textMuted }}>{t("s4.r2_body")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE LAYOUT
// ─────────────────────────────────────────────────────────────────────────────

type SectionRef = (el: HTMLElement | null) => void;
type T = ReturnType<typeof useTranslations<"LagonClub">>;

function MobileSection1({ t, isDark, sectionRef }: { t: T; isDark: boolean; sectionRef: SectionRef }) {
  const bg = isDark ? "#0f0f0f" : "#f0ede8";

  return (
    <section ref={sectionRef} style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", backgroundColor: bg, overflow: "hidden" }}>
      {/* Hero image */}
      <div style={{ height: "48vh", flexShrink: 0, position: "relative", overflow: "hidden" }}>
        <Image src={llLL00} alt="Le Lagon Club" fill style={{ objectFit: "contain", objectPosition: "center" }} sizes="100vw" priority />
      </div>

      {/* Orange card */}
      <div style={{ padding: "2rem 1.25rem 3rem" }}>
        <div style={{ backgroundColor: ORANGE, padding: "1.75rem 1.75rem" }}>
          <Html as="h2" html={t.raw("s1.title") as string} style={{ fontFamily: "var(--font-title)", fontSize: "clamp(1.35rem, 5vw, 2rem)", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em", color: "#191919", marginBottom: "1rem" }} />
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
      {/* Brand image */}
      <div style={{ display: "flex", justifyContent: "center", padding: "4.5rem 1.25rem 1.5rem" }}>
        <Image src={llLL002} alt="Le Lagon Club brand" style={{ width: "65%", height: "auto", display: "block" }} />
      </div>

      {/* Billboard image */}
      <div style={{ height: "35vh", flexShrink: 0, position: "relative", overflow: "hidden" }}>
        <Image src={llLL01} alt="Le Lagon Club billboard" fill style={{ objectFit: "contain", objectPosition: "center" }} sizes="100vw" />
      </div>

      {/* Orange card */}
      <div style={{ padding: "1.5rem 1.25rem 3rem" }}>
        <div style={{ backgroundColor: ORANGE, padding: "1.75rem 1.75rem" }}>
          <Html as="h2" html={t.raw("s2.title") as string} style={{ fontFamily: "var(--font-title)", fontSize: "clamp(1.35rem, 5vw, 2rem)", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em", color: "#191919", marginBottom: "1rem" }} />
          <BodyParagraphs content={t.raw("s2.body") as string | string[]} style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", lineHeight: 1.3, color: "#191919", fontWeight: 500 }} />
        </div>
      </div>
    </section>
  );
}

function MobileSection3({ t, sectionRef }: { t: T; isDark: boolean; sectionRef: SectionRef }) {
  const CARD_BG = "#1c1c1c";
  const textMuted = "rgba(255,255,255,0.65)";
  const points = [
    { title: t("s3.p1_title"), sub: t("s3.p1_sub"), body: t("s3.p1_body") },
    { title: t("s3.p2_title"), sub: t("s3.p2_sub"), body: t("s3.p2_body") },
    { title: t("s3.p3_title"), sub: t("s3.p3_sub"), body: t("s3.p3_body") },
  ];

  return (
    <section ref={sectionRef} style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", backgroundColor: "#0d0d0d", overflow: "hidden" }}>
      {/* Two stacked images */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", padding: "4.5rem 1.25rem 1.5rem" }}>
        <img src={llLL000.src} alt="" style={{ width: "100%", height: "auto", display: "block" }} />
        <Image src={llLL011} alt="" style={{ width: "100%", height: "auto", display: "block" }} />
      </div>

      {/* Dark text card */}
      <div style={{ flex: 1, padding: "0 1.25rem 3rem" }}>
        <div style={{ backgroundColor: CARD_BG, padding: "1.75rem 1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {points.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <ArrowDecor direction="right" size={10} style={{ flexShrink: 0, marginTop: "0.6rem" }} />
                <div>
                  <p style={{ margin: 0 }}>
                    <span style={{ fontFamily: "var(--font-title)", fontSize: "var(--text-sm)", fontWeight: 700, color: "#ffffff", lineHeight: 1 }}>{p.title}{" "}</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: 400, color: textMuted, lineHeight: 1.3 }}>{p.sub}</span>
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", lineHeight: 1.65, color: textMuted, marginTop: "0.15rem" }}>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileSection4({ t, sectionRef }: { t: T; isDark: boolean; sectionRef: SectionRef }) {
  const CARD_BG = "#1c1c1c";
  const textMuted = "rgba(255,255,255,0.60)";

  return (
    <section ref={sectionRef} style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", backgroundColor: "#0d0d0d", overflow: "hidden" }}>
      {/* LLC card image */}
      <div style={{ display: "flex", justifyContent: "center", padding: "4.5rem 1.25rem 1.5rem" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={llLLC.src} alt="Le Lagon Club card" style={{ width: "50%", height: "auto", display: "block" }} />
      </div>

      {/* Phone + website images */}
      <div style={{ height: "32vh", flexShrink: 0, backgroundColor: "#cccccc", display: "flex", gap: "1rem", alignItems: "center", padding: "0.75rem 1.25rem", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={llLLP.src} alt="Le Lagon Club mobile" style={{ height: "90%", width: "auto", display: "block", flexShrink: 0 }} />
        <div style={{ flex: 1, position: "relative" }}>
          <Image src={llLLW} alt="Le Lagon Club website" style={{ width: "100%", height: "auto", display: "block" }} />
        </div>
      </div>

      {/* Dark text card — 2 results */}
      <div style={{ padding: "1.5rem 1.25rem 3rem" }}>
        <div style={{ backgroundColor: CARD_BG, padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", marginBottom: "0.75rem" }}>
              <ArrowDecor direction="right" size={9} style={{ flexShrink: 0, marginTop: "0.4rem" }} />
              <span style={{ fontFamily: "var(--font-title)", fontSize: "var(--text-md)", fontWeight: 700, color: "#ffffff", lineHeight: 1 }}>{t("s4.r1_title")}</span>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", lineHeight: 1.3, color: textMuted }}>{t("s4.r1_body")}</p>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", marginBottom: "0.75rem" }}>
              <ArrowDecor direction="right" size={9} style={{ flexShrink: 0, marginTop: "0.4rem" }} />
              <span style={{ fontFamily: "var(--font-title)", fontSize: "var(--text-md)", fontWeight: 700, color: "#ffffff", lineHeight: 1 }}>{t("s4.r2_title")}</span>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", lineHeight: 1.3, color: textMuted }}>{t("s4.r2_body")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function LagonClub() {
  const t = useTranslations("LagonClub");
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
    <main data-page-name="le-lagon">
      {/* Desktop layout — always in DOM */}
      <div ref={outerRef} className={isDesktop ? "" : "hidden"}>
        <div ref={trackRef} style={{ display: "flex", width: `${NUM_SECTIONS * 100}vw`, height: "100vh" }}>
          <Section1 t={t} isDark={isDark} />
          <Section2 t={t} isDark={isDark} />
          <Section3 t={t} />
          <Section4 t={t} />
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
