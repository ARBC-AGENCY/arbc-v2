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
      <footer
        className="py-8 px-6 md:py-10 md:px-12 lg:py-12 lg:px-20"
        style={{ backgroundColor: FOOTER_BG }}
      >
        <div
          className="mx-auto flex justify-between items-center flex-wrap gap-6"
          style={{ maxWidth: "1400px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            {/* Facebook */}
            <a
              href="https://www.facebook.com/ARBCagency"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="about-social-link"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/arbc_agency"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="about-social-link"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/arbc-agency"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="about-social-link"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>
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

        <style>{`
          .about-social-link {
            color: #e5e2e1;
            display: flex;
            align-items: center;
            transition: color 0.25s ease;
          }
          .about-social-link:hover { color: #e7501e; }
        `}</style>
      </footer>
    </main>
  );
}
