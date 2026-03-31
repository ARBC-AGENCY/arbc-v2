"use client";

import { useTranslations } from "next-intl";

/**
 * Renders the fixed full-screen overlay used for cinematic page transitions.
 * Each h2 carries a data-key that pageTransitions.ts matches against —
 * the displayed text is locale-aware while the key stays language-agnostic.
 */
export default function PageTransition() {
  const t = useTranslations("PageTransition");

  return (
    <div className="loading-container">
      <div className="loading-screen">
        <div className="rounded-div-wrap top">
          <div className="rounded-div" />
        </div>

        <div className="loading-words">
          <h2 data-key="home">{t("home")}</h2>
          <h2 data-key="about">{t("about")}</h2>
          <h2 data-key="projects">{t("projects")}</h2>
        </div>

        <div className="rounded-div-wrap bottom">
          <div className="rounded-div" />
        </div>
      </div>
    </div>
  );
}
