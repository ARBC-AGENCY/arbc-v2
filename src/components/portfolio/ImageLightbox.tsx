"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import type { ProjectAsset } from "@/lib/s3";

interface Props {
  assets: ProjectAsset[];
  initialIndex: number;
  projectName: string;
  onClose: () => void;
}

export default function ImageLightbox({
  assets,
  initialIndex,
  projectName,
  onClose,
}: Props) {
  const t = useTranslations("PortfolioDetail");
  const [current, setCurrent] = useState(initialIndex);
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  const navigate = (dir: 1 | -1) => {
    setCurrent((prev) => (prev + dir + assets.length) % assets.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Click outside to close
  const onOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!mounted || assets.length === 0) return null;

  const asset = assets[current];
  const counter = `${String(current + 1).padStart(2, "0")} / ${String(assets.length).padStart(2, "0")}`;

  const circleBtn: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "2.5rem",
    height: "2.5rem",
    borderRadius: "50%",
    background: "#111111",
    border: "1px solid #2a2a2a",
    color: "#ffffff",
    cursor: "pointer",
    flexShrink: 0,
    transition: "border-color 0.2s, transform 0.15s",
  };

  return createPortal(
    <div
      ref={overlayRef}
      onClick={onOverlayClick}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        backgroundColor: "rgba(0, 0, 0, 0.96)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "1.5rem 2rem",
      }}
    >
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            color: "#747474",
            letterSpacing: "0.05em",
          }}
        >
          ARBC — {projectName}
        </span>
        <button
          onClick={onClose}
          aria-label={t("lightbox_close")}
          style={circleBtn}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "#e7501e";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "#2a2a2a";
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="1" y1="1" x2="13" y2="13" />
            <line x1="13" y1="1" x2="1" y2="13" />
          </svg>
        </button>
      </div>

      {/* Center image */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5rem",
          overflow: "hidden",
          padding: "1rem 0",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={asset.key}
          src={asset.url}
          alt={asset.filename}
          loading="lazy"
          style={{
            maxHeight: "75vh",
            maxWidth: "100%",
            objectFit: "contain",
            borderRadius: "4px",
            border: "1px solid rgba(231, 80, 30, 0.15)",
            boxShadow: "0 25px 80px rgba(0,0,0,0.8)",
          }}
        />
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-xs)",
            color: "#444444",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          {t("nav_hint")}
        </p>
      </div>

      {/* Bottom bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          {asset.filename}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span
            style={{
              fontFamily: "var(--font-title)",
              fontSize: "var(--text-sm)",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.1em",
              minWidth: "5rem",
              textAlign: "center",
            }}
          >
            {counter}
          </span>
          <button
            onClick={() => navigate(-1)}
            aria-label={t("lightbox_prev")}
            style={circleBtn}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#e7501e"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#2a2a2a"; }}
          >
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="7,1 1,7 7,13" />
            </svg>
          </button>
          <button
            onClick={() => navigate(1)}
            aria-label={t("lightbox_next")}
            style={circleBtn}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#e7501e"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#2a2a2a"; }}
          >
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1,1 7,7 1,13" />
            </svg>
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
