import TransitionLink from "@/components/ui/TransitionLink";

const PROJECTS = [
  { id: "01", title: "Brand Identity", category: "Branding" },
  { id: "02", title: "Digital Campaign", category: "Motion" },
  { id: "03", title: "E-commerce Platform", category: "Web" },
  { id: "04", title: "Annual Report", category: "Print" },
  { id: "05", title: "Mobile App", category: "Product" },
  { id: "06", title: "Spatial Experience", category: "Immersive" },
];

export default function ExplorePage() {
  return (
    <main data-page-name="Explore">
      {/* ── Header ────────────────────────────────── */}
      <section
        className="once-in"
        style={{
          padding: "10rem 3rem 4rem",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "2rem",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-title)",
            fontSize: "var(--text-hero)",
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          Explore
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            color: "var(--color-text-secondary)",
            maxWidth: "28ch",
            lineHeight: 1.6,
            paddingBottom: "0.5rem",
          }}
        >
          A curated selection of recent work spanning brand, digital, and
          immersive experiences.
        </p>
      </section>

      {/* ── Project grid ──────────────────────────── */}
      <section
        className="once-in"
        style={{
          padding: "2rem 3rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {PROJECTS.map((p) => (
          <div
            key={p.id}
            style={{
              aspectRatio: "4/3",
              background: "var(--color-surface)",
              borderRadius: "0.75rem",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1px solid var(--color-border)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-xs)",
                color: "var(--color-text-secondary)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              {p.category}
            </span>
            <div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  color: "var(--color-text-secondary)",
                  marginBottom: "0.25rem",
                }}
              >
                {p.id}
              </p>
              <h3
                style={{
                  fontFamily: "var(--font-title)",
                  fontSize: "var(--text-xl)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                {p.title}
              </h3>
            </div>
          </div>
        ))}
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
          href="/about"
          label="About"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-md)",
            fontWeight: 700,
            color: "var(--color-text-secondary)",
            textDecoration: "none",
          }}
        >
          ← About
        </TransitionLink>

        <TransitionLink
          href="/"
          label="Home"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-md)",
            fontWeight: 700,
            color: "#e7501e",
            textDecoration: "none",
          }}
        >
          Home →
        </TransitionLink>
      </section>
    </main>
  );
}
