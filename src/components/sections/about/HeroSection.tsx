"use client";

import { ORANGE, BG } from "./_constants";
import ModelViewer from "./ModelViewer";

const TEXT = "#e5e2e1";
const MUTED = "rgba(229,226,225,0.6)";

export default function HeroSection({
  headline1,
  headline2,
  headline3,
  description,
}: {
  headline1: string;
  headline2: string;
  headline3: string;
  description: string;
}) {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "7rem",
        paddingBottom: "4rem",
        paddingLeft: "2rem",
        paddingRight: "2rem",
        position: "relative",
        overflow: "hidden",
        backgroundColor: BG,
        textAlign: "center",
        backgroundImage: "url('/images/Background-dark.webp')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay — transparent for first 15%, then fades to full #111111 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to bottom,
            rgba(17,17,17,0) 0%,
            rgba(17,17,17,0.5) 15%,
            rgba(17,17,17,1) 100%)`,
          pointerEvents: "none",
        }}
      />

      <div className="once-in" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <ModelViewer />
        </div>

        <h1
          style={{
            fontFamily: "var(--font-title)",
            fontSize: "var(--text-lg)",
            fontWeight: 700,

            textTransform: "uppercase",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            maxWidth: "700px",
            margin: "0 auto 1.25rem",
            color: TEXT,
          }}
        >
          {headline1}{" "}
          <span style={{ color: ORANGE, fontStyle: "italic" }}>
            {headline2}
          </span>
          {headline3}
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            color: MUTED,
            maxWidth: "500px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          {description}
        </p>
      </div>
    </section>
  );
}
