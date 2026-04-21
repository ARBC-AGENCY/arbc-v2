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
        gsap.to(e.currentTarget, {
          scale: 1.12,
          duration: 0.2,
          ease: "power2.out",
        })
      }
      onMouseLeave={(e) =>
        gsap.to(e.currentTarget, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        })
      }
      style={{
        flexShrink: 0,
        borderRadius: "9999px",
        border: "1px solid rgba(255,255,255,0.22)",
        background: "rgba(255,255,255,0.08)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
      }}
      className={`w-9 h-9 md:h-11 md:w-11 ${dir === "right" ? "mr-5 md:mr-0" : ""}
  ${dir === "left" ? "ml-5 md:ml-0" : ""}
`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={(arrowDownSrc as any).src ?? arrowDownSrc}
        alt=""
        aria-hidden="true"
        style={{
          transform: dir === "right" ? "rotate(-90deg)" : "rotate(90deg)",
        }}
        className="w-4 h-4 md:h-4.5 md:w-4.5"
      />
    </button>
  );
}
