import type { ProjectStatic } from "./types";

// ── Asset imports ──────────────────────────────────────────────────────────
import logoBetmomo from "@/assets/images/logos/betmomo-logo.svg";
import logoLagon from "@/assets/images/logos/LagonClub-Logo.svg";
import logoHChoice from "@/assets/images/logos/H-choice-logo.svg";
import logoLiji from "@/assets/images/logos/liji-logo.svg";
import logoAccent from "@/assets/images/logos/AccentMedia-Logo.svg";
import logoJamalia from "@/assets/images/logos/jamalia-logo.svg";
import logoEventify from "@/assets/images/logos/Eventify-logo.svg";
import imgJamalia from "@/assets/images/jamalia/MeloFamily.webp";
import imgBetmomo from "@/assets/images/logos/projectSliderImage/BETMOMO.webp";
import imgLagon from "@/assets/images/logos/projectSliderImage/LagonClub.webp";
import imgEventify from "@/assets/images/eventify/EV00.webp";
import imgLiji from "@/assets/images/liji/Cover-Facebook.webp";
import imgHChoice from "@/assets/images/heartchoice/Notepad-Branding-2.webp";
import imgAccent from "@/assets/images/acm/Billboard.webp";

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

  // 02 — eventify — two separate blocks
  {
    id: "02",
    slug: "eventify",
    name: "EVENTIFY",
    image: imgEventify.src,
    logo: logoEventify.src,
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
    image: imgHChoice.src,
    logo: logoHChoice.src,
    accentColor: "#1c3932",
    blocks: [
      {
        bottom: "5.5rem",
        left: "-10rem",
        width: "min(380px, 42%)",
        bg: "rgba(204, 204, 204, 1)",
        color: "#ffffff",
        padding: "1.6rem 1.4rem",
        blur: true,
        border: "1px solid rgba(100,200,150,0.12)",
        segments: [
          { type: "title", style: { color: "#242424", fontStyle: "normal" } },
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
    ],
  },

  // 05 — liji — two blocks
  {
    id: "05",
    slug: "liji",
    name: "LIJI",
    image: imgLiji.src,
    logo: logoLiji.src,
    accentColor: "#cf8017",
    blocks: [
      {
        top: "1.5rem",
        left: "-5rem",
        width: "min(400px, 36%)",
        bg: "#e7501e",
        color: "#ffffff",
        padding: "1.2rem 1.3rem",
        segments: [
          {
            type: "title",
            style: {
              color: "rgba(25, 25, 25, 1)",
              fontSize: "var(--text-md)",
              fontStyle: "normal",
            },
          },
          {
            type: "desc",
            style: {
              fontSize: "var(--text-sm)",
              fontWeight: 700,
              letterSpacing: "0.01em",
              padding: 0,
              color: "rgba(25, 25, 25, 1)",
              lineHeight: 1.3,
            },
          },
        ],
      },
    ],
  },

  // 06 — Accent Media — two blocks
  {
    id: "06",
    slug: "accent-media",
    name: "ACCENT MEDIA",
    image: imgAccent.src,
    logo: logoAccent.src,
    accentColor: "#ec6537",
    blocks: [
      {
        top: "-1.5rem",
        left: "-7rem",
        width: "min(370px, 42%)",
        bg: "#e7501e",
        color: "#ffffff",
        padding: "1.6rem 1.4rem",
        segments: [
          {
            type: "title",
            style: {
              color: "rgba(25, 25, 25, 1)",
              fontSize: "var(--text-md)",
              fontStyle: "normal",
            },
          },
          {
            type: "desc",
            style: {
              fontSize: "var(--text-sm)",
              fontWeight: 700,
              letterSpacing: "0.01em",
              padding: 0,
              color: "rgba(25, 25, 25, 1)",
              lineHeight: 1.3,
            },
          },
        ],
      },
    ],
  },

  // 07 — jamalia
  {
    id: "07",
    slug: "jamalia",
    name: "JAMALIA",
    imagePosition: "bottom",
    image: imgJamalia.src,
    logo: logoJamalia.src,
    accentColor: "#ffffff",
    blocks: [
      {
        top: "-3.5rem",
        right: "-5rem",
        width: "min(380px, 42%)",
        bg: "#e7501e",
        color: "#ffffff",
        padding: "1.6rem 1.4rem",
        blur: true,
        border: "1px solid rgba(255,255,255,0.08)",
        segments: [
          {
            type: "desc",
            style: {
              fontSize: "var(--text-sm)",
              fontWeight: 700,
              letterSpacing: "0.01em",
              padding: 0,
              color: "rgba(25, 25, 25, 1)",
              lineHeight: 1.3,
            },
          },
        ],
      },
    ],
  },
];
