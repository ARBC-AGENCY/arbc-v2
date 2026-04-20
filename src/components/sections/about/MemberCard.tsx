"use client";

import { ORANGE, BG } from "./_constants";

const TEXT    = "#e5e2e1";
const MUTED   = "rgba(255,255,255,0.4)";

export default function MemberCard({
  src,
  name,
  role,
  style,
}: {
  src: string;
  name: string;
  role?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexShrink: 0,
        ...style,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          objectFit: "cover",
          display: "block",
          marginBottom: "1.25rem",
        }}
      />
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-md)",
          fontWeight: 800,
          color: ORANGE,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          margin: 0,
          textAlign: "center",
        }}
      >
        {name}
      </p>
      {role && (
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-xs)",
            color: MUTED,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            marginTop: "0.25rem",
            textAlign: "center",
          }}
        >
          {role}
        </p>
      )}
    </div>
  );
}
