"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { ProjectAsset } from "@/lib/s3";
import type { PortfolioItem } from "@/data/portfolio";
import { useVideoPlayer, formatTime } from "@/hooks/useVideoPlayer";
import ImageLightbox from "./ImageLightbox";
import VideoLightbox from "./VideoLightbox";
import VideoControls from "./VideoControls";

// ─── Types ───────────────────────────────────────────────────────────────────

type FilterTab = "all" | "design" | "video" | "web";
type Lightbox =
  | { type: "image"; index: number }
  | { type: "video"; asset: ProjectAsset }
  | null;

interface Props {
  item: PortfolioItem;
  assets: ProjectAsset[];
  featuredVideoKey: string | null;
  locale: string;
}

// ─── FeaturedVideoPlayer ─────────────────────────────────────────────────────

function FeaturedVideoPlayer({ asset }: { asset: ProjectAsset }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const player = useVideoPlayer(videoRef);

  return (
    <div
      ref={containerRef}
      className="group"
      style={{
        position: "relative",
        width: "100%",
        paddingBottom: "56.25%",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #2a2a2a",
        background: "#000",
        boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        src={asset.url}
        onClick={player.toggle}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          cursor: "pointer",
        }}
      />

      {/* Play overlay on pause */}
      {!player.playing && (
        <div
          onClick={player.toggle}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "4.5rem",
              height: "4.5rem",
              borderRadius: "50%",
              background: "rgba(231,80,30,0.2)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(231,80,30,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="18" height="22" viewBox="0 0 18 22" fill="white">
              <polygon points="0,0 18,11 0,22" />
            </svg>
          </div>
        </div>
      )}

      <VideoControls
        player={player}
        containerRef={containerRef}
        formatTime={formatTime}
      />
    </div>
  );
}

// ─── VideoThumb ───────────────────────────────────────────────────────────────

