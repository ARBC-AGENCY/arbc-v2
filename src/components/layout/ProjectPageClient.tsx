"use client";

import dynamic from "next/dynamic";
import TransitionLink from "@/components/ui/TransitionLink";
import PageAnnotation from "@/components/layout/PageAnnotation";

// ssr: false is allowed here because this is a Client Component.
// Each import is a separate chunk — Lambda never loads all 7 at once.
const AccentMedia = dynamic(() => import("@/components/sections/AccentMedia"), { ssr: false });
const BetMomo     = dynamic(() => import("@/components/sections/BetMomo"),     { ssr: false });
const HeartChoice = dynamic(() => import("@/components/sections/HeartChoice"), { ssr: false });
const Jamalia     = dynamic(() => import("@/components/sections/Jamalia"),     { ssr: false });
const LagonClub   = dynamic(() => import("@/components/sections/LagonClub"),   { ssr: false });
const Eventify    = dynamic(() => import("@/components/sections/Eventify"),    { ssr: false });
const Liji        = dynamic(() => import("@/components/sections/Liji"),        { ssr: false });

interface Props {
  slug: string;
}

export default function ProjectPageClient({ slug }: Props) {
  if (slug === "accent-media") return <AccentMedia />;
  if (slug === "betmomo")      return <BetMomo />;
  if (slug === "h-choice")     return <HeartChoice />;
  if (slug === "le-lagon")     return <LagonClub />;
  if (slug === "jamalia")      return <Jamalia />;
  if (slug === "liji")         return <Liji />;
  if (slug === "eventify")     return <Eventify />;

  const displayName = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <main data-page-name={displayName}>
      <section
        className="once-in h-dvh"
        style={{
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "10rem 3rem 6rem",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-title)",
            fontSize: "var(--text-hero)",
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            marginBottom: "2rem",
          }}
        >
          {displayName}
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            color: "var(--color-text-secondary)",
            maxWidth: "48ch",
            lineHeight: 1.7,
            marginBottom: "3rem",
          }}
        >
          Page projet en construction — le contenu détaillé sera ajouté
          prochainement.
        </p>

        <TransitionLink
          href="/projects"
          label="projects"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            fontWeight: 700,
            color: "#e7501e",
            textDecoration: "none",
          }}
        >
          ← Tous les projets
        </TransitionLink>
      </section>

      <div className="once-in">
        <PageAnnotation line1={displayName} />
      </div>
    </main>
  );
}
