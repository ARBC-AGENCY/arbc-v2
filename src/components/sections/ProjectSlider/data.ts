import type { ProjectStatic } from "./types";

// ── Asset imports ──────────────────────────────────────────────────────────
import logoBetmomo from "@/assets/images/logos/betmomo-logo.svg";
import logoWoodin from "@/assets/images/logos/Woodin-logo.svg";
import logoLagon from "@/assets/images/logos/LagonClub-Logo.svg";
import logoHChoice from "@/assets/images/logos/H-choice-logo.svg";
import logoSpicy from "@/assets/images/logos/Spicy-logo.svg";
import logoAccent from "@/assets/images/logos/AccentMedia-Logo.svg";
import logoCimencam from "@/assets/images/logos/cimencam-logo.svg";
import imgBetmomo from "@/assets/images/logos/projectSliderImage/BETMOMO.webp";
import imgLagon from "@/assets/images/logos/projectSliderImage/LagonClub.webp";
import imgWoodin from "@/assets/images/logos/projectSliderImage/Woodin.webp";

// ── Static project data ────────────────────────────────────────────────────
// Text (title, category, descriptions[], taglines[]) lives in messages/*.json.

export const PROJECTS: ProjectStatic[] = [
  // 01 — BetMomo
  {
    id: "01",
    slug: "betmomo",
    name: "BETMOMO",
    image: imgBetmomo.src,
    logo: logoBetmomo.src,
    accentColor: "#000000",
    blocks: [
      {
        top: "-1.5rem",
        left: "-7rem",
        width: "min(400px, 42%)",
        bg: "rgba(204, 204, 204, 1)",
        color: "#ffffff",
        padding: "1.6rem 1.4rem",
        segments: [
          { type: "title", style: { color: "#242424" } },
          {
            type: "desc",
            style: {
              color: "#191919",
              fontSize: "var(--text-sm)",
              lineHeight: 1.2,
            },
          },
        ],
      },

      {
        top: "15rem",
        left: "-7rem",
        width: "min(380px, 42%)",
        bg: "rgba(10, 10, 10, 0)",
        color: "#ffffff",
        padding: "1.6rem 1.4rem",
        segments: [{ type: "tagline" }],
      },
    ],
  },

  // 02 — Woodin — two separate blocks
  {
    id: "02",
    slug: "woodin",
    name: "WOODIN",
    image: imgWoodin.src,
    logo: logoWoodin.src,
    accentColor: "#531e0e",
    blocks: [
      {
        bottom: "11rem",
        left: "-7rem",
        width: "min(400px, 40%)",
        bg: "rgba(25, 25, 25, 1)",
        color: "#ffffff",
        padding: "1.6rem 1.4rem",
        segments: [
          {
            type: "desc",
            style: { fontSize: "var(--text-sm)", lineHeight: 1.3 },
          },
        ],
      },
      {
        bottom: "0.5rem",
        left: "-3rem",
        width: "min(350px, 34%)",
        bg: "#e7501e",
        color: "#ffffff",
        padding: "1.6rem 1.4rem",
        borderRadius: "0",
        segments: [
          {
            type: "tagline",
            pillBg: "transparent",
            pillColor: "#fff",
            style: {
              fontSize: "var(--text-sm)",
              fontStyle: "italic",
              fontWeight: 700,
              letterSpacing: "0.01em",
              padding: 0,
              color: "rgba(25, 25, 25, 1)",
            },
          },
        ],
      },
    ],
  },

  // 03 — Le Lagon
  {
    id: "03",
    slug: "le-lagon",
    name: "LE LAGON",
    image: imgLagon.src,
    logo: logoLagon.src,
    accentColor: "#2e3643",
    blocks: [
      {
        top: "2rem",
        right: "-7rem",
        width: "min(400px, 42%)",
        bg: "rgba(20, 26, 38, 0)",
        color: "#ffffff",
        segments: [
          {
            type: "tagline",
            style: {
              fontSize: "var(--text-sm)",
              color: "#191919",
              padding: "1.6rem 1.4rem",
              fontStyle: "normal",
              lineHeight: 1.3,
            },
          },
        ],
      },
    ],
  },

  // 04 — H-Choice
  {
    id: "04",
    slug: "h-choice",
    name: "H-CHOICE",
    image: "https://picsum.photos/seed/arbc04/1600/900",
    logo: logoHChoice.src,
    accentColor: "#1c3932",
    blocks: [
      {
        bottom: "5.5rem",
        left: "1.75rem",
        width: "min(380px, 42%)",
        bg: "rgba(18, 42, 36, 0.88)",
        color: "#ffffff",
        padding: "1.6rem 1.4rem",
        borderRadius: "0.75rem",
        blur: true,
        border: "1px solid rgba(100,200,150,0.12)",
        segments: [
          { type: "label" },
          { type: "title" },
          { type: "desc" },
          { type: "tagline", pillBg: "#1c3932", pillColor: "#fff" },
        ],
      },
    ],
  },

  // 05 — Spicy — two blocks
  {
    id: "05",
    slug: "spicy",
    name: "SPICY",
    image: "https://picsum.photos/seed/arbc05/1600/900",
    logo: logoSpicy.src,
    accentColor: "#003756",
    blocks: [
      {
        top: "2rem",
        right: "1.75rem",
        width: "min(300px, 36%)",
        bg: "rgba(0, 26, 50, 0.84)",
        color: "#ffffff",
        padding: "1.4rem 1.3rem",
        borderRadius: "0.5rem",
        blur: true,
        border: "1px solid rgba(0,100,200,0.18)",
        segments: [{ type: "label" }, { type: "title" }],
      },
      {
        bottom: "5.5rem",
        right: "1.75rem",
        width: "min(300px, 36%)",
        bg: "rgba(0, 26, 50, 0.70)",
        color: "#ffffff",
        padding: "1.2rem 1.3rem",
        borderRadius: "0.5rem",
        blur: true,
        segments: [{ type: "desc" }, { type: "tagline" }],
      },
    ],
  },

  // 06 — Accent Media — two blocks
  {
    id: "06",
    slug: "accent-media",
    name: "ACCENT MEDIA",
    image: "https://picsum.photos/seed/arbc06/1600/900",
    logo: logoAccent.src,
    accentColor: "#ec6537",
    blocks: [
      {
        top: "-1.5rem",
        left: "1.75rem",
        width: "min(370px, 42%)",
        bg: "rgba(14, 10, 10, 0.82)",
        color: "#ffffff",
        padding: "1.6rem 1.4rem",
        borderRadius: "0.75rem",
        blur: true,
        border: "1px solid rgba(236,101,55,0.18)",
        segments: [{ type: "label" }, { type: "title" }, { type: "desc" }],
      },
      {
        bottom: "-1.5rem",
        left: "1.75rem",
        width: "min(370px, 42%)",
        bg: "#ec6537",
        color: "#ffffff",
        padding: "0.65rem 1rem",
        borderRadius: "0",
        segments: [
          {
            type: "tagline",
            pillBg: "transparent",
            pillColor: "#fff",
            style: { fontStyle: "italic", padding: 0 },
          },
        ],
      },
    ],
  },

  // 07 — Cimencam
  {
    id: "07",
    slug: "cimencam",
    name: "CIMENCAM",
    image: "https://picsum.photos/seed/arbc07/1600/900",
    logo: logoCimencam.src,
    accentColor: "#ffffff",
    blocks: [
      {
        top: "-1.5rem",
        right: "1.75rem",
        width: "min(380px, 42%)",
        bg: "rgba(30, 30, 28, 0.86)",
        color: "#ffffff",
        padding: "1.6rem 1.4rem",
        borderRadius: "0.75rem",
        blur: true,
        border: "1px solid rgba(255,255,255,0.08)",
        segments: [
          { type: "label" },
          { type: "title" },
          { type: "desc" },
          { type: "tagline" },
        ],
      },
    ],
  },
];
