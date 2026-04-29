"use client";

import type { VideoPlayerState } from "@/hooks/useVideoPlayer";

interface Props {
  player: VideoPlayerState;
  containerRef: React.RefObject<HTMLDivElement | null>;
  formatTime: (s: number) => string;
}

export default function VideoControls({ player, containerRef, formatTime }: Props) {
  const { playing, currentTime, duration, volume, muted, toggle, seek, setVol, toggleMute, toggleFullscreen } = player;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    seek(ratio * duration);
  };

  const iconBtn: React.CSSProperties = {
    background: "none",
    border: "none",
    color: "#ffffff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.25rem",
    transition: "color 0.2s",
    flexShrink: 0,
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "1.5rem",
        background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      {/* Progress bar */}
      <div
        onClick={handleProgressClick}
        style={{
          width: "100%",
          height: "3px",
          background: "rgba(255,255,255,0.2)",
          cursor: "pointer",
          borderRadius: "2px",
          position: "relative",
        }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "#e7501e",
            borderRadius: "2px",
            transition: "width 0.1s linear",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: `${progress}%`,
            transform: "translate(-50%, -50%)",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "#ffffff",
            boxShadow: "0 0 6px rgba(0,0,0,0.5)",
          }}
        />
      </div>

      {/* Controls row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Left cluster */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Play / Pause */}
          <button
            onClick={toggle}
            style={{
              width: "2.25rem",
              height: "2.25rem",
              borderRadius: "50%",
              background: "#e7501e",
              border: "none",
              color: "#ffffff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#c73f0e"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#e7501e"; }}
          >
            {playing ? (
              <svg width="10" height="12" viewBox="0 0 10 12" fill="white">
                <rect x="0" y="0" width="3.5" height="12" rx="1" />
                <rect x="6.5" y="0" width="3.5" height="12" rx="1" />
              </svg>
            ) : (
              <svg width="10" height="12" viewBox="0 0 10 12" fill="white">
                <polygon points="0,0 10,6 0,12" />
              </svg>
            )}
          </button>

          {/* Time */}
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-xs)",
              color: "rgba(255,255,255,0.85)",
              letterSpacing: "0.05em",
              whiteSpace: "nowrap",
            }}
          >
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          {/* Volume */}
          <button
            onClick={toggleMute}
            style={iconBtn}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#e7501e"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
          >
            {muted || volume === 0 ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            )}
          </button>

          {/* Volume slider */}
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={muted ? 0 : volume}
            onChange={(e) => setVol(Number(e.target.value))}
            style={{
              width: "60px",
              accentColor: "#e7501e",
              cursor: "pointer",
            }}
          />
        </div>

        {/* Right cluster */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {/* Fullscreen */}
          <button
            onClick={() => toggleFullscreen(containerRef.current)}
            style={iconBtn}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#e7501e"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
