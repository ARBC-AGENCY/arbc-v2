import TransitionLink from "@/components/ui/TransitionLink";
import PageAnnotation from "@/components/layout/PageAnnotation";
import AccentMedia from "@/components/sections/AccentMedia";
import BetMomo from "@/components/sections/BetMomo";
import HeartChoice from "@/components/sections/HeartChoice";
import LagonClub from "@/components/sections/LagonClub";

// All valid slugs — Next.js uses this for static generation.
export function generateStaticParams() {
  return [
    { slug: "betmomo" },
    { slug: "woodin" },
    { slug: "le-lagon" },
    { slug: "h-choice" },
    { slug: "spicy" },
    { slug: "accent-media" },
    { slug: "cimencam" },
  ];
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  // ── Accent Media — full case study page ─────────────────────────────────
  if (slug === "accent-media") {
    return <AccentMedia />;
  }

  if (slug === "betmomo") {
    return <BetMomo />;
  }

  if (slug === "h-choice") {
    return <HeartChoice />;
  }

  if (slug === "le-lagon") {
    return <LagonClub />;
  }

  // ── Generic placeholder for all other projects ───────────────────────────
  const displayName = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <main data-page-name={displayName}>
      <section
        className="once-in"
        style={{
          minHeight: "100vh",
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
          Page projet en construction — le contenu détaillé sera ajouté prochainement.
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
