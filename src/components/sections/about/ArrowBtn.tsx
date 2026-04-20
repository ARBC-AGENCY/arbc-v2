"use client";

import { gsap } from "@/lib/gsap";
import arrowDownSrc from "@/assets/images/arrow-down.svg";

export default function ArrowBtn({
  dir,
  onClick,
  label,
}: {
  dir: "left" | "right";
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      onMouseEnter={(e) =>
        gsap.to(e.currentTarget, { scale: 1.12, duration: 0.2, ease: "power2.out" })
      }
      onMouseLeave={(e) =>
        gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: "power2.out" })
      }
      style={{
        flexShrink: 0,
        width: "44px",
        height: "44px",
        borderRadius: "9999px",
        border: "1px solid rgba(255,255,255,0.22)",
        background: "rgba(255,255,255,0.08)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={(arrowDownSrc as any).src ?? arrowDownSrc}
        alt=""
        aria-hidden="true"
        style={{
          width: "18px",
          height: "18px",
          transform: dir === "right" ? "rotate(-90deg)" : "rotate(90deg)",
        }}
      />
    </button>
  );
}
