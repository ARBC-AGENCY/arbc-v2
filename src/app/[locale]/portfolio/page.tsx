import TransitionLink from "@/components/ui/TransitionLink";

export default function PortfolioPage() {
  return (
    <main data-page-name="portfolio">
      {/* ── Hero ──────────────────────────────────── */}
      <section
        className="once-in"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "10rem 3rem 4rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-text-secondary)",
            marginBottom: "1.5rem",
          }}
        >
          Portfolio
        </p>
        <h1
          style={{
            fontFamily: "var(--font-title)",
            fontSize: "var(--text-hero)",
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            maxWidth: "14ch",
          }}
        >
          Our work, in full.
        </h1>
      </section>

      {/* ── Navigation ────────────────────────────── */}
      <section
        className="once-in"
        style={{
          padding: "4rem 3rem 8rem",
          display: "flex",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        <TransitionLink
          href="/"
          label="home"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-md)",
            fontWeight: 700,
            color: "var(--color-text-secondary)",
            textDecoration: "none",
          }}
        >
          ← Home
        </TransitionLink>

        <TransitionLink
          href="/services"
          label="services"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-md)",
            fontWeight: 700,
            color: "#e7501e",
            textDecoration: "none",
          }}
        >
          Services →
        </TransitionLink>
      </section>
    </main>
  );
}
