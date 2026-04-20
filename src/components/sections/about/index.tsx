"use client";

import { useTranslations } from "next-intl";
import { ORANGE, BG } from "./_constants";
import HeroSection from "./HeroSection";
import HistorySection from "./HistorySection";
import FoundersSection from "./FoundersSection";
import TeamSection from "./TeamSection";
import ContactSection from "./ContactSection";

// ── Founder images ────────────────────────────────────────────────────────────
import imgCapitain from "@/assets/images/team/Capitain.webp";
import imgRodrigue from "@/assets/images/team/Rodrigue.webp";
import imgYvan from "@/assets/images/team/Yvan.webp";
import imgGeorges from "@/assets/images/team/Georges.webp";

const TEXT = "#e5e2e1";
const FOOTER_BG = "#111111";

export default function About() {
  const t = useTranslations("About");

  const timeline = t.raw("history_timeline") as {
    year: string;
    label: string;
  }[];

  const FOUNDERS = [
    { src: imgCapitain.src, name: "Marcelin Djassi", role: t("founder1_role") },
    {
      src: imgRodrigue.src,
      name: "Rodrigue Wanyang",
      role: t("founder2_role"),
    },
    { src: imgYvan.src, name: "Yvan Dassie", role: t("founder3_role") },
    {
      src: imgGeorges.src,
      name: "Georges Kamtchuing",
      role: t("founder4_role"),
    },
  ];

  return (
    <main data-page-name="about" style={{ color: TEXT, backgroundColor: BG }}>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <HeroSection
        headline1={t("hero_headline1")}
        headline2={t("hero_headline2")}
        headline3={t("hero_headline3")}
        description={t("hero_description")}
      />

      {/* ── History ──────────────────────────────────────────────────────── */}
      <HistorySection
        tag={t("history_tag")}
        title={t("history_title")}
        p1={t("history_p1")}
        p2={t("history_p2")}
        timeline={timeline}
      />

      {/* ── Founders ─────────────────────────────────────────────────────── */}
      <FoundersSection
        title={t("founders_title")}
        subtitle={t("founders_subtitle")}
        founders={FOUNDERS}
      />

      {/* ── Team ─────────────────────────────────────────────────────────── */}
      <TeamSection
        title={t("team_title")}
        subtitle={t("team_subtitle")}
        prevLabel={t("prev")}
        nextLabel={t("next")}
      />

      {/* ── Contact ──────────────────────────────────────────────────────── */}
      <ContactSection t={t} />

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer style={{ backgroundColor: FOOTER_BG, padding: "3rem 5rem" }}>
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-title)",
              fontSize: "var(--text-md)",
              fontWeight: 700,
              fontStyle: "italic",
              color: ORANGE,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
            }}
          ></span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-xs)",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.1em",
            }}
          >
            {t("footer_copy")}
          </span>
        </div>
      </footer>
    </main>
  );
}