function VideoThumb({
  asset,
  onClick,
}: {
  asset: ProjectAsset;
  onClick: (a: ProjectAsset) => void;
}) {
  return (
    <div
      style={{ position: "relative", cursor: "pointer" }}
      onClick={() => onClick(asset)}
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        src={asset.url}
        muted
        playsInline
        preload="metadata"
        style={{ width: "100%", height: "auto", display: "block" }}
      />
      {/* Play overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0,0,0,0.3)",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.5)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.3)"; }}
      >
        <div
          style={{
            width: "3rem",
            height: "3rem",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="12" height="14" viewBox="0 0 12 14" fill="white">
            <polygon points="0,0 12,7 0,14" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── FilterTabs ───────────────────────────────────────────────────────────────

function FilterTabs({
  active,
  onChange,
  counts,
}: {
  active: FilterTab;
  onChange: (t: FilterTab) => void;
  counts: Record<FilterTab, number>;
}) {
  const t = useTranslations("PortfolioDetail");

  const tabs: { key: FilterTab; label: string }[] = [
    { key: "all", label: `${t("filter_all")} (${counts.all})` },
    { key: "design", label: `${t("filter_designs")} (${counts.design})` },
    { key: "video", label: `${t("filter_videos")} (${counts.video})` },
    { key: "web", label: `${t("filter_web")} (${counts.web})` },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "0.5rem",
        flexWrap: "wrap",
        marginBottom: "2rem",
        paddingBottom: "1.5rem",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {tabs.map(({ key, label }) => {
        if (key !== "all" && counts[key] === 0) return null;
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-xs)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "0.45rem 1.1rem",
              borderRadius: "999px",
              border: isActive
                ? "1px solid #e7501e"
                : "1px solid rgba(231,80,30,0.25)",
              background: isActive ? "#e7501e" : "transparent",
              color: isActive ? "#ffffff" : "var(--color-text-secondary)",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLElement).style.borderColor = "#e7501e";
                (e.currentTarget as HTMLElement).style.color = "#e7501e";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(231,80,30,0.25)";
                (e.currentTarget as HTMLElement).style.color =
                  "var(--color-text-secondary)";
              }
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

// ─── EmptyState ───────────────────────────────────────────────────────────────

function EmptyState() {
  const t = useTranslations("PortfolioDetail");
  return (
    <div
      style={{
        minHeight: "30vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        opacity: 0.45,
        textAlign: "center",
        padding: "3rem 1rem",
      }}
    >
      <div
        style={{
          width: "3rem",
          height: "3rem",
          border: "1px solid var(--color-text-secondary)",
          borderRadius: "4px",
          opacity: 0.5,
        }}
      />
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-md)",
          color: "var(--color-text-primary)",
        }}
      >
        {t("assets_empty")}
      </p>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-sm)",
          color: "var(--color-text-secondary)",
        }}
      >
        {t("assets_empty_sub")}
      </p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PortfolioDetailClient({
  item,
  assets,
  featuredVideoKey,
  locale,
}: Props) {
  const t = useTranslations("PortfolioDetail");

  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [lightbox, setLightbox] = useState<Lightbox>(null);

  // Derived
  const hasVideo = useMemo(() => assets.some((a) => a.type === "video"), [assets]);

  const featuredVideo = useMemo<ProjectAsset | null>(() => {
    if (!hasVideo) return null;
    if (featuredVideoKey) {
      return assets.find((a) => a.type === "video" && a.filename === featuredVideoKey) ?? null;
    }
    return assets.find((a) => a.type === "video") ?? null;
  }, [assets, featuredVideoKey, hasVideo]);

  const filteredAssets = useMemo<ProjectAsset[]>(() => {
    if (activeFilter === "all") return assets;
    return assets.filter((a) => a.type === activeFilter);
  }, [assets, activeFilter]);

  // For image lightbox navigation — all non-video assets (unfiltered)
  const allImageAssets = useMemo(
    () => assets.filter((a) => a.type !== "video"),
    [assets],
  );

  const tabCounts = useMemo<Record<FilterTab, number>>(
    () => ({
      all: assets.length,
      design: assets.filter((a) => a.type === "design").length,
      video: assets.filter((a) => a.type === "video").length,
      web: assets.filter((a) => a.type === "web").length,
    }),
    [assets],
  );

  // Lightbox keyboard + scroll lock
  useEffect(() => {
    if (!lightbox) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lightbox]);

  const openLightbox = (asset: ProjectAsset) => {
    if (asset.type === "video") {
      setLightbox({ type: "video", asset });
    } else {
      const idx = allImageAssets.findIndex((a) => a.key === asset.key);
      setLightbox({ type: "image", index: Math.max(0, idx) });
    }
  };

  const description =
    locale === "fr" ? item.descriptionFr : item.descriptionEn;

  const tagPill: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: "var(--text-xs)",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    padding: "0.25rem 0.8rem",
    borderRadius: "999px",
    border: "1px solid rgba(231,80,30,0.4)",
    color: "#e7501e",
  };

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="once-in"
        style={{
          position: "relative",
          zIndex: 1,
          padding: "clamp(7rem, 12vw, 11rem) clamp(1.5rem, 5vw, 5rem) clamp(3rem, 5vw, 5rem)",
          maxWidth: "1440px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2rem",
          }}
          className="md:grid-cols-[1fr_1.4fr]"
        >
          {/* Left — title block */}
          <div>
            {/* Tags */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginBottom: "1.25rem",
              }}
            >
              {item.tags.map((tag) => (
                <span key={tag} style={tagPill}>{tag}</span>
              ))}
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  letterSpacing: "0.12em",
                  color: "var(--color-text-secondary)",
                  alignSelf: "center",
                  marginLeft: "0.25rem",
                }}
              >
                {item.year}
              </span>
            </div>

            {/* Brand name */}
            <h1
              style={{
                fontFamily: "var(--font-title)",
                fontSize: "var(--text-hero)",
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              {item.name}
            </h1>
          </div>

          {/* Right — description */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              paddingBottom: "0.25rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-md)",
                lineHeight: 1.7,
                color: "var(--color-text-secondary)",
                maxWidth: "60ch",
              }}
            >
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* ── Featured Video ───────────────────────────────────────────────── */}
      {hasVideo && featuredVideo && (
        <section
          className="once-in"
          style={{
            padding: "0 clamp(1.5rem, 5vw, 5rem) clamp(3rem, 5vw, 5rem)",
            maxWidth: "1440px",
            margin: "0 auto",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-xs)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-text-secondary)",
              marginBottom: "1rem",
            }}
          >
            {t("featured_video_label")}
          </p>
          <FeaturedVideoPlayer asset={featuredVideo} />
        </section>
      )}

      {/* ── Asset Grid ───────────────────────────────────────────────────── */}
      <section
        className="once-in"
        style={{
          padding: "clamp(2rem, 4vw, 4rem) clamp(1.5rem, 5vw, 5rem) clamp(5rem, 8vw, 10rem)",
          maxWidth: "1440px",
          margin: "0 auto",
        }}
      >
        {assets.length > 0 && (
          <FilterTabs
            active={activeFilter}
            onChange={setActiveFilter}
            counts={tabCounts}
          />
        )}

        {filteredAssets.length === 0 ? (
          <EmptyState />
        ) : (
          <div
            style={{
              columns: "3",
              columnGap: "1rem",
            }}
            className="masonry-portfolio"
          >
            {filteredAssets.map((asset) => (
              <div
                key={asset.key}
                onClick={() => openLightbox(asset)}
                style={{
                  breakInside: "avoid",
                  marginBottom: "1rem",
                  cursor: "pointer",
                  overflow: "hidden",
                  borderRadius: "8px",
                  border: "1px solid #2a2a2a",
                  background: "#111",
                  transition: "border-color 0.2s, transform 0.3s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(231,80,30,0.4)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "#2a2a2a";
                  el.style.transform = "translateY(0)";
                }}
              >
                {asset.type === "video" ? (
                  <VideoThumb asset={asset} onClick={openLightbox} />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={asset.url}
                    alt={asset.filename}
                    loading="lazy"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Lightboxes ───────────────────────────────────────────────────── */}
      {lightbox?.type === "image" && (
        <ImageLightbox
          assets={allImageAssets}
          initialIndex={lightbox.index}
          projectName={item.name}
          onClose={() => setLightbox(null)}
        />
      )}
      {lightbox?.type === "video" && (
        <VideoLightbox
          asset={lightbox.asset}
          item={item}
          onClose={() => setLightbox(null)}
        />
      )}

      {/* Responsive masonry CSS */}
      <style>{`
        @media (max-width: 1024px) {
          .masonry-portfolio { columns: 2 !important; }
        }
        @media (max-width: 640px) {
          .masonry-portfolio { columns: 1 !important; }
        }
        @media (min-width: 768px) {
          .md\\:grid-cols-\\[1fr_1\\.4fr\\] {
            grid-template-columns: 1fr 1.4fr;
          }
        }
      `}</style>
    </>
  );
}
