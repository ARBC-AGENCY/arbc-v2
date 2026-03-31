import { useTranslations } from "next-intl";
import PageAnnotation from "@/components/layout/PageAnnotation";
import TransitionLink from "@/components/ui/TransitionLink";

// All valid slugs — Next.js uses this for static generation.
export function generateStaticParams() {
  return [
    { slug: "betmomo" },
    { slug: "woodm" },
    { slug: "le-lagon" },
    { slug: "arbc-annual" },
    { slug: "yango" },
    { slug: "orange-rdc" },
  ];
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  // Display name derived from slug — replace with per-project data later
  const displayName = slug
    .split("-")
    .map((w) => w.toUpperCase())
    .join(" ");

  return (
    <main data-page-name={displayName}>
      {/* ── Hero placeholder ─────────────────────────────────────── */}
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

      {/* ── Page annotation ──────────────────────────────────────── */}
      <div className="once-in">
        <PageAnnotation line1={displayName} />
      </div>
    </main>
  );
}
