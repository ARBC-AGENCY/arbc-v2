"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import type { ProjectAsset } from "@/lib/s3";
import type { PortfolioItem } from "@/data/portfolio";
import { useVideoPlayer, formatTime } from "@/hooks/useVideoPlayer";
import VideoControls from "./VideoControls";

interface Props {
  asset: ProjectAsset;
  item: PortfolioItem;
  onClose: () => void;
}

export default function VideoLightbox({ asset, item, onClose }: Props) {
  const t = useTranslations("PortfolioDetail");
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const player = useVideoPlayer(videoRef);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!mounted) return null;

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
    transition: "border-color 0.2s",
  };

  const tagPill: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: "var(--text-xs)",
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    padding: "0.2rem 0.75rem",
    borderRadius: "999px",
    border: "1px solid rgba(231,80,30,0.4)",
    color: "#e7501e",
  };

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        backgroundColor: "rgba(13, 13, 13, 0.97)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label={t("lightbox_close")}
        style={{ ...circleBtn, position: "absolute", top: "1.5rem", right: "2rem" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#e7501e"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#2a2a2a"; }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <line x1="1" y1="1" x2="13" y2="13" />
          <line x1="13" y1="1" x2="1" y2="13" />
        </svg>
      </button>

      {/* 16:9 video container */}
      <div
        ref={containerRef}
        style={{
          width: "100%",
          maxWidth: "min(90vw, calc(70vh * (16/9)))",
          position: "relative",
          paddingBottom: "56.25%",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid #2a2a2a",
          boxShadow: "0 40px 120px rgba(0,0,0,0.8)",
          background: "#000",
        }}
      >
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={videoRef}
          src={asset.url}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
        <VideoControls
          player={player}
          containerRef={containerRef}
          formatTime={formatTime}
        />
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.75rem",
          width: "100%",
          maxWidth: "min(90vw, calc(70vh * (16/9)))",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "1rem",
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: "var(--font-title)",
                fontSize: "var(--text-lg)",
                color: "#ffffff",
                lineHeight: 1,
                marginBottom: "0.35rem",
              }}
            >
              {asset.filename}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-xs)",
                color: "#747474",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              {t("directed_by")}
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
            {item.tags.map((tag) => (
              <span key={tag} style={tagPill}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
