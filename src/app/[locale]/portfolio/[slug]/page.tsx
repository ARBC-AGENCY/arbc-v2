import Image from "next/image";
import TransitionLink from "@/components/ui/TransitionLink";
import { PORTFOLIO_ITEMS } from "@/data/portfolio";

export const dynamicParams = false;

export function generateStaticParams() {
  return PORTFOLIO_ITEMS.map((p) => ({ slug: p.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PortfolioItemPage({ params }: Props) {
  const { slug } = await params;

  const item = PORTFOLIO_ITEMS.find((p) => p.slug === slug);

  const displayName = item?.name ?? slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const tags = item?.tags ?? [];

  return (
    <main data-page-name={displayName}>
      {/* ── Cover image ───────────────────────────────────────────────────────── */}
      {item && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            opacity: 0.18,
            pointerEvents: "none",
          }}
        >
          <Image
            src={item.image}
            alt={displayName}
            fill
            quality={85}
            style={{ objectFit: "cover" }}
            sizes="100vw"
            priority
          />
        </div>
      )}

      {/* ── Content ───────────────────────────────────────────────────────────── */}
      <section
        className="once-in"
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "10rem 3rem 6rem",
          maxWidth: "900px",
        }}
      >
        {/* Tags */}
        {tags.length > 0 && (
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  padding: "0.2rem 0.7rem",
                  borderRadius: 20,
                  border: "1px solid rgba(231,80,30,0.4)",
                  color: "#e7501e",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--font-title)",
            fontSize: "var(--text-hero)",
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            marginBottom: "2.5rem",
          }}
        >
          {displayName}
        </h1>

        {/* Placeholder notice */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.75rem 1.2rem",
            border: "1px solid var(--color-text-secondary)",
            borderRadius: 4,
            marginBottom: "3rem",
            opacity: 0.6,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: "#e7501e",
              flexShrink: 0,
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              color: "var(--color-text-secondary)",
              lineHeight: 1.6,
            }}
          >
            Portfolio page in progress — full case study coming soon.
          </p>
        </div>

        {/* Back link */}
        <TransitionLink
          href="/portfolio"
          label="portfolio"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            fontWeight: 700,
            color: "#e7501e",
            textDecoration: "none",
          }}
        >
          ← Back to portfolio
        </TransitionLink>
      </section>
    </main>
  );
}
