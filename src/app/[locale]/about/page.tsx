import TransitionLink from "@/components/ui/TransitionLink";

export default function AboutPage() {
  return (
    <main data-page-name="About">
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
          About
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
          We build things that matter.
        </h1>
      </section>

      {/* ── Body copy ─────────────────────────────── */}
      <section
        className="once-in"
        style={{
          padding: "4rem 3rem",
          maxWidth: "72rem",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "var(--font-title)",
              fontSize: "var(--text-2xl)",
              fontWeight: 700,
              marginBottom: "1.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            Our story
          </h2>
          <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.8 }}>
            ARBC is a creative agency focused on digital experiences that push
            the boundaries of what&apos;s possible on screen. We combine
            rigorous design thinking with cutting-edge technology to produce
            work that resonates long after the first impression.
          </p>
        </div>
        <div>
          <h2
            style={{
              fontFamily: "var(--font-title)",
              fontSize: "var(--text-2xl)",
              fontWeight: 700,
              marginBottom: "1.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            What we do
          </h2>
          <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.8 }}>
            Brand identity, interactive web experiences, motion design, and
            digital strategy. Every project starts with a question and ends
            with something you haven&apos;t seen before.
          </p>
        </div>
      </section>

      {/* ── Navigation test strip ─────────────────── */}
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
          label="Home"
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
          href="/explore"
          label="Explore"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-md)",
            fontWeight: 700,
            color: "#e7501e",
            textDecoration: "none",
          }}
        >
          Explore →
        </TransitionLink>
      </section>
    </main>
  );
}
